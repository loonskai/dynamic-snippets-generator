const identifyExpression = (abbreviation: string): string[] => {
  const re = /[>:]/;
  const [identifier] = abbreviation.split(re);
  const idx = abbreviation.search(re);
  const nodesString = abbreviation.slice(idx);
  return [identifier, nodesString];
};

export default identifyExpression;
