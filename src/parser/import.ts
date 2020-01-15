import NodeTypes from '../constants/nodeTypes';
import { parseImportAbbreviation } from '../utils/parser';
import * as getASTNode from '../utils/parser/getASTNode';

const parseES6Import = (abbreviationNodes: string): ImportDeclaration => {
  const { name, customName, objectProperties, alias } = parseImportAbbreviation(abbreviationNodes);

  let specifiers = [] as any;
  if (alias) {
    specifiers = [getASTNode.importNamespaceSpecifier(alias)];
  } else if (objectProperties) {
    const objPropNodes = objectProperties.map(getASTNode.importSpecifier);
    specifiers = customName ? [getASTNode.importDefaultSpecifier(customName), ...objPropNodes] : objPropNodes;
  } else {
    specifiers = [getASTNode.importDefaultSpecifier(customName || name)];
  }

  return {
    type: NodeTypes.IMPORT_DECLARATION,
    specifiers,
    source: getASTNode.stringLiteral(name),
  };
};

export default parseES6Import;
