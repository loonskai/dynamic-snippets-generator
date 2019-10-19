import * as ast from './utils/generateAST';

const parseArrowFunction = (str: string) => {};

const parse = (str: string) => {
  if (str.indexOf('=>') !== -1) {
    parseArrowFunction(str);
    return;
  }

  const symbols = str.split('');
  let buffer = '';

  interface Data {
    type: null | string;
    nodes: string[];
  }

  const data: Data = {
    type: null,
    nodes: []
  };

  for (let i = 0; i < symbols.length; i += 1) {
    const symbol = symbols[i];
    if (symbol === ':') {
      if (buffer === 'rqr' && !data.type) {
        data.type = 'require';
      } else {
        data.nodes.push(buffer);
      }
      buffer = '';
      continue;
      // data.push(buffer);
    }

    if (symbol === '>') {
      if (buffer === 'rqr' && !data.type) {
        data.type = 'require';
      } else {
        data.nodes.push(buffer);
      }
      buffer = '';
      continue;
    }

    buffer += symbol;

    if (i === symbols.length - 1) {
      data.nodes.push(buffer);
    }
  }

  const [name, value] = data.nodes;
  switch (data.type) {
    case 'require':
      return ast._require(name, value || name);
  }
};

export default parse;
