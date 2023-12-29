<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  id: String,
  label: String,
  modelValue: {
    type: String,
    required: true,
  },
  min: String,
  max: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.value);
}
</script>
<template>
  <div class="inlineEdit">
    <label :for="id">{{ label }}</label>
    <div>
      <input
        type="date"
        :id="id"
        :value="modelValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        @change="onChange"
      />
    </div>
  </div>
</template>
<style scoped>
label {
  color: var(--vt-c-black-mute);
  line-height: 26px;
}

input[type="date" i] {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  width: 100%;
}
</style>
