import ExpressionTypes from '../../constants/expressionTypes';

export const identifier = (name: string): Identifier => ({
  type: ExpressionTypes.IDENTIFIER,
  name,
});

export const stringLiteral = (value: string): StringLiteral => ({
  type: ExpressionTypes.STRING_LITERAL,
  value,
});

export const objectPattern = (properties: string[]): ObjectPattern => ({
  type: ExpressionTypes.OBJECT_PATTERN,
  properties: properties.map(objectProperty),
});

export const objectProperty = (name: string): ObjectProperty => ({
  type: ExpressionTypes.OBJECT_PROPERTY,
  shorthand: true,
  value: identifier(name),
  key: identifier(name),
});

export const importDefaultSpecifier = (
  name: string,
): ImportDefaultSpecifier => ({
  type: ExpressionTypes.IMPORT_DEFAULT_SPECIFIER,
  local: identifier(name),
});

export const importSpecifier = (name: string): ImportSpecifier => ({
  type: ExpressionTypes.IMPORT_SPECIFIER,
  imported: identifier(name),
});
