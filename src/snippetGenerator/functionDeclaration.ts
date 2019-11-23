import traverse from '@babel/traverse';
import generate from 'babel-generator';
import * as parser from '@babel/parser';
import * as t from 'babel-types';

import { getPlaceholder, getNamedPlaceholder } from './utils';
import * as generateNode from './utils/generateNode';

const generateBlockWithPlaceholder = (count: number): t.BlockStatement =>
  t.blockStatement([
    t.expressionStatement(t.identifier(getPlaceholder(count))),
  ]);

const _functionDeclaration = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);

  let changed = false;
  let count = 1;
  const increaseCount = () => (count += 1);

  traverse(ast, {
    FunctionDeclaration(path) {
      if (changed) return;
      const { id, params } = path.node;

      const initialName = (id && id.name) || '';
      const newId = generateNode.identifier(
        getNamedPlaceholder(count, initialName),
      );

      const newParams: any = params.map(param => {
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
      });

      increaseCount();
      const block = generateBlockWithPlaceholder(count);

      const newFunctionDeclaration: any = t.functionDeclaration(
        newId,
        newParams,
        block,
      );
      path.replaceWith(newFunctionDeclaration);

      changed = true;
    },
  });

  const { code } = generate(ast as any, {
    retainLines: true,
    quotes: 'single',
  });

  return code.replace(';', '');
};

export default _functionDeclaration;
