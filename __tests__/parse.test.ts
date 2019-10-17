import parse from '../src/parse';

describe('parse', () => {
  describe('require statement', () => {
    it('run basic cases successfully', () => {
      expect(parse('rqr:package')).toEqual(
        `const package = require('package');`
      );
      expect(parse('rqr:customName:package')).toEqual(
        `const customName = require('package');`
      );
      expect(parse('rqr:objA,objB:package')).toEqual(
        `const { objA, objB } = require('package');`
      );
    });
  });

  describe('import statement', () => {
    it('run basic cases successfully', () => {
      expect(parse('imp:package')).toEqual(`import package from 'package';`);
      expect(parse('imp:customName:package')).toEqual(
        `import customName from 'package';`
      );
      expect(parse('imp::package')).toEqual(`import { } from 'package';`);
      expect(parse('imp:objA,objB:package')).toEqual(
        `import { objA, objB } from 'package';`
      );
      expect(parse('imp:*customName:package')).toEqual(
        `import * as customName from 'package';`
      );
    });
  });

  describe('let variable declarations', () => {
    it('run basic cases successfully', () => {
      expect(parse('l:name')).toEqual(`let name = `);
      expect(parse('l:name:value')).toEqual(`let name = value;`);
    });
  });

  describe('const variable declarations', () => {
    it('run basic cases successfully', () => {
      expect(parse('c:name')).toEqual(`const name = `);
      expect(parse('c:name:value')).toEqual(`const name = value;`);
    });
  });

  describe('function expression', () => {
    it('run basic cases successfully', () => {
      expect(parse('f::param1,param2')).toEqual(
        'function (param1, param2) { }'
      );
      expect(parse('f:name:param1,param2')).toEqual(
        'function name(param1, param2) { }'
      );
      expect(parse('f:name:')).toEqual('function name() { }');
    });
  });

  describe('export statement', () => {
    it('run basic cases successfully', () => {
      expect(parse('ex:name')).toEqual('export const name = ');
      expect(parse('exd:name')).toEqual('export default name;');
    });
  });

  describe('module.exports', () => {
    it('run basic cases successfully', () => {
      expect(parse('mexp:')).toEqual('module.exports = ');
      expect(parse('mexp:name')).toEqual('module.exports = name;');
    });
  });

  describe('arrow functions', () => {
    it('run basic cases successfully', () => {
      expect(parse('=>')).toEqual('() => ');
      expect(parse('param=>')).toEqual('param => ');
      expect(parse('a,b=>')).toEqual('(a, b) => ');
      expect(parse('name::=>')).toEqual('const name = () => ');
      expect(parse('name:a=>')).toEqual('const name = a => ');
      expect(parse('name:a,b,c=>')).toEqual('const name = (a, b, c) => ');
      expect(parse('=>a')).toEqual('async () => ');
      expect(parse('param=>a')).toEqual('async param => ');
      expect(parse('a,b,c=>a')).toEqual('async (a, b, c) =>');
      expect(parse('name::=>a')).toEqual('const name = async () => ');
      expect(parse('name:param=>a')).toEqual('const name = async param => ');
      expect(parse('name:a,b,c=>a')).toEqual(
        'const name = async (a, b, c) => '
      );
    });
  });
});
