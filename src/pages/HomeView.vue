<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <img
      alt="Crm logo"
      src="../assets/crm_icon.png"
      class="login-crm-img mb-4"
    />
    <b-card style="max-width: 400px; width: 100%">
      <h1>메인 화면(테스트)</h1>
      <p>로그인정보</p>
      <p>이름: {{ user?.name }}</p>
      <b-button variant="primary" @click="showConfirm = true">로그아웃</b-button>
    </b-card>

    <!-- 로그아웃 확인 모달 -->
    <b-modal v-model:show="showConfirm" title="로그아웃 확인">
      로그아웃하시겠습니까?
      <template #footer>
        <b-button variant="secondary" @click="showConfirm = false">취소</b-button>
        <b-button variant="primary" @click="logout">로그아웃</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BCard, BButton, BModal } from "bootstrap-vue-next";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    BCard,
    BButton,
    BModal,
  },
  data() {
    return {
      user: null,
      showConfirm: false, // 모달 표시 여부
    };
  },
  async mounted() {
    const response = await axios.get("./session");
    this.user = response.data;
  },
  methods: {
    async logout() {
      try {
        await axios.post("./logout");
        this.showConfirm = false; // 모달 닫기
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>
