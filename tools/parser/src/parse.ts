import { split } from './helpers';
import startingNodes from './startingNodes';

import * as parseStatement from './parseStatement';

const parse = (str: string): string => {
  const [startingNode, ...nodes] = split(str);
  switch (startingNode) {
    case startingNodes.RQR:
      return parseStatement._require(nodes);
    case startingNodes.IMP:
      return parseStatement._import(nodes);
    case startingNodes.L:
      return parseStatement._let(nodes);
    case startingNodes.C:
      return parseStatement._const(nodes);
    case startingNodes.F:
      return parseStatement._function(nodes);
    case startingNodes.EX:
      return parseStatement._namedExport(nodes);
    case startingNodes.EXD:
      return parseStatement._defaultExport(nodes);
    case startingNodes.MEXP:
      return parseStatement._moduleExports(nodes);
    default:
      return str;
  }
};

export default parse;
