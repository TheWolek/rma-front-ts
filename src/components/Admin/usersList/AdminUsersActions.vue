<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";

const store = useUserStore();
const { addUserModalActive, filterLogin } = storeToRefs(store);

const toggleNewModal = () => {
  addUserModalActive.value = !addUserModalActive.value;
};

const onRefresh = () => {
  store.fetchByFilters();
};
</script>
<template>
  <div class="actions">
    <ActionButton :event="toggleNewModal" display="Nowy" :icon="`add.svg`" />
    <InlineEditInput
      id="loginFilter"
      label="Login"
      v-model="filterLogin"
      :disabled="false"
    />
    <ActionButton :event="onRefresh" display="Szukaj" />
  </div>
</template>
