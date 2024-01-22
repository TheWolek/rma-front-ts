<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import RmaFilterChip from "./RmaFilterChip.vue";

const store = useRmaStore();

const { appliedFilter } = storeToRefs(store);

const clearAllFilters = () => {
  store.clearAllFilters();
  store.fetchTicketListByFilters();
};
</script>
<template>
  <div>
    <div class="filterWrap" :class="{ active: appliedFilter.active }">
      <div
        class="filterChip"
        @click="clearAllFilters"
        v-if="appliedFilter.active"
      >
        Wyczyść wszystkie
        <img src="@/assets/cancel.svg" />
      </div>
      <RmaFilterChip
        v-for="filter in appliedFilter.filters"
        :key="filter.name"
        :data="{ name: filter.name, value: filter.value }"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/filters.scss";

.filterWrap {
  opacity: 1;
}
</style>
