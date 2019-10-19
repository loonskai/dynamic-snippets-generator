import parse from '../src/parse';

describe('parse', () => {
  describe('require statement', () => {
    it('rqr>package', () => {
      expect(parse('rqr>package')).toEqual(
        "const package = require('package');"
      );
    });

    it('rqr>customName>package', () => {
      expect(parse('rqr>customName>package')).toEqual(
        "const customName = require('package');"
      );
    });

    it('rqr::package', () => {
      expect(parse('rqr::package')).toEqual("const {} = require('package');");
    });

    it('rqr:obj:package', () => {
      expect(parse('rqr:obj:package')).toEqual(
        "const { obj } = require('package');"
      );
    });

    it('rqr:objA,objB:package', () => {
      expect(parse('rqr:objA,objB:package')).toEqual(
        "const { objA, objB } = require('package');"
      );
    });

    it('rqr:objA,objB,objC:package', () => {
      expect(parse('rqr:objA,objB,objC:package')).toEqual(
        "const { objA, objB, objC } = require('package');"
      );
    });
  });

  describe('import statement', () => {
    it('imp>package', () => {
      expect(parse('imp>package')).toEqual("import package from 'package';");
    });

    it('imp>customName>package', () => {
      expect(parse('imp>customName>package')).toEqual(
        "import customName from 'package';"
      );
    });

    it('imp::package', () => {
      expect(parse('imp::package')).toEqual("import {} from 'package';");
    });

    it('imp:obj:package', () => {
      expect(parse('imp:obj:package')).toEqual(
        "import { obj } from 'package';"
      );
    });

    it('imp:objA,objB:package', () => {
      expect(parse('imp:objA,objB:package')).toEqual(
        "import { objA, objB } from 'package';"
      );
    });

    it('imp:objA,objB,objC:package', () => {
      expect(parse('imp:objA,objB,objC:package')).toEqual(
        "import { objA, objB, objC } from 'package';"
      );
    });

    it('imp*alias>package', () => {
      expect(parse('imp*alias>package')).toEqual(
        "import * as alias from 'package';"
      );
    });
  });

  describe('let variable declarations', () => {
    it('l>name', () => {
      expect(parse('l:name')).toEqual('let name = ;');
    });

    it('l>name=value', () => {
      expect(parse('l>name=value')).toEqual('let name = value;');
    });
  });

  describe('const variable declarations', () => {
    it('c>name', () => {
      expect(parse('c>name')).toEqual('const name = ;');
    });

    it('c>name=value', () => {
      expect(parse('c>name=value')).toEqual('const name = value;');
    });

    it('c:obj:=value', () => {
      expect(parse('c:obj:=value')).toEqual('const { obj } = value;');
    });

    it('c:objA,objB:=value', () => {
      expect(parse('c:objA,objB:=value')).toEqual(
        'const { objA, objB } = value;'
      );
    });

    it('c:objA,objB,objC:=value', () => {
      expect(parse('c:objA,objB,objC>value')).toEqual(
        'const { objA, objB, objC } = value;'
      );
    });
  });

  describe('function expression', () => {
    describe('with parameters', () => {
      it('f>', () => {
        expect(parse('f>')).toEqual('function () { }');
      });

      it('f:>', () => {
        expect(parse('f>')).toEqual('function () { }');
      });

      it('f:param>', () => {
        expect(parse('f:param>')).toEqual('function (param) {  }');
      });

      it('f:param1,param2>', () => {
        expect(parse('f:param1,param2>')).toEqual(
          'function (param1, param2) {  }'
        );
      });

      it('f:param1,param2,param3>', () => {
        expect(parse('f:param1,param2,param3>')).toEqual(
          'function (param1, param2, param3) {  }'
        );
      });
    });

    describe('with parameter destructuring', () => {
      it('f::>', () => {
        expect(parse('f::>')).toEqual('function ({}) { }');
      });

      it('f:param:>', () => {
        expect(parse('f:param:>')).toEqual('function ({ param }) { }');
      });

      it('f:objA,objB:>', () => {
        expect(parse('f:objA,objB:>')).toEqual('function ({ objA, objA }) { }');
      });

      it('f:objA,objB,objC:>', () => {
        expect(parse('f:objA,objB,objC:>')).toEqual(
          'function ({ objA, objA, objC }) { }'
        );
      });
    });

    describe('named function expression', () => {
      it('f>name', () => {
        expect(parse('f>name')).toEqual('function name() { }');
      });

      it('f:>name', () => {
        expect(parse('f:>name')).toEqual('function name() { }');
      });

      it('f:param>name', () => {
        expect(parse('f:param>name')).toEqual('function name(param) { }');
      });

      it('f:param1,param2>name', () => {
        expect(parse('f:param1,param2>name')).toEqual(
          'function name(param1, param2) { }'
        );
      });

      it('f:param1,param2,param3>name', () => {
        expect(parse('f:param1,param2,param3>name')).toEqual(
          'function name(param1, param2, param3) { }'
        );
      });

      it('f::>name', () => {
        expect(parse('f::>')).toEqual('function name({}) { }');
      });

      it('f:param:>name', () => {
        expect(parse('f:param:>name')).toEqual('function name({ param }) { }');
      });

      it('f:objA,objB:>name', () => {
        expect(parse('f:objA,objB:>name')).toEqual(
          'function name({ objA, objA }) { }'
        );
      });

      it('f:objA,objB,objC:>name', () => {
        expect(parse('f:objA,objB,objC:>name')).toEqual(
          'function name({ objA, objA, objC }) { }'
        );
      });
    });
  });

  describe('export statement', () => {
    // it('ex:', () => {
    //   expect(parse('ex:')).toEqual('export const  = ;');
    // });

    it('ex:name', () => {
      expect(parse('ex:name')).toEqual('export const name = ;');
    });

    // it('exd:', () => {
    //   expect(parse('exd:')).toEqual('export default  = ;');
    // });

    it('exd:name', () => {
      expect(parse('exd:name')).toEqual('export default name;');
    });
  });

  describe('module.exports', () => {
    it('mexp:', () => {
      expect(parse('mexp:')).toEqual('module.exports = ');
    });

    it('mexp:name', () => {
      expect(parse('mexp:name')).toEqual('module.exports = name;');
    });
  });

  describe('arrow functions', () => {
    it('=>', () => {
      expect(parse('=>')).toEqual('() => { };');
    });

    it('obj=>', () => {
      expect(parse('obj=>')).toEqual('obj => { };');
    });

    it('objA,objB=>', () => {
      expect(parse('objA,objB=>')).toEqual('(objA, objB) => { };');
    });

    it('objA,objB,objC=>', () => {
      expect(parse('objA,objB,objC=>')).toEqual('(objA, objB, objC) => { };');
    });

    it('::=>', () => {
      expect(parse('::=>')).toEqual('({}) => { };');
    });

    it(':obj:=>', () => {
      expect(parse(':obj:=>')).toEqual('({ obj }) => { };');
    });

    it(':objA,objB:=>', () => {
      expect(parse(':objA,objB:=>')).toEqual('({ objA, objB }) => { };');
    });

    it(':objA,objB,objC:=>', () => {
      expect(parse(':objA,objB,objC:=>')).toEqual(
        '({ objA, objB, objC }) => { };'
      );
    });

    it('name>=>', () => {
      expect(parse('name>=>')).toEqual('const name = () => ;');
    });

    it('name>obj=>', () => {
      expect(parse('name>obj=>')).toEqual('const name = obj => ;');
    });

    it('name>objA,objB=>', () => {
      expect(parse('name>objA,objB=>')).toEqual(
        'const name = (objA, objB) => ;'
      );
    });

    it('name>objA,objB,objC=>', () => {
      expect(parse('name>objA,objB,objC=>')).toEqual(
        'const name = (objA, objB, objC) => ;'
      );
    });

    it('name::=>', () => {
      expect(parse('name::=>')).toEqual('const name = ({}) => ;');
    });

    it('name:obj:=>', () => {
      expect(parse('name:obj:=>')).toEqual('const name = ({ obj }) => ;');
    });

    it('name:objA,objB:=>', () => {
      expect(parse('name:objA,objB:=>')).toEqual(
        'const name = ({ objA, objB }) => ;'
      );
    });

    it('name:objA,objB,objC:=>', () => {
      expect(parse('name:objA,objB,objC:=>')).toEqual(
        'const name = ({ objA, objB, objC }) => ;'
      );
    });

    describe('async arrow functions', () => {
      it('a/=>', () => {
        expect(parse('a/=>')).toEqual('async () => ;');
      });

      it('a/a=>', () => {
        expect(parse('a/a=>')).toEqual('async a => ;');
      });

      it('a/a,b=>', () => {
        expect(parse('a/a,b=>')).toEqual('async (a, b) => ;');
      });

      it('a/a,b,c=>', () => {
        expect(parse('a/a,b,c=>')).toEqual('async (a, b, c) => ;');
      });

      it('a/::=>', () => {
        expect(parse('a/::=>')).toEqual('async ({}) => ;');
      });

      it('a/:a:=>', () => {
        expect(parse('a/:a:=>')).toEqual('async ({ a }) => ;');
      });

      it('a/:a,b:=>', () => {
        expect(parse('a/:a,b:=>')).toEqual('async ({ a, b }) => ;');
      });

      it('a/:a,b,c:=>', () => {
        expect(parse('a/:a,b,c:=>')).toEqual('async ({ a, b, c }) => ;');
      });

      it('a/name>=>', () => {
        expect(parse('a/name>=>')).toEqual('const name = async () => ;');
      });

      it('a/name>a=>', () => {
        expect(parse('a/name>a=>')).toEqual('const name = async a => ;');
      });

      it('a/name>a,b=>', () => {
        expect(parse('a/name>a,b=>')).toEqual('const name = async (a, b) => ;');
      });

      it('a/name>a,b,c=>', () => {
        expect(parse('a/name>a,b,c=>')).toEqual(
          'const name = async (a, b, c) => ;'
        );
      });

      it('a/name::=>', () => {
        expect(parse('a/name::=>')).toEqual('const name = async ({}) => ;');
      });

      it('a/name>a=>', () => {
        expect(parse('a/name:a:=>')).toEqual('const name = async ({ a }) => ;');
      });

      it('a/name:a,b:=>', () => {
        expect(parse('a/name:a,b:=>')).toEqual(
          'const name = async ({ a, b }) => ;'
        );
      });

      it('a/name:a,b,c:=>', () => {
        expect(parse('a/name:a,b,c:=>')).toEqual(
          'const name = async ({ a, b, c }) => ;'
        );
      });
    });
  });
});
