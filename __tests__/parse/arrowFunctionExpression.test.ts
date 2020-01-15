import { _arrowFunctionExpression } from '../../src/parser';

describe('arrow function expression', () => {
  it('name=>', () => {
    expect(_arrowFunctionExpression('name=>')).toEqual('const name = () => {};');
  });

  it('name:obj=>', () => {
    expect(_arrowFunctionExpression('name:obj=>')).toEqual('const name = obj => {};');
  });

  it('name:objA,objB=>', () => {
    expect(_arrowFunctionExpression('name:objA,objB=>')).toEqual('const name = (objA, objB) => {};');
  });

  it('name:objA,objB,objC=>', () => {
    expect(_arrowFunctionExpression('name:objA,objB,objC=>')).toEqual('const name = (objA, objB, objC) => {};');
  });

  it('name:obj:=>', () => {
    expect(_arrowFunctionExpression('name:obj:=>')).toEqual('const name = ({ obj }) => {};');
  });

  it('name:objA,objB:=>', () => {
    expect(_arrowFunctionExpression('name:objA,objB:=>')).toEqual('const name = ({ objA, objB }) => {};');
  });

  it('name:objA,objB,objC:=>', () => {
    expect(_arrowFunctionExpression('name:objA,objB,objC:=>')).toEqual('const name = ({ objA, objB, objC }) => {};');
  });

  describe('async arrow function expression', () => {
    it('a/name=>', () => {
      expect(_arrowFunctionExpression('a/name=>')).toEqual('const name = async () => {};');
    });

    it('a/name:a=>', () => {
      expect(_arrowFunctionExpression('a/name:a=>')).toEqual('const name = async a => {};');
    });

    it('a/name:a,b=>', () => {
      expect(_arrowFunctionExpression('a/name:a,b=>')).toEqual('const name = async (a, b) => {};');
    });

    it('a/name:a,b,c=>', () => {
      expect(_arrowFunctionExpression('a/name:a,b,c=>')).toEqual('const name = async (a, b, c) => {};');
    });

    it('a/name:a:=>', () => {
      expect(_arrowFunctionExpression('a/name:a:=>')).toEqual('const name = async ({ a }) => {};');
    });

    it('a/name:a,b:=>', () => {
      expect(_arrowFunctionExpression('a/name:a,b:=>')).toEqual('const name = async ({ a, b }) => {};');
    });

    it('a/name:a,b,c:=>', () => {
      expect(_arrowFunctionExpression('a/name:a,b,c:=>')).toEqual('const name = async ({ a, b, c }) => {};');
    });
  });
});
