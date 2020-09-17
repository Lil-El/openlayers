<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <img src="@/assets/wms.png" width="400" alt />
    </Tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { Map, View, Feature } from "ol";
import { Style, Stroke } from "ol/style";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM, TileWMS } from "ol/source";
export default {
  components: { Tool },
  mounted() {
    new Map({
      target: "map",
      layers: [
        new TileLayer({ source: new OSM() }),
        new TileLayer({
          source: new TileWMS({
            url: "http://192.168.0.117:8081/geoserver/guotu/wms",
            params: {
              LAYERS: "guotu:csght",
              TILED: true,
              VERSION: "1.1.0",
              FORMAT: "image/png",
            },
            serverType: "geoserver",
            crossOrigin: "anonymous",
          }),
          opacity: 0.9,
          id: `dyn_wms`,
        }),
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [117.73289858455101, 36.255126757404966],
        zoom: 12,
      }),
    });
  },
};
</script>

<style>
</style>