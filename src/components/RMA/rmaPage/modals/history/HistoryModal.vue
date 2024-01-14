<script setup lang="ts">
import BigModal from "@/components/parts/BigModal.vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import HistoryRow from "./HistoryRow.vue";

const store = useRmaStore();

const { historyModalActive, history } = storeToRefs(store);

const toggleModal_history = () => {
  historyModalActive.value = !historyModalActive.value;
};
</script>
<template>
  <BigModal
    :modalActive="historyModalActive"
    :toggleAction="toggleModal_history"
    modalTitle="Historia zlecenia serwisowego"
  >
    <HistoryRow v-for="row in history" :key="row.log_id" :row="row" />
  </BigModal>
</template>
