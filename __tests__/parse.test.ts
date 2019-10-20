import {
  _require,
  _import,
  _let,
  _const,
  _functionExpression,
  _export,
  _exportDefault,
  _moduleExports,
  _arrowFunction
} from '../src/parseCode';

describe('parse', () => {
  describe('require statement', () => {
    it('rqr>package', () => {
      expect(_require('>package')).toEqual(
        "const package = require('package');"
      );
    });

    it('rqr>customName>package', () => {
      expect(_require('>customName>package')).toEqual(
        "const customName = require('package');"
      );
    });

    it('rqr::package', () => {
      expect(_require('::package')).toEqual("const {} = require('package');");
    });

    it('rqr:obj:package', () => {
      expect(_require(':obj:package')).toEqual(
        "const {obj} = require('package');"
      );
    });

    it('rqr:objA,objB:package', () => {
      expect(_require(':objA,objB:package')).toEqual(
        "const {objA, objB} = require('package');"
      );
    });

    it('rqr:objA,objB,objC:package', () => {
      expect(_require(':objA,objB,objC:package')).toEqual(
        "const {objA, objB, objC} = require('package');"
      );
    });
  });

  describe('import statement', () => {
    it('>package', () => {
      expect(_import('>package')).toEqual("import package from 'package';");
    });

    it('>customName>package', () => {
      expect(_import('>customName>package')).toEqual(
        "import customName from 'package';"
      );
    });

    it('::package', () => {
      expect(_import('::package')).toEqual("import {} from 'package';");
    });

    it(':obj:package', () => {
      expect(_import(':obj:package')).toEqual("import { obj } from 'package';");
    });

    it(':objA,objB:package', () => {
      expect(_import(':objA,objB:package')).toEqual(
        "import { objA, objB } from 'package';"
      );
    });

    it(':objA,objB,objC:package', () => {
      expect(_import(':objA,objB,objC:package')).toEqual(
        "import { objA, objB, objC } from 'package';"
      );
    });

    it('*alias>package', () => {
      expect(_import('*alias>package')).toEqual(
        "import * as alias from 'package';"
      );
    });
  });

  describe('let variable declarations', () => {
    it('>name', () => {
      expect(_let(':name')).toEqual('let name = ;');
    });

    it('l>name=value', () => {
      expect(_let('>name=value')).toEqual('let name = value;');
    });
  });

  describe('const variable declarations', () => {
    it('>name', () => {
      expect(_const('>name')).toEqual('const name = ;');
    });

    it('>name=value', () => {
      expect(_const('>name=value')).toEqual('const name = value;');
    });

    it(':obj:=value', () => {
      expect(_const(':obj:=value')).toEqual('const { obj } = value;');
    });

    it(':objA,objB:=value', () => {
      expect(_const(':objA,objB:=value')).toEqual(
        'const { objA, objB } = value;'
      );
    });

    it(':objA,objB,objC:=value', () => {
      expect(_const(':objA,objB,objC>value')).toEqual(
        'const { objA, objB, objC } = value;'
      );
    });
  });

  describe('function expression', () => {
    describe('with parameters', () => {
      it('>', () => {
        expect(_functionExpression('>')).toEqual('function () { }');
      });

      it(':>', () => {
        expect(_functionExpression('>')).toEqual('function () { }');
      });

      it(':param>', () => {
        expect(_functionExpression(':param>')).toEqual('function (param) {  }');
      });

      it(':param1,param2>', () => {
        expect(_functionExpression(':param1,param2>')).toEqual(
          'function (param1, param2) {  }'
        );
      });

      it(':param1,param2,param3>', () => {
        expect(_functionExpression(':param1,param2,param3>')).toEqual(
          'function (param1, param2, param3) {  }'
        );
      });
    });

    describe('with parameter destructuring', () => {
      it('::>', () => {
        expect(_functionExpression('::>')).toEqual('function ({}) { }');
      });

      it(':param:>', () => {
        expect(_functionExpression(':param:>')).toEqual(
          'function ({ param }) { }'
        );
      });

      it(':objA,objB:>', () => {
        expect(_functionExpression(':objA,objB:>')).toEqual(
          'function ({ objA, objA }) { }'
        );
      });

      it(':objA,objB,objC:>', () => {
        expect(_functionExpression(':objA,objB,objC:>')).toEqual(
          'function ({ objA, objA, objC }) { }'
        );
      });
    });

    describe('named function expression', () => {
      it('>name', () => {
        expect(_functionExpression('>name')).toEqual('function name() { }');
      });

      it(':>name', () => {
        expect(_functionExpression(':>name')).toEqual('function name() { }');
      });

      it(':param>name', () => {
        expect(_functionExpression(':param>name')).toEqual(
          'function name(param) { }'
        );
      });

      it(':param1,param2>name', () => {
        expect(_functionExpression(':param1,param2>name')).toEqual(
          'function name(param1, param2) { }'
        );
      });

      it(':param1,param2,param3>name', () => {
        expect(_functionExpression(':param1,param2,param3>name')).toEqual(
          'function name(param1, param2, param3) { }'
        );
      });

      it('::>name', () => {
        expect(_functionExpression('::>')).toEqual('function name({}) { }');
      });

      it(':param:>name', () => {
        expect(_functionExpression(':param:>name')).toEqual(
          'function name({ param }) { }'
        );
      });

      it(':objA,objB:>name', () => {
        expect(_functionExpression(':objA,objB:>name')).toEqual(
          'function name({ objA, objA }) { }'
        );
      });

      it(':objA,objB,objC:>name', () => {
        expect(_functionExpression(':objA,objB,objC:>name')).toEqual(
          'function name({ objA, objA, objC }) { }'
        );
      });
    });
  });

  describe('export statements', () => {
    it(':name', () => {
      expect(_export(':name')).toEqual('export const name = ;');
    });

    it(':name', () => {
      expect(_exportDefault(':name')).toEqual('export default name;');
    });
  });

  describe('module.exports', () => {
    it(':', () => {
      expect(_moduleExports(':')).toEqual('module.exports = ');
    });

    it(':name', () => {
      expect(_moduleExports(':name')).toEqual('module.exports = name;');
    });
  });

  describe('arrow functions', () => {
    it('=>', () => {
      expect(_arrowFunction('=>')).toEqual('() => { };');
    });

    it('obj=>', () => {
      expect(_arrowFunction('obj=>')).toEqual('obj => { };');
    });

    it('objA,objB=>', () => {
      expect(_arrowFunction('objA,objB=>')).toEqual('(objA, objB) => { };');
    });

    it('objA,objB,objC=>', () => {
      expect(_arrowFunction('objA,objB,objC=>')).toEqual(
        '(objA, objB, objC) => { };'
      );
    });

    it('::=>', () => {
      expect(_arrowFunction('::=>')).toEqual('({}) => { };');
    });

    it(':obj:=>', () => {
      expect(_arrowFunction(':obj:=>')).toEqual('({ obj }) => { };');
    });

    it(':objA,objB:=>', () => {
      expect(_arrowFunction(':objA,objB:=>')).toEqual(
        '({ objA, objB }) => { };'
      );
    });

    it(':objA,objB,objC:=>', () => {
      expect(_arrowFunction(':objA,objB,objC:=>')).toEqual(
        '({ objA, objB, objC }) => { };'
      );
    });

    it('name>=>', () => {
      expect(_arrowFunction('name>=>')).toEqual('const name = () => ;');
    });

    it('name>obj=>', () => {
      expect(_arrowFunction('name>obj=>')).toEqual('const name = obj => ;');
    });

    it('name>objA,objB=>', () => {
      expect(_arrowFunction('name>objA,objB=>')).toEqual(
        'const name = (objA, objB) => ;'
      );
    });

    it('name>objA,objB,objC=>', () => {
      expect(_arrowFunction('name>objA,objB,objC=>')).toEqual(
        'const name = (objA, objB, objC) => ;'
      );
    });

    it('name::=>', () => {
      expect(_arrowFunction('name::=>')).toEqual('const name = ({}) => ;');
    });

    it('name:obj:=>', () => {
      expect(_arrowFunction('name:obj:=>')).toEqual(
        'const name = ({ obj }) => ;'
      );
    });

    it('name:objA,objB:=>', () => {
      expect(_arrowFunction('name:objA,objB:=>')).toEqual(
        'const name = ({ objA, objB }) => ;'
      );
    });

    it('name:objA,objB,objC:=>', () => {
      expect(_arrowFunction('name:objA,objB,objC:=>')).toEqual(
        'const name = ({ objA, objB, objC }) => ;'
      );
    });

    describe('async arrow functions', () => {
      it('a/=>', () => {
        expect(_arrowFunction('a/=>')).toEqual('async () => ;');
      });

      it('a/a=>', () => {
        expect(_arrowFunction('a/a=>')).toEqual('async a => ;');
      });

      it('a/a,b=>', () => {
        expect(_arrowFunction('a/a,b=>')).toEqual('async (a, b) => ;');
      });

      it('a/a,b,c=>', () => {
        expect(_arrowFunction('a/a,b,c=>')).toEqual('async (a, b, c) => ;');
      });

      it('a/::=>', () => {
        expect(_arrowFunction('a/::=>')).toEqual('async ({}) => ;');
      });

      it('a/:a:=>', () => {
        expect(_arrowFunction('a/:a:=>')).toEqual('async ({ a }) => ;');
      });

      it('a/:a,b:=>', () => {
        expect(_arrowFunction('a/:a,b:=>')).toEqual('async ({ a, b }) => ;');
      });

      it('a/:a,b,c:=>', () => {
        expect(_arrowFunction('a/:a,b,c:=>')).toEqual(
          'async ({ a, b, c }) => ;'
        );
      });

      it('a/name>=>', () => {
        expect(_arrowFunction('a/name>=>')).toEqual(
          'const name = async () => ;'
        );
      });

      it('a/name>a=>', () => {
        expect(_arrowFunction('a/name>a=>')).toEqual(
          'const name = async a => ;'
        );
      });

      it('a/name>a,b=>', () => {
        expect(_arrowFunction('a/name>a,b=>')).toEqual(
          'const name = async (a, b) => ;'
        );
      });

      it('a/name>a,b,c=>', () => {
        expect(_arrowFunction('a/name>a,b,c=>')).toEqual(
          'const name = async (a, b, c) => ;'
        );
      });

      it('a/name::=>', () => {
        expect(_arrowFunction('a/name::=>')).toEqual(
          'const name = async ({}) => ;'
        );
      });

      it('a/name>a=>', () => {
        expect(_arrowFunction('a/name:a:=>')).toEqual(
          'const name = async ({ a }) => ;'
        );
      });

      it('a/name:a,b:=>', () => {
        expect(_arrowFunction('a/name:a,b:=>')).toEqual(
          'const name = async ({ a, b }) => ;'
        );
      });

      it('a/name:a,b,c:=>', () => {
        expect(_arrowFunction('a/name:a,b,c:=>')).toEqual(
          'const name = async ({ a, b, c }) => ;'
        );
      });
    });
  });
});
