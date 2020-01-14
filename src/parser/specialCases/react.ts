// import NodeTypes from '../constants/nodeTypes';
// import { parseFunctionAbbreviation } from '../utils/parser';
import * as getASTNode from '../../utils/parser/getASTNode';


const getReactImport = (cut: string): string => {
  const str = cut[0] !== ':' ? cut : cut.replace(':', '');
  switch (str) {
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


/* 
export default function(babel) {
  const { types: t } = babel;
  let count = 1;
  let defaultCount = null;
  
  const updateName = (node, { ref, defaultCount } = {}) => {
  	const { name } = node[ref];    
    return t.identifier(`\${${defaultCount || count++}:${name}}`)
  }

  return {
    name: "ast-transform", // not required
    visitor: {
      	ImportSpecifier(path) {
          const { name } = path.node.imported;
          if (name[0] === '$') return;

          const updatedName = updateName(path.node, { ref: 'imported' });
          const newSpecifier = t.importSpecifier(updatedName, updatedName);
          path.replaceWith(newSpecifier);
        },
    	VariableDeclarator(path) { 
            defaultCount = count;
          	path.set('id', updateName(path.node, { ref: 'id' }));
        },
      	ExportDefaultDeclaration(path) {
            path.set('declaration', updateName(path.node, { ref: 'declaration', defaultCount }));
        },
      	ObjectPattern(path) {
        	// Props destructure
          const { properties } = path.node;
          const updatedProps = properties.map(prop => {
            const updatedName = updateName(prop, { ref: 'key' });
            const newProp = t.objectProperty(updatedName, updatedName, false, true)
          	return newProp;
          });
          path.set('properties', updatedProps);
        },
      	JSXElement(path) {
        	path.node.children.push(t.jsxText(`\$${count++}`));
        }
    }
  };
}
*/
