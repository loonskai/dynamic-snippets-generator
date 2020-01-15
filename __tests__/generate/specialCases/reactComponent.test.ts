import generate from '../../../src/generator';
import { getFixture } from '../../helpers/react';

let component;

describe('react component snippets', () => {
  it('basic case', () => {
    component = getFixture();

    expect(generate.reactComponent(component)).toEqual(
      getFixture(
        {
          imp: "import React from 'react';",
          component: 'const ${1:ComponentName} = () => {\n  return $2;\n};',
          exp: 'export default ${1:ComponentName};',
        },
        '\n\n',
      ),
    );
  });

  describe('import hooks', () => {
    it('import one hook', () => {
      component = getFixture({
        imp: "import React, { useState } from 'react';",
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React, { useState } from 'react';",
            component: 'const ${1:ComponentName} = () => {\n  return $2;\n};',
            exp: 'export default ${1:ComponentName};',
          },
          '\n\n',
        ),
      );
    });

    it('import a couple of hooks', () => {
      component = getFixture({
        imp: "import React, { useState, useReducer } from 'react';",
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React, { useState, useReducer } from 'react';",
            component: 'const ${1:ComponentName} = () => {\n  return $2;\n};',
            exp: 'export default ${1:ComponentName};',
          },
          '\n\n',
        ),
      );
    });
  });

  describe('props case', () => {
    it('one prop', () => {
      component = getFixture({
        component: 'const ComponentName = ({ title }) => {return;};',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React from 'react';",
            component: 'const ${1:ComponentName} = ({\n  ${2:title}\n}) => {\n  return $3;\n};',
            exp: 'export default ${1:ComponentName};',
          },
          '\n\n',
        ),
      );
    });

    it('a couple of props', () => {
      component = getFixture({
        component: 'const ComponentName = ({ title, handleChange }) => {return;};',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React from 'react';",
            component: 'const ${1:ComponentName} = ({\n  ${2:title},\n  ${3:handleChange}\n}) => {\n  return $4;\n};',
            exp: 'export default ${1:ComponentName};',
          },
          '\n\n',
        ),
      );
    });

    it('props with imports', () => {
      component = getFixture({
        imp: "import React, { useState } from 'react';",
        component: 'const ComponentName = ({ title, handleChange }) => {return;};',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React, { useState } from 'react';",
            component: 'const ${1:ComponentName} = ({\n  ${2:title},\n  ${3:handleChange}\n}) => {\n  return $4;\n};',
            exp: 'export default ${1:ComponentName};',
          },
          '\n\n',
        ),
      );
    });
  });

  describe('custom component name', () => {
    it('only with name', () => {
      component = getFixture({
        component: 'const MyComponent = () => {return;};',
        exp: 'export default MyComponent;',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React from 'react';",
            component: 'const ${1:MyComponent} = () => {\n  return $2;\n};',
            exp: 'export default ${1:MyComponent};',
          },
          '\n\n',
        ),
      );
    });

    it('imports with name', () => {
      component = getFixture({
        imp: "import React, { useEffect, useReducer } from 'react';",
        component: 'const MyComponent = () => {return;};',
        exp: 'export default MyComponent;',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React, { useEffect, useReducer } from 'react';",
            component: 'const ${1:MyComponent} = () => {\n  return $2;\n};',
            exp: 'export default ${1:MyComponent};',
          },
          '\n\n',
        ),
      );
    });

    it('one prop with name', () => {
      component = getFixture({
        component: 'const MyComponent = ({ title }) => {return;};',
        exp: 'export default MyComponent;',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React from 'react';",
            component: 'const ${1:MyComponent} = ({\n  ${2:title}\n}) => {\n  return $3;\n};',
            exp: 'export default ${1:MyComponent};',
          },
          '\n\n',
        ),
      );
    });

    it('a couple of props with name', () => {
      component = getFixture({
        component: 'const MyComponent = ({ title, handleChange }) => {return;};',
        exp: 'export default MyComponent;',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React from 'react';",
            component: 'const ${1:MyComponent} = ({\n  ${2:title},\n  ${3:handleChange}\n}) => {\n  return $4;\n};',
            exp: 'export default ${1:MyComponent};',
          },
          '\n\n',
        ),
      );
    });

    it('imports with a couple of props and name', () => {
      component = getFixture({
        imp: "import React, { useEffect, useReducer } from 'react';",
        component: 'const MyComponent = ({ title, handleChange }) => {return;};',
        exp: 'export default MyComponent;',
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture(
          {
            imp: "import React, { useEffect, useReducer } from 'react';",
            component: 'const ${1:MyComponent} = ({\n  ${2:title},\n  ${3:handleChange}\n}) => {\n  return $4;\n};',
            exp: 'export default ${1:MyComponent};',
          },
          '\n\n',
        ),
      );
    });
  });
});
