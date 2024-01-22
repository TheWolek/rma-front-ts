<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { MouseEventHandler } from "../constants";

const props = defineProps({
  event: Function as PropType<MouseEventHandler>,
  display: String,
  icon: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

function getIcon() {
  return new URL(`../../assets/${props.icon}`, import.meta.url).href;
}
</script>
<template>
  <button
    class="actionBtn small"
    @click="event"
    :class="{ disabled: disabled }"
  >
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </button>
</template>
<style scoped>
@import "@/assets/styles/actionButton.scss";
</style>
