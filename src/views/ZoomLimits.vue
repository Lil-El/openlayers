<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileJSON from "ol/source/TileJSON";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
export default {
  mounted() {
    var map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          maxZoom: 8, // 8以下可见
          source: new OSM(),
        }),
        new TileLayer({
          minZoom: 8,
          source: new XYZ({
            url: `http://t${Math.round(
              Math.random() * 7
            )}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d`,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-112.18688965, 36.057944835]),
        zoom: 10,
        maxZoom: 18,
        constrainOnlyCenter: true,
      }),
    });
  },
};
</script>

<style>
</style>