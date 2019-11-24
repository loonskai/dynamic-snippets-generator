# Dynamic Snippets
Snippet parser for [**VSCode extention**](https://github.com/loonskai/vscode-dynamic-snippets). Inspired by [emmet](https://github.com/emmetio/emmet) abbreviation syntax.

<p align="center"><img src="assets/logo.jpg" width="200px" /></p>

This parser uses the emmet-like syntax for parsing the most frequently used JavaScript construction. For example this line:
```
i>request>axios
```
will be parsed into appropriate VSCode snippet line:
```js
import ${1:request} from '${2:axios}';
```
Below you will find the list of all possible abbreviations

## Abbreviations
|Abbreviation|VSCode snippet|Description|
|---|---|---|
|**ES6 import**|
|`i>name`|`import ${1:name} from '${2:name}';`|ES6 import|
|`i>defaultExport>name`|`import ${1:defaultExport} from '${2:name}';`|ES6 import with a different default export name|
|`i:a,b>name`|`import { ${1:a}, ${2:b} } from '${3:name}';`|ES6 import with multiple exports|
|`i*alias>name`|`import * as ${1:alias} from '${2:name}';`|ES6 import with a namespace|
|**ES6 export**|
|`e>name`|`export const ${1:name} = $2`|Exporting individual variables|
|`ed>name`|`export default ${1:name};`|Default export|
|**CommonJS module require**|
|`r>name`|`const ${1:name} = require('${2:name}');`|Module require|
|`r>defaultExport>name`|`const ${1:defaultExport} = require('${2:name}');`|Module require with a different default export name|
|`r:a,b>name`|`const { ${1:a}, ${2:b} } = require('${3:name}');`|Module require with property destructuring|
|**CommonJS module export**|
|`me>name`|`module.exports = ${1:name};`|Default module export|
|**Function declaration**|
|`f>name`|`function ${1:name}() {$2}`|Without parameters|
|`f>name:a,b`|`function ${1:name}(${2:a}, ${3:b}) {$4}`|With parameters|
|`f>name:a,b:`|`function ${1:name}({ ${2:a}, ${3:b} }) {$4}`|With one destructured object property|
|**Arrow function expression**|
|`name=>`|`const ${1:name} = () => {$2};`|Without parameters|
|`name:a,b=>`|`const ${1:name} = (${2:a}, ${3:b}) => {$4};`|With parameters|
|`name:a,b:=>`|`const ${1:name} = ({ ${2:a}, ${3:b} }) => {$4};`|With one destructured object property|

## Usage
```js
import generateSnippet from 'dynamic-snippets';

generateSnippet('i>example'); // "import ${1:example} from '${2:example}';"
```