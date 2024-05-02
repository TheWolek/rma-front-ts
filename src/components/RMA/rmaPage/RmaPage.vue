<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import { useDictionaryStore } from "@/stores/dictionary";
import router from "@/router";
import RmaHeader from "./components/sections/RmaHeader.vue";
import DeviceSection from "./components/sections/DeviceSection.vue";
import DiagnoseSection from "./components/sections/DiagnoseSection.vue";
import OwnerDataSection from "./components/sections/OwnerDataSection.vue";
import WaybillTable from "./components/sections/shipment/WaybillTable.vue";
import ShipmentDataSection from "./components/sections/shipment/ShipmentDataSection.vue";
import RmaActions from "./components/actions/RmaActions.vue";
import ShipmentModal from "./modals/shipment/ShipmentModal.vue";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import SnackBar from "@/components/parts/SnackBar.vue";
import HistoryModal from "./modals/history/HistoryModal.vue";

const route = useRoute();
const store = useRmaStore();
const storeDict = useDictionaryStore();

const { editMode, loadingRmaPage, rmaPage } = storeToRefs(store);

onMounted(async () => {
  if (isNaN(parseInt(String(route.params.id)))) {
    router.push({ name: "rma" });
    return;
  }
  if (!(await store.fetchTicketById(Number(route.params.id)))) {
    router.push({ name: "rma" });
    return;
  }

  if (storeDict.checkIfEmpty("accessoriesTypes")) {
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
  }

  await store.fetchTicketAccessories(Number(route.params.id));
  await store.fetchTicketActions(Number(route.params.id));
  if (store.actionsTotalPrice > 0) {
    await store.fetchTicketFv(Number(route.params.id));
  }
  await store.fetchTicketWaybills(Number(route.params.id));

  loadingRmaPage.value = false;

  if (rmaPage.value.status === 12) {
    store.showSnackBar({
      text: "Zgłoszenie wymaga dodatkowych danych",
      color: "Info",
      icon: "form.svg",
    });
  }
});
</script>
<template>
  <div id="rmaPage">
    <SnackBar />
    <div class="loadingWrap" v-if="loadingRmaPage">
      <LoadingDots :active="loadingRmaPage" />
    </div>
    <div v-if="!loadingRmaPage">
      <ShipmentModal />
      <HistoryModal />
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
            <div class="sectionWrap">
              <WaybillTable :withEdit="editMode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loadingWrap {
  position: relative;
  display: block;
  width: 100%;
  height: calc(100vh - 10vh);
}
</style>
