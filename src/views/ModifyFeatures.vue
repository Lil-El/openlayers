<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import {
  Modify,
  Select,
  defaults as defaultInteractions,
} from "ol/interaction";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var vector = new VectorLayer({
      source: new VectorSource({
        url: "./countries.geojson",
        format: new GeoJSON(),
        wrapX: false,
      }),
    });

    var select = new Select({
      wrapX: false,
    });

    var modify = new Modify({
      features: select.getFeatures(),
    });

    var map = new Map({
      interactions: defaultInteractions().extend([select, modify]),
      layers: [raster, vector],
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