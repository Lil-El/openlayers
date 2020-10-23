<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <span id="status"></span>
      </div>
    </tool>
  </div>
</template>

<script>
import Fill from "ol/style/Fill";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var highlightStyle = new Style({
      fill: new Fill({
        color: "rgba(255,255,255,0.7)",
      }),
      stroke: new Stroke({
        color: "red",
        width: 3,
      }),
    });

    var vector = new VectorLayer({
      source: new VectorSource({
        url: "./countries.geojson",
        format: new GeoJSON(),
      }),
    });

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var selected = null;
    var status = document.getElementById("status");

    map.on("pointermove", function (e) {
      if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
      }

      map.forEachFeatureAtPixel(e.pixel, function (f) {
        selected = f;
        f.setStyle(highlightStyle);
        return true;
      });

      if (selected) {
        status.innerHTML = "&nbsp;Hovering: " + selected.get("name");
      } else {
        status.innerHTML = "&nbsp;";
      }
    });
  },
};
</script>

<style>
</style>