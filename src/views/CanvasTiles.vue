<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import { Tile as TileLayer } from "ol/layer";
import View from "ol/View";
import { OSM, TileDebug } from "ol/source";
export default {
  mounted() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new XYZ({
          source: new TileDebug(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
    });
  },
};
</script>

<style>
</style>