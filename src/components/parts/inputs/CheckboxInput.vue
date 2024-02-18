<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  label: String,
  fieldId: {
    type: String,
    required: true,
  },
  checked: Boolean,
  disabled: Boolean,
});

const emit = defineEmits(["update:checked"]);
</script>
<template>
  <label
    :for="fieldId.toString()"
    class="checkbox-tile"
    :class="{ disabled: props.disabled }"
  >
    <input
      type="checkbox"
      :checked="checked"
      :id="fieldId.toString()"
      :disabled="disabled"
      @change="(event) => emit('update:checked', (event.target as HTMLInputElement).checked)"
    />
    {{ label }}
  </label>
</template>
<style lang="scss" scoped>
.checkbox-tile {
  padding: 0.4em 1em;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.checkbox-tile.disabled {
  cursor: default;
}

.checkbox-tile:nth-of-type(even) {
  background: #fff;
}

.checkbox-tile input {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.checkbox-tile input:disabled {
  cursor: default;
}
</style>
