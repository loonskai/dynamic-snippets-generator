import traverse from '@babel/traverse';
import * as parser from '@babel/parser';
import * as t from 'babel-types';

import generate from '../utils/generate';
import {
  getNamedPlaceholder,
  generateBlockWithPlaceholder,
  bindFunctionParametersMapping,
} from '../utils/generator';
import * as generateNode from '../utils/generator/generateNode';
import Counter from '../utils/generator/counter';

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

  return generate(ast, (code: string) => code.replace(';', ''));
};

export default _functionDeclaration;
