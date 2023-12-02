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
