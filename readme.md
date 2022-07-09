<!--20220709-->
## 未完工，请勿下载！
## Unfinished, do NOT download!
<span id="jump-begin"/> <h1 align="center"> Customize Toolbar </h1>

<div align=center>
<img alt="VS Market Version" src="https://img.shields.io/visual-studio-marketplace/v/liangruliu.customize-toolbar?color=0c649e&style=flat-square">
<img alt="VS Market Last Updated" src="https://img.shields.io/visual-studio-marketplace/last-updated/liangruliu.customize-toolbar?color=0c649e&style=flat-square">
<img alt="VS Market Installs" src="https://img.shields.io/visual-studio-marketplace/i/liangruliu.customize-toolbar?color=0c649e&style=flat-square">
<img alt="(Static) Extension's Keywords" src="https://img.shields.io/badge/keywords-shortcut%2C%20button%2C%20tool%2C%20menu%2C%20bar-0c649e?style=flat-square">
</div><br/>



<details align="center">
   <summary align="center"> 展开 中文版介绍 </summary>

   <p align="center">
      这个插件可以给界面右上角工具栏添加自定义按钮。<br/>
      插件本身不提供实质性功能，而是提供了为任意命令设立按钮的途径。<br/>
      首先声明，它目前还不够完善，详见 <a href="#jump-ch">文末</a>。
   </p>
   <div align="left">


## 截图

+ [略](#jump-pic)


## 前言及简介

+ 对于那些常用的功能，为了更便于使用，你可以给它们绑定快捷键，但其实还有一个方法：在工具栏添加按钮。
+ 一直以来，我使用的是一个叫做 [Shortcut Menu Bar](https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar) 的插件来实现添加按钮。然而它不支持自定义图标，这对于对美观度要求较高的我来说是个问题。
+ 现在我自己做了一个插件，不仅能自定义图标，还支持根据文件名决定是否显示按钮。


## 安装与使用

1. 点击 VSCode 左侧扩展按钮，在搜索框搜索，点击 `[安装]`。
2. 在安装后的初次启动，请打开 `[扩展设置]`，按照 `Button Config` 项的介绍刷新一次。
3. 在 `Button Config` 项中点击 `[在 settings.json 中编辑]`，然后可以根据代码提示来设置自己的按钮。代码提示里写得足够详细，这里就不再赘述了。
4. 这个插件本身是不提供实质性功能的。默认配置里，有几个按钮调用的不是 VSCode 自带的命令，而是其他插件提供的命令，如果你没有安装的话是无法使用的。


## 说明

1. 插件代码所在位置为（`Windows` 上的默认路径）：<br/>
   `C:/Users/<NAME>/.vscode/extensions/liangruliu.customize-toolbar-<VER>`
2. <span id="jump-ch"/>
   我制作这个插件，一方面是需要这个功能，另一方面其实也是一个学习的过程，因为我既不太会 Node.js，也不太会 VSCode 插件开发。
   目前该插件的功能的代码实现逻辑很不好：我只会静态设置按钮，没找到动态设置按钮的方法，所以每次修改设置，其实是在通过文件读写修改源码的方式来修改功能。这也正是每次应用更改都需要重启两次的原因。
   我甚至认为这个程序有出错的可能，因此添加了手动刷新的功能。
   如果你有解决这个问题的思路，或者有什么建议，欢迎通过邮箱 <LiangruLiu@outlook.com> 与我联系。


**开启个性化的 VSCode！**



   <br/><br/><br/><br/>
   <h2 align="center"> 英文版介绍 </h2>
   </div>
</details>

<p align="center">
   这个插件可以给界面右上角工具栏添加自定义按钮。 <br/>
   插件本身不提供实质性功能，而是提供了为任意命令设立按钮的途径。 <br/>
   First of all, it's not perfect at present, see <a href="#jump-en">end of article</a> for details.
</p>


## Screenshot

<span id="jump-pic"/> [![Screenshot](https://liangruliu.github.io/images/vscodeExt/CT_screenshot.png)](https://liangruliu.github.io/images/vscodeExt/CT_screenshot.png)


## Preface & Introduction

+ 对于那些常用的功能，为了更便于使用，你可以给它们绑定快捷键，但其实还有一个方法：在工具栏添加按钮。
+ 一直以来，我使用的是一个叫做 [Shortcut Menu Bar](https://marketplace.visualstudio.com/items?itemName=jerrygoyal.shortcut-menu-bar) 的插件来实现添加按钮。然而它不支持自定义图标，这对于对美观度要求较高的我来说是个问题。
+ 现在我自己做了一个插件，不仅能自定义图标，还支持根据文件名决定是否显示按钮。


## Installation & Usage

1. Click the extension button on the left side of VSCode, search in the search box, and click `[install]`.
2. 在安装后的初次启动，请打开 `[扩展设置]`，按照 `Button Config` 项的介绍刷新一次。
3. 在 `Button Config` 项中点击 `[在 settings.json 中编辑]`，然后可以根据代码提示来设置自己的按钮。代码提示里写得足够详细，这里就不再赘述了。
4. 这个插件本身是不提供实质性功能的。默认配置里，有几个按钮调用的不是 VSCode 自带的命令，而是其他插件提供的命令，如果你没有安装的话是无法使用的。


## Description

1. The location of the plug-in code is（`Windows` 上的默认路径）：<br/>
   `C:/Users/<NAME>/.vscode/extensions/liangruliu.customize-toolbar-<VER>`
2. <span id="jump-en"/>
   我制作这个插件，一方面是需要这个功能，另一方面其实也是一个学习的过程，因为我既不太会 Node.js，也不太会 VSCode 插件开发。
   目前该插件的功能的代码实现逻辑很不好：我只会静态设置按钮，没找到动态设置按钮的方法，所以每次修改设置，其实是在通过文件读写修改源码的方式来修改功能。这也正是每次应用更改都需要重启两次的原因。
   我甚至认为这个程序有出错的可能，因此添加了手动刷新的功能。
   如果你有解决这个问题的思路，或者有什么建议，欢迎通过邮箱 <LiangruLiu@outlook.com> 与我联系。


**Enjoy!**



<br/>

-----
<!-- <p align="center"> Visual Studio Marketplace </p> -->
<div align=center> <a href="#jump-begin">
   <img src="https://liangruliu.github.io/images/vscodeExt/icon-small.png" width="32pt">
</a> </div>
