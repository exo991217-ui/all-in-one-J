// ===== TRAVEL PLANNER MODULE =====
// 여행 플래너: 내 여행 + 버킷플레이스

// ===== TRAVEL STATE DEFAULTS =====
function initTravelState() {
  if (S === null) return;
  if (!S.travels) S.travels = { trips: [], bucketList: [] };
  if (!S.travels.trips) S.travels.trips = [];
  if (!S.travels.bucketList) S.travels.bucketList = [];
}

// ===== TRAVEL HELPERS =====
let _travelFilter = '전체';
let _travelView = null; // null = list, tripId = detail
let _travelDetailTab = 'schedule-list'; // 'schedule-list' | 'schedule-timetable' | 'schedule-summary'
let _bucketFilter = '전체';

const TRIP_TYPE_ICONS = { domestic: '🏔', foreign: '✈️' };

// ── 기본 분류 (localStorage에 저장 가능) ───────────────────────
const _DEFAULT_CATS = {
  schedule: ['관광', '식사', '카페', '쇼핑', '체험', '숙소', '교통', '기타'],
  expense:  ['항공', '숙소', '식비', '교통', '쇼핑', '관광', '기타'],
  bucket:   ['풍경', '맛집', '카페', '체험', '기념품', '기타'],
};

function getCategories(type) {
  try {
    const stored = localStorage.getItem('travel_cats_' + type);
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  return (_DEFAULT_CATS[type] || []).slice();
}

function saveCategories(type, cats) {
  localStorage.setItem('travel_cats_' + type, JSON.stringify(cats));
}

// 호환성 유지 (기존 코드에서 사용하는 상수명)
// 아래는 동적으로 읽히므로 직접 참조 대신 getCategories() 사용
const SCHEDULE_CATEGORIES = _DEFAULT_CATS.schedule;
const EXPENSE_CATEGORIES  = _DEFAULT_CATS.expense;
const WISH_CATEGORIES     = _DEFAULT_CATS.bucket;
const BUCKET_TYPES        = _DEFAULT_CATS.bucket;

// ── 환율 기본값 (외화 자동계산용) ─────────────────────────────
const DEFAULT_RATES = {
  JPY: 9.2, EUR: 1500, USD: 1380, AUD: 900,
  GBP: 1750, CAD: 1010, HKD: 177, SGD: 1030,
  CNY: 190, THB: 40, VND: 0.055, TWD: 43,
  MYR: 310, PHP: 24, IDR: 0.088, NZD: 840,
};

function genTravelId() { return 'tr_' + Date.now() + '_' + Math.floor(Math.random() * 9999); }

function getTripById(id) {
  return (S.travels.trips || []).find(t => t.id === id);
}

function getTripTotalExpense(trip) {
  return (trip.expenses || []).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
}

function formatTravelDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatTravelDateRange(start, end) {
  if (!start) return '';
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const sy = s.getFullYear(), sm = s.getMonth() + 1, sd = s.getDate();
  if (!e) return `${sy}년 ${sm}/${sd}`;
  const ey = e.getFullYear(), em = e.getMonth() + 1, ed = e.getDate();
  if (sy === ey) return `${sm}/${sd} ~ ${em}/${ed}`;
  return `${sy}.${sm}/${sd} ~ ${ey}.${em}/${ed}`;
}

function getTripStatusLabel(trip) {
  const today = new Date(); today.setHours(0,0,0,0);
  if (!trip.startDate) return '';
  const start = new Date(trip.startDate); start.setHours(0,0,0,0);
  const end = trip.endDate ? new Date(trip.endDate) : start;
  end.setHours(0,0,0,0);
  if (today > end) return 'done';
  if (today >= start && today <= end) return 'ongoing';
  return 'upcoming';
}

// ── 국기 이모지 + 배경색 ──────────────────────────────────────
const _COUNTRY_FLAG_MAP = {
  '한국':'🇰🇷','일본':'🇯🇵','호주':'🇦🇺','프랑스':'🇫🇷','미국':'🇺🇸',
  '영국':'🇬🇧','이탈리아':'🇮🇹','스페인':'🇪🇸','독일':'🇩🇪','태국':'🇹🇭',
  '베트남':'🇻🇳','싱가포르':'🇸🇬','홍콩':'🇭🇰','대만':'🇹🇼','중국':'🇨🇳',
  '캐나다':'🇨🇦','뉴질랜드':'🇳🇿','인도네시아':'🇮🇩','필리핀':'🇵🇭',
  '말레이시아':'🇲🇾','인도':'🇮🇳','터키':'🇹🇷','포르투갈':'🇵🇹',
  '네덜란드':'🇳🇱','스위스':'🇨🇭','오스트리아':'🇦🇹','체코':'🇨🇿',
  '그리스':'🇬🇷','크로아티아':'🇭🇷','폴란드':'🇵🇱','헝가리':'🇭🇺',
  '멕시코':'🇲🇽','페루':'🇵🇪','브라질':'🇧🇷','아르헨티나':'🇦🇷',
  '모로코':'🇲🇦','이집트':'🇪🇬','남아공':'🇿🇦','케냐':'🇰🇪',
};

function getCountryFlag(trip) {
  if (trip.type === 'domestic') return '🇰🇷';
  const r = trip.regions || '';
  for (const [name, flag] of Object.entries(_COUNTRY_FLAG_MAP)) {
    if (r.includes(name)) return flag;
  }
  return '✈️';
}

function getCountryCode(trip) {
  if (trip.type === 'domestic') return 'KR';
  const map = {
    '일본': 'JP', '호주': 'AU', '프랑스': 'FR', '미국': 'US', '영국': 'GB',
    '이탈리아': 'IT', '스페인': 'ES', '독일': 'DE', '태국': 'TH', '베트남': 'VN',
    '싱가포르': 'SG', '홍콩': 'HK', '대만': 'TW', '중국': 'CN', '캐나다': 'CA',
    '뉴질랜드': 'NZ', '인도네시아': 'ID', '필리핀': 'PH', '말레이시아': 'MY',
  };
  const r = trip.regions || '';
  for (const [name, code] of Object.entries(map)) {
    if (r.includes(name)) return code;
  }
  return trip.type === 'foreign' ? 'IN' : 'KR';
}

function getTripFlagBg(trip) {
  const cc = getCountryCode(trip);
  const colors = {
    KR: ['#CD2E3A','#003478'], JP: ['#BC002D','#fff'],
    AU: ['#00008B','#C60C30'], FR: ['#0055A4','#EF4135'],
    US: ['#B22234','#3C3B6E'], GB: ['#012169','#C8102E'],
    IT: ['#009246','#CE2B37'], ES: ['#c60b1e','#ffc400'],
    DE: ['#000','#D00'], TH: ['#A51931','#2D2A4A'],
    VN: ['#DA251D','#FFCD00'], SG: ['#EF3340','#fff'],
    HK: ['#DE2910','#fff'], TW: ['#FE0000','#000095'],
    CN: ['#DE2910','#FFDE00'], CA: ['#FF0000','#fff'],
    NZ: ['#00247D','#CC142B'], IN: ['#FF9933','#138808'],
  };
  const c = colors[cc] || ['#74B9FF','#A29BFE'];
  return c[0];
}

function getInitials(name) {
  if (!name) return '??';
  const words = name.replace(/[^가-힣A-Za-z0-9 ]/g, '').split(' ');
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ===== RENDER: 내 여행 탭 =====
function renderTravelMy() {
  const el = document.getElementById('travel-my-content');
  if (!el) return;
  if (S === null) {
    el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-sub);font-size:14px;">⏳ 데이터 불러오는 중...</div>';
    return;
  }
  initTravelState();

  if (_travelView) {
    renderTravelDetail(el, _travelView);
    return;
  }

  const trips = S.travels.trips || [];
  const filter = _travelFilter;

  // 필터링
  let filtered = trips;
  if (filter === '해외여행') filtered = trips.filter(t => t.type === 'foreign');
  else if (filter === '국내여행') filtered = trips.filter(t => t.type === 'domestic');
  else if (filter === '완료') filtered = trips.filter(t => getTripStatusLabel(t) === 'done');
  else if (filter === '준비물과팁') {
    el.innerHTML = renderTipsHTML();
    return;
  }

  // 연도별 그룹
  const groups = {};
  filtered.forEach(t => {
    const y = t.startDate ? new Date(t.startDate).getFullYear() : '미정';
    if (!groups[y]) groups[y] = [];
    groups[y].push(t);
  });
  const sortedYears = Object.keys(groups).sort((a, b) => b - a);

  // 계획된 여행 일정 (우측 사이드바용)
  const upcomingTrips = trips
    .filter(t => t.startDate && getTripStatusLabel(t) !== 'done')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 6);

  el.innerHTML = `
    <div class="tp-layout">
      <div class="tp-main">
        <div class="page-header">
          <div>
            <h1 class="page-title">내 여행 🗺️</h1>
            <p class="page-sub">나만의 여행 기록을 관리해요</p>
          </div>
          <button class="add-btn primary" onclick="TravelApp.openNewTripModal()">+ 새 여행</button>
        </div>

        <!-- 필터 바 -->
        <div class="tp-filter-bar">
          ${['준비물과팁','전체','해외여행','국내여행','완료'].map(f => `
            <button class="tp-filter-chip ${_travelFilter === f ? 'active' : ''}" onclick="TravelApp.setTravelFilter('${f}')">
              ${f === '준비물과팁' ? '🎒 ' : f === '전체' ? '' : f === '해외여행' ? '🌏 ' : f === '국내여행' ? '🏔 ' : '✅ '}${f}
            </button>
          `).join('')}
        </div>

        <!-- 여행 카드 그리드 -->
        ${sortedYears.length === 0 ? `
          <div class="tp-empty">
            <div style="font-size:48px;margin-bottom:12px;">✈️</div>
            <div style="font-size:16px;font-weight:700;color:var(--text-main);margin-bottom:8px;">아직 여행 기록이 없어요</div>
            <div style="font-size:13px;color:var(--text-sub);">[+ 새 여행] 버튼으로 첫 여행을 추가해보세요!</div>
          </div>
        ` : sortedYears.map(year => `
          <div class="tp-year-group">
            <div class="tp-year-label">📅 ${year}</div>
            <div class="tp-card-grid">
              ${groups[year].map(t => renderTripCard(t)).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 우측: 계획된 여행 일정 -->
      <div class="tp-sidebar">
        <div class="tp-sidebar-header">
          <span>📋 계획된 여행 일정</span>
          <button class="add-btn" style="font-size:11px;padding:4px 10px;" onclick="TravelApp.openNewTripModal()">+ 추가</button>
        </div>
        ${upcomingTrips.length === 0 ? `<div style="color:var(--text-sub);font-size:13px;padding:16px 0;text-align:center;">계획된 여행이 없어요</div>` :
          upcomingTrips.map(t => {
            const status = getTripStatusLabel(t);
            return `
              <div class="tp-upcoming-item" onclick="TravelApp.openTrip('${t.id}')">
                <div class="tp-upcoming-main">
                  <div class="tp-upcoming-name">${t.name}</div>
                  <div class="tp-upcoming-date">${t.companions ? `👥 ${t.companions}` : ''}</div>
                </div>
                <div class="tp-upcoming-right">
                  <div class="tp-upcoming-datestr">${formatTravelDateRange(t.startDate, t.endDate)}</div>
                  ${status === 'ongoing'
                    ? `<span class="tp-badge green">진행중 ✓</span>`
                    : `<span style="font-size:12px;color:var(--orange);font-weight:700;">🔥 ${getTripTotalExpense(t).toLocaleString('ko-KR')}원 ▼</span>`
                  }
                </div>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>
  `;
}

function renderTripCard(t) {
  const status = getTripStatusLabel(t);
  const expense = getTripTotalExpense(t);
  const bgColor = getTripFlagBg(t);
  const statusBadge = status === 'done' ? '<span class="tp-status-badge done">완료 ✓</span>' :
    status === 'ongoing' ? '<span class="tp-status-badge ongoing">여행중 ✈️</span>' : '';

  return `
    <div class="tp-card ${status === 'done' ? 'done' : ''}" onclick="TravelApp.openTrip('${t.id}')">
      <div class="tp-card-inner">
        <div class="tp-card-flag" style="background:${bgColor};">
          <span class="tp-flag-code">${getInitials(t.name)}</span>
          ${statusBadge}
        </div>
        <div class="tp-card-body">
          <div class="tp-card-top">
            <div class="tp-card-name">${t.name}</div>
            <div class="tp-card-expense">${expense > 0 ? expense.toLocaleString('ko-KR') + '원' : '0원'}</div>
          </div>
          <div class="tp-card-meta">
            <span>${formatTravelDateRange(t.startDate, t.endDate) || '일정 미정'}</span>
            ${t.regions ? `<span class="tp-dot">·</span><span>${t.regions}</span>` : ''}
            ${t.companions ? `<span class="tp-dot">·</span><span>${t.companions}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTipsHTML() {
  return `
    <div class="page-header">
      <div><h1 class="page-title">준비물과 팁 🎒</h1><p class="page-sub">여행 전 꼭 챙겨야 할 것들</p></div>
    </div>
    <div class="tp-filter-bar">
      ${['준비물과팁','전체','해외여행','국내여행','완료'].map(f => `
        <button class="tp-filter-chip ${_travelFilter === f ? 'active' : ''}" onclick="TravelApp.setTravelFilter('${f}')">
          ${f === '준비물과팁' ? '🎒 ' : f === '전체' ? '' : f === '해외여행' ? '🌏 ' : f === '국내여행' ? '🏔 ' : '✅ '}${f}
        </button>
      `).join('')}
    </div>
    <div class="tp-tips-grid">
      <div class="tp-tips-card">
        <div class="tp-tips-title">📋 해외여행 필수 서류</div>
        <ul class="tp-tips-list">
          <li>여권 (유효기간 6개월 이상 확인)</li>
          <li>비자 (국가별 확인)</li>
          <li>항공권 출력본 또는 모바일</li>
          <li>여행자 보험 증권</li>
          <li>숙소 예약 확인서</li>
          <li>국제운전면허증 (필요시)</li>
          <li>외화 환전 또는 트래블월렛</li>
        </ul>
      </div>
      <div class="tp-tips-card">
        <div class="tp-tips-title">🧳 짐 체크리스트</div>
        <ul class="tp-tips-list">
          <li>옷 (여행 일수 + 1일치)</li>
          <li>속옷 및 양말</li>
          <li>세면도구 (샴푸, 칫솔, 치약)</li>
          <li>충전기 및 보조배터리</li>
          <li>상비약 (소화제, 진통제, 밴드)</li>
          <li>선크림 및 기초화장품</li>
          <li>카메라 / 스마트폰</li>
          <li>우산 또는 우비</li>
        </ul>
      </div>
      <div class="tp-tips-card">
        <div class="tp-tips-title">💡 여행 꿀팁</div>
        <ul class="tp-tips-list">
          <li>📱 오프라인 지도 미리 다운로드 (Google Maps)</li>
          <li>💳 해외 수수료 없는 카드 준비</li>
          <li>🔌 나라별 콘센트 어댑터 확인</li>
          <li>📞 유심 또는 포켓와이파이 예약</li>
          <li>🏥 현지 비상연락처 메모</li>
          <li>📸 귀중품 사진 찍어두기 (여권 등)</li>
          <li>💰 현금 소액 준비 (택시, 시장용)</li>
        </ul>
      </div>
      <div class="tp-tips-card">
        <div class="tp-tips-title">🚗 국내여행 체크리스트</div>
        <ul class="tp-tips-list">
          <li>신분증</li>
          <li>숙소 예약 확인서</li>
          <li>대중교통 앱 확인 (KTX, 버스)</li>
          <li>현지 맛집 사전 예약</li>
          <li>날씨 확인 및 우비 준비</li>
          <li>주차 정보 확인 (자가용 시)</li>
          <li>여행지 운영시간 사전 확인</li>
        </ul>
      </div>
    </div>
  `;
}

// ===== RENDER: 여행 상세 =====
function renderTravelDetail(el, tripId) {
  const trip = getTripById(tripId);
  if (!trip) { _travelView = null; renderTravelMy(); return; }

  const expense = getTripTotalExpense(trip);

  el.innerHTML = `
    <div class="tp-detail">
      <!-- 뒤로가기 -->
      <div class="tp-back" onclick="TravelApp.backToList()">← 목록으로</div>

      <!-- 헤더 카드 -->
      <div class="tp-detail-header card">
        <div class="tp-detail-title-row">
          <h2 class="tp-detail-title" title="클릭해서 수정" onclick="TravelApp.openEditTripModal('${trip.id}')" style="cursor:pointer;">${trip.name} <span style="font-size:13px;color:var(--text-sub);font-weight:400;">클릭해서 수정</span></h2>
          <div style="display:flex;gap:8px;">
            <button class="icon-btn tp-edit-btn" onclick="TravelApp.openEditTripModal('${trip.id}')" title="수정">✏️</button>
            <button class="icon-btn tp-del-btn" onclick="TravelApp.deleteTrip('${trip.id}')" title="삭제">🗑️</button>
          </div>
        </div>
        <div class="tp-info-row">
          <div class="tp-info-box">
            <div class="tp-info-label">📅 시작일</div>
            <input type="date" class="tp-info-input" value="${trip.startDate||''}" onchange="TravelApp.updateTripField('${trip.id}','startDate',this.value)"/>
          </div>
          <div class="tp-info-box">
            <div class="tp-info-label">📅 종료일</div>
            <input type="date" class="tp-info-input" value="${trip.endDate||''}" onchange="TravelApp.updateTripField('${trip.id}','endDate',this.value)"/>
          </div>
          <div class="tp-info-box">
            <div class="tp-info-label">👥 동행자</div>
            <input type="text" class="tp-info-input" value="${trip.companions||''}" placeholder="혼자, 친구, 가족..." onchange="TravelApp.updateTripField('${trip.id}','companions',this.value)"/>
          </div>
          <div class="tp-info-box">
            <div class="tp-info-label">📍 여행지</div>
            <input type="text" class="tp-info-input" value="${trip.regions||''}" placeholder="도시, 국가" onchange="TravelApp.updateTripField('${trip.id}','regions',this.value)"/>
          </div>
          <div class="tp-info-box" style="background:var(--orange-light);border-color:var(--orange);">
            <div class="tp-info-label" style="color:var(--orange);">🔥 총 경비</div>
            <div style="font-size:18px;font-weight:800;color:var(--orange);">${expense.toLocaleString('ko-KR')}원</div>
          </div>
        </div>
        ${trip.type === 'foreign' ? `
          <div class="tp-currency-row">
            <span style="font-size:13px;color:var(--text-sub);">🔄 환율</span>
            <select class="tp-currency-sel" onchange="TravelApp.updateTripField('${trip.id}','currency',this.value)">
              ${['USD','JPY','EUR','AUD','GBP','CAD','HKD','SGD','THB','VND','CNY','TWD','MYR','PHP','NZD'].map(c =>
                `<option value="${c}" ${trip.currency===c?'selected':''}>${c}</option>`
              ).join('')}
            </select>
            <span style="font-size:13px;color:var(--text-sub);">1${trip.currency||'USD'} = </span>
            <input type="number" class="tp-exrate-input" value="${trip.exchangeRate||0}" onchange="TravelApp.updateTripField('${trip.id}','exchangeRate',parseFloat(this.value)||0)"/>
            <span style="font-size:13px;color:var(--text-sub);">원</span>
          </div>
        ` : ''}
      </div>

      <!-- 예약 목록 -->
      <div class="tp-section card">
        <div class="tp-section-title">🎫 예약 목록</div>
        <div class="tp-booking-grid">
          ${renderBookingSection(trip, 'flights', '✈️ 항공')}
          ${renderBookingSection(trip, 'hotels', '🏨 숙소')}
          ${renderBookingSection(trip, 'others', '📝 기타')}
        </div>
      </div>

      <!-- 여행 일정 -->
      <div class="tp-section card">
        <div class="tp-schedule-header">
          <div class="tp-section-title" style="margin-bottom:0;">📅 여행 일정</div>
          <div class="tp-tab-btns">
            <button class="tp-tab-btn ${_travelDetailTab==='schedule-list'?'active':''}" onclick="TravelApp.setDetailTab('schedule-list','${trip.id}')">목록</button>
            <button class="tp-tab-btn ${_travelDetailTab==='schedule-timetable'?'active':''}" onclick="TravelApp.setDetailTab('schedule-timetable','${trip.id}')">시간표</button>
            <button class="tp-tab-btn summary" onclick="TravelApp.downloadSummary('${trip.id}')">🗒️ 여행 요약</button>
          </div>
        </div>
        ${_travelDetailTab === 'schedule-list' ? renderScheduleList(trip) : renderScheduleTimetable(trip)}
      </div>

      <!-- 지출 내역 -->
      <div class="tp-section card">
        <div class="tp-section-header">
          <div class="tp-section-title" style="margin-bottom:0;">💸 지출 내역</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:14px;font-weight:800;color:var(--orange);">합계 ${expense.toLocaleString('ko-KR')}원</span>
            ${trip.type==='foreign'&&trip.exchangeRate ? `<span style="font-size:12px;color:var(--text-sub);">1${trip.currency||'USD'} = ${trip.exchangeRate}원</span>` : ''}
          </div>
        </div>
        ${renderExpenseList(trip)}
      </div>

      <!-- 가고싶은곳 -->
      <div class="tp-section card">
        <div class="tp-section-header">
          <div class="tp-section-title" style="margin-bottom:0;">⭐ 가고싶은 곳</div>
          <div style="display:flex;align-items:center;gap:8px;">
            <input type="text" id="wish-region-filter" class="tp-filter-input" placeholder="지역 필터 (예: 시드니)" value="" oninput="TravelApp.filterWishPlaces('${trip.id}',this.value)"/>
            <button class="add-btn" onclick="TravelApp.openAddWishModal('${trip.id}')">+ 추가</button>
          </div>
        </div>
        ${renderWishPlaces(trip, '')}
      </div>
    </div>
  `;
}

function renderBookingSection(trip, type, label) {
  const items = (trip.bookings && trip.bookings[type]) || [];
  return `
    <div class="tp-booking-col">
      <div class="tp-booking-header">
        <span>${label}</span>
        <button class="tp-add-small" onclick="TravelApp.openAddBookingModal('${trip.id}','${type}')">+</button>
      </div>
      ${items.length === 0
        ? `<div class="tp-booking-empty">${label.replace(/[🎫✈️🏨📝]/g,'').trim()} 예약 없음</div>`
        : items.map(b => `
          <div class="tp-booking-item tp-hover-parent">
            <div class="tp-booking-info">
              <div class="tp-booking-name">${b.name || b.route || ''}</div>
              <div class="tp-booking-sub">${b.date || b.departDate || ''} ${b.time || b.departTime || ''} ${b.code ? '· ' + b.code : ''}</div>
              ${b.checkin ? `<div class="tp-booking-sub">${b.checkin} ~ ${b.checkout || ''}</div>` : ''}
            </div>
            <div class="tp-item-actions tp-hover-actions">
              <button class="icon-btn" onclick="TravelApp.editBooking('${trip.id}','${type}','${b.id}')" title="수정">✏️</button>
              <button class="icon-btn" onclick="TravelApp.deleteBooking('${trip.id}','${type}','${b.id}')" title="삭제">🗑️</button>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function renderScheduleList(trip) {
  const schedule = (trip.schedule || []).sort((a, b) => {
    const da = a.date + (a.time || '00:00');
    const db = b.date + (b.time || '00:00');
    return da.localeCompare(db);
  });

  const cols = ['분류','날짜','시간','장소','내용','교통편','비고','지도'];

  return `
    <div class="tp-schedule-table-wrap">
      <table class="tp-schedule-table">
        <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}<th></th></tr></thead>
        <tbody>
          ${schedule.length === 0
            ? `<tr><td colspan="9" class="tp-table-empty">📅 아래 "추가" 버튼에서 일정을 추가하세요</td></tr>`
            : schedule.map(s => `
              <tr class="tp-hover-parent">
                <td><span class="tp-scat-badge" style="background:${getSchedCatColor(s.category)}">${s.category||'기타'}</span></td>
                <td>${s.date||''}</td>
                <td>${s.time||''}</td>
                <td>${s.place||''}</td>
                <td>${s.content||''}</td>
                <td>${s.transport ? `<span class="tp-transport-badge">${s.transport}</span>` : ''}</td>
                <td>${s.notes||''}</td>
                <td>${s.mapLink ? `<a href="${s.mapLink}" target="_blank" class="tp-map-link">🗺️</a>` : ''}</td>
                <td>
                  <div class="tp-row-actions tp-hover-actions">
                    <button class="icon-btn" onclick="TravelApp.editSchedule('${trip.id}','${s.id}')" title="수정">✏️</button>
                    <button class="icon-btn" onclick="TravelApp.deleteSchedule('${trip.id}','${s.id}')" title="삭제">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')
          }
        </tbody>
      </table>
    </div>
    ${renderScheduleAddForm(trip)}
  `;
}

function renderScheduleTimetable(trip) {
  const schedule = trip.schedule || [];
  if (schedule.length === 0) return `<div class="tp-table-empty">📅 일정을 추가하면 시간표가 표시됩니다</div>` + renderScheduleAddForm(trip);

  // 날짜별 그룹
  const dateGroups = {};
  schedule.forEach(s => {
    const d = s.date || '미정';
    if (!dateGroups[d]) dateGroups[d] = [];
    dateGroups[d].push(s);
  });
  const sortedDates = Object.keys(dateGroups).sort();

  // 시간 범위 10:00 ~ 22:00
  const hours = Array.from({length: 13}, (_, i) => i + 10);

  const startDate = trip.startDate ? new Date(trip.startDate) : null;

  return `
    <div class="tp-timetable-wrap">
      <div class="tp-timetable">
        <div class="tp-tt-row tp-tt-head">
          <div class="tp-tt-time-col">시간</div>
          ${sortedDates.map((d, i) => {
            const dayNum = i + 1;
            const dateStr = d !== '미정' ? d.slice(5) : '미정';
            return `<div class="tp-tt-day-col"><div class="tp-tt-day-label">${dayNum}일차</div><div class="tp-tt-date">${dateStr}</div></div>`;
          }).join('')}
        </div>
        ${hours.map(h => `
          <div class="tp-tt-row">
            <div class="tp-tt-time-col">${h}:00</div>
            ${sortedDates.map(d => {
              const items = (dateGroups[d] || []).filter(s => {
                if (!s.time) return false;
                const sh = parseInt(s.time.split(':')[0]);
                return sh === h;
              });
              return `<div class="tp-tt-day-col">
                ${items.map(s => `
                  <div class="tp-tt-item">
                    <span class="tp-tt-name">${s.place || s.content || ''}</span>
                    <span class="tp-scat-badge sm" style="background:${getSchedCatColor(s.category)}">${s.category||'기타'}</span>
                    ${s.transport ? `<span class="tp-transport-badge sm">${s.transport}</span>` : ''}
                  </div>
                `).join('')}
              </div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </div>
    ${renderScheduleAddForm(trip)}
  `;
}

function renderScheduleAddForm(trip) {
  const defaultDate = trip.startDate || new Date().toISOString().slice(0,10);
  return `
    <div class="tp-schedule-form" id="tp-schedule-form-${trip.id}">
      <select class="tp-form-sel" id="tp-scat-${trip.id}">
        ${getCategories('schedule').map(c => `<option>${c}</option>`).join('')}
      </select>
      <input type="date" class="tp-form-input" id="tp-sdate-${trip.id}" value="${defaultDate}"/>
      <input type="time" class="tp-form-input" id="tp-stime-${trip.id}"/>
      <input type="text" class="tp-form-input" id="tp-splace-${trip.id}" placeholder="장소"/>
      <input type="text" class="tp-form-input" id="tp-scontent-${trip.id}" placeholder="내용"/>
      <input type="text" class="tp-form-input sm" id="tp-stransp-${trip.id}" placeholder="교통편"/>
      <input type="text" class="tp-form-input sm" id="tp-snotes-${trip.id}" placeholder="비고"/>
      <input type="text" class="tp-form-input sm" id="tp-smap-${trip.id}" placeholder="지도 링크"/>
      <div class="tp-form-actions">
        <button class="tp-form-cancel">취소</button>
        <button class="tp-form-save" onclick="TravelApp.addSchedule('${trip.id}')">저장</button>
      </div>
    </div>
    <button class="tp-add-row-btn" onclick="document.getElementById('tp-schedule-form-${trip.id}').style.display='flex'">+ 추가</button>
  `;
}

function getSchedCatColor(cat) {
  const colors = {
    '관광': '#74B9FF', '식사': '#FF7675', '카페': '#FDCB6E', '쇼핑': '#A29BFE',
    '체험': '#55EFC4', '숙소': '#81ECEC', '교통': '#B2BEC3', '기타': '#DFE6E9'
  };
  return colors[cat] || '#DFE6E9';
}

function renderExpenseList(trip) {
  const expenses = (trip.expenses || []).sort((a, b) => (a.date||'').localeCompare(b.date||''));
  const total = expenses.reduce((s, e) => s + (parseFloat(e.amount)||0), 0);

  const rate = parseFloat(trip.exchangeRate) || (trip.currency ? (DEFAULT_RATES[trip.currency] || 1) : 1);
  return `
    <div class="tp-expense-wrap">
      ${trip.type==='foreign' && rate ? `<div style="font-size:11px;color:var(--text-sub);margin-bottom:8px;padding:4px 8px;background:var(--bg-sub);border-radius:6px;">
        💱 환율: 1 ${trip.currency||'외화'} = ${rate.toLocaleString('ko-KR')}원 (설정 탭에서 변경)
      </div>` : ''}
      <table class="tp-expense-table">
        <thead><tr>
          <th>분류</th><th>날짜</th><th>제목</th>
          <th style="text-align:right;">원화</th>
          ${trip.type==='foreign' ? `<th style="text-align:right;">외화(${trip.currency||''})</th>` : ''}
          <th style="width:64px;"></th>
        </tr></thead>
        <tbody>
          ${expenses.length === 0
            ? `<tr><td colspan="${trip.type==='foreign'?6:5}" class="tp-table-empty">💸 아래 "추가" 버튼에서 지출을 기록하세요</td></tr>`
            : expenses.map(e => `
              <tr class="tp-hover-parent">
                <td><span class="tp-scat-badge" style="background:${getExpCatColor(e.category)}">${e.category||'기타'}</span></td>
                <td style="font-size:12px;">${e.date||''}</td>
                <td>${e.title||''}</td>
                <td style="text-align:right;font-weight:700;">${(parseFloat(e.amount)||0).toLocaleString('ko-KR')}원</td>
                ${trip.type==='foreign' ? `<td style="text-align:right;color:var(--text-sub);font-size:12px;">${e.foreignAmount ? parseFloat(e.foreignAmount).toLocaleString('ko-KR') : '-'}</td>` : ''}
                <td>
                  <div class="tp-row-actions tp-hover-actions">
                    <button class="icon-btn" onclick="TravelApp.editExpense('${trip.id}','${e.id}')" title="수정">✏️</button>
                    <button class="icon-btn" onclick="TravelApp.deleteExpense('${trip.id}','${e.id}')" title="삭제">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')
          }
          <tr class="tp-expense-total">
            <td colspan="${trip.type==='foreign'?4:3}">합계</td>
            <td style="text-align:right;font-weight:800;">${total.toLocaleString('ko-KR')}원</td>
            ${trip.type==='foreign' ? `<td></td>` : ''}
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="tp-expense-form-area">
        <div class="tp-expense-inline-form">
          <select class="tp-form-sel" id="tp-ecat-${trip.id}">
            ${getCategories('expense').map(c => `<option>${c}</option>`).join('')}
          </select>
          <input type="date" class="tp-form-input" id="tp-edate-${trip.id}" value="${trip.startDate||new Date().toISOString().slice(0,10)}"/>
          <input type="text" class="tp-form-input" id="tp-etitle-${trip.id}" placeholder="제목"/>
          <input type="number" class="tp-form-input" id="tp-eamt-${trip.id}" placeholder="금액(원)"
            oninput="TravelApp.onKrwInput('${trip.id}',this,${rate})"/>
          ${trip.type==='foreign' ? `<input type="number" class="tp-form-input sm" id="tp-eforeign-${trip.id}" placeholder="외화(${trip.currency||''})"
            oninput="TravelApp.onForeignInput('${trip.id}',this,${rate})"/>` : ''}
          <div class="tp-form-actions">
            <button class="tp-form-save" onclick="TravelApp.addExpense('${trip.id}')">+ 추가</button>
          </div>
        </div>
        ${trip.type==='foreign' && rate ? `<div style="font-size:11px;color:var(--text-sub);margin-top:4px;">💡 원화 입력 시 외화 자동계산, 외화 입력 시 원화 자동계산</div>` : ''}
      </div>
    </div>
  `;
}

function getExpCatColor(cat) {
  const colors = {
    '항공': '#74B9FF', '숙소': '#A29BFE', '식비': '#FF7675', '교통': '#B2BEC3',
    '쇼핑': '#FDCB6E', '관광': '#55EFC4', '기타': '#DFE6E9'
  };
  return colors[cat] || '#DFE6E9';
}

function renderWishPlaces(trip, regionFilter) {
  const wishes = trip.wishPlaces || [];
  const filter = regionFilter || '';
  const filtered = filter ? wishes.filter(w => (w.region||'').includes(filter) || (w.place||'').includes(filter)) : wishes;

  // 카테고리별 그룹
  const groups = {};
  filtered.forEach(w => {
    const cat = w.category || '기타';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(w);
  });

  if (Object.keys(groups).length === 0) {
    return `<div style="color:var(--text-sub);font-size:13px;padding:16px 0;text-align:center;">⭐ + 추가 버튼으로 가고싶은 곳을 추가하세요</div>`;
  }

  return `
    <div class="tp-wish-grid">
      ${Object.entries(groups).map(([cat, items]) => `
        <div class="tp-wish-col">
          <div class="tp-wish-cat-header">
            <span>${getCatEmoji(cat)} ${cat}</span>
            <span class="tp-wish-count">${items.length}곳</span>
          </div>
          ${items.map(w => `
            <div class="tp-wish-item tp-hover-parent ${w.visited?'visited':''}">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1;">
                <input type="checkbox" ${w.visited?'checked':''} onchange="TravelApp.toggleWishVisited('${trip.id}','${w.id}',this.checked)" style="accent-color:var(--green);"/>
                <span class="tp-wish-name">${w.place||''}</span>
                ${w.region ? `<span class="tp-wish-region">${w.region}</span>` : ''}
              </label>
              ${w.notes ? `<span class="tp-wish-notes">${w.notes}</span>` : ''}
              <div class="tp-item-actions tp-hover-actions" style="flex-shrink:0;">
                <button class="icon-btn" onclick="TravelApp.deleteWish('${trip.id}','${w.id}')" title="삭제">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

function getCatEmoji(cat) {
  const e = {'풍경':'🏔','맛집':'🍽','카페':'☕','체험':'🎯','기념품':'🎁','기타':'⭐'};
  return e[cat] || '⭐';
}

// ===== RENDER: 버킷플레이스 탭 =====
function renderTravelBucket() {
  const el = document.getElementById('travel-bucket-content');
  if (!el) return;
  if (S === null) {
    el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--text-sub);font-size:14px;">⏳ 데이터 불러오는 중...</div>';
    return;
  }
  initTravelState();

  const bucketList = S.travels.bucketList || [];
  const filter = _bucketFilter;
  const filtered = filter === '전체' ? bucketList :
    filter === '국내' ? bucketList.filter(b => !b.country || b.country === '한국' || b.country === 'Korea') :
    bucketList.filter(b => b.country && b.country !== '한국' && b.country !== 'Korea');

  el.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">버킷플레이스 ⭐</h1>
        <p class="page-sub">가보고 싶은 장소를 모아두는 곳</p>
      </div>
      <button class="add-btn primary" onclick="TravelApp.openAddBucketModal()">+ 추가</button>
    </div>

    <div class="tp-filter-bar">
      ${['전체','국내','해외'].map(f => `
        <button class="tp-filter-chip ${_bucketFilter===f?'active':''}" onclick="TravelApp.setBucketFilter('${f}')">
          ${f === '국내' ? '🏔 ' : f === '해외' ? '🌏 ' : ''}${f}
        </button>
      `).join('')}
    </div>

    <div class="card" style="margin-top:16px;overflow:hidden;">
      <table class="tp-bucket-table">
        <thead>
          <tr>
            <th style="width:40px;">✓</th>
            <th>유형</th>
            <th>나라</th>
            <th>지역</th>
            <th>장소</th>
            <th>계절</th>
            <th>비고</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${filtered.length === 0
            ? `<tr><td colspan="8" class="tp-table-empty">⭐ 가보고 싶은 곳을 추가해보세요!</td></tr>`
            : filtered.map(b => `
              <tr class="tp-hover-parent ${b.checked?'tp-bucket-done':''}">
                <td>
                  <input type="checkbox" ${b.checked?'checked':''} onchange="TravelApp.toggleBucket('${b.id}',this.checked)" style="accent-color:var(--green);width:16px;height:16px;cursor:pointer;"/>
                </td>
                <td><span class="tp-bucket-type-badge" style="background:${getExpCatColor(b.type)}">${getCatEmoji(b.type)} ${b.type||'기타'}</span></td>
                <td>${b.country||'-'}</td>
                <td>${b.region||'-'}</td>
                <td class="tp-bucket-place">${b.place||''}</td>
                <td>${b.season||'-'}</td>
                <td style="color:var(--text-sub);font-size:12px;">${b.notes||'-'}</td>
                <td>
                  <div class="tp-row-actions tp-hover-actions">
                    <button class="icon-btn" onclick="TravelApp.editBucket('${b.id}')" title="수정">✏️</button>
                    <button class="icon-btn" onclick="TravelApp.deleteBucket('${b.id}')" title="삭제">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')
          }
        </tbody>
      </table>
    </div>
  `;
}

// ===== MODALS =====
function renderTravelModal(html) {
  let overlay = document.getElementById('tp-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'tp-modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.onclick = TravelApp.closeModal;
    document.body.appendChild(overlay);
  }
  let modal = document.getElementById('tp-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'tp-modal';
    modal.className = 'modal';
    modal.onclick = e => e.stopPropagation();
    document.body.appendChild(modal);
  }
  modal.innerHTML = html;
  overlay.classList.add('active');
  modal.classList.add('active');
}

function closeTravelModal() {
  const overlay = document.getElementById('tp-modal-overlay');
  const modal = document.getElementById('tp-modal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
}

function openNewTripModal(editTrip) {
  const t = editTrip || {};
  const isEdit = !!editTrip;
  renderTravelModal(`
    <div class="modal-header">${isEdit ? '✏️ 여행 수정' : '✈️ 새 여행 추가'}</div>
    <div class="form-group"><label>여행 이름</label><input type="text" class="form-input" id="tp-m-name" value="${t.name||''}"/></div>
    <div class="form-group">
      <label>구분</label>
      <div style="display:flex;gap:12px;margin-top:6px;">
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="radio" name="tp-m-type" value="foreign" ${(!t.type||t.type==='foreign')?'checked':''}/> 🌏 해외여행</label>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;"><input type="radio" name="tp-m-type" value="domestic" ${t.type==='domestic'?'checked':''}/> 🏔 국내여행</label>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>시작일</label><input type="date" class="form-input" id="tp-m-start" value="${t.startDate||''}"/></div>
      <div class="form-group"><label>종료일</label><input type="date" class="form-input" id="tp-m-end" value="${t.endDate||''}"/></div>
    </div>
    <div class="form-group"><label>여행지 (도시/국가)</label><input type="text" class="form-input" id="tp-m-regions" value="${t.regions||''}" placeholder="시드니, 호주"/></div>
    <div class="form-group"><label>동행자</label><input type="text" class="form-input" id="tp-m-companions" value="${t.companions||''}" placeholder="혼자, 친구, 가족, 둘..."/></div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveTrip(${isEdit?`'${t.id}'`:'null'})">${isEdit ? '수정 완료' : '저장'}</button>
    </div>
  `);
}

function saveTrip(editId) {
  const name = document.getElementById('tp-m-name').value.trim();
  if (!name) { alert('여행 이름을 입력하세요.'); return; }
  const type = document.querySelector('input[name="tp-m-type"]:checked').value;
  const startDate = document.getElementById('tp-m-start').value;
  const endDate = document.getElementById('tp-m-end').value;
  const regions = document.getElementById('tp-m-regions').value.trim();
  const companions = document.getElementById('tp-m-companions').value.trim();

  if (editId) {
    const t = getTripById(editId);
    if (t) { Object.assign(t, { name, type, startDate, endDate, regions, companions }); }
  } else {
    S.travels.trips.push({
      id: genTravelId(), name, type, startDate, endDate, regions, companions,
      currency: 'USD', exchangeRate: 0,
      bookings: { flights: [], hotels: [], others: [] },
      schedule: [], expenses: [], wishPlaces: []
    });
  }
  saveState();
  closeTravelModal();
  renderTravelMy();
}

function deleteTrip(id) {
  if (!confirm('이 여행을 삭제하시겠습니까? 모든 내용이 삭제됩니다.')) return;
  S.travels.trips = S.travels.trips.filter(t => t.id !== id);
  saveState();
  _travelView = null;
  renderTravelMy();
}

function updateTripField(tripId, field, value) {
  const t = getTripById(tripId);
  if (!t) return;
  t[field] = value;
  saveState();
  // Partial re-render for expensive fields
  if (field === 'startDate' || field === 'endDate' || field === 'companions' || field === 'regions') {
    // lightweight save only
  }
}

// ===== BOOKING MODAL =====
function openAddBookingModal(tripId, type, editId) {
  const trip = getTripById(tripId);
  const items = (trip.bookings && trip.bookings[type]) || [];
  const b = editId ? items.find(x => x.id === editId) : {};
  const isEdit = !!editId;
  const labels = { flights: '항공', hotels: '숙소', others: '기타' };

  const flightFields = type === 'flights' ? `
    <div class="form-group"><label>노선 (예: 인천 → 시드니)</label><input type="text" class="form-input" id="tp-b-route" value="${b.route||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>출발 날짜</label><input type="date" class="form-input" id="tp-b-ddate" value="${b.departDate||''}"/></div>
      <div class="form-group"><label>출발 시간</label><input type="time" class="form-input" id="tp-b-dtime" value="${b.departTime||''}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>도착 날짜</label><input type="date" class="form-input" id="tp-b-adate" value="${b.arrivalDate||''}"/></div>
      <div class="form-group"><label>도착 시간</label><input type="time" class="form-input" id="tp-b-atime" value="${b.arrivalTime||''}"/></div>
    </div>
    <div class="form-group"><label>예약 코드</label><input type="text" class="form-input" id="tp-b-code" value="${b.code||''}" placeholder="FNS2TO"/></div>
  ` : type === 'hotels' ? `
    <div class="form-group"><label>숙소명</label><input type="text" class="form-input" id="tp-b-name" value="${b.name||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>체크인</label><input type="date" class="form-input" id="tp-b-checkin" value="${b.checkin||''}"/></div>
      <div class="form-group"><label>체크아웃</label><input type="date" class="form-input" id="tp-b-checkout" value="${b.checkout||''}"/></div>
    </div>
    <div class="form-group"><label>예약 코드</label><input type="text" class="form-input" id="tp-b-code" value="${b.code||''}"/></div>
  ` : `
    <div class="form-group"><label>항목명</label><input type="text" class="form-input" id="tp-b-name" value="${b.name||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>날짜</label><input type="date" class="form-input" id="tp-b-date" value="${b.date||''}"/></div>
      <div class="form-group"><label>예약 코드</label><input type="text" class="form-input" id="tp-b-code" value="${b.code||''}"/></div>
    </div>
  `;

  renderTravelModal(`
    <div class="modal-header">${isEdit?'✏️ 수정':'+ 추가'} — ${labels[type]}</div>
    ${flightFields}
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveBooking('${tripId}','${type}',${isEdit?`'${editId}'`:'null'})">저장</button>
    </div>
  `);
}

function saveBooking(tripId, type, editId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  if (!trip.bookings) trip.bookings = { flights: [], hotels: [], others: [] };
  if (!trip.bookings[type]) trip.bookings[type] = [];

  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  let data = {};
  if (type === 'flights') {
    data = { route: g('tp-b-route'), departDate: g('tp-b-ddate'), departTime: g('tp-b-dtime'), arrivalDate: g('tp-b-adate'), arrivalTime: g('tp-b-atime'), code: g('tp-b-code') };
  } else if (type === 'hotels') {
    data = { name: g('tp-b-name'), checkin: g('tp-b-checkin'), checkout: g('tp-b-checkout'), code: g('tp-b-code') };
  } else {
    data = { name: g('tp-b-name'), date: g('tp-b-date'), code: g('tp-b-code') };
  }

  if (editId) {
    const idx = trip.bookings[type].findIndex(x => x.id === editId);
    if (idx !== -1) trip.bookings[type][idx] = { ...trip.bookings[type][idx], ...data };
  } else {
    trip.bookings[type].push({ id: genTravelId(), ...data });
  }
  saveState();
  closeTravelModal();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function deleteBooking(tripId, type, bookingId) {
  const trip = getTripById(tripId);
  if (!trip || !trip.bookings || !trip.bookings[type]) return;
  trip.bookings[type] = trip.bookings[type].filter(b => b.id !== bookingId);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

// ===== SCHEDULE =====
function addSchedule(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  if (!trip.schedule) trip.schedule = [];
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const data = {
    id: genTravelId(),
    category: g(`tp-scat-${tripId}`),
    date: g(`tp-sdate-${tripId}`),
    time: g(`tp-stime-${tripId}`),
    place: g(`tp-splace-${tripId}`),
    content: g(`tp-scontent-${tripId}`),
    transport: g(`tp-stransp-${tripId}`),
    notes: g(`tp-snotes-${tripId}`),
    mapLink: g(`tp-smap-${tripId}`),
  };
  trip.schedule.push(data);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function deleteSchedule(tripId, schedId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  trip.schedule = (trip.schedule || []).filter(s => s.id !== schedId);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function editSchedule(tripId, schedId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const s = (trip.schedule || []).find(x => x.id === schedId);
  if (!s) return;
  renderTravelModal(`
    <div class="modal-header">✏️ 일정 수정</div>
    <div class="form-row">
      <div class="form-group"><label>분류</label><select class="form-input" id="tp-es-cat">${getCategories('schedule').map(c=>`<option ${s.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label>날짜</label><input type="date" class="form-input" id="tp-es-date" value="${s.date||''}"/></div>
      <div class="form-group"><label>시간</label><input type="time" class="form-input" id="tp-es-time" value="${s.time||''}"/></div>
    </div>
    <div class="form-group"><label>장소</label><input type="text" class="form-input" id="tp-es-place" value="${s.place||''}"/></div>
    <div class="form-group"><label>내용</label><input type="text" class="form-input" id="tp-es-content" value="${s.content||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>교통편</label><input type="text" class="form-input" id="tp-es-transport" value="${s.transport||''}"/></div>
      <div class="form-group"><label>비고</label><input type="text" class="form-input" id="tp-es-notes" value="${s.notes||''}"/></div>
    </div>
    <div class="form-group"><label>지도 링크</label><input type="text" class="form-input" id="tp-es-map" value="${s.mapLink||''}"/></div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveEditSchedule('${tripId}','${schedId}')">저장</button>
    </div>
  `);
}

function saveEditSchedule(tripId, schedId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const idx = (trip.schedule || []).findIndex(x => x.id === schedId);
  if (idx === -1) return;
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  trip.schedule[idx] = {
    ...trip.schedule[idx],
    category: g('tp-es-cat'), date: g('tp-es-date'), time: g('tp-es-time'),
    place: g('tp-es-place'), content: g('tp-es-content'),
    transport: g('tp-es-transport'), notes: g('tp-es-notes'), mapLink: g('tp-es-map')
  };
  saveState();
  closeTravelModal();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

// ===== EXPENSES =====
function addExpense(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  if (!trip.expenses) trip.expenses = [];
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const data = {
    id: genTravelId(),
    category: g(`tp-ecat-${tripId}`),
    date: g(`tp-edate-${tripId}`),
    title: g(`tp-etitle-${tripId}`),
    amount: parseFloat(g(`tp-eamt-${tripId}`).replace(/[^0-9.]/g,'')) || 0,
    foreignAmount: g(`tp-eforeign-${tripId}`) || '',
  };
  if (!data.title && !data.amount) { alert('제목과 금액을 입력하세요.'); return; }
  trip.expenses.push(data);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function deleteExpense(tripId, expId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  trip.expenses = (trip.expenses || []).filter(e => e.id !== expId);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function editExpense(tripId, expId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const e = (trip.expenses || []).find(x => x.id === expId);
  if (!e) return;
  renderTravelModal(`
    <div class="modal-header">✏️ 지출 수정</div>
    <div class="form-row">
      <div class="form-group"><label>분류</label><select class="form-input" id="tp-ee-cat">${getCategories('expense').map(c=>`<option ${e.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label>날짜</label><input type="date" class="form-input" id="tp-ee-date" value="${e.date||''}"/></div>
    </div>
    <div class="form-group"><label>제목</label><input type="text" class="form-input" id="tp-ee-title" value="${e.title||''}"/></div>
    <div class="form-row">
      <div class="form-group"><label>금액 (원)</label><input type="number" class="form-input" id="tp-ee-amt" value="${e.amount||0}"/></div>
      ${trip.type==='foreign' ? `<div class="form-group"><label>외화 금액</label><input type="number" class="form-input" id="tp-ee-foreign" value="${e.foreignAmount||''}"/></div>` : ''}
    </div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveEditExpense('${tripId}','${expId}')">저장</button>
    </div>
  `);
}

function saveEditExpense(tripId, expId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const idx = (trip.expenses || []).findIndex(x => x.id === expId);
  if (idx === -1) return;
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  trip.expenses[idx] = {
    ...trip.expenses[idx],
    category: g('tp-ee-cat'), date: g('tp-ee-date'), title: g('tp-ee-title'),
    amount: parseFloat(g('tp-ee-amt')) || 0,
    foreignAmount: g('tp-ee-foreign') !== undefined ? g('tp-ee-foreign') : trip.expenses[idx].foreignAmount || '',
  };
  saveState();
  closeTravelModal();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

// ===== 쌍방향 환율 자동계산 =====
function onKrwInput(tripId, inputEl, rate) {
  if (!rate || rate <= 0) return;
  const krw = parseFloat(inputEl.value) || 0;
  const foreignEl = document.getElementById('tp-eforeign-' + tripId);
  if (foreignEl && document.activeElement === inputEl) {
    foreignEl.value = krw > 0 ? (krw / rate).toFixed(2) : '';
  }
}

function onForeignInput(tripId, inputEl, rate) {
  if (!rate || rate <= 0) return;
  const foreign = parseFloat(inputEl.value) || 0;
  const krwEl = document.getElementById('tp-eamt-' + tripId);
  if (krwEl && document.activeElement === inputEl) {
    krwEl.value = foreign > 0 ? Math.round(foreign * rate) : '';
  }
}

// ===== 설정탭용 분류 관리 UI =====
function renderTravelCategorySettings() {
  const types = [
    { key: 'schedule', label: '여행일정 분류', icon: '📅' },
    { key: 'expense',  label: '지출 분류',     icon: '💸' },
    { key: 'bucket',   label: '버킷플레이스 유형', icon: '⭐' },
  ];
  return types.map(({ key, label, icon }) => {
    const cats = getCategories(key);
    const tags = cats.map(c => `
      <span class="tp-cat-tag">
        ${c}
        <button onclick="TravelApp.deleteTravelCat('${key}','${c}')" style="background:none;border:none;cursor:pointer;font-size:11px;color:#999;padding:0 0 0 2px;line-height:1;">✕</button>
      </span>
    `).join('');
    return `
      <div class="tp-cat-section">
        <div class="tp-cat-section-title">${icon} ${label}</div>
        <div class="tp-cat-tags" id="tp-cat-tags-${key}">${tags}</div>
        <div style="display:flex;gap:6px;margin-top:8px;">
          <input type="text" class="tp-cat-input form-input" id="tp-cat-input-${key}" placeholder="새 분류 입력..."
            style="flex:1;font-size:12px;padding:5px 10px;height:30px;"
            onkeydown="if(event.key==='Enter')TravelApp.addTravelCat('${key}')"/>
          <button onclick="TravelApp.addTravelCat('${key}')"
            style="padding:4px 12px;background:#A29BFE;color:white;border:none;border-radius:8px;cursor:pointer;font-size:12px;">+ 추가</button>
          <button onclick="TravelApp.resetTravelCat('${key}')"
            style="padding:4px 10px;background:var(--bg-sub);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:11px;color:var(--text-sub);">초기화</button>
        </div>
      </div>
    `;
  }).join('');
}

function addTravelCat(type) {
  const inputEl = document.getElementById('tp-cat-input-' + type);
  if (!inputEl) return;
  const val = inputEl.value.trim();
  if (!val) return;
  const cats = getCategories(type);
  if (cats.includes(val)) { alert('이미 있는 분류입니다.'); return; }
  cats.push(val);
  saveCategories(type, cats);
  inputEl.value = '';
  _refreshCatTagsUI(type);
}

function deleteTravelCat(type, name) {
  let cats = getCategories(type);
  cats = cats.filter(c => c !== name);
  saveCategories(type, cats);
  _refreshCatTagsUI(type);
}

function resetTravelCat(type) {
  if (!confirm('기본값으로 초기화하시겠어요?')) return;
  localStorage.removeItem('travel_cats_' + type);
  _refreshCatTagsUI(type);
}

function _refreshCatTagsUI(type) {
  const container = document.getElementById('tp-cat-tags-' + type);
  if (!container) return;
  const cats = getCategories(type);
  container.innerHTML = cats.map(c => `
    <span class="tp-cat-tag">
      ${c}
      <button onclick="TravelApp.deleteTravelCat('${type}','${c}')" style="background:none;border:none;cursor:pointer;font-size:11px;color:#999;padding:0 0 0 2px;line-height:1;">✕</button>
    </span>
  `).join('');
}

// ===== WISH PLACES =====
function openAddWishModal(tripId) {
  renderTravelModal(`
    <div class="modal-header">⭐ 가고싶은 곳 추가</div>
    <div class="form-row">
      <div class="form-group"><label>유형</label><select class="form-input" id="tp-w-cat">${WISH_CATEGORIES.map(c=>`<option>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label>지역</label><input type="text" class="form-input" id="tp-w-region" placeholder="시드니"/></div>
    </div>
    <div class="form-group"><label>장소명</label><input type="text" class="form-input" id="tp-w-place" placeholder="오페라 하우스"/></div>
    <div class="form-group"><label>메모 (선택)</label><input type="text" class="form-input" id="tp-w-notes"/></div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveWish('${tripId}')">추가</button>
    </div>
  `);
}

function saveWish(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  if (!trip.wishPlaces) trip.wishPlaces = [];
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const place = g('tp-w-place').trim();
  if (!place) { alert('장소명을 입력하세요.'); return; }
  trip.wishPlaces.push({
    id: genTravelId(), category: g('tp-w-cat'), region: g('tp-w-region'), place, notes: g('tp-w-notes'), visited: false
  });
  saveState();
  closeTravelModal();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function deleteWish(tripId, wishId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  trip.wishPlaces = (trip.wishPlaces || []).filter(w => w.id !== wishId);
  saveState();
  renderTravelDetail(document.getElementById('travel-my-content'), tripId);
}

function toggleWishVisited(tripId, wishId, checked) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const w = (trip.wishPlaces || []).find(x => x.id === wishId);
  if (w) { w.visited = checked; saveState(); }
}

function filterWishPlaces(tripId, regionFilter) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const el = document.querySelector('.tp-wish-grid') || document.createElement('div');
  const parent = el.parentElement;
  if (parent) {
    const newEl = document.createElement('div');
    newEl.innerHTML = renderWishPlaces(trip, regionFilter);
    parent.replaceChild(newEl.firstChild || newEl, el);
  }
}

// ===== BUCKET LIST =====
function openAddBucketModal(editId) {
  const b = editId ? (S.travels.bucketList||[]).find(x=>x.id===editId) : {};
  const isEdit = !!editId;
  renderTravelModal(`
    <div class="modal-header">${isEdit ? '✏️ 수정' : '⭐ 버킷플레이스 추가'}</div>
    <div class="form-row">
      <div class="form-group"><label>유형</label><select class="form-input" id="tp-bk-type">${BUCKET_TYPES.map(c=>`<option ${b.type===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label>나라</label><input type="text" class="form-input" id="tp-bk-country" value="${b.country||''}" placeholder="일본"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>지역</label><input type="text" class="form-input" id="tp-bk-region" value="${b.region||''}" placeholder="홋카이도"/></div>
      <div class="form-group"><label>계절</label><input type="text" class="form-input" id="tp-bk-season" value="${b.season||''}" placeholder="겨울"/></div>
    </div>
    <div class="form-group"><label>장소명 *</label><input type="text" class="form-input" id="tp-bk-place" value="${b.place||''}" placeholder="아오이이케"/></div>
    <div class="form-group"><label>비고</label><input type="text" class="form-input" id="tp-bk-notes" value="${b.notes||''}"/></div>
    <div class="modal-actions">
      <button class="btn-cancel" onclick="TravelApp.closeModal()">취소</button>
      <button class="btn-save" onclick="TravelApp.saveBucket(${isEdit?`'${editId}'`:'null'})">저장</button>
    </div>
  `);
}

function saveBucket(editId) {
  const g = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const place = g('tp-bk-place').trim();
  if (!place) { alert('장소명을 입력하세요.'); return; }
  const data = {
    type: g('tp-bk-type'), country: g('tp-bk-country'), region: g('tp-bk-region'),
    place, season: g('tp-bk-season'), notes: g('tp-bk-notes')
  };
  if (editId) {
    const idx = (S.travels.bucketList||[]).findIndex(x=>x.id===editId);
    if (idx !== -1) S.travels.bucketList[idx] = { ...S.travels.bucketList[idx], ...data };
  } else {
    if (!S.travels.bucketList) S.travels.bucketList = [];
    S.travels.bucketList.push({ id: genTravelId(), checked: false, ...data });
  }
  saveState();
  closeTravelModal();
  renderTravelBucket();
}

function toggleBucket(id, checked) {
  const b = (S.travels.bucketList||[]).find(x=>x.id===id);
  if (b) { b.checked = checked; saveState(); }
}

function deleteBucket(id) {
  if (!confirm('이 항목을 삭제하시겠습니까?')) return;
  S.travels.bucketList = (S.travels.bucketList||[]).filter(x=>x.id!==id);
  saveState();
  renderTravelBucket();
}

function editBucket(id) { openAddBucketModal(id); }

// ===== DOWNLOAD SUMMARY =====
function downloadSummary(tripId) {
  const trip = getTripById(tripId);
  if (!trip) return;
  const schedule = (trip.schedule || []).sort((a, b) => (a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));
  const expense = getTripTotalExpense(trip);

  // 날짜별 그룹
  const dateGroups = {};
  schedule.forEach(s => {
    const d = s.date || '미정';
    if (!dateGroups[d]) dateGroups[d] = [];
    dateGroups[d].push(s);
  });

  const content = `✈️ 여행 요약 — ${trip.name}
========================
📅 ${formatTravelDateRange(trip.startDate, trip.endDate)}
📍 ${trip.regions || ''}
👥 ${trip.companions || '혼자'}
💰 총 경비: ${expense.toLocaleString('ko-KR')}원
========================

📋 여행 일정
${Object.entries(dateGroups).sort().map(([date, items]) =>
  `\n[${date}]\n` + items.map(s => `  ${s.time||'--:--'} | ${s.place||''} | ${s.content||''} | ${s.category||''}`).join('\n')
).join('\n')}

💸 지출 내역
${(trip.expenses||[]).map(e => `  ${e.date||''} | ${e.category} | ${e.title} | ${(e.amount||0).toLocaleString('ko-KR')}원`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━
합계: ${expense.toLocaleString('ko-KR')}원
`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `여행요약_${trip.name}.txt`; a.click();
  URL.revokeObjectURL(url);
}

// ===== NAV GROUP TOGGLE =====
function toggleNavGroup(group) {
  const submenu = document.getElementById(`nav-${group}-submenu`);
  const arrow = document.getElementById(`nav-${group}-arrow`);
  if (!submenu) return;
  const isOpen = submenu.style.display !== 'none';
  submenu.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}

// ===== PUBLIC API =====
window.TravelApp = {
  // Filter
  setTravelFilter(f) { _travelFilter = f; _travelView = null; renderTravelMy(); },
  setBucketFilter(f) { _bucketFilter = f; renderTravelBucket(); },
  // View
  openTrip(id) { _travelView = id; _travelDetailTab = 'schedule-list'; renderTravelMy(); },
  backToList() { _travelView = null; renderTravelMy(); },
  setDetailTab(tab, tripId) { _travelDetailTab = tab; renderTravelDetail(document.getElementById('travel-my-content'), tripId); },
  // Trip CRUD
  openNewTripModal() { openNewTripModal(); },
  openEditTripModal(id) { openNewTripModal(getTripById(id)); },
  saveTrip,
  deleteTrip,
  updateTripField,
  // Booking
  openAddBookingModal,
  editBooking: openAddBookingModal,
  saveBooking,
  deleteBooking,
  // Schedule
  addSchedule,
  deleteSchedule,
  editSchedule,
  saveEditSchedule,
  // Expense
  addExpense,
  deleteExpense,
  editExpense,
  saveEditExpense,
  // Wish
  openAddWishModal,
  saveWish,
  deleteWish,
  toggleWishVisited,
  filterWishPlaces,
  // Bucket
  openAddBucketModal,
  saveBucket,
  toggleBucket,
  deleteBucket,
  editBucket,
  // Summary
  downloadSummary,
  // Modal
  closeModal: closeTravelModal,
  // Nav
  toggleNavGroup,
  // Render
  renderTravelMy,
  renderTravelBucket,
  // Init
  init: initTravelState,
  // Category management
  getCategories,
  saveCategories,
  addTravelCat,
  deleteTravelCat,
  resetTravelCat,
  renderTravelCategorySettings,
  // Currency exchange
  onKrwInput,
  onForeignInput,
  // Flag util
  getCountryFlag,
};
