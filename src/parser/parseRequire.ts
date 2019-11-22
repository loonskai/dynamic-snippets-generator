import ExpressionTypes from '../constants/expressionTypes';
import { parseAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

const parseRequire = (abbreviationNodes: string): VariableDeclaration => {
  const { name, customName, objectProperties } = parseAbbreviationNodes(
    abbreviationNodes,
  );

  const declaratorID: Identifier | ObjectPattern = objectProperties
    ? getASTNode.objectPattern(objectProperties)
    : getASTNode.identifier(customName || name);

  return {
    type: ExpressionTypes.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: ExpressionTypes.VARIABLE_DECLARATOR,
        id: declaratorID,
        init: {
          type: ExpressionTypes.CALL_EXPRESSION,
          callee: getASTNode.identifier('require'),
          arguments: [getASTNode.stringLiteral(name)],
        },
      },
    ],
  };
};

export default parseRequire;
