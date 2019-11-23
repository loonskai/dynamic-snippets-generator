import * as t from 'babel-types';
import {
  Identifier,
  ImportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
} from 'babel-types';

export const identifier = (name: string): Identifier => t.identifier(name);

export const importSpecifier = (name: string): ImportSpecifier => {
  const local = identifier(name);
  const imported = identifier(name);
  return t.importSpecifier(local, imported);
};

export const importDefaultSpecifier = (
  name: string,
): ImportDefaultSpecifier => {
  const local = identifier(name);
  return t.importDefaultSpecifier(local);
};

export const importNamespaceSpecifier = (
  name: string,
): ImportNamespaceSpecifier => {
  const local = identifier(name);
  return t.importNamespaceSpecifier(local);
};
