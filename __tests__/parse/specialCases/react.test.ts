import { _react } from '../../../src/parser';

describe('react components with named imports', () => {
  it('>uS', () => {
    expect(_react('>uS')).toEqual('bla');
  });

  it('>uS:ue', () => {
    expect(_react('>uS,ue')).toEqual('bla');
  });

  it('>us,ue:title', () => {
    expect(_react('>us,ue:title')).toEqual('bla');
  });

  it('>us,ue:title,handleChange', () => {
    expect(_react('>us,ue:title,handleChange')).toEqual('bla');
  });

  it('>ur:title@MyComponent', () => {
    expect(_react('>ur:title@MyComponent')).toEqual('bla');
  });

  it('>us,ue:title@MyComponent', () => {
    expect(_react('>us,ue:title@MyComponent')).toEqual('bla');
  });

  it('>us,ue:title,handleChange@MyComponent', () => {
    expect(_react('>us,ue:title,handleChange@MyComponent')).toEqual('bla');
  });
});

describe('react components with props', () => {
  it(':title,handleChange@MyComponent', () => {
    expect(_react(':title,handleChange@MyComponent')).toEqual('bla');
  });

  it(':title', () => {
    expect(_react(':title')).toEqual('bla');
  });
});

describe('react components with component name', () => {
  it('@MyComponent', () => {
    expect(_react('@MyComponent')).toEqual('bla');
  });
});
