<!-- CrmPopup.vue -->

<!-- crminfo값에 따라서 팝업내용이 달라집니다 아래쪽 스크립트에서 crminfo를 수정하면서 작업해주시면 감사하겠습니다.-->


<template>
  <div>
    <!-- v-if="crminfo.callCustcode" -->
    <div class v-if="crminfo">
      <div class="crm-popup-container">
        <header class="crm-popup-header">
          <h2 class="popup-title">CRM 정보</h2>
          <button @click="closePopup" type="button" class="btn-close" aria-label="Close"></button>
        </header>

        <div class="crm-info-content">
          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">홍길동<!-- {{ crminfo.callCustname }} --></div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">20250701<!-- {{ crminfo.callDate }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">고객코드</div>
              <div class="info-text">11111111<!-- {{ crminfo.callCustcode }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">영업본사<!-- {{ crminfo.indeptName }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text">010-1111-1111<!-- {{ crminfo.callPhoneno }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">최종예약내역</div>
              <div class="info-text">기성가발구매<!-- {{ crminfo.lastRsrvName }} --></div>
            </div>
          </div>

          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="crm-popup-container">
        <header class="crm-popup-header">
          <h2 class="popup-title">CRM 정보</h2>
          <button @click="closePopup" type="button" class="btn-close" aria-label="Close"></button>
        </header>

        <div class="crm-info-content">
          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">고객 정보 없음</div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">20250701<!-- {{ crminfo.callDate }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">영업본사<!-- {{ crminfo.indeptName }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text">010-1111-1111<!-- {{ crminfo.callPhoneno }} --></div>
            </div>
          </div>

          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      hpNo: null,
      /* crminfo 값을 고객정보 없을때  빈값 "" 고객정보 있을때 "1" 바꾸면서 작업하시면 됩니다.*/
      crminfo: "1",
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
      // if (this.hpNo) {
      //   axios
      //     .post("./crm-popup-info", {
      //       hpNo: this.hpNo,
      //       callDate: this.callDate,
      //     })
      //     .then((response) => {
      //       this.crminfo = response.data;
      //       console.log("CRM 정보 조회 성공:", this.crminfo);
      //     })
      //     .catch((error) => {
      //       console.error("CRM 정보 조회 실패:", error);
      //     });
      // }
    },
    closePopup() {
      if (window.opener) {
          window.close()
      }
    },
  },
};
</script>