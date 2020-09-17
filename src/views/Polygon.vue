<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View, Feature } from "ol";
import { Style, Stroke } from "ol/style";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
export default {
  mounted() {
    // 要形成一个闭合的ring（环）
    let c1 = [117.6815, 36.2426];
    let c2 = [118.6816, 36.2426];
    let c3 = [118.6816, 37.2427];
    let c4 = [117.6815, 36.2426];
    let c5 = [117.6815, 36.2426];
    let point = new Point([117, 36]);
    let polygon = new Polygon([[c1, c2, c3, c4, c5]]);
    let geometry = new MultiPolygon([polygon]);
    new Map({
      target: "map",
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          zIndex: 2,
          source: new VectorSource({
            features: [
              new Feature({
                geometry,
                labelPoint: point,
              }),
            ],
          }),
          style: new Style({
            stroke: new Stroke({
              color: "red",
              width: 3,
            }),
          }),
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