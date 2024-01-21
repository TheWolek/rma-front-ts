<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { MouseEventHandler } from "./constants";

defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
  toggleAction: Function as PropType<MouseEventHandler>,
  modalTitle: String,
});
</script>
<template>
  <div class="smallModal" :class="{ active: modalActive }">
    <div class="formWrap">
      <div class="header">
        <div id="close" @click="toggleAction"></div>
        <h4>{{ modalTitle }}</h4>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style>
@import "../../assets/styles/smallModal.scss";
</style>
