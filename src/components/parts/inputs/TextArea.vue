<script setup lang="ts">
import { PropType, defineProps, defineEmits } from "vue";
import { CommonEventHandler } from "../constants";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  modelValue: {
    type: String,
    required: true,
  },
  change: Function as PropType<CommonEventHandler>,
  error: {
    type: String,
    default: "",
  },
  cols: {
    type: String,
    required: true,
  },
  rows: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  max: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.value);
  if (props.change) {
    props.change();
  }
}

function onInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>
<template>
  <div class="form-group">
    <h3>{{ label }}</h3>
    <textarea
      :id="id"
      :cols="cols"
      :rows="rows"
      :value="modelValue"
      @change="onChange"
      @input="onInput"
      :disabled="disabled"
      :class="{
        fieldError: $props.error !== '' || modelValue.length > Number(max),
      }"
    ></textarea>
    <p
      class="error"
      :id="`error_${id}`"
      :class="{ active: $props.error !== '' }"
    >
      {{ error }}
    </p>
    <p
      class="lenCounter"
      v-if="max"
      :class="{ counterError: modelValue.length > Number(max) }"
    >
      {{ modelValue.length }} / {{ max }}
    </p>
  </div>
</template>
<style scoped lang="scss">
textarea {
  resize: none;
  font-size: 14px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

  border: 1px solid #000;

  &:focus-visible {
    outline: none;
    border: 1px solid #000;
  }

  &.fieldError {
    border: 1px solid var(--vt-c-red);
  }
}

.error {
  display: block;
  bottom: -22px;
}

.lenCounter {
  position: absolute;
  bottom: -24px;
  right: 0;
  font-size: 14px;

  &.counterError {
    color: red;
  }
}
</style>
