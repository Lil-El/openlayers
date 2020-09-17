<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <input id="distance" type="range" min="0" max="100" step="1" value="40" />
    </Tool>
  </div>
</template>

<script>
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    this.distance = document.getElementById("distance");
    let count = 20000;
    let features = new Array(count);
    let e = 4500000;
    for (let i = 0; i < count; i++) {
      let coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
      features[i] = new Feature(new Point(coordinates));
    }
    let source = new VectorSource({ features });
    let clusterSource = new Cluster({
      distance: parseInt(this.distance.value, 10),
      source,
    });
    this.distance.addEventListener("input", () => {
      clusterSource.setDistance(parseInt(this.distance.value, 10));
    });
    let styleCache = {};
    new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: clusterSource,
          style: function (feature) {
            var size = feature.get("features").length;
            var style = styleCache[size];
            if (!style) {
              style = new Style({
                image: new CircleStyle({
                  radius: 10,
                  stroke: new Stroke({
                    color: "#fff",
                  }),
                  fill: new Fill({
                    color: "#3399CC",
                  }),
                }),
                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: "#fff",
                  }),
                }),
              });
              styleCache[size] = style;
            }
            return style;
          },
        }),
      ],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  },
};
</script>

<style>
</style>