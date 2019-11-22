import { _const } from '../../../src/parser';

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
      'const { objA, objB } = value;',
    );
  });

  it(':objA,objB,objC:=value', () => {
    expect(_const(':objA,objB,objC>value')).toEqual(
      'const { objA, objB, objC } = value;',
    );
  });
});
