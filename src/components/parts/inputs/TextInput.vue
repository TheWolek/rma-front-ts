<script setup lang="ts">
import { PropType, defineProps, defineEmits } from "vue";
import {
  InputType,
  CommonEventHandler,
  KeyboardEventHandler,
} from "../constants";

const props = defineProps({
  id: String,
  label: String,
  inputType: {
    type: String as PropType<InputType>,
    default: "text",
  },
  modelValue: {
    type: String,
    required: true,
  },
  change: Function as PropType<CommonEventHandler>,
  error: String,
  min: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  onEnter: {
    type: Function as PropType<KeyboardEventHandler>,
    default: null,
  },
  input: Function as PropType<CommonEventHandler>,
  max: String,
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.value);
  if (props.change) {
    props.change();
  }
}

function onInput(event) {
  if (props.input) {
    emit("update:modelValue", event.target.value);
    props.input();
  }
}
</script>
<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div>
      <input
        :type="inputType"
        :id="id"
        :value="modelValue"
        @change="onChange"
        :min="min"
        :disabled="disabled"
        v-on:keyup.enter="onEnter"
        @input="onInput"
        :maxlength="max"
      />
      <p
        :id="`error_${id}`"
        class="error"
        :class="{ active: this.error !== '' }"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>
