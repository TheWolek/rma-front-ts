<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import SmallModal from "@/components/parts/SmallModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";

const store = useRmaStore();
const { editWaybillModalActive, waybillEditData } = storeToRefs(store);

const error_waybill = ref("");

const isEditActive = computed(
  () => waybillEditData.value.status === "potwierdzony"
);

const toggleModal_editWaybill = () => {
  store.toggleModal_editWaybill(false);
};

const onSubmit = () => {
  store.editWaybill(waybillEditData.value);
};
</script>
<template>
  <SmallModal
    :modalActive="editWaybillModalActive"
    :toggleAction="toggleModal_editWaybill"
    modalTitle="Edycja listu"
  >
    <form v-on:submit.prevent="onSubmit">
      <TextInput
        id="waybill"
        label="Numer listu"
        v-model="waybillEditData.waybill_number"
        :error="error_waybill"
        :disabled="!isEditActive"
      />

      <SelectInput
        id="status"
        label="Status"
        v-model="waybillEditData.status"
        :display="true"
      >
        <option value="potwierdzony">Potwierdzony</option>
        <option value="odebrany">Odebrany</option>
        <option value="anulowany">Anulowany</option>
      </SelectInput>

      <SelectInput
        id="type"
        label="Typ"
        v-model="waybillEditData.type"
        :display="true"
        :disabled="!isEditActive"
      >
        <option value="przychodzący">Przychodzący</option>
        <option value="wychodzący">Wychodzący</option>
      </SelectInput>

      <SubmitButton label="Zapisz" />
    </form>
  </SmallModal>
</template>
