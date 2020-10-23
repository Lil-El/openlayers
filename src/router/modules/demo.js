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
    path: "/LayerGroup",
    name: "42. LayerGroup",
    component: () => import("../../views/LayerGroup"),
  },
  {
    path: "/Resolution",
    name: "43. Min/Max Resolution",
    component: () => import("../../views/Resolution"),
  },
  {
    path: "/Spy",
    name: "44. Layer Spy",
    component: () => import("../../views/Spy"),
  },
  {
    path: "/Swipe",
    name: "45. Layer Swipe",
    component: () => import("../../views/Swipe"),
  },
  {
    path: "/ZoomLimits",
    name: "46. Layer Zoom Limits",
    component: () => import("../../views/ZoomLimits"),
  },
  {
    path: "/LineStringArrows",
    name: "47. LineString Arrows",
    component: () => import("../../views/LineStringArrows"),
  },
  {
    path: "/MapGraticule",
    name: "48. Map Graticule",
    component: () => import("../../views/MapGraticule"),
  },
  {
    path: "/Measure_Example",
    name: "49. Measure",
    component: () => import("../../views/Measure_Example"),
  },
  {
    path: "/ModifyFeatures",
    name: "50. Modify Features",
    component: () => import("../../views/ModifyFeatures"),
  },
  {
    path: "/MousePosition",
    name: "51. Mouse Position",
    component: () => import("../../views/MousePosition"),
  },
  {
    path: "/MoveendEvent",
    name: "52. Moveend Event",
    component: () => import("../../views/MoveendEvent"),
  },
  {
    path: "/NavigationControls",
    name: "53. Navigation Controls",
    component: () => import("../../views/NavigationControls"),
  },
  {
    path: "/MarkerAnimation",
    name: "54. Marker Animation",
    component: () => import("../../views/MarkerAnimation"),
  },
  {
    path: "/OverviewMapControl",
    name: "55. Overview Map Controln",
    component: () => import("../../views/OverviewMapControl"),
  },
  {
    path: "/PinchZoom",
    name: "56. Pinch Zoom",
    component: () => import("../../views/PinchZoom"),
  },
  {
    path: "/Reprojection",
    name: "57. Reprojection with EPSG.io Search",
    component: () => import("../../views/Reprojection"),
  },
  {
    path: "/ReusableSource",
    name: "58. Reusable Source",
    component: () => import("../../views/ReusableSource"),
  },
  {
    path: "/ScaleLine",
    name: "59. Scale Line",
    component: () => import("../../views/ScaleLine"),
  },
  {
    path: "/SelectFeatures",
    name: "60. Select Features",
    component: () => import("../../views/SelectFeatures"),
  },
  {
    path: "/SelectFeaturesHover",
    name: "61. Select Features By Hover",
    component: () => import("../../views/SelectFeaturesHover"),
  },
  {
    path: "/SelectFeaturesMultiple",
    name: "62. Select Features By Multiple",
    component: () => import("../../views/SelectFeaturesMultiple"),
  },
  {
    path: "/SmoothingLines",
    name: "63. Smoothing lines using Chaikins algorithm",
    component: () => import("../../views/SmoothingLines"),
  },
  {
    path: "/StamenTiles",
    name: "64. Stamen Tiles",
    component: () => import("../../views/StamenTiles"),
  },
  {
    path: "/SnapInteraction",
    name: "65. Snap Interaction",
    component: () => import("../../views/SnapInteraction"),
  },
  {
    path: "/WFS_GetFeature",
    name: "N. WFS_GetFeature",
    component: () => import("../../views/WFS_GetFeature"),
  },
];
