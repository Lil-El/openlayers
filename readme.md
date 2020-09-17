# OpenLayers

## CODE

- 如何显示图层，tile

  TODO: PluggableMap：https://blog.csdn.net/u013240519/article/details/104997512?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param

- 事件监听
  继承自顶层父级 Target 类，Target 简易实现了基于*Dom2 级事件*标准的 EventTarget 接口；

  设计模式：发布订阅模型；

  prop：dispatching，pendingRemovals，listeners

  mth：addEventListener，removeEventListener，dispatchEvent

  > 在派发事件，执行监听器函数，判断 dispatching[ eventType ]，如果为 false 就设置 dp 的 type 和 pr 的 type 0；
  > 每执行一个 listener，dp 就加一，执行完一个就减一；**如果 listener 当中调用了 removeEventListener，并不会立即删除该 listener，而是将其置为 void，同时 pr 加一；当 listeners 都执行完，再去清除**
  > 当 listeners 执行完毕后，如果 dp 的 type=0；就清除 listeners 中 void 的监听器

  interaction/Draw 的 on 方法也是对事件进行监听，drawstart 等事件；底层也是交由 Target 类来处理

## DEMO

### 3

请求地理数据，通过返回结果的数据，进行格式化。
根据样式字段，选择对应的样式。
在鼠标 move 的时候，判断当前位置有多少个图层，并显示对应所有的图层的名字字段

### 5

当地图宽度小于 600 时，设置地图的 attribution 为可伸缩的

### 6

在 zoom 到达 5 时，不再加载新的 tile，而是显示 zoom 为 5 的 tile 的放大图像

### 7

框选地图，查看选中的城市的名称，并高亮显示这些城市 （如果地图旋转了，也要进行处理）

### 8

使用 canvas tile 查看地图的 tile 网格

### 9

点 feature 进行聚类

### 10

约束 extent，只在规定范围内查看；监听键盘事件，添加 zoom 控件

### 11

使用 postrender 和 vectorContext 来为 feature 做一个动画效果。feature 被添加到这个 layer 时做一个 flash 动画。

### 12

TODO: Custom Controls

### N

加载 WFS 服务，并通过 Filter 过滤 Features；将查询的 Features 展示在 map 中

## Demo

> 这些例子暂时用不到，就不写了

- [CartoDB source example][1]：使用 CartoDB 加载、配置地图
- [Color Manipulation][2]：raster source 操纵地图颜色

[1]: https://openlayers.org/en/latest/examples/cartodb.html
[2]: https://openlayers.org/en/latest/examples/color-manipulation.html
