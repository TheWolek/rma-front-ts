<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { CommonEventHandler } from "../constants";

const props = defineProps({
  id: String,
  label: String,
  modelValue: String || Number,
  change: Function as PropType<CommonEventHandler>,
  error: String,
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
        class="selectField"
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
        :class="{ active: props.error !== '' }"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.selectField {
  padding: 0.35em;
  width: 100%;
}
</style>
