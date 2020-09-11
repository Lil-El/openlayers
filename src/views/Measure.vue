<template>
  <div class="wrap">
    <div id="map"></div>
    <tool id="info">
      <div @click="measure(GeometryType.LINE_STRING)">测距</div>
      <div @click="measure(GeometryType.POLYGON)">测面</div>
      <div @click="clear()">清除</div>
    </tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { Map, View, Feature, Overlay } from "ol";
import { Stroke, Style, Fill } from "ol/style";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Polygon, LineString } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
export default {
  components: { Tool },
  data() {
    this.GeometryType = {
      POINT: "Point",
      LINE_STRING: "LineString",
      LINEAR_RING: "LinearRing",
      POLYGON: "Polygon",
      MULTI_POINT: "MultiPoint",
      MULTI_LINE_STRING: "MultiLineString",
      MULTI_POLYGON: "MultiPolygon",
      GEOMETRY_COLLECTION: "GeometryCollection",
      CIRCLE: "Circle",
    };
    return { drawVectors: [] };
  },
  mounted() {
    this.initOlMap();
  },
  methods: {
    initOlMap() {
      this.view = new View({
        projection: "EPSG:4326",
        center: [117.73289858455101, 36.255126757404966],
        zoom: 10,
      });
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: this.view,
      });
    },
    measure(type) {
      this.map.removeInteraction(this.drawInteraction);
      this.initLayer(this.map);
      this.addInteraction(this.map, type);
    },
    clear() {
      // 清空layer
      this.drawVectors.forEach((vector) => {
        this.map.removeLayer(vector);
      });
      // 清空interaction
      this.map.removeInteraction(this.drawInteraction);
      // 清空overlay
      this.map.getOverlays().clear();
    },
    initLayer(map) {
      this.drawVector = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          stroke: new Stroke({
            color: "rgba(0, 153, 255, 1)",
            width: 2,
          }),
          fill: new Fill({
            color: "rgba(228,246,251,0.4)",
          }),
        }),
      });
      this.drawVectors.push(this.drawVector);
      map.addLayer(this.drawVector);
    },
    addInteraction(map, type) {
      if (type) {
        this.drawInteraction = new Draw({
          type,
          source: this.drawVector.getSource(),
        });
        this.createMeasureTooltip(map);
        this.drawInteraction.on("drawstart", (evt) => {
          this.sketch = evt.feature;
          let tooltipCoord = evt.coordinate; // ol/coordinate
          this.listener = this.sketch.getGeometry().on("change", (evt) => {
            let geom = evt.target;
            let output;
            if (geom instanceof Polygon) {
              output = this.formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              output = this.formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            this.measureTooltipElement.innerHTML = output;
            this.measureTooltip.setPosition(tooltipCoord);
          });
        });
        this.drawInteraction.on("drawend", () => {
          this.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
          this.measureTooltip.setOffset([0, -7]);
          this.sketch = null;
          this.measureTooltipElement = null;
          this.createMeasureTooltip(map);
          unByKey(this.listener);
        });
        map.addInteraction(this.drawInteraction);
      }
    },
    createMeasureTooltip(map) {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.parentNode.removeChild(
          this.measureTooltipElement
        );
      }
      this.measureTooltipElement = document.createElement("div");
      this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";

      this.measureTooltip = new Overlay({
        id: `measure-${new Date().getTime()}`,
        element: this.measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      map.addOverlay(this.measureTooltip);
    },
    formatArea(polygon) {
      let area = getArea(polygon, { projection: "EPSG:4326" });
      if (area > 1000000) {
        return (
          Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>"
        );
      } else {
        return Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
      }
    },
    formatLength(line) {
      let length = getLength(line, { projection: "EPSG:4326" });
      if (length > 1000) {
        return Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        return Math.round(length * 100) / 100 + " " + "m";
      }
    },
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