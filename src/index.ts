import tokenizeAbbreviation from './tokenizeAbbreviation';
import abbreviationIDs from './constants/abbreviationIDs';

import generate from './snippetGenerator';
import * as parse from './parser';

export default (abbreviation: string): string | null => {
  // TODO: Parse arrow functions
  if (abbreviation.indexOf('=>') !== -1) return null;

  const [abbreviationID, abbreviationNodes] = tokenizeAbbreviation(
    abbreviation,
  );
  switch (abbreviationID) {
    case abbreviationIDs.RQR:
      return generate(abbreviationIDs.RQR, parse._require(abbreviationNodes));
    // case identifiers.IMP:
    //   return _import(nodes);
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
