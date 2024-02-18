<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import RmaNav from "@/components/RMA/RmaNav.vue";
import DateClock from "@/components/HomePage/DateClock.vue";
import TilesLinks from "@/components/HomePage/TilesLinks.vue";
import { ref, computed } from "vue";

const linkList = ref([
  {
    link: "/rma/add",
    label: "Dodaj nowe zgłoszenie",
  },
  {
    link: "/rma/items",
    label: "Otwarte zgłoszenia",
  },
]);

const isDefaultView = computed(() => useRoute().name === "rma");
</script>
<template>
  <div id="rma">
    <RmaNav />
    <div class="dashboard" v-if="isDefaultView">
      <h1>System obsługi zgłoszeń serwisowych - Moduł RMA</h1>
      <DateClock />
      <TilesLinks :links="linkList" />
    </div>
    <RouterView name="innerView" v-if="!isDefaultView" />
  </div>
</template>
<style lang="scss">
#rma {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
  overflow-y: scroll;
}
.dashboard {
  margin: 1em;
}

#rma h1 {
  font-size: 1.15em;
  color: var(--vt-c-black-mute);
  margin-bottom: 0.3em;
  font-weight: 500;
}
.dashboard h1 {
  font-size: 1.3em;
  margin: 0;
  font-weight: normal !important;
}
</style>
