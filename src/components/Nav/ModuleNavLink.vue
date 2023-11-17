<script setup lang="ts">
import { RouterLink } from "vue-router";
import { PropType, defineProps } from "vue";
import { NavLink } from "./constants";

defineProps({
  text: String,
  children: Array as PropType<NavLink[]>,
});

function toggleExpand(el) {
  el.target.classList.toggle("active");
  const content = el.target.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}
</script>
<template>
  <li>
    <div class="mainLink" @click="toggleExpand">{{ text }}</div>
    <div class="links">
      <RouterLink
        v-for="child in children"
        :key="child.text"
        :to="child.path"
        class="link"
      >
        {{ child.text }}
      </RouterLink>
    </div>
  </li>
</template>
<style>
.links {
  padding: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.2s ease-out;
  background: rgb(30, 76, 119);
  display: flex;
  flex-direction: column;
}
.link {
  padding: 0.5em 0.8em;
  font-size: 0.9rem;
  line-height: normal;
  color: #fff;
}
.link:hover {
  background: rgb(102, 129, 167);
}
.mainLink {
  color: #fff;
  padding: 0.5em 0 0.5em 1em;
}
.mainLink:hover {
  cursor: pointer;
}
</style>
