<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { DictionaryItem } from "./constants";
import DictionaryRow from "./DictionaryRow.vue";

defineProps({
  data: Object as PropType<DictionaryItem[]>,
  tableHeaders: Array as PropType<string[]>,
  name: String,
});
</script>
<template>
  <table>
    <tr>
      <th v-for="el in this.tableHeaders" :key="el">{{ el }}</th>
      <DictionaryRow
        v-for="row in data"
        :key="row.id"
        :row="row"
        :name="name"
      />
    </tr>
  </table>
</template>
<style scoped>
table {
  width: 50%;
  margin: 0;
}

table tr th:nth-child(1),
table tr td:nth-child(1) {
  width: 10%;
}
</style>
