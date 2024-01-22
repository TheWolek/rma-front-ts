<script setup lang="ts">
import { defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";
import WaybillRow from "./WaybillRow.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();

defineProps({
  withEdit: {
    type: Boolean,
    default: false,
  },
});

const { waybills } = storeToRefs(store);
</script>
<template>
  <table>
    <tr>
      <th>Numer listu</th>
      <th>Staus przesyłki</th>
      <th>Typ</th>
      <th>Data utworzenia</th>
      <th>Data zmiany statusu</th>
      <th v-if="withEdit" class="edit_col"></th>
    </tr>
    <WaybillRow
      v-for="waybill in waybills"
      :key="waybill.id"
      :data="waybill"
      :withEdit="withEdit"
    />
  </table>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

table {
  width: 100%;
}

.edit_col {
  width: 38px;
}
</style>
