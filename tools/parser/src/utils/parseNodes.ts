export const parseNamedImport = (value: string): string => {
  const vars = value.split(',');
  return `{ ${vars.join(', ')} }`;
};

export const parseAliasImport = (value: string): string => {
  const [, vars] = value.split('*');
  return `* as ${vars}`;
};

export const parseFunctionParams = (str: string): string => {
  if (str.indexOf(',') !== -1) return str.split(',').join(', ');
  return str;
};
