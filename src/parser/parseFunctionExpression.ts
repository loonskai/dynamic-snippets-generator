import NodeTypes from '../constants/nodeTypes';
import { parseFuncAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

const parseFunctionExpression = (
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
    type: NodeTypes.FUNCTION_EXPRESSION,
    id,
    async,
    params,
    body: getASTNode.blockStatement(),
  };
};

export default parseFunctionExpression;
