<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  value: String,
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => props.modelValue === props.value);

function onChange(event) {
  emit("update:modelValue", event.target.value);
}
</script>
<template>
  <div class="radio">
    <div class="cell">
      <input
        type="radio"
        :id="id"
        :value="value"
        :checked="isChecked"
        @change="onChange"
      />
      <label :for="id">{{ label }}</label>
    </div>
  </div>
</template>
