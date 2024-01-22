<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { MouseEventHandler } from "../constants";

defineProps({
  event: Function as PropType<MouseEventHandler>,
  loading: Boolean,
});
</script>
<template>
  <button class="actionBtn refreshBtn" @click="event">
    <img src="@/assets/refresh.svg" :class="{ active: this.loading }" />
  </button>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actionButton.scss";
.refreshBtn {
  &:hover img {
    transform: rotate(90deg);
  }

  img {
    transition: transform 0.2s ease-out;

    &.active {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
