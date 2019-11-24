import traverse from '@babel/traverse';
import generate from 'babel-generator';
import * as parser from '@babel/parser';
import * as t from 'babel-types';

import {
  getNamedPlaceholder,
  generateBlockWithPlaceholder,
  bindFunctionParametersMapping,
} from './utils';
import * as generateNode from './utils/generateNode';
import Counter from './utils/counter';

const _arrowFunctionExpression = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);
  const counter = new Counter();
  let changed = false;

  traverse(ast, {
    ArrowFunctionExpression(path) {
      if (changed) return;
      const { async, params } = path.node;
      const {
        id: { name: initName },
      } = path.parentPath.node as any;

      const newId = generateNode.identifier(
        getNamedPlaceholder(counter.value, initName),
      );
      const newParams: any = params.map(bindFunctionParametersMapping(counter));
      const body = generateBlockWithPlaceholder(counter.value);
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
