<script setup lang="ts">
import { onMounted } from "vue";
import FiltersModal from "./modals/FiltersModal.vue";
import RmaListActions from "./RmaListActions.vue";
import RmaFilters from "./RmaFilters.vue";
import RmaTable from "./RmaTable.vue";
import { useDictionaryStore } from "@/stores/dictionary";
import { useRmaStore } from "@/stores/RMA";

const store = useRmaStore();
const storeDict = useDictionaryStore();
const accessoriesDict = storeDict.getDictionaryByName("statusesTypes");

onMounted(async () => {
  await storeDict.fetchDictionary(accessoriesDict);
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
