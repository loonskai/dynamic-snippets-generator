import generate from '../../src/generator';

describe('named function declaration', () => {
  it('without parameters', () => {
    expect(generate.functionDeclaration('function name() {}')).toEqual(
      'function ${1:name}() {$2}',
    );
  });

  it('with one parameter', () => {
    expect(generate.functionDeclaration('function name(param) {}')).toEqual(
      'function ${1:name}(${2:param}) {$3}',
    );
  });

  it('with two parameters', () => {
    expect(
      generate.functionDeclaration('function name(param1, param2) {}'),
    ).toEqual('function ${1:name}(${2:param1}, ${3:param2}) {$4}');
  });

  it('with three parameters', () => {
    expect(
      generate.functionDeclaration('function name(param1, param2, param3) {}'),
    ).toEqual('function ${1:name}(${2:param1}, ${3:param2}, ${4:param3}) {$5}');
  });

  it('with one property', () => {
    expect(generate.functionDeclaration('function name({ param }) {}')).toEqual(
      'function ${1:name}({ ${2:param} }) {$3}',
    );
  });

  it('with two properties', () => {
    expect(
      generate.functionDeclaration('function name({ param1, param2 }) {}'),
    ).toEqual('function ${1:name}({ ${2:param1}, ${3:param2} }) {$4}');
  });

  it('with three properties', () => {
    expect(
      generate.functionDeclaration(
        'function name({ param1, param2, param3 }) {}',
      ),
    ).toEqual(
      'function ${1:name}({ ${2:param1}, ${3:param2}, ${4:param3} }) {$5}',
    );
  });
});
