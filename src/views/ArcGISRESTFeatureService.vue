<template>
  <div class="wrap">
    <span>ajax请求图层features，然后通过里面的字段，展示不同的style</span>
    <div id="map"></div>
    <tool id="info">&nbsp;</tool>
  </div>
</template>
<script>
import Tool from "@/components/Tool";
import "ol/ol.css";
import EsriJSON from "ol/format/EsriJSON";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Fill, Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { createXYZ } from "ol/tilegrid";
import { fromLonLat } from "ol/proj";
import { tile as tileStrategy } from "ol/loadingstrategy";
import $ from "jquery";
export default {
  components: { Tool },
  mounted() {
    var esrijsonFormat = new EsriJSON();

    var styleCache = {
      ABANDONED: new Style({
        fill: new Fill({
          color: "red",
        }),
        stroke: new Stroke({
          color: "rgba(0, 0, 0, 255)",
          width: 0.4,
        }),
      }),
      GAS: new Style({
        fill: new Fill({
          color: "blue",
        }),
        stroke: new Stroke({
          color: "rgba(110, 110, 110, 255)",
          width: 0.4,
        }),
      }),
      OIL: new Style({
        fill: new Fill({
          color: "yellow",
        }),
        stroke: new Stroke({
          color: "rgba(110, 110, 110, 255)",
          width: 0,
        }),
      }),
      OILGAS: new Style({
        fill: new Fill({
          color: "pink",
        }),
        stroke: new Stroke({
          color: "rgba(110, 110, 110, 255)",
          width: 0.4,
        }),
      }),
    };

    var vectorSource = new VectorSource({
      // extent范围参数，projection投影参数
      loader: function (extent, resolution, projection) {
        console.log(extent, projection);
        var url =
          "https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Petroleum/KSFields/FeatureServer/0/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=" +
          encodeURIComponent(
            '{"xmin":' +
              extent[0] +
              ',"ymin":' +
              extent[1] +
              ',"xmax":' +
              extent[2] +
              ',"ymax":' +
              extent[3] +
              ',"spatialReference":{"wkid":102100}}'
          ) +
          "&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*" +
          "&outSR=102100";
        $.ajax({
          url: url,
          dataType: "jsonp",
          success: function (response) {
            if (response.error) {
              alert("error");
            } else {
              // readFeatures（source,options）
              var features = esrijsonFormat.readFeatures(response, {
                featureProjection: projection, // projection翻译为投影；feature的投影
              });
              if (features.length > 0) {
                vectorSource.addFeatures(features);
              }
            }
          },
        });
      },
      // tileStrategy(tilegrid)
      strategy: tileStrategy(
        createXYZ({
          tileSize: 512,
        })
      ),
    });

    // 图层
    var vector = new VectorLayer({
      source: vectorSource,
      style: function (feature) {
        // ajax返回的feature中包含该字段；get方法获取的是feature的values中的activeprod
        var classify = feature.get("activeprod");
        return styleCache[classify];
      },
    });

    // 地图
    var raster = new TileLayer({
      source: new XYZ({
        attributions: "请求arcgis地图Tile",
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      }),
    });

    let map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: fromLonLat([-97.6114, 38.8403]),
        zoom: 7,
      }),
    });

    this.map = map;
    // 获取当前鼠标点的位置的所有的feature，将所有feature的field_name展示；
    var displayFeatureInfo = function (pixel) {
      var features = [];
      map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
      });
      if (features.length > 0) {
        var info = [];
        for (let i = 0; i < features.length; ++i) {
          info.push(features[i].get("field_name"));
        }
        document.getElementById("info").innerHTML = info.join(", ");
        map.getTarget().style.cursor = "pointer";
      } else {
        document.getElementById("info").innerHTML = "&nbsp;";
        map.getTarget().style.cursor = "";
      }
    };

    this.map.on("pointermove", (evt) => {
      if (evt.dragging) {
        return;
      }
      // 获取鼠标在地图的位置pixel
      var pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });

    this.map.on("click", function (evt) {
      // 获取鼠标在地图的位置pixel
      displayFeatureInfo(evt.pixel);
    });
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  height: 100vh;
  flex: 1;
  #map {
    height: 100vh;
    width: 100%;
  }
}
</style>