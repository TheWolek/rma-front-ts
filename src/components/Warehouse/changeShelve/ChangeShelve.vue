<script setup lang="ts">
import { onMounted } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import ChangeShelveModal from "./modals/ChangeShelveModal.vue";
import ChangeActions from "./ChangeActions.vue";
import ChangeForm from "./ChangeForm.vue";

const store = useWarehouseStore();

onMounted(() => {
  store.fetchShelves();
});
</script>
<template>
  <ChangeShelveModal />
  <ChangeActions />
  <div class="warehouseItemsChangeShelve_wrap">
    <h1>Zmiana lokalizacji produktu</h1>
    <div class="warehouseItemsChangeShelve_content">
      <ChangeForm />
    </div>
  </div>
</template>
<style>
.warehouseItemsChangeShelve_wrap {
  padding: 0.5em;
}
.warehouseItemsChangeShelve_content {
  display: flex;
  gap: 16px;
}
</style>
