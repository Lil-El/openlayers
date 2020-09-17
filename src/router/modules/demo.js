export default [
  {
    path: "/",
    name: "1. 创建地图",
    component: () => import("../../views/FirstMap.vue"),
  },
  {
    path: "/ViewPosition",
    name: "2. View定位",
    component: () => import("../../views/ViewPosition"),
  },
  {
    path: "/ArcGISRESTFeatureService",
    name: "3. arcgis图层信息(xhr)",
    component: () => import("../../views/ArcGISRESTFeatureService"),
  },
  {
    path: "/ArcGISRESTwith512x512Tiles",
    name: "4. arcgis-Tile-512x512(xhr)",
    component: () => import("../../views/ArcGISRESTwith512x512Tiles"),
  },
  {
    path: "/Attributions",
    name: "5. Attributions",
    component: () => import("../../views/Attributions"),
  },
  {
    path: "/BingMaps",
    name: "6. BingMaps",
    component: () => import("../../views/BingMaps"),
  },
  {
    path: "/BoxSelection",
    name: "7. BoxSelection",
    component: () => import("../../views/BoxSelection"),
  },
  {
    path: "/WFS_GetFeature",
    name: "8. WFS_GetFeature",
    component: () => import("../../views/WFS_GetFeature"),
  },
];