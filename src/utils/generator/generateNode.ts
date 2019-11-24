import * as t from 'babel-types';
import {
  Identifier,
  ImportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  StringLiteral,
} from 'babel-types';

export const identifier = (value: string): Identifier => t.identifier(value);

export const importSpecifier = (value: string): ImportSpecifier => {
  const local = identifier(value);
  const imported = identifier(value);
  return t.importSpecifier(local, imported);
};

export const importDefaultSpecifier = (
  value: string,
): ImportDefaultSpecifier => {
  const local = identifier(value);
  return t.importDefaultSpecifier(local);
};

export const importNamespaceSpecifier = (
  value: string,
): ImportNamespaceSpecifier => {
  const local = identifier(value);
  return t.importNamespaceSpecifier(local);
};

export const stringLiteral = (value: string): StringLiteral =>
  t.stringLiteral(value);
