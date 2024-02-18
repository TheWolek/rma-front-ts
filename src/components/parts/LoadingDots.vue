<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  active: Boolean,
});
</script>
<template>
  <div class="loadingDots-wrap">
    <div class="loadingDots-dot" :class="{ active: active }"></div>
    <div class="loadingDots-dot" :class="{ active: active }"></div>
    <div class="loadingDots-dot" :class="{ active: active }"></div>
  </div>
</template>
<style lang="scss">
.loadingDots-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.loadingDots-wrap .loadingDots-dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: var(--vt-c-black-mute);
  animation: flick 0.8s linear alternate infinite;
  display: none;
}

.loadingDots-wrap .loadingDots-dot.active {
  display: block;
}

.loadingDots-wrap .loadingDots-dot:nth-child(2) {
  animation-delay: 0.4s;
}

.loadingDots-wrap .loadingDots-dot:nth-child(3) {
  animation-delay: 0.8s;
}

@keyframes flick {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.4);
    opacity: 0.8;
  }
}
</style>
