/* eslint-disable */

import {
  BCard,
  BButton,
  BModal,
  // BFormInput,
  BRow,
  BContainer,
  BCol,
  BTable,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
} from "bootstrap-vue-next";
// import axios from "axios";
import CryptoJS from "crypto-js";
import AppLogo from "@/components/AppLogo.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";

export default {
  name: "HomeView",
  components: {
    BCard,
    BButton,
    BModal,
    //    BFormInput,
    BRow,
    BContainer,
    BCol,
    BTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    AppLogo,
    ThemeSwitch,
  },

  data() {
    return {
      showIpcc: false,
      user: null,
      telnumber: null,
      logoutshowConfirm: false,
      crminfo: null,
      crmitems: [
      {
        deptName: "서울지점",
        callDate: "2025-07-11",
        callInsphone: "010-1234-5678",
        callPhoneno: "010-1111-2222",
        callCustname: "홍길동",
        callStatus: "Y",
        rsrvDt: "20250715",
        lastRsrvName: "정기점검",
        asCodeName: "2025-06-30",
        asRemark: "모터 교체",
        callRemark: "특이사항 없음",
      },
      {
        deptName: "부산지점",
        callDate: "2025-07-10",
        callInsphone: "010-2222-3333",
        callPhoneno: "010-3333-4444",
        callCustname: "김철수",
        callStatus: "N",
        rsrvDt: "20250720",
        lastRsrvName: "필터교환",
        asCodeName: "2025-06-28",
        asRemark: "필터 교체 완료",
        callRemark: "고객 요청으로 일정 변경",
      },
      {
        deptName: "대전지점",
        callDate: "2025-07-09",
        callInsphone: "010-4444-5555",
        callPhoneno: "010-5555-6666",
        callCustname: "이영희",
        callStatus: "Y",
        rsrvDt: "20250718",
        lastRsrvName: "부품교환",
        asCodeName: "2025-06-25",
        asRemark: "부품 교체 및 점검",
        callRemark: "재방문 예정",
      },
    ],

    todayCallList: [
      {
        callDate: "2025-07-11",
        callPhoneno: "010-7777-8888",
        callCustcode: "C1001",
        callCustname: "박민수",
        callStatus: "Y",
      },
      {
        callDate: "2025-07-11",
        callPhoneno: "010-8888-9999",
        callCustcode: "C1002",
        callCustname: "최지은",
        callStatus: "N",
      },
      {
        callDate: "2025-07-11",
        callPhoneno: "010-9999-0000",
        callCustcode: "C1003",
        callCustname: "장서윤",
        callStatus: "Y",
      },
    ],

    callbacklistitems: [
      {
        backDate: "2025-07-11",
        backPhoneno: "010-1111-3333",
        backCallNo: "CB20250711001",
        backStatus: "Y",
      },
      {
        backDate: "2025-07-10",
        backPhoneno: "010-2222-4444",
        backCallNo: "CB20250710001",
        backStatus: "N",
      },
      {
        backDate: "2025-07-09",
        backPhoneno: "010-3333-5555",
        backCallNo: "CB20250709001",
        backStatus: "Y",
      },
    ],

    consultlistitems: [
      {
        CALL_DATE: "2025-07-11",
        CALL_INSPHONE: "010-1234-5678",
        CALL_PHONENO: "010-1111-2222",
        CALL_CUSTNAME: "홍길동",
        CALL_REMARK: "AS 문의 및 일정 조정",
      },
      {
        CALL_DATE: "2025-07-10",
        CALL_INSPHONE: "010-2222-3333",
        CALL_PHONENO: "010-3333-4444",
        CALL_CUSTNAME: "김철수",
        CALL_REMARK: "제품 사용법 문의",
      },
      {
        CALL_DATE: "2025-07-09",
        CALL_INSPHONE: "010-4444-5555",
        CALL_PHONENO: "010-5555-6666",
        CALL_CUSTNAME: "이영희",
        CALL_REMARK: "불량 신고 및 교환 요청",
      },
    ],
      customerInfo: { gender: "" },
      consultInfo: {},
      selected: "1",
      phoneNumber: "",
      remark: "",
      activeMenu: "",
      activeDangzic: "",
      dangzicextno: "",
      callStatus: "",
      callTime: "",
      callbackstartdt: "",
      callbackenddt: "",
      consultstartdt: "",
      consultenddt: "",
      consultphone: "",
      consultnm: "",
      customerType: "",
      consultcallStatus: "%",
      consultcallStatusOptions: [
        { text: "전체", value: "%", },
        { text: "통화", value: "Y", },
        { text: "미통화", value: "N", },
      ],
      consultcustType: "%",
      consultcustTypeOptions: [
        { text: "전체", value: "%", },
        { text: "신규고객", value: "0", },
        { text: "기존고객", value: "1", },
        { text: "잠재고객", value: "2", },
        { text: "기타고객", value: "9", },
      ],
      consultname:"",
      consultdate:"",
      consultremark:"",
      consultasremark:"",
      callbacktokken: [],
      tokkenNo: "",
      ipccFrameUrl: "/himo-crm/resources/vue/socket_frame.html",
      ipccLoginInfo: null,
      testno: "",
      callbackdate: "",
      callbackinnumber: "",
      callbacknumber: "",
      callbackcustname: "",
      visitBranchCode: "",
      visitBranch: "",
      maincallnumber: "",
      currentTime: "",
      testModal: false,
      crminfomodal: false,
      consultationModal: false,
      designModal:false,
      selectedDesign: null,
      popupOffset: 0,
      callbackcountnum: null,
      calllistfields: [
        { key: "callDate", label: "통화일자", sortable: true },
        { key: "callPhoneno", label: "전화번호" },
        { key: "callCustcode", label: "고객코드" },
        { key: "callCustname", label: "고객명" },
        { key: "callCnt", label : "횟수"},
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
          sortable: true,
        },
      ],
      callbacklistfields: [
        { key: "backDate", label: "통화일자" },
        { key: "backPhoneno", label: "전화번호" },
        { key: "backCallNo", label: "요청번호" },
        {
          key: "backStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
        },
      ],
      options: [
        { text: "성별", value: "", disabled: true },
        { text: "여성", value: "0", disabled: false },
        { text: "남성", value: "1", disabled: false },
      ],
      crmitemfields: [
        {
          key: "deptName",
          label: "사업장",
          sortable: true,
          thStyle: { width: "162px" },
        },
        {
          key: "callDate",
          label: "전화일자",
          sortable: true,
          thStyle: { width: "162px" },
        },
        {
          key: "callInsphone",
          label: "걸려온 전화",
          sortable: true,
          thStyle: { width: "200px" },
        },
        {
          key: "callPhoneno",
          label: "등록전화번호",
          thStyle: { width: "200px" },
        },
        { 
          key: "callCustname", 
          label: "고객명", 
          thStyle: { width: "120px" },
        },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
          thStyle: { width: "80px" },
        },
        {
          key: "rsrvDt",
          label: "최종예약일",
          sortable: true,
          formatter: (value) => {
            if (typeof value === "string" && value.length === 8) {
              return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(
                6,
                8
              )}`;
            }
            return value;
          },
          thStyle: { width: "162px" },
        },
        {
          key: "lastRsrvName",
          label: "최종예약내역",
          thStyle: { width: "162px" },
        },
        { 
          key: "asCodeName", 
          label: "최종AS일", 
          thStyle: { width: "162px" },
        },
        { 
          key: 
          "asRemark", 
          label: "최종AS내역", 
          thStyle: { width: "300px" }
        },
        { 
          key: 
          "callRemark", 
          label: "비고", 
          thStyle: { width: "500px" }
        },
      ],
      consultlistfields: [
        {
          key: "CALL_DATE",
          label: "통화일자",
          sortable: true,
          thStyle: { width: "162px" },
        },
        {
          key: "CALL_INSPHONE",
          label: "걸려온 전화번호",
          thStyle: { width: "180px" },
        },
        { key: "CALL_PHONENO", 
          label: "핸드폰번호", 
          thStyle: { width: "180px" },
        },
        { 
          key: "CALL_CUSTNAME", 
          label: "고객명", 
          thStyle: { width: "120px" },
        },
        { 
          key: "CALL_REMARK", 
          label: "REMARK", 
          thStyle: { width: "auto" } 
        },
      ],
      consultcurrentPage: 1,
      consultperPage: 9,
      currentPage: 1,
      perPage: 7,
    };
  },

  async mounted() {
    this.loadIPCCInfoFromStorage();
    window.parseLogin = (data1, data2, data3, data4, data5, data6, data8) => {
      this.activeDangzic = data8;
      this.maincallnumberformatter(data6);
    };
    // const response = await axios.get("./session");
    window.parseMemberStatus = (statusCode) => {
      if (statusCode === "0" || statusCode === 0) {
        this.activeMenu = "mbtn1";
      } else if (statusCode === "1" || statusCode === 1) {
        this.activeMenu = "mbtn2";
      } else if (statusCode === "2" || statusCode === 2) {
        this.activeMenu = "mbtn3";
      } else if (statusCode === "3" || statusCode === 3) {
        this.activeMenu = "mbtn4";
      }
    };
    this.visitBranch = response.data.extNo.deptNm;
    this.visitBranchCode = response.data.extNo.locSaupjang;
    this.user = response.data;
    
    await this.fetchTodayCallList();
    window.parseCallEvent = (
      kind,
      callerNumber,
      data2,
      data3,
      data4,
      data5,
      data6,
      callTime
    ) => {
      //전화받기
      if (kind === "IR") {
        this.telnumber = callerNumber;
        this.callTime = callTime;
        this.sendCallEventToServer(callerNumber, callTime);
        if (document.visibilityState === "visible") {
          setTimeout(() => {
            this.showCrmInfomodal(callerNumber, callTime);
          }, 1000);
        } else {
          this.showCrmInfo(callerNumber, callTime);
        }
        setTimeout(() => {
          this.homeinfo_retrieve(callerNumber, callTime);
        }, 1500);
      }
      if (kind === "ID") {
        this.receiveCall(callerNumber, callTime);
      }
      //전화걸기
      if (kind === "OR") {
        this.telnumber = data2;
        this.sendCallEventToServer(data2, callTime);
        if (document.visibilityState === "visible") {
          setTimeout(() => {
            this.showCrmInfomodal(data2, callTime);
          }, 1000);
        } else {
          this.showCrmInfo(data2, callTime);
        }
        setTimeout(() => {
          this.homeinfo_retrieve(data2, callTime);
        }, 500);
      }
      if (kind === "OD") {
        this.receiveCall(data2, callTime);
      }
    };
    window.logoutfromserver = function () {};
    window.parseHangupEvent = (
      DATA1,
      DATA2,
      DATA3,
      DATA4,
      DATA5,
      DATA6,
      DATA7,
      DATA8,
      DATA9
    ) => {
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|MEMBERSTATUS|0,${this.ipccLoginInfo.exten}`
        );
      } else {
        // alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    };
    window.parsePhoneStatus = function () {};
    await this.callbackdateinput();
    await this.callbacklist();
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
    this.callbackcount();
  },

  computed: {
    rows() {
      return this.crmitems.length;
    },
    consultRows() {
      return this.consultlistitems.length;
    },
  },

  methods: {
    /*--------------------------------------------------- IPCC관련 함수들---------------------------------------------------*/

    // IPCC 로그인 정보를 로컬 스토리지에서 불러옵니다.
    loadIPCCInfoFromStorage() {
      const loginInfo = localStorage.getItem("loginInfo");
      if (loginInfo) {
        try {
          this.ipccLoginInfo = JSON.parse(loginInfo);
        } catch (error) {
          console.error("로그인 정보 파싱 실패:", error);
        }
      }
    },

    // IPCC 프레임을 새로고침합니다.
    reloadIframe() {
      const iframe = this.$refs.ipccFrame;
      if (iframe) {
        const timestamp = Date.now();
        iframe.src = `${this.ipccFrameUrl}?_reload=${timestamp}`;
      }
    },

    // IPCC 프레임이 로드되면 연결을 시도합니다.
    onIpccFrameLoad() {
      if (this.ipccLoginInfo) {
        setTimeout(() => {
          this.connectToIPCC();
        }, 0);
      }
    },

    // IPCC 서버에 연결합니다.
    connectToIPCC() {
      if (!this.ipccLoginInfo) return;
      try {
        const iframe = this.$refs.ipccFrame;
        if (iframe && iframe.contentWindow) {
          setTimeout(() => {
            if (iframe.contentWindow.ConnectServer) {
              const info = this.ipccLoginInfo;
              iframe.contentWindow.ConnectServer(
                info.nodejs_connector_url,
                info.company_id,
                info.userid,
                info.exten,
                this.sha512Hash(info.passwd),
                info.first_status,
                info.from_ui
              );
            }
          }, 0);
        }
      } catch (error) {
        console.error("IPCC 연결 실패:", error);
      }
    },

    // 전화 걸기 함수
    makeCall() {
      if (!this.phoneNumber?.trim()) {
        alert("전화번호를 입력하세요.");
        return;
      }
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        // CID 입력란이 있다면 추가
        const cid = this.cid ? this.cid : "";
        const command = `CLICKDIAL|${cid},${this.phoneNumber}`;
        iframe.contentWindow.SendCommand2Socket(`CMD|${command}`);
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    async makeCallBack() {
      if (!this.callbacknumber?.trim()) {
        alert("전화번호를 입력하세요.");
        return;
      }
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        const cid = this.cid ? this.cid : "";
        const command = `CLICKDIAL|${cid},${this.callbacknumber}`;
        iframe.contentWindow.SendCommand2Socket(`CMD|${command}`);
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    async callBackUpdate() {
      // try {
      //   await axios.post("./callbackupdate", {
      //     callbackno: this.callbacknumber,
      //     callbackdt: this.callbackdate,
      //     inputempno: this.user?.user.crmid,
      //   });
      // } catch (error) {
      //   console.error("콜백 전화 걸기 실패:", error);
      //   alert("콜백 전화 걸기에 실패했습니다.");
      //   return;
      // }
      // await this.callbacklistretrieve();
    },

    // 상담 상태를 설정하는 함수
    setCallStatus(menuId, statusCode) {
      this.activeMenu = menuId;
      const iframe = this.$refs.ipccFrame;
      const exten = this.ipccLoginInfo?.exten;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|MEMBERSTATUS|${statusCode},${exten},${statusCode}`
        );
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    // 통화 받기 함수
    hangupCall() {
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|RECEIVE|${this.ipccLoginInfo.exten}`
        );
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    // 전화 종료 함수
    hangdown() {
      const iframe = this.$refs.ipccFrame;
      // console.log(this.b64_sha512("5690")); /* 이효승과장님 암호화 코드. */
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|HANGUP|${this.ipccLoginInfo.exten}`
        );
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    logout1() {
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(`CMD|LOGOUT`);
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },
    dolbtn() {
      this.activeDangzic = "A";
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|FORWARDING|${this.ipccLoginInfo.exten},${this.dangzicextno},A`
        );
        alert("착신전환 되었습니다.");
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },
    dolobtn() {
      this.activeDangzic = "N";
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|FORWARDING|${this.ipccLoginInfo.exten},${this.dangzicextno},N`
        );
        alert("착신전환 해제되었습니다.");
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    async sendCallEventToServer(phoneNumber, callTime) {
      // try {
      //   // 필요한 데이터 구성 (예: 내선, 상담자, 전화번호 등)
      //   const payload = {
      //     callPhoneno: phoneNumber,
      //     callTime: callTime, // 통화 시간
      //     userId: this.user?.user?.crmid, // 상담원 ID
      //     callDept: this.user?.extNo?.deptNm, // 상담원 부서
      //     locSaupjang: this.user?.extNo?.locSaupjang, // 상담원 부서 번호
      //     callExtNo: this.user?.extNo?.extNo, // 내선번호
      //   };
      //   await axios.post("./call-event", payload);

      //   await this.fetchTodayCallList();
      // } catch (e) {
      //   console.error("전화 이벤트 서버 전송 실패:", e);
      // }
    },
    async receiveCall(phoneNumber, callTime) {
      // try {
      //   await axios.get("./receive-call", {
      //     params: { callPhoneno: phoneNumber, callTime: callTime },
      //   });
      //   await this.fetchTodayCallList();
      // } catch (error) {
      //   console.error("Failed to handle missed call:", error);
      // }
    },

    async homeinfo_retrieve(callPhoneno, callTime) {
      // await axios
      //   .post("./crm-home-info", {
      //     hpNo: callPhoneno,
      //     callDate: callTime,
      //   })
      //   .then((response) => {
      //     this.customerInfo = response.data;
      //   })
      //   .catch((error) => {
      //     console.error("CRM 정보 조회 실패:", error);
      //   });
    },

    async callbackcount() {
      // try {
      //   const response = await axios.post("./crm-callback-count", {
      //     locSaupjang: this.user?.extNo?.locSaupjang,
      //   });
      //   this.callbackcountnum = response.data;
      // } catch (error) {
      //   console.error("콜백리스트 카운트 조회 실패:", error);
      // }
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    sha512Hash(password) {
      return CryptoJS.SHA512(password).toString();
    },
    b64_sha512(plainText) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.SHA512(plainText));
    },

    onModalHide() {
      this.testModal = false;
    },

    oncrmModalHide() {
      this.crminfomodal = false;
    },
    onConsultationModalHide() {
      this.consultationModal = false;
    },
    async logout() {
      // try {
      //   await axios.post("./logout");
      //   this.logoutshowConfirm = false;
      //   this.logout1();
      //   localStorage.removeItem("loginInfo");
      //   localStorage.removeItem("autologin");
      //   this.$router.push({ name: "Login" });
      // } catch (error) {
      //   console.error("Logout failed:", error);
      // }
    },

    showCrmInfo(callPhoneno, callTime) {
      try {
        localStorage.setItem("hpNo", callPhoneno);
        localStorage.setItem("callDate", callTime);

        // 계단식 위치 계산
        const baseLeft = 100;
        const baseTop = 100;
        const step = 30; // 계단 간격
        const maxOffset = 200; // 최대 이동값

        this.popupOffset = (this.popupOffset + step) % maxOffset;

        window.open(
          "/himo-crm/crm-popup",
          "crmPopup_" + Date.now(),
          `width=560,height=500,left=${baseLeft + this.popupOffset},top=${
            baseTop + this.popupOffset
          }`
        );
      } catch (error) {
        console.error("Failed to fetch CRM info:", error);
      }
    },

    popupCrmInfo(item) {
      const baseLeft = 500;
      const baseTop = 200;
      localStorage.setItem("listHpNo", item.callPhoneno);
      localStorage.setItem("listCallDate", item.callDate);
      localStorage.setItem("usercode", this.user?.user.crmid);

      window.open(
        "/himo-crm/crm-infopopup",
        "crmInfoPopup_" + Date.now(),
        `width=560,height=778,left=${baseLeft + this.popupOffset},top=${
          baseTop + this.popupOffset
        }`
      );
    },

    async showCrmInfomodal(callPhoneno, callTime) {
      this.crminfomodal = true;
      // try {
      //   axios
      //     .post("./crm-popup-info", {
      //       hpNo: callPhoneno,
      //       callDate: callTime,
      //     })
      //     .then((response) => {
      //       this.crminfo = response.data;
      //     })
      //     .catch((error) => {
      //       console.error("CRM 정보 조회 실패:", error);
      //     });
      // } catch (error) {
      //   console.error("CRM 정보 조회 실패:", error);
      // }
    },

    async c_info_retrieve(item) {
      // try {
      //   const response = await axios.post("./c_info_retrieve", {
      //     hpNo: item.callPhoneno,
      //   });
      //   this.crmitems = response.data;
      // } catch (error) {
      //   alert("통화내역 조회에 실패했습니다.");
      // }
    },

    async c_info_retrieve_row(item) {
      // try {
      //   const response = await axios.post("./c_info_retrieve", {
      //     hpNo: item.callPhoneno,
      //     callDate: item.callDate,
      //   });
      //   this.customerInfo =
      //     Array.isArray(response.data) && response.data.length > 0
      //       ? response.data[0]
      //       : null;
      // } catch (error) {
      //   alert("통화내역 조회에 실패했습니다.");
      // }
    },

    async consult_retrieve_row(item) {
      //  try {
      //   const response = await axios.post("./c_info_retrieve", {
      //     hpNo: item.CALL_PHONENO,
      //     callDate: item.CALL_DATE,
      //   });
      //   this.consultInfo =
      //     Array.isArray(response.data) && response.data.length > 0
      //       ? response.data[0]
      //       : null;

      //   console.log(this.consultInfo)
      // } catch (error) {
      //   alert("통화내역 조회에 실패했습니다.");
      // }
    },

    async fetchTodayCallList() {
      // try {
      //   const response = await axios.get("./today-call-list", {
      //     params: { extNo: this.user?.extNo.extNo },
      //   });
      //   this.todayCallList = [...response.data];
      // } catch (e) {
      //   alert("오늘 통화내역 조회 실패");
      // }
    },

    async callbacklisttoken() {
      const info = JSON.parse(localStorage.getItem("loginInfo"));
      // try {
      //   const response = await axios.post("./callbacklisttoken", {
      //     company: info.company_id,
      //     id: info.userid,
      //     password: info.passwd,
      //     extension: info.exten,
      //   });
      //   this.tokkenNo = response.data.data;
      //   this.callbacktokken = response.data;
      // } catch (error) {
      //   console.error("콜백 토큰 조회 실패:", error);
      // }
    },

    async apicallbacklist() {
      // try {
      //   const response = await axios.post("./apicallbacklist", {
      //     tokkenNo: this.tokkenNo,
      //   });
      //   this.callbacklistitems = response.data[0].data;
      //   console.log("콜백 리스트 조회 성공:", this.callbacklistitems);
      // } catch (error) {
      //   console.error("콜백 리스트 조회 실패:", error);
      // }
    },

    async callbacklist() {
      // try {
      //   const response = await axios.post("./callbacklist", {
      //     backDept: this.user?.extNo?.locSaupjang,
      //   });
      //   this.callbacklistitems = response.data;
      // } catch (error) {
      //   console.error("콜백 리스트 조회 실패:", error);
      // }
    },

    async dateinputcallbacklist() {
      // try {
      //   const response = await axios.post("./dateinputcallbacklist", {
      //     backDept: this.user?.extNo?.locSaupjang,
      //     startDate: this.callbackstartdt,
      //     endDate: this.callbackenddt,
      //   });
      //   this.callbacklistitems = response.data;
      // } catch (error) {
      //   console.error("날짜 입력 콜백 리스트 조회 실패:", error);
      // }
    },

    consultmodalOn() {
      this.consultationModal = true;
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      // 오늘 날짜 (YYYY-MM-DD)
      this.consultenddt = `${year}-${month}-${day}`;

      // 3일 전 날짜 구하기
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 7);
      const yYear = yesterday.getFullYear();
      const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0");
      const yDay = String(yesterday.getDate()).padStart(2, "0");

      // 3일 전 날짜 (YYYY-MM-DD)
      this.consultstartdt = `${yYear}-${yMonth}-${yDay}`;
    },

    async consultretrieve() {
      // try {
      //   const response = await axios.post("./consultretrieve", {
      //     backDept: this.user?.extNo?.locSaupjang,
      //     startDt: this.consultstartdt,
      //     endDt: this.consultenddt,
      //     cphone: this.consultphone,
      //     custName: this.consultnm,
      //     consultcallStatus: this.consultcallStatus,
      //     consultcustType: this.consultcustType,
      //   });
      //   this.consultlistitems = response.data;
      // } catch (error) {
      //   console.error("상담 리스트 조회 실패:", error);
      // }
    },

    async callbackset(item) {
      // this.callbacknumber = item.backPhoneno;
      // this.callbackdate = item.backDate;
      // this.callbackinnumber = item.backCallNo;
      // try {
      //   const response = await axios.post("./crm-info", {
      //     hpNo: item.backPhoneno,
      //   });
      //   this.callbackcustname = response.data.mbsViewNm || "";
      // } catch (error) {
      //   console.error("콜백 고객명 조회 실패:", error);
      // }
    },

    callbackdateinput() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      // 오늘 날짜 (YYYY-MM-DD)
      this.callbackenddt = `${year}-${month}-${day}`;

      // 3일 전 날짜 구하기
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 3);
      const yYear = yesterday.getFullYear();
      const yMonth = String(yesterday.getMonth() + 1).padStart(2, "0");
      const yDay = String(yesterday.getDate()).padStart(2, "0");

      // 3일 전 날짜 (YYYY-MM-DD)
      this.callbackstartdt = `${yYear}-${yMonth}-${yDay}`;
    },

    async callbacklistretrieve() {
       this.testModal = true;
      // this.callbackdateinput();
      // try {
      //   const response = await axios.post("./dateinputcallbacklist", {
      //     backDept: this.user?.extNo?.locSaupjang,
      //     startDate: this.callbackstartdt,
      //     endDate: this.callbackenddt,
      //   });
      //   this.callbacklistitems = response.data;
      // } catch (error) {
      //   console.error("콜백 리스트 조회 실패:", error);
      // }
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
