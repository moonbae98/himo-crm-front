<template>
  <div>
    <div class v-if="crminfo.callCustcode">
      <div class="crm-popup-container">
        <header class="crm-popup-header">
          <h2 class="popup-title">CRM 정보</h2>
          <button
            @click="closePopup"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></button>
        </header>
        <div v-if="crminfo.blackYN === 'Y'">
          <div class="crm-info-content">
            <h2 style="text-align: center;">❗⭕악성 고객 주의⭕❗</h2>
            <div class="info-grid">
              <div class="info-group full-width">
                <div class="info-label">고객명</div>
                <div class="info-text">{{ crminfo.callCustname }}</div>
              </div>
              <div class="info-group full-width">
                <div class="info-label">일자</div>
                <div class="info-text">{{ formatDateTime(this.callDate) }}</div>
              </div>
              <div class="info-group">
                <div class="info-label">고객코드</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callCustcode }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">통화지점</div>
                <div class="info-text">{{ crminfo.indeptName }}</div>
              </div>
              <div class="info-group">
                <div class="info-label">전화번호</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ formatPhoneNumber(this.hpNo) }}
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
            <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
          </div>
        </div>
        <div v-else>
          <div class="crm-info-content">
            <div class="info-grid">
              <div class="info-group full-width">
                <div class="info-label">고객명</div>
                <div class="info-text">{{ crminfo.callCustname }}</div>
              </div>
              <div class="info-group full-width">
                <div class="info-label">일자</div>
                <div class="info-text">{{ formatDateTime(this.callDate) }}</div>
              </div>
              <div class="info-group">
                <div class="info-label">고객코드</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ crminfo.callCustcode }}
                </div>
              </div>
              <div class="info-group">
                <div class="info-label">통화지점</div>
                <div class="info-text">{{ crminfo.indeptName }}</div>
              </div>
              <div class="info-group">
                <div class="info-label">전화번호</div>
                <div class="info-text" @click="selectDivText($event)">
                  {{ formatPhoneNumber(this.hpNo) }}
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

            <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="crm-popup-container">
        <header class="crm-popup-header">
          <h2 class="popup-title">CRM 정보</h2>
          <button
            @click="closePopup"
            type="button"
            class="btn-close"
            aria-label="Close"
          ></button>
        </header>

        <div class="crm-info-content">
          <div class="info-grid">
            <div class="info-group full-width">
              <div class="info-label">고객명</div>
              <div class="info-text">고객 정보 없음</div>
            </div>
            <div class="info-group full-width">
              <div class="info-label">일자</div>
              <div class="info-text">{{ formatDateTime(this.callDate) }}</div>
            </div>
            <div class="info-group">
              <div class="info-label">통화지점</div>
              <div class="info-text">{{ crminfo.indeptName }}</div>
            </div>
            <div class="info-group">
              <div class="info-label">전화번호</div>
              <div class="info-text" @click="selectDivText($event)">
                {{ formatPhoneNumber(this.hpNo) }}
              </div>
            </div>
          </div>

          <p class="help-text">CRM 웹페이지로 돌아가서 정보확인 바랍니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      hpNo: null,
      crminfo: "",
      callDate: null,
    };
  },
  mounted() {
    const storedHpNo = localStorage.getItem("hpNo");
    if (storedHpNo) {
      this.hpNo = storedHpNo;
      this.callDate = localStorage.getItem("callDate");
      this.fetchCrmInfo();
    }
  },
  methods: {
    fetchCrmInfo() {
      if (this.hpNo) {
        axios
          .post("./crm-popup-info", {
            hpNo: this.hpNo,
            callDate: this.callDate,
          })
          .then((response) => {
            this.crminfo = response.data;
            console.log("CRM 정보 조회 성공:", this.crminfo);
          })
          .catch((error) => {
            console.error("CRM 정보 조회 실패:", error);
          });
      }
    },
    closePopup() {
      if (window.opener) {
        window.close();
      }
    },
    selectDivText(event) {
      const range = document.createRange();
      range.selectNodeContents(event.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },
    // 날짜 포맷팅 함수
    formatDateTime(dateStr) {
      if (!dateStr) return "";

      return `${dateStr.substr(0, 10)} ${dateStr.substr(
        10,
        2
      )}:${dateStr.substr(12, 2)}:${dateStr.substr(14, 2)}`;
    },
    // 전화번호 포맷팅 함수
    formatPhoneNumber(phone) {
      if (!phone) return "";

      // 숫자만 추출
      const digits = phone.replace(/\D/g, "");

      // 02로 시작하는 서울 번호 (9~10자리)
      if (digits.startsWith("02")) {
        if (digits.length === 9) {
          return `${digits.substr(0, 2)}-${digits.substr(2, 3)}-${digits.substr(
            5,
            4
          )}`;
        } else if (digits.length === 10) {
          return `${digits.substr(0, 2)}-${digits.substr(2, 4)}-${digits.substr(
            6,
            4
          )}`;
        }
      }
      // 휴대폰 번호 (11자리)
      else if (digits.length === 11) {
        return `${digits.substr(0, 3)}-${digits.substr(3, 4)}-${digits.substr(
          7,
          4
        )}`;
      }
      // 일반 시외번호 (10자리)
      else if (digits.length === 10) {
        return `${digits.substr(0, 3)}-${digits.substr(3, 3)}-${digits.substr(
          6,
          4
        )}`;
      }
      // 7자리 번호 (국번+번호)
      else if (digits.length === 7) {
        return `${digits.substr(0, 3)}-${digits.substr(3, 4)}`;
      }

      // 포맷 불가능한 경우 원본 반환
      return phone;
    },
  },
};
</script>
