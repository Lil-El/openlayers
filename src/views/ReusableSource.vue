<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>
        <button class="switcher" value="0">January</button>
        <button class="switcher" value="1">January (with bathymetry)</button>
        <button class="switcher" value="2">July</button>
        <button class="switcher" value="3">July (with bathymetry)</button>
      </div>
    </tool>
  </div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
export default {
  mounted() {
    var key =
      "pk.eyJ1IjoiZWxsaXNpb24iLCJhIjoiY2tkM2FvdmYzMTBvazJ6cDFrNGt4OXF6YiJ9.jnnV34kUMQc_wWnYl5SzDQ";
    var baseUrl = "https://{a-c}.tiles.mapbox.com/v4";
    var urls = [
      baseUrl +
        "/mapbox.blue-marble-topo-jan/{z}/{x}/{y}.png?access_token=" +
        key,
      baseUrl +
        "/mapbox.blue-marble-topo-bathy-jan/{z}/{x}/{y}.png?access_token=" +
        key,
      baseUrl +
        "/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png?access_token=" +
        key,
      baseUrl +
        "/mapbox.blue-marble-topo-bathy-jul/{z}/{x}/{y}.png?access_token=" +
        key,
    ];
    var source = new XYZ();

    var map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    function updateUrl(index) {
      source.setUrl(urls[index]);
    }

    this.$nextTick(() => {
      var buttons = document.getElementsByClassName("switcher");
      for (var i = 0, ii = buttons.length; i < ii; ++i) {
        var button = buttons[i];
        button.addEventListener(
          "click",
          updateUrl.bind(null, Number(button.value))
        );
      }
    });

    updateUrl(0);
  },
};
</script>

<style>
</style>