import * as escodegen from 'escodegen';
import types from '../constants/expressionTypes';

interface Tree {
  type: string;
  kind: string;
  declarations: any;
}

export const _require = (name: string, value?: string) => {
  const tree: Tree = {
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: []
  };

  tree.declarations.push({
    type: types.VARIABLE_DECLARATOR,
    id: {
      type: types.IDENTIFIER,
      name: `\${2:${name}}`
    },
    init: {
      type: types.CALL_EXPRESSION,
      callee: {
        type: types.IDENTIFIER,
        name: 'require'
      },
      arguments: [
        {
          type: types.LITERAL,
          value: `\${1:${value || name}}`
        }
      ]
    }
  });
  return escodegen.generate(tree);
};
