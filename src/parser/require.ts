import NodeTypes from '../constants/nodeTypes';
import { parseImportAbbreviation } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseRequire = (
  abbreviationNodes: string,
): VariableDeclaration<CallExpression> => {
  const { name, customName, objectProperties } = parseImportAbbreviation(
    abbreviationNodes,
  );

  const declaratorID: Identifier | ObjectPattern = objectProperties
    ? getASTNode.objectPattern(objectProperties)
    : getASTNode.identifier(customName || name);

  return {
    type: NodeTypes.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: NodeTypes.VARIABLE_DECLARATOR,
        id: declaratorID,
        init: {
          type: NodeTypes.CALL_EXPRESSION,
          callee: getASTNode.identifier('require'),
          arguments: [getASTNode.stringLiteral(name)],
        },
      },
    ],
  };
};

export default parseRequire;
