import types from '../constants/expressionTypes';
import { parseObjectDestructuringProps, parseASTProperty } from './utils';

interface Tree {
  type: string;
  kind: string;
  declarations: any;
}

const _require = (str: string): any => {
  let name;
  let customName;
  let desctructuredProps;
  for (let i = 0; i < str.length && !name; i += 1) {
    switch (str[i]) {
      case '>': {
        const nodes = str.split('>');
        name = nodes.pop();
        if (nodes.length > 1) {
          customName = nodes.pop();
        }
        break;
      }
      case ':': {
        const nodes = str.split(':');
        name = nodes.pop();
        desctructuredProps = parseObjectDestructuringProps(nodes.pop());
        break;
      }
    }
  }

  const declaratorID = desctructuredProps
    ? {
        type: types.OBJECT_PATTERN,
        properties: desctructuredProps.map(parseASTProperty),
      }
    : {
        type: types.IDENTIFIER,
        name: customName || name,
      };

  const tree: Tree = {
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: types.VARIABLE_DECLARATOR,
        id: declaratorID,
        init: {
          type: types.CALL_EXPRESSION,
          callee: {
            type: types.IDENTIFIER,
            name: 'require',
          },
          arguments: [
            {
              type: types.STRING_LITERAL,
              value: name,
            },
          ],
        },
      },
    ],
  };

  return tree;
};

export default _require;
