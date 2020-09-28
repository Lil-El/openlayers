<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Map from "ol/Map";
import Stamen from "ol/source/Stamen";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getVectorContext } from "ol/render";
export default {
  mounted() {
    var tileLayer = new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    });

    var map = new Map({
      layers: [tileLayer],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var style = new Style({
      stroke: new Stroke({
        color: "#EAE911",
        width: 2,
      }),
    });

    var flightsSource = new VectorSource({
      wrapX: false,
      // 获取数据，将from和to两个点坐标，通过arc连接100个点；添加到feature中
      loader: function () {
        var url =
          "https://openlayers.org/en/latest/examples/data/openflights/flights.json";
        fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            var flightsData = json.flights;
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i];
              var from = flight[0];
              var to = flight[1];

              // create an arc circle between the two locations
              var arcGenerator = new arc.GreatCircle(
                { x: from[1], y: from[0] },
                { x: to[1], y: to[0] }
              );
              // arcLine 包含了100个点坐标
              var arcLine = arcGenerator.Arc(100, { offset: 10 });
              if (arcLine.geometries.length === 1) {
                var line = new LineString(arcLine.geometries[0].coords);
                line.transform("EPSG:4326", "EPSG:3857");

                var feature = new Feature({
                  geometry: line,
                  finished: false,
                });
                // 延迟添加特征，以便所有特征的动画不会同时开始
                addLater(feature, i * 50);
              }
            }
            tileLayer.on("postrender", animateFlights);
          });
      },
    });

    var flightsLayer = new VectorLayer({
      source: flightsSource,
      style: function (feature) {
        // 如果feature的动画正处于active状态时，不要使用feature的style样式；
        if (feature.get("finished")) {
          return style;
        } else {
          return null;
        }
      },
    });

    map.addLayer(flightsLayer);

    var pointsPerMs = 0.1;
    function animateFlights(event) {
      // console.log("render"); // 执行很多很多次
      var vectorContext = getVectorContext(event);
      var frameState = event.frameState;
      vectorContext.setStyle(style);

      var features = flightsSource.getFeatures();
      for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        if (!feature.get("finished")) {
          // only draw the lines for which the animation has not finished yet
          var coords = feature.getGeometry().getCoordinates();
          var elapsedTime = frameState.time - feature.get("start");
          var elapsedPoints = elapsedTime * pointsPerMs; // 每0.1ms过一个点；计算所有要过的点的个数

          if (elapsedPoints >= coords.length) {
            feature.set("finished", true);
          }

          var maxIndex = Math.min(elapsedPoints, coords.length);
          var currentLine = new LineString(coords.slice(0, maxIndex));

          // directly draw the line with the vector context
          vectorContext.drawGeometry(currentLine);
        }
      }
      // tell OpenLayers to continue the animation
      map.render();
    }

    function addLater(feature, timeout) {
      window.setTimeout(function () {
        feature.set("start", new Date().getTime());
        flightsSource.addFeature(feature);
      }, timeout);
    }
  },
};
</script>

<style>
</style>