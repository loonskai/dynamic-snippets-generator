import parse from '../src/parse';

describe('parse', () => {
  describe('require statement', () => {
    it('rqr:package', () => {
      expect(parse('rqr:package')).toEqual(
        "const ${2:package} = require('${1:package}');",
      );
    });

    it('rqr:customName>package', () => {
      expect(parse('rqr:customName>package')).toEqual(
        "const ${2:customName} = require('${1:package}');",
      );
    });

    it('rqr::package', () => {
      expect(parse('rqr::package')).toEqual(
        "const { $2 } = require('${1:package}');",
      );
    });

    it('rqr:obj:package', () => {
      expect(parse('rqr:obj:package')).toEqual(
        "const { ${2:obj} } = require('${1:package}');",
      );
    });

    it('rqr:objA,objB:package', () => {
      expect(parse('rqr:objA,objB:package')).toEqual(
        "const { ${2:objA}, ${3:objB} } = require('${1:package}');",
      );
    });

    it('rqr:objA,objB,objC:package', () => {
      expect(parse('rqr:objA,objB,objC:package')).toEqual(
        "const { ${2:objA}, ${3:objB}, ${4:objC} } = require('${1:package}');",
      );
    });
  });

  describe('import statement', () => {
    it('imp:package', () => {
      expect(parse('imp:package')).toEqual(
        "import ${2:package} from '${1:package}';",
      );
    });

    it('imp:customName>package', () => {
      expect(parse('imp:customName>package')).toEqual(
        "import ${2:customName} from '${1:package}';",
      );
    });

    it('imp::package', () => {
      expect(parse('imp::package')).toEqual(
        "import { $2 } from '${1:package}';",
      );
    });

    it('imp:obj:package', () => {
      expect(parse('imp:obj:package')).toEqual(
        "import { ${2:obj} } from '${1:package}';",
      );
    });

    it('imp:objA,objB:package', () => {
      expect(parse('imp:objA,objB:package')).toEqual(
        "import { ${2:objA}, ${3:objB} } from '${1:package}';",
      );
    });

    it('imp:objA,objB,objC:package', () => {
      expect(parse('imp:objA,objB,objC:package')).toEqual(
        "import { ${2:objA}, ${3:objB}, ${4:objC} } from '${1:package}';",
      );
    });

    it('imp:*alias:package', () => {
      expect(parse('imp:*alias:package')).toEqual(
        "import * as ${2:alias} from '${1:package}';",
      );
    });
  });

  describe('let variable declarations', () => {
    it('l:name', () => {
      expect(parse('l:name')).toEqual('let ${1:name} = $2;');
    });

    it('l:name:value', () => {
      expect(parse('l:name:value')).toEqual('let ${1:name} = ${2:value};');
    });
  });

  describe('const variable declarations', () => {
    it('c:name', () => {
      expect(parse('c:name')).toEqual('const ${1:name} = $2;');
    });

    it('c:name:value', () => {
      expect(parse('c:name:value')).toEqual('const ${1:name} = ${2:value};');
    });
  });

  describe('function expression', () => {
    it('f:', () => {
      expect(parse('f:')).toEqual('function ($1) { $2 }');
    });

    it('f:param1', () => {
      expect(parse('f:param1')).toEqual('function (${1:param1}) { $2 }');
    });

    it('f:param1,param2', () => {
      expect(parse('f:param1,param2')).toEqual(
        'function (${1:param1}, ${2:param2}) { $3 }',
      );
    });

    it('f:param1,param2,param3', () => {
      expect(parse('f:param1,param2')).toEqual(
        'function (${1:param1}, ${2:param2}, ${3:param3}) { $4 }',
      );
    });

    it('f:=name', () => {
      expect(parse('f:=name')).toEqual('function ${1:name}($2) { $3 }');
    });

    it('f:param=name', () => {
      expect(parse('f:param=name')).toEqual(
        'function ${1:name}(${2:param}) { $3 }',
      );
    });

    it('f:param1,param2=name', () => {
      expect(parse('f:param1,param2=name')).toEqual(
        'function ${1:name}(${2:param1}, ${3:param2}) { $4 }',
      );
    });

    it('f:param1,param2,param3=name', () => {
      expect(parse('f:param1,param2,param3=name')).toEqual(
        'function ${1:name}(${2:param1}, ${3:param2}, ${4:param3}) { $5 }',
      );
    });
  });

  describe('export statement', () => {
    it('ex:', () => {
      expect(parse('ex:')).toEqual('export const $1 = $2;');
    });

    it('ex:name', () => {
      expect(parse('ex:name')).toEqual('export const ${1:name} = $2;');
    });

    it('exd:', () => {
      expect(parse('exd:')).toEqual('export default $1 = $2;');
    });

    it('exd:name', () => {
      expect(parse('exd:name')).toEqual(
        'export default ${1:name} = ${2:name};',
      );
    });
  });

  describe('module.exports', () => {
    it('mexp:', () => {
      expect(parse('mexp:')).toEqual('module.exports = $1');
    });

    it('mexp:name', () => {
      expect(parse('mexp:name')).toEqual('module.exports = ${1:name};');
    });
  });

  describe('arrow functions', () => {
    it('=>', () => {
      expect(parse('=>')).toEqual('($1) => $2;');
    });

    it('a=>', () => {
      expect(parse('a=>')).toEqual('${1:a} => $2;');
    });

    it('a,b=>', () => {
      expect(parse('a,b=>')).toEqual('(${1:a}, ${2:b}) => $3;');
    });

    it('a,b,c=>', () => {
      expect(parse('a,b,c=>')).toEqual('(${1:a}, ${2:b}, ${3:c}) => $4;');
    });

    it('name:=>', () => {
      expect(parse('name:=>')).toEqual('const ${1:name} = ($2) => $3;');
    });

    it('name:a=>', () => {
      expect(parse('name:a=>')).toEqual('const ${1:name} = ${2:a} => $3;');
    });

    it('name:a,b=>', () => {
      expect(parse('name:a,b=>')).toEqual(
        'const ${1:name} = (${2:a}, ${3:b}) => $4;',
      );
    });

    it('name:a,b,c=>', () => {
      expect(parse('name:a,b,c=>')).toEqual(
        'const ${1:name} = (${2:a}, ${3:b}, ${4:c}) => $5;',
      );
    });

    it('a/=>', () => {
      expect(parse('a/=>')).toEqual('async ($1) => $2;');
    });

    it('a/:a=>', () => {
      expect(parse('a/:a=>')).toEqual('async ${1:a} => $2;');
    });

    it('a/:a,b=>', () => {
      expect(parse('a/:a,b=>')).toEqual('async (${1:a}, ${2:b}) => $3;');
    });

    it('a/:a,b,c=>', () => {
      expect(parse('a/:a,b,c=>')).toEqual(
        'async (${1:a}, ${2:b}, ${3:c}) => $4;',
      );
    });

    it('a/name:=>', () => {
      expect(parse('a/name:=>')).toEqual('const ${1:name} = async ($2) => $3;');
    });

    it('a/name:a=>', () => {
      expect(parse('a/name:a=>')).toEqual(
        'const ${1:name} = async ${2:a} => $3;',
      );
    });

    it('a/name:a,b=>', () => {
      expect(parse('a/name:a,b=>')).toEqual(
        'const ${1:name} = async (${2:a}, ${3:b}) => $4;',
      );
    });

    it('a/name:a,b,c=>', () => {
      expect(parse('a/name:a,b,c=>')).toEqual(
        'const ${1:name} = async (${2:a}, ${3:b}, ${4:c}) => $5;',
      );
    });
  });
});
