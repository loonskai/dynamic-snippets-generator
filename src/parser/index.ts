import generate from 'babel-generator';
import parseRequire from './parseRequire';
import parseES6Import from './parseES6Import';
import parseFunctionExpression from './parseFunctionExpression';
import parseArrowFunctionExpression from './parseArrowFunctionExpression';
import checkCornerCases from './utils/checkCornerCases';

const parse = (
  abbreviation: string,
  parser: (str: string) => AnyNode,
): string => {
  const tree = parser(abbreviation);
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
export const _functionExpression = (abbreviation: string) =>
  parse(abbreviation, parseFunctionExpression);
export const _arrowFunction = (abbreviation: string) =>
  parse(abbreviation, parseArrowFunctionExpression);

/* TODO */
export const _export = (abbreviation: string) => {};
export const _exportDefault = (abbreviation: string) => {};
export const _moduleExports = (abbreviation: string) => {};
