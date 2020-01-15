import traverse from '@babel/traverse';
import * as parser from '@babel/parser';

import generate from '../utils/generate';
import { getPlaceholder, getNamedPlaceholder, isPlaceholder } from '../utils/generator';
import * as generateNode from '../utils/generator/generateNode';
import Counter from '../utils/generator/counter';

const _import = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr, {
    sourceType: 'module',
  });
  const counter = new Counter();

  traverse(ast, {
    ImportDeclaration(path) {
      const { specifiers } = path.node;
      if (specifiers.length > 0) return;

      const defaultSpecifier = generateNode.importSpecifier(getPlaceholder(counter.value)) as any;
      path.node.specifiers = [defaultSpecifier];
    },
    StringLiteral(path) {
      const initialName = path.node.value;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(counter.value, initialName);
      const newStringLiteral = generateNode.stringLiteral(newName);
      path.replaceWith(newStringLiteral as any);
    },
    ImportSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(counter.value, initialName);
      const newImportSpecifier = generateNode.importSpecifier(newName);
      path.replaceWith(newImportSpecifier as any);
    },
    ImportDefaultSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(counter.value, initialName);
      const newImportDefaultSpecifier = generateNode.importDefaultSpecifier(newName);
      path.replaceWith(newImportDefaultSpecifier as any);
    },
    ImportNamespaceSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(counter.value, initialName);
      const newImportNamespaceSpecifier = generateNode.importNamespaceSpecifier(newName);
      path.replaceWith(newImportNamespaceSpecifier as any);
    },
  });

  return generate(ast);
};

export default _import;
