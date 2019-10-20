import * as escodegen from 'escodegen';
import types from '../constants/expressionTypes';
import { parseObjectDestructuringProps, parseASTProperty } from './utils';

interface Tree {
  type: string;
  kind: string;
  declarations: any;
}

const _require = (str: string): string => {
  let name;
  let customName;
  let desctructuredProps;
  for (let i = 0; i < str.length; i += 1) {
    switch (str[i]) {
      case '>': {
        const nodes = str.split('>');
        name = nodes.pop();
        customName = nodes.pop();
        break;
      }
      case ':': {
        const nodes = str.split(':');
        name = nodes.pop();
        desctructuredProps = parseObjectDestructuringProps(nodes.pop());
        break;
      }
    }
  }

  const declaratorID = desctructuredProps
    ? {
        type: types.OBJECT_PATTERN,
        properties: desctructuredProps.map(parseASTProperty)
      }
    : {
        type: types.VARIABLE_DECLARATOR,
        id: {
          type: types.IDENTIFIER,
          name: customName || name
        }
      };

  const tree: Tree = {
    type: types.VARIABLE_DECLARATION,
    kind: 'const',
    declarations: [
      {
        type: types.VARIABLE_DECLARATOR,
        id: declaratorID,
        init: {
          type: types.CALL_EXPRESSION,
          callee: {
            type: types.IDENTIFIER,
            name: 'require'
          },
          arguments: [
            {
              type: types.LITERAL,
              value: name
            }
          ]
        }
      }
    ]
  };

  return escodegen.generate(tree);
};

export default _require;

/* export default function (babel) {
  const { types: t } = babel;
  let count = 1;

  const modifyProperty = ({ key: { name }}, count) => {
  	const updatedProp = t.identifier(`\${${count}:${name}}`);
	return t.objectProperty(updatedProp, updatedProp, false, true)
  }
  
  const modifyStringLiteral = (value, count) => `\${${count}:${value}}`;
  
  const parseIdentifier = node => {
    node.name = modifyStringLiteral(node.name, count);
    count += 1;
  };
  
  const parseObjectPattern = node => {
    const { properties } = node;
    node.properties = properties.map(prop => {
      const updatedProp = modifyProperty(prop, count);
      count += 1;
      return updatedProp;
    });
  };
  
  return {
    name: "ast-transform", // not required
    visitor: {
      VariableDeclarator(path) {
      	const { id: nodeId } = path.node;
        if (t.isIdentifier(nodeId)) return parseIdentifier(nodeId);
        if (t.isObjectPattern(nodeId)) return parseObjectPattern(nodeId);
      },
      StringLiteral(path) {
        path.node.value = modifyStringLiteral(path.node.value, count)
      	count += 1;
      }
    }
  };
} */
