<script setup lang="ts">
import { ref, computed } from "vue";
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import TextInput from "@/components/parts/inputs/TextInput.vue";

const store = useCollectStore();
const { collectPage, waybillError } = storeToRefs(store);

const waybill = ref("");

const isClosed = computed(() => collectPage.value.status === "Odebrany");

const onSubmit = async () => {
  if (waybill.value === "") return;

  await store.addNewItemToList(waybill.value);

  waybill.value = "";
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <TextInput
      id="waybillInput"
      label="Numer przesyłki"
      v-model="waybill"
      :onEnter="onSubmit"
      :disabled="isClosed"
      :error="waybillError"
    />
  </form>
</template>
<style scoped lang="scss">
@import "../../../../assets/styles/form.scss";
form {
  width: 25%;
  padding-bottom: 20px;
}
</style>
