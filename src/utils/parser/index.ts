const checkAbbreviation = {
  isIdentifiersList: (abbreviation: string): boolean => /^[/\w]+:.*[^:]$/.test(abbreviation),
  isObjectPattern: (abbreviation: string): boolean => /^[/\w]+:.*:$/.test(abbreviation),
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
  let customName = flag === '>' ? nodesArray.pop() : undefined;
  let objectProperties;
  if (customName && customName.indexOf(':') !== -1) {
    const [defaultName, objProps] = customName.split(':');
    objectProperties = parseObjectDestructuringProps(objProps);
    customName = defaultName;
  }
  if (flag === ':') {
    objectProperties = parseObjectDestructuringProps(nodesArray.pop());
  }

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
  // eslint-disable-next-line prefer-const
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
