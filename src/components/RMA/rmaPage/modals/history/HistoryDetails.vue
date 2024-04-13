<script setup lang="ts">
import { computed } from "vue";
import { HistoryRow } from "@/stores/RMA/constants";
import { defineProps, PropType } from "vue";

const props = defineProps({
  visible: Boolean,
  data: {} as PropType<HistoryRow>,
});

const log_after = computed(() =>
  props.data.log_after.replace(/[{"}]/g, "").replace(/,/g, " \n ")
);

const log_before = computed(() =>
  props.data.log_before.replace(/[{"}]/g, "").replace(/,/g, " \n ")
);
</script>
<template>
  <div class="details" v-if="visible">
    <p class="row" v-if="data.log_before !== null">
      <span>Przed:</span> {{ log_before }}
    </p>
    <p class="row">
      <span v-if="data.log_before !== null">Po: </span>{{ log_after }}
    </p>
  </div>
</template>
<style scoped lang="scss">
.details {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .row {
    font-weight: 600;

    span {
      font-weight: normal;
    }
  }
}
</style>
