<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import ResultsTable from "./ResultsTable.vue";
import ActionButton from "./buttons/ActionButton.vue";

const props = defineProps({
  loading: Boolean,
  pageNumber: { type: Number, required: true },
  maxPage: { type: Number, required: true },
  onPrevPage: { type: Function, required: true },
  onNextPage: { type: Function, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const prevPageAvailable = computed(() => props.pageNumber >= 2);
const nextPageAvailable = computed(() => props.pageNumber < props.maxPage);

const onChange = (event) => {
  emit("update:modelValue", event.target.value);
};

const prevPage = () => {
  if (prevPageAvailable.value) {
    props.onPrevPage();
  }
};

const nextPage = () => {
  if (nextPageAvailable.value) {
    props.onNextPage();
  }
};
</script>
<template>
  <div class="tablePagination">
    <ResultsTable :loading="loading">
      <template v-slot:theader>
        <slot name="theader"></slot>
      </template>
      <template v-slot:tbody>
        <slot name="tbody"></slot>
      </template>
    </ResultsTable>
    <div class="paginationWrap">
      <div class="pagination">
        <ActionButton
          width="30px"
          :icon="`leftChevron.svg`"
          :event="prevPage"
          :disabled="!prevPageAvailable"
        />
        <input
          type="number"
          name="pageNumber"
          id="pageNumber"
          :value="pageNumber"
          @change="onChange"
          :disabled="!prevPageAvailable && !nextPageAvailable"
        />
        <span>z {{ maxPage }}</span>
        <ActionButton
          width="30px"
          :icon="`rightChevron.svg`"
          :event="nextPage"
          :disabled="!nextPageAvailable"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 12px;

  input[type="number"] {
    width: 32px;
    text-align: center;
  }

  span {
    color: var(--vt-c-black);
  }
}
</style>
