/* Get strings */
const getStringRequire = (vars: string, value: string): string =>
  `const ${vars} = require('${value}');`;

const getStringImport = (vars: string, value: string): string =>
  `import ${vars} from '${value}';`;

const getStringLet = (vars: string, value?: string): string =>
  `let ${vars} = ${value ? value + ';' : ''}`;

const getStringConst = (vars: string, value?: string): string =>
  `const ${vars} = ${value ? value + ';' : ''}`;

const getStringFuncExpression = (name: string, params: string): string =>
  `function ${name}(${parseFunctionParams(params)}) { }`;

const getStringNamedExport = (name: string): string =>
  `export const ${name} = `;

const getStringDefaultExport = (name: string) => `export default ${name};`;

const getStringModuleExports = (name: string) =>
  `module.exports = ${name ? name + ';' : ''}`;

/* Parse different import types */
const parseNamedImport = (value: string): string => {
  const vars = value.split(',');
  return `{ ${vars.join(', ')} }`;
};

const parseAliasImport = (value: string): string => {
  const [, vars] = value.split('*');
  return `* as ${vars}`;
};

/* Parse function parameters */
const parseFunctionParams = (str: string): string => {
  if (str.indexOf(',') !== -1) return str.split(',').join(', ');
  return str;
};

/* MAIN PARSER */
export const _require = (nodes: string[]): string => {
  switch (nodes.length) {
    case 1: {
      const [packageName] = nodes;
      return getStringRequire(packageName, packageName);
    }
    case 2: {
      const [vars, packageName] = nodes;
      if (vars.indexOf(',') !== -1) {
        return getStringRequire(parseNamedImport(vars), packageName);
      }
      return getStringRequire(vars, packageName);
    }
    default:
      return '';
  }
};

export const _import = (nodes: string[]): string => {
  switch (nodes.length) {
    case 1: {
      const [packageName] = nodes;
      return getStringImport(packageName, packageName);
    }
    case 2: {
      const [vars, packageName] = nodes;
      if (vars === '') return getStringImport(`{ }`, packageName);

      if (vars.indexOf(',') !== -1)
        return getStringImport(parseNamedImport(vars), packageName);

      if (vars.indexOf('*') !== -1)
        return getStringImport(parseAliasImport(vars), packageName);
    }
    default:
      return '';
  }
};

export const _let = (nodes: string[]): string => {
  const [packageName, value] = nodes;
  return getStringLet(packageName, value);
};

export const _const = (nodes: string[]): string => {
  const [packageName, value] = nodes;
  return getStringConst(packageName, value);
};

export const _function = (nodes: string[]): string => {
  const [name, params] = nodes;
  name;
  params;
  switch (nodes.length) {
    case 1:
    case 2:
      return getStringFuncExpression(name, params);
    default:
      return '';
  }
};

export const _namedExport = (nodes: string[]): string => {
  const [name] = nodes;
  return getStringNamedExport(name);
};

export const _defaultExport = (nodes: string[]): string => {
  const [name] = nodes;
  return getStringDefaultExport(name);
};

export const _moduleExports = (nodes: string[]): string => {
  const [name] = nodes;
  return getStringModuleExports(name);
};
