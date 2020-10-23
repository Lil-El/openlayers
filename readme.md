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

x
使用 canvas tile 查看地图的 tile 网格

### 9

点 feature 进行聚类

### 10

约束 extent，只在规定范围内查看；监听键盘事件，添加 zoom 控件

### 11

使用 postrender 和 vectorContext 来为 feature 做一个动画效果。feature 被添加到这个 layer 时做一个 flash 动画。

### 12

自定义 control，初始时地图倾斜，点击变正

### 13

自定义 interaction，实现元素可以拖动

### 14

自定义 Map（Web-Component）

### 15

自定义 Overview Map 控件

### 16

自定义 Polygon 样式

### 17

自定义 WMS，投影坐标转换

### 18

Drag, Rotate, and Zoom；拖放选择缩放级别

### 19

[Drag-and-Drop][3]：shift+鼠标，选取范围，并 fit 至该选中区域

### 20

Draw 绘制点、线、面、曲线、圆；shift 可以绘制曲线

### 21

Draw Shapes 绘制形状

### 22

Draw and Modify Features，绘制点、线、面等，并对绘制好的进行修改

### 23

Dynamic Data，动态、移动的数据

### 24

Earthquakes in KML，地震信息用 KML 格式文件

### 25

Earthquakes with custom symbols

### 26

Earthquake Heat map，地震信息的热力图

### 27

Earthquake Clusters，地震信息的点集群图

### 28

EPSG:4326

### 29

Extent Interaction，使用 shift 可以选择区域，并修改

### 30

Export PDF，生成 pdf

### 31

Freehand Drawing，任意绘制线、面

### 32

FullScreen，全屏

### 33

Filtering features with WebGL，使用 webGL 渲染 feature，通过年份过滤 feature

### 34

Flight Animation，航线动画

### 35

Geographic Editing，编辑 feature

### 36

GeoJSON

### 37

Hit Tolerance，点击容差：点击的位置加上容差；容差 = 10； 搜索 10 范围的 feature

### 38

High DPI WMTS

### 40

Image Reprojection

### 41

Immediate Rendering (Geographic)：点闪烁动画渲染

### 42

Layer Group

### 43

Layer Min/Max Resolution

### 44

Layer Spy：只展示鼠标周围的图层

### 45

Layer Swipe

### 46

Layer Zoom Limits：限制 zoom 级别，和 43 类似

### 47

LineString Arrows

### 48

Map Graticule：地图标线图层

### 49

Measure

### 50

Modify Features

### 51

Mouse Position：使用自带的对象，显示实时坐标

### 52

Moveend Event：监听 moveend 事件，去显示地图的范围的 4 个点的坐标

### 53

Navigation Controls：使用内置的 control，实现一键定位

### 54

Marker Animation：marker 跟随轨迹移动

### 55

Overview Map Control：显示小地图

### 56

Pinch Zoom：默认情况下，ol / interaction / PinchZoom 可以使地图处于分数缩放级别。相反，如果要将收缩缩放限制为整数缩放级别，则在构造视图时将 constrainResolution：true 设置为 true。

### 57

Reprojection with EPSG.io Search：搜索 proj4，并注册，展示

### 58

Reusable Source：更换 tile 的 source 的 url

### 59

Scale Line：显示比例尺

### 60

Select Features：点击、单击、hover 等选择 feature；使用 interactions

### 61

Select Features by Hover：hover 时选择 feature；监听 map 的 move 事件，获取 feature 信息

### 62

Select Features by multiple：选择多个 feature

### 63

Smoothing lines using Chaikins algorithm：绘制光滑曲线

### 64

Stamen Tiles：水彩

### 65

Snap Interaction：绘制点、线图形，并修改

### N

加载 WFS 服务，并通过 Filter 过滤 Features；将查询的 Features 展示在 map 中

## Demo

Image Filter：图像滤镜
KML：KML 格式
Layer Clipping：裁剪地图外形，展示形状内的地图
Limited Layer Extent：底图 1，然后选择展示不同国家的区域，该区域内是底图 2；（控制底图 2 的 extent）
Magnify：放大镜
Map Export：将底图导出为图片 png
Modify Features Test：修改 geojson 加载的图形的 feature
OpenStreetMap Reprojection with ScaleLine Control：OSM 使用新的坐标系，并显示 scale line 控件
Panning and page scrolling：此示例显示了页面滚动的常见行为：在触摸设备上，将一根手指放在地图上时，可以使用它来滚动页面。只有两个手指才能执行拖动平移。对于鼠标或触控板设备，平台修饰键（Cmd 或 Ctrl）将在地图上启用拖动平移，否则页面将滚动。
Sea Level：通过 select 去设置海平面的高度，并在地图上显示淹没的区域
Semi-Transparent Layer：使用 css filter，将 layer 变为黑白色
Shaded Relief：使用 raster 栅格 source，修改地图太阳的位置，模拟地图的阴影
Shared Views：两个地图使用同一个 View 对象，实现两个地图联动
Single Image WMS：使用 WMS 服务
Single Image WMS with Proj4js：WMS 服务，注册 projection
Street Labels：让道路标签，沿着街道的方向展示

> 这些例子暂时用不到，就不写了

- [CartoDB source example][1]：使用 CartoDB 加载、配置地图
- [Color Manipulation][2]：raster source 操纵地图颜色

[1]: https://openlayers.org/en/latest/examples/cartodb.html
[2]: https://openlayers.org/en/latest/examples/color-manipulation.html
[3]: https://openlayers.org/en/latest/examples/drag-and-drop-image-vector.html
