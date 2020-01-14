import { _react } from '../../../src/parser';

describe('arrow function expression', () => {
  it(':uS', () => {
    expect(_react(':uS')).toEqual(`import React, { useState } from 'react';
const Component = () => {
  return (
  
  )
};

export default Component;`);
  });

  it(':us,ue@MyComponent', () => {
    expect(_react(':us,ue@MyComponent')).toEqual('bla')
  })
});
