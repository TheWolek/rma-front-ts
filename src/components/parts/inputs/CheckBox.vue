<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  id: String,
  label: String,
  modelValue: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.checked);
}
</script>
<template>
  <div class="checkbox">
    <label :for="id">
      {{ label }}
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
    </label>
    <p
      :id="`error_${id}`"
      class="error"
      :class="{ active: $props.error !== '' }"
    >
      {{ error }}
    </p>
  </div>
</template>
