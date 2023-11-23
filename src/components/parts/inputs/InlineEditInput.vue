<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { InputType, CommonEventHandler } from "../constants";

const props = defineProps({
  id: String || Number,
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
  disabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function onChange(event) {
  emit("update:modelValue", event.target.value);
  if (props.change) {
    props.change();
  }
}
</script>
<template>
  <div class="inlineEdit">
    <label :for="id.toString()">{{ label }}</label>
    <div>
      <input
        :type="inputType"
        :id="id.toString()"
        :value="modelValue"
        @change="onChange"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
<style scoped>
label {
  color: var(--vt-c-black-mute);
  line-height: 26px;
}

input {
  font-size: 0.9em;
}
</style>
