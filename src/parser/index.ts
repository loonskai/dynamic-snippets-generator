import generate from 'babel-generator';
import parseRequire from './require';
import parseES6Import from './import';
import parseFunctionDeclaration from './functionDeclaration';
import parseArrowFunctionExpression from './arrowFunctionExpression';
import parseExport from './export';
import checkCornerCases from './utils/checkCornerCases';

const parse = (
  abbreviation: string,
  parser: (str: string, options?: any) => AnyNode,
  options?: any,
): string => {
  const tree = parser(abbreviation, options);
  const { code } = generate(tree as any, {
    retainLines: true,
    quotes: 'single',
  });
  return code;
};

export const _require = (abbreviation: string) =>
  parse(abbreviation, parseRequire);
export const _import = (abbreviation: string) =>
  checkCornerCases(parse(abbreviation, parseES6Import));
export const _functionDeclaration = (abbreviation: string) =>
  parse(abbreviation, parseFunctionDeclaration);
export const _arrowFunction = (abbreviation: string) =>
  parse(abbreviation, parseArrowFunctionExpression);
export const _export = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: false, es6: true });
export const _exportDefault = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: true, es6: true });
export const _moduleExports = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: true, es6: false });
