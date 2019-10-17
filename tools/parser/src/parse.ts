import { split } from './helpers';

const getStringRequire = (vars, value) =>
  `const ${vars} = require('${value}');`;

const parseNamedImport = value => {
  const vars = value.split(',');
  return `{ ${vars.join(', ')} }`;
};

const parseRequireStatement = (nodes: string[]): string => {
  const { length } = nodes;
  if (length === 1) {
    const [packageName] = nodes;
    return getStringRequire(packageName, packageName);
  }
  if (length === 2) {
    const [vars, packageName] = nodes;
    if (vars.indexOf(',') === -1) {
      return getStringRequire(vars, packageName);
    } else {
      return getStringRequire(parseNamedImport(vars), packageName);
    }
  }
};

const parse = (str: string): string => {
  const [startingNode, ...nodes] = split(str);
  switch (startingNode) {
    case 'rqr':
      return parseRequireStatement(nodes);
    default:
      return str;
  }
};

export default parse;
