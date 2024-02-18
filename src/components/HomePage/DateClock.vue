<script setup lang="ts">
import { formatDate, formatTime } from "@/helpers/dateFormatters";
import { onMounted, ref } from "vue";

const date = ref(formatDate(new Date()));
const clock = ref(formatTime(new Date()));

function startClock() {
  setInterval(() => {
    clock.value = formatTime(new Date());
  }, 1000);
}

onMounted(() => {
  startClock();
});
</script>
<template>
  <div class="dateWrap">
    <div>
      <span>{{ date }}</span>
      <span>{{ clock }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dateWrap {
  width: 100%;
  padding: 1em 3em;
}

.dateWrap div span {
  color: var(--vt-c-black-mute);
  font-size: 1.6rem;
  font-weight: 400;
}

.dateWrap div span + span {
  margin-left: 0.4em;
}
</style>
