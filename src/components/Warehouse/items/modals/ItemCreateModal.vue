<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useWarehouseStore } from "@/stores/warehouse";
import { useRmaStore } from "@/stores/RMA";
import BigModal from "@/components/parts/BigModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import validators from "./validators";

const store = useWarehouseStore();
const rmaStore = useRmaStore();

const barcode = ref("");
const sn = ref("");
const error_barcode = ref("");
const error_sn = ref("");

const { createModalActive } = storeToRefs(store);

const toggleModal = () => {
  createModalActive.value = !createModalActive.value;
};

const validate = () =>
  validators.createItem.validate({ barcode: barcode.value, sn: sn.value });

const displayError = (message: string, context: "barcode" | "sn") => {
  if (context === "barcode") {
    error_barcode.value = message;
    document.getElementById("error_barcode").style.opacity = "1";
  }

  if (context === "sn") {
    error_sn.value = message;
    document.getElementById("error_sn").style.opacity = "1";
  }
};

const onSubmit = () => {
  const { error } = validate();
  if (error !== undefined) {
    displayError(error.details[0].message, "barcode");
  }
  error_barcode.value = "";
  error_sn.value = "";
  toggleModal();
  store.createNewItem({ barcode: barcode.value, sn: sn.value });
  rmaStore.registerDeviceInWarehouse(parseInt(barcode.value.split("-")[0]));
};
</script>
<template>
  <BigModal
    :modalActive="createModalActive"
    :toggleAction="toggleModal"
    modalTitle="Rejestracja nowego produktu"
  >
    <form v-on:submit.prevent="onSubmit">
      <TextInput
        id="barcode"
        label="Kod kreskowy"
        v-model="barcode"
        :error="error_barcode"
      />
      <TextInput id="sn" label="Numer seryjny" v-model="sn" :error="error_sn" />
      <SubmitButton label="Dodaj" />
    </form>
  </BigModal>
</template>
<style scoped lang="scss">
form {
  width: 50%;

  .submitButton {
    width: 150px;
  }
}
</style>
