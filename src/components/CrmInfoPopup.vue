<template>
  <b-card class="modern-card" style="margin: 10px">
    <div class="form-pair-table">
      <div class="form-pair-row">
        <label>고객명 :</label>
        <input
          class="slim-input"
          v-model="customerInfo.callCustname"
        />
        <label>일자 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.callDate : ''"
        />
      </div>
      <div class="form-pair-row">
        <label>수신 전화번호 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.callInsphone : ''"
        />
        <label>성별 :</label>
        <select class="slim-input" v-model="customerInfo.gender">
          <option
            v-for="option in genders"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="form-pair-row">
        <label>사용 전화번호 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.callPhoneno : ''"
        />
        <label>핸드폰번호 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.callUsephone : ''"
        />
      </div>
      <div class="form-pair-row">
        <label>고객코드 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.callCustcode : ''"
        />
        <label>통화지점 :</label>
        <input
          readonly
          class="slim-input"
          :value="customerInfo ? customerInfo.deptName : ''"
        />
      </div>
      <div class="form-pair-row">
        <label>고객 구분 :</label>
        <select class="slim-input" v-model ="customerInfo.mastGubun">
          <option
            v-for="option in customerTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
        <label>문자 수신 :</label>
        <select class="slim-input" v-model="customerInfo.mastSmsYn">
          <option
            v-for="option in smsReceives"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <label>상담내역</label>
    <textarea
      rows="4"
      style="height: 120px"
      v-model="safeCallRemark"
      class="form-control mb-2 no-resize slim-textarea"
    ></textarea>
  </b-card>
  <div>
    <b-button class="btn btn-primary" style="margin: 10px" @click="crminfosave"
      >저장</b-button
    >
    <b-button
      class="btn btn-secondary"
      style="margin: 10px"
      @click="infopopupclose"
      >취소</b-button
    >
  </div>
</template>

<script>
// src/pages/HomeView.vue
import { BCard } from "bootstrap-vue-next";
// import axios from "axios";

export default {
  name: "CrmInfoPopup",
  components: {
    BCard,
  },
  data() {
    return {
      callPhoneno: "",
      callDate: "",
      customerInfo: {callCustname: ""}, // 고객 정보 저장
      genders: [
        { text: "성별", value: "", disabled: true },
        { text: "여성", value: "0", disabled: false },
        { text: "남성", value: "1", disabled: false },
      ],
      customerTypes: [
        { text: "고객 구분", value: "", disabled: true },
        { text: "신규 고객", value: "0", disabled: false },
        { text: "기존 고객", value: "1", disabled: false },
      ],
      smsReceives: [
        { text: "문자 수신", value: "", disabled: true },
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
      try {
        // const payload = {
        //   callPhoneno: this.customerInfo.callPhoneno,
        //   callCustname: this.customerInfo.callCustname,
        //   callInsphone: this.customerInfo.callInsphone,
        //   callUsephone: this.customerInfo.callUsephone,
        //   callCustcode: this.customerInfo.callCustcode,
        //   deptName: this.customerInfo.deptName,
        //   callDate: this.customerInfo.callDate,
        //   callGender: this.customerInfo.gender || "",
        //   callCusttype: this.customerInfo.mastGubun || "",
        //   callSmsreceive: this.customerInfo.mastSmsYn || "",
        //   callMemo: this.customerInfo.callRemark || "",
        //   callDept: this.customerInfo.callDept || "",
        //   usercode: localStorage.getItem("usercode"),
        // };
        // await axios.post("./consultations", payload);
      } catch (error) {
        alert("CRM 정보 저장에 실패했습니다.");
      }
    },
    infopopupclose() {
      window.close();
    },

    // async infomationload(callPhoneno, callDate) {
    //   try {
    //     const response = await axios.post("./c_info_retrieve", {
    //       hpNo: callPhoneno,
    //       callDate: callDate,
    //     });
    //     this.customerInfo =
    //       Array.isArray(response.data) && response.data.length > 0
    //         ? response.data[0]
    //         : null;
    //     console.log("고객 정보 조회 성공:", this.customerInfo);
    //   } catch (error) {
    //     alert("통화내역 조회에 실패했습니다.");
    //   }
    // },
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
