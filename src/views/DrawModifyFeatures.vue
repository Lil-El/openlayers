<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <span>shift+mouse</span>
      <div @click="handle('None')">None</div>
      <div @click="handle('Point')">Point</div>
      <div @click="handle('LineString')">LineString</div>
      <div @click="handle('Polygon')">Polygon</div>
      <div @click="handle('Circle')">Circle</div>
    </Tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Draw, Modify, Snap } from "ol/interaction";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    this.source = new VectorSource();
    var vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });

    this.map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    var modify = new Modify({ source: this.source });
    this.map.addInteraction(modify);
  },
  methods: {
    handle(type) {
      this.addInteractions(type);
    },
    addInteractions(typeSelect) {
      this.draw = new Draw({
        source: this.source,
        type: typeSelect,
      });
      this.map.addInteraction(this.draw);
      this.snap = new Snap({ source: this.source });
      this.map.addInteraction(this.snap);
    },
  },
};
</script>

<style>
</style>