import traverse from '@babel/traverse';
import * as t from 'babel-types';
import * as parser from '@babel/parser';

import generate from '../utils/generate';
import {
  getPlaceholder,
  getNamedPlaceholder,
  isPlaceholder,
} from '../utils/generator';
import * as generateNode from '../utils/generator/generateNode';

const _require = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);

  let count = 1;
  const increaseCount = () => (count += 1);

  const modifyProperty = (property: any, count: any) => {
    let updatedProp;
    if (!property) {
      updatedProp = t.identifier(getPlaceholder(count));
    } else {
      const { key: { name } = { name: null } } = property;
      updatedProp = t.identifier(getNamedPlaceholder(count, name));
    }
    return t.objectProperty(updatedProp, updatedProp, false, true);
  };

  const modifyIdentifier = (node: any) => {
    node.name = getNamedPlaceholder(count, node.name);
    increaseCount();
  };

  const modifyObjectPattern = (node: any) => {
    const { properties } = node;
    if (properties.length === 0) {
      node.properties = [modifyProperty(null, count)];
      increaseCount();
    } else {
      node.properties = properties.map((prop: any) => {
        const updatedProp = modifyProperty(prop, count);
        increaseCount();
        return updatedProp;
      });
    }
  };

  traverse(ast, {
    VariableDeclarator(path) {
      const { id: nodeId } = path.node;
      if (t.isIdentifier(nodeId)) return modifyIdentifier(nodeId);
      if (t.isObjectPattern(nodeId)) return modifyObjectPattern(nodeId);
    },
    StringLiteral(path) {
      const initialName = path.node.value;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(count, initialName);
      const newStringLiteral = generateNode.stringLiteral(newName);
      path.replaceWith(newStringLiteral as any);
      increaseCount();
    },
  });

  return generate(ast);
};

export default _require;
