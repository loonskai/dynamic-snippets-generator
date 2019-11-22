import parseRequire from './parseRequire';
import parseES6Import from './parseES6Import';
import generate from 'babel-generator';

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

const checkCornerCases = (code: string): string => {
  let codeProcessed;
  if (/^import '/.test(code)) {
    codeProcessed = code.replace(/^import /, 'import {} from ');
  }
  return codeProcessed || code;
};

export const _require = (abbreviation: string) =>
  parse(abbreviation, parseRequire);
export const _import = (abbreviation: string) =>
  checkCornerCases(parse(abbreviation, parseES6Import));

/* TODO */
export const _let = (abbreviation: string) => {};
export const _const = (abbreviation: string) => {};
export const _functionExpression = (abbreviation: string) => {};
export const _export = (abbreviation: string) => {};
export const _exportDefault = (abbreviation: string) => {};
export const _moduleExports = (abbreviation: string) => {};
export const _arrowFunction = (abbreviation: string) => {};
