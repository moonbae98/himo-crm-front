<template>
  <div class="info-panel">
    <div class="info-row" hidden>
      <span class="info-label">전화번호</span>
      <span class="info-value">{{ maincallnumber }}</span>
    </div>
    <div class="info-row">
      <span class="info-label">현재시간</span>
      <span class="info-value">{{ currentTime }}</span>
    </div>
  </div>
  <label class="switch">
    <input type="checkbox" :checked="isBrown" @change="handleToggle" />
    <span class="slider">
      <span class="slider-text black-text">BLACK</span>
      <span class="slider-text brown-text">BROWN</span>
    </span>
  </label>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentValue: "black",
      currentTime: "",
    };
  },
  computed: {
    isBrown() {
      return this.currentValue === "brown";
    },
  },
  mounted() {
    this.themeLoad();
    const mainextno = localStorage.getItem("mainextno");
    this.maincallnumberformatter(mainextno);
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  },
  methods: {
    setThemeClass() {
      // 기존 테마 클래스 제거 후 현재 값으로 설정
      document.body.className = document.body.className.replace(
        /theme-(black|brown)/g,
        ""
      );
      document.body.classList.add(`theme-${this.currentValue}`);
    },
    handleToggle() {
      const logininfo = localStorage.getItem("autologin");
      const loginObj = JSON.parse(logininfo);
      const autoid = loginObj.autoid;
      this.currentValue = this.currentValue === "black" ? "brown" : "black";
      axios.post("./designupdate", {
        color: this.currentValue,
        crmid: autoid,
      });
      this.setThemeClass();
    },

    async themeLoad() {
      const logininfo = localStorage.getItem("autologin");
      const loginObj = JSON.parse(logininfo);
      const autoid = loginObj.autoid;
      try {
        const response = await axios.post("./themeload", {
          crmid: autoid,
        });
        if (response && response.data && response.data !== "") {
          this.currentValue = response.data;
        } else {
          this.currentValue = "black";
        }
        this.setThemeClass();
      } catch (error) {
        console.log(error);
      }
    },
    maincallnumberformatter(value) {
      // value: "12345678" (문자열 8자리)
      if (!value || value.length !== 8) return "";

      const first = value.slice(0, 4); // "1234"
      const second = value.slice(4); // "5678"
      const formatted = `070-${first}-${second}`;

      this.maincallnumber = formatted;
    },

    updateCurrentTime() {
      const now = new Date();

      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const mi = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds() + 1).padStart(2, "0");
      this.currentTime = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    },
  },
};
</script>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 74px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d5d5d5;
  transition: 0.3s;
  border-radius: 25px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.slider:before {
  position: absolute;
  content: "";
  height: 30px;
  width: 30px;
  right: 2px;
  bottom: 2px;
  background-color: #36363a;
  transition: 0.3s;
  border-radius: 50%;
  z-index: 1;
}

.slider-text {
  position: absolute;
  font-size: 10px;
  font-weight: 600;
  color: var(--theme-black-primary-color);
  text-transform: uppercase;
  z-index: 2;
  letter-spacing: -0.025em;
  transition: opacity 0.3s;
}

.brown-text {
  opacity: 0;
  right: 8px;
  font-size: 8px;
}

.black-text {
  opacity: 1;
  left: 8px;
}

input:checked + .slider:before {
  transform: translateX(-40px);
  background-color: var(--theme-brown-primary-color);
}

input:checked + .slider .slider-text {
  color: var(--theme-brown-primary-color);
}

input:checked + .slider .brown-text {
  opacity: 1;
}

input:checked + .slider .black-text {
  opacity: 0;
}

.slider:hover {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
</style>
