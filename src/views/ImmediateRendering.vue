<template>
  <div class="wrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Stamen from "ol/source/Stamen";
import TileLayer from "ol/layer/Tile";
import { Circle, Fill, Style } from "ol/style";
import { Map, View } from "ol/index";
import { Point } from "ol/geom";
import { getVectorContext } from "ol/render";
import { upAndDown } from "ol/easing";
import { useGeographic } from "ol/proj";
export default {
  mounted() {
    useGeographic();

    var layer = new TileLayer({
      source: new Stamen({
        layer: "toner",
      }),
    });

    var map = new Map({
      layers: [layer],
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    var image = new Circle({
      radius: 8,
      fill: new Fill({ color: "rgb(255, 153, 0)" }),
    });

    var style = new Style({
      image: image,
    });

    var n = 1000;
    var geometries = new Array(n);

    for (var i = 0; i < n; ++i) {
      var lon = 360 * Math.random() - 180;
      var lat = 180 * Math.random() - 90;
      geometries[i] = new Point([lon, lat]);
    }

    layer.on("postrender", function (event) {
      var vectorContext = getVectorContext(event);

      for (var i = 0; i < n; ++i) {
        var importance = upAndDown(Math.pow((n - i) / n, 0.15));
        if (importance < 0.1) {
          continue;
        }
        image.setOpacity(importance);
        image.setScale(importance);
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(geometries[i]);
      }

      var lon = 360 * Math.random() - 180;
      var lat = 180 * Math.random() - 90;
      geometries.push(new Point([lon, lat]));
      geometries.shift();
      map.render();
    });
  },
};
</script>

<style>
</style>