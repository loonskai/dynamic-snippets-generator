import traverse from '@babel/traverse';
import * as parser from '@babel/parser';

import generate from '../utils/generate';
import { getNamedPlaceholder, isPlaceholder } from '../utils/generator';
import * as generateNode from '../utils/generator/generateNode';

const _import = (rawCodeStr: string): string => {
  const ast = parser.parse(rawCodeStr, {
    sourceType: 'module',
  });

  let count = 1;
  const increaseCount = () => (count += 1);

  traverse(ast, {
    ImportDeclaration(path) {
      const { specifiers } = path.node;
      if (specifiers.length > 0) return;

      const defaultSpecifier = generateNode.importSpecifier('$1') as any;
      path.node.specifiers = [defaultSpecifier];
      increaseCount();
    },
    StringLiteral(path) {
      const initialName = path.node.value;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(count, initialName);
      const newStringLiteral = generateNode.stringLiteral(newName);
      path.replaceWith(newStringLiteral as any);
      increaseCount();
    },
    ImportSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(count, initialName);
      const newImportSpecifier = generateNode.importSpecifier(newName);
      path.replaceWith(newImportSpecifier as any);
      increaseCount();
    },
    ImportDefaultSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(count, initialName);
      const newImportDefaultSpecifier = generateNode.importDefaultSpecifier(
        newName,
      );
      path.replaceWith(newImportDefaultSpecifier as any);
      increaseCount();
    },
    ImportNamespaceSpecifier(path) {
      const initialName = path.node.local.name;
      if (isPlaceholder(initialName)) return;

      const newName = getNamedPlaceholder(count, initialName);
      const newImportNamespaceSpecifier = generateNode.importNamespaceSpecifier(
        newName,
      );
      path.replaceWith(newImportNamespaceSpecifier as any);
      increaseCount();
    },
  });

  return generate(ast);
};

export default _import;
