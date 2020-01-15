// import NodeTypes from '../constants/nodeTypes';
// import { parseFunctionAbbreviation } from '../utils/parser';
import * as getASTNode from '../../utils/parser/getASTNode';

import parseES6Import from '../import';
import parseExport from '../export';

import { parseImportAbbreviation } from '../../utils/parser';



const getReactImport = (cut: string): string => {
  const str = cut[0] !== ':' ? cut : cut.replace(':', '');
  switch (str.toLowerCase()) {
    case 'us': return 'useState';
    case 'ur': return 'useReducer';
    case 'ue': return 'useEffect';
    case 'uc': return 'useContext'; 
    default: return str;
  }
}

// const mapReactImports = (str: string): string => str.split(',').map(getReactImport).join(',');

const parseReact = (
  abbreviationNodes: string,
): any => {
  const re = /[\>\:\@]/;
  const nodes = abbreviationNodes.split(re);

  if (nodes.length === 4) {
    const [, reactImportsStr, propsStr, componentName] = nodes;
    console.log(reactImportsStr, propsStr, componentName);
    const importStatement = parseES6Import(`>React:${propsStr}>react`);
    const exportStatement = parseExport(`>${componentName}`, { es6: true, isDefault: true });
  }

  if (nodes.length === 3) {
    // TODO: Check which elements are included
  }

  if (nodes.length === 2) {
    // TODO: Check which elements are included

  }

  return nodes;
};

export default parseReact;
