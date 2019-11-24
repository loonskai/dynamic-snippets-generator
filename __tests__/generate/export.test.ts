import generate from '../../src/generator';

describe('es6 export statements', () => {
  it('es6 named export', () => {
    expect(generate.export('export const name = name;')).toEqual(
      'export const ${1:name} = $2',
    );
  });

  it('es6 default export', () => {
    expect(generate.export('export default name;')).toEqual(
      'export default ${1:name};',
    );
  });
});

describe('module.exports', () => {
  it('commonjs export', () => {
    expect(generate.export('module.exports = name;')).toEqual(
      'module.exports = ${1:name};',
    );
  });
});
