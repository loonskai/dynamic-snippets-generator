import { _functionDeclaration } from '../../src/parser';

describe('function declaration', () => {
  it('>name', () => {
    expect(_functionDeclaration('>name')).toEqual('function name() {}');
  });

  it(':param>name', () => {
    expect(_functionDeclaration(':param>name')).toEqual(
      'function name(param) {}',
    );
  });

  it(':param1,param2>name', () => {
    expect(_functionDeclaration(':param1,param2>name')).toEqual(
      'function name(param1, param2) {}',
    );
  });

  it(':param1,param2,param3>name', () => {
    expect(_functionDeclaration(':param1,param2,param3>name')).toEqual(
      'function name(param1, param2, param3) {}',
    );
  });

  it('::>name', () => {
    expect(_functionDeclaration('::>name')).toEqual('function name({}) {}');
  });

  it(':param:>name', () => {
    expect(_functionDeclaration(':param:>name')).toEqual(
      'function name({ param }) {}',
    );
  });

  it(':objA,objB:>name', () => {
    expect(_functionDeclaration(':objA,objB:>name')).toEqual(
      'function name({ objA, objB }) {}',
    );
  });

  it(':objA,objB,objC:>name', () => {
    expect(_functionDeclaration(':objA,objB,objC:>name')).toEqual(
      'function name({ objA, objB, objC }) {}',
    );
  });
});
