import ExpressionTypes from '../constants/expressionTypes';
import { parseArrowFuncAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

const parseArrowFunctionExpression = (
  abbreviationNodes: string,
):
  | VariableDeclaration<ArrowFunctionExpression>
  | ExpressionStatement<ArrowFunctionExpression> => {
  const { name, async, functionParams } = parseArrowFuncAbbreviationNodes(
    abbreviationNodes.replace('=>', ''),
  );

  const { isObjectPattern, list } = functionParams;
  const params = isObjectPattern
    ? [getASTNode.objectPattern(list)]
    : list.map(getASTNode.identifier);

  return name
    ? {
        type: ExpressionTypes.VARIABLE_DECLARATION,
        kind: 'const',
        declarations: [
          {
            type: ExpressionTypes.VARIABLE_DECLARATOR,
            id: getASTNode.identifier(name),
            init: getASTNode.arrowFunctionExpression({
              id: getASTNode.identifier(name),
              params,
              async,
            }),
          },
        ],
      }
    : {
        type: ExpressionTypes.EXPRESSION_STATEMENT,
        expression: getASTNode.arrowFunctionExpression({
          id: null,
          params,
          async,
        }),
      };
};

export default parseArrowFunctionExpression;
