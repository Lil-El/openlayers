<template>
  <div class="wrap">
    <div id="map"></div>
    <tool
      ><select id="type">
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
        <option value="None">None</option>
      </select></tool
    >
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
    var raster = new TileLayer({
      source: new OSM(),
    });

    var source = new VectorSource({ wrapX: false });

    var vector = new VectorLayer({
      source: source,
    });

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    var typeSelect = document.getElementById("type");

    var draw;
    function addInteraction() {
      var value = typeSelect.value;
      if (value !== "None") {
        draw = new Draw({
          source: source,
          type: typeSelect.value,
          freehand: true,
        });
        map.addInteraction(draw);
      }
    }

    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
  },
};
</script>

<style>
</style>