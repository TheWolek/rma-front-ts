<script setup lang="ts">
import { onMounted } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import FiltersModal from "./modals/FiltersModal.vue";
import RmaListActions from "./RmaListActions.vue";
import RmaFilters from "./RmaFilters.vue";
import RmaTable from "./RmaTable.vue";

const store = useRmaStore();
const storeDict = useDictionaryStore();
const statusesDict = storeDict.getDictionaryByName("statusesTypes");

onMounted(async () => {
  if (storeDict.checkIfEmpty("statusesTypes")) {
    await storeDict.fetchDictionary(statusesDict);
  }
});
</script>
<template>
  <FiltersModal v-if="store.filtersModalActive" />
  <RmaListActions />
  <div class="rmaList_wrap">
    <h1>Otwarte zgłoszenia serwisowe</h1>
    <RmaFilters />
    <RmaTable />
  </div>
</template>
