<script setup lang="ts">
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";

const store = useWarehouseStore();
const { loadingItemsList, filters } = storeToRefs(store);

const toggleNewModal = () => {
  store.createModalActive = true;
};

const onRefresh = () => {
  store.fetchByFilters();
};
</script>
<template>
  <div class="actions">
    <ActionButton :event="toggleNewModal" display="Dodaj" :icon="`add.svg`" />
    <form @submit.prevent="">
      <InlineEditInput
        id="barcode"
        label="kod kreskowy"
        v-model="filters.barcode"
        :disabled="false"
      />
      <InlineEditInput
        id="shevle"
        label="Kod lokalizacji"
        v-model="filters.shelve"
        :disabled="false"
      />
      <ActionButtonRefresh :event="onRefresh" :loading="loadingItemsList" />
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actions.scss";

.inlineEdit:nth-of-type(1),
.inlineEdit:nth-of-type(2) {
  width: 400px;
}

.inlineEdit + .inlineEdit {
  margin-top: 0;
}
</style>
