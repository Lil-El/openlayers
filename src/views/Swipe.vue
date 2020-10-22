<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <input id="swipe" type="range" style="width: 100%" />
      </div>
    </tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { getRenderPixel } from "ol/render";
export default {
  mounted() {
    var osm = new TileLayer({
      source: new OSM(),
    });

    var aerial = new TileLayer({
      source: new XYZ({
        url: `http://t${Math.round(
          Math.random() * 7
        )}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d`,
      }),
    });

    var map = new Map({
      layers: [osm, aerial],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var swipe = document.getElementById("swipe");

    aerial.on("prerender", function (event) {
      var ctx = event.context;
      var mapSize = map.getSize();
      var width = mapSize[0] * (swipe.value / 100);
      // 四个点，左上，右上，左下，右下
      var tl = getRenderPixel(event, [width, 0]);
      var tr = getRenderPixel(event, [mapSize[0], 0]);
      var bl = getRenderPixel(event, [width, mapSize[1]]);
      var br = getRenderPixel(event, mapSize);
      console.log(tl, tr, bl, br);
      ctx.save();
      ctx.beginPath();
      // 右侧图层的显示范围
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    });

    aerial.on("postrender", function (event) {
      var ctx = event.context;
      ctx.restore();
    });

    this.$nextTick(() => {
      swipe.addEventListener(
        "input",
        function () {
          map.render();
        },
        false
      );
    });
  },
};
</script>

<style>
</style>