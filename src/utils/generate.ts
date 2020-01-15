import babelGenerate from 'babel-generator';

export default (ast: any, postProcessing?: any, options: any = {}) => {
  const { code } = babelGenerate(ast, {
    retainLines: true,
    quotes: 'single',
    ...options,
  });
  return postProcessing ? postProcessing(code) : code;
};
