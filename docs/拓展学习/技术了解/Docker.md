## 概述

Docker 是基于 Go 语言开发的一个开源应用容器引擎。它和虚拟机一样，就是搭建在真实系统上的模拟环境，但是它比虚拟机更加灵活，更加轻量，占用的系统资源更少，可移植性强。

实现：是对进程进行一个隔离，使其接触到的资源都是虚拟的。

三个基本概念：

- 镜像：静态定义，就是一些环境的映射，如 node 环境，系统的文件系统
- 容器：就是镜像的动态概念，比如创建了一个 node 容器打包对应的项目，容器可以被创建，启动，停止，删除等操作
- 仓库：用来保存镜像，相当于控制代码的代码仓库

## 应用场景

- web 应用的自动化打包部署
- 自动化测试和持续集成，发布

## 镜像加载原理

UnionFS(联合文件系统)：Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像，在其之上叠加不同的文件系统，形成不同的镜像

当下载镜像时，如果发现有已存在的文件系统，就不会再重复下载

## 指令

```bash
systemctl start docker
systemctl stop docker
systemctl restart docker

systemctl enable docker //开机启动docker
```

### 镜像相关

#### 查看本地镜像

```bash
docker images
```

#### 查看远程相关镜像

```bash
docker search xxx
```

#### 拉取远程镜像，默认为最新

```bash
docker pull xxx
```

#### 删除本地镜像

```bash
docker rmi imageId
```

### 容器相关

#### 查看容器

```bash
docker ps 正在运行的容器

docker ps -a 历史容器

docker ps -l 最近容器
```

#### 启动容器

```bash
docker run -it --name  xxx  imageName:tag /bin/bash

-d表示后台运行容器，不会立即停止

docker run -it  -d  --name xxx imageName:tag /bin/bash

docker run -it -p 8888:8080 tomcat  指定外部端口访问

docker run -it -P tomcat 随机分配外部端口
```

#### 进入容器

```bash
docker exec -it containerId /bin/bash
```

或者

```bash
docker attach containerId
```

#### 从容器中复制出文件

```bash
docker attach containerId
cd /home
touch index.js
exit

docker cp containerId:/home/index.js
```

#### 删除容器

```bash
docker rm containerId
```

#### 删除状态为退出的容器

```bash
sudo docker rm `docker ps -a|grep Exited|awk '{print $1}'`
```

#### 删除所有容器

```bash
docker rm \$(docker ps -aq\)`
```

#### 查看容器详情

```bash
docker inspect containerId 或 containerName
```

#### 停止容器

```bash
docker stop containerId 或 containerName
```

#### 容器生成镜像

```bash
docker commit -a 'dilomen' -m 'my centos' cb32ad2d8725 mycentos:1.0
```

#### 使用 Dockfile 构建镜像

```bash
docker build -t image_project:version .
```

## 数据卷

将容器内的数据同步到宿主环境中，就不用担心容器被删的同时，数据丢失。同时可可以实现容器间数据共享

将宿主环境的/home/ceshi 和容器环境的/home 进行数据映射同步  
-v：主机和容器的目录映射关系，":"前为主机目录，之后为容器目录

```bash
docker run -it -d -v /home/ceshi:/home centos /bin/bash
```

获取容器/镜像的元数据

```bash
docker inspect container_id
```

查看映射关系

```json
"Mounts": [
    {
        "Type": "bind",
        "Source": "/home/ceshi", // 映射的宿主环境文件
        "Destination": "/home", // 当前容器文件
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
]
```

## Centos 安装 docker

1.yum-utils 提供 yum-config-manager 功能，另外两个是 devicemapper 驱动依赖的

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

2.设置 yum 源

```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

3.查看 docker 所有版本

```bash
yum list docker-ce --showduplicates | sort -r
```

4.安装对应版本的 docker ，默认为最新稳定版

```bash
yum install -y docker-ce-17.12.0.ce
```

5.设置开机启动并立刻启动 docker

```bash
systemctl enable docker
```

```bash
systemctl start docker
```

6.查看版本，查看是否安装成功

```bash
docker -v
```

添加国内 docker 加速器，这里使用阿里云，创建一个 daemin.json，然后重启

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'

{
  "registry-mirrors": ["https://cgm49sgy.mirror.aliyuncs.com"]
}
EOF

sudo systemctl daemon-reload
sudo systemctl restart docker
```

## docker 安装 nginx

下载镜像

```bash
docker pull nginx
```

运行、映射端口，外网就可以访问了

```bash
docker run -d --name nginx01 -p 8081:80 nginx
```

进入容器

```bash
docker exec -it nginx01 /bin/bash
```

查看容器内 nginx 的位置

```bash
whereis nginx

// nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
```

## mysql 挂载到本地

-e 配置信息  
-v 挂载 宿主机地址:容器地址 这里的宿主机地址/home 只是为了方便，应该放在更合理的位置

```bash
docker run -d -p 33060:3306 \
-v /home/mysql/conf:/etc/mysql \
-v /home/mysql/logs:/var/log/mysql \
-v /home/mysql/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root \
--name mysql01 mysql
```

:::tip 防火墙的限制

##### 开放端口

```bash
systemctl status firewalld
```

```bash
firewall-cmd --zone=public --add-port=3306/tcp -permanent
```

```bash
firewall-cmd --reload
```

当然不考虑安全性的话，也可以直接关闭防火墙

##### 关闭防火墙

```bash
sudo systemctl stop firewalld
```

:::

## 多个 mysql 实现数据共享

```bash
docker run -d -p 3310:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

docker run -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 volumes-from mysql01 mysql:5.7
```

mysql01 和 mysql02 的数据就同步了，但是是相互复制的个体，即一个地方删除，另一个不会删除

## 容器间的访问

如果一个服务需要访问如 mysql 容器，或者 redis 容器，那么就要获取容器的 ip，而不是使用 localhost 作为 host 地址  
以 mysql 为例  
1、进入 mysql 容器，然后使用 ifconfig 指令获取 ip
如果没有 ifconfig 指令，就进行以下安装

```bash
1、使用命令：apt-get update
2、apt install net-tools
3、apt install iputil-ping
```

2、然后将这个 ip 作为服务连接的 host 即可

!['docker_ip'](/拓展学习/docker_ip.png)
