import * as ast from './utils/generateAST';
import sliceNodes from './utils/sliceNodes';
import identifiers from './constants/identifiers';

interface Data {
  type: null | string;
  nodes: string[];
}

const parseArrowFunction = (str: string) => {};

const _require = (str: string): any => {};

const parse = (str: string) => {
  if (str.indexOf('=>') !== -1) {
    parseArrowFunction(str);
    return;
  }

  const [identifier, nodes] = sliceNodes(str);
  switch (identifier) {
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
  /* let buffer = '';

  const data: Data = {
    type: null,
    nodes: []
  };

  for (let i = 0; i < symbols.length; i += 1) {
    const symbol = symbols[i];
    if (symbol === ':') {
      if (buffer === 'rqr' && !data.type) {
        data.type = 'require';
      } else {
        data.nodes.push(buffer);
      }
      buffer = '';
      continue;
      // data.push(buffer);
    }

    if (symbol === '>') {
      if (buffer === 'rqr' && !data.type) {
        data.type = 'require';
      } else {
        data.nodes.push(buffer);
      }
      buffer = '';
      continue;
    }

    buffer += symbol;
    data;

    if (i === symbols.length - 1) {
      data.nodes.push(buffer);
    }
  }

  const [name, value] = data.nodes;
  switch (data.type) {
    case 'require':
      return ast._require(name, value || name);
  } */
};

export default parse;
