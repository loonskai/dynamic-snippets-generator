import { _function } from '../../src/parser';

describe('function expression', () => {
  describe('with parameters', () => {
    it('>', () => {
      expect(_function('>')).toEqual('function () {}');
    });

    it(':param>', () => {
      expect(_function(':param>')).toEqual('function (param) {}');
    });

    it(':param1,param2>', () => {
      expect(_function(':param1,param2>')).toEqual(
        'function (param1, param2) {}',
      );
    });

    it(':param1,param2,param3>', () => {
      expect(_function(':param1,param2,param3>')).toEqual(
        'function (param1, param2, param3) {}',
      );
    });
  });

  describe('with parameter destructuring', () => {
    it('::>', () => {
      expect(_function('::>')).toEqual('function ({}) {}');
    });

    it(':param:>', () => {
      expect(_function(':param:>')).toEqual('function ({ param }) {}');
    });

    it(':objA,objB:>', () => {
      expect(_function(':objA,objB:>')).toEqual('function ({ objA, objB }) {}');
    });

    it(':objA,objB,objC:>', () => {
      expect(_function(':objA,objB,objC:>')).toEqual(
        'function ({ objA, objB, objC }) {}',
      );
    });
  });

  describe('named function expression', () => {
    it('>name', () => {
      expect(_function('>name')).toEqual('function name() {}');
    });

    it(':param>name', () => {
      expect(_function(':param>name')).toEqual('function name(param) {}');
    });

    // it(':param1,param2>name', () => {
    //   expect(_function(':param1,param2>name')).toEqual(
    //     'function name(param1, param2) { }',
    //   );
    // });

    // it(':param1,param2,param3>name', () => {
    //   expect(_function(':param1,param2,param3>name')).toEqual(
    //     'function name(param1, param2, param3) { }',
    //   );
    // });

    // it('::>name', () => {
    //   expect(_function('::>')).toEqual('function name({}) { }');
    // });

    it(':param:>name', () => {
      expect(_function(':param:>name')).toEqual('function name({ param }) {}');
    });

    // it(':objA,objB:>name', () => {
    //   expect(_function(':objA,objB:>name')).toEqual(
    //     'function name({ objA, objA }) { }',
    //   );
    // });

    // it(':objA,objB,objC:>name', () => {
    //   expect(_function(':objA,objB,objC:>name')).toEqual(
    //     'function name({ objA, objA, objC }) { }',
    //   );
    // });
  });
});
