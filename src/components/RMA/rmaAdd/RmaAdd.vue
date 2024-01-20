<script setup lang="ts">
import { ref, toRaw, onMounted } from "vue";
import { useDictionaryStore } from "@/stores/dictionary";
import router from "@/router";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import CheckboxGroup from "@/components/parts/inputs/CheckBoxGroup.vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import validation from "./validation";

const store = useDictionaryStore();
const accessoriesDict = store.getDictionaryByName("accessoriesTypes");
const damagesDict = store.getDictionaryByName("damageTypes");

onMounted(async () => {
  await store.fetchDictionary(accessoriesDict);
  await store.fetchDictionary(damagesDict);
});

const formData = ref({
  deviceCat: "",
  deviceProducer: "",
  deviceName: "",
  deviceSn: "",
  name: "",
  phone: "",
  email: "",
  lines: "",
  postCode: "",
  city: "",
  damageType: "",
  deviceAccessories: [],
  type: 1,
  issue: "",
  damageDescription: "",
});

const formErros = ref({
  err_deviceCat: "",
  err_deviceProducer: "",
  err_deviceName: "",
  err_deviceSn: "",
  err_name: "",
  err_phone: "",
  err_email: "",
  err_lines: "",
  err_postCode: "",
  err_city: "",
  err_damageType: "",
  err_deviceAccessories: "",
  err_issue: "",
});

async function onSubmit() {
  clearErrors();
  if (validate()) {
    const response = await axiosInstance().post(
      endpoints.rmaCreate,
      toRaw(formData.value)
    );
    router.push({
      name: "rmaPage",
      params: {
        id: response.data.ticketId,
      },
    });
  }
}

function validate(): boolean {
  const errors = validation(toRaw(formData.value));
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
}

function displayError(field: string, error: string) {
  switch (field) {
    case "deviceProducer":
      formErros.value.err_deviceProducer = error;
      break;
    case "deviceName":
      formErros.value.err_deviceName = error;
      break;
    case "deviceCat":
      formErros.value.err_deviceCat = error;
      break;
    case "deviceSn":
      formErros.value.err_deviceSn = error;
      break;
    case "deviceAccessories":
      formErros.value.err_deviceAccessories = error;
      break;
    case "name":
      formErros.value.err_name = error;
      break;
    case "phone":
      formErros.value.err_phone = error;
      break;
    case "email":
      formErros.value.err_email = error;
      break;
    case "issue":
      formErros.value.err_issue = error;
      break;
    case "lines":
      formErros.value.err_lines = error;
      break;
    case "postCode":
      formErros.value.err_postCode = error;
      break;
    case "city":
      formErros.value.err_city = error;
      break;
    case "damageType":
      formErros.value.err_damageType = error;
      break;
  }
}

function clearErrors() {
  Object.keys(formErros.value).forEach((error) => {
    formErros.value[error] = "";
  });
}

function formatPhone() {
  let number = formData.value.phone;
  number = number.replace(/\D/g, "");
  formData.value.phone = number;
}

function formatPostCode() {
  let code = formData.value.postCode;
  code = code.replace(/\D/g, "");
  if (code.length <= 5) {
    code = code.replace(/^(\d{2})(\d{3})$/, "$1-$2");
  }
  formData.value.postCode = code;
}
</script>
<template>
  <div class="formWrap">
    <form action="" @submit.prevent="onSubmit">
      <div class="device">
        <h3>Dane urządzenia</h3>
        <TextInput
          id="deviceCat"
          label="Kategoria"
          v-model="formData.deviceCat"
          :error="formErros.err_deviceCat"
        />
        <TextInput
          id="deviceProducer"
          label="Producent"
          v-model="formData.deviceProducer"
          :error="formErros.err_deviceProducer"
        />
        <TextInput
          id="deviceName"
          label="Model"
          v-model="formData.deviceName"
          :error="formErros.err_deviceName"
        />
        <TextInput
          id="deviceSn"
          label="Numer seryjny"
          v-model="formData.deviceSn"
          :error="formErros.err_deviceSn"
        />
      </div>
      <div class="owner">
        <h3>Dane zgłaszającego</h3>
        <TextInput
          id="name"
          label="Imię i nazwisko lub nazwa firmy"
          v-model="formData.name"
          :error="formErros.err_name"
        />
        <TextInput
          id="phone"
          label="Telefon"
          v-model="formData.phone"
          :error="formErros.err_phone"
          :input="formatPhone"
          max="9"
        />
        <TextInput
          id="email"
          label="Email"
          v-model="formData.email"
          :error="formErros.err_email"
        />
      </div>
      <div class="address">
        <h3>Adres odsyłki</h3>
        <TextInput
          id="name"
          label="Ulica i numer"
          v-model="formData.lines"
          :error="formErros.err_lines"
        />
        <TextInput
          id="postCode"
          label="Kod pocztowy"
          v-model="formData.postCode"
          :error="formErros.err_postCode"
          :input="formatPostCode"
          max="5"
        />
        <TextInput
          id="city"
          label="Miejscowość"
          v-model="formData.city"
          :error="formErros.err_city"
        />
      </div>
      <div class="damage">
        <h3>Stan techniczny</h3>
        <div class="form-group">
          <SelectInput
            id="damageType"
            label="Wybierz stan urządzenia"
            v-model="formData.damageType"
            :error="formErros.err_damageType"
          >
            <option
              v-for="el in damagesDict.items"
              :key="el.id.toString()"
              :value="el.id"
            >
              {{ el.name }}
            </option>
          </SelectInput>
        </div>
        <div class="form-group">
          <label for="damageDescription">Opis stanu technicznego</label>
          <textarea
            name="damageDescription"
            id="damageDescription"
            v-model="formData.damageDescription"
            cols="30"
            rows="5"
          ></textarea>
        </div>
      </div>
      <div class="accesories">
        <h3>Akcesoria</h3>
        <CheckboxGroup
          v-model="formData.deviceAccessories"
          :error="formErros.err_deviceAccessories"
          :options="accessoriesDict.items"
          name="deviceAccessories"
        />
      </div>
      <div class="ticket">
        <h3>Dane zgłoszenia</h3>
        <div class="form-group">
          <label>Typ zgłoszenia</label>
          <label for="gw" class="radioLabel"
            ><input
              type="radio"
              name="type"
              id="gw"
              value="1"
              v-model="formData.type"
              checked
            />Naprawa gwarancyjna</label
          >
          <label for="np" class="radioLabel"
            ><input
              type="radio"
              name="type"
              id="np"
              value="2"
              v-model="formData.type"
            />Naprawa płatna</label
          >
        </div>
        <div class="form-group">
          <label for="issue">Opis problemu</label>
          <textarea
            name="issue"
            id="issue"
            v-model="formData.issue"
            cols="30"
            rows="10"
            :class="{ error_input: formErros.err_issue }"
          ></textarea>
          <p class="error err_issue" :class="{ active: formErros.err_issue }">
            {{ formErros.err_issue }}
          </p>
        </div>
        <SubmitButton label="Dodaj" />
      </div>
    </form>
  </div>
</template>
<style scoped>
form {
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.95fr 1fr;
  padding: 1em 2em 0 2em;
}

.owner,
.device {
  width: 100%;
}

.ticket {
  grid-column: 3;
}

h3 {
  color: var(--vt-c-black-mute);
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 17px;
}

.form-group {
  width: 100%;
}

input[type="radio"] {
  width: auto;
  margin-right: 0.5em;
}

input {
  position: relative;
}

.radioLabel {
  cursor: pointer;
  width: fit-content;
}

p.error.err_issue {
  bottom: -22px;
}

input[type="submit"] {
  background: rgb(21, 129, 230);
  color: #fff;
  border: 0px;
  padding: 0.5em;
  margin-top: 2.3em;
  grid-row: 3;
  width: 25%;
}

textarea {
  width: 90%;
}

input.error_input,
textarea.error_input {
  border: 2px solid #e90202;
}
</style>
