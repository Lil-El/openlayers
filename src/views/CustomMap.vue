<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
export default {
  mounted() {
    class OLComponent extends HTMLElement {
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "css/ol.css");
        this.shadow.appendChild(link);
        const style = document.createElement("style");
        style.innerText = `
          :host {
            display: block;
          }
        `;
        this.shadow.appendChild(style);
        const div = document.createElement("div");
        div.style.width = "100%";
        div.style.height = "100%";
        this.shadow.appendChild(div);

        this.map = new Map({
          target: div,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
        });
      }
    }

    window.customElements.define("ol-map", OLComponent);
  },
};
</script>

<style>
</style>