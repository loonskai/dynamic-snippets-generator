import * as escodegen from 'escodegen';
import types from '../constants/expressionTypes';

interface Tree {
  type: string;
  kind: string;
  declarations: any;
}

const parseObjectDestructuring = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

const _require = (str: string): string => {
  let name;
  let customName;
  let desctructuredProps;
  for (let i = 0; i < str.length; i += 1) {
    switch (str[i]) {
      case '>': {
        const nodes = str.split('>');
        name = nodes.pop();
        customName = nodes.pop();
        break;
      }
      case ':': {
        const nodes = str.split(':');
        name = nodes.pop();
        desctructuredProps = parseObjectDestructuring(nodes.pop());
        desctructuredProps;
      }
    }
  }

  const tree: Tree = {
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: types.VARIABLE_DECLARATOR,
        id: {
          type: types.IDENTIFIER,
          name: `${customName || name}`
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
              value: `${name}`
            }
          ]
        }
      }
    ]
  };

  return escodegen.generate(tree);
};

export default _require;
