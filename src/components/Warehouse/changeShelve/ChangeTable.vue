<script setup lang="ts">
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import ChangeItemRow from "./ChangeItemRow.vue";
import ChangeNewItem from "./ChangeNewItem.vue";

const store = useWarehouseStore();

const { changeShelveItems } = storeToRefs(store);
</script>
<template>
  <table id="changeShelve">
    <tr>
      <th></th>
      <th>Kod kreskowy</th>
      <th>ID zgłoszenia</th>
      <th>Kategoria</th>
      <th>Model</th>
    </tr>
    <ChangeItemRow
      v-for="item in changeShelveItems"
      :key="item"
      :barcode="item"
    />
    <ChangeNewItem />
  </table>
</template>
<style scoped>
table#changeShelve tr th:nth-child(1),
table#changeShelve tr td:nth-child(1) {
  width: 2%;
}

table#changeShelve tr th:nth-child(3),
table#changeShelve tr td:nth-child(3) {
  width: 9%;
}

table#changeShelve tr th:nth-child(4),
table#changeShelve tr td:nth-child(4) {
  width: 25%;
}

table#changeShelve tr th:nth-child(5),
table#changeShelve tr td:nth-child(5) {
  width: 30%;
}

table#changeShelve {
  width: 80%;
}
</style>
