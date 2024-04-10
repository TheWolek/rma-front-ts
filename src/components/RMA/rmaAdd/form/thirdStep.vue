<script setup lang="ts">
import { ref, defineEmits, toRaw } from "vue";
import { useRmaStore } from "@/stores/RMA";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import CheckBox from "@/components/parts/inputs/CheckBox.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import { validate, validator } from "../validation";

const emit = defineEmits(["changeStep"]);

const store = useRmaStore();
const stepData = store.addFormData.thirdStep;
const addressSection = store.addFormData.addressSection;
const isAddressFormActive = ref(false);
const formErrors = ref({
  name: "",
  phone: "",
  email: "",
  lines: "",
  postCode: "",
  city: "",
});

function showError(field: string, message: string) {
  formErrors.value[field] = message;
}

function clearErrors() {
  Object.keys(formErrors.value).forEach((error) => {
    formErrors.value[error] = "";
  });
}

function onSubmit() {
  clearErrors();
  const isFormValid = validate(toRaw(stepData), validator.thirdStep, showError);
  let isAddressFormValid = true;

  if (isAddressFormActive.value) {
    isAddressFormValid = validate(
      toRaw(addressSection),
      validator.addressSection,
      showError
    );
  }

  if (isFormValid && isAddressFormValid) {
    emit("changeStep", 4);
  }
}

function onBack() {
  emit("changeStep", 2);
}

function formatPostCode() {
  let code = addressSection.postCode;
  code = code.replace(/\D/g, "");
  if (code.length <= 5) {
    code = code.replace(/^(\d{2})(\d{3})$/, "$1-$2");
  }
  addressSection.postCode = code;
}
</script>
<template>
  <div class="step">
    <h1>#3 Dane zgłaszającego</h1>
    <form @submit.prevent="onSubmit">
      <TextInput
        id="name"
        v-model="stepData.name"
        label="Imię i nazwisko lub nazwa firmy"
        :error="formErrors.name"
      />
      <TextInput
        id="email"
        v-model="stepData.email"
        label="Adres e-mail"
        :error="formErrors.email"
      />
      <TextInput
        id="phone"
        v-model="stepData.phone"
        label="Numer telefonu"
        :error="formErrors.phone"
        max="9"
      />

      <CheckBox
        id="isAddressFormActive"
        label="Dodaj adres"
        v-model="isAddressFormActive"
      />
      <div class="addressForm" :class="{ active: isAddressFormActive }">
        <TextInput
          id="lines"
          v-model="addressSection.lines"
          label="Ulica i numer"
          :error="formErrors.lines"
        />
        <TextInput
          id="postCode"
          v-model="addressSection.postCode"
          label="Kod pocztowy"
          :error="formErrors.postCode"
          :input="formatPostCode"
          max="5"
        />
        <TextInput
          id="city"
          v-model="addressSection.city"
          label="Miejscowość"
          :error="formErrors.city"
        />
      </div>
      <div class="buttons">
        <ActionButton :icon="`leftChevron.svg`" width="35px" :event="onBack" />
        <SubmitButton label="Dodaj zgłoszenie" width="130px" />
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
.checkbox {
  margin-top: 12px;

  input[type="checkbox"] {
    margin-left: 12px;
    align-self: center;
  }
}
.addressForm {
  display: none;

  &.active {
    display: block;
  }
}
</style>
