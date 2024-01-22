<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { RouterLink } from "vue-router";
import { User } from "@/stores/user/constants";
import { formatDateAndHours } from "@/helpers/dateFormatters";

defineProps({
  data: {} as PropType<User>,
});
</script>
<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'userDetails', params: { id: data.user_id } }">
        {{ data.login }}
      </RouterLink>
    </td>
    <td>{{ data.role }}</td>
    <td>{{ formatDateAndHours(data.created_date) }}</td>
    <td>{{ formatDateAndHours(data.last_login_date) }}</td>
    <td>
      <input type="checkbox" :checked="data.change_password" disabled />
    </td>
  </tr>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";
</style>
