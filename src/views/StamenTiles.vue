<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import Stamen from "ol/source/Stamen";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
export default {
  mounted() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: "watercolor",
          }),
        }),
        new TileLayer({
          source: new Stamen({
            layer: "terrain-labels",
          }),
        }),
      ],
      target: "map",
      view: new View({
        center: fromLonLat([-122.416667, 37.783333]),
        zoom: 12,
      }),
    });
  },
};
</script>

<style>
</style>