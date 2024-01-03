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
  width: 8%;
}

/* table#changeShelve tr th:nth-child(2),
table#changeShelve tr td:nth-child(2) {
  width: 9%;
} */

table#changeShelve {
  width: 25%;
}
</style>
