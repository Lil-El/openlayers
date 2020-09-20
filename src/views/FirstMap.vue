<template>
  <div id="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import Tile from "ol/layer/Tile";
import {
  OverviewMap,
  ScaleLine,
  defaults as defaultControls,
} from "ol/control";
export default {
  data() {
    return { map: null };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        controls: defaultControls().extend([
          new OverviewMap(),
          new ScaleLine(),
        ]),
        target: "map",
        view: new View({
          center: [0, 0],
          zoom: 12,
        }),
        layers: [
          new Tile({
            source: new OSM(),
          }),
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  flex: 1;
  height: 100vh;
}
</style>