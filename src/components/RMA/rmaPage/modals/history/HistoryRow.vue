<script setup lang="ts">
import { ref, defineProps, computed, PropType } from "vue";
import { HistoryRow } from "@/stores/RMA/constants";
import { formatDateAndHours } from "@/helpers/dateFormatters";
import HistoryDetails from "./HistoryDetails.vue";

const props = defineProps({
  row: {} as PropType<HistoryRow>,
});

const isDetailsVisible = ref(false);

const getDate = computed(() => formatDateAndHours(props.row.created));

const toggleDetails = () => {
  isDetailsVisible.value = !isDetailsVisible.value;
};
</script>
<template>
  <div>
    <div class="historyRow" @click="toggleDetails">
      <div class="summary">
        <p>
          <b>{{ getDate }}</b>
        </p>
        <p>{{ row.login }}: {{ row.action }}</p>
      </div>
      <HistoryDetails :visible="isDetailsVisible" :data="row" />
    </div>
    <hr />
  </div>
</template>
<style lang="scss" scoped>
.historyRow {
  padding: 8px 0 8px 22px;
  cursor: pointer;
  transition: 0.1s ease;

  &:hover {
    background-color: rgb(241, 241, 241);
  }
}
</style>
