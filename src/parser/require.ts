import ExpressionTypes from '../constants/expressionTypes';
import { parseObjectDestructuringProps, parseObjectProperty } from './utils';

const _require = (abbreviationNodes: string): VariableDeclaration => {
  let name;
  let customName;
  let desctructuredProps;
  for (let i = 0; i < abbreviationNodes.length && !name; i += 1) {
    switch (abbreviationNodes[i]) {
      case '>': {
        const nodes = abbreviationNodes.split('>');
        name = nodes.pop();
        if (nodes.length > 1) {
          customName = nodes.pop();
        }
        break;
      }
      case ':': {
        const nodes = abbreviationNodes.split(':');
        name = nodes.pop();
        desctructuredProps = parseObjectDestructuringProps(nodes.pop());
        break;
      }
    }
  }

  const declaratorID: Identifier | ObjectPattern = desctructuredProps
    ? {
        type: ExpressionTypes.OBJECT_PATTERN,
        properties: desctructuredProps.map(parseObjectProperty),
      }
    : {
        type: ExpressionTypes.IDENTIFIER,
        name: customName || name || '',
      };

  const tree: VariableDeclaration = {
    type: ExpressionTypes.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: ExpressionTypes.VARIABLE_DECLARATOR,
        id: declaratorID,
        init: {
          type: ExpressionTypes.CALL_EXPRESSION,
          callee: {
            type: ExpressionTypes.IDENTIFIER,
            name: 'require',
          },
          arguments: [
            {
              type: ExpressionTypes.STRING_LITERAL,
              value: name || '',
            },
          ],
        },
      },
    ],
  };

  return tree;
};

export default _require;
