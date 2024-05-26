<script setup lang="ts">
import { Ref, ref, toRaw } from "vue";
import { useClientStore } from "@/stores/clientStore";
import { CreateTicketData } from "@/stores/RMA/constants";
import firstStep from "@/components/RMA/rmaAdd/form/firstStep.vue";
import secondStep from "@/components/RMA/rmaAdd/form/secondStep.vue";
import thirdStep from "@/components/RMA/rmaAdd/form/thirdStep.vue";
import formPreview from "@/components/RMA/rmaAdd/formPreview.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import InfoSection from "./InfoSection.vue";

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
  <div class="pageWrapp">
    <div class="page">
      <InfoSection />
      <div class="addForm" v-if="activeStep < 4">
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
        </div>
      </div>
      <div class="formSummary" v-if="activeStep === 4">
        <h1>
          Utworzono zgłoszenie: <span class="rmaCode">{{ barcode }}</span>
        </h1>
        <p>Skontaktujemy się z Tobą i przekażemy Ci dalsze kroki</p>
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
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/form.scss";
.pageWrapp {
  display: flex;
  justify-content: center;
}

.page {
  margin: 12px 12px 80px 12px;

  .summaryWrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;

    .device,
    .issue,
    .owner {
      padding: 10px 16px;
      background-color: #f3f3f3;
      border-radius: 5px;
      max-width: 700px;
    }
    .device > p,
    .issue > p,
    .owner > p {
      margin-left: 8px;
    }
    .device > h3,
    .issue > h3,
    .owner > h3 {
      font-size: 16px;
      font-weight: 600;
    }

    h1 {
      font-size: 24px !important;
    }

    h3 {
      font-size: 18px;
    }
  }

  .formSummary {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .rmaCode {
      font-weight: 600;
    }
  }
}

@media (min-width: 768px) {
  .page {
    margin: 20px 42px 80px 20px;
  }
}

@media (min-width: 1024px) {
  .page {
    max-width: 750px;

    .summaryWrap {
      gap: 32px;
      margin-top: 32px;

      h1 {
        font-size: 24px !important;
      }
    }

    .wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 24px;

      .formWrap {
        width: 700px;
      }
    }
  }
}
</style>
