// 20220707
"use strict"
const vscode = require ("vscode")  // 请忽略提示，千万不要点击自动修复
const fs = require ("fs")  // 请忽略提示，千万不要点击自动修复
const path = require ("path")


// 本函数通过修改package.json来实现功能
exports.updateButtonConfig = function (context, btnCfg) {
	const builtinFolder = "./images/builtinIcons"
	const userFolder = "./images/userIcons"
	// 清空用户图标文件夹
	for (let file of fs.readdirSync (userFolder))
		fs.unlinkSync (`${userFolder}/${file}`)
	let commands = []
	let keybindings = []
	let buttons = []
	for (let idx = 0; idx < btnCfg.length; idx ++) {
		const icon = btnCfg[idx]["icon"]
		if (typeof icon === "object")
			for (let key in icon)
				if (icon[key].startsWith ("builtin/")) {
					icon[key] = icon[key].replace ("builtin", builtinFolder)
				} else {
					newPath = `${userFolder}/btn${idx+1}_${key}.svg`
					fs.copyFileSync (icon[key], newPath)
					icon[key] = newPath
				}
		const cmdName = `customize-toolbar.command-${idx+1}`
		commands[idx] = {
			"command": cmdName,
			"category": "Customize Toolbar",
			"title": btnCfg[idx]["name"],
			"icon": icon
		}
		// if (idx+1 <= 8)
		// 	keybindings[idx] = {
		// 		"command": cmdName,
		// 		"key": `ctrl+alt+${idx+1}`,
		// 		"mac": `shift+cmd+${idx+1}`
		// 	}
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
			vscode.commands.executeCommand ("workbench.action.reloadWindow")
		}
	})
}


exports.registerCommands = function (context, btnCfg) {
	for (let idx = 0; idx < btnCfg.length; idx ++) {
		const cmdName = `customize-toolbar.command-${idx+1}`
		context.subscriptions.push( vscode.commands.registerCommand( cmdName, () => {
			vscode.commands.executeCommand (btnCfg[idx]["command"])
		}))
		// 因为package.json不能写注释，所以就记在这里了
		// 注意buttonConfig中的command不能填名字而要填标识符，具体可以去快捷键列表里找
		// 比如收放终端，要写workbench.action.terminal.toggleTerminal而非view.toggleTerminal
	}
}
