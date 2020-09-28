<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <form class="form-inline">
          <span id="status">&nbsp;没有feature被点击.</span>
          <br />
          <label>选择点击容差 </label>
          <select id="hitTolerance" class="form-control">
            <option value="0" selected>0 Pixels</option>
            <option value="5">5 Pixels</option>
            <option value="10">10 Pixels</option>
          </select>
        </form>
      </div>
    </tool>
  </div>
</template>

<script>
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var style = new Style({
      stroke: new Stroke({
        color: "black",
        width: 1,
      }),
    });

    var feature = new Feature(
      new LineString([
        [-4000000, 0],
        [4000000, 0],
      ])
    );

    var vector = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
      style: style,
    });

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var hitTolerance;

    var statusElement = document.getElementById("status");

    map.on("singleclick", function (e) {
      var hit = false;
      map.forEachFeatureAtPixel(
        e.pixel,
        function () {
          hit = true;
        },
        {
          hitTolerance: hitTolerance,
        }
      );
      if (hit) {
        style.getStroke().setColor("green");
        statusElement.innerHTML = "&nbsp;一个feature被点击!";
      } else {
        style.getStroke().setColor("black");
        statusElement.innerHTML = "&nbsp;没有feature被点击.";
      }
      feature.changed();
    });

    var selectHitToleranceElement = document.getElementById("hitTolerance");
    var circleCanvas = document.getElementById("circle");

    var changeHitTolerance = function () {
      hitTolerance = parseInt(selectHitToleranceElement.value, 10);
    };

    selectHitToleranceElement.onchange = changeHitTolerance;
    changeHitTolerance();
  },
};
</script>

<style>
</style>