<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import View from "ol/View";
import { Circle as CircleStyle, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { easeOut } from "ol/easing";
import { fromLonLat } from "ol/proj";
import { getVectorContext } from "ol/render";
import { unByKey } from "ol/Observable";
export default {
  data() {
    return {
      duration: 3000,
    };
  },
  mounted() {
    this.tileLayer = new TileLayer({
      source: new OSM({
        wrapX: false,
      }),
    });
    this.map = new Map({
      layers: [this.tileLayer],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 1,
        multiWorld: true, // true地图脱离边缘拖动，false以高度为标准
      }),
    });
    this.source = new VectorSource({ wrapX: false });
    let vector = new VectorLayer({ source: this.source });
    this.map.addLayer(vector);
    this.source.on("addfeature", (e) => {
      this.flash(e.feature);
    });
    window.setInterval(this.addRandomFeature, 1000);
  },
  methods: {
    flash(feature) {
      var start = new Date().getTime();
      // 添加feature后，监听map的postrender事件，feature添加后，执行postreneder代码，将feature的gemo克隆，再次多次进行渲染
      // 以实现动画效果
      var listenerKey = this.tileLayer.on("postrender", (event) => {
        var vectorContext = getVectorContext(event);
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / this.duration;
        var radius = easeOut(elapsedRatio) * 25 + 5;
        var opacity = easeOut(1 - elapsedRatio);
        console.log("这里执行很多次", event);
        var style = new Style({
          image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
              color: "rgba(255, 0, 0, " + opacity + ")",
              width: 0.25 + opacity,
            }),
          }),
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > this.duration) {
          unByKey(listenerKey);
          return;
        }
        this.map.render();
      });
    },
    addRandomFeature() {
      var x = Math.random() * 360 - 180;
      var y = Math.random() * 180 - 90;
      var geom = new Point(fromLonLat([x, y]));
      var feature = new Feature(geom);
      this.source.addFeature(feature);
    },
  },
};
</script>

<style>
</style>