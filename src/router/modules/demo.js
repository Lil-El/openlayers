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
    path: "/CanvasTiles",
    name: "8. CanvasTiles",
    component: () => import("../../views/CanvasTiles"),
  },
  {
    path: "/ClusteredFeatures",
    name: "9. ClusteredFeatures",
    component: () => import("../../views/ClusteredFeatures"),
  },
  {
    path: "/ConstrainedExtent",
    name: "10. ConstrainedExtent",
    component: () => import("../../views/ConstrainedExtent"),
  },
  {
    path: "/CustomAnimation",
    name: "11. CustomAnimation",
    component: () => import("../../views/CustomAnimation"),
  },
  {
    path: "/WFS_GetFeature",
    name: "N. WFS_GetFeature",
    component: () => import("../../views/WFS_GetFeature"),
  },
];
