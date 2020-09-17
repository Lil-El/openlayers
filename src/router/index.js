import Vue from "vue";
import VueRouter from "vue-router";
import tyxx from "./modules/tyxx";
import demo from "./modules/demo";
import api from "./modules/api";
Vue.use(VueRouter);

export const routes = [...demo, ...tyxx, ...api];

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
