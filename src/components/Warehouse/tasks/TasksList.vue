<script setup lang="ts">
import { PropType, defineProps } from "vue";
import TaskTile from "./TaskTile.vue";
import { Task } from "@/stores/tasks/constants";

defineProps({
  list: Array as PropType<Task[]>,
});
</script>
<template>
  <div class="tasksList">
    <TaskTile v-for="item in list" :key="item.name" :item="item" />
  </div>
</template>
<style scoped>
.tasksList {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
