import parseRequire from './require';
import parseES6Import from './import';
import parseFunctionDeclaration from './functionDeclaration';
import parseArrowFunctionExpression from './arrowFunctionExpression';
import parseExport from './export';

import parseReact from './specialCases/react'

import generate from '../utils/generate';

const parse = (
  abbreviation: string,
  parser: (str: string, options?: any) => AnyNode,
  options?: any,
): string => generate(parser(abbreviation, options));

export const _require = (abbreviation: string) =>
  parse(abbreviation, parseRequire);
export const _import = (abbreviation: string) =>
  parse(abbreviation, parseES6Import);
export const _functionDeclaration = (abbreviation: string) =>
  parse(abbreviation, parseFunctionDeclaration);
export const _arrowFunctionExpression = (abbreviation: string) =>
  parse(abbreviation, parseArrowFunctionExpression);
export const _export = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: false, es6: true });
export const _exportDefault = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: true, es6: true });
export const _moduleExports = (abbreviation: string) =>
  parse(abbreviation, parseExport, { isDefault: true, es6: false });

  /* Special cases */
export const _react = (abbreviation: string) => parse(abbreviation, parseReact);
