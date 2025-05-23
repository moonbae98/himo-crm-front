<template>
  <h1>메인 화면(구현예정)</h1>
  <p>로그인정보</p>
  <p>이름:{{ user.name }}</p>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      user: null
    };
  },
  async mounted() {
      const response = await axios.get("./session");
      this.user = response.data;
  }
};
</script>