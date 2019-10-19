import * as escodegen from 'escodegen';
import types from '../constants/expressionTypes';

export const _require = (name: string, value?: string) =>
  escodegen.generate({
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
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
      }
    ]
  });
