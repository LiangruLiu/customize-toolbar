// 20220706
"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const feature = require ("./feature.js")


exports.activate = function (context) {
	context.subscriptions.push( vscode.workspace.onDidChangeConfiguration( (event) => {
		const getCfg = vscode.workspace.getConfiguration ("CustomizeToolbar").get
		if (event.affectsConfiguration ("CustomizeToolbar.buttonConfig")) {
			feature.updateButtonConfig (context, getCfg ("buttonConfig"))
			feature.promptToReload ()
		}
	}))
}


exports.deactivate = function () {
}
