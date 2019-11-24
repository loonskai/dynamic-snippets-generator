import { _functionDeclaration } from '../../src/parser';

describe('function declaration', () => {
  it('>name', () => {
    expect(_functionDeclaration('>name')).toEqual('function name() {}');
  });

  it('>name:param', () => {
    expect(_functionDeclaration('>name:param')).toEqual(
      'function name(param) {}',
    );
  });

  it('>name:param1,param2', () => {
    expect(_functionDeclaration('>name:param1,param2e')).toEqual(
      'function name(param1, param2) {}',
    );
  });

  it('>name:param1,param2,param3', () => {
    expect(_functionDeclaration('>name:param1,param2,param3')).toEqual(
      'function name(param1, param2, param3) {}',
    );
  });

  it('>name::', () => {
    expect(_functionDeclaration('>name::')).toEqual('function name({}) {}');
  });

  it('>name:param:', () => {
    expect(_functionDeclaration('>name:param:')).toEqual(
      'function name({ param }) {}',
    );
  });

  it('>name:objA,objB:', () => {
    expect(_functionDeclaration('>name:objA,objB:')).toEqual(
      'function name({ objA, objB }) {}',
    );
  });

  it('>name:objA,objB,objC:', () => {
    expect(_functionDeclaration('>name:objA,objB,objC:')).toEqual(
      'function name({ objA, objB, objC }) {}',
    );
  });
});
