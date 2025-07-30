<style src="../assets/styles/homeview.css"></style>
<script src="../assets/js/homeView.js"></script>
<template>
  <!-- Header -->
  <header class="header">
    <AppLogo />
    <div class="right-box">
      <!-- TODO: ThemeSwitch 기능 구현 -->
      <ThemeSwitch />
      <b-button
        v-if="user?.user.bizDiv === '1015'"
        class="button-logout"
        @click="adminbuttonModal = true"
        >관리자</b-button
      >
      <b-button class="button-logout" @click="logout">종료</b-button>
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
              <span class="info-label">전화번호</span>
              <span class="info-text">{{ user?.extNo.extNo }}</span>
              <span class="info-label">상담자</span>
              <span
                id="pswdcursor"
                class="info-text"
                @dblclick="passwordChangeModal = true"
                >{{ user?.user.name }}</span
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
              striped
              hover
            >
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
              :per-page="todayperPage"
              striped
              hover
            >
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
                />
              </b-form-group>
              <b-form-group label="핸드폰번호">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callUsephone"
                  readonly
                />
              </b-form-group>
              <b-form-group label="고객코드">
                <b-form-input
                  type="text"
                  v-model="customerInfo.callCustcode"
                  readonly
                />
              </b-form-group>
              <b-form-group label="통화지점">
                <b-form-input
                  type="text"
                  v-model="customerInfo.deptName"
                  readonly
                />
              </b-form-group>

              <b-form-group label="최종AS내역" class="full-width">
                <b-form-textarea
                  v-model="customerInfo.asRemark"
                  rows="2"
                  no-resize
                  :title="customerInfo.asRemark"
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
              <b-form-group label="최종as일자">
                <b-form-input
                  type="text"
                  v-model="customerInfo.asDt"
                  readonly
                />
              </b-form-group>
              <b-form-group label="최종a/s명">
                <b-form-input
                  type="text"
                  v-model="customerInfo.asCodeName"
                  readonly
                />
              </b-form-group>
              <b-form-group
                label="당직자 내선번호"
                v-if="user?.extNo?.locSaupjang === '1000'"
              >
                <b-form-input type="text" v-model="dangzicextno" />
              </b-form-group>
            </div>

            <!-- 당직자 로그 인/아웃 버튼 -->
            <div
              class="logged-in-out-buttons-wrap my-4"
              v-if="user?.extNo?.locSaupjang === '1000'"
            >
              <div class="d-grid button-item">
                <b-button
                  variant="primary"
                  :class="{ active: activeDangzic === 'A' }"
                  @click="dolbtn"
                >
                  <i class="icon-user"></i>
                  당직자로그인
                </b-button>
              </div>
              <div class="d-grid button-item">
                <b-button
                  variant="outline-primary"
                  :class="{ active: activeDangzic === 'N' }"
                  @click="dolobtn"
                >
                  <i class="icon-logout"></i>
                  당직자로그아웃
                </b-button>
              </div>
            </div>
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
              striped
              hover
              small
            ></b-table>
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
                  <b-form-input v-model="callbacknumber" type="text" readonly />
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
              striped
              hover
              small
            >
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
                <b-form-group label="최종 as내역" class="size-small">
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
          <h5>고객정보 있을 경우</h5>

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
              <div class="info-text">
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
              <div class="info-text">
                {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }}
              </div>
            </div>
            <div class="info-group">
              <div class="info-label">최종예약내역</div>
              <div class="info-text">
                {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }}
              </div>
            </div>
          </div>

          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
        <div class="crm-info-content" v-else>
          <h5>고객정보 없을 경우</h5>

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
              <div class="info-text">
                {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }}
              </div>
            </div>
          </div>

          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
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
          <b-form-input
            v-model="currentPassword"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            autocomplete="current-password"
            class="mb-3"
            required
          />
        </b-form-group>
        <b-form-group label="새 비밀번호">
          <b-form-input
            v-model="newPassword"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            autocomplete="current-password"
            class="mb-3"
            required
          />
        </b-form-group>
        <b-form-group label="새 비밀번호 확인">
          <b-form-input
            v-model="confirmPassword"
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            autocomplete="current-password"
            class="mb-3"
            required
          />
        </b-form-group>
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
              <b-form-input
                v-model="newUserPassword"
                type="password"
                placeholder="비밀번호를 입력하세요"
                autocomplete="new-password"
                class="mb-3"
                required
              />
            </b-form-group>
            <b-form-group label="비밀번호 확인">
              <b-form-input
                v-model="newUserConfirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                autocomplete="new-password"
                class="mb-3"
                required
              />
            </b-form-group>
            <div class="d-grid">
              <b-button type="submit" variant="primary">등록</b-button>
            </div>
          </b-form>
        </b-tab>

        <b-tab title="비밀번호 찾기">
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

            <b-form-group label="비밀번호">
              <b-form-input
                v-model="getUserPw"
                type="text"
                placeholder="비밀번호"
                class="mb-3"
                readonly
              />
            </b-form-group>

            <div class="d-grid">
              <b-button type="submit" variant="primary">비밀번호 찾기</b-button>
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
  </main>
</template>
