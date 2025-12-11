/* eslint-disable */

import {
  BCard,
  BButton,
  BModal,
  BRow,
  BContainer,
  BCol,
  BTable,
  BPagination,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
  BTab,
  BTabs,
} from "bootstrap-vue-next";
import axios from "axios";
import CryptoJS from "crypto-js";
import AppLogo from "@/components/AppLogo.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { ref } from "vue";
import messageTemplates from "./messageTemplates";

export default {
  name: "HomeView",
  components: {
    BCard,
    BButton,
    BModal,
    BRow,
    BContainer,
    BCol,
    BTable,
    BForm,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BTab,
    BTabs,
    AppLogo,
    ThemeSwitch,
  },

  data() {
    return {
      showIpcc: false,
      user: null,
      telnumber: null,
      crminfo: null,
      crmitems: [],
      selectedtodayRowIndex: null,
      selectedcallRowIndex: null,
      todayCallList: [],
      callbacklistitems: [],
      consultlistitems: [],
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
        { text: "전체", value: "%" },
        { text: "통화", value: "Y" },
        { text: "미통화", value: "N" },
      ],
      consultcustType: "%",
      consultcustTypeOptions: [
        { text: "전체", value: "%" },
        { text: "신규고객", value: "0" },
        { text: "기존고객", value: "1" },
        { text: "잠재고객", value: "2" },
        { text: "기타고객", value: "9" },
      ],
      consultname: "",
      consultdate: "",
      consultremark: "",
      consultasremark: "",
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
      logoutModal: false,
      testModal: false,
      crminfomodal: false,
      consultationModal: false,
      designModal: false,
      passwordChangeModal: false,
      adminbuttonModal: false,
      MessageChkModal: false,
      firstChkModal: false,
      selectedDesign: null,
      popupOffset: 0,
      callbackcountnum: null,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      newUserName: "",
      newUserNo: "",
      newUserId: "",
      newUserPassword: "",
      newUserConfirmPassword: "",
      findUserId: "",
      findUserNo: "",
      getUserPw: "",
      selectedFile: null,
      uploading: false,
      capsLockOn: {
        current: false,
        new: false,
        confirm: false,
        input: false,
        input2: false,
      },
      calllistfields: [
        { key: "lastSaupjang", label: "최종방문지점", sortable: true },
        { key: "callCustcode", label: "고객코드", sortable: true },
        { key: "callCustname", label: "고객명", sortable: true },
        { key: "callPhoneno", label: "전화번호", sortable: true },
        { key: "callDate", label: "통화일자", sortable: true },
        { key: "callCnt", label: "횟수", sortable: true },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "N" ? "미통화" : "통화"),
          sortable: true,
        },
      ],
      callbacklistfields: [
        { key: "backDate", label: "통화일자", sortable: true },
        {
          key: "backPhoneno",
          label: "전화번호",
          formatter: (value) => {
            if (typeof value === "string" && value.length === 11) {
              return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
                7,
                11
              )}`;
            }
            return value;
          },
          sortable: true,
        },
        {
          key: "backCallNo",
          label: "요청번호",
          sortable: true,
          formatter: (value) => {
            if (typeof value === "string" && value.length === 11) {
              return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
                7,
                11
              )}`;
            }
            return value;
          },
        },
        {
          key: "customerName",
          label: "고객명",
          sortable: true,
        },
        {
          key: "backStatus",
          label: "상태",
          formatter: (value) => (value === "N" ? "미통화" : "통화"),
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
          label: "수신지점",
          sortable: true,
        },
        {
          key: "callExtNo",
          label: "수신번호",
          sortable: true,
        },
        {
          key: "callDate",
          label: "전화일자",
          sortable: true,
        },
        {
          key: "callInsphone",
          label: "걸려온 전화",
          sortable: true,
        },
        {
          key: "callPhoneno",
          label: "등록전화번호",
          sortable: true,
        },
        {
          key: "callCustname",
          label: "고객명",
          sortable: true,
        },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "N" ? "미통화" : "통화"),
          sortable: true,
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
          sortable: true,
        },
        {
          key: "lastRsrvName",
          label: "최종예약내역",
          sortable: true,
        },
        {
          key: "asCodeName",
          label: "최종A/S명",
          sortable: true,
        },
        {
          key: "asRemark",
          label: "최종A/S내역",
          sortable: true,
        },
        {
          key: "callRemark",
          label: "상담내역",
          sortable: true,
        },
      ],
      consultlistfields: [
        {
          key: "CALL_DATE",
          label: "통화일자",
          sortable: true,
        },
        {
          key: "CALL_INSPHONE",
          label: "걸려온 전화번호",
          sortable: true,
        },
        { key: "CALL_PHONENO", label: "핸드폰번호", sortable: true },

        {
          key: "CALL_CUSTNAME",
          label: "고객명",
          sortable: true,
        },
        {
          key: "CALL_REMARK",
          label: "상담내역",
          sortable: true,
        },
      ],
      selectedStatus: 'N', // 기본값: 미확인
      statusOptions: [
        { value: '%', text: '전체' },
        { value: 'Y', text: '확인' },
        { value: 'N', text: '미확인' }
      ],
      todayperPage: 25,
      consultcurrentPage: 1,
      consultperPage: 9,
      currentPage: 1,
      perPage: 10,
      mainextno: "",
      MessageLabel: ref(""),
      messageContent: "",
      firstloginchk: "",
      popups: [],
      isRefresh: false,
      currentTabId: null,
      tabHeartbeat: null,
      isTabDisabled: false,
      deptcrmteam: "",
      callbackintervalId: null,
      callbackisDestroyed: false
    };
  },

  async mounted() {
    this.loadIPCCInfoFromStorage();
    if (!this.checkSingleTab()) {
      return;
    }
    const response = await axios.get("./session");
    const autologinStr = localStorage.getItem("autologin");

    // ipcc소켓 로그인 처리
    window.parseLogin = (data1, data2, data3, data4, data5, data6, data8) => {
      this.activeDangzic = data8;
      this.mainextno = data6;
      localStorage.setItem("mainextno", this.mainextno);
    };
    // ipcc소켓 상담원 상태 처리
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
    this.deptcrmteam = this.user?.extNo?.locSaupjang;

    await this.fetchTodayCallList();
    window.parseCallEvent = async (
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
        console.log("[IR 이벤트 발생]", { kind, callerNumber, callTime });

        try {
          const sessionResponse = await axios.get("./session");
          console.log("[세션 응답]", sessionResponse.data);

          if (!sessionResponse.data || !sessionResponse.data.user) {
            console.warn("⚠️ 세션이 만료되어 팝업을 열지 않습니다.");
            return;
          }

          this.telnumber = callerNumber;
          this.callTime = callTime;

          console.log("[전화번호 / 시간 설정]", this.telnumber, this.callTime);

          await this.sendCallEventToServer(kind, callerNumber, callTime);
          console.log("[서버로 콜 이벤트 전송 완료]");

          // 🔍 가시 상태 확인
          console.log("[브라우저 가시 상태]", document.visibilityState);

          if (document.visibilityState === "visible") {
            console.log("🟢 현재 탭이 활성 상태 → CRM 모달 띄움");
            setTimeout(() => {
              console.log("➡️ showCrmInfomodal 실행");
              this.showCrmInfomodal(callerNumber, callTime);
            }, 300);
          } else {
            console.log("🟠 현재 탭이 비활성 상태 → 팝업 + 알림 띄움");
            setTimeout(() => {
              //20251105 팝업 막음 --> 알림만 띄움
              //console.log("➡️ showCrmInfo 실행");
              //this.showCrmInfo(callerNumber, callTime);

              //console.log("➡️ showNotification 실행 시도");
              try {
                this.showNotification(callerNumber, callTime);
                console.log("✅ showNotification 함수 호출 완료");
              } catch (e) {
                console.error("❌ showNotification 호출 중 에러:", e);
              }
            }, 300);
          }

          setTimeout(() => {
            console.log("📞 homeinfo_retrieve 실행");
            this.homeinfo_retrieve(callerNumber, callTime);
          }, 1500);
        } catch (err) {
          console.error("🔥 [IR 이벤트 처리 중 오류]", err);
        }
      } `+`
      if (kind === "ID") {
        this.receiveCall(callerNumber, callTime);
      }
      if (kind === "PICKUP") {
        this.pickupCall(callerNumber, callTime);
      }
      // 전화걸기
      if (kind === "OR") {
        this.telnumber = data2;
        this.sendCallEventToServer(kind, data2, callTime);
      }
      if (kind === "OD") {
        this.receiveCall(data2, callTime);
      }
    };
    window.logoutfromserver = () => {
      this.logout();
    };
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
        setTimeout(() => {
          iframe.contentWindow.SendCommand2Socket(
            `CMD|MEMBERSTATUS|0,${this.ipccLoginInfo.exten}`
          );
        }, 500);
      } else {
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    };
    window.parsePhoneStatus = function () {};
    await this.callbackdateinput();
    await this.callbacklist();
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
    this.callbackstartPolling();
    this.firstlogincheck();
    await this.requestNotificationPermission();
    sessionStorage.setItem("browserClosing", "false");

    // 키 이벤트로 새로고침 감지
    document.addEventListener("keydown", (e) => {
      if (e.key === "F5" || (e.ctrlKey && (e.key === "r" || e.key === "R"))) {
        sessionStorage.setItem("isRefreshing", "true");
      }
    });

    window.addEventListener("beforeunload", this.handleBrowserClose);

    window.addEventListener("storage", (e) => {
      // 다른 탭에서 로그아웃 했을 때
      if (e.key === "autologin" && e.newValue === null) {
        console.log("다른 탭에서 로그아웃됨 - 페이지 새로고침");
        location.reload();
      }

      // 또는 특별한 로그아웃 플래그 사용
      if (e.key === "logout-trigger" && e.newValue === "true") {
        localStorage.removeItem("logout-trigger"); // 즉시 제거
        location.reload();
      }
    });

    if (this.deptcrmteam == "1003") {
      await this.startPolling();
    }
  },
  computed: {
    rows() {
      return this.crmitems.length;
    },
    consultRows() {
      return this.consultlistitems.length;
    },
  },
  beforeUnmount(){
    this.stopPolling();
  },

  methods: {
    /*--------------------------------------------------- IPCC관련 함수들---------------------------------------------------*/

    // IPCC 로그인 정보를 로컬 스토리지에서 불러옵니다.
    loadIPCCInfoFromStorage() {
      const loginInfo = localStorage.getItem("loginInfo");
      if (loginInfo) {
        try {
          this.ipccLoginInfo = JSON.parse(localStorage.getItem("loginInfo"));
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
          console.log("IPCC 프레임이 로드되었습니다.");
          this.connectToIPCC();
      }
    },

    // IPCC 서버에 연결합니다.
    connectToIPCC() {
      if (!this.ipccLoginInfo) return;
      const iframe = this.$refs.ipccFrame;
      if (!iframe || !iframe.contentWindow) return;
      const info = this.ipccLoginInfo;


      const tryConnect = () => {
        try {
          if (
            iframe.contentWindow.ConnectServer &&
            typeof iframe.contentWindow.ConnectServer === "function"
          ) {
            iframe.contentWindow.ConnectServer(
              info.nodejs_connector_url,
              info.company_id,
              info.userid,
              info.exten,
              this.sha512Hash(info.passwd),
              info.first_status,
              info.from_ui
            );
          } else {
            setTimeout(tryConnect, 50);
          }
        } catch (error) {
          console.error("IPCC 연결 실패:", error);
        }
      };
      tryConnect();
    },

    // IPCC 서버에 연결합니다.
    // connectToIPCC() {
    //   if (!this.ipccLoginInfo) return;
    //   try {
    //     const iframe = this.$refs.ipccFrame;
    //     if (iframe && iframe.contentWindow) {
    //       setTimeout(() => {
    //         if (iframe.contentWindow.ConnectServer) {
    //           const info = this.ipccLoginInfo;
    //           iframe.contentWindow.ConnectServer(
    //             info.nodejs_connector_url,
    //             info.company_id,
    //             info.userid,
    //             info.exten,
    //             this.sha512Hash(info.passwd),
    //             info.first_status,
    //             info.from_ui
    //           );
    //         }
    //       }, 0);
    //     }
    //   } catch (error) {
    //     console.error("IPCC 연결 실패:", error);
    //   }
    // },

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
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    async makeCallBack() {
      if (!this.callbackinnumber?.trim()) {
        alert("전화번호를 입력하세요.");
        return;
      }
      console.log(this.callbackinnumber);
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        const cid = this.cid ? this.cid : "";
        const command = `CLICKDIAL|${cid},${this.callbackinnumber}`;
        iframe.contentWindow.SendCommand2Socket(`CMD|${command}`);
      } else {
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    async callBackUpdate() {
      try {
        await axios.post("./callbackupdate", {
          callbackno: this.callbacknumber,
          callbackdt: this.callbackdate,
          inputempno: this.user?.user.crmid,
        });
      } catch (error) {
        console.error("콜백 전화 걸기 실패:", error);
        alert("콜백 전화 걸기에 실패했습니다.");
        return;
      }
      await this.callbacklistretrieve();
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
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
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
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

    // 전화 종료 함수
    hangdown() {
      const iframe = this.$refs.ipccFrame;
      if (
        iframe &&
        iframe.contentWindow &&
        typeof iframe.contentWindow.SendCommand2Socket === "function"
      ) {
        iframe.contentWindow.SendCommand2Socket(
          `CMD|HANGUP|${this.ipccLoginInfo.exten}`
        );
      } else {
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
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
        console.log("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },
    async dolbtn() {
      this.activeDangzic = "I";
      try {
        const response = await axios.post("./queue", {
          member: this.user?.extNo?.extNo,
          strType: this.activeDangzic,
        });
        alert("당직자 로그인 되었습니다.");
      } catch (error) {
        console.error("서버 통신 오류:", error);
      }
    },
    async dolobtn() {
      this.activeDangzic = "O";
      try {
        const response = await axios.post("./queue", {
          member: this.user?.extNo?.extNo,
          strType: this.activeDangzic,
        });
        alert("당직자 로그아웃 되었습니다.");
      } catch (error) {
        console.error("서버 통신 오류:", error);
      }
    },

    async sendToServer(type) {
      try {
        const response = await axios.post("./queue", {
          member: this.user?.extNo?.extNo,
          strType: type,
        });
      } catch (error) {
        console.error("서버 통신 오류:", error);
      }
    },

    async sendCallEventToServer(kind, phoneNumber, callTime) {
      try {
        const payload = {
          kind: kind, // 통화 종류 (예: 수신, 발신)
          callPhoneno: phoneNumber,
          callTime: callTime, // 통화 시간
          userId: this.user?.user?.crmid, // 상담원 ID
          callDept: this.user?.extNo?.deptNm, // 상담원 부서
          locSaupjang: this.user?.extNo?.locSaupjang, // 상담원 부서 번호
          callExtNo: this.user?.extNo?.extNo, // 내선번호
        };

        await axios.post("./call-event", payload);

        await this.fetchTodayCallList();
      } catch (e) {
        console.error("전화 이벤트 서버 전송 실패:", e);
      }
    },
    async receiveCall(phoneNumber, callTime) {
      try {
        await axios.get("./receive-call", {
          params: {
            callPhoneno: phoneNumber,
            callTime: callTime,
            extNo: this.user?.extNo.extNo,
            userId: this.user?.user?.crmid,
          },
        });
        await this.fetchTodayCallList();
      } catch (error) {
        console.error("Failed to handle missed call:", error);
      }
    },

    async pickupCall(phoneNumber, callTime) {
      try {
        await axios.post("./pickup-call", {
          callPhoneno: phoneNumber,
          callTime: callTime,
          extNo: this.user?.extNo.extNo,
          locSaupjang: this.user?.extNo?.locSaupjang,
          callDept: this.user?.extNo?.deptNm,
          userId: this.user?.user?.crmid,
        });
        await this.fetchTodayCallList();
      } catch (error) {
        console.error("Failed to handle pickup call:", error);
      }
    },

    async homeinfo_retrieve(callPhoneno, callTime) {
      await axios
        .post("./crm-home-info", {
          hpNo: callPhoneno,
          callDate: callTime,
        })
        .then((response) => {
          this.customerInfo = response.data;
        })
        .catch((error) => {
          console.error("CRM 정보 조회 실패:", error);
        });
    },

    async callbackcount() {
      try {
        const response = await axios.post("./crm-callback-count", {
          locSaupjang: this.user?.extNo?.locSaupjang,
        });
        this.callbackcountnum = response.data;
      } catch (error) {
        console.error("콜백리스트 카운트 조회 실패:", error);
      }
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    aesEncrypt(plainText, key) {
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const encrypted = CryptoJS.AES.encrypt(plainText, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    },

    aesDecrypt(encryptedBase64, key) {
      const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
      const decrypted = CryptoJS.AES.decrypt(encryptedBase64, keyUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    },

    sha512Hash(password) {
      return CryptoJS.SHA512(password).toString();
    },
    onModalHide() {
      this.testModal = false;
    },
    passwordChangeModalHide() {
      this.passwordChangeModal = false;
    },
    oncrmModalHide() {
      this.crminfomodal = false;
    },
    onConsultationModalHide() {
      this.consultationModal = false;
    },
    adminbuttonModalHide() {
      (this.newUserName = ""),
        (this.newUserNo = ""),
        (this.newUserId = ""),
        (this.newUserPassword = ""),
        (this.newUserConfirmPassword = ""),
        (this.getUserPw = ""),
        (this.findUserId = ""),
        (this.findUserNo = ""),
        (this.adminbuttonModal = false);
    },

    firstChkModalHide() {
      this.firstChkModal = false;
    },

    MessageChkModalHide() {
      this.MessageChkModal = false;
    },
    logoutModalHide() {
      this.logoutModal = false;
    },

    async logout() {
      try {
        this.cleanupTab();
        this.closeAllPopups();
        this.stopPolling();

        localStorage.setItem("logout-trigger", "true");

        await axios.post("./logout");
        this.logoutshowConfirm = false;
        this.logout1();
        localStorage.removeItem("loginInfo");
        localStorage.removeItem("autologin");
        this.sendToServer("O");
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    showCrmInfo(callPhoneno, callTime) {
      try {
        localStorage.setItem("hpNo", callPhoneno);
        localStorage.setItem("callDate", callTime);

        const baseLeft = 100;
        const baseTop = 100;
        const step = 30;
        const maxOffset = 200;

        this.popupOffset = (this.popupOffset + step) % maxOffset;
        const popupName = "crmPopup_" + Date.now();

        const popup = window.open(
          "/himo-crm/crm-popup",
          popupName,
          `width=560px,height=750px,left=${baseLeft + this.popupOffset},top=${
            baseTop + this.popupOffset
          },resizable=no`
        );

        if (popup && !popup.closed) {
          // 여러 단계로 강제 포커스
          const minWidth = 560;
          const minHeight = 500;
          const forceFocus = () => {
            try {
              popup.focus();
              popup.blur();
              popup.focus();

              // 창 위치 강제 이동 (포커스 유도)
              popup.moveTo(
                baseLeft + this.popupOffset - 1,
                baseTop + this.popupOffset - 1
              );
              popup.moveTo(
                baseLeft + this.popupOffset,
                baseTop + this.popupOffset
              );
            } catch (e) {
              console.log("Focus attempt failed:", e);
            }
          };

          this.popups.push(popup);

          const checkClosed = setInterval(() => {
            if (popup.closed) {
              this.popups = this.popups.filter((p) => p !== popup);
              clearInterval(checkClosed);
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to fetch CRM info:", error);
      }
    },

    // 모든 팝업 닫기 함수
    closeAllPopups() {
      this.popups.forEach((popup) => {
        if (popup && !popup.closed) {
          popup.close();
        }
      });
      this.popups = []; // 배열 초기화
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
      try {
        axios
          .post("./crm-popup-info", {
            hpNo: callPhoneno,
            callDate: callTime,
          })
          .then((response) => {
            this.crminfo = response.data;
          })
          .catch((error) => {
            console.error("CRM 정보 조회 실패:", error);
          });
      } catch (error) {
        console.error("CRM 정보 조회 실패:", error);
      }
    },

    async NotifiCrmInfo(callPhoneno, callTime) {
      try {
        await axios
          .post("./crm-popup-info", {
            hpNo: callPhoneno,
            callDate: callTime,
          })
          .then((response) => {
            this.crminfo = response.data;
          })
          .catch((error) => {
            console.error("CRM 정보 조회 실패:", error);
          });
      } catch (error) {
        console.error("CRM 정보 조회 실패:", error);
      }
    },

    async c_info_retrieve(item, index) {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: item.callPhoneno,
        });
        this.crmitems = response.data;
        this.customerInfo =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : null;

        console.log(this.customerInfo);
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
      this.selectedtodayRowIndex = index;
      const rows = this.$refs.calltodayTable.$el.querySelectorAll("tbody tr");
      const callrows = this.$refs.callTable.$el.querySelectorAll("tbody tr");
      rows.forEach((row) => row.classList.remove("today-table-active"));
      callrows.forEach((row) => row.classList.remove("today-table-active"));
      if (rows[index]) {
        rows[index].classList.add("today-table-active");
      }
    },

    async c_info_retrieve_row(item, index) {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: item.callPhoneno,
          callDate: item.callDate,
        });
        this.customerInfo =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : null;
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
      this.selectedcallRowIndex = index;

      const rows = this.$refs.callTable.$el.querySelectorAll("tbody tr");
      const todayrows =
        this.$refs.calltodayTable.$el.querySelectorAll("tbody tr");
      rows.forEach((row) => row.classList.remove("today-table-active"));
      todayrows.forEach((row) => row.classList.remove("today-table-active"));
      if (rows[index]) {
        rows[index].classList.add("today-table-active");
      }
    },

    async consult_retrieve_row(item, index) {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: item.CALL_PHONENO,
          callDate: item.CALL_DATE,
        });
        this.consultInfo =
          Array.isArray(response.data) && response.data.length > 0
            ? response.data[0]
            : null;
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
      const rows = this.$refs.consultTable.$el.querySelectorAll("tbody tr");
      rows.forEach((row) => row.classList.remove("today-table-active"));
      if (rows[index]) {
        rows[index].classList.add("today-table-active");
      }
    },

    async fetchTodayCallList() {
      try {
        const response = await axios.get("./today-call-list", {
          params: { extNo: this.user?.extNo.extNo },
        });
        this.todayCallList = [...response.data];
      } catch (e) {
        alert("오늘 통화내역 조회 실패");
      }
    },

    startPolling() {
      // 기존 인터벌이 있으면 정리
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // 5초마다 실행
      this.intervalId = setInterval(() => {
        this.fetchTodayCallList();
      }, 5000);
    },

    stopPolling() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    callbackstartPolling(){
      this.callbackcount(); // 즉시 실행
        this.callbackintervalId = setInterval(() => {
            if (!this.callbackisDestroyed) {
                this.callbackcount();
            }
        }, 5000);
    },

    stopPolling() {
        this.callbackisDestroyed = true;
        if (this.callbackintervalId) {
            clearInterval(this.callbackintervalId);
            this.callbackintervalId = null;
        }
    },

    async callbacklisttoken() {
      const info = JSON.parse(localStorage.getItem("loginInfo"));
      try {
        const response = await axios.post("./callbacklisttoken", {
          company: info.company_id,
          id: info.userid,
          password: info.passwd,
          extension: info.exten,
        });
        this.tokkenNo = response.data.data;
        this.callbacktokken = response.data;
      } catch (error) {
        console.error("콜백 토큰 조회 실패:", error);
      }
    },

    async apicallbacklist() {
      try {
        const response = await axios.post("./apicallbacklist", {
          tokkenNo: this.tokkenNo,
        });
        this.callbacklistitems = response.data[0].data;
      } catch (error) {
        console.error("콜백 리스트 조회 실패:", error);
      }
    },

    async callbacklist() {
      try {
        const response = await axios.post("./callbacklist", {
          backDept: this.user?.extNo?.locSaupjang,
        });
        this.callbacklistitems = response.data;
      } catch (error) {
        console.error("콜백 리스트 조회 실패:", error);
      }
    },

    async dateinputcallbacklist() {

      try {
        const response = await axios.post("./dateinputcallbacklist", {
          backDept: this.user?.extNo?.locSaupjang,
          startDate: this.callbackstartdt,
          endDate: this.callbackenddt,
          callStatus: this.selectedStatus,
        });
        this.callbacklistitems = response.data;
      } catch (error) {
        console.error("날짜 입력 콜백 리스트 조회 실패:", error);
      }
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
      try {
        this.consultcurrentPage = 1;

        const response = await axios.post("./consultretrieve", {
          backDept: this.user?.extNo?.locSaupjang,
          startDt: this.consultstartdt,
          endDt: this.consultenddt,
          cphone: this.consultphone,
          custName: this.consultnm,
          consultcallStatus: this.consultcallStatus,
          consultcustType: this.consultcustType,
        });
        this.consultlistitems = response.data;
      } catch (error) {
        console.error("상담 리스트 조회 실패:", error);
      }
    },

    async callbackset(item, index) {
      this.callbacknumber = this.formatPhoneNumber(item.backPhoneno);
      this.callbackdate = item.backDate;
      this.callbackinnumber = this.formatPhoneNumber(item.backCallNo);
      try {
        const response = await axios.post("./crm-info", {
          hpNo: item.backCallNo,
        });
        this.callbackcustname = response.data.mbsViewNm || "";
      } catch (error) {
        console.error("콜백 고객명 조회 실패:", error);
      }
      const rows = this.$refs.callbackTable.$el.querySelectorAll("tbody tr");
      rows.forEach((row) => row.classList.remove("today-table-active"));
      if (rows[index]) {
        rows[index].classList.add("today-table-active");
      }
    },

    formatPhoneNumber(phone) {
      const digits = phone.replace(/\D/g, "");

      if (digits.length === 11) {
        return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (digits.length === 10) {
        if (digits.startsWith("02")) {
          return digits.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
          return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      } else {
        return phone;
      }
    },
    formatPhoneNumber(phone) {
      // 숫자만 추출
      const digits = phone.replace(/\D/g, "");

      if (digits.length === 11) {
        // 010-1234-5678 형태 (휴대폰)
        return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (digits.length === 10) {
        // 02-123-4567 or 031-123-4567 등 시내국번 포함
        // 02인지 아닌지 구분
        if (digits.startsWith("02")) {
          return digits.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
          return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      } else {
        // 그 외는 그냥 원본 리턴
        return phone;
      }
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
      this.selectedStatus = "N";
      this.callbackdateinput();
      this.dateinputcallbacklist();
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

    async changePassword() {
      if (!this.currentPassword || !this.newPassword) {
        alert("비밀번호를 모두 입력해주세요.");
        return;
      }

      // 최소 길이 4자 검사
      if (this.newPassword.length < 4) {
        alert("비밀번호는 최소 4자 이상이어야 합니다.");
        return;
      }
      if (this.newPassword.length > 12) {
        alert("비밀번호는 최대 12자 이하이어야 합니다.");
        return;
      }
      // newPassword와 currentPassword가 반드시 같아야 한다면 아래 조건 사용
      if (this.newPassword !== this.confirmPassword) {
        alert("새 비밀번호는 확인 비밀번호와 같아야 합니다.");
        return;
      }

      try {
        const response = await axios.post("./change-password", {
          userId: this.user?.user.crmid,
          currentPassword: this.aesEncrypt(
            this.currentPassword,
            "himoadmin1234567"
          ),
          oldPassword: this.aesEncrypt(
            this.confirmPassword,
            "himoadmin1234567"
          ),
          newPassword: this.aesEncrypt(this.newPassword, "himoadmin1234567"),
        });
        alert("비밀번호가 변경되었습니다.");
        this.passwordChangeModal = false;
        this.logout();
      } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        alert(error.response.data);
      }
    },

    async insertUser() {
      // 최소 길이 4자 검사

      if (this.newUserPassword.length < 4) {
        alert("비밀번호는 최소 4자 이상이어야 합니다.");
        return;
      }
      // newPassword와 currentPassword가 반드시 같아야 한다면 아래 조건 사용
      if (this.newUserPassword !== this.newUserConfirmPassword) {
        alert("비밀번호와 비밀번호 확인이 다릅니다.");
        return;
      }

      try {
        const response = await axios.post("./insert-user", {
          userId: this.user?.user.crmid,
          newUserName: this.newUserName,
          newUserNo: this.newUserNo,
          newUserId: this.newUserId,
          newUserPassword: this.aesEncrypt(
            this.newUserPassword,
            "himoadmin1234567"
          ),
          newUserConfirmPassword: this.aesEncrypt(
            this.newUserConfirmPassword,
            "himoadmin1234567"
          ),
        });
        alert("사용자 정보가 등록되었습니다.");
        this.adminbuttonModal = false;
      } catch (error) {
        alert(error.response.data);
      }
    },

    async findPassword() {
      try {
        const response = await axios.post("./find-password", {
          findUserId: this.findUserId,
          findUserName: this.findUserNo,
          resetpw: this.aesEncrypt(this.findUserNo, "himoadmin1234567"),
        });
        alert(response.data);
      } catch (e) {
        alert("해당 아이디와 이름으로 등록된 사용자가 없습니다.");
        return;
      }
    },

    onFileChange(e) {
      const file = e.target.files && e.target.files[0];
      this.selectedFile = file || null;
    },

    async uploadExcel() {
      if (this.MessageLabel === "") {
        alert("메시지 종류을 선택해주세요.");
        return;
      }
      if (!this.selectedFile) return;
      this.uploading = true;
      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("messageContent", this.messageContent);

        const response = await axios.post("./excelupload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data.invalid(0));
        if (response.data.invalid == null) {
          alert("유효하지 않은 파일입니다. 올바른 엑셀 파일을 업로드해주세요.");
        }
      } catch (err) {
        console.error(err);
        alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        this.uploading = false;
        alert("파일 업로드가 완료되었습니다.");
        this.resetFileInput();
      }
    },
    resetFileInput() {
      const input = this.$refs.excelInput;
      if (input) input.value = "";
      this.selectedFile = null;
    },

    onLabelChange() {
      this.messageContent = messageTemplates[this.MessageLabel] || "";
    },

    async firstlogincheck() {
      const response = await axios.post("./firstloginchk", {
        userId: this.user?.user?.crmid,
      });

      this.firstloginchk = response.data;

      if (this.firstloginchk === "N") {
        this.firstChkModal = true;
        await axios.post("./firstlogincheck", {
          userId: this.user?.user?.crmid,
        });
      }
      if (this.firstChkModal === "Y") {
        this.firstChkModal = false;
      }
    },

    checkCapsLock(event, field) {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        this.capsLockOn[field] = true;
      } else {
        this.capsLockOn[field] = false;
      }
    },

    hideCapsLockWarning(field) {
      this.capsLockOn[field] = false;
    },

    selectInputText(event) {
      event.target.select();
    },

    selectDivText(event) {
      // div 내용 전체 선택
      const range = document.createRange();
      range.selectNodeContents(event.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },

    selectPhoneNumber(event) {
      // 텍스트를 완전히 선택 (파란색 하이라이트)
      const range = document.createRange();
      range.selectNodeContents(event.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },

    async requestNotificationPermission() {
      if (Notification.permission === "denied") {
        return false;
      }

      if (Notification.permission === "default") {
        console.log("알림 권한을 다시 요청합니다.");
        Notification.requestPermission();
        return false;
      }

      return Notification.permission === "granted";
    },

    handleUserClick() {
      Notification.requestPermission();
    },

    formatCallTime(callTime) {
      if (!callTime || callTime.length < 14) return callTime;

      const datePart = callTime.slice(0, 10); // "2025-08-29"
      const timePart = callTime.slice(10); // "143634"

      const hour = timePart.slice(0, 2); // "14"
      const minute = timePart.slice(2, 4); // "36"
      const second = timePart.slice(4, 6); // "34"

      return `${datePart}  ${hour}시${minute}분${second}초`;
    },


    async showNotification(callerNumber, callTime) {
      console.log("showNotification 진입");
      if ("Notification" in window && Notification.permission === "granted") {
        await this.NotifiCrmInfo(callerNumber, callTime);
        console.log(this.crminfo);
        console.log("--- CRM Info Debug Start ---");
        console.log("callerNumber:", callerNumber);
        console.log("crminfo 객체:", this.crminfo); // 이 객체의 내용이 무엇인지 반드시 확인해야 함
        console.log("callCustname 값:", this.crminfo ? this.crminfo.callCustname : "객체 없음");
        console.log("--- CRM Info Debug End ---");
        
        if (this.crminfo.callCustname) {
          /*
          const notification = new Notification(
            `고객명 :${this.crminfo.callCustname}`,
            {
              body: `발신번호: ${this.formatPhoneNumber(
                callerNumber
              )}\n전화지점 :${
                this.crminfo.indeptName
              }\n시간: ${this.formatCallTime(callTime)}
              \n최종예약내역: ${
                this.crminfo.lastRsrvName || "없음"
              }`,
              icon: "/favicon.ico", // 아이콘 경로 설정
              badge: "/path/to/badge-icon.png",
              tag: "incoming-call", // 중복 알림 방지
              requireInteraction: true,
              silent: false,
            }
          );
          */


          // 고객명을 간결하게 정의 (없으면 "미등록 고객")
          const custName = this.crminfo?.callCustname || "미등록 고객";
          const branchName = this.crminfo?.indeptName || "정보 없음";
          //const lastRsrv = this.crminfo?.lastRsrvName || "없음";
          const lastRsrv = this.crminfo?.rsrvDt || "없음";
          const formattedCallTime = this.formatCallTime(callTime);
          const formattedCallerNumber = this.formatPhoneNumber(callerNumber);
          
          // 알림 제목은 고객명 유무에 따라 변경
          const notificationTitle = custName === "미등록 고객" 
                                  ? `📞 새 전화 수신 (${custName})` 
                                  : `고객명: ${custName}`;

          // 알림 본문 (줄 수를 최소화하고 핵심 정보만 포함)
          const notificationBody = 
            `발신번호: ${formattedCallerNumber}\n전화지점: ${branchName}\n시간: ${formattedCallTime}\n최종예약일자: ${lastRsrv}`;

          const notification = new Notification(
            notificationTitle,
            {
              body: notificationBody,
              // 아이콘 및 뱃지 경로는 프로젝트에 맞게 확인 및 수정
              // /himo-crm/resources/vue/himo-crm.png 경로를 사용하는 것이 더 명확할 수 있습니다.
              icon: "/himo-crm/resources/vue/himo-crmlogo.png", 
              //icon: "/favicon.ico", 
              // badge: "/path/to/badge-icon.png", // 뱃지 경로는 선택 사항
              tag: "incoming-call", // 중복 알림 방지 태그
              requireInteraction: true, // 사용자가 닫기 전까지 유지
              silent: false, // 소리 있음
            }
          );
          setTimeout(() => {
            notification.close();
          }, 10000);

          // 알림 클릭 시 창 포커스
          notification.onclick = () => {
            window.focus();
            this.showCrmInfomodal(callerNumber, callTime);
            notification.close();
          };

          return notification;
        } else {
          /*
          const notification = new Notification(
            `전화지점 :${this.crminfo.indeptName}`,
            {
              body: `발신번호: ${this.formatPhoneNumber(
                callerNumber
              )}\n시간: ${this.formatCallTime(callTime)}`,
              tag: "incoming-call", // 중복 알림 방지
              requireInteraction: true,
              silent: false,
            }
          );
          */
          // 고객명을 간결하게 정의 (없으면 "미등록 고객")
          const custName = this.crminfo?.callCustname || "미등록 고객";
          const branchName = this.crminfo?.indeptName || "정보 없음";
          //const lastRsrv = this.crminfo?.lastRsrvName || "없음";
          const lastRsrv = this.crminfo?.rsrvDt || "없음";
          const formattedCallTime = this.formatCallTime(callTime);
          const formattedCallerNumber = this.formatPhoneNumber(callerNumber);
          
          // 알림 제목은 고객명 유무에 따라 변경
          const notificationTitle = custName === "미등록 고객" 
                                  ? `📞 새 전화 수신 (${custName})` 
                                  : `고객명: ${custName}`;

          // 알림 본문 (줄 수를 최소화하고 핵심 정보만 포함)
          const notificationBody = 
            `발신번호: ${formattedCallerNumber}\n전화지점: ${branchName}\n시간: ${formattedCallTime}\n최종예약일자: ${lastRsrv}`;

          const notification = new Notification(
            notificationTitle,
            {
              body: notificationBody,
              // 아이콘 및 뱃지 경로는 프로젝트에 맞게 확인 및 수정
              // /himo-crm/resources/vue/himo-crm.png 경로를 사용하는 것이 더 명확할 수 있습니다.
              icon: "/himo-crm/resources/vue/himo-crmlogo.png", 
              //icon: "/favicon.ico", 
              // badge: "/path/to/badge-icon.png", // 뱃지 경로는 선택 사항
              tag: "incoming-call", // 중복 알림 방지 태그
              requireInteraction: true, // 사용자가 닫기 전까지 유지
              silent: false, // 소리 있음
            }
          );
          
          setTimeout(() => {
            notification.close();
          }, 10000);

          // 알림 클릭 시 창 포커스
          notification.onclick = () => {
            window.focus();
            this.showCrmInfomodal(callerNumber, callTime);
            notification.close();
          };

          return notification;
        }
      }
    },

    /* ===========================================================
      완전 커스텀 알림창 (스타일 자유 설정 가능)
    =========================================================== */
    /*
    async showNotification(callerNumber, callTime) {
      await this.NotifiCrmInfo(callerNumber, callTime);
      const info = this.crminfo || {};

      const custName = info.callCustname || "미등록 고객";
      const branch = info.indeptName || "지점정보 없음";
      const rsrv = info.lastRsrvName || "없음";
      const phone = this.formatPhoneNumber(callerNumber);
      const time = this.formatCallTime(callTime);
      
      console.log("showNotification 내부로 진입");
      if (document.visibilityState === "hidden") {
        console.log("비활성탭이라 OS알림.");
        //  비활성 탭 → OS 알림
        if ("Notification" in window && Notification.permission === "granted") {
          const notification = new Notification("📞 새 전화 수신", {
            body: `고객명: ${custName}\n지점: ${branch}\n번호: ${phone}\n시간: ${time}\n예약: ${rsrv}`,
            icon: "/himo-crm/resources/vue/himo-crm.png",
            requireInteraction: true, // 사용자가 직접 닫을 때까지 유지
          });

          notification.onclick = () => {
            window.focus();
            this.showCrmInfomodal(callerNumber, callTime);
            notification.close();
          };
        }
      } else {
        console.log("활성 탭 → 커스텀 HTML 알림 (항상 우측 하단)");
        //  활성 탭 → 커스텀 HTML 알림 (항상 우측 하단)
        let container = document.getElementById("customNotifyContainer");
        if (!container) {
          container = document.createElement("div");
          container.id = "customNotifyContainer";
          Object.assign(container.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "99999",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "10px",
          });
          document.body.appendChild(container);
        }

        const notify = document.createElement("div");
        Object.assign(notify.style, {
          background: "linear-gradient(135deg, #2b5876, #4e4376)",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          padding: "16px 20px",
          width: "320px",
          opacity: "0",
          transform: "translateY(20px)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          zIndex: "100000",
        });

        notify.innerHTML = `
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <img src="/himo-crm/resources/vue/himo-crm.png"
                style="width:48px;height:48px;border-radius:10px;">
            <div style="flex:1;">
              <h4 style="margin:0;font-size:16px;">📞 새 전화 수신</h4>
              <p style="margin:4px 0 0;">고객명: <b>${custName}</b></p>
              <p style="margin:2px 0;">번호: ${phone}</p>
              <p style="margin:2px 0;">지점: ${branch}</p>
              <p style="margin:2px 0;">시간: ${time}</p>
            </div>
          </div>
        `;

        container.appendChild(notify);
        notify.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 300, fill: "forwards" }
        );

        // 8초 뒤 사라지게
        setTimeout(() => {
          notify.animate(
            [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(20px)" },
            ],
            { duration: 400, fill: "forwards" }
          ).onfinish = () => notify.remove();
        }, 8000);
      }
    }
    */



    handleBrowserClose(event) {
      // 새로고침인지 확인
      const isRefreshing = sessionStorage.getItem("isRefreshing");
      if (isRefreshing === "true") {
        sessionStorage.removeItem("isRefreshing");
        return;
      }
      this.sendToServer("O");
      this.closeAllPopups();
      this.stopPolling();
    },

    checkSingleTab() {
      // 현재 탭의 고유 ID 생성
      this.currentTabId =
        "tab_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

      // 기존 활성 탭 ID 확인
      const activeTabId = localStorage.getItem("activeTabId");
      const activeTabTime = localStorage.getItem("activeTabTime");
      const currentTime = Date.now();

      // 기존 활성 탭이 있고, 너무 오래되지 않았으면 (10초 이내)
      if (
        activeTabId &&
        activeTabTime &&
        currentTime - parseInt(activeTabTime) < 30000
      ) {
        alert(
          "같은 CRM 시스템이 이미 실행 중입니다.\n다른 탭을 닫거나 이 탭을 닫아주세요."
        );
        window.close();
        // 현재 탭 비활성화
        this.disableCurrentTab();
        return false;
      }

      // 현재 탭을 활성 탭으로 설정
      localStorage.setItem("activeTabId", this.currentTabId);
      localStorage.setItem("activeTabTime", currentTime.toString());

      // // 다른 탭의 변화 감지
      // window.addEventListener("storage", this.handleTabStorageChange);

      // 주기적으로 활성 상태 업데이트 (하트비트)
      this.tabHeartbeat = setInterval(() => {
        if (!this.isTabDisabled) {
          localStorage.setItem("activeTabId", this.currentTabId);
          localStorage.setItem("activeTabTime", Date.now().toString());
        }
      }, 3000); // 3초마다

      // 페이지 언로드 시 정리
      window.addEventListener("beforeunload", this.cleanupTab);

      return true;
    },

    // 다른 탭에서 localStorage 변경 감지
    // handleTabStorageChange(e) {
    //   if (e.key === "activeTabId" && e.newValue !== this.currentTabId) {
    //     alert("다른 탭에서 CRM 시스템이 시작되어 현재 탭을 비활성화합니다.");
    //     this.disableCurrentTab();
    //   }
    // },

    // 현재 탭 비활성화
    disableCurrentTab() {
      this.isTabDisabled = true;

      // 하트비트 중단
      if (this.tabHeartbeat) {
        clearInterval(this.tabHeartbeat);
      }

      // 화면 오버레이 표시
      // this.showTabDisabledOverlay();

      // IPCC 관련 정리
      this.closeAllPopups();
    },

    // 탭 비활성화 오버레이 표시
    showTabDisabledOverlay() {
      // 키보드 이벤트 차단
      document.addEventListener(
        "keydown",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        true
      );
    },
    // 탭 정리
    cleanupTab() {
      if (localStorage.getItem("activeTabId") === this.currentTabId) {
        localStorage.removeItem("activeTabId");
        localStorage.removeItem("activeTabTime");
      }

      if (this.tabHeartbeat) {
        clearInterval(this.tabHeartbeat);
      }

      window.removeEventListener("storage", this.handleTabStorageChange);
      window.removeEventListener("beforeunload", this.cleanupTab);
    },
  },
};