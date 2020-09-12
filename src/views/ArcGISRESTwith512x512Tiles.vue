<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";
export default {
  mounted() {
    this.map = new Map({
      target: "map",
      view: new View({
        center: [0, 0],
        projection: "EPSG:4326",
        zoom: 2,
        minZoom: 2,
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: "Copyright:© 2013 ESRI, i-cubed, GeoEye",
            url: `https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}`,
            maxZoom: 15,
            projection: "EPSG:4326",
            tileSize: 512,
            maxResoultion: 180 / 512,
            wrapX: true, // 设置水平无限滚动
          }),
        }),
      ],
    });
  },
};
</script>

<style>
</style>