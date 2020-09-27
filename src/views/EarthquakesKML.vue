<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <div id="info"></div>
      </div>
    </tool>
  </div>
</template>

<script>
import KML from "ol/format/KML";
import Map from "ol/Map";
import Stamen from "ol/source/Stamen";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import $ from "jquery";
export default {
  mounted() {
    var styleCache = {};
    var styleFunction = function (feature) {
      var name = feature.get("name");
      var magnitude = parseFloat(name.substr(2));
      var radius = 5 + 20 * (magnitude - 5);
      var style = styleCache[radius];
      if (!style) {
        style = new Style({
          image: new CircleStyle({
            radius: radius,
            fill: new Fill({
              color: "rgba(255, 153, 0, 0.4)",
            }),
            stroke: new Stroke({
              color: "rgba(255, 204, 0, 0.2)",
              width: 1,
            }),
          }),
        });
        styleCache[radius] = style;
      }
      return style;
    };

    var vector = new VectorLayer({
      source: new VectorSource({
        url: "./2012_Earthquakes_Mag5.kml",
        format: new KML({
          extractStyles: false,
        }),
      }),
      style: styleFunction,
    });

    var raster = new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    });

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var info = document.getElementById("info");
    // info.tooltip({
    //   animation: false,
    //   trigger: "manual",
    // });

    var displayFeatureInfo = function (pixel) {
      var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      if (feature) {
        info.innerText = feature.get("name");
      }
    };

    // map.on("pointermove", function (evt) {
    //   if (evt.dragging) {
    //     info.tooltip("hide");
    //     return;
    //   }
    //   displayFeatureInfo(map.getEventPixel(evt.originalEvent));
    // });

    map.on("click", function (evt) {
      displayFeatureInfo(evt.pixel);
    });
  },
  methods: {},
};
</script>

<style>
</style>