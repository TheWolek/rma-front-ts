<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";
import WaybillRow from "./WaybillRow.vue";

const store = useRmaStore();

defineProps({
  withEdit: {
    type: Boolean,
    default: false,
  },
});

const waybills = ref(store.waybills);
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
<style scoped>
table {
  width: 100%;
}

.edit_col {
  width: 6%;
}
</style>
