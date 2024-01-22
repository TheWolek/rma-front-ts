<script setup lang="ts">
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import ItemsRow from "./ItemsRow.vue";

const store = useWarehouseStore();
const { loadingItemsList, itemsList } = storeToRefs(store);
</script>
<template>
  <div class="itemsTable">
    <div class="loadingWrap" :class="{ active: loadingItemsList }">
      <LoadingDots />
    </div>
    <table>
      <tr>
        <th></th>
        <th>Kod kreskowy</th>
        <th>Kategoria</th>
        <th>Model</th>
        <th>Lokalizacja</th>
        <th>SN</th>
        <th>Akcje</th>
      </tr>
      <ItemsRow
        v-for="item in itemsList"
        :key="item.item_id.toString()"
        :data="item"
      />
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

.itemsTable table tr th,
.itemsTable table tr td {
  padding: 0.5em 0 0.5em 0.7em;
}

.itemsTable table tr th:nth-child(1),
.itemsTable table tr td:nth-child(1) {
  width: 32px;
}

.itemsTable table tr th:nth-child(2),
.itemsTable table tr td:nth-child(2) {
  width: 160px;
}

.itemsTable table tr th:nth-child(3),
.itemsTable table tr td:nth-child(3) {
  width: 185px;
}

.itemsTable table tr th:nth-child(4),
.itemsTable table tr td:nth-child(4) {
  width: 210px;
}

.itemsTable table tr th:nth-child(5),
.itemsTable table tr td:nth-child(5) {
  width: 180px;
}

.itemsTable table tr th:nth-child(6),
.itemsTable table tr td:nth-child(6) {
  width: 180px;
}

.itemsTable table tr th:last-of-type,
.itemsTable table tr td:last-of-type {
  width: 52px;
}

.itemsTable .actionCell {
  padding: 0;
}
</style>
