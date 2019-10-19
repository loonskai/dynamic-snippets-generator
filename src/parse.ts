import * as ast from './ast';
import sliceNodes from './utils/sliceNodes';
import identifiers from './constants/identifiers';

const parseArrowFunction = (str: string) => {};

const parse = (str: string) => {
  if (str.indexOf('=>') !== -1) {
    parseArrowFunction(str);
    return;
  }

  const [identifier, nodes] = sliceNodes(str);
  switch (identifier) {
    case identifiers.RQR:
      return ast._require(nodes);
    // case identifiers.IMP:
    //   return _import(nodes);
    // case identifiers.L:
    //   return _let(nodes);
    // case identifiers.C:
    //   return _const(nodes);
    // case identifiers.F:
    //   return _function(nodes);
    // case identifiers.EX:
    //   return _namedExport(nodes);
    // case identifiers.EXD:
    //   return _defaultExport(nodes);
    // case identifiers.MEXP:
    //   return _moduleExports(nodes);
    default:
      return str;
  }
};

export default parse;
