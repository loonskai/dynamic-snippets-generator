import babelGenerate from 'babel-generator';

export default (ast: any, postProcessing?: (code: string) => string) => {
  const { code } = babelGenerate(ast, {
    retainLines: true,
    quotes: 'single',
  });
  return postProcessing ? postProcessing(code) : code;
};
