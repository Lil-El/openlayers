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
import { OverviewMap, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    var source = new OSM();
    var overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
    });

    var map = new Map({
      controls: defaultControls().extend([overviewMapControl]),
      layers: [
        new TileLayer({
          source: source,
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
</style>