import * as escodegen from 'escodegen';
import types from '../constants/expressionTypes';

interface Tree {
  type: string;
  kind: string;
  declarations: any;
}

export const _require = (str: string): string => {
  let name;
  let customName;
  for (let i = 0; i < str.length; i += 1) {
    const symbol = str[i];
    if (symbol === '>') {
      const nodes = str.split('>');
      name = nodes.pop();
      customName = nodes.pop();
    }
  }

  const tree: Tree = {
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: []
  };

  tree.declarations.push({
    type: types.VARIABLE_DECLARATOR,
    id: {
      type: types.IDENTIFIER,
      name: `\${2:${customName || name}}`
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
          value: `\${1:${name}}`
        }
      ]
    }
  });
  return escodegen.generate(tree);
};
