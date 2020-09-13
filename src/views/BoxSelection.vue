<template>
  <div class="wrap">
    <div id="map"></div>
    <Tool>
      <div>
        <span>{{location}}</span>
      </div>
    </Tool>
  </div>
</template>

<script>
import Tool from "@/components/Tool";
import { Stroke, Style } from "ol/style";
import { Map, View, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { GeoJSON } from "ol/format";
import { OSM, Vector as VectorSource } from "ol/source";
import { DragBox, Select } from "ol/interaction";
import { platformModifierKeyOnly } from "ol/events/condition";
export default {
  components: { Tool },
  data() {
    return {
      location: "",
    };
  },
  mounted() {
    let vectorSource = new VectorSource({
      url:
        "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
      format: new GeoJSON(),
    });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      target: "map",
      view: new View({
        center: [130, 36],
        zoom: 3,
        constrainRotation: 16, //约束旋转角度为0，90,180,270
        rotation: Math.PI / 6, //初识旋转角度；如果是30度，只是0度
      }),
    });
    let select = new Select();
    this.map.addInteraction(select);
    let selectFeatures = select.getFeatures();

    let dragbox = new DragBox({
      condition: platformModifierKeyOnly,
    });
    this.map.addInteraction(dragbox);

    dragbox.on("boxend", () => {
      let rotation = this.map.getView().getRotation();
      let oblique = rotation % (Math.PI / 2) !== 0;

      let candidateFeatures = oblique ? [] : selectFeatures;
      let extent = dragbox.getGeometry().getExtent();
      vectorSource.forEachFeatureIntersectingExtent(extent, (feature) => {
        candidateFeatures.push(feature);
      });
      if (oblique) {
        let anchor = [0, 0];
        let geometry = dragbox.getGeometry().clone(); // 框选的区域的几何
        geometry.rotate(-rotation, anchor); //将框选的区域，也进行旋转
        let extent$1 = geometry.getExtent();
        // 这里是为了查看旋转后的样子
        this.map.addLayer(
          new VectorLayer({
            source: new VectorSource({
              features: [
                new Feature({
                  geometry,
                }),
              ],
            }),
            style: new Style({
              stroke: new Stroke({
                color: "rgba(0, 153, 255, 1)",
                width: 3,
              }),
            }),
          })
        );
        candidateFeatures.forEach((feature) => {
          // 遍历选中的每一个feature
          let geometry = feature.getGeometry().clone();
          geometry.rotate(-rotation, anchor); // 将feature旋转
          if (geometry.intersectsExtent(extent$1)) selectFeatures.push(feature); // 判断旋转后的是否穿过了旋转后的框选区域
        });
      }
    });

    dragbox.on("boxstart", () => {
      selectFeatures.clear();
    });

    selectFeatures.on(["add", "remove"], () => {
      let names = selectFeatures.getArray().map((feature) => {
        return feature.get("name");
      });
      if (names.length > 0) {
        this.location = names.join(", ");
      } else {
        this.location = "No selected";
      }
    });
  },
  methods: {},
};
</script>
