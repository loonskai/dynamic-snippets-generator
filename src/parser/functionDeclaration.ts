import NodeTypes from '../constants/nodeTypes';
import { parseFuncAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

const parseFunctionDeclaration = (
  abbreviationNodes: string,
): FunctionDeclaration => {
  const { name, async, functionParams } = parseFuncAbbreviationNodes(
    abbreviationNodes,
  );
  const { isObjectPattern, list } = functionParams;
  const params = isObjectPattern
    ? [getASTNode.objectPattern(list)]
    : list.map(getASTNode.identifier);
  return {
    type: NodeTypes.FUNCTION_DECLARATION,
    id: getASTNode.identifier(name),
    async,
    params,
    body: getASTNode.blockStatement(),
  };
};

export default parseFunctionDeclaration;
