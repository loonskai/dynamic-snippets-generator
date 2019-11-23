import _require from './require';
import abbreviationIDs from '../constants/abbreviationIDs';

const generate = (abbreviationIDs: string, code: string): string | null => {
  switch (abbreviationIDs) {
    case abbreviationIDs.RQR:
      return _require(code);
    default:
      return null;
  }
};

export default generate;
