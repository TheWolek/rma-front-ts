<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";

const store = useRmaStore();
const { rmaPageSnackbarActive, rmaPageSnackbarText } = storeToRefs(store);

const getIcon = computed(() => require(`../../assets/close.svg`));
</script>
<template>
  <div class="snackbarWrap">
    <div class="snackbar" :class="{ active: rmaPageSnackbarActive }">
      <img :src="getIcon" />
      <h3>{{ rmaPageSnackbarText }}</h3>
    </div>
  </div>
</template>
<style scoped lang="scss">
.snackbarWrap {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .snackbar {
    position: absolute;
    top: 30px;
    right: -280px;
    z-index: 100;
    min-width: 280px;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    border-radius: 6px;
    border: 2px solid red;
    background-color: rgb(253, 88, 88);
    padding: 10px;
    cursor: pointer;
    transition: ease 0.15s;

    &.active {
      transform: translateX(-300px);
    }

    img {
      width: 25px;
    }

    h3 {
      font-weight: 600;
    }
  }
}
</style>
