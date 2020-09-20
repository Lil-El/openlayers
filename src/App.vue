<template>
  <div id="app">
    <div class="nav">
      <Tabs v-model="activeTab">
        <Tab index="Demo" title="Demo">
          <Tree-Menu class="list" :item="demo" />
        </Tab>
        <Tab index="API" title="API">
          <div class="list">
            <!-- <div> -->
            <input class="filter-input" type="text" v-model="filterKey" @input="handleFilter" />
            <!-- </div> -->
            <Tree-Menu :item="api" />
          </div>
        </Tab>
      </Tabs>
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from "@/router";
import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";
import TreeMenu from "@/components/TreeMenu";
import olapi from "@/utils/ol-api";
export default {
  components: { Tabs, Tab, TreeMenu },
  data() {
    return {
      activeTab: "Demo",
      demo: routes,
      api: olapi,
      filterKey: "",
    };
  },
  methods: {
    handleFilter() {
      if (!this.filterKey) {
        this.api = olapi;
        return void 0;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.api = olapi.filter((api) => {
          return api.name.includes(this.filterKey);
        });
      }, 500);
    },
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
}
.nav {
  width: 300px;
  height: 100vh;
  background-color: rgb(203, 214, 223);
  .list {
    height: calc(100vh - 53px);
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: skyblue;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ededed;
      border-radius: 8px;
    }
  }
}
.filter-input {
  width: 86%;
  height: 30px;
  border: 1px solid black;
  outline: none;
  padding: 2px 8px;
  margin: 4px 10px;
  font-size: 18px;
}
</style>
