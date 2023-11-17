<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  label: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <input type="submit" :value="label" :disabled="disabled" />
</template>
