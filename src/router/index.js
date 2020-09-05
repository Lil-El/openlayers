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
