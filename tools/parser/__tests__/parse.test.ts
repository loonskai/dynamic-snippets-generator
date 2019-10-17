import parse from '../src/parse';

describe('parse', () => {
  describe('require statement', () => {
    it('run basic cases successfully', () => {
      expect(parse('rqr:package')).toEqual(
        `const package = require('package');`,
      );
      expect(parse('rqr:customName:package')).toEqual(
        `const customName = require('package');`,
      );
      expect(parse('rqr:objA,objB:package')).toEqual(
        `const { objA, objB } = require('package');`,
      );
    });
  });

  describe('import statement', () => {
    it('run basic cases successfully', () => {
      expect(parse('imp:package')).toEqual(`import package from 'package';`);
      expect(parse('imp::package')).toEqual(
        `import { * cursor is here * } from 'package';`,
      );
      expect(parse('imp:objA,objB:package')).toEqual(
        `import { objA, objB } from 'package';`,
      );
      expect(parse('imp*customName:package')).toEqual(
        `import * as customName from 'package';`,
      );
    });
  });

  describe('variable declarations', () => {
    it('run basic cases successfully', () => {
      expect(parse('l:name')).toEqual(`let name = `);
      expect(parse('l:name:value')).toEqual(`let name = value;`);
      expect(parse('c:name')).toEqual(`const name = `);
      expect(parse('c:name:value')).toEqual(`const name = value;`);
    });
  });

  describe('function expression', () => {
    it('run basic cases successfully', () => {
      expect(parse('f>param1,param2')).toEqual('function (param1, param2) { }');
      expect(parse('f>param1,param2')).toEqual('function (param1, param2) { }');
      expect(parse('f:name>param1,param2')).toEqual(
        'function name(param1, param2) { }',
      );
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
      expect(parse('mexp:name')).toEqual('module exports = name;');
    });
  });
});
