<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  label: String,
  fieldId: {
    type: String,
    required: true,
  },
  checked: Boolean,
  disabled: Boolean,
});
</script>
<template>
  <label
    :for="fieldId"
    class="checkbox-tile"
    :class="{ disabled: this.disabled }"
  >
    <input
      type="checkbox"
      :checked="checked"
      :id="fieldId"
      :disabled="disabled"
      v-on:input="(event) => $emit('update:checked', (event.target as HTMLInputElement).checked)"
    />
  </label>
</template>
