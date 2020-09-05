<template>
  <div class="map-tool">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.map-tool {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 10;
  & > div {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(97, 97, 97);
    }
  }
}
</style>
