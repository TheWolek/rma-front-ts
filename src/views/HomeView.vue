<script setup lang="ts">
import { ref } from "vue";
import decodeToken from "@/helpers/decodeToken";
import DateClock from "@/components/HomePage/DateClock.vue";
import TilesLinks from "@/components/HomePage/TilesLinks.vue";

const { userRole } = decodeToken();
const warehouseModuleActive =
  JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;
const warehouseAvailable =
  warehouseModuleActive && ("Admin" === userRole || "LS" === userRole);

const linkList = ref([
  {
    link: "/rma",
    label: "RMA",
  },
  ...(warehouseAvailable
    ? [
        {
          link: "/warehouse",
          label: "warehouse",
        },
      ]
    : []),
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
