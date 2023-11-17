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
  <div class="actionBtn small" @click="event" :class="{ disabled: disabled }">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </div>
</template>
<style scoped>
.actionBtn.small {
  font-size: 0.82rem;
  font-weight: 700;
}

.actionBtn.small img {
  width: 14px;
}

.actionBtn.small:nth-child(1) {
  width: 74px;
}
</style>
