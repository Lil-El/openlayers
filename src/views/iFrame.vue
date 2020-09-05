<template>
  <div :key="$route.path">
    <iframe
      id="frame"
      :src="`https://openlayers.org/en/latest/apidoc/${$route.path}`"
      height="100vh"
    ></iframe>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#frame {
  height: calc(100vh - 10px);
  width: calc(100vw - 300px);
  // position: absolute;
  // left: -180px;
  // z-index: -1;
}
</style>