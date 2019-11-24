import traverse from '@babel/traverse';
import generate from 'babel-generator';
import * as parser from '@babel/parser';
import * as t from 'babel-types';

import { getNamedPlaceholder, generateBlockWithPlaceholder } from './utils';
import * as generateNode from './utils/generateNode';

const _arrowFunctionExpression = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);

  let count = 1;
  let changed = false;
  const increaseCount = () => (count += 1);

  traverse(ast, {
    ArrowFunctionExpression(path) {
      if (changed) return;
      const parentNode = path.parentPath.node as any;
      const { name } = parentNode.id;
      const newId = t.identifier(getNamedPlaceholder(count, name));
      const { async } = path.node;

      const newParams = path.node.params.map(param => {
        if (t.isIdentifier(param)) {
          increaseCount();
          return generateNode.identifier(
            getNamedPlaceholder(count, param.name),
          );
        }
        if (t.isObjectPattern(param)) {
          const { properties } = param;
          const newProperties: any = properties.map((prop: any) => {
            increaseCount();
            const key = generateNode.identifier(
              getNamedPlaceholder(count, prop.key.name),
            );
            const value = generateNode.identifier(
              getNamedPlaceholder(count, prop.value.name),
            );
            return t.objectProperty(key, value, false, true);
          });
          return t.objectPattern(newProperties);
        }
      }) as any;

      increaseCount();
      const body = generateBlockWithPlaceholder(count);
      const newInit = t.arrowFunctionExpression(newParams, body, async);

      const newVariableDeclarator = t.variableDeclarator(newId, newInit) as any;
      changed = true;
      path.parentPath.replaceWith(newVariableDeclarator);
    },
  });

  const { code } = generate(ast as any, {
    retainLines: true,
    quotes: 'single',
  });
  return code.replace(';', '');
};

export default _arrowFunctionExpression;
