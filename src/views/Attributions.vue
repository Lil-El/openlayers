<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Attribution, defaults as defaultControls } from "ol/control";
export default {
  mounted() {
    let attr = new Attribution({
      collapsible: false,
    });
    this.map = new Map({
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 2,
      }),
      controls: defaultControls({ attribution: false }).extend([attr]), // [attr] 也可以
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
    window.addEventListener("resize", () => {
      console.log("resize");
      let small = this.map.getSize()[0] < 600;
      attr.setCollapsible(small);
      attr.setCollapsed(small);
    });
  },
};
</script>

<style>
</style>