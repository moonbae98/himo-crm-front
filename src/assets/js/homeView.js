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
      logoutshowConfirm: false,
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
      testModal: false,
      crminfomodal: false,
      consultationModal: false,
      designModal: false,
      passwordChangeModal: false,
      adminbuttonModal: false,
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
      calllistfields: [
        { key: "callDate", label: "통화일자", sortable: true },
        { key: "callPhoneno", label: "전화번호" },
        { key: "callCustcode", label: "고객코드" },
        { key: "callCustname", label: "고객명" },
        { key: "callCnt", label: "횟수" },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
          sortable: true,
        },
      ],
      callbacklistfields: [
        { key: "backDate", label: "통화일자" },
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
        },
        {
          key: "backCallNo",
          label: "요청번호",
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
        },
        {
          key: "callCustname",
          label: "고객명",
        },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
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
        },
        {
          key: "lastRsrvName",
          label: "최종예약내역",
        },
        {
          key: "asCodeName",
          label: "최종AS명",
        },
        {
          key: "asRemark",
          label: "최종AS내역",
        },
        {
          key: "callRemark",
          label: "상담내역",
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
        },
        { key: "CALL_PHONENO", label: "핸드폰번호" },
        {
          key: "CALL_CUSTNAME",
          label: "고객명",
        },
        {
          key: "CALL_REMARK",
          label: "상담내역",
        },
      ],
      todayperPage: 25,
      consultcurrentPage: 1,
      consultperPage: 9,
      currentPage: 1,
      perPage: 10,
      mainextno: "",
    };
  },

  async mounted() {
    this.loadIPCCInfoFromStorage();
    window.parseLogin = (data1, data2, data3, data4, data5, data6, data8) => {
      this.activeDangzic = data8;
      this.mainextno = data6;
      localStorage.setItem("mainextno", this.mainextno);
    };
    const response = await axios.get("./session");
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
      //  console.log(this.b64_sha512("2500040")); /* 이효승과장님 암호화 코드. */
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
      try {
        // 필요한 데이터 구성 (예: 내선, 상담자, 전화번호 등)
        const payload = {
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
          params: { callPhoneno: phoneNumber, callTime: callTime },
        });
        await this.fetchTodayCallList();
      } catch (error) {
        console.error("Failed to handle missed call:", error);
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
          this.newUserName = "",
          this.newUserNo = "",
          this.newUserId = "",
          this.newUserPassword = "",
          this.newUserConfirmPassword = "",
          this.getUserPw = "",
          this.findUserId = "",
          this.findUserNo = "",
      this.adminbuttonModal = false;
    },
    async logout() {
      try {
        await axios.post("./logout");
        this.logoutshowConfirm = false;
        this.logout1();
        localStorage.removeItem("loginInfo");
        localStorage.removeItem("autologin");
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
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
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
      this.selectedtodayRowIndex = index;
      const rows = this.$refs.calltodayTable.$el.querySelectorAll('tbody tr');
      const callrows = this.$refs.callTable.$el.querySelectorAll('tbody tr');
      rows.forEach(row => row.classList.remove('today-table-active'));
      callrows.forEach(row => row.classList.remove('today-table-active'));
      if (rows[index]) {
        rows[index].classList.add('today-table-active');
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
      this.selectedcallRowIndex =index;

      const rows = this.$refs.callTable.$el.querySelectorAll('tbody tr');
      const todayrows = this.$refs.calltodayTable.$el.querySelectorAll('tbody tr');
      rows.forEach(row => row.classList.remove('today-table-active'));
      todayrows.forEach(row => row.classList.remove('today-table-active'));
      if (rows[index]) {
        rows[index].classList.add('today-table-active');
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
      const rows = this.$refs.consultTable.$el.querySelectorAll('tbody tr');
      rows.forEach(row => row.classList.remove('today-table-active'));
      if (rows[index]) {
        rows[index].classList.add('today-table-active');
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
        console.log("콜백 리스트 조회 성공:", this.callbacklistitems);
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
          hpNo: item.backPhoneno,
        });
        this.callbackcustname = response.data.mbsViewNm || "";
      } catch (error) {
        console.error("콜백 고객명 조회 실패:", error);
      }
      const rows = this.$refs.callbackTable.$el.querySelectorAll('tbody tr');
      rows.forEach(row => row.classList.remove('today-table-active'));
      if (rows[index]) {
        rows[index].classList.add('today-table-active');
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
      this.callbackdateinput();
      try {
        const response = await axios.post("./dateinputcallbacklist", {
          backDept: this.user?.extNo?.locSaupjang,
          startDate: this.callbackstartdt,
          endDate: this.callbackenddt,
        });
        this.callbacklistitems = response.data;
      } catch (error) {
        console.error("콜백 리스트 조회 실패:", error);
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
        });
        this.getUserPw = this.aesDecrypt(response.data,"himoadmin1234567");
      } catch (e) {
        alert("해당 아이디와 이름으로 등록된 사용자가 없습니다.");
        return;
      }
    },
  },
};
