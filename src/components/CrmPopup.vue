<!-- CrmPopup.vue -->

<!-- crminfo값에 따라서 팝업내용이 달라집니다 아래쪽 스크립트에서 crminfo를 수정하면서 작업해주시면 감사하겠습니다.-->


<template>
  <div>
    <!-- v-if="crminfo.callCustcode" -->
    <div class v-if="crminfo">
      <div class="crmpopupinfo">
        <p class="popuptextbox">
          <strong>고객명:</strong> <!-- {{ crminfo.callCustname }} -->
        </p>
        <p class="popuptextbox">
          <strong>일자:</strong> <!-- {{ crminfo.callDate }} -->
        </p>
        <div style="display: flex">
          <div class="flexside">
            <p class="popuptextbox">
              <strong>고객코드:</strong> <!-- {{ crminfo.callCustcode }} -->
            </p>
            <p class="popuptextbox">
              <strong>통화지점:</strong> <!-- {{ crminfo.indeptName }} -->
            </p>
          </div>
        </div>
        <div class="flexside">
          <p class="popuptextbox">
            <strong>전화번호:</strong> <!-- {{ crminfo.callPhoneno }} -->
          </p>
          <p class="popuptextbox">
            <strong>최종예약내역:</strong> <!-- {{ crminfo.lastRsrvName }} -->
          </p>
        </div>
        <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
      </div>
    </div>
    <div v-else>
      <div class="crmpopupinfo">
        <p class="popuptextbox">
          <strong>고객 정보 없음</strong> 
        </p>
        <p class="popuptextbox">
          <strong>일자:</strong> <!-- {{ crminfo.callDate }} -->
        </p>
        <div style="display: flex">
          <div class="flexside">
            <p class="popuptextbox">
              <strong>통화지점:</strong> <!-- {{ crminfo.indeptName }} -->
            </p>
          </div>
        </div>
        <div class="flexside">
          <p class="popuptextbox">
            <strong>전화번호:</strong> <!-- {{ crminfo.callPhoneno }} -->
          </p>
        </div>
        <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
      </div>
    </div>
  </div>
</template>

<script>
/* import axios from "axios"; */

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
    /* const storedHpNo = localStorage.getItem("hpNo");
    if (storedHpNo) {
      this.hpNo = storedHpNo;
      this.callDate = localStorage.getItem("callDate");
      this.fetchCrmInfo();
    } */
  },
  methods: {
    /* fetchCrmInfo() {
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
    }, */
  },
};
</script>
