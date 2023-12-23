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
        <th>ID zgłoszenia</th>
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
<style scoped>
.itemsTable table tr th:nth-child(1),
.itemsTable table tr td:nth-child(1) {
  width: 3%;
}

.itemsTable table tr th:nth-child(2),
.itemsTable table tr td:nth-child(2) {
  width: 7%;
  padding: 0.3em;
}

.itemsTable table tr th:nth-child(5),
.itemsTable table tr td:nth-child(5) {
  width: 10%;
}

.itemsTable table tr th:last-of-type,
.itemsTable table tr td:last-of-type {
  width: 4%;
}

.itemsTable table tr td:last-of-type {
  padding-left: 0px;
}
</style>
