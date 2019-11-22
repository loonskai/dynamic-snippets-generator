interface VariableDeclaration {
  type: string;
  kind: 'const' | 'let';
  declarations: Array<VariableDeclarator>;
}

interface VariableDeclarator {
  type: 'VariableDeclarator';
  id: ObjectPattern | Identifier;
  init: CallExpression;
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
  specifiers: Array<ImportDefaultSpecifier | ImportSpecifier>;
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

type AnyNode = VariableDeclaration;
