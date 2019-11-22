import { _arrowFunction } from '../../src/parser';

describe('arrow functions', () => {
  it('=>', () => {
    expect(_arrowFunction('=>')).toEqual('() => {};');
  });

  it('>obj=>', () => {
    expect(_arrowFunction('>obj=>')).toEqual('obj => {};');
  });

  it('>objA,objB=>', () => {
    expect(_arrowFunction('>objA,objB=>')).toEqual('(objA, objB) => {};');
  });

  it('>objA,objB,objC=>', () => {
    expect(_arrowFunction('>objA,objB,objC=>')).toEqual(
      '(objA, objB, objC) => {};',
    );
  });

  it('>:obj:=>', () => {
    expect(_arrowFunction('>:obj:=>')).toEqual('({ obj }) => {};');
  });

  it('>:objA,objB:=>', () => {
    expect(_arrowFunction('>:objA,objB:=>')).toEqual('({ objA, objB }) => {};');
  });

  it('>:objA,objB,objC:=>', () => {
    expect(_arrowFunction('>:objA,objB,objC:=>')).toEqual(
      '({ objA, objB, objC }) => {};',
    );
  });

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

  // describe('async arrow functions', () => {
  //   it('a/=>', () => {
  //     expect(_arrowFunction('a/=>')).toEqual('async () => ;');
  //   });

  //   it('a/a=>', () => {
  //     expect(_arrowFunction('a/a=>')).toEqual('async a => ;');
  //   });

  //   it('a/a,b=>', () => {
  //     expect(_arrowFunction('a/a,b=>')).toEqual('async (a, b) => ;');
  //   });

  //   it('a/a,b,c=>', () => {
  //     expect(_arrowFunction('a/a,b,c=>')).toEqual('async (a, b, c) => ;');
  //   });

  //   it('a/::=>', () => {
  //     expect(_arrowFunction('a/::=>')).toEqual('async ({}) => ;');
  //   });

  //   it('a/:a:=>', () => {
  //     expect(_arrowFunction('a/:a:=>')).toEqual('async ({ a }) => ;');
  //   });

  //   it('a/:a,b:=>', () => {
  //     expect(_arrowFunction('a/:a,b:=>')).toEqual('async ({ a, b }) => ;');
  //   });

  //   it('a/:a,b,c:=>', () => {
  //     expect(_arrowFunction('a/:a,b,c:=>')).toEqual('async ({ a, b, c }) => ;');
  //   });

  //   it('a/name>=>', () => {
  //     expect(_arrowFunction('a/name>=>')).toEqual('const name = async () => ;');
  //   });

  //   it('a/name>a=>', () => {
  //     expect(_arrowFunction('a/name>a=>')).toEqual('const name = async a => ;');
  //   });

  //   it('a/name>a,b=>', () => {
  //     expect(_arrowFunction('a/name>a,b=>')).toEqual(
  //       'const name = async (a, b) => ;',
  //     );
  //   });

  //   it('a/name>a,b,c=>', () => {
  //     expect(_arrowFunction('a/name>a,b,c=>')).toEqual(
  //       'const name = async (a, b, c) => ;',
  //     );
  //   });

  //   it('a/name::=>', () => {
  //     expect(_arrowFunction('a/name::=>')).toEqual(
  //       'const name = async ({}) => ;',
  //     );
  //   });

  //   it('a/name>a=>', () => {
  //     expect(_arrowFunction('a/name:a:=>')).toEqual(
  //       'const name = async ({ a }) => ;',
  //     );
  //   });

  //   it('a/name:a,b:=>', () => {
  //     expect(_arrowFunction('a/name:a,b:=>')).toEqual(
  //       'const name = async ({ a, b }) => ;',
  //     );
  //   });

  //   it('a/name:a,b,c:=>', () => {
  //     expect(_arrowFunction('a/name:a,b,c:=>')).toEqual(
  //       'const name = async ({ a, b, c }) => ;',
  //     );
  //   });
  // });
});
