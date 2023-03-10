# 乐队歌迷管理系统


[![build status](https://github.com/jscslld/db_course_design/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/jscslld/db_course_design/actions)
[![contributors](https://img.shields.io/github/contributors/jscslld/db_course_design?color=9ea)](https://github.com/jscslld/db_course_design/graphs/contributors)
[![commits](https://img.shields.io/github/commit-activity/m/jscslld/db_course_design?color=3af)](https://github.com/jscslld/db_course_design/commits)
[![issues](https://img.shields.io/github/issues/jscslld/db_course_design?color=9cc)](https://github.com/jscslld/db_course_design/issues)
![python version](https://img.shields.io/badge/JDK-17+-orange.svg)
![node.js version](https://img.shields.io/badge/nodejs-18+-orange.svg)


## 业务场景

某个数据库记录乐队、乐队成员、专辑、歌曲、演唱会和歌迷的信息：

每个乐队包括名称、成立时间等，每个乐队有一个队长；

乐队每位成员包括名字、性别、年龄、乐队分工等，每个成员有加入乐队的时间，（如果中途离开）有离开乐队的时间；

专辑包括专辑名称、发表时间、表演乐队、发行公司等；

歌曲包括歌曲名称、创作者姓名、所在专辑等；

演唱会包括举办时间、举办地点、演出乐队等；

歌迷包括姓名、性别、年龄、职业等。

规定每个乐队只有一名队长，每个乐队成员同一时期只能加入一个乐队，一个乐队发行多张专辑，专辑中含有多首歌曲，每场演唱会都有表演歌单，乐队演唱多首歌曲，同一首歌可以被多个乐队演唱，歌迷可以喜欢多个乐队、专辑及歌曲，歌迷可参与多场演唱会。

根据此业务场景建立相应的数据库系统与应用系统。

## 开发环境

本系统基于前后端分离的思路进行开发，前端基于React开发，后端开发语言为Java 17，使用Spring Boot 2.7与Mybatis-plus框架。具体的开发工具、开发框架和系统依赖见下表。

<img src="./README.assets/image-20230110213141787.png" alt="image-20230110213141787" style="zoom:67%;" />

## 系统功能清单

系统分为管理端、乐队端和歌迷端。管理端、乐队端和歌迷端均通过统一身份鉴别进行登录与权限分配，系统的登录用户名和角色均为直接使用MySQL自带的用户机制和角色机制，而不是利用基本表做的逻辑映射，即当用户在本系统登录时，系统会将当前会话的数据源切换到用户对应的同名MySQL用户下。利用动态数据源和上文提到的视图机制可以最大限度地保证数据的安全。

管理端提供乐队管理与歌迷管理两大功能，其主要作用是将应用程序与MySQL的角色、用户之间打通。管理员可以利用管理端轻松的创建和删除乐队和歌迷账号。

乐队端分为乐队基本信息、成员管理、歌曲管理、专辑管理、演唱会管理、乐队粉丝列表等功能。乐队管理员利用分配到的乐队账号登录到平台后，可以方便地查看并维护自己乐队的相关信息。

歌迷端分为歌迷基本信息、乐队信息、歌曲信息、专辑信息和演唱会信息五大板块。歌迷可通过本系统查看自己喜欢的乐队、歌曲、专辑列表，暂未喜欢的乐队、歌曲、专辑列表和全部的乐队、歌曲、专辑列表，并可以喜欢或取消喜欢乐队、歌曲和专辑，报名或取消报名演唱会。系统还为歌迷提供了查看乐队、歌曲、专辑、演唱会具体详情的功能。

<img src="./README.assets/image-20230110213258106.png" alt="image-20230110213258106" style="zoom:67%;" />

## 部分页面截图

### 登陆页面

![image-20230110213515169](./README.assets/image-20230110213515169.png)

### 管理员端

<img src="./README.assets/image-20230110213613244.png" alt="image-20230110213613244"/>

![image-20230110213844816](./README.assets/image-20230110213844816.png)

### 乐队端

![image-20230110213915488](./README.assets/image-20230110213915488.png)

![image-20230110213931757](./README.assets/image-20230110213931757.png)

![image140](./README.assets/image140.png)

![image-20230110214035370](./README.assets/image-20230110214035370.png)

![image-20230110214102071](./README.assets/image-20230110214102071.png)

### 歌迷端

![image186](./README.assets/image186.png)

![image-20230110214148011](./README.assets/image-20230110214148011.png)

![image-20230110214209392](./README.assets/image-20230110214209392.png)

## 部署方法

### 系统环境

本教程使用Ubuntu 22.04 LTS进行演示安装，安装的docker版本为20.10.22，docker compose版本为2.14.2。

### 安装docker

#### 安装相关依赖

```bash
sudo apt-get update
sudo apt-get install \
   ca-certificates \
   curl \
   gnupg \
   lsb-release
```

#### 添加GPG密钥

```bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

#### 建立docker资源库

```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```

#### 安装docker

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

#### 启动docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

#### 验证安装

输入`sudo docker info`，出现类似下图的输出表示安装成功。

![image-20230101161845885](./README.assets/image-20230101161845885.png)

### 安装docker compose

```bash
sudo curl -sL https://get.daocloud.io/docker/compose/releases/download/v2.14.2/docker-compose-`uname -s`-`uname -m`  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 部署系统

#### 前期准备

将代码上传至服务器，并进入代码文件夹内

#### 部署启动系统

```bash
docker-compose up -d
```

出现如下图所示的输出表示正在进行部署

![image-20230101163450540](./README.assets/image-20230101163450540.png)

出现如下图所示的输出后表示部署成功

<img src="./README.assets/image-20230101163917329.png" alt="image-20230101163917329"  />

### 初始化系统

在浏览器中输入`http://127.0.0.1:8088/user/login`即可进入系统。

![image-20230101164252794](./README.assets/image-20230101164252794.png)

输入用户名admin，密码123456，选择管理员身份登陆系统。

![image-20230101164229204](./README.assets/image-20230101164229204.png)

点击创建登录用户，输入待初始化的密码后，即可创建对应的乐队登录账号和歌迷登陆账号。

![image-20230101164400655](./README.assets/image-20230101164400655.png)

