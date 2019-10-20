import generateSnippet from '../src/generateSnippet';
import identifiers from '../src/constants/identifiers';

describe('generate', () => {
  describe('require statement', () => {
    it('default require', () => {
      expect(
        generateSnippet(identifiers.RQR, "const package = require('package');")
      ).toEqual("const ${1:package} = require('${2:package}');");
    });

    it('require with custom name', () => {
      expect(
        generateSnippet(
          identifiers.RQR,
          "const customName = require('package');"
        )
      ).toEqual("const ${1:customName} = require('${2:package}');");
    });

    it('require with no object properties', () => {
      expect(
        generateSnippet(identifiers.RQR, "const {} = require('package');")
      ).toEqual("const { $1 } = require('${2:package}');");
    });

    it('require with 1 object properties', () => {
      expect(
        generateSnippet(identifiers.RQR, "const { a } = require('package');")
      ).toEqual("const { ${1:a} } = require('${2:package}');");
    });

    it('require with 2 object properties', () => {
      expect(
        generateSnippet(identifiers.RQR, "const { a, b } = require('package');")
      ).toEqual("const { ${1:a}, ${2:b} } = require('${3:package}');");
    });

    it('require with 3 object properties', () => {
      expect(
        generateSnippet(
          identifiers.RQR,
          "const { a, b, c } = require('package');"
        )
      ).toEqual("const { ${1:a}, ${2:b}, ${3:c} } = require('${4:package}');");
    });
  });
});
