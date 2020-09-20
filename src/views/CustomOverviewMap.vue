<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from "ol/interaction";
import { OverviewMap, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    var myOverviewMapControl = new OverviewMap({
      className: "ol-overviewmap ol-custom-overviewmap",
      layers: [
        new TileLayer({
          source: new OSM(),
          // source: new OSM({
          //   url:
          //     "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" +
          //     "?apikey=Your API key from http://www.thunderforest.com/docs/apikeys/ here",
          // }),
        }),
      ],
      rotateWithView: true, // Overview 是否随视图旋转
      collapseLabel: "\u00BB",
      label: "\u00AB",
      collapsed: false,
    });
    new Map({
      controls: defaultControls().extend([myOverviewMapControl]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [500000, 6000000],
        zoom: 7,
      }),
    });
  },
};
</script>

<style>
.ol-custom-overviewmap,
.ol-custom-overviewmap.ol-uncollapsible {
  bottom: auto;
  left: auto;
  right: 0;
  top: 0;
}

.ol-custom-overviewmap:not(.ol-collapsed) {
  border: 1px solid black;
}

.ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 300px;
}

.ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}

.ol-custom-overviewmap:not(.ol-collapsed) button {
  bottom: auto;
  left: auto;
  right: 1px;
  top: 1px;
}

.ol-rotate {
  top: 170px;
  right: 0;
}
</style>