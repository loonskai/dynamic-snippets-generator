export const parseNamedImport = (value: string): string => {
  const vars = value.split(',');
  return `{ ${vars.join(', ')} }`;
};

export const parseAliasImport = (value: string): string => {
  const [, vars] = value.split('*');
  return `* as ${vars}`;
};

export const parseFunctionParams = (str: string): string => {
  if (str.indexOf(',') !== -1) return `(${str.split(',').join(', ')})`;
  return str ? str : '()';
};

export const parseArrowFunction = (str: string): string[] => {
  if (!str) return ['()', '=>'];
  if (str.indexOf(':') !== -1) {
    const parsedNodes = [];
    const [name, params] = str.split(':');
    if (name) {
      parsedNodes.push(`const ${name} =`);
    }
    return [...parsedNodes, parseFunctionParams(params), '=>'];
  }

  if (str.indexOf(',') !== -1) {
    const params = parseFunctionParams(str);
    return [params, '=>'];
  }

  return [str, '=>'];
};
