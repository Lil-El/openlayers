<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <select id="type">
          <option value="length">Length (LineString)</option>
          <option value="area">Area (Polygon)</option>
        </select>
      </div>
    </tool>
  </div>
</template>

<script>
import Draw from "ol/interaction/Draw";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { LineString, Polygon } from "ol/geom";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var source = new VectorSource();

    var vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });

    var sketch;
    var helpTooltipElement;
    var helpTooltip;
    var measureTooltipElement;
    var measureTooltip;
    var continuePolygonMsg = "Click to continue drawing the polygon";
    var continueLineMsg = "Click to continue drawing the line";

    var pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }

      var helpMsg = "Click to start drawing";

      if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove("hidden");
    };

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 15,
      }),
    });

    map.on("pointermove", pointerMoveHandler);

    map.getViewport().addEventListener("mouseout", function () {
      helpTooltipElement.classList.add("hidden");
    });

    var typeSelect = document.getElementById("type");

    var draw;

    var formatLength = function (line) {
      var length = getLength(line);
      var output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    };

    var formatArea = function (polygon) {
      var area = getArea(polygon);
      var output;
      if (area > 10000) {
        output =
          Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
      }
      return output;
    };

    function addInteraction() {
      var type = typeSelect.value == "area" ? "Polygon" : "LineString";
      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
          }),
        }),
      });
      map.addInteraction(draw);

      createMeasureTooltip();
      createHelpTooltip();

      var listener;
      draw.on("drawstart", function (evt) {
        // set sketch
        sketch = evt.feature;

        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on("change", function (evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on("drawend", function () {
        measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
      });
    }

    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement("div");
      helpTooltipElement.className = "ol-tooltip hidden";
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
      });
      map.addOverlay(helpTooltip);
    }

    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement("div");
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      map.addOverlay(measureTooltip);
    }

    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
  },
};
</script>

<style>
</style>