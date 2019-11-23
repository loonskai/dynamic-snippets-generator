import { _export, _exportDefault, _moduleExports } from '../../src/parser';

describe('es6 export statements', () => {
  it(':name', () => {
    expect(_export(':name')).toEqual('export const name = name;');
  });

  it(':name', () => {
    expect(_exportDefault(':name')).toEqual('export default name;');
  });
});

describe('module.exports', () => {
  it(':name', () => {
    expect(_moduleExports(':name')).toEqual('module.exports = name;');
  });
});
