<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { DictionaryItem } from "./constants";
import DictionaryRow from "./DictionaryRow.vue";

defineProps({
  data: Object as PropType<DictionaryItem[]>,
  name: String,
});
</script>
<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Nazwa</th>
    </tr>
    <DictionaryRow v-for="row in data" :key="row.id" :row="row" :name="name" />
  </table>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

table {
  width: 50%;
  margin: 0;
}

table tr th:nth-child(1),
table tr td:nth-child(1) {
  width: 34px;
}
</style>
