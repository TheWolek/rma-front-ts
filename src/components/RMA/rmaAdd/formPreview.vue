<script setup lang="ts">
import { defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useClientStore } from "@/stores/clientStore";

const props = defineProps({
  activeStep: {
    type: Number,
    required: true,
  },
  isClient: {
    type: Boolean,
    default: false,
  },
});

let formData: { [key: string]: { [key: string]: string } };

if (props.isClient) {
  formData = useRmaStore().addFormData;
} else {
  formData = useClientStore().addFormData;
}
</script>
<template>
  <div class="formPreview" v-if="activeStep > 1">
    <div class="step" v-if="activeStep > 1">
      <h1>#1 Dane urządzenia</h1>
      <div class="line">
        <p>Kategoria:</p>
        <p class="bold">{{ formData.firstStep.deviceCategory }}</p>
      </div>
      <div class="line">
        <p>Producent:</p>
        <p class="bold">{{ formData.firstStep.deviceProducer }}</p>
      </div>
      <div class="line">
        <p>Model:</p>
        <p class="bold">{{ formData.firstStep.deviceName }}</p>
      </div>
      <div class="line" v-if="formData.firstStep.deviceSn !== ''">
        <p>Numer seryjny:</p>
        <p class="bold">{{ formData.firstStep.deviceSn }}</p>
      </div>
    </div>
    <div class="step" v-if="activeStep > 2">
      <h1>#2 Dane zgłoszenia</h1>
      <div class="line">
        <p>Typ zgłoszenia</p>
        <p class="bold">
          {{
            formData.secondStep.type === "1"
              ? "Naprawa gwarancyjna"
              : "Naprawa płatna"
          }}
        </p>
      </div>
      <div class="line">
        <p>Opis problemu</p>
        <p class="bold">{{ formData.secondStep.issue }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.formPreview {
  display: none;
}

@media (min-width: 1024px) {
  .formPreview {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .step {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .bold {
        font-weight: bold;
        margin-left: 8px;
      }
    }
  }
}
</style>
