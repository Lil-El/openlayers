<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import KML from "ol/format/KML";
import Map from "ol/Map";
import View from "ol/View";
import {
  Circle as CircleStyle,
  Fill,
  RegularShape,
  Stroke,
  Style,
  Text,
} from "ol/style";
import { Cluster, Stamen, Vector as VectorSource } from "ol/source";
import { Select, defaults as defaultInteractions } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { createEmpty, extend, getHeight, getWidth } from "ol/extent";
export default {
  mounted() {
    this.earthquakeFill = new Fill({
      color: "red",
    });
    this.earthquakeStroke = new Stroke({
      color: "white",
      width: 1,
    });
    this.textFill = new Fill({
      color: "#fff",
    });
    this.textStroke = new Stroke({
      color: "rgba(0, 0, 0, 0.6)",
      width: 3,
    });
    this.invisibleFill = new Fill({
      // color: "rgba(255,255,255,0.01)", 近乎隐藏
      color: "blue",
    });
    this.maxFeatureCount;
    let vector = null;
    this.calculateClusterInfo = function (resolution) {
      this.maxFeatureCount = 0;
      // 整个图层所有的feature；包括不可见部分；如果zoom越大，feature越多
      var features = vector.getSource().getFeatures();
      var feature, radius;
      for (var i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        var originalFeatures = feature.get("features");
        //#region 一个圆圈（一个feature）包含了10个feature；遍历这10个，然后获取这10个的范围extent
        var extent = createEmpty(); // 创建空范围
        var j = void 0,
          jj = void 0;
        for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
          // 将第一个范围去包含第二个范围
          extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        //#endregion
        this.maxFeatureCount = Math.max(this.maxFeatureCount, jj);
        radius = (0.25 * (getWidth(extent) + getHeight(extent))) / resolution;
        feature.set("radius", radius);
      }
    };
    this.currentResolution;
    vector = new VectorLayer({
      source: new Cluster({
        distance: 40, // 两个星星距离小于40就会合并
        source: new VectorSource({
          url: "./2012_Earthquakes_Mag5.kml",
          format: new KML({
            extractStyles: false,
          }),
        }),
      }),
      style: this.styleFunction,
    });

    var map = new Map({
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: "toner",
          }),
        }),
        vector,
      ],
      interactions: defaultInteractions().extend([
        new Select({
          condition: function (evt) {
            // 返回true时，执行下面的函数selectStyleFunction
            return evt.type == "pointermove" || evt.type == "singleclick";
          },
          style: this.selectStyleFunction,
        }),
      ]),
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  },
  methods: {
    createEarthquakeStyle(feature) {
      // 当只有一个feature时，不显示圆圈，显示为star
      var name = feature.get("name");
      var magnitude = parseFloat(name.substr(2));
      var radius = 5 + 20 * (magnitude - 5);
      // Star 样式
      return new Style({
        geometry: feature.getGeometry(),
        image: new RegularShape({
          radius1: radius,
          radius2: 3,
          points: 5,
          angle: Math.PI,
          fill: this.earthquakeFill,
          stroke: this.earthquakeStroke,
        }),
      });
    },
    styleFunction(feature, resolution) {
      // 当前可视区的feature，和分辨率
      // 如果分辨率没变，就不去重复计算
      if (resolution != this.currentResolution) {
        // 计算当前哪个圆圈（Feature）的features的最大值 205
        this.calculateClusterInfo(resolution);
        this.currentResolution = resolution;
      }
      // 这里的maxFeatureCount是同一个值
      var style;
      var size = feature.get("features").length;
      if (size > 1) {
        style = new Style({
          image: new CircleStyle({
            radius: feature.get("radius"),
            fill: new Fill({
              color: [
                255,
                153,
                0,
                Math.min(0.8, 0.4 + size / this.maxFeatureCount),
              ],
            }),
          }),
          text: new Text({
            text: size.toString(),
            fill: this.textFill,
            stroke: this.textStroke,
          }),
        });
      } else {
        var originalFeature = feature.get("features")[0];
        style = this.createEarthquakeStyle(originalFeature);
      }
      return style;
    },
    selectStyleFunction(feature) {
      // 设置移入圆圈时的样式-隐藏
      var styles = [
        new Style({
          image: new CircleStyle({
            radius: feature.get("radius"),
            fill: this.invisibleFill,
          }),
        }),
      ];
      // 添加每个具体的feature的star样式
      var originalFeatures = feature.get("features");
      var originalFeature;
      for (var i = originalFeatures.length - 1; i >= 0; --i) {
        originalFeature = originalFeatures[i];
        styles.push(this.createEarthquakeStyle(originalFeature));
      }
      return styles;
    },
  },
};
</script>

<style>
</style>