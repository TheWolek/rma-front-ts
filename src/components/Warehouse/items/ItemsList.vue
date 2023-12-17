<script setup lang="ts">
import ItemCreateModal from "./modals/ItemCreateModal.vue";
</script>
<template>
  <ItemCreateModal />
  <div class="warehouseItems_wrap">
    <h1>Wszystkie zarejestrowane produkty</h1>
  </div>
</template>
<style>
.warehouseItems_wrap {
  padding: 0.5em;
}
</style>
