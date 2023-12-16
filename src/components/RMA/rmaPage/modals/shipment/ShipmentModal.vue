<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import BigModal from "@/components/parts/BigModal.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import WaybillTable from "../../WaybillTable.vue";
import AddWaybillModal from "./AddWaybillModal.vue";
import EditWaybillModal from "./EditWaybillModal.vue";

const store = useRmaStore();

const {
  shipmentModalActive,
  editWaybillModalActive,
  addWaybillModalActive,
  rmaPage,
} = storeToRefs(store);

const isAddActive = computed(
  () =>
    rmaPage.value.status <= 2 ||
    rmaPage.value.status === 8 ||
    rmaPage.value.status === 10
);

const toggleModal_shipment = () => {
  shipmentModalActive.value = !shipmentModalActive.value;
};

const toggleModal_addWaybill = () => {
  if (isAddActive.value) {
    addWaybillModalActive.value = !addWaybillModalActive.value;
  }
};
</script>
<template>
  <BigModal
    :modalActive="shipmentModalActive"
    :toggleAction="toggleModal_shipment"
    modalTitle="Zarządzanie przesyłkami do zlecenia"
  >
    <EditWaybillModal v-if="editWaybillModalActive" />
    <AddWaybillModal v-if="addWaybillModalActive" />
    <div class="tableWrap">
      <WaybillTable :withEdit="true" />
      <div class="addBtnWrap">
        <ActionButton
          :event="toggleModal_addWaybill"
          display="Dodaj"
          :icon="`add.svg`"
          :disabled="!isAddActive"
        />
      </div>
    </div>
  </BigModal>
</template>
<style scoped>
.tableWrap {
  padding: 0.5em 0.8em;
  width: 100%;
}

table {
  margin: 0;
}

.addBtnWrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
  margin-right: 0.5em;
}
</style>
