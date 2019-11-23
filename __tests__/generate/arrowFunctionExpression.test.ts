import generate from '../../src/snippetGenerator';

describe('arrow function expression', () => {
  it('simple arrow function expression', () => {
    expect(generate.arrowFunctionExpression('const name = () => {};')).toEqual(
      'const ${1:name} = () => {$2};',
    );
  });

  it('with one parameter', () => {
    expect(generate.functionDeclaration('const name = obj => {};')).toEqual(
      'const ${1:name} = ${2:obj} => {$3};',
    );
  });

  it('with two parameters', () => {
    expect(
      generate.functionDeclaration('const name = (objA, objB) => {};'),
    ).toEqual('const ${1:name} = (${2:objA}, ${3:objB}) => {$4};');
  });

  it('with three parameters', () => {
    expect(
      generate.functionDeclaration('const name = (objA, objB, objC) => {};'),
    ).toEqual('const ${1:name} = (${2:objA}, ${3:objB}, ${4:objC}) => {$5};');
  });

  it('with one property', () => {
    expect(
      generate.functionDeclaration('const name = ({ obj }) => {};'),
    ).toEqual('const ${1:name} = ({ ${2:obj} }) => {$3};');
  });

  it('with two properties', () => {
    expect(
      generate.functionDeclaration('const name = ({ objA, objB }) => {};'),
    ).toEqual('const ${1:name} = ({ ${2:objA}, ${3:objB} }) => {$4};');
  });

  it('with three properties', () => {
    expect(
      generate.functionDeclaration(
        'const name = ({ objA, objB, objC }) => {};',
      ),
    ).toEqual(
      'const ${1:name} = ({ ${2:objA}, ${3:objB}, ${4:objC} }) => {$5};',
    );
  });

  describe('async arrow function expression', () => {
    it('without parameters', () => {
      expect(
        generate.functionDeclaration('const name = async () => {};'),
      ).toEqual('const ${1:name} = async () => {$2};');
    });

    it('with one parameter', () => {
      expect(
        generate.functionDeclaration('const name = async a => {};'),
      ).toEqual('const ${1:name} = async ${2:a} => {$3};');
    });

    it('with two parameters', () => {
      expect(
        generate.functionDeclaration('const name = async (a, b) => {};'),
      ).toEqual('const ${1:name} = async (${2:a}, ${3:b}) => {$4};');
    });

    it('with three parameters', () => {
      expect(
        generate.functionDeclaration('const name = async (a, b, c) => {};'),
      ).toEqual('const ${1:name} = async (${2:a}, ${3:b}, ${4:c}) => {$5};');
    });

    it('with one property', () => {
      expect(
        generate.functionDeclaration('const name = async ({ a }) => {};'),
      ).toEqual('const ${1:name} = async ({ ${2:a} }) => {$3};');
    });

    it('with two properties', () => {
      expect(
        generate.functionDeclaration('const name = async ({ a, b }) => {};'),
      ).toEqual('const ${1:name} = async ({ ${2:a}, ${3:b} }) => {$4};');
    });

    it('with three properties', () => {
      expect(
        generate.functionDeclaration('const name = async ({ a, b, c }) => {};'),
      ).toEqual(
        'const ${1:name} = async ({ ${2:a}, ${3:b}, ${4:c} }) => {$5};',
      );
    });
  });
});
