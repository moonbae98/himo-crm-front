<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img
      alt="Crm logo"
      src="../assets/crm_icon.png"
      class="login-crm-img mb-4"
    />
    <b-card style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-4">CRM Login</h2>
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-2" label="아이디" label-for="input-crmid">
          <b-form-input
            id="input-crmid"
            v-model="crmid"
            placeholder="아이디를 입력하세요"
            autocomplete="username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-2" label="비밀번호" label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            autocomplete="current-password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" block>로그인</b-button>
      </b-form>
      <div v-if="error" class="text-danger text-center mt-2">{{ error }}</div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

import {
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
} from "bootstrap-vue-next";

export default {
  name: "LoginView",
  components: {
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
  },
  data() {
    return {
      crmid: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const crmid = this.crmid;
        const password = this.password;
        const response = await axios.post("./login", { crmid, password });

        // 라우터 이동 (HomeView로)
        console.log(response);
        this.$router.push({ name: "Home" }); // 또는 this.$router.push('/')
      } catch (error) {
        console.log(error);
        alert("아이디 혹은 비밀번호가 잘못되었습니다.")
        this.error = "로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.";
      }
    },
  },
};
</script>

<style>
.login-crm-img {
  width: 100px;
  height: 50%;
}
</style>
