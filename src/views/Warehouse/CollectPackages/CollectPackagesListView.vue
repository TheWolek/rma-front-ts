<script setup lang="ts">
import CollectPackagesList from "@/components/Warehouse/collectPackages/collectList/CollectPackagesList.vue";
</script>
<template>
  <div id="warehouseCollectPackagesList">
    <CollectPackagesList />
  </div>
</template>
<style lang="scss">
#warehouseCollectPackagesList {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
