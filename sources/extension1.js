"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.deactivate = exports.activate = void 0;
const path_1 = require("path");
const vscode_1 = require("vscode");

exports.activate = function (context) {
	console.log("extension is now active!");
	// rest of code
	// Step: If simple commands then add to this array
	let commandArray = [
		//=> ["name in package.json" , "name of command to execute"]
		["ShortcutMenuBar.save", "workbench.action.files.save"],
		[
			"ShortcutMenuBar.toggleTerminal",
			"workbench.action.terminal.toggleTerminal",
		],
		[
			"ShortcutMenuBar.toggleActivityBar",
			"workbench.action.toggleActivityBarVisibility",
		],
		["ShortcutMenuBar.navigateBack", "workbench.action.navigateBack"],
		["ShortcutMenuBar.navigateForward", "workbench.action.navigateForward"],
		[
			"ShortcutMenuBar.toggleRenderWhitespace",
			"editor.action.toggleRenderWhitespace",
		],
		["ShortcutMenuBar.quickOpen", "workbench.action.quickOpen"],
		["ShortcutMenuBar.findReplace", "editor.action.startFindReplaceAction"],
		["ShortcutMenuBar.undo", "undo"],
		["ShortcutMenuBar.redo", "redo"],
		["ShortcutMenuBar.commentLine", "editor.action.commentLine"],
		["ShortcutMenuBar.saveAll", "workbench.action.files.saveAll"],
		["ShortcutMenuBar.openFile", "workbench.action.files.openFile"],
		["ShortcutMenuBar.newFile", "workbench.action.files.newUntitledFile"],
		["ShortcutMenuBar.goToDefinition", "editor.action.revealDefinition"],
		["ShortcutMenuBar.cut", "editor.action.clipboardCutAction"],
		["ShortcutMenuBar.copy", "editor.action.clipboardCopyAction"],
		["ShortcutMenuBar.paste", "editor.action.clipboardPasteAction"],
		[
			"ShortcutMenuBar.compareWithSaved",
			"workbench.files.action.compareWithSaved",
		],
		["ShortcutMenuBar.showCommands", "workbench.action.showCommands"],
		["ShortcutMenuBar.startDebugging", "workbench.action.debug.start"],
		["ShortcutMenuBar.indentLines", "editor.action.indentLines"],
		["ShortcutMenuBar.outdentLines", "editor.action.outdentLines"],
		["ShortcutMenuBar.openSettings", "workbench.action.openSettings"],
		["ShortcutMenuBar.toggleWordWrap", "editor.action.toggleWordWrap"],
		[
			"ShortcutMenuBar.changeEncoding",
			"workbench.action.editor.changeEncoding",
		],
		["ShortcutMenuBar.powershellRestartSession", "PowerShell.RestartSession"],
	];
	let disposableCommandsArray = [];
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	commandArray.forEach((command) => {
		disposableCommandsArray.push(vscode_1.commands.registerCommand(command[0], () => {
			vscode_1.commands.executeCommand(command[1]).then(function () { });
		}));
	});
	// Step: else add complex command separately
	let disposableBeautify = vscode_1.commands.registerCommand("ShortcutMenuBar.beautify", () => {
		let editor = vscode_1.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}
		if (vscode_1.window.state.focused === true && !editor.selection.isEmpty) {
			vscode_1.commands
				.executeCommand("editor.action.formatSelection")
				.then(function () { });
		}
		else {
			vscode_1.commands
				.executeCommand("editor.action.formatDocument")
				.then(function () { });
		}
	});
	let disposableFormatWith = vscode_1.commands.registerCommand("ShortcutMenuBar.formatWith", () => {
		let editor = vscode_1.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}
		if (vscode_1.window.state.focused === true && !editor.selection.isEmpty) {
			vscode_1.commands
				.executeCommand("editor.action.formatSelection.multiple")
				.then(function () { });
		}
		else {
			vscode_1.commands
				.executeCommand("editor.action.formatDocument.multiple")
				.then(function () { });
		}
	});
	// see opened files list
	let disposableFileList = vscode_1.commands.registerCommand("ShortcutMenuBar.openFilesList", () => {
		let editor = vscode_1.window.activeTextEditor;
		if (!editor || !editor.viewColumn) {
			return; // No open text editor
		}
		vscode_1.commands
			.executeCommand("workbench.action.showAllEditorsByMostRecentlyUsed")
			.then(function () { });
	});
	let disposableSwitch = vscode_1.commands.registerCommand("ShortcutMenuBar.switchHeaderSource", () => {
		if (hasCpp) {
			vscode_1.commands
				.executeCommand("C_Cpp.SwitchHeaderSource")
				.then(function () { });
		}
		else {
			vscode_1.window.showErrorMessage("C/C++ extension (ms-vscode.cpptools) is not installed!");
		}
	});
	// Adding 1) to a list of disposables which are disposed when this extension is deactivated
	disposableCommandsArray.forEach((i) => {
		context.subscriptions.push(i);
	});
	// Adding 2) to a list of disposables which are disposed when this extension is deactivated
	context.subscriptions.push(disposableFileList);
	context.subscriptions.push(disposableBeautify);
	context.subscriptions.push(disposableFormatWith);
	context.subscriptions.push(disposableSwitch);
	// Adding 3 // user defined userButtons
	for (let index = 1; index <= 10; index++) {
		const printIndex = index !== 10 ? "0" + index : "" + index;
		let action = "userButton" + printIndex;
		let actionName = "ShortcutMenuBar." + action;
		let disposableUserButtonCommand = vscode_1.commands.registerCommand(actionName, () => {
			const config = vscode_1.workspace.getConfiguration("ShortcutMenuBar");
			let configName = action + "Command";
			const command = config.get(configName);
			// skip userButtons not set
			if (command === null ||
				command === undefined ||
				command.trimEnd() === "") {
				return;
			}
			const palettes = command.split(",");
			executeNext(action, palettes, 0);
		});
		context.subscriptions.push(disposableUserButtonCommand);
	}
	//also update userButton in package.json.. see "Adding new userButtons" in help.md file
}

exports.deactivate = function () { }

// local functions for user-defined button execution follow, based on
// https://github.com/ppatotski/vscode-commandbar/ Copyright 2018 Petr Patotski
function executeNext(action, palettes, index) {
	try {
		let [cmd, ...args] = palettes[index].split("|");
		if (args) {
			args = args.map((arg) => resolveVariables(arg));
		}
		cmd = cmd.trim();
		vscode_1.commands.executeCommand(cmd, ...args).then(() => {
			index++;
			if (index < palettes.length) {
				executeNext(action, palettes, index);
			}
		}, (err) => {
			vscode_1.window.showErrorMessage(`Execution of '${action}' command has failed: ${err.message}`);
		});
	}
	catch (err) {
		vscode_1.window.showErrorMessage(`Execution of '${action}' command has failed: ${err.message}`);
		console.error(err);
	}
}
const resolveVariablesFunctions = {
	env: (name) => process.env[name.toUpperCase()],
	cwd: () => process.cwd(),
	workspaceRoot: () => getWorkspaceFolder(),
	workspaceFolder: () => getWorkspaceFolder(),
	workspaceRootFolderName: () => (0, path_1.basename)(getWorkspaceFolder()),
	workspaceFolderBasename: () => (0, path_1.basename)(getWorkspaceFolder()),
	lineNumber: () => { var _a; return (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.active.line; },
	selectedText: () => {
		var _a;
		return (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.getText(vscode_1.window.activeTextEditor.selection);
	},
	file: () => getActiveEditorName(),
	fileDirname: () => (0, path_1.dirname)(getActiveEditorName()),
	fileExtname: () => (0, path_1.extname)(getActiveEditorName()),
	fileBasename: () => (0, path_1.basename)(getActiveEditorName()),
	fileBasenameNoExtension: () => {
		const edtBasename = (0, path_1.basename)(getActiveEditorName());
		return edtBasename.slice(0, edtBasename.length - (0, path_1.extname)(edtBasename).length);
	},
	execPath: () => process.execPath,
};
const variableRegEx = /\$\{(.*?)\}/g;
function resolveVariables(commandLine) {
	return commandLine
		.trim()
		.replace(variableRegEx, function replaceVariable(match, variableValue) {
		const [variable, argument] = variableValue.split(":");
		const resolver = resolveVariablesFunctions[variable];
		if (!resolver) {
			throw new Error(`Variable ${variable} not found!`);
		}
		return resolver(argument);
	});
}
function getActiveEditorName() {
	if (vscode_1.window.activeTextEditor) {
		return vscode_1.window.activeTextEditor.document.fileName;
	}
	return "";
}
function getWorkspaceFolder(activeTextEditor = vscode_1.window.activeTextEditor) {
	let folder;
	if (vscode_1.workspace === null || vscode_1.workspace === void 0 ? void 0 : vscode_1.workspace.workspaceFolders) {
		if (vscode_1.workspace.workspaceFolders.length === 1) {
			folder = vscode_1.workspace.workspaceFolders[0].uri.fsPath;
		}
		else if (activeTextEditor) {
			const folderObject = vscode_1.workspace.getWorkspaceFolder(activeTextEditor.document.uri);
			if (folderObject) {
				folder = folderObject.uri.fsPath;
			}
			else {
				folder = "";
			}
		}
		else if (vscode_1.workspace.workspaceFolders.length > 0) {
			folder = vscode_1.workspace.workspaceFolders[0].uri.fsPath;
		}
	}
	return folder;
}
