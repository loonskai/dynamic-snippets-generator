import generate from '../../src/generator';

describe('import statement', () => {
  it('default import statement', () => {
    expect(generate.import("import packageName from 'packageName';")).toEqual(
      "import ${1:packageName} from '${2:packageName}';",
    );
  });

  it('import with custom name', () => {
    expect(generate.import("import customName from 'packageName';")).toEqual(
      "import ${1:customName} from '${2:packageName}';",
    );
  });

  it('import with no destructured properties', () => {
    expect(generate.import("import {} from 'packageName';")).toEqual("import { $1 } from '${2:packageName}';");
  });

  it('import with 1 object property', () => {
    expect(generate.import("import { a } from 'packageName';")).toEqual("import { ${1:a} } from '${2:packageName}';");
  });

  it('import with 2 object properties', () => {
    expect(generate.import("import { a, b } from 'packageName';")).toEqual(
      "import { ${1:a}, ${2:b} } from '${3:packageName}';",
    );
  });

  it('import with 3 object properties', () => {
    expect(generate.import("import { a, b, c } from 'packageName';")).toEqual(
      "import { ${1:a}, ${2:b}, ${3:c} } from '${4:packageName}';",
    );
  });

  it('import with alias', () => {
    expect(generate.import("import * as alias from 'packageName';")).toEqual(
      "import * as ${1:alias} from '${2:packageName}';",
    );
  });
});
