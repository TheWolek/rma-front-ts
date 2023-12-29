<script setup lang="ts">
import CollectTable from "./CollectTable.vue";
import CollectFilters from "./CollectFilters.vue";
</script>
<template>
  <div class="warehouseCollectPackagesList_wrap">
    <h1>Wszystkie odbiory paczek</h1>
    <CollectFilters />
    <CollectTable />
  </div>
</template>
<style>
.warehouseCollectPackagesList_wrap {
  padding: 0.5em;
}
</style>
