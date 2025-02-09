import * as vscode from 'vscode';
import { removeCSharpComments, removeJavaComments, removeJavaScriptComments, removePythonComments, removeJSXComments } from './utils';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('cleanslate.cleanSelection', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }

        try {
            const selection = editor.selection;
            
            if (selection.isEmpty) {
                vscode.window.showWarningMessage('Please select text to remove comments');
                return;
            }

            const text = editor.document.getText(selection);
            const language = getLanguage(editor.document);

            if (!isSupportedLanguage(language)) {
                vscode.window.showWarningMessage(`Language '${language}' is not supported for comment removal`);
                return;
            }

            const cleanedText = cleanComments(text, language);

            // Remove all whitespace and newlines for comparison
            const normalizedOriginal = text.replace(/[\s\n\r]+/g, '');
            const normalizedCleaned = cleanedText.replace(/[\s\n\r]+/g, '');

            // Check if the text contains any comment patterns before cleaning
            const hasComments = text.match(/\/\/|\/\*|\*\/|#/);

            if (hasComments && normalizedOriginal !== normalizedCleaned) {
                await editor.edit(editBuilder => {
                    editBuilder.replace(selection, cleanedText);
                });
                vscode.window.showInformationMessage('Comments removed successfully');
            } else if (!hasComments) {
                vscode.window.showInformationMessage('No comments found in selection');
            } else {
                // If there are comments but no changes, something might be wrong
                console.log('Debug - Original:', text);
                console.log('Debug - Cleaned:', cleanedText);
                vscode.window.showInformationMessage('Comments found but could not be removed properly');
            }
        } catch (error) {
            console.error('Error details:', error);
            vscode.window.showErrorMessage(`Error removing comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function getLanguage(document: vscode.TextDocument): string {
    return document.languageId;
}

function isSupportedLanguage(language: string): boolean {
    return [
        'javascript',
        'typescript',
        'javascriptreact',
        'typescriptreact',
        'python',
        'java',
        'csharp',
        // Add more supported languages here
    ].includes(language);
}

function cleanComments(text: string, language: string): string {
    switch (language) {
        case 'javascript':
        case 'typescript':
        case 'json':
        case 'jsonc':
            return removeJavaScriptComments(text);
        case 'javascriptreact':
        case 'typescriptreact':
            return removeJSXComments(text);
        case 'python':
        case 'jupyter':
            return removePythonComments(text);
        case 'java':
        case 'scala':
            return removeJavaComments(text);
        case 'csharp':
        case 'cpp':
        case 'c':
            return removeCSharpComments(text);
        default:
            return text;
    }
}


