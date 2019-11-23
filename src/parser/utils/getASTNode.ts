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

export const importNamespaceSpecifier = (
  alias: string,
): ImportNamespaceSpecifier => ({
  type: ExpressionTypes.IMPORT_NAMESPACE_SPECIFIER,
  local: identifier(alias),
});

export const blockStatement = (): BlockStatement => ({
  type: ExpressionTypes.BLOCK_STATEMENT,
  body: [],
});

export const arrowFunctionExpression = ({
  id,
  params,
  async,
}: {
  id: Identifier | null;
  params: Array<ObjectPattern | Identifier>;
  async: boolean;
}): ArrowFunctionExpression => ({
  type: ExpressionTypes.ARROW_FUNCTION_EXPRESSION,
  id,
  params,
  async,
  body: blockStatement(),
});

export const assignmentExpression = ({
  left,
  right,
}: {
  left: any;
  right: any;
}): AssignmentExpression => ({
  type: ExpressionTypes.ASSIGNMENT_EXPRESSION,
  operator: '=',
  left,
  right,
});

export const memberExpression = ({
  object,
  property,
  computed = false,
}: {
  object: string;
  property: string;
  computed?: boolean;
}): MemberExpression => ({
  type: ExpressionTypes.MEMBER_EXPRESSION,
  object: identifier(object),
  property: identifier(property),
  computed,
});
