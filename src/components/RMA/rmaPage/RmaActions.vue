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

const { editMode, saving, rmaPage, shipmentModalActive, processModalActive } =
  storeToRefs(store);
const loading = ref(false);

const isSaveBtnActive = computed(() => editMode.value && saving.value);
const isEditBtnActive = computed(() => ![9, 11].includes(rmaPage.value.status));
const isProcessBtnActive = computed(() => rmaPage.value.status === 5);
const editBtnIcon = computed(() =>
  editMode.value ? "cancel.svg" : "edit.svg"
);
const editBtnText = computed(() =>
  editMode.value ? "Anuluj edycję" : "Edytuj"
);
const nextSteps = computed(NextSteps);

const onBack = () => {
  router.go(-1);
};

const onSave = () => {
  if (!isSaveBtnActive.value) {
    return;
  }
};

const onEdit = () => {
  if (!editMode.value) {
    store.editMode = !store.editMode;
  } else {
    router.go(0);
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
  shipmentModalActive.value = !shipmentModalActive.value;
};

const toggleProcessModal = () => {
  processModalActive.value = !processModalActive.value;
};

const toggleHistoryModal = () => {
  console.log("to do history");
};
</script>
<template>
  <div class="actions rows">
    <div class="row">
      <ActionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
      <ActionButton
        :event="onEdit"
        :display="editBtnText"
        :icon="editBtnIcon"
        :disabled="!isEditBtnActive"
      />
      <ActionButton
        :event="onSave"
        display="Zapisz"
        :icon="`save.svg`"
        :disabled="!isSaveBtnActive"
      />
      <ActionButton
        :event="toggleShipmentModal"
        display="Przesyłka"
        :icon="`box.svg`"
      />
      <ActionButton
        :event="toggleProcessModal"
        display="Procesuj"
        :icon="`gear.svg`"
        :disabled="!isProcessBtnActive"
      />
      <ActionButton
        :event="toggleHistoryModal"
        display="Dziennik zdarzeń"
        :icon="`form.svg`"
      />
      <ActionButtonRefresh :event="onRefresh" :loading="loading" />
    </div>
    <div class="row" v-if="nextSteps.length > 0">
      <ActionButton
        display="Dodaj list (In)"
        :event="() => actions('addWaybillIn')"
        v-if="nextSteps.includes('addWaybillIn')"
      />
      <ActionButton
        display="Do serwisu"
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
        :event="() => actions('toDiagnose')"
        v-if="nextSteps.includes('toDiagnose')"
      />
      <ActionButton
        display="Zleć kontakt"
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
        :event="() => actions('endRepair')"
        v-if="nextSteps.includes('endRepair')"
      />
      <ActionButton
        display="Dodaj list (out)"
        :event="() => actions('addWaybillOut')"
        v-if="nextSteps.includes('addWaybillOut')"
      />
      <ActionButton
        display="Wyślij (1)"
        :event="() => actions('send')"
        v-if="nextSteps.includes('send')"
      />
      <ActionButton
        display="Wyślij (2)"
        :event="() => actions('sendCanceled')"
        v-if="nextSteps.includes('sendCanceled')"
      />
      <ActionButton
        display="Anuluj (1)"
        :event="() => actions('cancel')"
        v-if="nextSteps.includes('cancel')"
      />
      <ActionButton
        display="Anuluj (2)"
        :event="() => actions('toCancel')"
        v-if="nextSteps.includes('toCancel')"
      />
    </div>
  </div>
</template>