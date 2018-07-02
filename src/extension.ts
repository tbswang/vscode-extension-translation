'use strict';

import * as vscode from 'vscode';
const translate = require('google-translate-api-cn');

vscode.Selection
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let translation = vscode.commands.registerCommand('extension.translation', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);

        text = text.replace(/(\*)|(\*\*)|(\/\/)|(<\/)|(>)|(<)|(\$)|(\/\*)/g, '');
        console.log(text);

        translate(text, { from: "en", to: 'zh-cn' }).then((res: any) => {
            console.log(res.text);
            vscode.window.showInformationMessage(res.text);
        }).catch(() => {
            vscode.window.showInformationMessage("翻译君去找希城小姐姐了orz");
        });
    })
    context.subscriptions.push(translation);
}

// this method is called when your extension is deactivated
export function deactivate() {
}