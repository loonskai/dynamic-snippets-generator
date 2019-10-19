const sliceNodes = (str: string): string[] => {
  const re = /[>:]/;
  const [identifier] = str.split(re);
  const idx = str.search(re);
  const nodes = str.slice(idx);
  return [identifier, nodes];
};

export default sliceNodes;
