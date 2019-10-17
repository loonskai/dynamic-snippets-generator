import { split } from '../src/helpers';

describe('split helper', () => {
  it('works as expected', () => {
    expect(split('test:split:str')).toEqual(['test', 'split', 'str']);
    expect(split('')).toEqual(['']);
  });
});
