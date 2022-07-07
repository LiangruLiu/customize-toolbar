// 20220707
"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const feature = require ("./feature.js")


exports.activate = function (context) {
	const getCfg = vscode.workspace.getConfiguration ("CustomizeToolbar").get
	context.subscriptions.push( vscode.workspace.onDidChangeConfiguration( (event) => {
		if (event.affectsConfiguration ("CustomizeToolbar.buttonConfig")) {
			feature.updateButtonConfig (context, getCfg ("buttonConfig"))
			feature.promptToReload ()
		}
	}))
	feature.registerCommands (context, getCfg ("buttonConfig"))
}


exports.deactivate = function () {
}
