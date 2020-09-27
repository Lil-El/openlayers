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
    path: "/CustomControl",
    name: "12. CustomControl",
    component: () => import("../../views/CustomControl"),
  },
  {
    path: "/CustomInteraction",
    name: "13. CustomInteraction",
    component: () => import("../../views/CustomInteraction"),
  },
  {
    path: "/CustomMap",
    name: "14. CustomMap-web component",
    component: () => import("../../views/CustomMap"),
  },
  {
    path: "/CustomOverviewMap",
    name: "15. CustomOverviewMap",
    component: () => import("../../views/CustomOverviewMap"),
  },
  {
    path: "/CustomPolygonStyle",
    name: "16. CustomPolygonStyle",
    component: () => import("../../views/CustomPolygonStyle"),
  },
  {
    path: "/CustomWMSTile",
    name: "17. CustomWMSTile-投影坐标转换",
    component: () => import("../../views/CustomWMSTile"),
  },
  {
    path: "/DragRotateZoom",
    name: "18. DragRotateZoom",
    component: () => import("../../views/DragRotateZoom"),
  },
  {
    path: "/Drag-and-Drop",
    name: "19. Drag-and-Drop",
    component: () => import("../../views/Drag-and-Drop"),
  },
  {
    path: "/Draw",
    name: "20. Draw",
    component: () => import("../../views/Draw"),
  },
  {
    path: "/DrawShapes",
    name: "21. DrawShapes",
    component: () => import("../../views/DrawShapes"),
  },
  {
    path: "/DrawModifyFeatures",
    name: "22. DrawModifyFeatures",
    component: () => import("../../views/DrawModifyFeatures"),
  },
  {
    path: "/DynamicData",
    name: "23. DynamicData",
    component: () => import("../../views/DynamicData"),
  },
  {
    path: "/EarthquakesKML",
    name: "24. EarthquakesKML",
    component: () => import("../../views/EarthquakesKML"),
  },
  {
    path: "/EarthquakeHeatMap",
    name: "25. EarthquakeHeatMap",
    component: () => import("../../views/EarthquakeHeatMap"),
  },
  {
    path: "/EarthquakeClusters",
    name: "26. EarthquakeClusters",
    component: () => import("../../views/EarthquakeClusters"),
  },
  {
    path: "/WFS_GetFeature",
    name: "N. WFS_GetFeature",
    component: () => import("../../views/WFS_GetFeature"),
  },
];
