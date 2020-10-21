<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div @click="show">show layer</div>
    </tool>
  </div>
</template>

<script>
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { OSM, TileJSON, XYZ } from "ol/source";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";
export default {
  data() {
    return {};
  },
  mounted() {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({ source: new OSM() }),
        new LayerGroup({
          layers: [
            new TileLayer({
              source: new XYZ({
                url: `http://t${Math.round(
                  Math.random() * 7
                )}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d`,
              }),
            }),
            new TileLayer({
              source: new XYZ({
                url: `http://t${Math.round(
                  Math.random() * 7
                )}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d`,
              }),
            }),
          ],
        }),
      ],
      view: new View({ center: fromLonLat([37.4057, 8.81566]), zoom: 4 }),
    });
  },
  methods: {
    show() {
      console.log(this.map.getLayers());
    },
  },
};
</script>

<style>
</style>