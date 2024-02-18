<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { HistoryRow } from "@/stores/RMA/constants";
import { formatDateAndHours } from "@/helpers/dateFormatters";

const props = defineProps({
  row: {} as PropType<HistoryRow>,
});

const getDate = computed(() => formatDateAndHours(props.row.created));
</script>
<template>
  <div>
    <div class="historyRow">
      <p>
        <b>{{ getDate }}</b>
      </p>
      <p>{{ row.login }}</p>
      <p>{{ row.log }}</p>
    </div>
    <hr />
  </div>
</template>
<style lang="scss" scoped>
.historyRow {
  padding: 8px 0 8px 22px;
}
</style>
