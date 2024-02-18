<script setup lang="ts">
import { PropType, defineProps } from "vue";
import CheckboxInput from "./CheckboxInput.vue";
import { SelectOption } from "../constants";

const props = defineProps({
  modelValue: {
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
  error: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function check(optionId, checked) {
  let updatedValue = [...props.modelValue];

  if (checked) {
    updatedValue.push(optionId);
  } else {
    updatedValue.splice(updatedValue.indexOf(optionId), 1);
  }

  emit("update:modelValue", updatedValue);
}
</script>
<template>
  <div class="checkbox-group">
    <CheckboxInput
      v-for="option in options"
      :fieldId="option.id.toString()"
      :label="option.name"
      :key="option.id.toString()"
      :checked="modelValue.includes(option.id)"
      :disabled="disabledAll"
      @update:checked="check(option.id, $event)"
    />
    <p
      :id="`error_${name}`"
      class="error"
      :class="{ active: props.error !== '' }"
    >
      {{ error }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  background: #eee;
  width: 90%;
  border: 1px solid var(--vt-c-black-mute);
}

p.error {
  bottom: -24px;
}
</style>
