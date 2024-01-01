<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { TaskItem } from "@/stores/tasks/constants";

defineProps({
  item: {} as PropType<TaskItem>,
});
</script>
<template>
  <li>{{ item.barcode }}</li>
</template>
<style scoped>
li {
  color: var(--vt-c-black-mute);
  padding: 0.2em 0 0.2em 0.4em;
}
</style>
