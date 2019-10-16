"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode_1 = require("vscode");
var parseValue = function (string) {
    var _a = string.split(':'), abbreviature = _a[0], value = _a[1];
    switch (abbreviature) {
        case 'rqr':
            return "const " + value + " = require(\"" + value + "\");";
        default:
            return null;
    }
};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "abbreviation-js" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    var expandAbbreviation = vscode_1.commands.registerCommand('extension.expandAbbreviation', function () {
        // The code you place here will be executed every time your command is executed
        var activeEditor = vscode_1.window.activeTextEditor;
        if (activeEditor) {
            var _a = activeEditor.selection.active, line = _a.line, character = _a.character;
            var text = activeEditor.document.lineAt(line).text;
            var parsedValue_1 = parseValue(text);
            if (parsedValue_1) {
                var startPosition = new vscode_1.Position(line, 0);
                var endPosition = new vscode_1.Position(line, character);
                var range_1 = new vscode_1.Range(startPosition, endPosition);
                activeEditor.edit(function (editor) {
                    editor.replace(range_1, parsedValue_1);
                });
            }
        }
    });
    context.subscriptions.push(expandAbbreviation);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
