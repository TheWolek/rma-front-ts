<script setup lang="ts">
import { PropType, defineProps } from "vue";
import CheckboxInput from "./CheckboxInput.vue";
import { SelectOption } from "../constants";

const props = defineProps({
  value: {
    type: Array,
    required: true,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  disabledAll: {
    type: Boolean,
    required: false,
  },
});

function check(optionId, checked) {
  let updatedValue = [...props.value];

  if (checked) {
    updatedValue.push(optionId);
  } else {
    updatedValue.slice(updatedValue.indexOf(optionId));
  }

  this.$emit("update:value", updatedValue);
}
</script>
<template>
  <div class="checkbox-group">
    <CheckboxInput
      v-for="option in options"
      :fieldId="option.id"
      :label="option.name"
      :key="option.id"
      :checked="value.includes(option.id)"
      :disabled="disabledAll"
      @update:checked="check(option.id, $event)"
    />
  </div>
</template>
<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  width: 90%;
  border: 1px solid var(--vt-c-black-mute);
}
</style>
