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
  abbreviationNodes: string,
): {
  name: string;
  async: boolean;
  functionParams: FunctionParams;
} => {
  let name;
  let async = false;
  let functionParams: FunctionParams = {
    isObjectPattern: false,
    list: [],
  };

  for (let i = 0; i < abbreviationNodes.length && !name; i += 1) {
    switch (abbreviationNodes[i]) {
      case '>': {
        const nodes = abbreviationNodes.split('>');
        name = nodes.pop();
        break;
      }
      case ':': {
        const nodes = abbreviationNodes.split('>');
        name = nodes.pop();
        functionParams = parseFunctionParams(nodes.pop());
        break;
      }
    }
  }

  name = name || '';
  return { name, async, functionParams };
};

export const parseArrowFuncAbbreviationNodes = (
  abbreviationNodes: string,
): {
  name: string;
  async: boolean;
  functionParams: FunctionParams;
} => {
  const nodesString = abbreviationNodes.split('=>')[0];
  let name;
  let async = false;
  let functionParams: FunctionParams = {
    isObjectPattern: false,
    list: [],
  };

  const nodes = nodesString.split('>');
  const paramsString = nodes.pop();
  name = nodes.pop();
  functionParams = parseFunctionParams(paramsString);

  name = name || '';
  return { name, async, functionParams };
};
