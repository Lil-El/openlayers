<template>
  <div class="menu">
    <div v-for="(data,idx) in item" :key="`${data.name}${idx}`">
      <router-link
        v-if="isSubMenu(data.children)"
        class="menu-item"
        :class="{active:data.path==$route.path||`/${data.path}`==$route.path}"
        :style="`padding-left:${deep*10}px`"
        :to="data.path"
      >{{data.name}}</router-link>
      <div v-else>
        <div class="menu-sub-title" :style="`padding-left:${deep*10}px`">
          <span @click="handleShow">{{data.name}}</span>
          <span>
            <router-link :to="data.path">GO</router-link>
          </span>
        </div>
        <Tree-Menu class="tree-menu" :item="data.children" :deep="deep+1" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TreeMenu",
  props: {
    item: { type: Array },
    deep: { type: Number, default: 1 },
  },
  methods: {
    isSubMenu(child = []) {
      return child.length === 0;
    },
    handleShow(ev) {
      let par = ev.target.parentNode.parentNode;
      let flag = par.classList.contains("is-open");
      let tree = par.children[1];
      if (flag) {
        par.classList.remove("is-open");
        tree.style.height = "0px";
      } else {
        par.classList.add("is-open");
        tree.style.height = 46 * tree.children.length + "px";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pd-10 {
  padding-left: 10px;
}
.pd-20 {
  padding-left: 20px;
}
.menu {
  & > div {
    width: 100%;
  }
}
.menu-line {
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  line-height: 46px;
  display: inline-block;
  cursor: pointer;
  color: black;
  text-decoration: none;
  background-color: inherit;
}
.menu-item {
  @extend .menu-line;
  &:hover {
    background-color: rgb(191, 229, 255);
  }
}
.menu-sub-title {
  @extend .menu-line;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  background-color: #7fbddf;
}
.active {
  color: rgb(0, 153, 255);
  background-color: rgb(191, 229, 255);
}
.tree-menu {
  width: 100%;
  height: 0px;
  overflow: hidden;
  transition: 0.4s all ease-in-out;
}
.is-open {
  .menu-sub-title {
    background-color: #00e2ff;
  }
  .tree-menu {
    background-color: #dbfbff;
  }
}
</style>