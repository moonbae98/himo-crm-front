<style src="../assets/styles/homeview.css"></style>
<script src="../assets/js/homeView.js"></script>
<template>
  <!-- Header -->
  <header class="header">
    <AppLogo />
    <div class="right-box">
      <!-- TODO: ThemeSwitch 기능 구현 -->
      <ThemeSwitch />
      <!-- <b-button class="button-logout" @click="showCrmInfo('01057893917','')">
        테스트버튼
      </b-button> -->
      <b-button class="button-logout" @click="closeAllPopups">
        팝업전체닫기
      </b-button>
      <b-button class="button-logout" @click="passwordChangeModal = true">
        비밀번호변경
      </b-button>
      <b-button
        v-if="user?.user.bizDiv === '1015'"
        class="button-logout"
        @click="adminbuttonModal = true"
        >관리자</b-button
      >
      <b-button
        v-if="user?.user.bizDiv === '1015' || user?.user.bizDiv === '1003'"
        class="button-logout"
        @click="MessageChkModal = true"
        >문자내역입력</b-button
      >
      <b-button class="button-logout" @click="logoutModal = true"
        >로그아웃</b-button
      >
    </div>
  </header>

  <!-- Contents -->
  <main class="main-container">
    <div class="main-grid-container">
      <div class="main-grid">
        <!-- 상담자 정보 및 기능 -->
        <b-card class="card-highlight">
          <div class="user-info-container">
            <h2 class="title pt-3 mb-4">{{ user?.extNo.deptNm }}</h2>

            <div class="info-grid">
              <span class="info-text"
                ><span>상담자 :</span>{{ user?.user.name }}</span
              >
              <span class="info-text"
                ><span>전화번호 :</span>{{ user?.extNo.extNo }}</span
              >
            </div>

            <div class="contact-menus my-3">
              <button class="contact-menu-button" @click="callbacklistretrieve">
                <i class="icon-callback"></i>
                콜백리스트
                <span
                  class="count-highlight"
                  v-if="this.callbackcountnum > 0"
                  >{{ this.callbackcountnum }}</span
                >
              </button>
              <button class="contact-menu-button" @click="consultmodalOn">
                <i class="icon-search"></i>
                상담내역조회
              </button>
            </div>

            <div class="action-menus">
              <button
                id="mbtn1"
                class="action-menu-button"
                :class="{ active: activeMenu === 'mbtn1' }"
                @click="setCallStatus('mbtn1', '0')"
              >
                <i class="icon-call"></i>
                상담대기
              </button>
              <button
                id="mbtn2"
                class="action-menu-button"
                :class="{ active: activeMenu === 'mbtn2' }"
                @click="setCallStatus('mbtn2', '1')"
              >
                <i class="icon-counseling"></i>
                상담중
              </button>
              <button
                id="mbtn3"
                class="action-menu-button"
                :class="{ active: activeMenu === 'mbtn3' }"
                @click="setCallStatus('mbtn3', '2')"
              >
                <i class="icon-document"></i>
                상담 후처리
              </button>
              <button
                id="mbtn4"
                class="action-menu-button"
                :class="{ active: activeMenu === 'mbtn4' }"
                @click="setCallStatus('mbtn4', '3')"
              >
                <i class="icon-coffee"></i>
                휴식
              </button>
            </div>

            <div class="d-grid mt-4">
              <b-button @click="hangdown" variant="primary">전화종료</b-button>
            </div>

            <div class="contact-menus my-3" v-if="
                user?.extNo?.locSaupjang === '1000' ||
                user?.extNo?.locSaupjang === '1003'
              ">
              <b-button
                variant="outline-primary"
                class="w-50"
                :class="{ active: activeDangzic === 'I' }"
                @click="dolbtn"
              >
                <i class="icon-user"></i>
                당직자로그인
              </b-button>
              <b-button
                variant="outline-primary"
                class="w-50"
                :class="{ active: activeDangzic === 'O' }"
                @click="dolobtn"
              >
                <i class="icon-logout"></i>
                당직자로그아웃
              </b-button>
            </div>
          </div>
        </b-card>

        <!-- 통화내역 테이블 -->
        <b-card class="padding-0">
          <div class="table-scroll-container calls-table-container">
            <b-table
              class="calls-table"
              :items="crmitems"
              :fields="crmitemfields"
              :per-page="perPage"
              :current-page="currentPage"
              @row-clicked="c_info_retrieve_row"
              @row-dblclicked="popupCrmInfo"
              ref="callTable"
              striped
              hover
            >
              <template #cell(callInsphone)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>
              <template #cell(callPhoneno)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>
              <template #cell(deptName)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
              <template #cell(callDate)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
              <template #cell(callCustname)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
              <template #cell(asRemark)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
              <template #cell(callRemark)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
            </b-table>
          </div>

          <div class="page-info">
            현재 페이지: {{ currentPage }} / 전체 통화량: {{ rows }}
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            @input="onPageChange"
            align="center"
          />
        </b-card>
      </div>
      <div class="main-grid">
        <!--당일 통화내역-->
        <b-card class="padding-0">
          <div class="table-scroll-container today-calls-table-container">
            <b-table
              class="today-calls-table"
              :items="todayCallList"
              :fields="calllistfields"
              @row-clicked="c_info_retrieve"
              ref="calltodayTable"
              :per-page="todayperPage"
            >
              <template #cell(callPhoneno)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>

              <template #cell(callCustcode)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>
            </b-table>
          </div>
        </b-card>

        <b-card class="call-card">
          <div class="call-container">
            <!-- 전화걸기 및 받기 -->
            <div class="phone-call-container pt-2">
              <b-form-group label="전화번호" label-for="phone-number">
                <b-form-input
                  id="phone-number"
                  v-model="phoneNumber"
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  required
                />
              </b-form-group>

              <button
                @click="makeCall"
                class="call-button send-call-button"
                type="button"
              >
                <div class="text">전화걸기</div>
              </button>

              <button
                @click="hangupCall"
                class="call-button receive-call-button"
                type="button"
              >
                <div class="text">전화받기</div>
              </button>
            </div>

            <!-- 고객자료 뽑기 -->
            <div class="customer-form-container">
              <b-form-group label="고객명">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callCustname"
                  readonly
                />
              </b-form-group>
              <b-form-group label="일자">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callDate"
                  readonly
                />
              </b-form-group>
              <b-form-group label="수신 전화번호">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callInsphone"
                  readonly
                  class="phone-input"
                  @click="selectInputText($event)"
                />
              </b-form-group>
              <b-form-group label="성별">
                <b-form-select
                  v-model="customerInfo.gender"
                  :options="options"
                  disabled
                />
              </b-form-group>
              <b-form-group label="사용 전화번호">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callPhoneno"
                  readonly
                  class="phone-input"
                  @click="selectInputText($event)"
                />
              </b-form-group>
              <b-form-group label="핸드폰번호">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callUsephone"
                  readonly
                  class="phone-input"
                  @click="selectInputText($event)"
                />
              </b-form-group>
              <b-form-group label="고객코드">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callCustcode"
                  readonly
                  class="phone-input"
                  @click="selectInputText($event)"
                />
              </b-form-group>
              <b-form-group label="통화지점">
                <b-form-input
                  type="text"
                  v-model="customerInfo.deptName"
                  readonly
                />
              </b-form-group>

              <b-form-group label="최종A/S내역" class="full-width">
                <b-form-textarea
                  v-model="customerInfo.asRemark"
                  rows="2"
                  no-resize
                  :title="customerInfo.asRemark"
                  readonly
                />
              </b-form-group>

              <b-form-group label="최종예약일자">
                <b-form-input
                  type="text"
                  v-model="customerInfo.rsrvDt"
                  readonly
                />
              </b-form-group>
              <b-form-group label="최종예약명">
                <b-form-input
                  type="text"
                  v-model="customerInfo.lastRsrvName"
                  readonly
                />
              </b-form-group>
              <b-form-group label="최종A/S일자">
                <b-form-input
                  type="text"
                  v-model="customerInfo.asDt"
                  readonly
                />
              </b-form-group>
              <b-form-group label="최종A/S명">
                <b-form-input
                  type="text"
                  v-model="customerInfo.asCodeName"
                  readonly
                />
              </b-form-group>
              <!-- <b-form-group
                label="당직자 내선번호"
                v-if="user?.extNo?.locSaupjang === '1000'"
              >
                <b-form-input type="text" v-model="dangzicextno" />
              </b-form-group> -->
            </div>

            <!-- 당직자 로그 인/아웃 버튼 -->
            <!-- <div
              class="logged-in-out-buttons-wrap my-4"
              v-if="
                user?.extNo?.locSaupjang === '1000' ||
                user?.extNo?.locSaupjang === '1003'
              "
            >
              <div class="d-grid button-item">
                <b-button
                  variant="outline-primary"
                  :class="{ active: activeDangzic === 'I' }"
                  @click="dolbtn"
                >
                  <i class="icon-user"></i>
                  당직자로그인
                </b-button>
              </div>
              <div class="d-grid button-item">
                <b-button
                  variant="outline-primary"
                  :class="{ active: activeDangzic === 'O' }"
                  @click="dolobtn"
                >
                  <i class="icon-logout"></i>
                  당직자로그아웃
                </b-button>
              </div>
            </div> -->
          </div>
        </b-card>
      </div>
    </div>
    <b-container fluid>
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

    <b-modal
      v-model:show="logoutModal"
      @hide="logoutModalHide"
      title="로그아웃 확인"
      hide-header-close
      hide-backdrop
      class="logout-modal"
    >
      <div class="logout-confirm-content">
        <h4>로그아웃 하시겠습니까 ?</h4>
        <h5>로그아웃 시 자동로그인이 해제 됩니다.</h5>
      </div>
      <template #footer>
        <b-button variant="primary" @click="logout">로그아웃</b-button
        ><b-button variant="primary" @click="logoutModal = false"
          >취소</b-button
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
      size="xl"
    >
      <template #default>
        <b-row class="gap-3 flex-nowrap" no-gutters>
          <b-col>
            <div class="filter-container">
              <div class="item">
                <b-form-group label="조회 기간">
                  <input
                    class="datepicker-input"
                    type="date"
                    v-model="callbackstartdt"
                  />
                  ~
                  <input
                    class="datepicker-input"
                    type="date"
                    v-model="callbackenddt"
                  />
                </b-form-group>
              </div>
              <div class="item">
                <b-button
                  variant="secondary"
                  size="sm"
                  @click="dateinputcallbacklist"
                  >조회</b-button
                >
              </div>
            </div>

            <b-table
              :items="callbacklistitems"
              :fields="callbacklistfields"
              @row-clicked="callbackset"
              ref="callbackTable"
              small
            >
              <template #cell(backPhoneno)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>
              <template #cell(backCallNo)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>
            </b-table>
          </b-col>
          <b-col cols="4">
            <aside class="aside-section call-history-container">
              <h6 class="title">통화내역기록</h6>

              <div class="mb-4">
                <b-form-group
                  label="전화일자"
                  label-cols="3"
                  label-cols-md="4"
                  class="size-small"
                >
                  <b-form-input
                    v-model="callbackdate"
                    type="text"
                    readonly
                    size="sm"
                  />
                </b-form-group>
                <b-form-group
                  label="전화번호"
                  label-cols="3"
                  label-cols-md="4"
                  class="size-small"
                >
                  <b-form-input
                    v-model="callbackinnumber"
                    type="text"
                    readonly
                    size="sm"
                    @click="selectInputText($event)"
                  />
                </b-form-group>
              </div>

              <div class="customer-info">
                <b-form-group label="고객명">
                  <b-form-input
                    v-model="callbackcustname"
                    type="text"
                    readonly
                  />
                </b-form-group>

                <b-form-group label="요청 전화번호">
                  <b-form-input
                    v-model="callbacknumber"
                    type="text"
                    readonly
                    @click="selectInputText($event)"
                  />
                </b-form-group>
              </div>

              <div class="mt-4">
                <div class="d-grid mb-2">
                  <b-button variant="primary" @click="makeCallBack">
                    전화걸기
                  </b-button>
                </div>
                <div class="d-grid">
                  <b-button variant="outline-primary" @click="callBackUpdate">
                    콜백 내역 통화 처리
                  </b-button>
                </div>
              </div>
            </aside>
          </b-col>
        </b-row>
      </template>
      <template #footer>
        <b-button variant="primary" @click="testModal = false">닫기</b-button>
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
        <b-row class="gap-3 flex-nowrap" no-gutters>
          <b-col>
            <div class="filter-container">
              <div class="item">
                <b-form-group label="기준일자">
                  <input
                    class="datepicker-input"
                    type="date"
                    v-model="consultstartdt"
                  />~
                  <input
                    class="datepicker-input"
                    type="date"
                    v-model="consultenddt"
                  />
                </b-form-group>
              </div>
              <div class="item">
                <b-form-group label="통화구분">
                  <b-form-select
                    v-model="consultcallStatus"
                    :options="consultcallStatusOptions"
                    size="sm"
                  />
                </b-form-group>
              </div>
              <div class="item">
                <b-form-group label="고객구분">
                  <b-form-select
                    v-model="consultcustType"
                    :options="consultcustTypeOptions"
                    size="sm"
                  />
                </b-form-group>
              </div>
              <div class="item">
                <b-button variant="secondary" size="sm" @click="consultretrieve"
                  >조회</b-button
                >
              </div>
            </div>

            <div class="consultation-info">
              <b-form-group label="방문지점">
                <b-form-input
                  v-model="visitBranchCode"
                  readonly
                  size="sm"
                  style="font-size: 16px"
                />
                <b-form-input
                  v-model="visitBranch"
                  readonly
                  size="sm"
                  style="font-size: 16px"
                />
              </b-form-group>
              <b-form-group label="전화번호">
                <b-form-input v-model="consultphone" size="sm" />
              </b-form-group>
              <b-form-group label="고객명">
                <b-form-input v-model="consultnm" size="sm" />
              </b-form-group>
            </div>

            <b-table
              @row-clicked="consult_retrieve_row"
              :items="consultlistitems"
              :fields="consultlistfields"
              :per-page="consultperPage"
              :current-page="consultcurrentPage"
              class="consult-table"
              ref="consultTable"
              striped
              hover
              small
            >
              <template #cell(CALL_INSPHONE)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>

              <template #cell(CALL_PHONENO)="data">
                <span
                  class="phone-number"
                  @click.stop="selectPhoneNumber($event)"
                  :title="data.value"
                >
                  {{ data.value }}
                </span>
              </template>

              <template #cell(CALL_REMARK)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
              <template #cell(CALL_CUSTNAME)="data">
                <span class="ellipsis-cell" :title="data.value">{{
                  data.value
                }}</span>
              </template>
            </b-table>
            <b-pagination
              v-model="consultcurrentPage"
              :total-rows="consultRows"
              :per-page="consultperPage"
              aria-controls="my-table"
              style="margin-top: auto"
              class="d-flex justify-content-center"
            />
          </b-col>
          <b-col cols="3">
            <aside class="aside-section consultation-section">
              <h6 class="title">상담내역</h6>

              <div class="mb-3">
                <b-form-group
                  label="이름"
                  label-cols="3"
                  label-cols-md="4"
                  class="size-small"
                >
                  <b-form-input
                    v-model="consultInfo.callCustname"
                    type="text"
                    readonly
                    size="sm"
                  />
                </b-form-group>
                <b-form-group
                  label="통화 일자"
                  label-cols="3"
                  label-cols-md="4"
                  class="size-small"
                >
                  <b-form-input
                    v-model="consultInfo.callDate"
                    type="text"
                    readonly
                    size="sm"
                  />
                </b-form-group>
              </div>
              <div>
                <b-form-group label="상담내역" class="size-small mb-2">
                  <b-form-textarea
                    v-model="consultInfo.callRemark"
                    type="text"
                    size="sm"
                    rows="7"
                    readonly
                    no-resize
                  />
                </b-form-group>
                <b-form-group label="최종 A/S내역" class="size-small">
                  <b-form-textarea
                    v-model="consultInfo.asRemark"
                    type="text"
                    size="sm"
                    rows="7"
                    readonly
                    no-resize
                  />
                </b-form-group>
              </div>
            </aside>
          </b-col>
        </b-row>
      </template>
      <template #footer>
        <b-button variant="primary" @click="consultationModal = false"
          >닫기</b-button
        >
      </template>
    </b-modal>

    <!-- v-if="crminfo && crminfo.callPhoneno" 프론트개발이후 모달에 들어갈 조건-->
    <b-modal
      v-model:show="crminfomodal"
      v-if="crminfo && crminfo.callPhoneno"
      title="CRM 정보"
      @hide="oncrmModalHide"
      class="body-padding-0"
    >
      <div>
        <!-- class v-if="crminfo.callCustcode ? crminfo.callCustcode : false" 프론트개발이후 모달에 들어갈 조건 -->
        <div
          class="crm-info-content"
          v-if="crminfo.callCustcode ? crminfo.callCustcode : false"
        >
          <div v-if="crminfo.blackYN === 'Y'">
            <h2 style="text-align: center">❗⭕악성 고객 주의⭕❗</h2>
            <div class="info-grid">
              <div class="info-group full-width">
                <div class="info-label">고객명</div>
                <div class="info-text">
                  {{ crminfo.callCustname ? crminfo.callCustname : "" }}
                </div>
              </div>
              <div class="info-group full-width">
                <div class="info-label">일자</div>
                <div class="info-text">
                  {{ crminfo.callDate ? crminfo.callDate : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">고객코드</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callCustcode ? crminfo.callCustcode : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">통화지점</div>
                <div class="info-text">
                  {{ crminfo.indeptName ? crminfo.indeptName : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">전화번호</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">문자수신</div>
                <div class="info-text">
                  {{ crminfo.mastSmsYn ? crminfo.mastSmsYn : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종예약일자</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.rsrvDt ? crminfo.rsrvDt : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종예약내역</div>
                <div class="info-text">
                  {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종A/S일자</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callPhoneno ? crminfo.asDt : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종A/S내역</div>
                <div class="info-text">
                  {{ crminfo.asCodeName ? crminfo.asCodeName : "" }}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="info-grid">
              <div class="info-group full-width">
                <div class="info-label">고객명</div>
                <div class="info-text">
                  {{ crminfo.callCustname ? crminfo.callCustname : "" }}
                </div>
              </div>
              <div class="info-group full-width">
                <div class="info-label">일자</div>
                <div class="info-text">
                  {{ crminfo.callDate ? crminfo.callDate : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">고객코드</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callCustcode ? crminfo.callCustcode : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">통화지점</div>
                <div class="info-text">
                  {{ crminfo.indeptName ? crminfo.indeptName : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">전화번호</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">문자수신</div>
                <div class="info-text">
                  {{ crminfo.mastSmsYn ? crminfo.mastSmsYn : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종예약일자</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.rsrvDt ? crminfo.rsrvDt : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종예약내역</div>
                <div class="info-text">
                  {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종A/S일자</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callPhoneno ? crminfo.asDt : "" }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">최종A/S내역</div>
                <div class="info-text">
                  {{ crminfo.asCodeName ? crminfo.asCodeName : "" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="crm-info-content" v-else>
          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">고객 정보 없음</div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">
                {{ crminfo.callDate ? crminfo.callDate : "" }}
              </div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">
                {{ crminfo.indeptName ? crminfo.indeptName : "" }}
              </div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text" @click="selectDivText($event)">
                {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      v-model:show="passwordChangeModal"
      @hide="passwordChangeModalHide"
      title="비밀번호 변경"
      size="md"
      class="crm-password-change"
    >
      <b-form @submit.prevent="changePassword">
        <b-form-group>
          <b-form-input
            type="text"
            readonly
            class="mb-3"
            autocomplete="username"
            hidden
          />
        </b-form-group>
        <b-form-group label="현재 비밀번호">
          <div class="password-input-wrapper">
            <b-form-input
              v-model="currentPassword"
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
              autocomplete="current-password"
              class="mb-3"
              required
              @keydown="checkCapsLock($event, 'current')"
              @keyup="checkCapsLock($event, 'current')"
              @focus="checkCapsLock($event, 'current')"
              @blur="hideCapsLockWarning('current')"
            />

            <div v-if="capsLockOn.current" class="caps-lock-warning">
              <i class="bi bi-exclamation-triangle-fill"></i>
              Caps Lock이 켜져 있습니다
            </div>
          </div>
        </b-form-group>

        <b-form-group label="새 비밀번호">
          <div class="password-input-wrapper">
            <b-form-input
              v-model="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              autocomplete="new-password"
              class="mb-3"
              required
              @keydown="checkCapsLock($event, 'new')"
              @keyup="checkCapsLock($event, 'new')"
              @focus="checkCapsLock($event, 'new')"
              @blur="hideCapsLockWarning('new')"
            />

            <div v-if="capsLockOn.new" class="caps-lock-warning">
              <i class="bi bi-exclamation-triangle-fill"></i>
              Caps Lock이 켜져 있습니다
            </div>
          </div>
        </b-form-group>

        <b-form-group label="새 비밀번호 확인">
          <div class="password-input-wrapper">
            <b-form-input
              v-model="confirmPassword"
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              autocomplete="new-password"
              class="mb-3"
              required
              @keydown="checkCapsLock($event, 'confirm')"
              @keyup="checkCapsLock($event, 'confirm')"
              @focus="checkCapsLock($event, 'confirm')"
              @blur="hideCapsLockWarning('confirm')"
            />

            <div v-if="capsLockOn.confirm" class="caps-lock-warning">
              <i class="bi bi-exclamation-triangle-fill"></i>
              Caps Lock이 켜져 있습니다
            </div>
          </div>
        </b-form-group>

        <hr />
        <strong style="color: brown"
          >※비밀번호는 4~12자리로 입력 바랍니다.</strong
        >
        <hr />
        <div class="d-grid">
          <b-button type="submit" variant="primary">변경</b-button>
        </div>
      </b-form>
      <template #footer>
        <b-button @click="passwordChangeModalHide" variant="primary"
          >취소</b-button
        >
      </template>
    </b-modal>

    <b-modal
      v-model:show="adminbuttonModal"
      @hide="adminbuttonModalHide"
      title="계정 관리"
      size="md"
      class="crm-password-change"
    >
      <b-tabs pills card vertical active-nav-item-class="fw-bold">
        <b-tab title="계정 만들기" active>
          <b-form @submit.prevent="insertUser">
            <b-form-group label="이름">
              <b-form-input
                v-model="newUserName"
                type="text"
                placeholder="이름을 입력하세요"
                class="mb-3"
                required
              />
            </b-form-group>
            <b-form-group label="사번">
              <b-form-input
                v-model="newUserNo"
                type="text"
                placeholder="사번을 입력하세요"
                autocomplete="username"
                class="mb-3"
                required
              />
            </b-form-group>
            <b-form-group label="아이디">
              <b-form-input
                v-model="newUserId"
                type="text"
                placeholder="아이디를 입력하세요"
                autocomplete="username"
                class="mb-3"
                required
              />
            </b-form-group>
            <b-form-group label="비밀번호">
              <div class="password-input-wrapper">
                <b-form-input
                  v-model="newUserPassword"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  autocomplete="new-password"
                  class="mb-3"
                  required
                  @keydown="checkCapsLock($event, 'input')"
                  @keyup="checkCapsLock($event, 'input')"
                  @focus="checkCapsLock($event, 'input')"
                  @blur="hideCapsLockWarning('input')"
                />
                <div v-if="capsLockOn.input" class="caps-lock-warning">
                  <i class="bi bi-exclamation-triangle-fill"></i>
                  Caps Lock이 켜져 있습니다
                </div>
              </div>
            </b-form-group>
            <b-form-group label="비밀번호 확인">
              <div class="password-input-wrapper">
                <b-form-input
                  v-model="newUserConfirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  autocomplete="new-password"
                  class="mb-3"
                  required
                  @keydown="checkCapsLock($event, 'input2')"
                  @keyup="checkCapsLock($event, 'input2')"
                  @focus="checkCapsLock($event, 'input2')"
                  @blur="hideCapsLockWarning('input2')"
                />
                <div v-if="capsLockOn.input2" class="caps-lock-warning">
                  <i class="bi bi-exclamation-triangle-fill"></i>
                  Caps Lock이 켜져 있습니다
                </div>
              </div>
            </b-form-group>
            <div class="d-grid">
              <b-button type="submit" variant="primary">등록</b-button>
            </div>
          </b-form>
        </b-tab>

        <b-tab title="비밀번호 초기화">
          <b-form @submit.prevent="findPassword">
            <b-form-group label="아이디">
              <b-form-input
                v-model="findUserId"
                type="text"
                placeholder="아이디를 입력하세요"
                autocomplete="username"
                class="mb-3"
                required
              />
            </b-form-group>

            <b-form-group label="사번">
              <b-form-input
                v-model="findUserNo"
                type="text"
                placeholder="사번을 입력하세요"
                class="mb-3"
                required
              />
            </b-form-group>
            <div class="d-grid">
              <b-button type="submit" variant="primary"
                >비밀번호 초기화</b-button
              >
            </div>
          </b-form>
        </b-tab>
      </b-tabs>
      <template #footer>
        <b-button @click="adminbuttonModalHide" variant="primary"
          >취소</b-button
        >
      </template>
    </b-modal>

    <b-modal
      v-model:show="MessageChkModal"
      @hide="MessageChkModalHide"
      title="문자내역등록"
      size="md"
      class="crm-password-change"
    >
      <div class="p-2">
        <textarea
          v-model="messageContent"
          rows="10"
          class="form-control mb-3"
          placeholder=""
          readonly
        />
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <input
            ref="excelInput"
            type="file"
            @change="onFileChange"
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          />
          <select v-model="MessageLabel" @change="onLabelChange" class="ml-2">
            <option value="">문구 선택</option>
            <option value="A">마일리지 소멸</option>
          </select>
        </div>
      </div>

      <template #footer>
        <b-button @click="MessageChkModalHide" variant="secondary"
          >취소</b-button
        >
        <b-button
          :disabled="!selectedFile || uploading"
          @click="uploadExcel"
          variant="primary"
        >
          {{ uploading ? "업로드 중..." : "업로드" }}
        </b-button>
      </template>
    </b-modal>

    <b-modal
      v-model:show="firstChkModal"
      @hide="firstChkModalHide"
      size="md"
      no-close-on-backdrop
      no-close-on-esc
    >
      <template #header>
        <h5 class="modal-title">첫 로그인 설정</h5>
      </template>
      <div class="d-flex justify-content-center">
        <a
          href="/himo-crm/resources/vue/downloads/allow_popups.bat"
          download
          class="btn btn-outline-secondary btn-md"
          title="설치파일 다운로드"
          @click="firstChkModalHide"
        >
          팝업 자동 설정 파일 다운로드
        </a>
      </div>
      <template #footer>
        <p></p>
      </template>
    </b-modal>
  </main>
</template>
