import ExpressionTypes from '../constants/expressionTypes';
import { parseExportAbbreviationNodes } from './utils';
import * as getASTNode from './utils/getASTNode';

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
      type: ExpressionTypes.EXPRESSION_STATEMENT,
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
        type: ExpressionTypes.EXPORT_DEFAULT_DECLARATION,
        declaration: getASTNode.identifier(name),
      }
    : {
        type: ExpressionTypes.EXPORT_NAMED_DECLARATION,
        declaration: {
          type: ExpressionTypes.VARIABLE_DECLARATION,
          kind: 'const',
          declarations: [
            {
              type: ExpressionTypes.VARIABLE_DECLARATOR,
              id: getASTNode.identifier('name'),
              init: getASTNode.identifier('name'),
            },
          ],
        },
      };
};

export default parseExport;
