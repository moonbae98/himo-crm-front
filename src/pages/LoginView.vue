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
        <div class="row d-flex justify-content-between mb-2">
          <div class="col-auto pr-0">
            <b-button type="submit" variant="primary" block style="height: 100%"
              >로그인</b-button
            >
          </div>
          <div class="col-auto">
            <b-form-input
              id="input-extNo"
              v-model="extNo"
              placeholder="내선번호"
              autocomplete="off"
              required
              style="width: 120px"
            ></b-form-input>
          </div>
        </div>
      </b-form>
      <div v-if="error" class="text-danger text-center mt-2">{{ error }}</div>
    </b-card>
  </div>
</template>

<script>
// import axios from "axios";


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
      extNo: "",
      error: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        // const crmid = this.crmid;
        // const password = this.password;
        // const extNo = this.extNo;
        // const response = await axios.post("./login", {
        //   crmid,
        //   password,
        //   extNo,
        // });

        // console.log("로그인 성공:", response.data);

        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            nodejs_connector_url: "http://122.49.74.230:8087",
            userid: "test9260", // 사용자 ID
            exten: "9260",
            company_id: "himo", // 회사 ID
            passwd: "user!2322",
            first_status: "0",
            from_ui:"API",
          })
        );

        // 로그인 성공: 홈으로 이동
        this.$router.push({ name: "Home" });
      } catch (error) {
        // 서버에서 내려준 code로 분기
        const code = error.response?.data?.code;
        if (code === "INVALID_USER") {
          alert("아이디 또는 비밀번호가 잘못되었습니다.");
          this.error = "로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.";
        } else if (code === "INVALID_EXTNO") {
          alert("내선번호가 일치하지 않습니다.");
          this.error = "내선번호를 다시 확인해 주세요.";
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
          this.error = "로그인에 실패했습니다. 다시 시도해 주세요.";
        }
        console.log(error);
        this.$router.push({ name: "Home" });
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
