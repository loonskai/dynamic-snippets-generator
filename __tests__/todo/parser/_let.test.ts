import { _let } from '../../../src/parser';

describe('let variable declarations', () => {
  it('>name', () => {
    expect(_let(':name')).toEqual('let name = ;');
  });

  it('l>name=value', () => {
    expect(_let('>name=value')).toEqual('let name = value;');
  });
});
