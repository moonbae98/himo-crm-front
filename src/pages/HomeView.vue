<style src="../assets/styles/homeview.css"></style>
<script src="../assets/js/homeView.js"></script>
<template>
  <!-- homeview.css 에 css있습니다. -->

  <div class="crm-home-background">
    <b-container fluid>
      <b-row no-gutters style="height: 50vh">
        <!-- 상담자 정보 및 기능 -->
        <b-col cols="12" md="4" lg="4" class="text-center">
          <b-card style="width: 100%; height: 100%; display: flex">
            <div class="homectrbox">
              <h3 class="homectrbox-title">영업본사<!-- {{ user?.extNo.deptNm }} --></h3>
              <div class="homectrboxinfo">
                <div class="homectrbox-row">
                  <span class="homectrbox-label">전화번호</span>
                  <span class="homectrbox-value">5555<!-- {{ user?.extNo.extNo }} --></span>
                </div>
                <div class="homectrbox-row">
                  <span class="homectrbox-label">상담자</span>
                  <span class="homectrbox-value">홍길동<!-- {{ user?.user.name }} --></span>
                </div>
                <div class="homectrbox-btn-group">
                  <button
                    class="homectrboxinfobtn"
                    @click="callbacklistretrieve"
                  >
                    콜백리스트
                  </button>
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
                    상담 후처리
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
        <!-- 로그인 기록 및 기능
        <b-col cols="12" md="2" lg="2" class="text-center">
          <b-card style="width: 100%; height: 100%">
            <b-button class="p-1" variant="primary" @click="logout1"
              >로그아웃</b-button
            >
            <b-form-input
              v-model="telnumber"
              type="text"
              placeholder="전화번호를 입력하세요"
              class="mt-2 mb-2 w-50 mx-auto"
            />
            <b-button
              class="p-1"
              variant="danger"
              @click="requestNotificationPermission"
              >알림권한요청하기</b-button
            >
          </b-card>
        </b-col> -->

        <!--당일 통화내역-->
        <b-col cols="12" md="7" lg="7">
          <b-card style="width: 100%; height: 100%">
            <b-table
              class="crmlog"
              :items="todayCallList"
              :fields="calllistfields"
              @row-clicked="c_info_retrieve"
              sticky-header="400px"
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

              <!-- 팝업창 작업끝나시면 해당버튼은 지우셔도됩니다. -->
              <button
                @click="showCrmInfo"
                class="btn btn-outline-success btn-sm call-btn"
                type="button"
              >
                팝업창열기

              </button>
              <!-- 모달창 작업끝나시면 해당버튼은 지우셔도됩니다. -->
              <button
                @click="showCrmInfomodal"
                class="btn btn-outline-success btn-sm call-btn"
                type="button"
              >
                모달창열기
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
                <label>성별 :</label>
                <select  v-model="customerInfo.gerder" class="slim-input" disabled>
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
                <input
                  readonly
                  :value="customerInfo ? customerInfo.deptName : ''"
                  class="slim-input"
                />
              </div>
            </div>

            <textarea
              rows="2"
              :value="customerInfo ? customerInfo.asRemark : ''"
              class="form-control mb-2 no-resize slim-textarea"
            ></textarea>

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
              <div class="form-pair-row">
                <label>당직자 내선번호 :</label>
                <input v-model="dangzicextno" class="slim-input" type="text" />
              </div>
              <div class="form-pair-row">
                <button
                  class="dolbtn"
                  :class="{ active: activeDangzic === 'A' }"
                  @click="dolbtn"
                >
                  당직자로그인
                </button>
                <button
                  :class="{ active: activeDangzic === 'N' }"
                  class="dolobtn"
                  @click="dolobtn"
                >
                  당직자로그아웃
                </button>
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

    <!-- 콜백리스트 모달 -->
    <b-modal
      v-model:show="testModal"
      @hide="onModalHide"
      title="콜백내역 조회"
      modal-class="callback-list-modal"
      hide-header-close
      hide-backdrop
      no-close-on-backdrop
      size="lg"
    >
      <template #default>
        <div
          style="display: flex; flex-direction: row; width: 100%; height: 30rem"
        >
          <div
            style="
              width: 70%;
              height: 100%;
              padding: 5px;
              border: 1px solid black;
              border-radius: 5px;
              margin: 2px;
              gap: 5px;
              display: flex;
              flex-direction: column;
            "
          >
            <div class="callback-list-modal-content">
              <p>조회 기간 :</p>
              <input
                class="callbackdateinput"
                type="date"
                v-model="callbackstartdt"
              />~
              <input
                class="callbackdateinput"
                type="date"
                v-model="callbackenddt"
              />
              <b-button
                variant="primary"
                style="padding: 0 5px 0 5px"
                @click="dateinputcallbacklist"
                >조회</b-button
              >
            </div>
            <!--<div class="callback-list-modal-content">
              <p>전화번호 :</p>
              <input class="callbackdateinput" type="text" />
              <p>요청 전화번호 :</p>
              <input class="callbackdateinput" type="text" />
            </div>-->
            <hr class="callbackline" />
            <b-table
              class="callback-list-table"
              :items="callbacklistitems"
              :fields="callbacklistfields"
              @row-clicked="callbackset"
              bordered
              hover
            ></b-table>
          </div>
          <div
            style="
              width: 30%;
              height: 100%;
              padding: 5px;
              border: 1px solid black;
              border-radius: 5px;
              margin: 2px;
              gap: 5px;
              display: flex;
              flex-direction: column;
            "
          >
            <strong>통화내역기록</strong>
            <div class="callback-list-modal-content">
              <b-button
                variant="secondary"
                style="padding: 0 5px 0 5px"
                @click="makeCallBack"
                >☎전화걸기</b-button
              >
            </div>
            <div style="border: 1px solid #ccc">
              <div class="callback-list-modal-content">
                <p class="callbacktext">전화일자</p>
                :
                <input
                  class="callbackdateinput"
                  type="text"
                  v-model="callbackdate"
                  readonly
                />
              </div>
              <div class="callback-list-modal-content">
                <p class="callbacktext">전화번호</p>
                :
                <input
                  class="callbackdateinput"
                  type="text"
                  v-model="callbackinnumber"
                  readonly
                />
              </div>
            </div>
            고객명
            <div class="callback-list-modal-content">
              <input
                class="callbackdateinput"
                type="text"
                v-model="callbackcustname"
                readonly
              />
            </div>
            요청 전화번호
            <div class="callback-list-modal-content">
              <input
                class="callbackdateinput"
                type="text"
                v-model="callbacknumber"
                readonly
              />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <b-button variant="secondary" @click="testModal = false">닫기</b-button>
      </template>
    </b-modal>


    <!-- v-if="crminfo && crminfo.callPhoneno" 프론트개발이후 모달에 들어갈 조건-->  
    <b-modal
      v-model:show="crminfomodal"
      title="CRM 정보"
      @hide="oncrmModalHide"
    >
      <div>
        <!-- class v-if="crminfo.callCustcode ? crminfo.callCustcode : false" 프론트개발이후 모달에 들어갈 조건 -->
        <div>
          고객정보 있을 경우
          <div class="crmpopupinfo">
            <p class="popuptextbox">
              <strong>고객명:</strong>
              <!-- {{ crminfo.callCustname ? crminfo.callCustname : "" }} -->
                홍길동
            </p>
            <p class="popuptextbox">
              <strong>일자:</strong>
              <!-- {{ crminfo.callDate ? crminfo.callDate : "" }} -->
              2023-10-01
            </p>
            <div style="display: flex">
              <div class="flexside">
                <p class="popuptextbox">
                  <strong>고객코드:</strong>
                  <!-- {{ crminfo.callCustcode ? crminfo.callCustcode : "" }} -->
                  123456
                </p>
                <p class="popuptextbox">
                  <strong>통화지점:</strong>
                  <!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} -->
                  본사
                </p>
              </div>
            </div>
            <div class="flexside">
              <p class="popuptextbox">
                <strong>전화번호:</strong>
                <!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} -->
                010-1234-5678
              </p>
              <p class="popuptextbox">
                <strong>최종예약내역:</strong>
                <!-- {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }} -->
                예약내역 예시
              </p>
            </div>
            <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
          </div>
        </div>
        <!-- v-else -->
        <div>
          고객정보 없을 경우
          <div class="crmpopupinfo">
            <p class="popuptextbox">
              <strong>고객 정보 없음</strong>
            </p>
            <p class="popuptextbox">
              <strong>일자:</strong>
              <!-- {{ crminfo.callDate ? crminfo.callDate : "" }} -->
                2023-10-01
            </p>
            <div style="display: flex">
              <div class="flexside">
                <p class="popuptextbox">
                  <strong>통화지점:</strong>
                  <!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} -->
                  본사
                </p>
              </div>
            </div>
            <div class="flexside">
              <p class="popuptextbox">
                <strong>전화번호:</strong>
                <!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} -->
                010-1234-5678
              </p>
            </div>
            <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
