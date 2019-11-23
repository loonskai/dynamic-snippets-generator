import generate from '../../src/snippetGenerator';

describe('import statement', () => {
  it('default import statement', () => {
    expect(generate.import("import package from 'package';")).toEqual(
      "import ${1:package} from '${2:package}';",
    );
  });

  it('import with custom name', () => {
    expect(generate.import("import customName from 'package';")).toEqual(
      "import ${1:customName} from '${2:package}';",
    );
  });

  it('import with no destructured properties', () => {
    expect(generate.import("import {} from 'package';")).toEqual(
      "import { $1 } from '${2:package}';",
    );
  });

  it('import with 1 object property', () => {
    expect(generate.import("import { a } from 'package';")).toEqual(
      "import { ${1:a} } from '${2:package}';",
    );
  });

  it('import with 2 object properties', () => {
    expect(generate.import("import { a, b } from 'package';")).toEqual(
      "import { ${1:a}, ${2:b} } from '${3:package}';",
    );
  });

  it('import with 3 object properties', () => {
    expect(generate.import("import { a, b, c } from 'package';")).toEqual(
      "import { ${1:a}, ${2:b}, ${3:c} } from '${4:package}';",
    );
  });

  it('import with alias', () => {
    expect(generate.import("import * as ${1:alias} from '${2:package}';"));
  });
});
