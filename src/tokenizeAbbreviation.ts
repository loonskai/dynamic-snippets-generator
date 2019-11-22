const identifyExpression = (abbreviation: string): string[] => {
  const re = /[>:]/;
  const [abbreviationID] = abbreviation.split(re);
  const idx = abbreviation.search(re);
  const abbreviationNodes = abbreviation.slice(idx);
  return [abbreviationID, abbreviationNodes];
};

export default identifyExpression;
