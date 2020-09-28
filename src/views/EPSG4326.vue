<template>
  <div class="wrap"><div id="map"></div></div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import { ScaleLine, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    var layers = [
      new TileLayer({
        source: new TileWMS({
          url: "https://ahocevar.com/geoserver/wms",
          params: {
            LAYERS: "ne:NE1_HR_LC_SR_W_DR",
            TILED: true,
          },
        }),
      }),
    ];

    var map = new Map({
      controls: defaultControls().extend([
        new ScaleLine({
          units: "degrees",
        }),
      ]),
      layers: layers,
      target: "map",
      view: new View({
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 2,
      }),
    });
  },
};
</script>

<style>
</style>