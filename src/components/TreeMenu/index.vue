<template>
  <div>
    <div v-for="data in item" :key="data.name">
      <router-link
        v-if="isSubMenu(data.children)"
        class="menu-item"
        :class="{active:data.path==$route.path||`/${data.path}`==$route.path}"
        :to="data.path"
      >{{data.name}}</router-link>
      <div v-else>
        <div>{{data.name}}</div>
        <Tree-Menu :item="data.children" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TreeMenu",
  props: ["item"],
  methods: {
    isSubMenu(child = []) {
      return child.length === 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-item {
  width: 100%;
  height: 46px;
  box-sizing: border-box;
  line-height: 46px;
  padding: 0 14px;
  display: inline-block;
  cursor: pointer;
  color: black;
  text-decoration: none;
  background-color: rgb(253, 253, 253);
  &:hover {
    background-color: rgb(191, 229, 255);
  }
}
.active {
  color: rgb(0, 153, 255);
  background-color: rgb(191, 229, 255);
}
</style>