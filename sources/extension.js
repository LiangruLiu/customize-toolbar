"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const feature = require ("./feature.js")


exports.activate = function (context) {
	// context.subscriptions.push( vscode.commands.registerCommand( "extension.HiLLR", function () {
	// 	vscode.window.showInformationMessage ("Hello, LLR!")
	// }))

	// // var getCfg = vscode.workspace.getConfiguration ("Extreme-Dark-Theme").get
	// // feature.toggleTokenColors (getCfg("Token Colors"))

	// context.subscriptions.push( vscode.workspace.onDidChangeConfiguration( (event) => {
	// 	var getCfg = vscode.workspace.getConfiguration ("Extreme-Dark-Theme").get
	// 	if (event.affectsConfiguration ("Extreme-Dark-Theme.Token Colors")) {
	// 		feature.toggleTokenColors (getCfg("Token Colors"))
	// 		feature.promptToReload ()
	// 	}
	// }))
}


exports.deactivate = function () {
}
