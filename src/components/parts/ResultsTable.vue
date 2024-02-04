<script setup lang="ts">
import { defineProps } from "vue";
import LoadingDots from "./LoadingDots.vue";

defineProps({
  loading: Boolean,
});
</script>
<template>
  <div class="tableWrap">
    <div class="loadingWrap" :class="{ active: loading }">
      <LoadingDots :active="loading" />
    </div>
    <table>
      <slot name="theader"></slot>
      <slot name="tbody"></slot>
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";
</style>
