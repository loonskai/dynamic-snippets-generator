import traverse from '@babel/traverse';
import * as parser from '@babel/parser';

const _reactComponent = (rawCodeStr: string): any => {
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
};

export default _reactComponent;
