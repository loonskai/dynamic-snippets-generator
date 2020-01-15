import parseES6Import from '../import';
import parseExport from '../export';
import parseArrowFunctionExpression from '../arrowFunctionExpression';

const DEFAULT_COMPONENT_NAME = 'ComponentName';

const getReactImport = (cut: string): string => {
  const str = cut[0] !== ':' ? cut : cut.replace(':', '');
  switch (str.toLowerCase()) {
    case 'us': return 'useState';
    case 'ur': return 'useReducer';
    case 'ue': return 'useEffect';
    case 'uc': return 'useContext'; 
    default: return str;
  }
}

const mapReactImports = (str: string): string => str.split(',').map(getReactImport).join(',');

const parseReact = (
  abbreviationNodes: string,
): any => {
  const re = /[\>\:\@]/;
  const nodes = abbreviationNodes.split(re);

  if (nodes.length === 4) {
    const [, reactImportsStr, propsStr, componentName] = nodes;
    const importStatement = parseES6Import(`>React:${mapReactImports(reactImportsStr)}>react`);
    const exportStatement = parseExport(`>${componentName}`, { es6: true, isDefault: true });
    const component = parseArrowFunctionExpression(`${componentName}:${propsStr}:=>body`);
    return {
      type: 'Program',
      body: [
        importStatement,
        component,
        exportStatement
      ]
    }
  }

  if (nodes.length === 3) {
    const reS = {
      importsAndProps: />.*:/g,
      importsAndName: />.*@/g,
      propsAndName: /:.*@/g
    };
    let importStatement = parseES6Import(`>React>react`);;
    let component = parseArrowFunctionExpression(`${DEFAULT_COMPONENT_NAME}=>body`);
    let exportStatement = parseExport(`>${DEFAULT_COMPONENT_NAME}`, { es6: true, isDefault: true });

    if (reS.importsAndProps.test(abbreviationNodes)) {
      const [, reactImportsStr, propsStr] = nodes;
      importStatement = parseES6Import(`>React:${mapReactImports(reactImportsStr)}>react`);
      component = parseArrowFunctionExpression(`${DEFAULT_COMPONENT_NAME}:${propsStr}:=>body`);
    }

    if (reS.importsAndName.test(abbreviationNodes)) {
      const [, reactImportsStr, componentName] = nodes;
      importStatement = parseES6Import(`>React:${mapReactImports(reactImportsStr)}>react`);
      component = parseArrowFunctionExpression(`${componentName}=>body`);
      exportStatement = parseExport(`>${componentName}`, { es6: true, isDefault: true });
    }

    if (reS.propsAndName.test(abbreviationNodes)) {
      const [, propsStr, componentName] = nodes;
      component = parseArrowFunctionExpression(`${componentName}:${propsStr}:=>body`);
      exportStatement = parseExport(`>${componentName}`, { es6: true, isDefault: true });
    }

    return {
      type: 'Program',
      body: [
        importStatement,
        component,
        exportStatement
      ]
    }
  }

  if (nodes.length === 2) {
    let importStatement = parseES6Import(`>React>react`);;
    let component = parseArrowFunctionExpression(`${DEFAULT_COMPONENT_NAME}=>body`);
    let exportStatement = parseExport(`>${DEFAULT_COMPONENT_NAME}`, { es6: true, isDefault: true });
    switch (abbreviationNodes[0]) {
      case '>': {
        const [, reactImportsStr] = nodes;
        importStatement = parseES6Import(`>React:${mapReactImports(reactImportsStr)}>react`);
        break;
      };
      case ':': {
        const [, propsStr] = nodes;
        component = parseArrowFunctionExpression(`${DEFAULT_COMPONENT_NAME}:${propsStr}:=>body`);
        break;
      };
      case '@': {
        const [, componentName] = nodes;
        component = parseArrowFunctionExpression(`${componentName}=>body`);
        break;
      };
    }

    return {
      type: 'Program',
      body: [
        importStatement,
        component,
        exportStatement
      ]
    }
  }
};

export default parseReact;
