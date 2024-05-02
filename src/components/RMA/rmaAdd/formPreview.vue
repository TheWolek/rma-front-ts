<script setup lang="ts">
import { defineProps } from "vue";
import { useRmaStore } from "@/stores/RMA";

defineProps({
  activeStep: Number,
});

const formData = useRmaStore().addFormData;
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
  width: 30%;
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
</style>
