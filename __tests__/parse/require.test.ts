import { _require } from '../../src/parser';

describe('require statement', () => {
  it('require statement', () => {
    expect(_require('>package')).toEqual("const package = require('package');");
  });

  it('require with custom name', () => {
    expect(_require('>customName>package')).toEqual(
      "const customName = require('package');",
    );
  });

  it('with object desctructuring', () => {
    expect(_require(':package')).toEqual("const {} = require('package');");
  });

  it('with object desctructuring 1 parameter', () => {
    expect(_require(':obj>package')).toEqual(
      "const { obj } = require('package');",
    );
  });

  it('with object desctructuring 2 parameters', () => {
    expect(_require(':objA,objB>package')).toEqual(
      "const { objA, objB } = require('package');",
    );
  });

  it('with object desctructuring 3 parameters', () => {
    expect(_require(':objA,objB,objC>package')).toEqual(
      "const { objA, objB, objC } = require('package');",
    );
  });
});
