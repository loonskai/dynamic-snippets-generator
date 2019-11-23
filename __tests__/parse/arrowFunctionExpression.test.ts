import { _arrowFunction } from '../../src/parser';

describe('arrow function declaration', () => {
  it('name>=>', () => {
    expect(_arrowFunction('name>=>')).toEqual('const name = () => {};');
  });

  it('name>obj=>', () => {
    expect(_arrowFunction('name>obj=>')).toEqual('const name = obj => {};');
  });

  it('name>objA,objB=>', () => {
    expect(_arrowFunction('name>objA,objB=>')).toEqual(
      'const name = (objA, objB) => {};',
    );
  });

  it('name>objA,objB,objC=>', () => {
    expect(_arrowFunction('name>objA,objB,objC=>')).toEqual(
      'const name = (objA, objB, objC) => {};',
    );
  });

  it('name>::=>', () => {
    expect(_arrowFunction('name>::=>')).toEqual('const name = ({}) => {};');
  });

  it('name>:obj:=>', () => {
    expect(_arrowFunction('name>:obj:=>')).toEqual(
      'const name = ({ obj }) => {};',
    );
  });

  it('name>:objA,objB:=>', () => {
    expect(_arrowFunction('name>:objA,objB:=>')).toEqual(
      'const name = ({ objA, objB }) => {};',
    );
  });

  it('name>:objA,objB,objC:=>', () => {
    expect(_arrowFunction('name>:objA,objB,objC:=>')).toEqual(
      'const name = ({ objA, objB, objC }) => {};',
    );
  });

  describe('async arrow function declaration', () => {
    it('a/name>=>', () => {
      expect(_arrowFunction('a/name>=>')).toEqual(
        'const name = async () => {};',
      );
    });

    it('a/name>a=>', () => {
      expect(_arrowFunction('a/name>a=>')).toEqual(
        'const name = async a => {};',
      );
    });

    it('a/name>a,b=>', () => {
      expect(_arrowFunction('a/name>a,b=>')).toEqual(
        'const name = async (a, b) => {};',
      );
    });

    it('a/name>a,b,c=>', () => {
      expect(_arrowFunction('a/name>a,b,c=>')).toEqual(
        'const name = async (a, b, c) => {};',
      );
    });

    it('a/name>::=>', () => {
      expect(_arrowFunction('a/name>::=>')).toEqual(
        'const name = async ({}) => {};',
      );
    });

    it('a/name>:a:=>', () => {
      expect(_arrowFunction('a/name>:a:=>')).toEqual(
        'const name = async ({ a }) => {};',
      );
    });

    it('a/name>:a,b:=>', () => {
      expect(_arrowFunction('a/name>:a,b:=>')).toEqual(
        'const name = async ({ a, b }) => {};',
      );
    });

    it('a/name>:a,b,c:=>', () => {
      expect(_arrowFunction('a/name>:a,b,c:=>')).toEqual(
        'const name = async ({ a, b, c }) => {};',
      );
    });
  });
});
