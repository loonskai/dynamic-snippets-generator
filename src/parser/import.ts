import NodeTypes from '../constants/nodeTypes';
import { parseImportAbbreviation } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseES6Import = (abbreviationNodes: string): ImportDeclaration => {
  const { name, customName, objectProperties, alias } = parseImportAbbreviation(
    abbreviationNodes,
  );

  let specifiers = [] as any;
  if (alias) {
    specifiers = [getASTNode.importNamespaceSpecifier(alias)];
  } else if (objectProperties && !customName) {
    specifiers = objectProperties.map(getASTNode.importSpecifier)
  } else if (!objectProperties) {
    specifiers = [getASTNode.importDefaultSpecifier(customName || name)]
  } else if (!alias && customName) {
    specifiers = [getASTNode.importDefaultSpecifier(customName), ...objectProperties.map(getASTNode.importSpecifier)]
  } 


  return {
    type: NodeTypes.IMPORT_DECLARATION,
    specifiers,
    source: getASTNode.stringLiteral(name),
  };
};

export default parseES6Import;
