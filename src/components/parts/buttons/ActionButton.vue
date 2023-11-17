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
  <div class="actionBtn" @click="event" :class="{ disabled: disabled }">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </div>
</template>
