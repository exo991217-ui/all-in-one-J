// ===== FIREBASE SYNC =====
// Google 로그인 + Firestore 실시간 동기화

window.FB_FIREBASE_MODE = true; // app.js 초기 renderAll 억제

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDQi-FUnBmJixP5qVNRfeLxuB03w-gjYGc",
  authDomain: "moneylog-5e2d4.firebaseapp.com",
  projectId: "moneylog-5e2d4",
  storageBucket: "moneylog-5e2d4.firebasestorage.app",
  messagingSenderId: "155121899473",
  appId: "1:155121899473:web:1d08b4456749f7d025f2f0",
  measurementId: "G-GW3W353KKM"
};

firebase.initializeApp(FIREBASE_CONFIG);
const _auth = firebase.auth();
const _db   = firebase.firestore();

let _currentUser = null;
let _saveTimer   = null;

// ── Firestore 저장 (디바운스 1.5초) ──────────────────────────
window.FB_SAVE = function(state) {
  if (!_currentUser) return;
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    try {
      await _db.collection('users').doc(_currentUser.uid)
               .collection('data').doc('kakeibo')
               .set({
                 state: JSON.stringify(state),
                 updatedAt: firebase.firestore.FieldValue.serverTimestamp()
               });
    } catch(e) {
      console.error('[FB] 저장 오류:', e);
    }
  }, 1500);
};

// ── Firestore 불러오기 ────────────────────────────────────────
async function _loadFromFirestore(uid) {
  try {
    const doc = await _db.collection('users').doc(uid)
                          .collection('data').doc('kakeibo').get();
    if (doc.exists && doc.data().state) {
      return JSON.parse(doc.data().state);
    }
  } catch(e) {
    console.error('[FB] 불러오기 오류:', e);
  }
  return null;
}

// ── Google 로그인 (Popup → Redirect 폴백) ─────────────────────
window.FB_GOOGLE_LOGIN = async function() {
  const btn = document.getElementById('fb-login-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span style="opacity:.7">로그인 중...</span>'; }
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      // 팝업 방식 먼저 시도
      await _auth.signInWithPopup(provider);
    } catch(popupErr) {
      // 팝업 차단 또는 불가능한 경우 → redirect 방식으로 전환
      if (
        popupErr.code === 'auth/popup-blocked' ||
        popupErr.code === 'auth/popup-closed-by-user' ||
        popupErr.code === 'auth/cancelled-popup-request'
      ) {
        // redirect 방식
        await _auth.signInWithRedirect(provider);
        return; // redirect 후 페이지 새로고침됨
      }
      throw popupErr;
    }
  } catch(e) {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.5 1.2 8.9 3.2l6.6-6.6C35.5 2.5 30.1 0 24 0 14.7 0 6.7 5.5 2.9 13.5l7.7 6C12.4 13.2 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.8 37.2 46.5 31.3 46.5 24.5z"/><path fill="#FBBC05" d="M10.6 28.5c-.5-1.5-.8-3-.8-4.5s.3-3 .8-4.5l-7.7-6C1 16.5 0 20.1 0 24s1 7.5 2.9 10.5l7.7-6z"/><path fill="#34A853" d="M24 48c6.1 0 11.2-2.2 14.9-5.8l-7.5-5.8c-2 1.4-4.6 2.2-7.4 2.2-6.2 0-11.4-4.2-13.3-9.8l-7.7 6C6.7 42.5 14.7 48 24 48z"/></svg> Google로 로그인`;
    }
    if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
      alert('로그인 실패: ' + (e.message || e.code));
    }
  }
};

// ── 로그아웃 ──────────────────────────────────────────────────
window.FB_LOGOUT = async function() {
  if (!confirm('로그아웃 하시겠어요?\n(데이터는 클라우드에 안전하게 저장되어 있습니다)')) return;
  await _auth.signOut();
};

// ── 오버레이 표시/숨김 ────────────────────────────────────────
function _showOverlay() {
  const overlay = document.getElementById('fb-login-overlay');
  const app = document.getElementById('app');
  if (overlay) overlay.style.display = 'flex';
  if (app) app.style.display = 'none';
}
function _hideOverlay() {
  const overlay = document.getElementById('fb-login-overlay');
  const app = document.getElementById('app');
  if (overlay) overlay.style.display = 'none';
  if (app) app.style.display = 'flex';
}

// ── 사이드바 유저 정보 업데이트 ───────────────────────────────
function _updateUserUI(user) {
  const nameEl  = document.getElementById('fb-sidebar-name');
  const photoEl = document.getElementById('fb-sidebar-photo');
  if (!nameEl) return;
  nameEl.textContent = user.displayName || user.email;
  if (user.photoURL) {
    photoEl.src = user.photoURL;
    photoEl.style.display = 'block';
  }
}

// ── redirect 결과 처리 ────────────────────────────────────────
async function _handleRedirectResult() {
  try {
    const result = await _auth.getRedirectResult();
    if (result && result.user) {
      // redirect 로그인 성공 — auth state change가 뒤따름
    }
  } catch(e) {
    if (e.code !== 'auth/no-current-user') {
      console.error('[FB] redirect 결과 오류:', e);
    }
  }
}

// ── 인증 상태 감지 ────────────────────────────────────────────
_auth.onAuthStateChanged(async (user) => {
  if (user) {
    _currentUser = user;
    _updateUserUI(user);

    // Firestore 데이터 불러와서 S에 병합
    const fbData = await _loadFromFirestore(user.uid);
    if (fbData && window.FB_MERGE) {
      window.FB_MERGE(fbData);
    }

    _hideOverlay();

    // 즉시 렌더링
    const doRender = () => {
      if (window.App && window.App.renderAll) {
        try { window.App.renderAll(); } catch(e) { console.error(e); }
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doRender);
    } else {
      doRender();
    }
  } else {
    _currentUser = null;
    _showOverlay();
  }
});

// 페이지 로드 시 redirect 결과 처리
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _handleRedirectResult);
} else {
  _handleRedirectResult();
}
