import * as t from 'babel-types';

export const getPlaceholder = (count: number): string => `\$${count}`;

export const getNamedPlaceholder = (count: number, name: string): string =>
  `\${${count}:${name}}`;

export const isPlaceholder = (name: string): boolean =>
  /^\${?\d+:?.*}?$/.test(name);

export const generateBlockWithPlaceholder = (count: number): t.BlockStatement =>
  t.blockStatement([
    t.expressionStatement(t.identifier(getPlaceholder(count))),
  ]);
