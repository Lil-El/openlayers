<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <span>Shit + mouse</span>
      <div @click="handle('None')">None</div>
      <div @click="handle('Point')">Point</div>
      <div @click="handle('LineString')">LineString</div>
      <div @click="handle('Circle')">Circle</div>
      <div @click="handle('Polygon')">Polygon</div>
    </tool>
  </div>
</template>

<script>
import Draw from "ol/interaction/Draw";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    this.source = new VectorSource({ wrapX: false });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.source,
        }),
      ],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });
  },
  methods: {
    handle(type) {
      this.map.removeInteraction(this.draw);
      this.addInteraction(type);
    },
    addInteraction(typeSelect) {
      var value = typeSelect;
      if (value !== "None") {
        this.draw = new Draw({
          source: this.source,
          type: typeSelect,
        });
        this.map.addInteraction(this.draw);
      }
    },
  },
};
</script>

<style>
</style>