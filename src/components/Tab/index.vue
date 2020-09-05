<template>
  <div v-show="active().val == $attrs.index">
    <slot />
  </div>
</template>
<script>
export default {
  inject: ["active"],
};
</script>