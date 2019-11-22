import _require from './require';
import identifiers from '../constants/identifiers';

const generate = (identifier: string, code: string): string | null => {
  switch (identifier) {
    case identifiers.RQR:
      return _require(code);
    default:
      return null;
  }
};

export default generate;
