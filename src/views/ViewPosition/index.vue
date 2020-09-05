<template>
  <div class="mapcontainer">
    <tool>
      <div @click="zoomToSwitzerland">zoom to Switzerland(best fit)</div>
      <div @click="zoomToLausanne">zoom to Lausanne(with min resolution)</div>
      <div @click="centerlausanne">center on Lausanne</div>
    </tool>
    <div id="map" class="map"></div>
    <div class="padding-top"></div>
    <div class="padding-left"></div>
    <div class="padding-right"></div>
    <div class="padding-bottom"></div>
    <div class="center"></div>
  </div>
</template>
<script>
import Tool from "@/components/Tool.vue";
import "ol/ol.css";
import { Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { Tile, Vector as VectorLayer } from "ol/layer";
export default {
  components: { Tool },
  data() {
    return {};
  },
  mounted() {
    this.source = new VectorSource({
      url:
        "https://openlayers.org/en/latest/examples/data/geojson/switzerland.geojson",
      format: new GeoJSON(),
    });
    this.view = new View({
      center: [0, 0],
      zoom: 10,
    });
    this.map = new Map({
      target: "map",
      layers: [
        new Tile({
          source: new OSM(),
        }),
        new VectorLayer({
          source: this.source,
          style: new Style({
            fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
            stroke: new Stroke({ color: "red", width: 1 }),
            // circle 为feature设置圆圈样式
            image: new Circle({
              radius: 5,
              fill: new Fill({ color: "rgba(255, 255, 255, 0.6)" }),
              stroke: new Stroke({ color: "blue", width: 1 }),
            }),
          }),
        }),
      ],
      view: this.view,
    });
  },
  methods: {
    zoomToSwitzerland() {
      // 获取geojson的features
      let feature = this.source.getFeatures()[0];
      let polygon = feature.getGeometry();
      this.view.fit(polygon, { padding: [170, 50, 30, 150] });
    },
    zoomToLausanne() {
      let feature = this.source.getFeatures()[1];
      let point = feature.getGeometry();
      /**
       * 缩放级别可以用比例尺（scale）或者分辨率（resolution）表示。
         比例尺——屏幕上1米代表多少地图坐标单位；分辨率——屏幕上一个像素代表多少地图坐标单位。
       */
      this.view.fit(point, { padding: [170, 50, 30, 150], minResolution: 30 });
    },
    centerlausanne() {
      let feature = this.source.getFeatures()[1];
      let point = feature.getGeometry();
      let size = this.map.getSize();
      // coordinate,size,position
      this.view.centerOn(point.getCoordinates(), size, [570, 500]);
    },
  },
};
</script>
<style lang="scss" scoped>
.mapcontainer {
  position: relative;
  margin-bottom: 20px;
  width: 1000px;
  height: 600px;
}
.map {
  width: inherit;
  height: inherit;
}
.map .ol-zoom {
  top: 178px;
  left: 158px;
}
.map .ol-rotate {
  top: 178px;
  right: 58px;
}
.map .ol-attribution,
.map .ol-attribution.ol-uncollapsible {
  bottom: 30px;
  right: 50px;
}
.padding-top {
  position: absolute;
  top: 0;
  left: 0px;
  width: 1000px;
  height: 170px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-left {
  position: absolute;
  top: 170px;
  left: 0;
  width: 150px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-right {
  position: absolute;
  top: 170px;
  left: 950px;
  width: 50px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-bottom {
  position: absolute;
  top: 570px;
  left: 0px;
  width: 1000px;
  height: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.center {
  position: absolute;
  border: solid 1px black;
  top: 490px;
  left: 560px;
  width: 20px;
  height: 20px;
}
</style>