<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import { Feature, Map, View } from "ol";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { LineString, Point, Polygon } from "ol/geom";
import {
  Pointer as PointerInteraction,
  defaults as defaultInteractions,
} from "ol/interaction";
import { TileJSON, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var Drag = (function (PointerInteraction) {
      function Drag() {
        PointerInteraction.call(this, {
          handleDownEvent: function (evt) {
            var map = evt.map;
            var feature = map.forEachFeatureAtPixel(evt.pixel, function (
              feature
            ) {
              return feature;
            });
            if (feature) {
              this.coordinate_ = evt.coordinate;
              this.feature_ = feature;
            }
            return !!feature;
          },
          handleDragEvent: function (evt) {
            // 拖动ele，修改this的coor
            var deltaX = evt.coordinate[0] - this.coordinate_[0];
            var deltaY = evt.coordinate[1] - this.coordinate_[1];

            var geometry = this.feature_.getGeometry();
            geometry.translate(deltaX, deltaY);

            this.coordinate_[0] = evt.coordinate[0];
            this.coordinate_[1] = evt.coordinate[1];
          },
          handleMoveEvent: function (evt) {
            // 当移动到ele上时，cursor变为pointer
            if (this.cursor_) {
              var map = evt.map;
              var feature = map.forEachFeatureAtPixel(evt.pixel, function (
                feature
              ) {
                return feature;
              });
              var element = evt.map.getTargetElement();
              if (feature) {
                if (element.style.cursor != this.cursor_) {
                  this.previousCursor_ = element.style.cursor; // 缓存cursor状态
                  element.style.cursor = this.cursor_; // 修改cursor
                }
              } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
              }
            }
          },
          handleUpEvent: function () {
            this.coordinate_ = null;
            this.feature_ = null;
            return false;
          },
        });
        this.coordinate_ = null;
        this.cursor_ = "pointer";
        this.feature_ = null;
        this.previousCursor_ = undefined;
      }

      if (PointerInteraction) Drag.__proto__ = PointerInteraction;
      Drag.prototype = Object.create(
        PointerInteraction && PointerInteraction.prototype
      );
      Drag.prototype.constructor = Drag;

      return Drag;
    })(PointerInteraction);

    var pointFeature = new Feature(new Point([0, 0]));
    var lineFeature = new Feature(
      new LineString([
        [-1e7, 1e6],
        [-1e6, 3e6],
      ])
    );
    var polygonFeature = new Feature(
      new Polygon([
        [
          [-3e6, -1e6],
          [-3e6, 1e6],
          [-1e6, 1e6],
          [-1e6, -1e6],
          [-3e6, -1e6],
        ],
      ])
    );

    new Map({
      interactions: defaultInteractions().extend([new Drag()]),
      layers: [
        new TileLayer({
          source: new TileJSON({
            url:
              "https://a.tiles.mapbox.com/v4/aj.1x1-degrees.json?secure&access_token=pk.eyJ1IjoiZWxsaXNpb24iLCJhIjoiY2tkM2FvdmYzMTBvazJ6cDFrNGt4OXF6YiJ9.jnnV34kUMQc_wWnYl5SzDQ",
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [pointFeature, lineFeature, polygonFeature],
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              opacity: 0.95,
              src: "../assets/icon.png",
            }),
            stroke: new Stroke({
              width: 3,
              color: [255, 0, 0, 1],
            }),
            fill: new Fill({
              color: [0, 0, 255, 0.6],
            }),
          }),
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