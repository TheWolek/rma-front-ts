<script setup lang="ts">
import { ref } from "vue";
// import Cookies from "js-cookie";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import TextInput from "../parts/inputs/TextInput.vue";
import SubmitButton from "../parts/buttons/SubmitButton.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import LoadingDots from "../parts/LoadingDots.vue";

const store = useUserStore();

const login = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleSubmit() {
  const data = {
    login: login.value,
    password: password.value,
  };
  loading.value = true;
  try {
    const result = await axiosInstance().post(endpoints.login, data);

    if (result.status === 400) {
      loading.value = false;
      return (error.value = result.data.message);
    }

    if (result.status === 200) {
      loading.value = false;
      error.value = "";
      // Cookies.set("authToken", `Bearer ${result.data.token}`);
      store.login(result.data.token);
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="loginWrap">
    <div class="loadingWrap" :class="{ active: loading }">
      <LoadingDots :active="loading" />
    </div>
    <div class="content">
      <h1>System RMA</h1>
      <form @submit.prevent="handleSubmit">
        <p class="formError" :class="{ active: error }">
          {{ error }}
        </p>
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
  </div>
</template>
<style>
.loginWrap .loadingWrap.active {
  background: rgba(85, 85, 85, 0.15);
}

.loginWrap {
  margin: auto 0;
  padding: 20px 30px;
  background: rgb(241, 241, 241);
  border-radius: 8px;
  width: 800px;
  display: flex;
  justify-content: center;
}

.content {
  width: 50%;
}

.loginWrap h1 {
  color: var(--vt-c-black-mute);
  font-weight: bold;
  font-size: 1.7rem !important;
  margin-left: 1.1em;
}

.loginWrap .form-group,
.loginWrap input,
.loginWrap form {
  width: 100%;
}

.loginWrap form {
  position: relative;
  padding-top: 40px;
}

.loginWrap form input[type="submit"] {
  background: rgb(21, 129, 230);
  color: #fff;
  border: 0;
  padding: 0.6em;
  width: 50%;
}

.loginWrap .formError {
  position: absolute;
  top: 4px;
  left: 2em;
  display: none;
  background-color: rgb(238, 130, 130);
  border: 2px solid #f00;
  border-radius: 5px;
  padding: 0.3em;
  color: #000;
  width: 84%;
}

.loginWrap .formError.active {
  display: block;
}
</style>
