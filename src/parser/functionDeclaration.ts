import NodeTypes from '../constants/nodeTypes';
import { parseFunctionAbbreviation } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseFunctionDeclaration = (
  abbreviationNodes: string,
): FunctionDeclaration => {
  const { name, async, functionParams } = parseFunctionAbbreviation(
    abbreviationNodes.replace('>', ''),
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
