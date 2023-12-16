<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();

const { rmaPage, editMode } = storeToRefs(store);
</script>
<template>
  <div class="shipment">
    <h2>Dane do wysyłki</h2>
    <div class="sectionWrap">
      <InlineEditInput
        id="name"
        label="Imię i nazwisko:"
        v-model="rmaPage.name"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="lines"
        label="Ulica i numer:"
        v-model="rmaPage.lines"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="postCode"
        label="Kod pocztowy:"
        v-model="rmaPage.postCode"
        :disabled="!editMode"
      />
      <InlineEditInput
        id="city"
        label="Miejscowość:"
        v-model="rmaPage.city"
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
