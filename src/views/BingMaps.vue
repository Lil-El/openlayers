<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <div v-for="style in styles" :key="style" @click="onChange(style)">{{style}}</div>
    </Tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import BingMaps from "ol/source/BingMaps";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
export default {
  components: { Tool },
  data() {
    return {
      styles: [
        "RoadOnDemand",
        "Aerial",
        "AerialWithLabelsOnDemand",
        "CanvasDark",
        "OrdnanceSurvey",
      ],
    };
  },
  mounted() {
    this.layers = [];
    let i, ii;
    for (i = 0; i < this.styles.length; ++i) {
      this.layers.push(
        new TileLayer({
          visible: i === 0,
          preload: Infinity,
          source: new BingMaps({
            key:
              "AkGtfudkAN0-ntv_az_qU1DfcXJNDQWGYEr-ygdRKBNqygn4jYLk2QSthLaNWURn",
            imagerySet: this.styles[i],
            // 大于maxZoom的时候，显示为5时的图集的放大图片，而不是更大zoom的图片
            // "大于maxZoom时，没有影像集
            maxZoom: 5,
          }),
        })
      );
    }
    let map = new Map({
      layers: this.layers,
      target: "map",
      view: new View({
        center: [-6655.5402445057125, 6709968.258934638],
        zoom: 13,
      }),
    });
  },
  methods: {
    onChange(style) {
      for (let i = 0; i < this.layers.length; ++i) {
        this.layers[i].setVisible(this.styles[i] === style);
      }
    },
  },
};
</script>

<style>
</style>