<template>
  <div class="tabs">
    <div class="tab-title">
      <template v-for="slot in $slots.default">
        <div
          :key="slot.data.attrs.index"
          :class="{active:$attrs.value==slot.data.attrs.index}"
          @click="handleTab(slot.data.attrs.index)"
        >{{slot.data.attrs.title}}</div>
      </template>
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      active: () => ({ val: this.$attrs.value }),
    };
  },
  methods: {
    handleTab(index) {
      this.$emit("input", index);
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs {
  background-color: #fff;
}
.tab-title {
  width: 100%;
  display: flex;
  background-color: inherit;
  border-bottom: 1px solid #ccc;
  & > div {
    font-size: 16px;
    display: inline-block;
    flex: 1;
    line-height: 32px;
    height: 32px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(191, 229, 255);
    }
  }
  .active {
    color: rgb(0, 183, 255);
    font-weight: bold;
    background-color: rgb(191, 229, 255);
  }
}
</style>