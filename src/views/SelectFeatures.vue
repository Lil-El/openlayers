<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <form class="form-inline">
          <label>Action type &nbsp;</label>
          <select id="type" class="form-control">
            <option value="click" selected>Click</option>
            <option value="singleclick">Single-click</option>
            <option value="pointermove">Hover</option>
            <option value="altclick">Alt+Click</option>
            <option value="none">None</option>
          </select>
          <span id="status">&nbsp;0 selected features</span>
        </form>
      </div>
    </tool>
  </div>
</template>

<script>
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import Select from "ol/interaction/Select";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { altKeyOnly, click, pointerMove } from "ol/events/condition";
export default {
  mounted() {
    var raster = new TileLayer({
      source: new OSM(),
    });

    var vector = new VectorLayer({
      source: new VectorSource({
        url: "./countries.geojson",
        format: new GeoJSON(),
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

    var select = null;

    var selectSingleClick = new Select();

    var selectClick = new Select({
      condition: click,
    });

    var selectPointerMove = new Select({
      condition: pointerMove,
    });

    var selectAltClick = new Select({
      condition: function (mapBrowserEvent) {
        return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
      },
    });

    var selectElement = document.getElementById("type");

    var changeInteraction = function () {
      if (select !== null) {
        map.removeInteraction(select);
      }
      var value = selectElement.value;
      if (value == "singleclick") {
        select = selectSingleClick;
      } else if (value == "click") {
        select = selectClick;
      } else if (value == "pointermove") {
        select = selectPointerMove;
      } else if (value == "altclick") {
        select = selectAltClick;
      } else {
        select = null;
      }
      if (select !== null) {
        map.addInteraction(select);
        select.on("select", function (e) {
          document.getElementById("status").innerHTML =
            "&nbsp;" +
            e.target.getFeatures().getLength() +
            " selected features (last operation selected " +
            e.selected.length +
            " and deselected " +
            e.deselected.length +
            " features)";
        });
      }
    };

    selectElement.onchange = changeInteraction;
    changeInteraction();
  },
};
</script>

<style>
</style>