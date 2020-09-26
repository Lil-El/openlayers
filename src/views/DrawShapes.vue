<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div @click="handle('None')">None</div>
      <div @click="handle('Box')">Box</div>
      <div @click="handle('Square')">Square</div>
      <div @click="handle('Star')">Star</div>
    </tool>
  </div>
</template>

<script>
import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";
import Map from "ol/Map";
import Polygon from "ol/geom/Polygon";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    this.source = new VectorSource({ wrapX: false });

    var vector = new VectorLayer({
      source: this.source,
    });

    this.map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });
  },
  methods: {
    handle(type) {
      this.map.removeInteraction(this.draw);
      this.addInteraction(type);
    },
    addInteraction(typeSelect) {
      var value = typeSelect;
      if (value !== "None") {
        var geometryFunction;
        if (value === "Square") {
          value = "Circle";
          geometryFunction = createRegularPolygon(4);
        } else if (value === "Box") {
          value = "Circle";
          geometryFunction = createBox();
        } else if (value === "Star") {
          value = "Circle";
          geometryFunction = function (coordinates, geometry) {
            var center = coordinates[0]; // 起始点的坐标
            var last = coordinates[1]; // 端点（鼠标）的坐标
            var dx = center[0] - last[0];
            var dy = center[1] - last[1];
            var radius = Math.sqrt(dx * dx + dy * dy); // 计算半径
            var rotation = Math.atan2(dy, dx); // 计算角度
            var newCoordinates = [];
            var numPoints = 12; // 设置点的个数
            // 设置点的位置-坐标
            for (var i = 0; i < numPoints; ++i) {
              var angle = rotation + (i * 2 * Math.PI) / numPoints;
              var fraction = i % 2 === 0 ? 1 : 0.5;
              var offsetX = radius * fraction * Math.cos(angle);
              var offsetY = radius * fraction * Math.sin(angle);
              newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
            }
            newCoordinates.push(newCoordinates[0].slice());
            if (!geometry) {
              geometry = new Polygon([newCoordinates]);
            } else {
              geometry.setCoordinates([newCoordinates]);
            }
            return geometry;
          };
        }
        this.draw = new Draw({
          source: this.source,
          type: value,
          geometryFunction: geometryFunction,
        });
        this.map.addInteraction(this.draw);
      }
    },
  },
};
</script>

<style>
</style>