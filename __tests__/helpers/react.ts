export const getFixture = ({ 
  imp =  "import React from 'react';",
  component = "const ComponentName = () => {return;};",
  exp = "export default ComponentName;"
} = {}) => [imp, component, exp].join('');
