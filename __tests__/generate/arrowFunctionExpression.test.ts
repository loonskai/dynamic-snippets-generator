import generate from '../../src/generator';

describe('arrow function expression', () => {
  it('simple arrow function expression', () => {
    expect(generate.arrowFunctionExpression('const name = () => {};')).toEqual(
      'const ${1:name} = () => {$2};',
    );
  });

  it('with one parameter', () => {
    expect(generate.arrowFunctionExpression('const name = obj => {};')).toEqual(
      'const ${1:name} = ${2:obj} => {$3};',
    );
  });

  it('with two parameters', () => {
    expect(
      generate.arrowFunctionExpression('const name = (objA, objB) => {};'),
    ).toEqual('const ${1:name} = (${2:objA}, ${3:objB}) => {$4};');
  });

  it('with three parameters', () => {
    expect(
      generate.arrowFunctionExpression(
        'const name = (objA, objB, objC) => {};',
      ),
    ).toEqual('const ${1:name} = (${2:objA}, ${3:objB}, ${4:objC}) => {$5};');
  });

  it('with one property', () => {
    expect(
      generate.arrowFunctionExpression('const name = ({ obj }) => {};'),
    ).toEqual('const ${1:name} = ({ ${2:obj} }) => {$3};');
  });

  it('with two properties', () => {
    expect(
      generate.arrowFunctionExpression('const name = ({ objA, objB }) => {};'),
    ).toEqual('const ${1:name} = ({ ${2:objA}, ${3:objB} }) => {$4};');
  });

  it('with three properties', () => {
    expect(
      generate.arrowFunctionExpression(
        'const name = ({ objA, objB, objC }) => {};',
      ),
    ).toEqual(
      'const ${1:name} = ({ ${2:objA}, ${3:objB}, ${4:objC} }) => {$5};',
    );
  });

  describe('async arrow function expression', () => {
    it('without parameters', () => {
      expect(
        generate.arrowFunctionExpression('const name = async () => {};'),
      ).toEqual('const ${1:name} = async () => {$2};');
    });

    it('with one parameter', () => {
      expect(
        generate.arrowFunctionExpression('const name = async a => {};'),
      ).toEqual('const ${1:name} = async ${2:a} => {$3};');
    });

    it('with two parameters', () => {
      expect(
        generate.arrowFunctionExpression('const name = async (a, b) => {};'),
      ).toEqual('const ${1:name} = async (${2:a}, ${3:b}) => {$4};');
    });

    it('with three parameters', () => {
      expect(
        generate.arrowFunctionExpression('const name = async (a, b, c) => {};'),
      ).toEqual('const ${1:name} = async (${2:a}, ${3:b}, ${4:c}) => {$5};');
    });

    it('with one property', () => {
      expect(
        generate.arrowFunctionExpression('const name = async ({ a }) => {};'),
      ).toEqual('const ${1:name} = async ({ ${2:a} }) => {$3};');
    });

    it('with two properties', () => {
      expect(
        generate.arrowFunctionExpression(
          'const name = async ({ a, b }) => {};',
        ),
      ).toEqual('const ${1:name} = async ({ ${2:a}, ${3:b} }) => {$4};');
    });

    it('with three properties', () => {
      expect(
        generate.arrowFunctionExpression(
          'const name = async ({ a, b, c }) => {};',
        ),
      ).toEqual(
        'const ${1:name} = async ({ ${2:a}, ${3:b}, ${4:c} }) => {$5};',
      );
    });
  });
});
