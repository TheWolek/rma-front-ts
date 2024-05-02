<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import BigModal from "@/components/parts/BigModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import validation from "../validation";

const store = useUserStore();
const { addUserModalActive } = storeToRefs(store);

const login = ref("");
const password = ref("");
const role = ref("");
const error_login = ref("");
const error_password = ref("");
const error_role = ref("");
const error = ref("");
const message = ref("");
const loading = ref(false);

const roles = ["Admin", "LS", "CC", "TECH"];

const toggleModal = () => {
  addUserModalActive.value = !addUserModalActive.value;
};

const validate = () => {
  const errors = validation({
    login: login.value,
    password: password.value,
    role: role.value,
  });

  if (errors) {
    let errorList = errors.toString().split(":")[1].split(".");

    errorList.forEach((error) => {
      const field = error.split("#")[0].trim();
      const message = error.split("#")[1].trim();
      displayError(field, message);
    });
    return false;
  }
  return true;
};

const displayError = (field: string, error: string) => {
  switch (field) {
    case "login":
      error_login.value = error;
      break;

    case "password":
      error_password.value = error;
      break;

    case "role":
      error_role.value = error;
      break;
  }
};

const clearErrors = () => {
  error_login.value = "";
  error_password.value = "";
  error_role.value = "";
  error.value = "";
};

const clearForm = () => {
  login.value = "";
  password.value = "";
  role.value = "";
};

const onSubmit = async () => {
  loading.value = true;
  clearErrors();
  if (validate()) {
    const response = await axiosInstance(true).post(endpoints.createUser, {
      login: login.value,
      password: password.value,
      roles: [role.value],
    });

    if (response.status === 400) {
      error.value = response.data.message;
      loading.value = false;
    }

    if (response.status === 200) {
      message.value = `Pomyślnie utworzono użytkownika ${login.value}`;
      loading.value = false;
      clearForm();
    }
  }
  loading.value = false;
};
</script>
<template>
  <BigModal
    :modalActive="addUserModalActive"
    :toggleAction="toggleModal"
    modalTitle="Dodawanie użytkownika"
  >
    <div class="fromWrap">
      <form action="" @submit.prevent="onSubmit">
        <TextInput
          id="login"
          label="Login"
          v-model="login"
          :error="error_login"
        />
        <TextInput
          id="password"
          inputType="password"
          label="Hasło"
          v-model="password"
          :error="error_password"
        />
        <SelectInput
          id="role"
          label="Wybierz role"
          v-model="role"
          :error="error_role"
        >
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </SelectInput>
        <div class="messageWrap">
          <p
            class="formMessage"
            :class="{ active: error || message, fail: error, succ: message }"
          >
            {{ error || message }}
          </p>
        </div>
        <SubmitButton label="Dodaj" width="150px" />
      </form>
    </div>
  </BigModal>
</template>
<style scoped lang="scss">
@import "@/assets/styles/form.scss";

form {
  width: 50%;
  .messageWrap {
    min-height: 50px;

    .formMessage {
      display: none;
      border-radius: 5px;
      padding: 0.3em;
      color: #000;

      &.active {
        display: block;
        margin-bottom: 12px;
      }

      &.fail {
        background-color: rgb(238, 130, 130);
        border: 2px solid #f00;
      }

      &.succ {
        background-color: rgb(130, 238, 184);
        border: 2px solid rgb(0, 167, 97);
      }
    }
  }
}
</style>
