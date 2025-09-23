<template>
  <div>
    <div class="crm-popup-container">
      <header class="crm-popup-header">
        <h2 class="popup-title">CRM 정보</h2>
        <button
          @click="closePopup"
          type="button"
          class="btn-close"
          aria-label="Close"
        ></button>
      </header>

      <div class="crm-info-content">
        <div class="info-grid">
          <div class="info-group">
            <b-form-group label="고객명">
              <b-form-input v-model="customerInfo.callCustname" />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="일자">
              <b-form-input v-model="customerInfo.callDate" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="수신 전화번호">
              <b-form-input v-model="customerInfo.callInsphone" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="성별">
              <b-form-select v-model="customerInfo.gender" :options="genders" />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="사용 전화번호">
              <b-form-input v-model="customerInfo.callPhoneno" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="핸드폰번호">
              <b-form-input v-model="customerInfo.callUsephone" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="고객코드">
              <b-form-input v-model="customerInfo.callCustcode" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="통화지점">
              <b-form-input v-model="customerInfo.deptName" readonly />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="고객 구분">
              <b-form-select
                v-model="customerInfo.mastGubun"
                :options="customerTypes"
              />
            </b-form-group>
          </div>
          <div class="info-group">
            <b-form-group label="문자 수신">
              <b-form-select
                v-model="customerInfo.mastSmsYn"
                :options="smsReceives"
              />
            </b-form-group>
          </div>
          <div class="info-group full-width">
            <b-form-group label="상담내역">
              <b-form-textarea v-model="safeCallRemark" rows="6" no-resize />
            </b-form-group>
          </div>
        </div>
      </div>

      <div class="crm-popup-footer">
        <b-button class="btn btn-secondary" @click="infopopupclose"
          >취소</b-button
        >
        <b-button class="btn btn-primary" @click="crminfosave">저장</b-button>
      </div>
    </div>
  </div>
</template>

<script>
// src/pages/HomeView.vue
import axios from "axios";
import {
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
} from "bootstrap-vue-next";

export default {
  name: "CrmInfoPopup",
  components: {
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
  },
  data() {
    return {
      callPhoneno: "",
      callDate: "",
      customerInfo: { callCustname: "" }, // 고객 정보 저장
      genders: [
        { text: "여성", value: "0", disabled: false },
        { text: "남성", value: "1", disabled: false },
      ],
      customerTypes: [
        { text: "신규 고객", value: "0", disabled: false },
        { text: "기존 고객", value: "1", disabled: false },
        { text: "기타 고객", value: "2", disabled: false },
      ],
      smsReceives: [
        { text: "수신", value: "Y", disabled: false },
        { text: "수신거부", value: "N", disabled: false },
      ],
    };
  },
  mounted() {
    // 팝업이 열릴 때 로컬 스토리지에서 데이터 가져오기
    const callPhoneno = localStorage.getItem("listHpNo");
    const callDate = localStorage.getItem("listCallDate");
    this.infomationload(callPhoneno, callDate);
    console.log("팝업 데이터:", callPhoneno, callDate);
  },
  methods: {
    async crminfosave() {
      if (!this.customerInfo.callCustname) {
        alert("고객명을 입력하세요!!");
        return;
      }

      if (!this.customerInfo.mastSmsYn) {
        alert("문자수신값을 입력하세요!!");
        return;
      }
      if (!this.customerInfo.mastGubun) {
        alert("고객구분값과 입력하세요!!");
        return;
      }
      if (!this.customerInfo.gender) {
        alert("성별을 입력하세요!!");
        return;
      }

      try {
        const payload = {
          callPhoneno: this.customerInfo.callPhoneno,
          callCustname: this.customerInfo.callCustname,
          callInsphone: this.customerInfo.callInsphone,
          callUsephone: this.customerInfo.callUsephone,
          callCustcode: this.customerInfo.callCustcode,
          deptName: this.customerInfo.deptName,
          callDate: this.customerInfo.callDate,
          callGender: this.customerInfo.gender || "",
          callCusttype: this.customerInfo.mastGubun || "",
          callSmsreceive: this.customerInfo.mastSmsYn || "",
          callMemo: this.customerInfo.callRemark || "",
          callDept: this.customerInfo.callDept || "",
          usercode: localStorage.getItem("usercode"),
        };
        await axios.post("./consultations", payload);

        if (window.opener && !window.opener.closed) {
          window.opener.sessionStorage.setItem("isRefreshing", "true");
          window.opener.location.reload();
        }
        alert("CRM 정보가 저장되었습니다.");
        window.close();
      } catch (error) {
        alert("CRM 정보 저장에 실패했습니다.");
      }
    },
    infopopupclose() {
      window.close();
    },

    async infomationload(callPhoneno, callDate) {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: callPhoneno,
          callDate: callDate,
        });
        this.customerInfo =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : null;
        if (!this.customerInfo.mastGubun && !this.customerInfo.mastSmsYn) {
          this.customerInfo.mastGubun = "0";
          this.customerInfo.mastSmsYn = "Y";
        }
        console.log("고객 정보:", this.customerInfo);
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
    },
    closePopup() {
      if (window.opener) {
        window.close();
      }
    },
  },
  computed: {
    safeCallRemark: {
      get() {
        return this.customerInfo && this.customerInfo.callRemark
          ? this.customerInfo.callRemark
          : "";
      },
      set(value) {
        if (!this.customerInfo) {
          // customerInfo가 아직 없으면 빈 객체로 초기화
          this.customerInfo = {};
        }
        this.customerInfo.callRemark = value;
      },
    },
  },
};
</script>
