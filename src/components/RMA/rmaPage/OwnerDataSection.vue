<script setup lang="ts">
import { ref } from "vue";
import { useRmaStore } from "@/stores/RMA";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";

const store = useRmaStore();

const name = ref(store.rmaPage.name);
const email = ref(store.rmaPage.email);
const phone = ref(store.rmaPage.phone);
const editMode = ref(store.editMode);
</script>
<template>
  <div class="owner">
    <h2>Dane zleceniodawcy</h2>
    <div class="wrap">
      <InlineEditInput
        id="name"
        label="Imię i nazwisko:"
        v-model="name"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="email"
        label="E-mail:"
        v-model="email"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="phone"
        label="Telefon:"
        v-model="phone"
        :disabled="!editMode"
      />
    </div>
  </div>
</template>
