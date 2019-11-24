const checkAbbreviation = {
  isIdentifiersList: (abbreviation: string): boolean =>
    /^[/\w]+:.*[^:]$/.test(abbreviation),
  isObjectPattern: (abbreviation: string): boolean =>
    /^[/\w]+:.*:$/.test(abbreviation),
  isAsync: (abbreviation: string): boolean => /^a\/.*/.test(abbreviation),
};

const parseObjectDestructuringProps = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

export const parseImportAbbreviation = (
  nodesString: string,
): {
  name: string;
  customName?: string;
  objectProperties?: string[];
  alias?: string;
} => {
  const [_, flag, nodes] = nodesString.match(/^([\*>:])(.+)/);
  const nodesArray = nodes.split('>');
  const name = nodesArray.pop() || '';
  const customName = flag === '>' ? nodesArray.pop() : undefined;
  const objectProperties =
    flag === ':' ? parseObjectDestructuringProps(nodesArray.pop()) : undefined;
  const alias = flag === '*' ? nodesArray.pop() : undefined;

  return { name, customName, objectProperties, alias };
};

export const parseFunctionAbbreviation = (
  nodesString: string,
): {
  name: string;
  async: boolean;
  functionParams: FunctionParams;
} => {
  let [name, paramsStr] = nodesString.split(':');
  const async = checkAbbreviation.isAsync(nodesString);
  const list = parseObjectDestructuringProps(paramsStr);
  const isObjectPattern = checkAbbreviation.isObjectPattern(nodesString);
  name = async ? name.replace('a/', '') : name;

  return {
    name,
    async,
    functionParams: {
      isObjectPattern,
      list,
    },
  };
};

export const parseExportAbbreviation = (
  abbreviation: string,
): {
  name: string;
} => {
  const nodes = abbreviation.split('>');
  const name = nodes.pop() || '';
  return { name };
};
