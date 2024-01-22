<script setup lang="ts">
import router from "@/router";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";

const store = useRmaStore();
const { filtersModalActive, loadingRmaList } = storeToRefs(store);

const toggleFiltersModal = () => {
  filtersModalActive.value = !filtersModalActive.value;
};

const redirectToAddPage = () => {
  router.push({
    name: "rmaAdd",
  });
};

const onRefresh = () => {
  store.fetchTicketListByFilters();
};
</script>
<template>
  <div class="actions">
    <ActionButton :event="redirectToAddPage" display="Nowy" :icon="`add.svg`" />
    <ActionButton
      :event="toggleFiltersModal"
      display="Filtry"
      :icon="`filters.svg`"
    />
    <ActionButtonRefresh :event="onRefresh" :loading="loadingRmaList" />
  </div>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/actions.scss";
</style>
