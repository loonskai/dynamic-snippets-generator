import { _react } from '../../../src/parser';
import { getFixture } from '../../helpers/react';

describe('react components with named imports', () => {
  it('>uS', () => {
    expect(_react('>uS')).toEqual(getFixture({
      imp: "import React, { useState } from 'react';"
    }));
  });

  it('>uS:ue', () => {
    expect(_react('>uS,ue')).toEqual(getFixture({
      imp: "import React, { useState, useEffect } from 'react';"
    }));
  });

  it('>us,ue:title', () => {
    expect(_react('>us,ue:title')).toEqual(getFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const ComponentName = ({ title }) => {return;};"
    }));
  });

  it('>us,ue:title,handleChange', () => {
    expect(_react('>us,ue:title,handleChange')).toEqual(getFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const ComponentName = ({ title, handleChange }) => {return;};"
    }));
  });

  it('>ur:title@MyComponent', () => {
    expect(_react('>ur:title@MyComponent')).toEqual(getFixture({
      imp: "import React, { useReducer } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us,ue:title@MyComponent', () => {
    expect(_react('>us,ue:title@MyComponent')).toEqual(getFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));

    expect(_react('>ur:title@MyComponent')).toEqual(getFixture({
      imp: "import React, { useReducer } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us,ue:title,handleChange@MyComponent', () => {
    expect(_react('>ur,us,ue:title,handleChange@MyComponent')).toEqual(getFixture({
      imp: "import React, { useReducer, useState, useEffect } from 'react';",
      component: "const MyComponent = ({ title, handleChange }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us@MyComponent', () => {
    expect(_react('>us@MyComponent')).toEqual(getFixture({
      imp: "import React, { useState } from 'react';",
      component: "const MyComponent = () => {return;};",
      exp: "export default MyComponent;"
    }));
  })
});

describe('react components with props', () => {
  it(':title', () => {
    expect(_react(':title')).toEqual(getFixture({
      component: "const ComponentName = ({ title }) => {return;};"
    }));
  });

  it(':title,handleChange', () => {
    expect(_react(':title,handleChange')).toEqual(getFixture({
      component: "const ComponentName = ({ title, handleChange }) => {return;};"
    }));
  });

  it(':title,handleChange@MyComponent', () => {
    expect(_react(':title,handleChange@MyComponent')).toEqual(getFixture({
      component: "const MyComponent = ({ title, handleChange }) => {return;};",
      exp: "export default MyComponent;"
    }));
  });
});

describe('react components with component name', () => {
  it('@MyComponent', () => {
    expect(_react('@MyComponent')).toEqual(getFixture({
      component: "const MyComponent = () => {return;};"
    }));
  });
});
