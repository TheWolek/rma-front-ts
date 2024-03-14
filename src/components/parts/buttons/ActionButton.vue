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
  width: {
    type: String,
    default: "80px",
  },
  justifyContent: {
    type: String,
    default: "center",
  }
});

const getIcon = computed(() => require(`../../../assets/${props.icon}`));
</script>
<template>
  <button class="actionBtn" @click="event" :class="{ disabled: disabled }">
    <img v-if="icon" :src="getIcon" /> {{ display }}
  </button>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actionButton.scss";

.actionBtn {
  width: v-bind(width);
  justify-content: v-bind(justifyContent);
}
</style>
