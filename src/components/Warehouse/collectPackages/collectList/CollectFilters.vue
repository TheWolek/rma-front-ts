<script setup lang="ts">
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import InlineDatePicker from "@/components/parts/inputs/InlineDatePicker.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import { formatDate } from "@/helpers/dateFormatters";

const store = useCollectStore();
const { filter } = storeToRefs(store);

const onSubmit = () => {
  store.fetchCollectListByFilters();
};

const onClear = () => {
  filter.value = {
    refName: "",
    created: "",
    status: null,
  };
};
</script>
<template>
  <div class="filters">
    <InlineEditInput
      :disabled="false"
      id="refName"
      label="Numer zbiorczy"
      v-model="filter.refName"
    />
    <InlineDatePicker
      id="created"
      label="Data utworzenia"
      v-model="filter.created"
      :max="formatDate(new Date())"
    />
    <SelectInput id="status" label="Status" v-model="filter.status">
      <option value="W trakcie">W trakcie</option>
      <option value="Odebrany">Odebrany</option>
    </SelectInput>
    <ActionButton display="Szukaj" :event="onSubmit" />
    <ActionButton display="Wyczyść" :event="onClear" />
  </div>
</template>
<style lang="scss">
.filters {
  display: flex;
  align-items: center;
  gap: 0.8em;
}


.filters .form-group {
  display: flex;
  gap: 0.5em;
  margin-right: 20px;
}

.filters .inlineEdit {
  width: 20%;
  align-items: center;
  grid-template-columns: auto 1fr 0;
}

.filters .inlineEdit:nth-child(2) {
  width: 17%;
}

.filters .inlineEdit input[type="text"] {
  width: 100%;
}

.filters .inlineEdit + .inlineEdit {
  margin: 0;
}
</style>
