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

const _functionDeclaration = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr);
  const counter = new Counter();
  let changed = false;

  traverse(ast, {
    FunctionDeclaration(path) {
      if (changed) return;
      const { id, params } = path.node;
      const initialName = (id && id.name) || '';

      const newId = generateNode.identifier(
        getNamedPlaceholder(counter.value, initialName),
      );
      const newParams: any = params.map(bindFunctionParametersMapping(counter));
      const body = generateBlockWithPlaceholder(counter.value);
      const newFunctionDeclaration: any = t.functionDeclaration(
        newId,
        newParams,
        body,
      );

      changed = true;
      path.replaceWith(newFunctionDeclaration);
    },
  });

  const { code } = generate(ast as any, {
    retainLines: true,
    quotes: 'single',
  });
  return code.replace(';', '');
};

export default _functionDeclaration;
