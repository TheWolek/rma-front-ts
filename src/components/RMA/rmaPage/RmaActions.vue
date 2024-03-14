<script setup lang="ts">
import { ref, computed } from "vue";
import router from "@/router";
import { useRmaStore } from "@/stores/RMA";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import actions from "./actions";
import NextSteps from "./nextSteps";
import { storeToRefs } from "pinia";

const store = useRmaStore();

const {
  editMode,
  loadingRmaPage,
  rmaPage,
  shipmentModalActive,
  processModalActive,
  historyModalActive,
} = storeToRefs(store);
const loading = ref(false);

const isWarehouseModule = JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE);

const isSparepartsModule =
  JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) &&
  JSON.parse(process.env.VUE_APP_MODULE_SPAREPARTS);

const isSaveBtnActive = computed(() => editMode.value && !loadingRmaPage.value);

const isEditBtnActive = computed(
  () => ![9, 10, 11].includes(rmaPage.value.status)
);

const isProcessBtnActive = computed(() => rmaPage.value.status === 5);

const isShipmentBtnActive = computed(
  () => ![10].includes(rmaPage.value.status)
);

const isBarcodeBtnActive = computed(() => rmaPage.value.barcodeURL !== null);

const isResult = computed(() => rmaPage.value.result_description !== null);

const editBtnIcon = computed(() =>
  editMode.value ? "cancel.svg" : "edit.svg"
);
const editBtnText = computed(() =>
  editMode.value ? "Anuluj edycję" : "Edytuj"
);
const editBtnWidth = computed(() => editMode.value ? "130px" : "80px");
const nextSteps = computed(NextSteps);

const onBack = () => {
  router.go(-1);
};

const onSave = () => {
  if (isSaveBtnActive.value) {
    store.saveTicketData();
    return;
  }
};

const onEdit = () => {
  if (isEditBtnActive.value) {
    if (!editMode.value) {
      store.editMode = !store.editMode;
    } else {
      router.go(0);
    }
  }
};

const onRefresh = () => {
  if (editMode.value) {
    onSave();
  } else {
    router.go(0);
  }
};

const toggleShipmentModal = () => {
  if (isShipmentBtnActive.value) {
    shipmentModalActive.value = !shipmentModalActive.value;
  }
};

const openBarcodeFile = () => {
  if (isBarcodeBtnActive.value) {
    window.open(
      `${process.env.VUE_APP_API_BASE_URL}${rmaPage.value.barcodeURL}`,
      "_blank"
    );
  }
};

const toggleProcessModal = () => {
  if (isProcessBtnActive.value) {
    processModalActive.value = !processModalActive.value;
  }
};

const toggleHistoryModal = () => {
  historyModalActive.value = !historyModalActive.value;
};
</script>
<template>
  <div class="actions rows">
    <div class="row">
      <ActionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
      <ActionButton
        :width="editBtnWidth"
        :event="onEdit"
        :display="editBtnText"
        :icon="editBtnIcon"
        :disabled="!isEditBtnActive"
      />
      <ActionButton
        display="Zapisz"
        :event="onSave"
        :icon="`save.svg`"
        :disabled="!isSaveBtnActive"
      />
      <ActionButton
        display="Przesyłka"
        width="100px"
        :event="toggleShipmentModal"
        :icon="`box.svg`"
        :disabled="!isShipmentBtnActive"
      />
      <ActionButton
        display="Kod QR"
        width="100px"
        :event="openBarcodeFile"
        :icon="`barcode.svg`"
        :disabled="!isBarcodeBtnActive"
      />
      <ActionButton
        v-if="isSparepartsModule"
        display="Procesuj"
        :event="toggleProcessModal"
        :icon="`gear.svg`"
        :disabled="!isProcessBtnActive"
      />
      <ActionButton
        display="Dziennik zdarzeń"
        width="150px"
        :event="toggleHistoryModal"
        :icon="`form.svg`"
      />
      <ActionButtonRefresh :event="onRefresh" :loading="loading" />
    </div>
    <div class="row" v-if="nextSteps.length > 0">
      <ActionButton
        display="Dodaj list"
        :event="() => actions('addWaybillIn')"
        v-if="nextSteps.includes('addWaybillIn')"
      />
      <ActionButton
        display="Do serwisu"
        width="95px"
        :event="() => actions('toService')"
        v-if="nextSteps.includes('toService')"
      />
      <ActionButton
        display="Odbierz"
        :event="() => actions('collect')"
        v-if="nextSteps.includes('collect')"
      />
      <ActionButton
        display="Do diagnozy"
        width="95px"
        :event="() => actions('toDiagnose')"
        v-if="nextSteps.includes('toDiagnose')"
      />
      <ActionButton
        display="Zleć kontakt"
        width="95px"
        :event="() => actions('contact')"
        v-if="nextSteps.includes('contact')"
      />
      <ActionButton
        display="Naprawa"
        :event="() => actions('repair')"
        v-if="nextSteps.includes('repair')"
      />
      <ActionButton
        display="Zakończone"
        width="90"
        :event="() => actions('endRepair')"
        :disabled="!isResult"
        v-if="nextSteps.includes('endRepair')"
      />
      <ActionButton
        display="Dodaj list"
        :event="() => actions('addWaybillOut')"
        v-if="nextSteps.includes('addWaybillOut')"
      />
      <ActionButton
        display="Do wysyłki"
        :event="() => actions('send')"
        v-if="nextSteps.includes('send')"
      />
      <ActionButton
        display="Do wysyłki anulowanych"
        width="180px"
        :event="() => actions('sendCanceled')"
        v-if="nextSteps.includes('sendCanceled')"
      />
      <ActionButton
        display="Zakończ"
        :event="() => actions('end')"
        v-if="!isWarehouseModule && nextSteps.includes('end')"
      />
      <ActionButton
        display="Anuluj"
        :event="() => actions('cancel')"
        v-if="nextSteps.includes('cancel')"
      />
      <ActionButton
        display="Anuluj"
        :event="() => actions('toCancel')"
        :disabled="!isResult"
        v-if="nextSteps.includes('toCancel')"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actions.scss";
</style>
