<script setup lang="ts">
import AdminAddUserModal from "./modals/AdminAddUserModal.vue";
import AdminUsersActions from "./AdminUsersActions.vue";
import AdminUsersTable from "./AdminUsersTable.vue";
</script>
<template>
  <AdminAddUserModal />
  <div class="adminUserlist_wrap">
    <AdminUsersActions />
    <h1>Wszyscy użytkownicy</h1>
    <AdminUsersTable />
  </div>
</template>
