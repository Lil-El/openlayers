<template>
  <div class="wrap"><div id="map"></div></div>
</template>

<script>
import ExtentInteraction from "ol/interaction/Extent";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { shiftKeyOnly } from "ol/events/condition";
export default {
  mounted() {
    var vectorSource = new VectorSource({
      url: "./countries.geojson",
      format: new GeoJSON(),
    });

    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var extent = new ExtentInteraction({ condition: shiftKeyOnly });
    map.addInteraction(extent);
  },
};
</script>

<style>
</style>