<template>
  <div class="wrap">
    <div id="map"></div>
    <tool id="info">
      <template v-if="!loading">
        <div @click="handleToggle('Subsidence')">沉降区影像Image Toggle</div>
        <div @click="handleToggle('Geological_Hazards')">地面塌陷Feature Toggle</div>
        <div @click="handleToggle('VectorProduct')">地形景观Feature Toggle</div>
      </template>
      <div v-else>加载中...</div>
    </tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { EsriJSON, GeoJSON, Feature as FeatureFormat } from "ol/format";
import { Map, View, Feature } from "ol";
import { Style, Icon, Fill, Stroke } from "ol/style";
import { transform } from "ol/proj";
import { OSM, Vector as VectorSource, XYZ, TileArcGISRest, ImageArcGISRest } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer } from "ol/layer";
export default {
  components: { Tool },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.initOlMap();
  },
  methods: {
    createTileLayer(url) {
      let layer = new TileLayer({
        source: new XYZ({
          url,
        }),
      });
      return layer;
    },
    createImageLayer(url, sourceParams = {}, id) {
      let layer = new ImageLayer({
        id,
        visible: false,
        zIndex: 10,
        source: new ImageArcGISRest({
          url,
          ...sourceParams,
        }),
      });
      layer.on("change:visible", (evt) => {
        this.loading = evt.oldValue == false;
      });
      layer.on("postrender", (evt) => {
        this.loading = false;
      });
      return layer;
    },
    createFeatureLayer(url, id) {
      const colorMap = {
        水浇地: "#FCEA9E",
        旱地: "#FFFBB1",
        乔木林地: "#31AD69",
        灌木林地: "#64B968",
        其他林地: "#97CFB2",
        其他草地: "#C8E3A0",
        商业服务业设施用地: "#E2A195",
        工业用地: "#C59A8C",
        采矿用地: "#C5828C",
        城镇住宅用地: "#E56766",
        农村宅基地: "#EC898A",
        公园与绿地: "#81C35D",
        机关团体新闻出版用地: "#F1A5B4",
        科教文卫用地: "#F1B3B4",
        特殊用地: "#C17261",
        铁路用地: "#D1C9D3",
        公路用地: "#CDD8C9",
        城镇村道路用地: "#DEDEDD",
        交通服务场站用地: "#AAA9A9",
        农村道路: "#C2C1C1",
        管道运输用地: "#EB7D87",
        湖泊水面: "#7DD2F5",
        水库水面: "#BFFFFF",
        坑塘水面: "#90AACF",
        沟渠: "#A0CDF0",
        水工建筑用地: "#E68264",
        空闲地: "#E1DCE1",
        设施农用地: "#DCB482",
        沙地: "#C8BEAA",
        裸土地: "#D7C8B9",
      };
      let layer = new VectorLayer({
        id,
        source: new VectorSource({
          format: new EsriJSON(),
          url,
        }),
        style: (feature) => {
          return new Style({
            fill: new Fill({
              color: colorMap[feature.get("ejlmc")],
            }),
          });
        },
      });
      layer.on("change:visible", (evt) => {
        this.loading = evt.oldValue == false;
      });
      layer.on("postrender", (evt) => {
        this.loading = false;
      });
      return layer;
    },
    initOlMap() {
      const layers = [
        // 天地图：地图
        this.createTileLayer(
          "http://t" +
            Math.round(Math.random() * 7) +
            ".tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6e1e9ac0ebd562e9bdf36dcc14f2ea60"
        ),
        this.createTileLayer(
          "http://t" +
            Math.round(Math.random() * 7) +
            ".tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=6e1e9ac0ebd562e9bdf36dcc14f2ea60"
        ),

        // 矿区地图：切片Tile(https://openlayers.org/en/latest/examples/arcgis-tiled.html)
        this.createTileLayer(
          "https://portal.beidouhj.com/server/rest/services/Hosted/C6100002017111110145309_CaoJiaTan/MapServer/tile/{z}/{y}/{x}"
        ),

        /**
         * ArcGis Map Server：ImageServer(https://openlayers.org/en/latest/examples/arcgis-image.html)
         * 对应ArcGis API的 ImageryLayer
         * 沉降区影像
         */
        this.createImageLayer(
          "https://portal.beidouhj.com/server/rest/services/Subsidence_t/ImageServer",
          {},
          "Subsidence"
        ),

        /**
         * ArcGis Map Server：Map Server - FeatureLayer - 矢量Vector(https://openlayers.org/en/latest/examples/vector-esri.html)
         * 对应ArcGis API的 MapImageLayer 或 FeatureLayer；公司使用的时MapImageLayer
         *
         * |  MapServer查询条件  |  对应的ol的format   |
         * |  f = pjson         |  format = EsriJSON  |
         * |  f = geojson       |  format = GeoJSON   |
         */
        /**
         * 弹窗展示数据实现方式：
         * 1. outFields=*；将所有的字段信息查询，并放在feature上，弹窗展示
         * 2. outFields=objectId；将objectId保存，在点击时通过objectId查询`outFields=* & returnGeometry=false & objectId=xx`
         */

        // 地面塌陷、地裂缝 Feature Layer 使用Feature方式加载：样式无法应用
        // this.createFeatureLayer( `https://portal.beidouhj.com/server/rest/services/Geological_Hazards/MapServer/1/query?f=pjson&outFields=*&where=${encodeURIComponent("dcpc like '2022年%' AND ksbm = 'C6100002017111110145309'")}`),
        // 使用ImageLayer方式加载，返回的是图片
        this.createImageLayer(
          `https://portal.beidouhj.com/server/rest/services/Geological_Hazards/MapServer`,
          {
            params: {
              layers: "show:1",
              layerDefs: JSON.stringify({
                "1": "dcpc like '2022年%' AND ksbm = 'C6100002017111110145309'",
              }),
            },
          },
          "Geological_Hazards"
        ),

        // 地形景观 FeatureLayer 使用Feature方式加载：手动添加样式
        this.createFeatureLayer(
          `https://portal.beidouhj.com/server/rest/services/2_%E6%A6%86%E5%8C%97_%E6%9B%B9%E5%AE%B6%E6%BB%A9/C6100002017111110145309_VectorProduct/MapServer/0/query?f=pjson&outFields=*&where=${encodeURIComponent(
            "dcpc like '2022年%' AND ksbm = 'C6100002017111110145309'"
          )}`,
          "VectorProduct"
        ),
        // 使用ImageLayer方式加载，返回的是图片
        // this.createImageLayer(
        //   `https://portal.beidouhj.com/server/rest/services/2_%E6%A6%86%E5%8C%97_%E6%9B%B9%E5%AE%B6%E6%BB%A9/C6100002017111110145309_VectorProduct/MapServer/`,
        //   {
        //     params: {
        //       layers: 'show:0',
        //       layerDefs: JSON.stringify({"0": "dcpc like '2022年%' AND ksbm = 'C6100002017111110145309'"})
        //     }
        //   },
        //   "VectorProduct"
        // ),
      ];
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
      this.map.on("click", (evt) => {
        this.map.forEachFeatureAtPixel(
          evt.pixel,
          f => {
            f.setStyle(
              new Style({
                fill: new Fill({
                  color: "#00FFFF",
                }),
              })
            );
            alert(JSON.stringify(f.values_));
          },
          {
            layerFilter: (layer) => {
              return true;
            },
          }
        );
      });
    },
    handleToggle(id) {
      const [layer] = this.map.getLayers().array_.filter((layer) => layer.get("id") == id);
      layer.setVisible(!layer.getVisible());
    },
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
