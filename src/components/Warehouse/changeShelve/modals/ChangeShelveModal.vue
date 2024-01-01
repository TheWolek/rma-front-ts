<script setup lang="ts">
import { ref } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import BigModal from "@/components/parts/BigModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import validation from "./validation";

const store = useWarehouseStore();

const {
  changeShelveModalActive,
  shelves,
  changeShelveForm,
  changeShelveAllowedItems,
} = storeToRefs(store);
const active_code = ref("");
const new_code = ref("");
const error_active_code = ref("");
const error_new_code = ref("");

const toggleModal = () => {
  changeShelveModalActive.value = !changeShelveModalActive.value;
};

const displayError = (field: string, error: string) => {
  switch (field) {
    case "active_code":
      error_active_code.value = error;
      break;
    case "new_code":
      error_new_code.value = error;
      break;
  }
};

const clearErrors = () => {
  error_active_code.value = "";
  error_new_code.value = "";
};

const checkIfShelveExists = (code: string) =>
  shelves.value.find((o) => o.code === code) ?? false;

const handleSubmit = async () => {
  clearErrors();
  const errors = validation({
    active_code: active_code.value,
    new_code: new_code.value,
  });

  if (errors) {
    let errorList = errors.toString().split(":")[1].split(".");

    errorList.forEach((error) => {
      const field = error.split("#")[0].trim();
      const message = error.split("#")[1].trim();
      displayError(field, message);
    });
    return;
  }

  if (!checkIfShelveExists(active_code.value)) {
    return displayError("active_code", "Podana lokalizacja nie istnieje");
  }
  if (!checkIfShelveExists(new_code.value)) {
    return displayError("new_code", "Podana lokalizacja nie istnieje");
  }

  if (active_code.value === new_code.value) {
    return displayError("new_code", "Nowa lokalizacja nie może być identyczna");
  }

  await store.fetchProductsOnShelve(active_code.value);

  if (changeShelveAllowedItems.value.length === 0) {
    return displayError("active_code", "Lokalizacja jest pusta");
  }

  changeShelveForm.value = {
    active: true,
    activeShelve: active_code.value,
    newShelve: new_code.value,
  };
  active_code.value = "";
  new_code.value = "";
  clearErrors();
  toggleModal();
};
</script>
<template>
  <BigModal
    :modalActive="changeShelveModalActive"
    :toggleAction="toggleModal"
    modalTitle="Zmiana lokalizacji produktu"
  >
    <form @submit.prevent="handleSubmit">
      <TextInput
        id="active_code"
        label="Kod bieżącej lokalizacji"
        v-model="active_code"
        :error="error_active_code"
      />
      <TextInput
        id="new_code"
        label="Kod docelowej lokalizacji"
        v-model="new_code"
        :error="error_new_code"
      />
      <SubmitButton label="Dodaj" />
    </form>
  </BigModal>
</template>
