<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <label>top</label><input type="text" id="top" /> <label>right</label
        ><input type="text" id="right" /><br />
        <label>bottom</label><input type="text" id="bottom" />
        <label>left</label><input type="text" id="left" />
      </div>
    </tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { getBottomLeft, getTopRight } from "ol/extent";
import { toLonLat } from "ol/proj";
export default {
  mounted() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    function display(id, value) {
      document.getElementById(id).value = value.toFixed(2);
    }

    function wrapLon(value) {
      var worlds = Math.floor((value + 180) / 360);
      return value - worlds * 360;
    }

    function onMoveEnd(evt) {
      var map = evt.map;
      var extent = map.getView().calculateExtent(map.getSize());
      var bottomLeft = toLonLat(getBottomLeft(extent));
      var topRight = toLonLat(getTopRight(extent));
      display("left", wrapLon(bottomLeft[0]));
      display("bottom", bottomLeft[1]);
      display("right", wrapLon(topRight[0]));
      display("top", topRight[1]);
    }

    this.$nextTick(() => {
      map.on("moveend", onMoveEnd);
    });
  },
};
</script>

<style>
</style>