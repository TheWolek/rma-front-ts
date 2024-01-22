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
    <form @submit.prevent="">
      <InlineEditInput
        id="loginFilter"
        label="Login"
        v-model="filterLogin"
        :disabled="false"
      />
      <ActionButton :event="onRefresh" display="Szukaj" />
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/actions.scss";

form {
  width: 500px;
}
</style>
