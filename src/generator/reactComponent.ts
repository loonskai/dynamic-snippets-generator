import traverse from '@babel/traverse';
import * as parser from '@babel/parser';
import * as t from 'babel-types';

import generate from '../utils/generate';
import Counter from '../utils/generator/counter';
import * as generateNode from '../utils/generator/generateNode';

const _reactComponent = (rawCodeStr: string): any => {
  const ast = parser.parse(rawCodeStr, { sourceType: 'module' });

  const counter = new Counter();
  const updateName = (
    node: any,
    {
      ref,
      customCounterValue,
    }: {
      ref: string;
      customCounterValue?: number;
    },
  ): any => {
    const { name } = node[ref];
    return t.identifier(`\${${customCounterValue || counter.value}:${name}}`);
  };

  traverse(ast, {
    VariableDeclarator(path) {
      const customCounterValue = counter.value;
      path.set('id', updateName(path.node, { ref: 'id', customCounterValue }));
      const programStatement = path.getStatementParent().getStatementParent() as any;
      const ExportDefaultDeclaration = programStatement.getNextSibling();
      ExportDefaultDeclaration.set(
        'declaration',
        updateName(ExportDefaultDeclaration.node, { ref: 'declaration', customCounterValue }),
      );
    },
    ObjectPattern(path) {
      const { properties } = path.node;
      const updatedProps = properties.map(prop => {
        const updatedName = updateName(prop, { ref: 'key' });
        const newProp = t.objectProperty(updatedName, updatedName, false, true);
        return newProp;
      }) as any;
      path.set('properties', updatedProps);
    },
    ReturnStatement(path) {
      path.set('argument', generateNode.identifier(`\$${counter.value}`) as any);
    },
  });

  return generate(ast, null, { retainLines: false });
};

export default _reactComponent;
