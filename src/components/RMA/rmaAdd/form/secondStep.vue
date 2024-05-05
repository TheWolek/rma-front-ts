<script setup lang="ts">
import { ref, toRaw, defineEmits, defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";
import RadioCell from "@/components/parts/inputs/RadioCell.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import TextArea from "@/components/parts/inputs/TextArea.vue";
import { validate, validator } from "../validation";
import { useClientStore } from "@/stores/clientStore";

const emit = defineEmits(["changeStep"]);

const props = defineProps({
  isClient: {
    type: Boolean,
    default: false,
  },
});

let stepData: { [key: string]: string };

if (props.isClient) {
  stepData = useClientStore().addFormData.secondStep;
} else {
  stepData = useRmaStore().addFormData.secondStep;
}

const formErrors = ref({
  issue: "",
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
  const isFormValid = validate(
    toRaw(stepData),
    validator.secondStep,
    showError
  );
  if (isFormValid) {
    emit("changeStep", 3);
  }
}

function onBack() {
  emit("changeStep", 1);
}
</script>
<template>
  <div class="step">
    <h1>#2 Dane zgłoszenia</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <RadioCell
          id="gw"
          label="Naprawa gwarancyjna"
          value="1"
          v-model="stepData.type"
        />
        <RadioCell
          id="np"
          label="Naprawa płatna"
          value="2"
          v-model="stepData.type"
        />
      </div>
      <div class="form-group">
        <TextArea
          id="issue"
          label="Opis problemu"
          v-model="stepData.issue"
          cols="30"
          rows="10"
          :error="formErrors.issue"
        />
      </div>
      <div class="buttons">
        <ActionButton :icon="`leftChevron.svg`" width="35px" :event="onBack" />
        <SubmitButton label="Kontynuuj" />
      </div>
    </form>
  </div>
</template>
