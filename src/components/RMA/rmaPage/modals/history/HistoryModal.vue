<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import BigModal from "@/components/parts/BigModal.vue";
import HistoryRow from "./HistoryRow.vue";

const store = useRmaStore();

const { historyModalActive, history } = storeToRefs(store);

const toggleModal_history = () => {
  document.querySelector<HTMLElement>("#rma").style.overflow = "";
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
    <div class="emptyState" v-if="history.length === 0">
      <h3>Brak wpisów w historii...</h3>
    </div>
  </BigModal>
</template>
<style scoped lang="scss">
.emptyState {
  margin: 22px 0 0 22px;

  h3 {
    font-size: 16px;
    text-align: center;
  }
}
</style>
