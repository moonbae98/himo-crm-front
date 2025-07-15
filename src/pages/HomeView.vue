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
              <h3 class="homectrbox-title"><!--{{ user?.extNo.deptNm }}-->영업본사</h3>
              <div class="homectrboxinfo">
                <div class="homectrbox-row">
                  <span class="homectrbox-label">전화번호</span>
                  <span class="homectrbox-value"><!--{{ user?.extNo.extNo }}-->010-1111-1111</span>
                </div>
                <div class="homectrbox-row">
                  <span class="homectrbox-label">상담자</span>
                  <span class="homectrbox-value"><!--{{ user?.user.name }}-->홍길동</span>
                </div>
                <div class="homectrbox-btn-group">
                  <button
                    class="homectrboxinfobtn"
                    @click="callbacklistretrieve"
                  >
                    콜백리스트
                    <span class="count-highlight">{{
                      this.callbackcountnum
                    }}</span>
                  </button>
                  <button class="homectrboxinfobtn" @click="consultmodalOn">
                    상담내역조회
                  </button>
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
            <div
              style="
                overflow-x: auto;
                width: 100%;
                max-width: 100%;
                height: 38vh;
              "
            >
              <b-table
                class="crmlog2"
                :items="crmitems"
                :fields="crmitemfields"
                :per-page="perPage"
                :current-page="currentPage"
                @row-clicked="c_info_retrieve_row"
                @row-dblclicked="popupCrmInfo"
                style="table-layout: fixed; width: max-content; min-width: 100%"
                striped
                hover
                bordered
              ></b-table>
            </div>
            <div class="mt-3 d-flex justify-content-center">
              현재 페이지: {{ currentPage }} / 전체 통화량: {{ rows }}
            </div>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              class="d-flex justify-content-center"
            />
          </b-card>
        </b-col>
      </b-row>

      <b-row no-gutters style="height: 50vh">
        <!--당일 통화내역-->
        <b-col cols="12" md="7" lg="7">
          <b-card style="width: 100%; height: 100%">
            <div style="overflow-x: auto">
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
            </div>
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
                <select
                  v-model="customerInfo.gender"
                  class="slim-input"
                  disabled
                >
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
              <div class="form-pair-row2">
                <div class="main-info">
                  <span class="label">전화번호 : </span>
                  <span class="value">{{ maincallnumber }}</span>
                </div>
                <div class="main-info">
                  <span class="label">현재시간 : </span>
                  <span class="value">{{ currentTime }}</span>
                </div>
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
              <b-button
                variant="success"
                style="padding: 0 5px 0 5px"
                @click="callBackUpdate"
                >콜백저장</b-button
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

    <!--상담내역 모달-->
    <b-modal
      v-model:show="consultationModal"
      @hide="onConsultationModalHide"
      title="상담내역 조회"
      modal-class="consult-list-modal"
      hide-header-close
      hide-backdrop
      no-close-on-backdrop
      size="xl"
    >
      <template #default>
        <div
          style="display: flex; flex-direction: row; width: 100%; height: 35rem"
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
              <p>기준일자 :</p>
              <input
                class="callbackdateinput"
                type="date"
                v-model="consultstartdt"
              />~
              <input
                class="callbackdateinput"
                type="date"
                v-model="consultenddt"
              />
              <p>통화구분</p>
              <select v-model="consultcallStatus">
                <option value="%">전체</option>
                <option value="Y">통화</option>
                <option value="N">미통화</option>
              </select>
              <p>고객구분</p>
              <select v-model="consultcustType">
                <option value="%">전체</option>
                <option value="0">신규고객</option>
                <option value="1">기존고객</option>
                <option value="2">잠재고객</option>
                <option value="9">기타고객</option>
              </select>
              <b-button
                variant="primary"
                style="padding: 0 15px 0 15px"
                @click="consultretrieve"
                >조회</b-button
              >
            </div>
            <div class="callback-list-modal-content">
              <p>방문지점</p>
              <input class="consultinput" v-model="visitBranchCode" readonly />
              <input class="consultinput" v-model="visitBranch" readonly />
              <p>전화번호 :</p>
              <input
                class="callbackdateinput"
                v-model="consultphone"
                type="text"
              />
              <p>고객명 :</p>
              <input class="consultinputname" v-model="consultnm" type="text" />
            </div>
            <hr class="callbackline" />
            <b-table
              class="consult-list-table"
              @row-clicked="consult_retrieve_row"
              :items="consultlistitems"
              :fields="consultlistfields"
              :per-page="consultperPage"
              :current-page="consultcurrentPage"
              bordered
              hover
            ></b-table>
            <b-pagination
              v-model="consultcurrentPage"
              :total-rows="consultRows"
              :per-page="consultperPage"
              aria-controls="my-table"
              style="margin-top: auto"
              class="d-flex justify-content-center"
            />
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
            <strong>상담내역</strong>
            <p class="consultPtext">이름</p>
            <input
              class="consultsideinput"
              type="text"
              :value="consultInfo ? consultInfo.callCustname : ''"
              readonly
            />
            <p class="consultPtext">통화 일자</p>
            <input
              class="consultsideinput"
              type="text"
              :value="consultInfo ? consultInfo.callDate : ''"
              readonly
            />
            <p class="consultPtext">상담내역</p>
            <textarea
              class="consultation-textarea"
              :value="consultInfo ? consultInfo.callRemark : ''"
              readonly
            />
            <p class="consultPtext">최종 as내역</p>
            <textarea
              class="consultation-textarea"
              :value="consultInfo ? consultInfo.asRemark : ''"
              readonly
            />
          </div>
        </div>
      </template>
      <template #footer>
        <b-button variant="secondary" @click="consultationModal = false"
          >닫기</b-button
        >
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
              홍길동
              <!-- {{ crminfo.callCustname ? crminfo.callCustname : "" }} -->
            </p>
            <p class="popuptextbox">
              <strong>일자:</strong>
              20250701
              <!-- {{ crminfo.callDate ? crminfo.callDate : "" }} -->
            </p>
            <div style="display: flex">
              <div class="flexside">
                <p class="popuptextbox">
                  <strong>고객코드:</strong>
                  1111111
                  <!-- {{ crminfo.callCustcode ? crminfo.callCustcode : "" }} -->
                </p>
                <p class="popuptextbox">
                  <strong>통화지점:</strong>
                  영업본사
                  <!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} -->
                </p>
              </div>
            </div>
            <div class="flexside">
              <p class="popuptextbox">
                <strong>전화번호:</strong>
                010-9467-5887
                <!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} -->
              </p>
              <p class="popuptextbox">
                <strong>최종예약내역:</strong>
                AS신청
                <!-- {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }} -->
              </p>
            </div>
            <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
          </div>
        </div>
        <div>
          고객정보 없을 경우
          <div class="crmpopupinfo">
            <p class="popuptextbox">
              <strong>고객 정보 없음</strong>
            </p>
            <p class="popuptextbox">
              <strong>일자:</strong>
              20250701
              <!-- {{ crminfo.callDate ? crminfo.callDate : "" }} -->
            </p>
            <div style="display: flex">
              <div class="flexside">
                <p class="popuptextbox">
                  <strong>통화지점:</strong>
                  영업본사
                  <!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} -->
                </p>
              </div>
            </div>
            <div class="flexside">
              <p class="popuptextbox">
                <strong>전화번호:</strong>
                010-9467-5887
                <!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} -->
              </p>
            </div>
            <strong>CRM 웹페이지로 돌아가서 정보확인 바랍니다.</strong>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
  <template>
  <b-modal
    v-model:show="designModal"
    @hide="onConsultationModalHide"
    title="디자인변경"
    hide-header-close
    hide-backdrop
    no-close-on-backdrop
    size="xl"
  >
    <div class="designmodal">
      <div
        :class="{ selected: selectedDesign === 'BLACK' }"
        @click="selectDesign('BLACK')"
        style="cursor:pointer;"
      >
        <p>디자인 블랙</p>
        <img class="designImg" src="../assets/HIMOCRMBLACK.jpg" alt="디자인A" />
      </div>
      <div
        :class="{ selected: selectedDesign === 'BLUE' }"
        @click="selectDesign('BLUE')"
        style="cursor:pointer;"
      >
        <p>디자인 블루</p>
        <img class="designImg" src="../assets/HIMOCRMBLUE.jpg" alt="디자인B" />
      </div>
    </div>
    <template #footer>
      <b-button
        variant="primary"
        @click="designupdate"
        :disabled="!selectedDesign"
      >
        저장
      </b-button>
      <b-button variant="secondary" @click="designModal = false">
        닫기
      </b-button>
    </template>
  </b-modal>
</template>

</template>
