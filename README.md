## 前言
本人一个前端初级者，学了 Vue，感觉学习了一门技术后总该写点做点什么，才能在实践中发现问题解决问题，才有更多收获。

我一直很喜欢 简书 上的那个写作页面。就打算用 Vue 来写一个属于自己的写作管理平台。

![image.png](http://www.laoergege.cn//images/6JHp_Vpq1uML4MD6dHibCQlq.PNG)

虽然已有很多开源的博客项目或写作平台。但就是**Just Fun！**

## 已完成
* 整体架构（左侧为侧边导航栏，中间为 list列表管理组件，右边为 主体内容）

![image.png](http://www.laoergege.cn//images/x3rJZFVtDl0gtE-xS2W2wr-L.PNG)
* 响应不同设备
tablet:

![image.png](http://www.laoergege.cn//images/jI21IxZtDLTvQVDXYIkiTuLi.PNG)

mobile:

![image.png](http://www.laoergege.cn//images/U_8r3p3JqHaqZW5KjIFB7VSQ.PNG)

![image.png](http://www.laoergege.cn//images/wfJ3Pu0IxcRKgoTuILW90OOU.PNG)

![image.png](http://www.laoergege.cn//images/-Ex4JuvmpEqgdbp_lje8Q8Hy.PNG)

* 文集管理组件（实现了对文集的管理操作）

![image.png](http://www.laoergege.cn//images/BEwnrz49LDOM5TaA0mqJMekR.PNG)

* 文章管理组件（实现了对文章的管理操作）


![image.png](http://www.laoergege.cn//images/rBXF2Gc_uN00mJnnMD7UIJuQ.PNG)

* Editor 组件（仿简书的 markdown 编辑器）

![image.png](http://www.laoergege.cn//images/S1MzGn8-Gz7kCvT-SqikQ-yi.PNG)

该 editor 组件实现了 以下功能
- 图片拖动上传
- 撤销与恢复
- 保存与发布
- 自动保存
- 分屏预览或全屏预览

## 目标
目前只基本实现 文集模块，但 editor 组件并未支持更多的快捷键。
未实现模块：  
消息模块、标签模块、设置模块

接下来目标：  
实现 客户端博客[项目地址](!https://github.com/laoergege/myBlog)
