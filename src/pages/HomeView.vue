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
        class="button-logout"
        @click="logoutshowConfirm = true"
        >종료</b-button
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
              <h3 class="title pt-3 mb-4"><!--{{ user?.extNo.deptNm }}-->영업본사</h3>

              <div class="info-grid">
                <span class="info-label">전화번호</span>
                <span class="info-text"><!--{{ user?.extNo.extNo }}-->010-1111-1111</span>
                <span class="info-label">상담자</span>
                <span class="info-text"><!--{{ user?.user.name }}-->홍길동</span>
              </div>

              <div class="contact-menus my-3">
                <button
                  class="contact-menu-button"
                  @click="callbacklistretrieve">
                  <i class="icon-callback"></i>
                  콜백리스트
                  <span class="count-highlight">{{
                    this.callbackcountnum
                  }}</span>
                </button>
                <button 
                  class="contact-menu-button" 
                  @click="consultmodalOn">
                  <i class="icon-search"></i>
                  상담내역조회
                </button>
              </div>

              <div class="action-menus">
                <button
                  id="mbtn1"
                  class="action-menu-button"
                  :class="{ active: activeMenu === 'mbtn1' }"
                  @click="setCallStatus('mbtn1', '0')">
                  <i class="icon-call"></i>
                  상담대기
                </button>
                <button
                  id="mbtn2"
                  class="action-menu-button"
                  :class="{ active: activeMenu === 'mbtn2' }"
                  @click="setCallStatus('mbtn2', '1')">
                  <i class="icon-counseling"></i>
                  상담중
                </button>
                <button
                  id="mbtn3"
                  class="action-menu-button"
                  :class="{ active: activeMenu === 'mbtn3' }"
                  @click="setCallStatus('mbtn3', '2')">
                  <i class="icon-document"></i>
                  상담 후처리
                </button>
                <button
                  id="mbtn4"
                  class="action-menu-button"
                  :class="{ active: activeMenu === 'mbtn4' }"
                  @click="setCallStatus('mbtn4', '3')">
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
              ></b-table>
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
                striped
                hover
              ></b-table>
            </div>
          </b-card>

          <b-card class="call-card">
            <div class="call-container">
              <!-- 전화걸기 및 받기 -->
              <div class="phone-call-container pt-2">
                <b-form-group
                  label="전화번호"
                  label-for="phone-number"
                >
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
                <b-form-group
                  label="고객명"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callCustname"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="일자"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callDate"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="수신 전화번호"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callInsphone"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="성별"
                >
                  <b-form-select
                    v-model="customerInfo.gender"
                    :options="options"
                    disabled
                  />
                </b-form-group>
                <b-form-group
                  label="사용 전화번호"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callPhoneno"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="핸드폰번호"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callUsephone"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="고객코드"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.callCustcode"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="통화지점"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.deptName"
                    readonly
                  />
                </b-form-group>

                <b-form-group
                  label="비고"
                  class="full-width"
                >
                  <b-form-textarea
                    v-model="customerInfo.asRemark"
                    rows="2"
                    no-resize
                  />
                </b-form-group>

                <b-form-group
                  label="최종예약일자"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.rsrvDt"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="최종예약명"
                >
                  <b-form-input
                    type="text"
                    v-model="customerInfo.lastRsrvName"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="최종as일자"
                >
                  <b-form-input
                    type="text"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="최종a/s명"
                >
                  <b-form-input
                    type="text"
                    readonly
                  />
                </b-form-group>
                <b-form-group
                  label="당직자 내선번호"
                >
                  <b-form-input
                    type="text"
                    v-model="dangzicextno"
                  />
                </b-form-group>
              </div>

              <!-- 당직자 로그 인/아웃 버튼 -->
              <div class="logged-in-out-buttons-wrap my-4">
                <div class="d-grid button-item">
                  <b-button 
                    variant="primary"
                    :class="{ active: activeDangzic === 'A' }"
                    @click="dolbtn">
                    <i class="icon-user"></i>
                    당직자로그인
                  </b-button>
                </div>
                <div class="d-grid button-item">
                  <b-button 
                    variant="outline-primary"
                    :class="{ active: activeDangzic === 'N' }"
                    @click="dolobtn">
                    <i class="icon-logout"></i>
                    당직자로그아웃
                  </b-button>
                </div>
              </div>

              <!-- 전화번호 및 현재시간 -->
              <div class="info-panel mb-3">
                <div class="info-row">
                  <span class="info-label">전화번호</span>
                  <span class="info-value">{{ maincallnumber }}010-1234-5678</span>
                </div>
                <div class="info-row">
                  <span class="info-label">현재시간</span>
                  <span class="info-value">{{ currentTime }}</span>
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

    <!-- 로그아웃 컨펌 모달 -->
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
      size="xl"
    >
      <template #default>
        <b-row class="gap-3 flex-nowrap" no-gutters>
          <b-col>
            <div class="filter-container">
              <div class="item">
                <b-form-group
                  label="조회 기간"
                >
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
                  >조회</b-button>
              </div>
              <!--<div class="callback-list-modal-content">
                <p>전화번호 :</p>
                <input class="callbackdateinput" type="text" />
                <p>요청 전화번호 :</p>
                <input class="callbackdateinput" type="text" />
              </div>-->
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
                <b-form-group
                  label="고객명"
                >
                  <b-form-input
                    v-model="callbackcustname"
                    type="text"
                    readonly
                  />
                </b-form-group>

                <b-form-group
                  label="요청 전화번호"
                >
                  <b-form-input
                    v-model="callbacknumber"
                    type="text"
                    readonly
                  />
                </b-form-group>
              </div>


              <div class="mt-4">
                <div class="d-grid mb-2">
                  <b-button
                    variant="primary"
                    @click="makeCallBack">
                    전화걸기
                  </b-button>
                </div>
                <div class="d-grid">
                  <b-button
                    variant="outline-primary"
                    @click="callBackUpdate">
                    콜백저장
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
                <b-form-group
                  label="기준일자"
                >
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
                <b-button
                  variant="secondary"
                  size="sm"
                  @click="consultretrieve"
                  >조회</b-button>
              </div>
            </div>

            <div class="consultation-info">
              <b-form-group label="방문지점">
                <b-form-input 
                  v-model="visitBranchCode"
                  readonly
                  size="sm" />
                <b-form-input 
                  v-model="visitBranch"
                  readonly
                  size="sm" />
              </b-form-group>
              <b-form-group label="전화번호">
                <b-form-input 
                  v-model="consultphone"
                  readonly
                  size="sm" />
              </b-form-group>
              <b-form-group label="고객명">
                <b-form-input 
                  v-model="consultnm"
                  readonly
                  size="sm" />
              </b-form-group>
            </div>

            <b-table
              @row-clicked="consult_retrieve_row"
              :items="consultlistitems"
              :fields="consultlistfields"
              :per-page="consultperPage"
              :current-page="consultcurrentPage"
              striped
              hover
              small
            ></b-table>
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
                <b-form-group
                  label="상담내역"
                  class="size-small mb-2"
                >
                  <b-form-textarea
                    v-model="consultInfo.callRemark"
                    type="text"
                    size="sm"
                    rows="7"
                    readonly
                    no-resize
                  />
                </b-form-group>
                <b-form-group
                  label="최종 as내역"
                  class="size-small"
                >
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
        <b-button variant="primary" @click="consultationModal = false">닫기</b-button>
      </template>
    </b-modal>

    <!-- v-if="crminfo && crminfo.callPhoneno" 프론트개발이후 모달에 들어갈 조건-->
    <b-modal
      v-model:show="crminfomodal"
      title="CRM 정보"
      @hide="oncrmModalHide"
      class="body-padding-0"
    >
      <div>
        <!-- class v-if="crminfo.callCustcode ? crminfo.callCustcode : false" 프론트개발이후 모달에 들어갈 조건 -->
        <div class="crm-info-content">
          <h5>고객정보 있을 경우</h5>

          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">홍길동<!-- {{ crminfo.callCustname ? crminfo.callCustname : "" }} --></div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">20250701<!-- {{ crminfo.callDate ? crminfo.callDate : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">고객코드</div>
              <div class="info-text">1111111<!-- {{ crminfo.callCustcode ? crminfo.callCustcode : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">영업본사<!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text">010-9467-5887<!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">최종예약내역</div>
              <div class="info-text">AS신청<!-- {{ crminfo.lastRsrvName ? crminfo.lastRsrvName : "" }} --></div>
            </div>
          </div>
          
          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
        <div class="crm-info-content">
          <h5>고객정보 없을 경우</h5>

          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">고객 정보 없음</div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">20250701<!-- {{ crminfo.callDate ? crminfo.callDate : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">영업본사<!-- {{ crminfo.indeptName ? crminfo.indeptName : "" }} --></div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text">010-9467-5887<!-- {{ crminfo.callPhoneno ? crminfo.callPhoneno : "" }} --></div>
            </div>
          </div>
          
          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
      </div>
    </b-modal>
  </main>

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
