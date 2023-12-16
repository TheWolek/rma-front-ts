<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();

const { rmaPage, editMode } = storeToRefs(store);
</script>
<template>
  <div class="owner">
    <h2>Dane zleceniodawcy</h2>
    <div class="sectionWrap">
      <InlineEditInput
        id="name"
        label="Imię i nazwisko:"
        v-model="rmaPage.name"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="email"
        label="E-mail:"
        v-model="rmaPage.email"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="phone"
        label="Telefon:"
        v-model="rmaPage.phone"
        :disabled="!editMode"
      />
    </div>
  </div>
</template>
