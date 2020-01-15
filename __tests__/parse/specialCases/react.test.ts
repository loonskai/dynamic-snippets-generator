import { _react } from '../../../src/parser';

const getDefaultFixture = ({ 
  imp =  "import React from 'react';",
  component = "const ComponentName = () => {return;};",
  exp = "export default ComponentName;"
}) => [imp, component, exp].join('');

describe('react components with named imports', () => {
  it('>uS', () => {
    expect(_react('>uS')).toEqual(getDefaultFixture({
      imp: "import React, { useState } from 'react';"
    }));
  });

  it('>uS:ue', () => {
    expect(_react('>uS,ue')).toEqual(getDefaultFixture({
      imp: "import React, { useState, useEffect } from 'react';"
    }));
  });

  it('>us,ue:title', () => {
    expect(_react('>us,ue:title')).toEqual(getDefaultFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const ComponentName = ({ title }) => {return;};"
    }));
  });

  it('>us,ue:title,handleChange', () => {
    expect(_react('>us,ue:title,handleChange')).toEqual(getDefaultFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const ComponentName = ({ title, handleChange }) => {return;};"
    }));
  });

  it('>ur:title@MyComponent', () => {
    expect(_react('>ur:title@MyComponent')).toEqual(getDefaultFixture({
      imp: "import React, { useReducer } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us,ue:title@MyComponent', () => {
    expect(_react('>us,ue:title@MyComponent')).toEqual(getDefaultFixture({
      imp: "import React, { useState, useEffect } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));

    expect(_react('>ur:title@MyComponent')).toEqual(getDefaultFixture({
      imp: "import React, { useReducer } from 'react';",
      component: "const MyComponent = ({ title }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us,ue:title,handleChange@MyComponent', () => {
    expect(_react('>ur,us,ue:title,handleChange@MyComponent')).toEqual(getDefaultFixture({
      imp: "import React, { useReducer, useState, useEffect } from 'react';",
      component: "const MyComponent = ({ title, handleChange }) => {return;};",
      exp: "export default MyComponent;",
    }));
  });

  it('>us@MyComponent', () => {
    expect(_react('>us@MyComponent')).toEqual(getDefaultFixture({
      imp: "import React, { useState } from 'react';",
      component: "const MyComponent = () => {return;};",
      exp: "export default MyComponent;"
    }));
  })
});

describe('react components with props', () => {
  it(':title', () => {
    expect(_react(':title')).toEqual(getDefaultFixture({
      component: "const ComponentName = ({ title }) => {return;};"
    }));
  });

  it(':title,handleChange', () => {
    expect(_react(':title,handleChange')).toEqual(getDefaultFixture({
      component: "const ComponentName = ({ title, handleChange }) => {return;};"
    }));
  });

  it(':title,handleChange@MyComponent', () => {
    expect(_react(':title,handleChange@MyComponent')).toEqual(getDefaultFixture({
      component: "const MyComponent = ({ title, handleChange }) => {return;};",
      exp: "export default MyComponent;"
    }));
  });
});

describe('react components with component name', () => {
  it('@MyComponent', () => {
    expect(_react('@MyComponent')).toEqual(getDefaultFixture({
      component: "const MyComponent = () => {return;};"
    }));
  });
});
