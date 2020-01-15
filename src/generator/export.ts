import traverse from '@babel/traverse';
import * as parser from '@babel/parser';

import generate from '../utils/generate';
import { getNamedPlaceholder, getPlaceholder } from '../utils/generator';
import * as generateNode from '../utils/generator/generateNode';
import Counter from '../utils/generator/counter';

const _export = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr, {
    sourceType: 'module',
  });
  const counter = new Counter();
  let removeSemicolons;

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const { declarations } = path.node.declaration as any;
      const { name: initName } = declarations[0].id;
      const newId = generateNode.identifier(getNamedPlaceholder(counter.value, initName));
      const newInit = generateNode.identifier(getPlaceholder(counter.value));
      path.set('declaration', generateNode.constVariableDeclaration(newId, newInit) as any);
      counter.reset();
      removeSemicolons = true;
    },
    ExportDefaultDeclaration(path) {
      removeSemicolons = false;
      const { declaration } = path.node;
      const { name: initName } = declaration as any;
      path.set('declaration', generateNode.identifier(getNamedPlaceholder(counter.value, initName)) as any);
      counter.reset();
    },
    AssignmentExpression(path) {
      removeSemicolons = false;
      const { name: initName } = path.node.right as any;
      path.set('right', generateNode.identifier(getNamedPlaceholder(counter.value, initName)) as any);
      counter.reset();
    },
  });

  return removeSemicolons ? generate(ast, (code: string) => code.replace(';', '')) : generate(ast);
};

export default _export;
