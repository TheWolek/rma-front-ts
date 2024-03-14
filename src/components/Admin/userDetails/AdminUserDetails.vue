<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import { formatDateAndHours } from "@/helpers/dateFormatters";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";
import AdminDeleteUserDialog from "./modals/AdminDeleteUserDialog.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const store = useUserStore();
const route = useRoute();
const { loadingUserDetails, deleteDialogActive, userDetails } =
  storeToRefs(store);

onMounted(async () => {
  if (isNaN(parseInt(String(route.params.id)))) {
    router.push({ name: "admin" });
    return;
  }
  if (!(await store.fetchByID(Number(route.params.id)))) {
    router.push({ name: "admin" });
    return;
  }
});

const onSave = () => {
  store.updateUser();
};

const onDelete = () => {
  deleteDialogActive.value = !deleteDialogActive.value;
};

const onBack = () => {
  router.go(-1);
};
</script>
<template>
  <div id="adminUserDetails">
    <AdminDeleteUserDialog />
    <div class="loadingWrap" v-if="loadingUserDetails">
      <LoadingDots :active="loadingUserDetails" />
    </div>
    <div class="detailsWrap" v-if="!loadingUserDetails">
      <div class="backButtonWrap">
        <ActionButton
          display="Cofnij"
          :icon="`back-arrow.png`"
          :event="onBack"
        />
      </div>
      <h1>Użytkownik #{{ userDetails.user_id }}</h1>
      <h3>
        Login: <b>{{ userDetails.login }}</b>
      </h3>
      <h3>
        Data rejestracji:
        <b>{{ formatDateAndHours(userDetails.created_date) }}</b>
      </h3>
      <h3>
        Ostatnie logowanie:
        <b>{{ formatDateAndHours(userDetails.last_login_date) }}</b>
      </h3>
      <form @submit.prevent="onSave">
        <div class="roleWrap">
          <SelectInput id="role" label="Rola" v-model="userDetails.role">
            <option value="Admin">Admin</option>
            <option value="CC">CC</option>
            <option value="TECH">TECH</option>
            <option value="LS">LS</option>
          </SelectInput>
        </div>
        <div class="changePasswordWrap">
          <p>Wymuszenie zmiany hasła:</p>
          <input
            type="checkbox"
            name="change_password"
            id="change_password"
            v-model="userDetails.change_password"
          />
        </div>
        <SubmitButton label="Zapisz" />
        <ActionButton display="Usuń" :event="onDelete" />
      </form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.detailsWrap {
  padding: 16px;
}

.roleWrap {
  width: 10%;
}

.detailsWrap form {
  padding: 0;
}

.changePasswordWrap {
  display: flex;
  align-items: center;
}



.submitButton {
  width: 100px;
  margin: 12px 0;
}

input[type="checkbox"] {
  width: auto;
  margin-left: 12px;
}

.backButtonWrap {
  margin-bottom: 14px;
}
</style>
