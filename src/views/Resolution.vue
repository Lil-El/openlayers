<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        resolution：在200-2000时展示OSM图层；在2000-20000时展示mapbox图层
      </div>
    </tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileJSON from "ol/source/TileJSON";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
export default {
  mounted() {
    this.map = new Map({
      target: "map",
      view: new View({ center: [653600, 5723680], zoom: 5 }),
      layers: [
        new TileLayer({
          source: new OSM(),
          minResolution: 200,
          maxResolution: 2000,
        }),
        new TileLayer({
          source: new TileJSON({
            url:
              "https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=pk.eyJ1IjoiZWxsaXNpb24iLCJhIjoiY2tkM2FvdmYzMTBvazJ6cDFrNGt4OXF6YiJ9.jnnV34kUMQc_wWnYl5SzDQ",
            crossOrigin: "anonymous",
          }),
          minResolution: 2000,
          maxResolution: 20000,
        }),
      ],
    });
  },
};
</script>

<style>
</style>