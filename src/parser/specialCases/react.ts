// import NodeTypes from '../constants/nodeTypes';
// import { parseFunctionAbbreviation } from '../utils/parser';
import * as getASTNode from '../../utils/parser/getASTNode';

import parseES6Import from '../import';



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

const mapReactImports = (str: string): string => str.split(',').map(getReactImport).join(',');

const parseReact = (
  abbreviationNodes: string,
): any => {
  const nodes = abbreviationNodes.split('@');

  if (abbreviationNodes[0] === ':') {
    return nodes.map(mapReactImports);
  }


  return nodes;
};

export default parseReact;
