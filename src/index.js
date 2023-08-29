const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createCSSClass', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const className = editor.document.getText(selection);

        // Créer la règle CSS correspondante
        const cssRule = `.${className} {\n\t/* styles here */\n}`;

        // Spécifier le chemin du fichier CSS associé (ajustez le chemin selon votre structure)
        const cssFilePath = editor.document.uri.path.replace('.html', '.css');

        // Ouvrir le fichier CSS correspondant et y ajouter la règle
        vscode.workspace.openTextDocument(vscode.Uri.file(cssFilePath)).then((document) => {
            const edit = new vscode.TextEdit(new vscode.Range(document.lineCount, 0, document.lineCount, 0), cssRule);
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, [edit]);
            return vscode.workspace.applyEdit(workspaceEdit);
        });
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;
