// import NodeTypes from '../constants/nodeTypes';
// import { parseFunctionAbbreviation } from '../utils/parser';
import * as getASTNode from '../../utils/parser/getASTNode';

import parseES6Import from '../import';
import parseExport from '../export';
import parseArrowFunctionExpression from '../arrowFunctionExpression';


import { parseImportAbbreviation } from '../../utils/parser';

interface Options {
  isFunctional: boolean;
}

// const parseReactComponent = (abbreviationNodes: string,
//   options: Options) => {

// }

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
  const re = /[\>\:\@]/;
  const nodes = abbreviationNodes.split(re);

  if (nodes.length === 4) {
    const [, reactImportsStr, propsStr, componentName] = nodes;
    const importStatement = parseES6Import(`>React:${mapReactImports(reactImportsStr)}>react`);
    const exportStatement = parseExport(`>${componentName}`, { es6: true, isDefault: true });
    const component = parseArrowFunctionExpression(`${componentName}:${propsStr}:=>body`);
    return {
      type: 'Program',
      body: [
        importStatement,
        component,
        exportStatement
      ]
    }
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
