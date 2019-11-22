import ExpressionTypes from '../constants/expressionTypes';
import { parseFuncAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

export const parseFunctionExpression = (
  abbreviationNodes: string,
): FunctionExpression => {
  const { name, async, functionParams } = parseFuncAbbreviationNodes(
    abbreviationNodes,
  );
  const { isObjectPattern, list } = functionParams;
  const params = isObjectPattern
    ? [getASTNode.objectPattern(list)]
    : list.map(getASTNode.identifier);
  const id = name ? getASTNode.identifier(name) : null;
  return {
    type: ExpressionTypes.FUNCTION_EXPRESSION,
    id,
    async,
    params,
    body: getASTNode.blockStatement(),
  };
};

export default parseFunctionExpression;
