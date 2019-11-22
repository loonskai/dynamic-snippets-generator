import { _functionExpression } from '../../src/parser';

describe('function expression', () => {
  describe('with parameters', () => {
    it('>', () => {
      expect(_functionExpression('>')).toEqual('function () {}');
    });

    it(':param>', () => {
      expect(_functionExpression(':param>')).toEqual('function (param) {}');
    });

    it(':param1,param2>', () => {
      expect(_functionExpression(':param1,param2>')).toEqual(
        'function (param1, param2) {}',
      );
    });

    it(':param1,param2,param3>', () => {
      expect(_functionExpression(':param1,param2,param3>')).toEqual(
        'function (param1, param2, param3) {}',
      );
    });
  });

  describe('with parameter destructuring', () => {
    it('::>', () => {
      expect(_functionExpression('::>')).toEqual('function ({}) {}');
    });

    it(':param:>', () => {
      expect(_functionExpression(':param:>')).toEqual(
        'function ({ param }) {}',
      );
    });

    it(':objA,objB:>', () => {
      expect(_functionExpression(':objA,objB:>')).toEqual(
        'function ({ objA, objB }) {}',
      );
    });

    it(':objA,objB,objC:>', () => {
      expect(_functionExpression(':objA,objB,objC:>')).toEqual(
        'function ({ objA, objB, objC }) {}',
      );
    });
  });

  describe('named function expression', () => {
    it('>name', () => {
      expect(_functionExpression('>name')).toEqual('function name() {}');
    });

    it(':param>name', () => {
      expect(_functionExpression(':param>name')).toEqual(
        'function name(param) {}',
      );
    });

    it(':param1,param2>name', () => {
      expect(_functionExpression(':param1,param2>name')).toEqual(
        'function name(param1, param2) {}',
      );
    });

    it(':param1,param2,param3>name', () => {
      expect(_functionExpression(':param1,param2,param3>name')).toEqual(
        'function name(param1, param2, param3) {}',
      );
    });

    it('::>name', () => {
      expect(_functionExpression('::>name')).toEqual('function name({}) {}');
    });

    it(':param:>name', () => {
      expect(_functionExpression(':param:>name')).toEqual(
        'function name({ param }) {}',
      );
    });

    it(':objA,objB:>name', () => {
      expect(_functionExpression(':objA,objB:>name')).toEqual(
        'function name({ objA, objB }) {}',
      );
    });

    it(':objA,objB,objC:>name', () => {
      expect(_functionExpression(':objA,objB,objC:>name')).toEqual(
        'function name({ objA, objB, objC }) {}',
      );
    });
  });
});
