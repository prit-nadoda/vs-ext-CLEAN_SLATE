import * as vscode from 'vscode';
import { removeCSharpComments, removeJavaComments, removeJavaScriptComments, removePythonComments, removeJSXComments } from './utils';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('cleanslate.cleanSelection', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const text = editor.document.getText(selection);
            const language = getLanguage(editor.document);
            const cleanedText = cleanComments(text, language);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, cleanedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function getLanguage(document: vscode.TextDocument): string {
    return document.languageId;
}

function cleanComments(text: string, language: string): string {
    switch (language) {
        case 'javascript':
        case 'typescript':
            return removeJavaScriptComments(text);
        case 'javascriptreact':
        case 'typescriptreact':
            return removeJSXComments(text);
        case 'python':
            return removePythonComments(text);
        case 'java':
            return removeJavaComments(text);
        case 'csharp':
            return removeCSharpComments(text);
        default:
            return text;
    }
}


