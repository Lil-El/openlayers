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
    path: "/EarthquakesSymbols",
    name: "25. EarthquakesSymbols",
    component: () => import("../../views/EarthquakesSymbols"),
  },
  {
    path: "/EarthquakeHeatMap",
    name: "26. EarthquakeHeatMap",
    component: () => import("../../views/EarthquakeHeatMap"),
  },
  {
    path: "/EarthquakeClusters",
    name: "27. EarthquakeClusters",
    component: () => import("../../views/EarthquakeClusters"),
  },
  {
    path: "/EPSG4326",
    name: "28. EPSG4326",
    component: () => import("../../views/EPSG4326"),
  },
  {
    path: "/ExtentInteraction",
    name: "29. Extent Interaction",
    component: () => import("../../views/ExtentInteraction"),
  },
  {
    path: "/ExportPDF",
    name: "30. Export PDF",
    component: () => import("../../views/ExportPDF"),
  },
  {
    path: "/FreehandDrawing",
    name: "31. Freehand Drawing",
    component: () => import("../../views/FreehandDrawing"),
  },
  {
    path: "/FullScreen",
    name: "32. FullScreen",
    component: () => import("../../views/FullScreen"),
  },
  {
    path: "/Filtering features with WebGL",
    name: "33. Filtering features with WebGL",
    component: () => import("../../views/FilteringFeaturesWithWebGL"),
  },
  {
    path: "/Flight Animation",
    name: "34. Flight Animation",
    component: () => import("../../views/FlightAnimation"),
  },
  {
    path: "/Geographic Editing",
    name: "35. Geographic Editing",
    component: () => import("../../views/GeographicEditing"),
  },
  {
    path: "/GeoJSON",
    name: "36. GeoJSON",
    component: () => import("../../views/GeoJSON"),
  },
  {
    path: "/Hit Tolerance",
    name: "37. Hit Tolerance",
    component: () => import("../../views/HitTolerance"),
  },
  {
    path: "/High DPI WMTS",
    name: "38. High DPI WMTS",
    component: () => import("../../views/HighDPIWMTS"),
  },
  {
    path: "/Icon Colors",
    name: "39. Icon Colors",
    component: () => import("../../views/IconColors"),
  },
  {
    path: "/Image Reprojection",
    name: "40. Image Reprojection",
    component: () => import("../../views/ImageReprojection"),
  },
  {
    path: "/ImmediateRendering",
    name: "41. ImmediateRendering",
    component: () => import("../../views/ImmediateRendering"),
  },
  {
    path: "/WFS_GetFeature",
    name: "N. WFS_GetFeature",
    component: () => import("../../views/WFS_GetFeature"),
  },
];
