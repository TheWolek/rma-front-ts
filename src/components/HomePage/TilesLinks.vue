<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { Link } from "./constants";

defineProps({
  links: { type: Array as PropType<Link[]>, required: true },
});
</script>
<template>
  <div class="tilesLinks">
    <h1 class="underline">Wybierz, co chcesz robić</h1>
    <div class="tilesRow">
      <div class="tile" v-for="link in links" :key="link.label">
        <RouterLink :to="link.link" class="tileLink">{{
          link.label
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  color: var(--vt-c-black-mute);
}
h1.underline {
  padding-bottom: 0.3em;
  padding-left: 2em;
  border-bottom: 1px solid #000;
}
.tilesLinks {
  margin-top: 0.5em;
  width: 100%;
  padding: 1em;
  background-color: #f3f3f3;
}

.tilesRow {
  padding: 1.5em 3em;
  width: 100%;
  display: flex;
  gap: 3em;
}

.tile {
  border: 1px solid #000;
  width: 200px;
  height: 150px;
}

.tileLink {
  display: grid;
  place-items: center;
  color: #000;
  width: 100%;
  height: 100%;
}

.tileLink:hover {
  background-color: #e2e2e2;
}
</style>
