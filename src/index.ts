import tokenizeAbbreviation from './tokenizeAbbreviation';
import abbreviationIDs from './constants/abbreviationIDs';

import generate from './generator';
import * as parse from './parser';

export default (abbreviation: string): string => {
  if (abbreviation.indexOf('=>') !== -1)
    return generate.arrowFunctionExpression(parse._arrowFunctionExpression(abbreviation));

  const [abbreviationID, abbreviationNodes] = tokenizeAbbreviation(abbreviation);

  switch (abbreviationID) {
    case abbreviationIDs.RQR:
      return generate.require(parse._require(abbreviationNodes));
    case abbreviationIDs.IMP:
      return generate.import(parse._import(abbreviationNodes));
    case abbreviationIDs.F:
      return generate.functionDeclaration(parse._functionDeclaration(abbreviationNodes));
    case abbreviationIDs.EX:
      return generate.export(parse._export(abbreviationNodes));
    case abbreviationIDs.EXD:
      return generate.export(parse._exportDefault(abbreviationNodes));
    case abbreviationIDs.MEXP:
      return generate.export(parse._moduleExports(abbreviationNodes));
    case abbreviationIDs.REACT:
      return generate.reactComponent(parse._react(abbreviationNodes));
    default:
      return abbreviation;
  }
};
