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
import { ScaleLine, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    // https://openlayers.org/en/latest/examples/scale-line.html
    let control = new ScaleLine({
      units: "degrees",
      /**
       * units:
       * degrees
       * imperial
       * us
       * nautical
       * metric
       */
    });
    var map = new Map({
      controls: defaultControls().extend([control]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  },
};
</script>

<style>
</style>