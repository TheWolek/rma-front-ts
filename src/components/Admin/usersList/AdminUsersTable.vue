<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import AdminUsersRow from "./AdminUsersRow.vue";

const store = useUserStore();
const { loadingUsersList, userList } = storeToRefs(store);
</script>
<template>
  <div>
    <table>
      <div class="loadingWrap" :class="{ active: loadingUsersList }">
        <LoadingDots :active="loadingUsersList" />
      </div>
      <tr>
        <th>Login</th>
        <th>Rola</th>
        <th>Data rejestracji</th>
        <th>Ostatnie logowanie</th>
        <th>Zmiana hasła</th>
      </tr>
      <AdminUsersRow
        v-for="user in userList"
        :key="user.user_id"
        :data="user"
      />
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/table.scss";

table tr th:nth-child(1),
table tr td:nth-child(1) {
  width: 170px;
}

table tr th:nth-child(2),
table tr td:nth-child(2) {
  width: 100px;
}

table tr th:nth-child(3),
table tr td:nth-child(3),
table tr th:nth-child(4),
table tr td:nth-child(4) {
  width: 140px;
}

table tr th:nth-child(5),
table tr td:nth-child(5) {
  width: 100px;
}
</style>
