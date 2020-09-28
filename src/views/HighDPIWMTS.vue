<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import { DEVICE_PIXEL_RATIO } from "ol/has";
export default {
  mounted() {
    var capabilitiesUrl =
      "https://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml";

    // HiDPI support:
    // * Use 'bmaphidpi' layer (pixel ratio 2) for device pixel ratio > 1
    // * Use 'geolandbasemap' layer (pixel ratio 1) for device pixel ratio == 1
    var hiDPI = DEVICE_PIXEL_RATIO > 1;
    var layer = hiDPI ? "bmaphidpi" : "geolandbasemap";
    var tilePixelRatio = hiDPI ? 2 : 1;

    var map = new Map({
      target: "map",
      view: new View({
        center: [1823849, 6143760],
        zoom: 11,
      }),
    });

    fetch(capabilitiesUrl)
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        var result = new WMTSCapabilities().read(text);
        var options = optionsFromCapabilities(result, {
          layer: layer,
          matrixSet: "google3857",
          style: "normal",
        });
        options.tilePixelRatio = tilePixelRatio;
        map.addLayer(
          new TileLayer({
            source: new WMTS(options),
          })
        );
      });
  },
};
</script>

<style>
</style>