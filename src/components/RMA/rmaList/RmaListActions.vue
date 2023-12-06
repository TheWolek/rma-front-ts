<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();
const { filtersModalActive, loadingRmaList } = storeToRefs(store);

const toggleFiltersModal = () => {
  filtersModalActive.value = !filtersModalActive.value;
};

const onRefresh = () => {
  store.fetchTicketListByFilters();
};
</script>
<template>
  <div class="actions">
    <ActionButton
      :event="toggleFiltersModal"
      display="Filtry"
      :icon="`filters.svg`"
    />
    <ActionButtonRefresh :event="onRefresh" :loading="loadingRmaList" />
  </div>
</template>
