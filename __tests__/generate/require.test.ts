import generate from '../../src/generator';

describe('require statement', () => {
  it('default require', () => {
    expect(generate.require("const package = require('package');")).toEqual(
      "const ${1:package} = require('${2:package}');",
    );
  });

  it('require with custom name', () => {
    expect(generate.require("const customName = require('package');")).toEqual(
      "const ${1:customName} = require('${2:package}');",
    );
  });

  it('require with no object properties', () => {
    expect(generate.require("const {} = require('package');")).toEqual(
      "const { $1 } = require('${2:package}');",
    );
  });

  it('require with 1 object property', () => {
    expect(generate.require("const { a } = require('package');")).toEqual(
      "const { ${1:a} } = require('${2:package}');",
    );
  });

  it('require with 2 object properties', () => {
    expect(generate.require("const { a, b } = require('package');")).toEqual(
      "const { ${1:a}, ${2:b} } = require('${3:package}');",
    );
  });

  it('require with 3 object properties', () => {
    expect(generate.require("const { a, b, c } = require('package');")).toEqual(
      "const { ${1:a}, ${2:b}, ${3:c} } = require('${4:package}');",
    );
  });
});
