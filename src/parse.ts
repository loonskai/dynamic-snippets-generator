import identifiers from './constants/identifiers';
import * as out from './utils/out';
import {
  parseNamedImport,
  parseAliasImport,
  parseArrowFunction,
} from './utils/parseNodes';

const _require = (nodes: string[]): string => {
  switch (nodes.length) {
    case 1: {
      const [packageName] = nodes;
      return out._require(packageName, packageName);
    }
    case 2: {
      const [vars, packageName] = nodes;
      if (vars.indexOf(',') !== -1) {
        return out._require(parseNamedImport(vars), packageName);
      }
      return out._require(vars, packageName);
    }
    default:
      return '';
  }
};

const _import = (nodes: string[]): string => {
  switch (nodes.length) {
    case 1: {
      const [packageName] = nodes;
      return out._import(packageName, packageName);
    }
    case 2: {
      const [vars, packageName] = nodes;
      if (vars === '') return out._import(`{ }`, packageName);

      if (vars.indexOf(',') !== -1)
        return out._import(parseNamedImport(vars), packageName);

      if (vars.indexOf('*') !== -1)
        return out._import(parseAliasImport(vars), packageName);

      return out._import(vars, packageName);
    }
    default:
      return '';
  }
};

const _let = (nodes: string[]): string => {
  const [packageName, value] = nodes;
  return out._let(packageName, value);
};

const _const = (nodes: string[]): string => {
  const [packageName, value] = nodes;
  return out._const(packageName, value);
};

const _function = (nodes: string[]): string => {
  const [name, params] = nodes;
  name;
  params;
  switch (nodes.length) {
    case 1:
    case 2:
      return out._funcExpression(name, params);
    default:
      return '';
  }
};

const _namedExport = (nodes: string[]): string => {
  const [name] = nodes;
  return out._namedExport(name);
};

const _defaultExport = (nodes: string[]): string => {
  const [name] = nodes;
  return out._defaultExport(name);
};

const _moduleExports = (nodes: string[]): string => {
  const [name] = nodes;
  return out._moduleExports(name);
};

const _arrowFunction = (str: string): string => {
  const [nodes, isAsync] = str.split('=>');
  let parsedNodes = parseArrowFunction(nodes);
  if (isAsync) {
    const arrowFuncExpressionIdx =
      parsedNodes.findIndex(str => str === '=>') - 1;
    parsedNodes.splice(arrowFuncExpressionIdx, 0, 'async');
  }
  return `${parsedNodes.join(' ')} `;
};

const parse = (str: string): string => {
  if (str.indexOf('=>') !== -1) return _arrowFunction(str);
  const [startingNode, ...nodes] = str.split(':');
  switch (startingNode) {
    case identifiers.RQR:
      return _require(nodes);
    case identifiers.IMP:
      return _import(nodes);
    case identifiers.L:
      return _let(nodes);
    case identifiers.C:
      return _const(nodes);
    case identifiers.F:
      return _function(nodes);
    case identifiers.EX:
      return _namedExport(nodes);
    case identifiers.EXD:
      return _defaultExport(nodes);
    case identifiers.MEXP:
      return _moduleExports(nodes);
    default:
      return str;
  }
};

export default parse;
