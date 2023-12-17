<script setup lang="ts">
import ItemsList from "@/components/Warehouse/items/ItemsList.vue";
</script>
<template>
  <div id="warehouseItems">
    <ItemsList />
  </div>
</template>
<style>
#warehouseItems {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
