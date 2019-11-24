const checkCornerCases = (code: string): string => {
  let codeProcessed;
  if (/^import '/.test(code)) {
    codeProcessed = code.replace(/^import /, 'import {} from ');
  }
  return codeProcessed || code;
};

export default checkCornerCases;
