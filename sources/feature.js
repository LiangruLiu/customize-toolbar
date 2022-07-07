// 20220707
"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const fs = require ("fs")  // 请忽略提示，千万不要点击自动修复
const path = require ("path")


// 本函数通过修改package.json来实现功能
exports.updateButtonConfig = function (context, btnCfg) {
	let commands = []
	let keybindings = []
	let buttons = []
	for (let idx = 0; idx < btnCfg.length; idx ++) {
		const cmdName = `customize-toolbar.command-${idx+1}`
		context.subscriptions.push( vscode.commands.registerCommand( cmdName, () => {
			vscode.commands.executeCommand (btnCfg[idx]["command"])  // .then(function () {})
		}))
		if (typeof btnCfg[idx]["icon"] === "object")
			for (key in btnCfg[idx]["icon"])
				if (btnCfg[idx]["icon"][key].startsWith ("builtin/"))
					btnCfg[idx]["icon"][key] = btnCfg[idx]["icon"][key]
						.replace ("builtin", "./images/builtinIcons")
		commands[idx] = {
			"command": cmdName,
			"category": "Customize Toolbar",
			"title": btnCfg[idx]["name"],
			"icon": btnCfg[idx]["icon"]
		}
		if (idx+1 <= 8)
			keybindings[idx] = {
				"command": cmdName,
				"key": `ctrl+alt+${idx+1}`,
				"mac": `shift+cmd+${idx+1}`
			}
		buttons[idx] = {
			"group": `navigation@${idx+1}`,
			// "when": `config.CustomizeToolbar.buttonConfig.length >= ${idx+1} && resourceFilename =~ ${btnCfg[idx]["when"]}`,
			"when": btnCfg[idx]["when"] === undefined ? undefined :
				`resourceFilename =~ /${btnCfg[idx]["when"]}/`,
			"command": cmdName
		}
	}
	const contribFilePath = path.join (__dirname, "../package.json")  // 用__dirname获取当前模块的目录名
	let data = JSON.parse (fs.readFileSync (contribFilePath))
	data["contributes"]["commands"] = commands
	data["contributes"]["keybindings"] = keybindings
	data["contributes"]["menus"]["editor/title"] = buttons
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
