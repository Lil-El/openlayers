<template>
  <div class="wrap">
    <div id="map1"></div>
    <div id="map2"></div>
  </div>
</template>

<script>
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
    return { map1: null, map2: null };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map1 = new Map({
        controls: defaultControls().extend([
          new OverviewMap(),
          new ScaleLine(),
        ]),
        target: "map1",
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
      this.map2 = new Map({
        controls: defaultControls().extend([
          new OverviewMap(),
          new ScaleLine(),
        ]),
        target: "map2",
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
.wrap {
  display: flex;
  div {
    border: 1px solid black;
  }
}
#map1 {
  flex: 1;
  width: 50%;
  height: 100vh;
}
#map2 {
  flex: 1;
  width: 50%;
  height: 100vh;
}
</style>