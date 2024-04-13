<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import SmallModal from "@/components/parts/SmallModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";

const store = useRmaStore();

const { addWaybillModalActive, rmaPage } = storeToRefs(store);
const waybill = ref("");
const error_waybill = ref("");
const type = ref(null);
const error_type = ref("");

const incommingActive = computed(() => rmaPage.value.status <= 1);
const outcomingActive = computed(
  () => rmaPage.value.status === 6 || rmaPage.value.status === 8
);

const toggleModal_addWaybill = () => {
  addWaybillModalActive.value = !addWaybillModalActive.value;
};

const onSubmit = () => {
  error_type.value = "";
  error_waybill.value = "";

  if (waybill.value === "") {
    return (error_waybill.value = "Podaj nr listu");
  }

  if (type.value === null) {
    return (error_type.value = "Wybierz typ");
  }

  store.addWaybill({
    ticketId: rmaPage.value.ticket_id,
    waybillNumber: waybill.value,
    type: type.value,
  });
};
</script>
<template>
  <SmallModal
    :modalActive="addWaybillModalActive"
    :toggleAction="toggleModal_addWaybill"
    modalTitle="Dodawanie nowego listu"
  >
    <form v-on:submit.prevent="onSubmit">
      <TextInput
        id="waybill"
        label="Numer listu"
        v-model="waybill"
        :error="error_waybill"
      />
      <SelectInput id="type" label="Typ" v-model="type" :error="error_type">
        <option value="null" selected hidden>Wybierz typ</option>
        <option value="przychodzący" :disabled="!incommingActive">
          Przychodzący
        </option>
        <option value="wychodzący" :disabled="!outcomingActive">
          Wychodzący
        </option>
      </SelectInput>
      <SubmitButton label="Zapisz" />
    </form>
  </SmallModal>
</template>
