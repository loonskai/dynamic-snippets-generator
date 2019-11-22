export const parseObjectDestructuringProps = (str?: string): string[] => {
  if (!str) return [];
  return str.indexOf(',') ? str.split(',') : [str];
};

export const parseAbbreviationNodes = (
  abbreviationNodes: string,
): {
  name: string;
  customName?: string;
  objectProperties?: string[];
} => {
  let name;
  let customName;
  let objectProperties;
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
    }
  }
  name = name || '';
  return { name, customName, objectProperties };
};
