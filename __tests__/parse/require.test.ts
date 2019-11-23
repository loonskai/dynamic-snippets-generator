import { _require } from '../../src/parser';

describe('require statement', () => {
  it('rqr>package', () => {
    expect(_require('>package')).toEqual("const package = require('package');");
  });

  it('rqr>customName>package', () => {
    expect(_require('>customName>package')).toEqual(
      "const customName = require('package');",
    );
  });

  it('rqr::package', () => {
    expect(_require('::package')).toEqual("const {} = require('package');");
  });

  it('rqr:obj:package', () => {
    expect(_require(':obj:package')).toEqual(
      "const { obj } = require('package');",
    );
  });

  it('rqr:objA,objB:package', () => {
    expect(_require(':objA,objB:package')).toEqual(
      "const { objA, objB } = require('package');",
    );
  });

  it('rqr:objA,objB,objC:package', () => {
    expect(_require(':objA,objB,objC:package')).toEqual(
      "const { objA, objB, objC } = require('package');",
    );
  });
});
