import ExpressionTypes from '../constants/expressionTypes';
import { parseFuncAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

export const parseFunctionDeclaration = ({
  name,
  async,
  functionParams,
}: {
  name: any;
  async: any;
  functionParams: FunctionParams;
}): FunctionDeclaration => {
  const { isObjectPattern, list } = functionParams;

  return {
    type: ExpressionTypes.FUNCTION_DECLARATION,
    id: getASTNode.identifier(name),
    async,
    params: [],
    body: getASTNode.blockStatement(),
  };
};

export const parseFunctionExpression = ({
  name,
  async,
  functionParams,
}: {
  name: string;
  async: boolean;
  functionParams: FunctionParams;
}): FunctionExpression => {
  const { isObjectPattern, list } = functionParams;
  console.log(isObjectPattern);
  console.log(list);
  const params = isObjectPattern
    ? [getASTNode.objectPattern(list)]
    : list.map(getASTNode.identifier);
  return {
    type: ExpressionTypes.FUNCTION_EXPRESSION,
    name: null,
    async,
    params,
    body: getASTNode.blockStatement(),
  };
};

const parseFunction = (
  abbreviationNodes: string,
): FunctionDeclaration | FunctionExpression => {
  const { name, async, functionParams } = parseFuncAbbreviationNodes(
    abbreviationNodes,
  );
  if (!name) return parseFunctionExpression({ name, async, functionParams });
  return parseFunctionDeclaration({ name, async, functionParams });
};
export default parseFunction;
