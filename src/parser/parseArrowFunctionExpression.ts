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
  const id = name ? getASTNode.identifier(name) : null;

  return name
    ? {
        type: ExpressionTypes.VARIABLE_DECLARATION,
        kind: 'const',
        declarations: [
          {
            type: ExpressionTypes.VARIABLE_DECLARATOR,
            id: getASTNode.identifier(name),
            init: {
              type: ExpressionTypes.ARROW_FUNCTION_EXPRESSION,
              async,
              params,
              id,
              body: getASTNode.blockStatement(),
            },
          },
        ],
      }
    : {
        type: ExpressionTypes.EXPRESSION_STATEMENT,
        expression: {
          type: ExpressionTypes.ARROW_FUNCTION_EXPRESSION,
          async,
          params,
          id,
          body: getASTNode.blockStatement(),
        },
      };
};

export default parseArrowFunctionExpression;
