import * as t from 'babel-types';
import * as generateNode from './generateNode';

import Counter from './counter';

export const getPlaceholder = (count: number): string => `\$${count}`;

export const getNamedPlaceholder = (count: number, name: string): string => `\${${count}:${name}}`;

export const isPlaceholder = (name: string): boolean => /^\${?\d+:?.*}?$/.test(name);

export const generateBlockWithPlaceholder = (count: number): t.BlockStatement =>
  t.blockStatement([t.expressionStatement(t.identifier(getPlaceholder(count)))]);

export const bindFunctionParametersMapping = (counter: Counter): any => (
  value: t.Identifier | t.ObjectPattern,
): t.Identifier | t.ObjectPattern => {
  if (t.isObjectPattern(value)) {
    const { properties } = value;
    const newProperties = properties.map((value: any) => {
      const keyAndValue = generateNode.identifier(getNamedPlaceholder(counter.value, value.key.name));
      return t.objectProperty(keyAndValue, keyAndValue, false, true);
    }) as any;
    return t.objectPattern(newProperties);
  }
  return generateNode.identifier(getNamedPlaceholder(counter.value, value.name));
};
