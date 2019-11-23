interface FunctionParams {
  isObjectPattern: boolean;
  list: string[];
}

/* Node types */

interface VariableDeclaration<T> {
  type: string;
  kind: 'const' | 'let';
  declarations: Array<VariableDeclarator<T>>;
}

interface VariableDeclarator<T> {
  type: 'VariableDeclarator';
  id: ObjectPattern | Identifier;
  init: T;
}

interface Identifier {
  type: 'Identifier';
  name: string;
}

interface ObjectPattern {
  type: 'ObjectPattern';
  properties: Array<any>;
}

interface ObjectProperty {
  type: 'ObjectProperty';
  shorthand: boolean;
  value: Identifier;
  key: Identifier;
}

interface StringLiteral {
  type: 'StringLiteral';
  value: string;
}

interface CallExpression {
  type: 'CallExpression';
  callee: Identifier;
  arguments: Array<StringLiteral>;
}

interface ImportDeclaration {
  type: 'ImportDeclaration';
  specifiers: Array<
    ImportDefaultSpecifier | ImportSpecifier | ImportNamespaceSpecifier
  >;
  source: StringLiteral;
}

interface ImportDefaultSpecifier {
  type: 'ImportDefaultSpecifier';
  local: Identifier;
}

interface ImportSpecifier {
  type: 'ImportSpecifier';
  imported: Identifier;
}

interface ImportNamespaceSpecifier {
  type: 'ImportNamespaceSpecifier';
  local: Identifier;
}

interface BaseFunstionExpression {
  id: Identifier | null;
  async: boolean;
  params: Array<Identifier | ObjectPattern>;
  body: BlockStatement;
}

interface FunctionDeclaration extends BaseFunstionExpression {
  type: 'FunctionDeclaration';
}

interface ArrowFunctionExpression extends BaseFunstionExpression {
  type: 'ArrowFunctionExpression';
}

interface ExpressionStatement<T> {
  type: 'ExpressionStatement';
  expression: T;
}

interface BlockStatement {
  type: 'BlockStatement';
  body: Array<any>;
}

interface ExportNamedDeclaration {
  type: 'ExportNamedDeclaration';
  declaration: VariableDeclaration<any>;
}

interface ExportDefaultDeclaration {
  type: 'ExportDefaultDeclaration';
  declaration: Identifier;
}

interface AssignmentExpression {
  type: 'AssignmentExpression';
  operator: '=';
  left: MemberExpression | Identifier;
  right: Identifier;
}

interface MemberExpression {
  type: 'MemberExpression';
  computed: boolean;
  object: Identifier;
  property: Identifier;
}

type AnyNode =
  | VariableDeclaration<any>
  | ImportDeclaration
  | FunctionDeclaration
  | ExpressionStatement<any>
  | ExportNamedDeclaration
  | ExportDefaultDeclaration;
