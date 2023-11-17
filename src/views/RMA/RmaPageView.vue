<script setup lang="ts"></script>
<template>
  <div id="rmaPage"></div>
</template>
<style>
.rmaPage_wrap {
  padding: 0.5em;
}

.rmaPage_wrap_details {
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.inlineEdit {
  display: grid;
  grid-template-columns: auto 1fr 40px;
  justify-content: flex-start;
  column-gap: 0.5em;
  width: 70%;
}

.inlineEdit input:disabled {
  background: none;
  border: 2px solid transparent;
  cursor: default;
}

.btn {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.btn img {
  width: 100%;
}

textarea {
  resize: none;
}

textarea:disabled {
  cursor: default !important;
}

h1 {
  font-size: 1.3em !important;
}
h2 {
  font-size: 1.1em;
  padding: 0 0 0.5em 0.5em;
  border-bottom: 1px solid #000;
  margin-bottom: 0.5em;
}
h3 {
  font-size: 1em;
  padding: 0 0 0.1em 0.5em;
}

h3.email {
  text-transform: none;
}

h2,
h3,
p {
  color: var(--vt-c-black-mute);
  text-transform: capitalize;
}
</style>
