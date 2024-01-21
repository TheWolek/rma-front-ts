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
  <input
    type="submit"
    class="submitButton"
    :value="label"
    :disabled="disabled"
  />
</template>
<style scoped lang="scss">
.submitButton {
  cursor: pointer;
  background-color: rgb(21, 129, 230);
  color: #fff;
  border: 0px;
  outline: 0;
  padding: 8px;
}
</style>
