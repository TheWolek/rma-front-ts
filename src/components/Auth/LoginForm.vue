<script setup lang="ts">
import { ref } from "vue";
import TextInput from "../parts/inputs/TextInput.vue";
import SubmitButton from "../parts/buttons/SubmitButton.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import Cookies from "js-cookie";
import router from "@/router";

const login = ref("");
const password = ref("");
const error = ref("");

async function handleSubmit() {
  const data = {
    login: login.value,
    password: password.value,
  };
  try {
    const result = await axiosInstance().post(endpoints.login, data);

    if (result.status === 400) {
      return (error.value = result.data.message);
    }

    if (result.status === 200) {
      error.value = "";
      Cookies.set("authToken", `Bearer ${result.data.token}`);
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="loginWrapp">
    <h2>System RMA</h2>
    <form @submit.prevent="handleSubmit">
      <p>{{ error }}</p>
      <TextInput id="login" label="Login" v-model="login" />
      <TextInput
        inputType="password"
        id="password"
        label="Hasło"
        v-model="password"
      />
      <SubmitButton label="Zaloguj się" />
    </form>
  </div>
</template>
