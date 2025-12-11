<template>
  <div class="login-container">
    <div>
      <div class="mb-3">
        <AppLogo size="medium" align="center" />
      </div>

      <div class="login-form-container px-4">
        <h2 class="login-title">LOGIN</h2>

        <b-form class="login-form" @submit.prevent="onSubmit">
          <b-form-group class="mb-3" label="아이디" label-for="input-crmid">
            <b-form-input
              id="input-crmid"
              class="gray-form-input"
              v-model="crmid"
              placeholder="아이디를 입력하세요"
              autocomplete="username"
              required
              size="lg"
            ></b-form-input>
          </b-form-group>

          <div class="row d-flex justify-content-between">
            <div class="col-7">
              <b-form-group
                class="mb-3"
                label="비밀번호"
                label-for="input-password"
              >
                <div class="password-input-wrapper">
                  <b-form-input
                    id="input-password"
                    class="gray-form-input"
                    v-model="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autocomplete="current-password"
                    required
                    size="lg"
                    @keydown="checkCapsLock"
                    @keyup="checkCapsLock"
                    @focus="checkCapsLock"
                    @blur="hideCapsLockWarning"
                  ></b-form-input>
                  
                  <!-- Caps Lock 경고 메시지 -->
                  <div v-if="capsLockOn" class="caps-lock-warning">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    Caps Lock이 켜져 있습니다
                  </div>
                </div>
              </b-form-group>
            </div>
            <div class="col-5">
              <b-form-group
                class="mb-3"
                label="내선번호"
                label-for="input-extNo"
              >
                <b-form-input
                  id="input-extNo"
                  class="gray-form-input"
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
            <b-button type="submit" variant="primary" size="lg" class="mb-3"
              >로그인</b-button
            >
            
            <!-- <a
              href="/himo-crm/resources/vue/downloads/allow_popups.bat"
              download
              class="btn btn-outline-secondary btn-sm"
              title="설치파일 다운로드"
            >
              팝업 자동 설정 파일 다운로드
            </a> -->
            
          </div>
        </b-form>

        <div v-if="error" class="text-danger text-center mt-2">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BFormCheckbox,
} from "bootstrap-vue-next";

import AppLogo from "@/components/AppLogo.vue";
import CryptoJS from "crypto-js";

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
      capsLockOn: false, // Caps Lock 상태
    };
  },
  mounted() {
    const autologinStr = localStorage.getItem("autologin");

    if (autologinStr) {
      try {
        const autologin = JSON.parse(autologinStr);
        if (autologin.autoLoginCheck == 1 || autologin.autoLoginCheck === "1") {
          this.crmid = autologin.autoid;
          this.extNo = autologin.autoextno;
          this.password = autologin.autopw;
          this.autoLoginCheck = 1;

          this.onSubmit();
        } else {
          localStorage.removeItem("autologin");
          this.autoLoginCheck = 0;
        }
      } catch (e) {
        // 파싱 실패 시 제거
        localStorage.removeItem("autologin");
        this.autoLoginCheck = 0;
      }
    }
  },

  methods: {
    // Caps Lock 상태 확인
    checkCapsLock(event) {
      if (event.getModifierState && event.getModifierState('CapsLock')) {
        this.capsLockOn = true;
      } else {
        this.capsLockOn = false;
      }
    },
    
    // 비밀번호 필드에서 포커스 아웃될 때 경고 숨김
    hideCapsLockWarning() {
      this.capsLockOn = false;
    },

    async onSubmit() {
      try {
        const crmid = this.crmid;
        const password = this.aesEncrypt(this.password, "himoadmin1234567");
        const extNo = this.extNo;
        const response = await axios.post("./login", {
          crmid,
          password,
          extNo,
        });

        //String  gs_ipphone_ip   = '1.214.143.90'
        //String  gs_ipphone_port = '8083'
        //http://211.234.122.115:8888/
        //https://122.49.74.231/:8888/

        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            //nodejs_connector_url: "http://211.234.122.115:8087",
            nodejs_connector_url: "wss://eicn.himo.com:8087",
            userid: "user" + this.extNo, // 사용자 ID
            exten: this.extNo,
            company_id: "himo", // 회사 ID
            passwd: "user!2322",
            first_status: "0",
            from_ui: "API",

            // nodejs_connector_url: "https://122.49.74.231:8087",
            // userid: "test" + this.extNo, // 사용자 ID
            // exten: this.extNo,
            // company_id: "himo", // 회사 ID
            // passwd: "user!2322",
            // first_status: "0",
            // from_ui: "API",

            //nodejs_connector_url: "http://122.49.74.230:8087",
            // nodejs_connector_url: "wss://eicn.himo.com:8087",
            // userid: "test9260", // 사용자 ID
            // exten: "9260",
            // company_id: "himo", // 회사 ID
            // passwd: "user!2322",
            // first_status: "0",
            // from_ui: "API",
          })
        );

        localStorage.setItem(
          "autologin",
          JSON.stringify({
            autoLoginCheck: this.autoLoginCheck,
            autoid: crmid,
            autopw: this.aesDecrypt(password, "himoadmin1234567"),
            autoextno: extNo,
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
      }
    },

    aesEncrypt(plainText, key) {
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const encrypted = CryptoJS.AES.encrypt(plainText, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString(); // 기본 Base64 반환
    },

    aesDecrypt(encryptedBase64, key) {
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const decrypted = CryptoJS.AES.decrypt(encryptedBase64, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      // 복호화된 워드 배열을 UTF-8 문자열로 변환
      return decrypted.toString(CryptoJS.enc.Utf8);
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
  background-color: #fff;
}

.login-container > div {
  width: 100%;
  max-width: 570px;
}

.login-form-container {
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  background-color: #fff;
}

.login-title {
  padding-top: 30px;
  margin-bottom: 20px;
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

/* Caps Lock 경고 스타일 */
.password-input-wrapper {
  position: relative;
}

.caps-lock-warning {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 8px 12px;
  font-size: 12px;
  color: #856404;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.caps-lock-warning::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 15px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #ffeaa7;
}

.caps-lock-warning i {
  color: #f39c12;
  font-size: 14px;
}

/* 반응형 대응 */
@media (max-width: 576px) {
  .caps-lock-warning {
    font-size: 11px;
    padding: 6px 10px;
  }
}
</style>
