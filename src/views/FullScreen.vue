<template>
  <div id="fullscreenXX" class="fullscreen">
    <div id="map" class="map"></div>
    <div class="sidepanel">
      <span class="sidepanel-title">Side Panel</span>
    </div>
  </div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from "ol/interaction";
import { FullScreen, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    var view = new View({
      center: [-9101767, 2822912],
      rotation: -Math.PI / 8,
      zoom: 14,
    });

    var map = new Map({
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]), // 添加拖拽旋转的交互
      controls: defaultControls().extend([
        new FullScreen({
          source: "fullscreenXX", // 设置全屏的容器；不设置默认以map为全屏
        }),
      ]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: view,
    });
  },
};
</script>
<style lang="scss" scoped>
#map {
  width: 80%;
  height: 100vh;
  float: left;
}
::v-deep .ol-rotate {
  top: 3em;
}
.fullscreen:-webkit-full-screen {
  height: 100%;
  margin: 0;
}
.fullscreen:-ms-fullscreen {
  height: 100%;
}

.fullscreen:fullscreen {
  height: 100%;
}

.fullscreen {
  margin-bottom: 10px;
  width: 100%;
}
.sidepanel {
  background: #1f6b75;
  width: 20%;
  height: 100%;
  float: left;
}

.sidepanel-title {
  width: 100%;
  font-size: 3em;
  color: #ffffff;
  display: block;
  text-align: center;
}
</style>