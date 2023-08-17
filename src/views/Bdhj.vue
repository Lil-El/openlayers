<template>
  <div class="wrap">
    <div id="map"></div>
    <tool id="info">
      <div @click="handleToggle">Raster Toggle</div>
    </tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { Map, View, Feature } from "ol";
import { transform } from "ol/proj";
import { Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource, XYZ, TileArcGISRest, ImageArcGISRest } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer } from "ol/layer";
import Polygon from "ol/geom/Polygon";
export default {
  components: { Tool },
  data () {
    return {
      baseMaps: {},
    };
  },
  mounted () {
    this.initOlMap();
  },
  methods: {
    createTileLayer (url) {
      let layer = new TileLayer({
        source: new XYZ({
          url,
        }),
      });
      return layer;
    },
    createImageLayer (url) {
      let layer = new ImageLayer({
        source: new ImageArcGISRest({
          url,
        }),
      });
      return layer;
    },
    initOlMap () {
      const layers = [
        // 天地图：地图
        this.createTileLayer("http://t" + Math.round(Math.random() * 7) + ".tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e1e9ac0ebd562e9bdf36dcc14f2ea60"),
        this.createTileLayer("http://t" + Math.round(Math.random() * 7) + ".tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6e1e9ac0ebd562e9bdf36dcc14f2ea60"),
        // ArcGis Map Server：Tile
        this.createTileLayer("https://portal.beidouhj.com/server/rest/services/Hosted/C6100002017111110145309_CaoJiaTan/MapServer/tile/{z}/{y}/{x}"),
        // ArcGis Map Server：Raster
        this.createImageLayer("https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer"),
      ]
      this.map = new Map({
        target: "map",
        layers,
        view: new View({
          projection: "EPSG:3857",
          center: [12238662.296594549, 4668694.871110548],
          zoom: 12,
        }),
      });
    //   this.map.on("pointermove", (evt) => {
    //     let coordinate = evt.coordinate;
    //   });
    },
    handleToggle() {
        const [RasterLayer] = this.map.getLayers().array_.filter(layer => layer instanceof ImageLayer)
        RasterLayer.setVisible(!RasterLayer.getVisible())
    }
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  flex: 1;

  #map {
    height: 100vh;
    width: 100%;
  }
}
</style>