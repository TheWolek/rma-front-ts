<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import { defineProps, PropType, computed } from "vue";
import { Filter } from "@/stores/RMA/constants";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const props = defineProps({
  data: {} as PropType<Filter>,
});

const getDisplayName = computed(() => {
  if (props.data.name === "status") {
    return storeDict
      .getDictionaryByName("statusesTypes")
      .items.find((item) => item.id.toString() === props.data.value)?.name;
  }

  if (props.data.name === "typ") {
    return props.data.value === "1" ? "Gwarancja" : "płatne";
  }

  return props.data.value;
});

const deleteFilter = () => {
  store.clearFilter(props.data);
  store.fetchTicketListByFilters();
};
</script>
<template>
  <div class="filter">
    <p>{{ data.name }}:</p>
    <div class="filterChip" @click="deleteFilter">
      {{ getDisplayName }}
      <img src="@/assets/cancel.svg" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/filters.scss";

.filter {
  display: flex;
}

.filter p {
  color: var(--vt-c-black-mute);
  margin-right: 0.6em;
}
</style>
