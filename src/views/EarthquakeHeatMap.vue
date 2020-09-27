<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        radius
        <input id="radius" type="range" min="1" max="50" step="1" value="5" />
      </div>
      <div>
        blur
        <input id="blur" type="range" min="1" max="50" step="1" value="15" />
      </div>
    </tool>
  </div>
</template>

<script>
import KML from "ol/format/KML";
import Map from "ol/Map";
import Stamen from "ol/source/Stamen";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Heatmap as HeatmapLayer, Tile as TileLayer } from "ol/layer";
export default {
  mounted() {
    let blur = document.getElementById("blur");
    let radius = document.getElementById("radius");
    var vector = new HeatmapLayer({
      source: new VectorSource({
        url: "./2012_Earthquakes_Mag5.kml",
        format: new KML({
          extractStyles: false,
        }),
      }),
      blur: parseInt(blur.value, 10),
      radius: parseInt(radius.value, 10),
      weight: function (feature) {
        var name = feature.get("name");
        var magnitude = parseFloat(name.substr(2));
        return magnitude - 5;
      },
    });

    var raster = new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    });

    new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var blurHandler = function () {
      vector.setBlur(parseInt(blur.value, 10));
    };
    blur.addEventListener("input", blurHandler); // 边拉边修改
    blur.addEventListener("change", blurHandler); // 拉完后才修改

    var radiusHandler = function () {
      vector.setRadius(parseInt(radius.value, 10));
    };
    radius.addEventListener("input", radiusHandler); // 边拉边修改
    radius.addEventListener("change", radiusHandler); // 拉完后才修改
  },
};
</script>

<style>
</style>