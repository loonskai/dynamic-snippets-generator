class Parser {
  result: string;

  constructor(string) {
    this.getStart(string.split(':'));
  }

  getStart(nodes) {
    const [start, ...rest] = nodes;
    if (start === 'rqr') {
      this.parseRequireStatement(rest);
    }
  }

  parseRequireStatement(nodes) {
    const { length } = nodes;
    if (length === 1) {
      const [packageName] = nodes;
      this.getStringRequire(packageName, packageName);
    }
    if (length === 2) {
      const [vars, packageName] = nodes;
      if (vars.indexOf(',') === -1) {
        this.getStringRequire(vars, packageName);
      } else {
        this.getStringRequire(this.parseNamedImport(vars), packageName);
      }
    }
  }

  parseNamedImport(value) {
    const vars = value.split(',');
    return `{ ${vars.join(', ')} }`;
  }

  getStringRequire(vars, value) {
    this.result = `const ${vars} = require("${value}");`;
  }
}

export default Parser;
