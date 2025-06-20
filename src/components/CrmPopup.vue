<!-- CrmPopup.vue -->
<template>
  <div>
    <div class v-if="crminfo">
      <div class="crmpopupinfo">
        <p class="popuptextbox">
          <strong>고객명:</strong> {{ crminfo.callCustname }}
        </p>
        <p class="popuptextbox">
          <strong>일자:</strong> {{ crminfo.callDate }}
        </p>
        <div style="display: flex">
          <div class="flexside">
            <p class="popuptextbox">
              <strong>고객코드:</strong> {{ crminfo.callCustcode }}
            </p>
            <p class="popuptextbox">
              <strong>통화지점:</strong> {{ crminfo.indeptName }}
            </p>
          </div>
        </div>
        <div class="flexside">
          <p class="popuptextbox">
            <strong>전화번호:</strong> {{ crminfo.callPhoneno }}
          </p>
          <p class="popuptextbox">
            <strong>최종예약내역:</strong> {{ crminfo.lastRsrvName }}
          </p>
        </div>
        <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
      </div>
    </div>
    <div v-else>
      <p>저장되어있지 않은 고객 번호입니다.</p>
      <p>전화번호: {{ hpNo }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hpNo: null,
      crminfo: null,
      callDate: null,
    };
  },
  mounted() {
    const storedHpNo = localStorage.getItem("hpNo");
    if (storedHpNo) {
      this.hpNo = storedHpNo;
      this.callDate = localStorage.getItem("callDate");
      this.fetchCrmInfo();
    }
  },
  methods: {
    fetchCrmInfo() {
      if (this.hpNo) {
        axios
          .post("./crm-popup-info", {
            hpNo: this.hpNo,
            callDate: this.callDate,
          })
          .then((response) => {
            this.crminfo = response.data;
            console.log("CRM 정보 조회 성공:", this.crminfo);
          })
          .catch((error) => {
            console.error("CRM 정보 조회 실패:", error);
          });
      }
    },
    restoreParentWindow() {
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.focus(); // 백그라운드 창에 포커스
          // 부모 창이 최소화된 경우 알림
          if (window.opener.document.visibilityState === "hidden") {
            window.opener.document.visibilityState = "visible"; // 부모 창을 활성화
          }
        } catch (e) {
          console.error("부모 창 접근 실패:", e);
        }
      } else {
        alert("부모 창이 닫혔습니다.");
      }
    },
  },
};
</script>
