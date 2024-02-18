<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { userLogin } = storeToRefs(store);
</script>
<template>
  <div class="badgeWrap">
    <p>{{ userLogin }}</p>
    <div class="bagde">{{ userLogin[0].toUpperCase() }}</div>
  </div>
</template>
<style scoped lang="scss">
.badgeWrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badgeWrap p {
  color: #fff;
}

.bagde {
  width: 35px;
  height: 35px;
  background-color: #fff;
  color: #000;
  display: grid;
  place-items: center;
  border-radius: 18px;
  font-weight: bold;
}
</style>
