<script setup lang="ts">
import { PropType, defineProps, computed } from "vue";
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

const getIcon = computed(() => require(`../../../assets/${props.icon}`));
</script>
<template>
  <button class="actionBtn" @click="event" :class="{ disabled: disabled }">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </button>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/actionButton.scss";
</style>
