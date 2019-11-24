import NodeTypes from '../constants/nodeTypes';
import { parseImportAbbreviation } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseES6Import = (abbreviationNodes: string): ImportDeclaration => {
  const { name, customName, objectProperties, alias } = parseImportAbbreviation(
    abbreviationNodes,
  );

  const specifiers = alias
    ? [getASTNode.importNamespaceSpecifier(alias)]
    : objectProperties
    ? objectProperties.map(getASTNode.importSpecifier)
    : [getASTNode.importDefaultSpecifier(customName || name)];

  return {
    type: NodeTypes.IMPORT_DECLARATION,
    specifiers,
    source: getASTNode.stringLiteral(name),
  };
};

export default parseES6Import;
