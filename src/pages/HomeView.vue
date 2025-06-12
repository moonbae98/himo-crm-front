<style src="../assets/styles/homeview.css"></style>



<template>
<!-- homeview.css 에 css있습니다. -->

  <div class="crm-home-background">
    <b-container fluid>
      <b-row no-gutters style="height: 50vh">
        <!-- 상담자 정보 및 기능 -->
        <b-col cols="12" md="4" lg="4" class="text-center">
          <b-card style="width: 100%; height: 100%; display: flex">
            <div class="homectrbox">
              <h3 class="homectrbox-title">{{ user?.user.deptNm }}</h3>
              <div class="homectrboxinfo">
                <div class="homectrbox-row">
                  <span class="homectrbox-label">전화번호</span>
                  <span class="homectrbox-value">{{ user?.extNo.extNo }}</span>
                </div>
                <div class="homectrbox-row">
                  <span class="homectrbox-label">상담자</span>
                  <span class="homectrbox-value">{{ user?.user.name }}</span>
                </div>
                <div class="homectrbox-btn-group">
                  <button class="homectrboxinfobtn">콜백리스트</button>
                  <button class="homectrboxinfobtn">상담내역조회</button>
                  <button
                    id="mbtn1"
                    class="homectrboxinfobtn"
                    :class="{ active: activeMenu === 'mbtn1' }"
                    @click="setCallStatus('mbtn1', '0')"
                  >
                    상담대기
                  </button>
                  <button
                    id="mbtn2"
                    class="homectrboxinfobtn"
                    :class="{ active: activeMenu === 'mbtn2' }"
                    @click="setCallStatus('mbtn2', '1')"
                  >
                    상담중
                  </button>
                  <button
                    id="mbtn3"
                    class="homectrboxinfobtn"
                    :class="{ active: activeMenu === 'mbtn3' }"
                    @click="setCallStatus('mbtn3', '2')"
                  >
                    후처리
                  </button>
                  <button
                    id="mbtn4"
                    class="homectrboxinfobtn"
                    :class="{ active: activeMenu === 'mbtn4' }"
                    @click="setCallStatus('mbtn4', '3')"
                  >
                    휴식
                  </button>
                </div>
              </div>
              <div class="homectrbox-btn-group">
                <b-button
                  class="homectrbox-endbtn"
                  variant="danger"
                  @click="hangdown"
                >
                  전화종료
                </b-button>
                <b-button
                  class="homectrbox-endbtn"
                  variant="primary"
                  @click="logoutshowConfirm = true"
                  >종료</b-button
                >
              </div>
            </div>
          </b-card>
        </b-col>

        <!-- 통화내역 테이블 -->
        <b-col cols="12" md="8" lg="8">
          <b-card style="width: 100%; height: 100%; max-height: 50vh">
            <b-table
              class="crmlog"
              :items="crmitems"
              :fields="crmitemfields"
              :per-page="perPage"
              :current-page="currentPage"
              @row-clicked="c_info_retrieve_row"
              striped
              hover
              bordered
            ></b-table>
            <div class="mt-3 d-flex justify-content-center">
              현재 페이지: {{ currentPage }} / 전체 통화량: {{ rows }}
            </div>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              class="mt-3 d-flex justify-content-center"
            />
          </b-card>
        </b-col>
      </b-row>

      <b-row no-gutters style="height: 50vh">
        <!-- 로그인 기록 및 기능 -->
        <b-col cols="12" md="2" lg="2" class="text-center">
          <b-card style="width: 100%; height: 100%">
            <h1>(테스트)</h1>
            <b-button class="p-1" variant="primary" @click="logout1"
              >로그아웃</b-button
            >
            <b-form-input
              v-model="telnumber"
              type="text"
              placeholder="전화번호를 입력하세요"
              class="mt-2 mb-2 w-50 mx-auto"
            />
            <b-button class="p-1" variant="success" @click="showCrmInfo"
              >CRM 팝업 열기</b-button
            >
          </b-card>

          <!-- 로그아웃 확인 모달 -->
          <b-modal v-model:show="logoutshowConfirm" title="로그아웃 확인">
            로그아웃하시겠습니까?
            <template #footer>
              <b-button
                class="p-1"
                variant="secondary"
                @click="logoutshowConfirm = false"
                >취소</b-button
              >
              <b-button class="p-1" variant="primary" @click="logout"
                >로그아웃</b-button
              >
            </template>
          </b-modal>
        </b-col>

        <!--당일 통화내역-->
        <b-col cols="12" md="5" lg="5">
          <b-card style="width: 100%; height: 100%">
            <b-table
              class="crmlog"
              :items="todayCallList"
              :fields="calllistfields"
              @row-clicked="c_info_retrieve"
              striped
              hover
              bordered
            ></b-table>
          </b-card>
        </b-col>

        <b-col cols="12" md="5" lg="5">
          <b-card class="modern-card">
            <div class="phone-flex-bar">
              <span class="label-text">전화번호 :</span>
              <input
                v-model="phoneNumber"
                placeholder="전화번호를 입력하세요"
                class="phone-input"
              />
              <button
                @click="makeCall"
                class="btn btn-success btn-sm call-btn"
                type="button"
              >
                ☎전화걸기
              </button>
              <button
                @click="hangupCall"
                class="btn btn-outline-success btn-sm call-btn"
                type="button"
              >
                ☎전화받기
              </button>
            </div>

            <!-- 전화걸기 및 받기 고객자료 뽑기 -->
            <div class="form-pair-table">
              <div class="form-pair-row">
                <label>고객명 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callCustname : ''"
                  class="slim-input"
                />
                <label>일자 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callDate : ''"
                  class="slim-input"
                />
              </div>
              <div class="form-pair-row">
                <label>수신 전화번호 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callInsphone : ''"
                  class="slim-input"
                />
                <label>구분 :</label>
                <select v-model="selected" class="slim-input">
                  <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.value"
                  >
                    {{ option.text }}
                  </option>
                </select>
              </div>
              <div class="form-pair-row">
                <label>사용 전화번호 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callPhoneno : ''"
                  class="slim-input"
                />
                <label>핸드폰번호 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callUsephone : ''"
                  class="slim-input"
                />
              </div>
              <div class="form-pair-row">
                <label>고객코드 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.callCustcode : ''"
                  class="slim-input"
                />
                <label>통화지점 :</label>
                <input class="slim-input" />
              </div>
            </div>

            <textarea
              v-model="remark"
              rows="2"
              :value="customerInfo ? customerInfo.asRemark : ''"
              class="form-control mb-2 no-resize slim-textarea"
              placeholder="메모를 입력하세요"
            />

            <div class="form-pair-table">
              <div class="form-pair-row">
                <label>최종예약일자 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.rsrvDt : ''"
                  class="slim-input"
                />
                <label>최종예약명 :</label>
                <input
                  readonly
                  :value="customerInfo ? customerInfo.lastRsrvName : ''"
                  class="slim-input"
                />
              </div>
              <div class="form-pair-row">
                <label>최종as일자 :</label>
                <input readonly class="slim-input" />
                <label>최종a/s명 :</label>
                <input readonly class="slim-input" />
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>

      
       <!-- IPCC 시스템 이것은 건들지 마시오!-->
      <b-row class="mt-3" v-show="showIpcc">
        <b-col cols="12">
          <b-card style="width: 100%; height: 100%">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">IPCC 시스템</h5>
              <div>
                <b-button
                  @click="reloadIframe"
                  size="sm"
                  variant="outline-secondary"
                  class="me-2"
                >
                  새로고침
                </b-button>
                <b-button
                  @click="connectToIPCC"
                  size="sm"
                  variant="outline-success"
                >
                  IPCC 연결
                </b-button>
              </div>
            </div>
            <iframe
              ref="ipccFrame"
              :src="ipccFrameUrl"
              width="100%"
              height="400"
              frameborder="1"
              @load="onIpccFrameLoad"
              style="border: 2px solid #007bff; background-color: white"
            ></iframe>
          </b-card>
        </b-col>
      </b-row>
    </b-container>


    <!-- CRM 팝업 -->
    <div v-if="showCrmPopup" class="crm-popup">
      <div class="crm-popup-header">
        <span>CRM infomation</span>
        <b-button
          class="p-1"
          size="sm"
          variant="link"
          @click="showCrmPopup = false"
          >✕</b-button
        >
      </div>
      <div class="crm-popup-body">
        <div v-if="crminfo">
          <p style="border: 1px">고객코드: {{ crminfo.mbsNo }}</p>
          <p style="border: 1px">이름: {{ crminfo.mbsViewNm }}</p>
          <div style="display: flex">
            <p style="border: 1px">전화번호:</p>
            <p class="c-buthover" style="border: 1px" @click="c_info_retrieve2">
              {{ crminfo.hpNo }}
            </p>
          </div>
        </div>
        <div v-else>
          <p>저장되어있지 않은 고객 번호입니다.</p>
          <p>전화번호: {{ telnumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>






<script>
import {
  BCard,
  BButton,
  BModal,
  BFormInput,
  BRow,
  BContainer,
  BCol,
  BTable,
  BPagination,
} from "bootstrap-vue-next";
import axios from "axios";
import CryptoJS from "crypto-js";

export default {
  name: "HomeView",
  components: {
    BCard,
    BButton,
    BModal,
    BFormInput,
    BRow,
    BContainer,
    BCol,
    BTable,
    BPagination,
  },

  data() {
    return {
      showIpcc: true,
      user: null,
      telnumber: null,
      logoutshowConfirm: false,
      showCrmPopup: false,
      crminfo: null,
      crmitems: [],
      todayCallList: [],
      customerInfo: null,
      selected: "1",
      phoneNumber: "",
      remark: "",
      activeMenu: "",
      callStatus:"",
      ipccFrameUrl: "/himo-crm1/resources/vue/socket_frame.html",
      ipccLoginInfo: null,
      calllistfields: [
        { key: "callPhoneno", label: "전화번호" },
        { key: "callCustname", label: "고객명" },
        { key: "callDate", label: "통화일자" },
        {
          key: "callStatus",
          label: "상태",
          formatter: (value) => (value === "Y" ? "통화" : "미통화"),
        },
      ],
      options: [
        { text: "하나", value: "1" },
        { text: "둘", value: "2" },
        { text: "셋", value: "3" },
      ],
      crmitemfields: [
        { key: "deptName", label: "사업장", sortable: true },
        { key: "callDate", label: "전화일자", sortable: true },
        { key: "callPhoneno", label: "전화번호" },
        { key: "callCustname", label: "고객명" },
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
        { key: "lastRsrvName", label: "최종예약내역" },
      ],
      currentPage: 1,
      perPage: 6,
    };
  },

  async mounted() {
    const response = await axios.get("./session");
    console.log("세션 정보:", response.data);
    this.loadIPCCInfoFromStorage();
    this.user = response.data;
    await this.fetchTodayCallList();
    window.parseLogin = function () {};
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
    window.parseCallEvent = (kind, callerNumber,data3) => {
      if (kind === "IR") {
        this.telnumber = callerNumber;
        this.sendCallEventToServer(callerNumber);
        this.showCrmInfo();
      }
      if (kind === "OR") {
        this.telnumber = callerNumber;
        this.sendCallEventToServer(data3);
        this.showCrmInfo();
      }
      // if(kind === "OD"){
      //   console.log("발신전화가 종료되었습니다.");
      // }
    };
    window.logoutfromserver = function () {};
    window.parseHangupEvent = function () {};
  },

  computed: {
    rows() {
      return this.crmitems.length;
    },
  },

  methods: {
    /*--------------------------------------------------- IPCC관련 함수들---------------------------------------------------*/

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

    reloadIframe() {
      const iframe = this.$refs.ipccFrame;
      if (iframe) {
        const timestamp = Date.now();
        iframe.src = `${this.ipccFrameUrl}?_reload=${timestamp}`;
      }
    },

    onIpccFrameLoad() {
      if (this.ipccLoginInfo) {
        setTimeout(() => {
          this.connectToIPCC();
        }, 0);
      }
    },

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
        //this.activeMenu = "mbtn2"; // 상담중 상태로 변경
        const command = `CLICKDIAL|${cid},${this.phoneNumber}`;
        iframe.contentWindow.SendCommand2Socket(`CMD|${command}`);
        alert(`${this.phoneNumber}로 전화걸기 요청`);
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

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
          `CMD|MEMBERSTATUS|${statusCode},${exten}`
        );
      } else {
        alert("IPCC 프레임이 준비되지 않았거나, 통신 함수가 없습니다.");
      }
    },

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

    async sendCallEventToServer(phoneNumber) {
      try {
        // 필요한 데이터 구성 (예: 내선, 상담자, 전화번호 등)
        const payload = {
          callPhoneno: phoneNumber,
          userId: this.user?.user?.crmid, // 상담원 ID
          callDept: this.user?.user?.bizDiv, // 상담원 부서서
          callExtNo: this.user?.extNo?.extNo, // 내선번호
        };
        await axios.post("./call-event", payload);
        // 성공 후 추가 동작(알림 등) 필요시 여기에
        await this.fetchTodayCallList();
      } catch (e) {
        console.error("전화 이벤트 서버 전송 실패:", e);
      }
    },
    // async missedCall(phoneNumber){
    //   try {
    //     await axios.get("./missed-call",{
    //       params: { extNo: this.user?.extNo?.extNo }
    //     });
    //   } catch (error) {
    //     console.error("Failed to handle missed call:", error);
    //   }
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    sha512Hash(password) {
      return CryptoJS.SHA512(password).toString();
    },

    async logout() {
      try {
        await axios.post("./logout");
        this.logoutshowConfirm = false;
        localStorage.removeItem("loginInfo");
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    async showCrmInfo() {
      if (!this.telnumber) {
        alert("전화번호를 입력하세요!");
        return;
      }
      this.showCrmPopup = true;
      try {
        const response = await axios.post("./crm-info", {
          hpNo: this.telnumber,
        });
        this.crminfo = response.data;
      } catch (error) {
        console.error("Failed to fetch CRM info:", error);
      }
    },

    async c_info_retrieve(item) {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: item.callPhoneno,
        });
        this.crmitems = response.data;
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
    },

    async c_info_retrieve2() {
      try {
        const response = await axios.post("./c_info_retrieve", {
          hpNo: this.telnumber,
        });
        this.crmitems = response.data;
      } catch (error) {
        alert("통화내역 조회에 실패했습니다.");
      }
    },

    async c_info_retrieve_row(item) {
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
    },

    async fetchTodayCallList() {
      try {
        const response = await axios.get("./today-call-list", {
          params: { extNo: this.user?.extNo?.extNo },
        });

        this.todayCallList = [...response.data];
      } catch (e) {
        alert("오늘 통화내역 조회 실패");
      }
    },
  },
};
</script>
