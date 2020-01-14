import { _import } from '../../src/parser';

describe('import statement', () => {
  it('>package', () => {
    expect(_import('>package')).toEqual("import package from 'package';");
  });

  it('>customName>package', () => {
    expect(_import('>customName>package')).toEqual(
      "import customName from 'package';",
    );
  });

  it(':obj>package', () => {
    expect(_import(':obj>package')).toEqual("import { obj } from 'package';");
  });

  it(':objA,objB>package', () => {
    expect(_import(':objA,objB>package')).toEqual(
      "import { objA, objB } from 'package';",
    );
  });

  it(':objA,objB,objC>package', () => {
    expect(_import(':objA,objB,objC>package')).toEqual(
      "import { objA, objB, objC } from 'package';",
    );
  });

  it('>DefaultObject:objA>package', () => {
    expect(_import('>DefaultObject:objA>package')).toEqual(
      "import DefaultObject, { objA } from 'package';",
    );
  })

  it('>DefaultObject:objA,objB>package', () => {
    expect(_import('>DefaultObject:objA,objB>package')).toEqual(
      "import DefaultObject, { objA, objB } from 'package';",
    );
  })

  it('*alias>package', () => {
    expect(_import('*alias>package')).toEqual(
      "import * as alias from 'package';",
    );
  });
});
