<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { getRenderPixel } from "ol/render";

export default {
  mounted() {
    let roads = new TileLayer({
      source: new OSM(),
    });

    let imagery = new TileLayer({
      source: new XYZ({
        url: `http://t${Math.round(
          Math.random() * 7
        )}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d`,
      }),
    });

    let container = document.getElementById("map");

    let map = new Map({
      layers: [roads, imagery],
      target: "map",
      view: new View({
        center: fromLonLat([-109, 46.5]),
        zoom: 6,
      }),
    });

    this.radius = 75;
    this.$nextTick(() => {
      document.addEventListener("keydown", (evt) => {
        if (evt.which === 38) {
          this.radius = Math.min(this.radius + 5, 150);
          map.render();
          evt.preventDefault();
        } else if (evt.which === 40) {
          this.radius = Math.max(this.radius - 5, 25);
          map.render();
          evt.preventDefault();
        }
      });
    });

    // get the pixel position with every move
    var mousePosition = null;

    // 1. 先监听鼠标move事件，重新render地图
    container.addEventListener("mousemove", function (event) {
      mousePosition = map.getEventPixel(event);
      map.render();
    });

    container.addEventListener("mouseout", function () {
      mousePosition = null;
      map.render();
    });

    // 2. render前，进行clipping
    imagery.on("prerender", (event) => {
      console.log("pre");
      var ctx = event.context;
      ctx.save();
      ctx.beginPath();
      if (mousePosition) {
        // only show a circle around the mouse
        var pixel = getRenderPixel(event, mousePosition);
        var offset = getRenderPixel(event, [
          mousePosition[0] + this.radius,
          mousePosition[1],
        ]);
        var canvasRadius = Math.sqrt(
          Math.pow(offset[0] - pixel[0], 2) + Math.pow(offset[1] - pixel[1], 2)
        );

        ctx.arc(pixel[0], pixel[1], canvasRadius, 0, 2 * Math.PI);
        ctx.lineWidth = (5 * canvasRadius) / this.radius;
        ctx.strokeStyle = "rgba(0,0,0,0.5)";
        ctx.stroke();
      }
      ctx.clip();
    });

    // 3. render后，restore canvas context
    imagery.on("postrender", function (event) {
      console.log("post");
      var ctx = event.context;
      ctx.restore();
    });
  },
};
</script>

<style>
</style>