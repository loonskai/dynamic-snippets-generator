enum NodeTypes {
  CALL_EXPRESSION = 'CallExpression',
  IDENTIFIER = 'Identifier',
  STRING_LITERAL = 'StringLiteral',
  OBJECT_PATTERN = 'ObjectPattern',
  OBJECT_PROPERTY = 'ObjectProperty',
  VARIABLE_DECLARATION = 'VariableDeclaration',
  VARIABLE_DECLARATOR = 'VariableDeclarator',
  IMPORT_DECLARATION = 'ImportDeclaration',
  IMPORT_DEFAULT_SPECIFIER = 'ImportDefaultSpecifier',
  IMPORT_SPECIFIER = 'ImportSpecifier',
  IMPORT_NAMESPACE_SPECIFIER = 'ImportNamespaceSpecifier',
  FUNCTION_DECLARATION = 'FunctionDeclaration',
  BLOCK_STATEMENT = 'BlockStatement',
  ARROW_FUNCTION_EXPRESSION = 'ArrowFunctionExpression',
  EXPRESSION_STATEMENT = 'ExpressionStatement',
  EXPORT_NAMED_DECLARATION = 'ExportNamedDeclaration',
  EXPORT_DEFAULT_DECLARATION = 'ExportDefaultDeclaration',
  ASSIGNMENT_EXPRESSION = 'AssignmentExpression',
  MEMBER_EXPRESSION = 'MemberExpression',
  RETURN_STATEMENT = 'ReturnStatement',
}

export default NodeTypes;
