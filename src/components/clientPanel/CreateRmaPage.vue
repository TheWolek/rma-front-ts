<script setup lang="ts">
import { Ref, ref, toRaw } from "vue";
import { useClientStore } from "@/stores/clientStore";
import firstStep from "../RMA/rmaAdd/form/firstStep.vue";
import secondStep from "../RMA/rmaAdd/form/secondStep.vue";
import thirdStep from "../RMA/rmaAdd/form/thirdStep.vue";
import formPreview from "../RMA/rmaAdd/formPreview.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import { CreateTicketData } from "@/stores/RMA/constants";

const store = useClientStore();

const activeStep = ref(1);
const tempFormData = ref({}) as Ref<CreateTicketData>;
const barcode = ref("");

const handleSteps = async (nextStep: number) => {
  if (nextStep === 4) {
    const data = toRaw(store.addFormData);
    const body = {
      ...data.firstStep,
      ...data.secondStep,
      ...data.thirdStep,
      ...data.addressSection,
    };
    const response = await axiosInstance(false).post(
      endpoints.rmaCreateClient,
      body
    );

    tempFormData.value = store.addFormData;
    store.clearAddFormData();

    console.log(response.data);
    barcode.value = response.data.barcode;
    activeStep.value = nextStep;
  } else {
    activeStep.value = nextStep;
  }
};
</script>
<template>
  <div class="page">
    <div class="addForm" v-if="activeStep < 4">
      <h1>Dodawanie nowego zgłoszenia serwisowego</h1>
      <div class="wrap">
        <div class="formWrap">
          <firstStep
            :isClient="true"
            v-if="activeStep === 1"
            @changeStep="handleSteps"
          />
          <secondStep
            :isClient="true"
            v-if="activeStep === 2"
            @changeStep="handleSteps"
          />
          <thirdStep
            :isClient="true"
            v-if="activeStep === 3"
            @changeStep="handleSteps"
          />
        </div>
        <formPreview :activeStep="activeStep" />
      </div>
    </div>
    <div class="formSummary" v-if="activeStep === 4">
      <h1>Utworzono zgłoszenie: {{ barcode }}</h1>
      <h3>Skontaktujemy się z Tobą i przekażemy Ci dalsze kroki</h3>
      <div class="summaryWrap">
        <div class="device">
          <h3>Przedmiot zgłoszenia</h3>
          <p>
            <b>
              {{ tempFormData.firstStep.deviceCategory }}
              {{ tempFormData.firstStep.deviceProducer }}
              {{ tempFormData.firstStep.deviceName }}</b
            >
          </p>
          <p v-if="tempFormData.firstStep.deviceSn">
            Numer seryjny: <b>{{ tempFormData.firstStep.deviceSn }}</b>
          </p>
        </div>
        <div class="issue">
          <h3>Opis problemu</h3>
          <p>{{ tempFormData.secondStep.issue }}</p>
        </div>
        <div class="owner">
          <h3>Twoje dane</h3>
          <p>
            Imię i nazwisko: <b>{{ tempFormData.thirdStep.name }}</b>
          </p>
          <p v-if="tempFormData.thirdStep.email">
            E-mail: <b>{{ tempFormData.thirdStep.email }}</b>
          </p>
          <p v-if="tempFormData.thirdStep.phone">
            Numer telefonu: <b>{{ tempFormData.thirdStep.phone }}</b>
          </p>
          <p v-if="tempFormData.addressSection.lines">Adres:</p>
          <p>
            <b>{{ tempFormData.addressSection.lines }}</b>
          </p>
          <p>
            <b
              >{{ tempFormData.addressSection.postCode }}
              {{ tempFormData.addressSection.city }}</b
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/form.scss";

.page {
  margin: 30px auto;
  width: 60%;

  h1,
  h3,
  p {
    color: var(--vt-c-black-mute);
  }

  .summaryWrap {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 32px;

    .device,
    .issue,
    .owner {
      padding: 6px 12px;
      background-color: #f3f3f3;
      border-radius: 5px;
    }

    .device > p,
    .issue > p,
    .owner > p {
      margin-left: 8px;
    }

    .device > h3,
    .issue > h3,
    .owner > h3 {
      font-size: 18px;
    }
  }

  .formSummary {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 24px !important;
    }

    h1,
    h3 {
      font-weight: 600;
    }
  }

  .wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    color: var(--vt-c-black-mute);

    .formWrap {
      width: 50%;
    }
  }
}
</style>
