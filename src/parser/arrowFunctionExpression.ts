import NodeTypes from '../constants/nodeTypes';
import { parseFuncAbbreviationNodes } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseArrowFunctionExpression = (
  abbreviationNodes: string,
): VariableDeclaration<ArrowFunctionExpression> => {
  const { name, async, functionParams } = parseFuncAbbreviationNodes(
    abbreviationNodes.replace('=>', ''),
  );
  const { isObjectPattern, list } = functionParams;
  const params = isObjectPattern
    ? [getASTNode.objectPattern(list)]
    : list.map(getASTNode.identifier);

  return {
    type: NodeTypes.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: NodeTypes.VARIABLE_DECLARATOR,
        id: getASTNode.identifier(name),
        init: getASTNode.arrowFunctionExpression({
          id: getASTNode.identifier(name),
          params,
          async,
        }),
      },
    ],
  };
};

export default parseArrowFunctionExpression;
