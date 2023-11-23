<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import router from "@/router";
import RmaHeader from "./RmaHeader.vue";
import DeviceSection from "./DeviceSection.vue";
import DiagnoseSection from "./DiagnoseSection.vue";
import OwnerDataSection from "./OwnerDataSection.vue";
import WaybillTable from "./WaybillTable.vue";
import ShipmentDataSection from "./ShipmentDataSection.vue";
import RmaActions from "./RmaActions.vue";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = useRmaStore();
const storeDict = useDictionaryStore();

const loading = ref(true);
const { editMode } = storeToRefs(store);

onMounted(async () => {
  if (isNaN(parseInt(String(route.params.id)))) {
    router.push({ name: "rma" });
    return;
  }
  if (!(await store.fetchTicketById(Number(route.params.id)))) {
    router.push({ name: "rma" });
    return;
  }

  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "accessoriesTypes")
  );
  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "damageTypes")
  );
  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "statusesTypes")
  );
  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "resultTypes")
  );
  await store.fetchTicketAccessories(Number(route.params.id));
  await store.fetchTicketWaybills(Number(route.params.id));

  loading.value = false;
});
</script>
<template>
  <div id="rmaPage">
    <h1 v-if="loading">LOADING...</h1>
    <div v-if="!loading">
      <RmaActions />
      <div class="rmaPage_wrap">
        <RmaHeader />
        <div class="rmaPage_wrap_details">
          <DeviceSection />
          <DiagnoseSection />
          <OwnerDataSection />
          <ShipmentDataSection />
          <div class="waybills">
            <h2>Historia listów przewozowych</h2>
            <div class="wrap">
              <WaybillTable :withEdit="editMode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
