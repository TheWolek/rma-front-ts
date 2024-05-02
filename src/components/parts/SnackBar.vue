<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";

const store = useRmaStore();
const { rmaPageSnackbar } = storeToRefs(store);

const getIcon = computed(() =>
  rmaPageSnackbar.value.icon === ""
    ? ""
    : require(`../../assets/${rmaPageSnackbar.value.icon}`)
);

const isWarning = computed(() => rmaPageSnackbar.value.color === "Warning");
const isInfo = computed(() => rmaPageSnackbar.value.color === "Info");
</script>
<template>
  <div class="snackbarWrap">
    <div
      class="snackbar"
      :class="{
        active: rmaPageSnackbar.active,
        waring: isWarning,
        info: isInfo,
      }"
    >
      <img :src="getIcon" />
      <h3>{{ rmaPageSnackbar.text }}</h3>
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
    right: -380px;
    z-index: 100;
    min-width: 280px;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    border-radius: 6px;
    border: 2px solid red;
    background-color: rgb(253, 88, 88);
    padding: 10px 12px;
    cursor: pointer;
    transition: ease 0.15s;

    &.active {
      transform: translateX(-400px);
    }

    &.warning {
      border: 2px solid red;
      background-color: rgb(253, 88, 88);
    }

    &.info {
      border: 2px solid rgb(0, 0, 0);
      background-color: rgb(0, 0, 0);

      h3 {
        color: #fff;
      }

      img {
        filter: invert(1);
      }
    }

    img {
      width: 25px;
    }

    h3 {
      font-weight: normal;
      text-transform: none;
    }
  }
}
</style>
