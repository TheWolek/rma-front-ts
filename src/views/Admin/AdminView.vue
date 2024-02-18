<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import AdminNav from "../../components/Admin/AdminNav.vue";
import DateClock from "@/components/HomePage/DateClock.vue";
import TilesLinks from "@/components/HomePage/TilesLinks.vue";

const linkList = ref([
  {
    link: "/admin/users",
    label: "Wszyscy użytkownicy",
  },
]);

const isDefaultView = computed(() => useRoute().name === "admin");
</script>
<template>
  <div id="adminPanel">
    <AdminNav />
    <div class="dashboard" v-if="isDefaultView">
      <h1>System obsługi zgłoszeń serwisowych - Panel Admina</h1>
      <DateClock />
      <TilesLinks :links="linkList" />
    </div>
    <RouterView name="innerView" v-if="!isDefaultView" />
  </div>
</template>
<style lang="scss">
#adminPanel {
  display: grid;
  grid-template-columns: 10% 1fr;
  overflow: hidden;
  height: calc(100vh - 5vh);
  overflow-y: scroll;
}
.dashboard {
  margin: 1em;
}

#adminPanel h1 {
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
