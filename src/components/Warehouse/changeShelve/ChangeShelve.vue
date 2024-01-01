<script setup lang="ts">
import { onMounted } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import ChangeShelveModal from "./modals/ChangeShelveModal.vue";
import ChangeActions from "./ChangeActions.vue";
import ChangeForm from "./ChangeForm.vue";
import MoveTaskList from "./MoveTaskList.vue";
import { storeToRefs } from "pinia";

const store = useWarehouseStore();
const { taskListActive } = storeToRefs(store);

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
      <MoveTaskList v-if="taskListActive" />
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
