<script setup lang="ts">
import { ref, computed } from "vue";
import router from "@/router";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import actions from "./actions";
import NextSteps from "./nextSteps";
import { storeToRefs } from "pinia";

const store = useRmaStore();
const dictStore = useDictionaryStore();

const {
  editMode,
  loadingRmaPage,
  rmaPage,
  shipmentModalActive,
  processModalActive,
  historyModalActive,
  rmaPageErrors,
  deviceAccessories,
} = storeToRefs(store);
const loading = ref(false);

const isWarehouseModule = JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE);

const isSparepartsModule =
  JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) &&
  JSON.parse(process.env.VUE_APP_MODULE_SPAREPARTS);

const isSaveBtnActive = computed(() => editMode.value && !loadingRmaPage.value);

const isEditBtnActive = computed(
  () => !dictStore.processes["Closed"].includes(rmaPage.value.status)
);

const isProcessBtnActive = computed(() => rmaPage.value.status === 5);

const isShipmentBtnActive = computed(
  () => !dictStore.processes["Closed"].includes(rmaPage.value.status)
);

const isBarcodeBtnActive = computed(() => rmaPage.value.barcodeURL !== null);

const isResult = computed(
  () => rmaPage.value.result_description !== null && store.actions.length !== 0
);

const editBtnIcon = computed(() =>
  editMode.value ? "cancel.svg" : "edit.svg"
);
const editBtnText = computed(() =>
  editMode.value ? "Anuluj edycję" : "Edytuj"
);
const editBtnWidth = computed(() => (editMode.value ? "130px" : "80px"));
const nextSteps = computed(NextSteps);

const onBack = () => {
  router.go(-1);
};

const validate = () => {
  store.clearRmaPageErrors();
  let good = true;
  if (
    !dictStore.processes["Closed"].includes(rmaPage.value.status) &&
    !dictStore.processes["New"].includes(rmaPage.value.status)
  ) {
    if (rmaPage.value.device_sn === "") {
      rmaPageErrors.value.sn = "Wpisz numer seryjny";
      good = false;
    }

    if (deviceAccessories.value.length === 0) {
      rmaPageErrors.value.accessories = "Wybierz akcesoria";
      good = false;
    }

    if (rmaPage.value.damage_type === null) {
      rmaPageErrors.value.damageType = "Uzupełnij stan techniczny";
      good = false;
    }

    if (rmaPage.value.diagnose === "" || rmaPage.value.diagnose === null) {
      rmaPageErrors.value.diagnose = "Uzupełnij diagnozę";
      good = false;
    }
  }

  if (dictStore.processes["AfterDiagnose"].includes(rmaPage.value.status)) {
    if (rmaPage.value.result_type === null) {
      rmaPageErrors.value.resultType = "Uzupełnij rezultat";
      good = false;
    }

    if (
      rmaPage.value.result_description === "" ||
      rmaPage.value.result_description === null
    ) {
      rmaPageErrors.value.resultDescription = "Uzupełnij rezultat";
      good = false;
    }

    if (store.actions.length === 0) {
      rmaPageErrors.value.actions = "Uzupełnij czynności";
      good = false;
    }
  }

  return good;
};

const onSave = () => {
  if (isSaveBtnActive.value) {
    if (validate()) {
      store.saveTicketData();
    }
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

const toggleHistoryModal = async () => {
  document.querySelector<HTMLElement>("#rma").style.overflow = "hidden";
  await store.fetchTicketHistory(rmaPage.value.ticket_id);
  historyModalActive.value = !historyModalActive.value;
  store.loadingRmaPage = false;
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
        width="90px"
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
      <ActionButton
        display="Wizyta u klienta"
        width="120px"
        :event="() => actions('visit')"
        v-if="nextSteps.includes('visit')"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actions.scss";
</style>
