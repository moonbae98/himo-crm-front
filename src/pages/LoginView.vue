<template>
  <div class="login-container">
    <div>
      <div class="mb-3">
        <AppLogo size="medium" align="center"/>
      </div>

      <div class="login-form-container px-4">
        <h2 class="login-title pt-4">LOGIN</h2>

        <b-form class="login-form" @submit.prevent="onSubmit">
          <b-form-group class="mb-3" label="아이디" label-for="input-crmid">
            <b-form-input
              id="input-crmid"
              v-model="crmid"
              placeholder="아이디를 입력하세요"
              autocomplete="username"
              required
              size="lg"
            ></b-form-input>
          </b-form-group>

          <div class="row d-flex justify-content-between">
            <div class="col-7">
              <b-form-group class="mb-3" label="비밀번호" label-for="input-password">
                <b-form-input
                  id="input-password"
                  v-model="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  autocomplete="current-password"
                  required
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-5">
              <b-form-group class="mb-3" label="내선번호" label-for="input-extNo">
                  <b-form-input
                    id="input-extNo"
                    v-model="extNo"
                    placeholder="내선번호"
                    autocomplete="off"
                    required
                    size="lg"
                  ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="mb-3">
            <!-- TODO: 자동로그인 기능 구현 필요 -->
            <b-form-checkbox
              id="checkbox"
              v-model="autoLoginCheck"
              name="checkbox"
              value="1"
              unchecked-value="0"
              size="lg"
            >
              자동로그인
            </b-form-checkbox>
          </div>

          <div class="d-grid pb-5">
            <b-button type="submit" variant="primary" size="lg">로그인</b-button>
          </div>
        </b-form>

        <div v-if="error" class="text-danger text-center mt-2">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";


import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BFormCheckbox,
} from "bootstrap-vue-next";

import AppLogo from "@/components/AppLogo.vue";

export default {
  name: "LoginView",
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BFormCheckbox,
    AppLogo,
  },
  data() {
    return {
      crmid: "",
      password: "",
      extNo: "",
      error: "",
      autoLoginCheck: 0, // TODO: 자동로그인 기능 구현 필요
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
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: max-content;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2f2f37;
}

.login-container > div {
  width: 100%;
  max-width: 570px;
}

.login-form-container {
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
}

.login-title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
}

.login-form {
  max-width: 430px;
  margin: 0 auto;
}

.login-form .form-label {
  font-size: 17px;
  font-weight: 700;
}
</style>