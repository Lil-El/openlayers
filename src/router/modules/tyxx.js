export default [
  {
    path: "/Basemap",
    name: "tyxx-1. 底图切换",
    component: () => import("../../views/Basemap"),
  },
  {
    path: "/Measure",
    name: "tyxx-2. 测距、测面等工具",
    component: () => import("../../views/Measure"),
  },
  {
    path: "/WMS",
    name: "tyxx-3. 加载WMS服务图层",
    component: () => import("../../views/WMS"),
  },
  {
    path: "/WFS",
    name: "tyxx-4. WFS空间查询",
    component: () => import("../../views/WFS"),
  },
];
