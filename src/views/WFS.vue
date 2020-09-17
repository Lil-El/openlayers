<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <video src="@/assets/wfs.mp4" width="400" controls></video>
      <div @click="identify('point')">点选</div>
      <div @click="identify('rectangle')">框选</div>
      <div @click="identify('polygon')">多边形</div>
      <div>先wms服务图片加载，然后选择，将geometry传给wfs，请求features，进行展示，并添加弹窗</div>
    </Tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { Map, View, Feature, Overlay } from "ol";
import { Style, Stroke } from "ol/style";
import Draw, { createBox } from "ol/interaction/Draw";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM, TileWMS } from "ol/source";
import { unByKey } from "ol/Observable";
import { GeoJSON, WFS } from "ol/format";
import { intersects as intersectsFilter } from "ol/format/filter";
export default {
  components: { Tool },
  mounted() {
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({ source: new OSM() }),
        new TileLayer({
          source: new TileWMS({
            url: "http://192.168.0.117:8081/geoserver/guotu/wms",
            params: {
              LAYERS: "guotu:csght",
              TILED: true,
              VERSION: "1.1.0",
              FORMAT: "image/png",
            },
            serverType: "geoserver",
            crossOrigin: "anonymous",
          }),
          opacity: 0.9,
          id: `dyn_wms`,
        }),
      ],
      view: new View({
        projection: "EPSG:4326",
        center: [117.73289858455101, 36.255126757404966],
        zoom: 12,
      }),
    });
  },
  methods: {
    identify(type) {
      this.listeners &&
        this.listeners.forEach((listener) => {
          unByKey(listener);
        });
      if (type === "point") {
        this.handlePoint();
      } else this.handlePolygon(type);
    },
    handlePoint() {
      let listener = this.map.on("click", () => {
        let point = new Point(evt.coordinate);
        this.fetchWFSService(point);
      });
      this.listeners.push(listener);
    },
    handleRolygon(type) {
      // 使用dragbox框选，然后将geometry传给wfs进行查询
      // drawend时，将Draw的interaction和layer删除
      let geometryFunction = createBox();
      let source = new VectorSource();
      let options = {
        source,
        type,
      };
      // 如果是矩形就要使用createBox；如果是多边形就不用（矩形和多边形就这点区别）
      // 矩形的type为Circle；多边形的type为Polygon
      if (type === this.GeometryType.CIRCLE)
        options.geometryFunction = createBox();
      let vector = new VectorLayer({ source });
      let drawBox = new Draw(options);
      let selected;
      drawBox.on("drawstart", (ev) => {
        selected = [];
      });
      drawBox.on("drawend", (ev) => {
        let geometry = ev.feature.getGeometry();
        this.fetchWFSService(geometry);

        this.map.removeInteraction(drawBox);
        this.map.removeLayer(vector);
      });
      this.map.addLayer(vector);
      this.map.addInteraction(drawBox);
    },

    async fetchWFSService(geometry) {
      let features;
      try {
        let featureRequest = new WFS().writeGetFeature({
          srsName: "EPSG:4326",
          featureNS: "http://guotu.com",
          featureTypes: ["guotu:csght"],
          outputFormat: "application/json",
          filter: intersectsFilter("the_geom", geometry),
        });
        /**
         * 请求wfs服务地址，post请求，body为序列化后的xml字符串；
         * 得到结果，读取为features
         */
        let data = await this.$http.queryDot(
          new XMLSerializer().serializeToString(featureRequest)
        );
        features = new GeoJSON().readFeatures(data);
      } catch (error) {
        console.log("查询出错");
      } finally {
        this.addResultToMap(features);
      }
    },
    addResultToMap(features) {
      let layer = new VectorLayer({
        id: "IdentifyLayer",
        visible: true,
        source: new VectorSource({
          features,
        }),
        style: new Style({
          stroke: new Stroke({
            color: "rgba(17, 215, 255, 1.0)",
            width: 3,
          }),
          fill: new Fill({
            color: "rgba(17, 215, 255, 0.3)",
          }),
        }),
      });
      this.map.addLayer(layer);
      this.addPopupToFeature();
    },
    closePopup() {
      // 点击popup的关闭时，暂时性的隐藏；在清除时去删除overlay
      this.overlay.setPosition(undefined);
    },
    addPopupToFeature() {
      // 添加overlay
      let popup = document.getElementById("popup");
      if (!popup) {
        popup = this.createOverlayEle();
      }
      this.overlay = new Overlay({
        id: "Identify-Overlay",
        element: popup,
      });
      this.map.addOverlay(this.overlay);
      this.listener = this.map.on("singleclick", (evt) => {
        // 在点击feature时显示overlay
        this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          let geometry = feature.getGeometry();
          if (geometry.intersectsCoordinate(evt.coordinate)) {
            this.overlay.setPosition(evt.coordinate);
            let popupTitle = document.getElementById("popup-title");
            popup.classList.remove("ol-popup-hidden"); //移除该类，让overlay显示
            // 为overlay添加数据
            let [content] = popup.getElementsByClassName("popup-content");
            content.innerHTML = null;
            for (const key in feature.values_) {
              let val = feature.values_[key];
              let tr = this.createElement(content, "tr");
              this.createElement(tr, "td", ["left"], key);
              this.createElement(tr, "td", ["right"], val);
            }
            popupTitle.innerText = "2020年城市规划图";
          }
        });
      });
    },
    /**
     * @param {Node} target 绑定的目标节点
     * @param {String} tag 节点-Tag
     * @param {String[]} classList 节点-classList
     * @param {any} innerText 节点-innerText
     */
    createElement(target, tag, classList = [], innerText) {
      let ele = document.createElement(tag);
      if (innerText) ele.innerText = innerText;
      classList.forEach((className) => {
        ele.classList.add(className);
      });
      target.appendChild(ele);
      return ele;
    },
    /**
     * @description 创建Overlay的Dom节点
     * @example
     *    <div id="popup" class="ol-popup ol-popup-hidden">
     *    <div class="popup-header">
     *      <span id="popup-title"></span>
     *      <i class="ol-popup-closer"></i>
     *    </div>
     *    <table class="popup-content">
     *      <tr>
     *        <td class="left"></td>
     *        <td class="right"></td>
     *      </tr>
     *    </table>
     *  </div>
     * @returns {Node} HTML-Element-Node
     */
    createOverlayEle() {
      let container = this.createElement(document.body, "div", [
        "ol-popup",
        "ol-popup-hidden",
      ]);
      container.setAttribute("id", "popup");
      container.innerHTML = `
        <div class="popup-header">
          <span id="popup-title"></span>
          <i class="ol-popup-closer"></i>
        </div>
        <table class="popup-content"></table>
      `;
      let i = container.getElementsByTagName("i")[0];
      i.addEventListener("click", this.closePopup);
      return container;
    },
    clearIdentifyLayer() {
      this.map.getLayers().forEach((layer) => {
        if (layer.get("id") === "IdentifyLayer") this.map.removeLayer(layer);
      });
      this.map.getOverlays().forEach((overlay) => {
        if (overlay?.id === "Identify-Overlay") this.map.removeOverlay(overlay);
      });
      this.listeners &&
        this.listeners.forEach((listene) => {
          unByKey(listene);
        });
    },
  },
};
</script>

<style>
</style>