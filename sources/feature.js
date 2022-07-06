// 20220706
"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const fs = require ("fs")  // 请忽略提示，千万不要点击自动修复
const path = require ("path")


// 本函数通过修改package.json来实现功能
exports.updateButtonConfig = function (buttonConfig) {
	const contribFilePath = path.join (__dirname, "../package.json")  // 用__dirname获取当前模块的目录名
	let data = JSON.parse (fs.readFileSync (contribFilePath))
	data["contributes"]["commands"] = data["contributes"]["commands"]
	fs.writeFileSync (contribFilePath, JSON.stringify (data, null, "\t") + "\n")
}


exports.promptToReload = function () {
	const message = "Changed. Please restart VSCode to apply."
	const action = ["Reload", "Not Now"]
	vscode.window.showInformationMessage (message, ...action) .then( (selectedAction) => {
		if (selectedAction === "Reload") {
			vscode.commands.executeCommand ("workbench.action.reloadWindow");
		}
	})
}
