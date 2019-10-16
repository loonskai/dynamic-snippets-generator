// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window, Position, Range } from 'vscode';

const parseValue = (string: string) => {
  const [abbreviature, value] = string.split(':');
  switch (abbreviature) {
    case 'rqr':
      return `const ${value} = require("${value}");`;
    default:
      return null;
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "abbreviation-js" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let expandAbbreviation = commands.registerCommand(
    'extension.expandAbbreviation',
    () => {
      // The code you place here will be executed every time your command is executed
      const activeEditor = window.activeTextEditor;
      if (activeEditor) {
        const { line, character } = activeEditor.selection.active;
        const { text } = activeEditor.document.lineAt(line);
        const parsedValue = parseValue(text);

        if (parsedValue) {
          const startPosition = new Position(line, 0);
          const endPosition = new Position(line, character);
          const range = new Range(startPosition, endPosition);
          activeEditor.edit(editor => {
            editor.replace(range, parsedValue);
          });
        }
      }
    },
  );

  context.subscriptions.push(expandAbbreviation);
}

// this method is called when your extension is deactivated
export function deactivate() {}
