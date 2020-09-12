import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "1. 创建地图",
    component: () => import("../views/FirstMap.vue"),
  },
  {
    path: "/ViewPosition",
    name: "2. View定位",
    component: () => import("../views/ViewPosition"),
  },
  {
    path: "/ArcGISRESTFeatureService",
    name: "3. arcgis图层信息(xhr)",
    component: () => import("../views/ArcGISRESTFeatureService"),
  },
  {
    path: "/ArcGISRESTwith512x512Tiles",
    name: "4. arcgis-Tile-512x512(xhr)",
    component: () => import("../views/ArcGISRESTwith512x512Tiles"),
  },
  {
    path: "/Attributions",
    name: "5. Attributions",
    component: () => import("../views/Attributions"),
  },
  {
    path: "/BingMaps",
    name: "6. BingMaps",
    component: () => import("../views/BingMaps"),
  },
  {
    path: "/Basemap",
    name: "tyxx-1. 底图切换",
    component: () => import("../views/Basemap"),
  },
  {
    path: "/Measure",
    name: "tyxx-2. 测距、测面等工具",
    component: () => import("../views/Measure"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: "*",
      component: () => import("../views/iFrame"),
    },
  ],
});

export default router;
