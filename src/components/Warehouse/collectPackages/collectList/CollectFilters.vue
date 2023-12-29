<script setup lang="ts">
import { useCollectStore } from "@/stores/collectPackages";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import { storeToRefs } from "pinia";

const store = useCollectStore();
const { filter } = storeToRefs(store);

const onSubmit = () => {
  store.fetchCollectListByFilters();
};
</script>
<template>
  <div class="filters">
    <InlineEditInput
      :disabled="false"
      id="refName"
      label="Numer zbiorczy"
      v-model="filter"
    />
    <ActionButton display="Szukaj" :event="onSubmit" />
  </div>
</template>
<style scoped>
.actionBtn {
  width: fit-content;
}

.filters .inlineEdit {
  width: 20%;
  align-items: center;
  grid-template-columns: auto 1fr 0;
}

.filters {
  display: flex;
  align-items: center;
}
</style>
