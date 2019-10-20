import defineAbbreviation from './utils/defineAbbreviation';
import identifiers from './constants/identifiers';

import generate from './generateSnippet';
import * as parseCode from './parseCode';

export default (abbreviation: string): string | null => {
  // TODO: Parse arrow functions
  if (abbreviation.indexOf('=>') !== -1) return null;

  const [identifier, nodesString] = defineAbbreviation(abbreviation);
  switch (identifier) {
    case identifiers.RQR:
      return generate(identifiers.RQR, parseCode._require(nodesString));
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
