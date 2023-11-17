<script setup lang="ts">
import DateClock from "@/components/HomePage/DateClock.vue";
import TilesLinks from "@/components/HomePage/TilesLinks.vue";
import { ref } from "vue";

const linkList = ref([
  {
    link: "/rma",
    label: "RMA",
  },
  {
    link: "/warehouse",
    label: "warehouse",
  },
]);
</script>
<template>
  <main>
    <h1>System obsługi zgłoszeń serwisowych</h1>
    <DateClock />
    <TilesLinks :links="linkList" />
  </main>
</template>
<style scoped>
main {
  margin: 1em 5em;
}
h1 {
  color: var(--vt-c-black-mute);
}
</style>
