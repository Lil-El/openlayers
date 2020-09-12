# OpenLayers

## CODE
- 如何显示图层，tile
  
  TODO:
- 事件监听
  继承自顶层父级Target类，Target简易实现了基于*Dom2级事件*标准的EventTarget接口；
  
  设计模式：发布订阅模型；

  prop：dispatching，pendingRemovals，listeners

  mth：addEventListener，removeEventListener，dispatchEvent
  >在派发事件，执行监听器函数，判断dispatching[ eventType ]，如果为false就设置dp的type 和 pr的type 0；
  >每执行一个listener，dp就加一，执行完一个就减一；**如果listener当中调用了removeEventListener，并不会立即删除该listener，而是将其置为void，同时pr加一；当listeners都执行完，再去清除**
  >当listeners执行完毕后，如果dp的type=0；就清除listeners中void的监听器
//TODO: 阅读某一个具体组件（Draw）的事件监听的方式（是否采用上述方法）

## DEMO

### 3
请求地理数据，通过返回结果的数据，进行格式化。
根据样式字段，选择对应的样式。
在鼠标move的时候，判断当前位置有多少个图层，并显示对应所有的图层的名字字段

### 5
当地图宽度小于600时，设置地图的attribution为可伸缩的

### 6
在zoom到达5时，不再加载新的tile，而是显示zoom为5的tile的放大图像