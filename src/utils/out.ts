import { parseFunctionParams } from './parseNodes';

export const _require = (vars: string, value: string): string =>
  `const ${vars} = require('${value}');`;

export const _import = (vars: string, value: string): string =>
  `import ${vars} from '${value}';`;

export const _let = (vars: string, value?: string): string =>
  `let ${vars} = ${value ? value + ';' : ''}`;

export const _const = (vars: string, value?: string): string =>
  `const ${vars} = ${value ? value + ';' : ''}`;

export const _funcExpression = (name: string, params: string): string =>
  `function ${name}${parseFunctionParams(params)} { }`;

export const _namedExport = (name: string): string => `export const ${name} = `;

export const _defaultExport = (name: string) => `export default ${name};`;

export const _moduleExports = (name: string) =>
  `module.exports = ${name ? name + ';' : ''}`;
