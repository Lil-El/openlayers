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
import { PinchZoom, defaults as defaultInteractions } from "ol/interaction";
export default {
  mounted() {
    var map = new Map({
      interactions: defaultInteractions().extend([new PinchZoom()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
        constrainResolution: true,
      }),
    });
  },
};
</script>

<style>
</style>