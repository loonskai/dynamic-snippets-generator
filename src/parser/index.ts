import parseRequireCode from './require';
import generate from 'babel-generator';

const parse = (
  str: string,
  parseExpression: (str: string) => string,
): string => {
  const tree = parseExpression(str);
  const { code } = generate(tree as any, {
    retainLines: true,
    quotes: 'single',
  });

  return code;
};

export const _require = (str: string) => parse(str, parseRequireCode);

/* TODO */
export const _import = (s: string) => {};
export const _let = (s: string) => {};
export const _const = (s: string) => {};
export const _functionExpression = (s: string) => {};
export const _export = (s: string) => {};
export const _exportDefault = (s: string) => {};
export const _moduleExports = (s: string) => {};
export const _arrowFunction = (s: string) => {};
