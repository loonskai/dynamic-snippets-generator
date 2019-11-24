const checkAbbreviation = {
  isIdentifiersList: (abbreviation: string): boolean =>
    /^[/\w]+:.*[^:]$/.test(abbreviation),
  isObjectPattern: (abbreviation: string): boolean =>
    /^[/\w]+:.*:$/.test(abbreviation),
  isAsync: (abbreviation: string): boolean => /^a\/.*/.test(abbreviation),
};

export const parseObjectDestructuringProps = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

export const parseFunctionParams = (str: string = ''): FunctionParams => ({
  isObjectPattern: /^:.*:$/.test(str),
  list: parseObjectDestructuringProps(str.replace(/:/g, '')),
});

export const parseAbbreviationNodes = (
  abbreviationNodes: string,
): {
  name: string;
  customName?: string;
  objectProperties?: string[];
  alias?: string;
} => {
  let name;
  let customName;
  let objectProperties;
  let alias;

  for (let i = 0; i < abbreviationNodes.length && !name; i += 1) {
    switch (abbreviationNodes[i]) {
      case '>': {
        const nodes = abbreviationNodes.split('>');
        name = nodes.pop();
        if (nodes.length > 1) {
          customName = nodes.pop();
        }
        break;
      }
      case ':': {
        const nodes = abbreviationNodes.split(':');
        name = nodes.pop();
        objectProperties = parseObjectDestructuringProps(nodes.pop());
        break;
      }
      case '*': {
        const nodes = abbreviationNodes.split(/[>*]/);
        name = nodes.pop();
        alias = nodes.pop();
      }
    }
  }

  name = name || '';
  return { name, customName, objectProperties, alias };
};

export const parseFuncAbbreviationNodes = (
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

export const parseExportAbbreviationNodes = (
  abbreviation: string,
): {
  name: string;
} => {
  const nodes = abbreviation.split('>');
  const name = nodes.pop() || '';
  return { name };
};
