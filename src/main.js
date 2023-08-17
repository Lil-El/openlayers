import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";
import "ol/ol.css";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Tool from "./components/Tool.vue";
Vue.config.productionTip = false;

Vue.use({
  install: (Vue) => {
    Vue.component("Tool", Tool);
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
