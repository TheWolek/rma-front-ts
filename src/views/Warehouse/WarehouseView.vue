<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import DateClock from "../../components/HomePage/DateClock.vue";
import TilesLinks from "../../components/HomePage/TilesLinks.vue";
import WarehouseNav from "../../components/Warehouse/WarehouseNav.vue";
import { ref, computed } from "vue";

const sparepartsModuleActive =
  JSON.parse(process.env.VUE_APP_MODULE_SPAREPARTS) || false;

const linkList = ref([
  {
    link: "/warehouse/items",
    label: "Zarejestrowane produkty",
  },
  {
    link: "/warehouse/items/changeshelve",
    label: "Zmiana lokalizacji",
  },
  ...(sparepartsModuleActive
    ? [
        {
          link: "/warehouse/spareparts/orders",
          label: "Dostawy części",
        },
        {
          link: "/warehouse/spareparts",
          label: "Zarejestrowane części",
        },
      ]
    : []),
]);

const isDefaultView = computed(() => useRoute().name === "warehouse");
</script>
<template>
  <div id="warehouse">
    <WarehouseNav />
    <div class="dashboard" v-if="isDefaultView">
      <h1>System obsługi zgłoszeń serwisowych - Moduł Magazynu</h1>
      <DateClock />
      <TilesLinks :links="linkList" />
    </div>
    <RouterView name="innerView" v-if="!isDefaultView" />
  </div>
</template>
<style lang="scss">
#warehouse {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
}
#warehouse h1 {
  font-size: 1.15em;
  color: var(--vt-c-black-mute);
  margin-bottom: 0.3em;
  font-weight: 500;
}
</style>
