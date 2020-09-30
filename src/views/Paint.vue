<template>
  <div class="wrap">
    <div id="map"></div>
    <tool>
      <div>Point标绘，其他暂未实现，原理一样</div>
      <div></div>
      <div>
        <ul>
          <li v-for="(p, i) in list" :key="p" @click="draw(i)">
            {{ i + 1 }}: {{ p }}
          </li>
        </ul>
      </div>
      <div>
        <h3>Point</h3>
        <div style="display: flex">
          <div>
            <span>Size</span>
            <div>
              <p @click="Point_opts.size = 16">16</p>
              <p @click="Point_opts.size = 32">32</p>
              <p @click="Point_opts.size = 64">64</p>
            </div>
          </div>
          <div>
            <span>PicUrl</span>
            <div>
              <p @click="Point_opts.picUrl = './point-red.png'">red</p>
              <p @click="Point_opts.picUrl = './point-blue.png'">blue</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>Polygon</span>
        <div>
          <span>Line</span>
          <ul>
            <li>solid</li>
            <li>dash</li>
            <li>dot</li>
          </ul>
        </div>
        <div>
          <span>Stoker</span>
          <ul>
            <li>red</li>
            <li>blue</li>
          </ul>
        </div>
        <div>
          <span>Fill</span>
          <ul>
            <li>red</li>
            <li>blue</li>
          </ul>
        </div>
      </div>
      <div>
        <span>标绘</span>
        <select v-model="PaintType">
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
        </select>
      </div>
      <div>
        <span @click="clear">清除</span>
      </div>
    </tool>
  </div>
</template>

<script>
import { unByKey } from "ol/Observable";
import { Map, View, Feature, Overlay } from "ol";
import { Point, LineString, Polygon } from "ol/geom";
import Draw, { createBox } from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
import { Style, Stroke, Fill, Icon } from "ol/style";
export default {
  data() {
    return {
      PaintType: "",
      Point_opts: {},
      Polygon_opts: {},
      list: [],
      MapClickHandlers: {},
    };
  },
  watch: {
    PaintType(newVal) {
      this.drawInteraction && this.map.removeInteraction(this.drawInteraction);
      if (!newVal) return void 0;
      this.toDraw(this.PaintType, (geometry) => {
        let { type, symbol } = this.addGeoToMap(geometry);
        let flag = window.confirm("保存？");
        // 模拟下面注释的
        this.list.push(
          JSON.stringify({
            type,
            symbol,
            position: geometry.flatCoordinates,
          })
        );
        // 提交标绘信息；并将其添加到Map当中，在addPlotToMap中添加popup
        // 如果是修改，就直接修改，走if；如果是添加就走else
        // this.$http.addPlot(this.activePoint).then(({ code, data }) => {
        //   if (code == 200) {
        //     if (this.activePoint.id) this.updPlotById(this.viewId, data);
        //     else {
        //       this.clearDrawPlotLayer();
        //       this.addPlotToMap(this.viewId, data);
        //     }
        //   }
        // });
        this.PaintType = "";
      });
    },
  },
  mounted() {
    this.map = new Map({
      target: "map",
      view: new View({ center: [0, 0], zoom: 3 }),
      layers: [new TileLayer({ source: new OSM() })],
    });
  },
  methods: {
    draw(i) {
      let info = JSON.parse(this.list[i]); // type symbol
      this.addPlotToMap(info, i);
    },
    clear() {
      this.drawInteraction && this.map.removeInteraction(this.drawInteraction);
      this.map.getLayers().forEach((layer) => {
        if (layer?.get("id") === "plotDrawLayer") {
          this.map.removeLayer(layer);
        }
        if (layer?.get("id") === "plotLayer") {
          this.map.removeLayer(layer);
        }
      });
    },
    async toDraw(type, callBack) {
      let map = this.map;
      let source = new VectorSource();
      let options = {
        source,
        type,
      };
      if (type === "Circle") {
        options.geometryFunction = createBox();
      }
      let vector = new VectorLayer({ source });
      this.drawInteraction = new Draw(options);
      this.drawInteraction.on("drawend", (ev) => {
        let geometry = ev.feature.getGeometry();
        callBack(geometry);
        map.removeInteraction(this.drawInteraction);
        map.removeLayer(vector);
      });
      map.addLayer(vector);
      map.addInteraction(this.drawInteraction);
    },
    createStyle(feature) {
      let symbol = feature.get("symbol");
      switch (feature.get("type")) {
        case "Point":
          return new Style({
            image: new Icon({
              src: symbol.picUrl,
              scale: (symbol.size / 32).toFixed(2),
            }),
          });
        case "LineString":
          let _lineStyle = {
            solid: [],
            dash: new Array(2).fill(symbol.width * 4),
            dot: [symbol.width, symbol.width * 4],
          };
          return new Style({
            stroke: new Stroke({
              width: symbol.width,
              color: symbol.color,
              lineDash: _lineStyle[symbol.style],
              lineDashOffset: 10,
            }),
          });
        case "Polygon":
          let _polyStyle = {
            solid: [],
            dash: new Array(2).fill(symbol.lineWidth * 4),
            dot: [symbol.lineWidth, symbol.lineWidth * 4],
          };
          return new Style({
            stroke: new Stroke({
              width: symbol.lineWidth,
              color: symbol.lineColor,
              lineDash: _polyStyle[symbol.lineStyle],
              lineDashOffset: 10,
            }),
            fill: new Fill({
              color: symbol.fillColor,
            }),
          });
      }
    },
    addGeoToMap(geometry) {
      var map = this.map;
      let { array_ } = map.getLayers();
      let geoType = this.PaintType;
      let [plotLayer] = array_.filter(
        (layer) => layer.get("id") === "plotDrawLayer"
      );
      if (!plotLayer) {
        plotLayer = new VectorLayer({
          id: "plotDrawLayer",
          source: new VectorSource(),
          style: (feature) => this.createStyle(feature),
        });
        map.addLayer(plotLayer);
      }
      let plotSource = plotLayer.getSource();
      let symbol = JSON.parse(JSON.stringify(this[geoType + "_opts"])) || {};
      plotSource.addFeature(
        new Feature({
          type: geoType,
          symbol,
          geometry,
        })
      );
      return { type: geoType, symbol };
    },
    addPlotToMap(obj, index) {
      let map = this.map;
      let { array_ } = map.getLayers();
      let plotView = map.getView();
      let [plotLayer] = array_.filter(
        (layer) => layer?.get("id") === "plotLayer"
      );
      let plotSource;
      if (!plotLayer) {
        plotSource = new VectorSource();
        plotLayer = new VectorLayer({
          id: "plotLayer",
          source: plotSource,
          style: (feature) => this.createStyle(feature),
        });
        map.addLayer(plotLayer);
        this.addPopupToFeature(map);
      } else {
        let plotFeatures = plotLayer.getSource().getFeatures();
        for (var i = 0; i < plotFeatures; i++) {
          let feature = plotFeatures[i];
          // 判断是否已经显示了，显示就提示已经存在
          if (feature.get("origin")?.id === obj.id) {
            plotView.fit(feature.getGeometry());
            console.log("本坐标已经存在！！");
            return;
          }
        }
      }

      this.MapClickHandlers[index] = ({ feature, content, popupTitle }) => {
        // 去创建dom元素，可以绑定事件监听
        // bar_edit.addEventListener("click", () => {
        //   editFunction(feature);
        //   this.closePopup();
        // });
        // bar_del.addEventListener("click", () => {
        //   delFunction(feature.get("origin")?.id);
        //   this.closePopup();
        // });
        console.log("click");
      };

      plotSource = plotLayer.getSource();
      let geoType = obj.type;

      let coordinates = obj.position.reduce((result, value, index) => {
        if (index % 2 !== 0) result[result.length - 1].push(value);
        else if (index % 2 === 0) result.push([value]);
        return result;
      }, []);
      let geoFeature = new Feature({
        _popup: true,
        type: obj.type,
        symbol: obj.symbol,
        index,
      });
      if (geoType == "Point") {
        geoFeature.setGeometry(new Point(...coordinates));
      } else if (geoType == "LineString") {
        geoFeature.setGeometry(new LineString(coordinates));
      } else if (geoType == "Polygon") {
        geoFeature.setGeometry(new Polygon([coordinates]));
      }
      plotSource.addFeature(geoFeature);
      plotView.fit(geoFeature.getGeometry(), {
        maxZoom: plotView.getZoom(),
        duration: 300,
      });
    },
    addPopupToFeature(map) {
      // 添加overlay
      let popup = document.getElementById("popup");
      if (!popup) {
        popup = this.createOverlayEle();
      }
      this.overlay = new Overlay({
        id: "Identify-Overlay",
        element: popup,
      });
      map.addOverlay(this.overlay);
      // 绑定点击事件，点击feature时，显示overlay；收集返回结果listener，在“清除”时，将绑定的事件取消监听
      this.identifyListener = map.on("singleclick", (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          // if (geometry.intersectsCoordinate(evt.coordinate)) { // 用这个就无法判断
          if (feature.get("_popup") === true) {
            this.overlay.setPosition(evt.coordinate);
            // Map统一使用一个click方法；所以多个函数，保存到MapClickHandlers当中
            let handler = this.MapClickHandlers[feature?.get("index")];
            if (handler && typeof handler === "function") {
              handler({ feature });
            } else {
              // todo smt
            }
          }
        });
      });
    },
    createElement(target, tag, classList = [], innerText) {
      let ele = document.createElement(tag);
      if (innerText) ele.innerText = innerText;
      classList.forEach((className) => {
        ele.classList.add(className);
      });
      target.appendChild(ele);
      return ele;
    },
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
    closePopup() {
      // 点击关闭时，暂时性的隐藏；在清除时去删除overlay
      this.overlay.setPosition(undefined);
    },
  },
};
</script>

<style>
</style>