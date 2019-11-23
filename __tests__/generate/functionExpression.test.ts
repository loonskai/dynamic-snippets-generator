import generate from '../../src/snippetGenerator';

describe('function expression', () => {
  it('without parameters', () => {
    expect(generate.functionExpression('function () {}')).toEqual(
      'function () { $1 }',
    );
  });

  it('with one parameter', () => {
    expect(generate.functionExpression('function (param) {}')).toEqual(
      'function (${1:param}) { $2 }',
    );
  });

  it('with two parameters', () => {
    expect(generate.functionExpression('function (param1, param2) {}')).toEqual(
      'function (${1:param1}, ${2:param2}) { $3 }',
    );
  });

  it('with three parameters', () => {
    expect(
      generate.functionExpression('function (param1, param2, param3) {}'),
    ).toEqual('function (${1:param1}, ${2:param2}, ${3:param3}) { $4 }');
  });

  describe('parameter destructuring', () => {
    it('with no properties', () => {
      expect(generate.functionExpression('function ({}) {}')).toEqual(
        'function ({ $1 }) { $2 }',
      );
    });

    it('with one property', () => {
      expect(generate.functionExpression('function ({ param }) {}')).toEqual(
        'function ({ ${1:param} }) { $2 }',
      );
    });

    it('with two properties', () => {
      expect(
        generate.functionExpression('function ({ param1, param2 }) {}'),
      ).toEqual('function ({ ${1:param1}, ${2:param2} }) { $3 }');
    });

    it('with three properties', () => {
      expect(
        generate.functionExpression('function ({ param1, param2, param3 }) {}'),
      ).toEqual('function ({ ${1:param1}, ${2:param2}, ${3:param3} }) { $4 }');
    });
  });

  describe('named function expression', () => {
    it('without parameters', () => {
      expect(generate.functionExpression('function name() {}')).toEqual(
        'function ${1:name}() { $2 }',
      );
    });

    it('with one parameter', () => {
      expect(generate.functionExpression('function name(param) {}')).toEqual(
        'function ${1:name}(${2:param}) { $3 }',
      );
    });

    it('with two parameters', () => {
      expect(
        generate.functionExpression('function name(param1, param2) {}'),
      ).toEqual('function ${1:name}(${2:param1}, ${3:param2}) { $4 }');
    });

    it('with three parameters', () => {
      expect(
        generate.functionExpression('function name(param1, param2, param3) {}'),
      ).toEqual(
        'function ${1:name}(${2:param1}, ${3:param2}, ${4:param3}) { $5 }',
      );
    });

    it('with no properties', () => {
      expect(generate.functionExpression('function name({}) {}')).toEqual(
        'function ${1:name}({ $2 }) { $3 }',
      );
    });

    it('with one property', () => {
      expect(
        generate.functionExpression('function name({ param }) {}'),
      ).toEqual('function ${1:name}({ ${2:param} }) { $3 }');
    });

    it('with two properties', () => {
      expect(
        generate.functionExpression('function name({ param1, param2 }) {}'),
      ).toEqual('function ${1:name}({ ${2:param1}, ${3:param2} }) { $4 }');
    });

    it('with three properties', () => {
      expect(
        generate.functionExpression(
          'function name({ param1, param2, param3 }) {}',
        ),
      ).toEqual(
        'function ${1:name}({ ${2:param1}, ${3:param2}, ${4:param3} }) { $5 }',
      );
    });
  });
});
