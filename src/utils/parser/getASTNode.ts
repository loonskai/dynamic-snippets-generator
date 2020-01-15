import NodeTypes from '../../constants/nodeTypes';

export const identifier = (name: string): Identifier => ({
  type: NodeTypes.IDENTIFIER,
  name,
});

export const stringLiteral = (value: string): StringLiteral => ({
  type: NodeTypes.STRING_LITERAL,
  value,
});

export const objectProperty = (name: string): ObjectProperty => ({
  type: NodeTypes.OBJECT_PROPERTY,
  shorthand: true,
  value: identifier(name),
  key: identifier(name),
});

export const objectPattern = (properties: string[]): ObjectPattern => ({
  type: NodeTypes.OBJECT_PATTERN,
  properties: properties.map(objectProperty),
});

export const importDefaultSpecifier = (name: string): ImportDefaultSpecifier => ({
  type: NodeTypes.IMPORT_DEFAULT_SPECIFIER,
  local: identifier(name),
});

export const importSpecifier = (name: string): ImportSpecifier => ({
  type: NodeTypes.IMPORT_SPECIFIER,
  imported: identifier(name),
});

export const importNamespaceSpecifier = (alias: string): ImportNamespaceSpecifier => ({
  type: NodeTypes.IMPORT_NAMESPACE_SPECIFIER,
  local: identifier(alias),
});

export const blockStatement = (body?: Array<any>): BlockStatement => ({
  type: NodeTypes.BLOCK_STATEMENT,
  body: body || [],
});

export const arrowFunctionExpression = ({
  id,
  params,
  async,
  body,
}: {
  id: Identifier | null;
  params: Array<ObjectPattern | Identifier>;
  async: boolean;
  body?: Array<AnyNode>;
}): ArrowFunctionExpression => {
  const result = {
    type: NodeTypes.ARROW_FUNCTION_EXPRESSION,
    id,
    params,
    async,
  } as ArrowFunctionExpression;
  if (body) {
    result.body = blockStatement(body);
  }

  return result;
};

export const assignmentExpression = ({ left, right }: { left: any; right: any }): AssignmentExpression => ({
  type: NodeTypes.ASSIGNMENT_EXPRESSION,
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
  type: NodeTypes.MEMBER_EXPRESSION,
  object: identifier(object),
  property: identifier(property),
  computed,
});

export const returnStatement = (argument: any): ReturnStatement => ({
  type: NodeTypes.RETURN_STATEMENT,
  argument: argument,
});
