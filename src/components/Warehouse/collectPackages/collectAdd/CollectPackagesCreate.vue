<script setup lang="ts">
import { ref } from "vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import router from "@/router";

const refName = ref("");
const error_refName = ref("");

const onSubmit = async () => {
  if (refName.value === "") {
    return (error_refName.value = "Pole jest wymagane");
  }

  const response = await axiosInstance(true).post(
    endpoints.collectPackagesAdd,
    {
      refName: refName.value,
    }
  );

  if (response.status === 200) {
    router.push({
      name: "collectPackage",
      params: {
        id: response.data.collectId,
      },
    });
  }
};
</script>
<template>
  <div class="warehouseAddCollectPackages_wrap">
    <h1>Dodawanie nowego odbioru</h1>
    <form @submit.prevent="onSubmit">
      <TextInput
        id="refName"
        label="Numer zbiorczy"
        v-model="refName"
        :err="error_refName"
      />
      <SubmitButton label="Utwórz" />
    </form>
  </div>
</template>
<style scoped>
.warehouseAddCollectPackages_wrap {
  padding: 0.5em;
}

.form-group {
  width: 40%;
}

input[type="submit"] {
  width: 150px;
}
</style>
