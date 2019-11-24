import NodeTypes from '../constants/nodeTypes';
import { parseExportAbbreviationNodes } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

interface Options {
  es6: boolean;
  isDefault: boolean;
}

const parseExport = (
  abbreviationNodes: string,
  options: Options,
):
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExpressionStatement<AssignmentExpression> => {
  const { es6, isDefault } = options;
  const { name } = parseExportAbbreviationNodes(abbreviationNodes);
  if (!es6)
    return {
      type: NodeTypes.EXPRESSION_STATEMENT,
      expression: getASTNode.assignmentExpression({
        left: getASTNode.memberExpression({
          object: 'module',
          property: 'exports',
        }),
        right: getASTNode.identifier(name),
      }),
    };

  return isDefault
    ? {
        type: NodeTypes.EXPORT_DEFAULT_DECLARATION,
        declaration: getASTNode.identifier(name),
      }
    : {
        type: NodeTypes.EXPORT_NAMED_DECLARATION,
        declaration: {
          type: NodeTypes.VARIABLE_DECLARATION,
          kind: 'const',
          declarations: [
            {
              type: NodeTypes.VARIABLE_DECLARATOR,
              id: getASTNode.identifier(name),
              init: getASTNode.identifier(name),
            },
          ],
        },
      };
};

export default parseExport;
