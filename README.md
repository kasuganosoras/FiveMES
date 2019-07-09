# FiveMES
A FiveM external speedometer plugin

这是一个 FiveM 外置仪表插件，可以用于多人联机使用。

## 所需设备 & 条件

- FiveM 服务器 x1
- 网站服务器 x1（可以和 FiveM 服务端搭在同一台机）
- 手机 x1，用于充当仪表盘

## 安装服务端

网站服务器需要安装 PHP 环境，以及需要安装 Swoole 扩展，推荐 OneinStack：https://oneinstack.com/

安装好之后，将本项目 clone 到本地，然后使用命令行运行 `server/server.php` ，建议使用 screen 守护进程。

```
git clone https://github.com/kasuganosoras/FiveMES
cd FiveMES/server/
screen -S FiveMES
php server.php
```

## 安装网页端

将 `upload` 文件夹里的所有内容上传到你的网站根目录

修改 `fivemes/index.html` ，找到大约 `34` 行到 `38` 行：

```
var use_SSL = false;
var ws_host = "example.com";
var ws_port = 9230;
```

修改 ws_host 为你的服务端 IP 地址或域名。

> 如果你的网站是 https 的，你还需要给服务端做一下 Nginx 反向代理，为服务端套上 https，然后修改 use_SSL 为 true。

## 安装插件端

首先将 `plugin` 文件夹里的所有内容上传到你的 FiveM 服务器的 `resource` 文件夹

接着修改 `resource/FiveMES/html/js/main.js`，将 ws_host 修改为你的服务端 IP 地址（运行 PHP 的那个）。

最后修改你的 server.cfg，增加一行：

```
start FiveMES
```

重启服务器或者输入 `start FiveMES`。

## 使用方法

进入游戏后，按 `↑` 查看玩家编号，如果你的服务器没这个插件的话，你头顶上应该也能看到一个数字：

```
[12] Akkariin Meiko
```

其中 12 就是你的游戏编号，记下它。

然后手机打开 `http://你的网站/fivemes/` ，进去后会要求你输入 ID，把刚刚的编号输入进去，点击确定即可连接。

建议打开手机自动旋转功能，然后横屏效果更佳；同时建议插着电源并将屏幕休眠时间改为永不休眠。

## 使用效果

截图啥的不得劲，我丢个视频链接吧：

https://www.bilibili.com/video/av58089964/

## 开源协议

本项目使用 MIT 协议开源
