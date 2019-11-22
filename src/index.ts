import identifyExpression from './identifyExpression';
import identifiers from './constants/identifiers';

import generate from './snippetGenerator';
import * as parse from './parser';

export default (abbreviation: string): string | null => {
  // TODO: Parse arrow functions
  if (abbreviation.indexOf('=>') !== -1) return null;

  const [identifier, nodesString] = identifyExpression(abbreviation);
  switch (identifier) {
    case identifiers.RQR:
      return generate(identifiers.RQR, parse._require(nodesString));
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
      return null;
  }
};
