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
import Counter from '../utils/generator/counter';

const _require = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);
  const counter = new Counter();

  const modifyProperty = (property: any, counter: Counter) => {
    let updatedProp;
    if (!property) {
      updatedProp = t.identifier(getPlaceholder(counter.value));
    } else {
      const { key: { name } = { name: null } } = property;
      updatedProp = t.identifier(getNamedPlaceholder(counter.value, name));
    }
    return t.objectProperty(updatedProp, updatedProp, false, true);
  };

  const modifyIdentifier = (node: any) => {
    node.name = getNamedPlaceholder(counter.value, node.name);
  };

  const modifyObjectPattern = (node: any) => {
    const { properties } = node;
    if (properties.length === 0) {
      node.properties = [modifyProperty(null, counter)];
    } else {
      node.properties = properties.map((prop: any) => {
        const updatedProp = modifyProperty(prop, counter);
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

      const newName = getNamedPlaceholder(counter.value, initialName);
      const newStringLiteral = generateNode.stringLiteral(newName);
      path.replaceWith(newStringLiteral as any);
    },
  });

  return generate(ast);
};

export default _require;
