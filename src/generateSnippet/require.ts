import traverse from '@babel/traverse';
import generate from 'babel-generator';
import * as t from 'babel-types';
import * as parser from '@babel/parser';

const _require = (str: string): string => {
  const ast = parser.parse(str);

  let count = 1;
  const increaseCount = () => (count += 1);

  const modifyProperty = (property: any, count: any) => {
    let updatedProp;
    if (!property) {
      updatedProp = t.identifier(`\$${count}`);
    } else {
      const { key: { name } = { name: null } } = property;
      updatedProp = t.identifier(`\${${count}:${name}}`);
    }
    return t.objectProperty(updatedProp, updatedProp, false, true);
  };

  const modifyStringLiteral = (value: string, count: number): string =>
    `\${${count}:${value}}`;

  const parseIdentifier = (node: any) => {
    node.name = modifyStringLiteral(node.name, count);
    increaseCount();
  };

  const parseObjectPattern = (node: any) => {
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
      if (t.isIdentifier(nodeId)) return parseIdentifier(nodeId);
      if (t.isObjectPattern(nodeId)) return parseObjectPattern(nodeId);
    },
    StringLiteral(path) {
      path.node.value = modifyStringLiteral(path.node.value, count);
      increaseCount();
    }
  });
  const { code } = generate(ast as any, {
    retainLines: true,
    quotes: 'single'
  });
  return code;
};

export default _require;
