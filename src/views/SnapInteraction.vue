<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <form id="options-form" autocomplete="off">
        <div class="radio">
          <label>
            <input
              type="radio"
              name="interaction"
              value="draw"
              id="draw"
              checked
            />
            Draw &nbsp;
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="interaction" value="modify" />
            Modify &nbsp;
          </label>
        </div>
        <div class="form-group">
          <label>Draw type &nbsp;</label>
          <select name="draw-type" id="draw-type">
            <option value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
          </select>
        </div>
      </form>
    </tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Draw, Modify, Select, Snap } from "ol/interaction";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var vector = new VectorLayer({
      source: new VectorSource(),
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

    var map = new Map({
      layers: [raster, vector],
      target: "map",
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    var ExampleModify = {
      init: function () {
        this.select = new Select();
        map.addInteraction(this.select);

        this.modify = new Modify({
          features: this.select.getFeatures(),
        });
        map.addInteraction(this.modify);

        this.setEvents();
      },
      setEvents: function () {
        var selectedFeatures = this.select.getFeatures();

        this.select.on("change:active", function () {
          selectedFeatures.forEach(function (each) {
            selectedFeatures.remove(each);
          });
        });
      },
      setActive: function (active) {
        this.select.setActive(active);
        this.modify.setActive(active);
      },
    };
    ExampleModify.init();

    var optionsForm = document.getElementById("options-form");

    var ExampleDraw = {
      init: function () {
        map.addInteraction(this.Point);
        this.Point.setActive(false);
        map.addInteraction(this.LineString);
        this.LineString.setActive(false);
        map.addInteraction(this.Polygon);
        this.Polygon.setActive(false);
        map.addInteraction(this.Circle);
        this.Circle.setActive(false);
      },
      Point: new Draw({
        source: vector.getSource(),
        type: "Point",
      }),
      LineString: new Draw({
        source: vector.getSource(),
        type: "LineString",
      }),
      Polygon: new Draw({
        source: vector.getSource(),
        type: "Polygon",
      }),
      Circle: new Draw({
        source: vector.getSource(),
        type: "Circle",
      }),
      getActive: function () {
        return this.activeType ? this[this.activeType].getActive() : false;
      },
      setActive: function (active) {
        var type = optionsForm.elements["draw-type"].value;
        if (active) {
          this.activeType && this[this.activeType].setActive(false);
          this[type].setActive(true);
          this.activeType = type;
        } else {
          this.activeType && this[this.activeType].setActive(false);
          this.activeType = null;
        }
      },
    };
    ExampleDraw.init();

    optionsForm.onchange = function (e) {
      var type = e.target.getAttribute("name");
      var value = e.target.value;
      if (type == "draw-type") {
        ExampleDraw.getActive() && ExampleDraw.setActive(true);
      } else if (type == "interaction") {
        if (value == "modify") {
          ExampleDraw.setActive(false);
          ExampleModify.setActive(true);
        } else if (value == "draw") {
          ExampleDraw.setActive(true);
          ExampleModify.setActive(false);
        }
      }
    };

    ExampleDraw.setActive(true);
    ExampleModify.setActive(false);

    var snap = new Snap({
      source: vector.getSource(),
    });
    map.addInteraction(snap);
  },
};
</script>

<style>
</style>