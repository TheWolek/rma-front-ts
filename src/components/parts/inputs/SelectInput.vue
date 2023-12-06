<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { CommonEventHandler, SelectOption } from "../constants";

const props = defineProps({
  id: String,
  label: String,
  modelValue: String || Number,
  change: Function as PropType<CommonEventHandler>,
  error: String,
  options: Array as PropType<SelectOption[]>,
  disabled: {
    type: Boolean,
    default: false,
  },
  display: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.value);
  if (props.change) {
    props.change();
  }
}
</script>
<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div>
      <select
        :id="id"
        :value="modelValue"
        @change="onChange"
        :disabled="disabled"
      >
        <option disabled value>{{ label }}</option>
        <slot></slot>
      </select>
      <p
        :id="`error_${id}`"
        class="error"
        :class="{ active: this.error !== '' }"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
<style scoped>
select {
  padding: 0.35em;
}
</style>
