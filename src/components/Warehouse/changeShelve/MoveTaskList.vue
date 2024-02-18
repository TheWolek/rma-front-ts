<script setup lang="ts">
import MoveTaskItem from "./MoveTaskItem.vue";
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";

const store = useWarehouseStore();
const { taskList } = storeToRefs(store);
</script>
<template>
  <div class="moveTaskList">
    <h3>Lista przeniesienia</h3>
    <ul>
      <MoveTaskItem v-for="item in taskList" :key="item.item_id" :item="item" />
    </ul>
  </div>
</template>
<style lang="scss" scoped>
h3 {
  font-weight: bold;
}
.moveTaskList {
  width: 200px;
}
ul {
  list-style: decimal;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
