import generate from '../../../src/generator';
import { getFixture } from '../../helpers/react';

let component;

describe('react component snippets', () => {
  it('basic case', () => {
    component = getFixture();

    expect(generate.reactComponent(component)).toEqual(
      getFixture({
        imp: "import React from 'react';",
        component: "const ${1:ComponentName} = () => {return $2;};",
        exp: "export default ${1:ComponentName};"
      })
    );
  });

  describe('import hooks', () => {
    it('import one hook', () => {
      component = getFixture({
        imp: "import React, { useState } from 'react';"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React, { useState } from 'react';",
          component: "const ${1:ComponentName} = () => {return $2;};",
          exp: "export default ${1:ComponentName};"
        })
      );
    });

    it('import a couple of hooks', () => {
      component = getFixture({
        imp: "import React, { useState, useReducer } from 'react';"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React, { useState, useReducer } from 'react';",
          component: "const ${1:ComponentName} = () => {return $2;};",
          exp: "export default ${1:ComponentName};"
        })
      );
    });
  });

  describe('props case', () => {
    it('one prop', () => {
      component = getFixture({
        component: "const ComponentName = ({ title }) => {return;};"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React from 'react';",
          component: "const ${1:ComponentName} = ({ ${2:title} }) => {return $3;};",
          exp: "export default ${1:ComponentName};"
        })
      );
    });
  
    it('a couple of props', () => {
      component = getFixture({
        component: "const ComponentName = ({ title, handleChange }) => {return;};"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React from 'react';",
          component: "const ${1:ComponentName} = ({ ${2:title}, ${3:handleChange} }) => {return $4;};",
          exp: "export default ${1:ComponentName};"
        })
      );
    });
  
    it('props with imports', () => {
      component = getFixture({
        imp: "import React, { useState } from 'react';",
        component: "const ComponentName = ({ title, handleChange }) => {return;};"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React, { useState } from 'react';",
          component: "const ${1:ComponentName} = ({ ${2:title}, ${3:handleChange} }) => {return $4;};",
          exp: "export default ${1:ComponentName};"
        })
      );
    });
  });

  describe('custom component name', () => {
    it('only with name', () => {
      component = getFixture({
        component: "const MyComponent = () => {return;};",
        exp: "export default MyComponent;"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React from 'react';",
          component: "const ${1:MyComponent} = () => {return $2;};",
          exp: "export default ${1:MyComponent};"
        })
      );
    });

    it('imports with name', () => {
      component = getFixture({
        imp: "import React, { useEffect, useReducer } from 'react';",
        component: "const MyComponent = () => {return;};",
        exp: "export default MyComponent;"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React, { useEffect, useReducer } from 'react';",
          component: "const ${1:MyComponent} = () => {return $2;};",
          exp: "export default ${1:MyComponent};"
        })
      );
    });

    it('one prop with name', () => {
      component = getFixture({
        component: "const MyComponent = ({ title }) => {return;};",
        exp: "export default MyComponent;"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React from 'react';",
          component: "const ${1:MyComponent} = ({ ${2:title} }) => {return $3;};",
          exp: "export default ${1:MyComponent};"
        })
      );
    });

    it('a couple of props with name', () => {
      component = getFixture({
        component: "const MyComponent = ({ title, handleChange }) => {return;};",
        exp: "export default MyComponent;"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React from 'react';",
          component: "const ${1:MyComponent} = ({ ${2:title}, ${3:handleChange} }) => {return $4;};",
          exp: "export default ${1:MyComponent};"
        })
      );
    });

    it('imports with a couple of props and name', () => {
      component = getFixture({
        imp: "import React, { useEffect, useReducer } from 'react';",
        component: "const MyComponent = ({ title, handleChange }) => {return;};",
        exp: "export default MyComponent;"
      });

      expect(generate.reactComponent(component)).toEqual(
        getFixture({
          imp: "import React, { useEffect, useReducer } from 'react';",
          component: "const ${1:MyComponent} = ({ ${2:title}, ${3:handleChange} }) => {return $4;};",
          exp: "export default ${1:MyComponent};"
        })
      );
    });
  });
});

  
