<script setup lang="ts">
import { onMounted, toRaw, ref } from "vue";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import firstStep from "./firstStep.vue";
import secondStep from "./secondStep.vue";
import thirdStep from "./thirdStep.vue";
import formPreview from "../formPreview.vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import router from "@/router";

const store = useRmaStore();
const dictStore = useDictionaryStore();

const activeStep = ref(1);
const fetching = ref(true);
const damagesDict = dictStore.getDictionaryByName("damageTypes");
const accessoriesDict = dictStore.getDictionaryByName("accessoriesTypes");
const statusesTypes = dictStore.getDictionaryByName("statusesTypes");

onMounted(async () => {
  fetching.value = true;
  if (dictStore.checkIfEmpty("accessoriesTypes")) {
    await dictStore.fetchDictionary(accessoriesDict);
    await dictStore.fetchDictionary(damagesDict);
    await dictStore.fetchDictionary(statusesTypes);
  }
  fetching.value = false;
});

async function handleSteps(nextStep: number) {
  console.log(nextStep);
  if (nextStep === 4) {
    const data = toRaw(store.addFormData);
    const body = {
      ...data.firstStep,
      ...data.secondStep,
      ...data.thirdStep,
      ...data.addressSection,
    };
    const response = await axiosInstance(true).post(endpoints.rmaCreate, body);

    store.clearAddFormData();

    router.push({
      name: "rmaPage",
      params: {
        id: response.data.ticketId,
      },
    });
  } else {
    activeStep.value = nextStep;
  }
}
</script>
<template>
  <div class="loadingWrap" :class="{ active: fetching }" v-if="fetching">
    <LoadingDots :active="fetching" />
  </div>
  <h1>Dodawanie nowego zgłoszenia serwisowego</h1>
  <div class="wrap">
    <div class="formWrap">
      <firstStep v-if="activeStep === 1" @changeStep="handleSteps" />
      <secondStep v-if="activeStep === 2" @changeStep="handleSteps" />
      <thirdStep v-if="activeStep === 3" @changeStep="handleSteps" />
    </div>
    <formPreview :activeStep="activeStep" />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/form.scss";

.wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;

  .formWrap {
    width: 30%;
  }
}
</style>
