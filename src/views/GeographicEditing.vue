<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <select id="mode">
        <option value="modify">select a feature to modify</option>
        <option value="draw">draw new features</option>
      </select>
    </tool>
  </div>
</template>

<script>
import GeoJSON from "ol/format/GeoJSON";
import { Draw, Modify, Select, Snap } from "ol/interaction";
import { Map, View } from "ol/index";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
export default {
  mounted() {
    useGeographic();

    var source = new VectorSource({
      url: "./countries.geojson",
      format: new GeoJSON(),
    });

    var map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: source,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var select = new Select();

    var modify = new Modify({
      features: select.getFeatures(),
    });

    var draw = new Draw({
      type: "Polygon",
      source: source,
    });

    var snap = new Snap({
      source: source,
    });

    function removeInteractions() {
      map.removeInteraction(modify);
      map.removeInteraction(select);
      map.removeInteraction(draw);
      map.removeInteraction(select);
    }

    var mode = document.getElementById("mode");
    function onChange() {
      removeInteractions();
      switch (mode.value) {
        case "draw": {
          map.addInteraction(draw);
          map.addInteraction(snap);
          break;
        }
        case "modify": {
          map.addInteraction(select);
          map.addInteraction(modify);
          map.addInteraction(snap);
          break;
        }
        default: {
        }
      }
    }
    mode.addEventListener("change", onChange);
    onChange();
  },
};
</script>

<style>
</style>