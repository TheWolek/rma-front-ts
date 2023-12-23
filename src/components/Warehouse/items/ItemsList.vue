<script setup lang="ts">
import { onMounted } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import ItemCreateModal from "./modals/ItemCreateModal.vue";
import ItemsActions from "./ItemsActions.vue";
import ItemsTable from "./ItemsTable.vue";

const store = useWarehouseStore();

onMounted(() => {
  store.fetchShelves();
});
</script>
<template>
  <ItemCreateModal />
  <ItemsActions />
  <div class="warehouseItems_wrap">
    <h1>Wszystkie zarejestrowane produkty</h1>
    <ItemsTable />
  </div>
</template>
<style>
.warehouseItems_wrap {
  padding: 0.5em;
}
</style>
