<script setup lang="ts">
import { ref, toRaw, defineEmits, defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import { validator, validate } from "../validation";
import { useClientStore } from "@/stores/clientStore";

const props = defineProps({
  isClient: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["changeStep"]);

let stepData: { [key: string]: string };

if (props.isClient) {
  stepData = useClientStore().addFormData.firstStep;
} else {
  stepData = useRmaStore().addFormData.firstStep;
}
const formErrors = ref({
  deviceProducer: "",
  deviceName: "",
  deviceCategory: "",
  deviceSn: "",
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
  const isFormValid = validate(toRaw(stepData), validator.firstStep, showError);

  if (isFormValid) {
    emit("changeStep", 2);
  }
}
</script>
<template>
  <div class="step">
    <h1>#1 Dane urządzenia</h1>
    <form @submit.prevent="onSubmit">
      <TextInput
        id="deviceCategory"
        v-model="stepData.deviceCategory"
        label="Kategoria"
        :error="formErrors.deviceCategory"
      />
      <TextInput
        id="deviceProducer"
        v-model="stepData.deviceProducer"
        label="Producent"
        :error="formErrors.deviceProducer"
      />
      <TextInput
        id="deviceName"
        v-model="stepData.deviceName"
        label="Model"
        :error="formErrors.deviceName"
      />
      <TextInput
        id="deviceSn"
        v-model="stepData.deviceSn"
        label="Numer seryjny"
        :error="formErrors.deviceSn"
      />
      <div class="buttons">
        <SubmitButton label="Kontynuuj" />
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss"></style>
