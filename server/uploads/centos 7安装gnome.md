　　GNOME是一套纯粹自由的计算机软件，运行在操作系统上，提供图形桌面环境。

　　GNOME 包含了 Panel （用来启动此程式和显示目前的状态）、桌面 （应用程式和资料放置的地方）及一系列的标准桌面工具和应用程式，并且能让各个应用程式都能正常地运作。

　　GNOME是Linux操作系统上最常用的图形桌面环境之一。

​       VNC基本上是由两部分组成：一部分是客户端的应用程序(vncviewer)；另外一部分是服务器端的应用程序(vncserver)。VNC的基本运行原理和一些Windows下的远程控制软件很相像。VNC的服务器端应用程序在UNIX和Linux操作系统中适应性很强，图形用户界面十分友好，看上去和Windows下的软件界面也很类似。在任何安装了客户端的应用程序(vncviewer)的Linux平台的计算机都能十分方便地和安装了服务器端的应用程序(vncserver)的计算机相互连接。另外，服务器端 (vncserver)还内建了Java Web接口，这样用户通过服务器端对其他计算机的操作就能通过Netscape显示出来了，这样的操作过程和显示方式比较直观方便。

　　在CentOS7上面安装步骤如下

1. 安装宝塔面板（方便在接下来步骤中进行配置文档的编辑和监控系统）    

   ```shell
   yum install -y wget && wget -O install.sh http://download.bt.cn/install/install.sh && sh install.sh
   ```

2. 安装GNOME 

   ```shell
   yum groupinstall "GNOME Desktop" "Graphical Administration Tools"
   ```

![ ](C:\Users\Administrator\Desktop\7.png)

安装包大概在800M左右 ，选择y进行安装。	

出现complete则表示安装成功

启动GNOME桌面

```shell
startx
```

3. 安装VNCServer

```shell
安装
#yum -y install tigervnc-server
配置
#cp /lib/systemd/system/vncserver@.service /etc/systemd/system/vncserver@:1.service
设置VNC密码
#vncpasswd
重启systemd
#systemctl daemon-reload
设置永久开启VNC服务
#systemctl enable vncserver@:1.service
启动VNC服务
#systemctl start vncserver@:1.service
如遇报错：
Job for vncserver@:1.service failed because the control process exited with error code. See "systemctl status vncserver@:1.service" and "journalctl -xe" for details.
编辑/etc/systemd/system/vncserver@:1.service配置文件：
将Type=forking改为Type=simple
重新启动VNC服务
#systemctl restart vncserver@:1.service

查看VNC服务状态
#systemctl status vncserver@:1.service
如有Activie:failed则表示启动失败
编辑/etc/systemd/system/vncserver@:1.service配置文件：
将里面所有的<USER>替换为当前用户名(大致有两处)，如root；另，如果是root用户，应将PIDFile的/home/root改为/root
重新启动VNC服务
这里可能会遇到错误，当执行start vncserver@:1.service时可能提示如下错误。
Job for vncserver@:1.service failed because the control process exited with error code. See 
"systemctl status vncserver@:1.service" and "journalctl -xe" for details.
解决办法
删除/tmp/.X11-unix/ 目录，再启用一次即可
# \rm -R /tmp/.X11-unix/
#systemctl restart vncserver@:1.service

```

4. VNC客户端连接

> - VNC远程服务端需开放5901端口
> - 客户端安装VNC Viewer或TigerVNC
> - 连接地址填写ip:5901
> - 然后输入所设置的VNC密码

end！！！！