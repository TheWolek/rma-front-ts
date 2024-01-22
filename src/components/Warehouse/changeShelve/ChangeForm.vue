<script setup lang="ts">
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import ChangeTable from "./ChangeTable.vue";

const store = useWarehouseStore();
const { changeShelveForm } = storeToRefs(store);
</script>
<template>
  <form id="changeShelveForm" @submit.prevent="">
    <div class="topBar">
      <TextInput
        id="activeShelve"
        label="Bieżąca lokalizajca"
        v-model="changeShelveForm.activeShelve"
        :disabled="true"
      />
      <TextInput
        id="newShelve"
        label="Docelowa lokalizacja"
        v-model="changeShelveForm.newShelve"
        :disabled="true"
      />
    </div>
    <div class="tableWrap">
      <ChangeTable />
    </div>
  </form>
</template>
<style scoped lang="scss">
#changeShelveForm {
  padding: 0;
  width: 90%;
}

.topBar {
  display: flex;
  gap: 2em;
}
</style>
