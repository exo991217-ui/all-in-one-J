"use strict";

// ══════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════
const JOB_GROUPS = {
  탱커: ["나이트", "전사", "암흑기사", "건브레이커"],
  힐러: ["백마도사", "학자", "점성술사", "현자"],
  "근거리 딜러": ["몽크", "용기사", "닌자", "사무라이", "리퍼", "바이퍼"],
  유격대: ["음유시인", "기공사", "무도가"],
  "마법 딜러": ["흑마도사", "소환사", "적마도사", "픽토맨서"],
};

const SKILL_TYPES = ["광역", "쉐어", "산개", "탱버", "기타"];

const SKILL_CATEGORIES = [
  "외생기",
  "생존기",
  "무적기",
  "보호막",
  "힐기",
  "즉발힐",
  "기타",
];

const SKILL_CAT_COLORS = {
  외생기: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  생존기: { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
  무적기: { bg: "#fefce8", color: "#a16207", border: "#fde047" },
  보호막: { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
  힐기: { bg: "#fdf2f8", color: "#9d174d", border: "#f9a8d4" },
  즉발힐: { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  기타: { bg: "#f8fafc", color: "#64748b", border: "#cbd5e1" },
};

const JOB_ICON_URLS = {
  나이트: "icons/jobs/01_TANK/Job/Paladin.png",
  전사: "icons/jobs/01_TANK/Job/Warrior.png",
  암흑기사: "icons/jobs/01_TANK/Job/DarkKnight.png",
  건브레이커: "icons/jobs/01_TANK/Job/Gunbreaker.png",
  백마도사: "icons/jobs/02_HEALER/Job/WhiteMage.png",
  학자: "icons/jobs/02_HEALER/Job/Scholar.png",
  점성술사: "icons/jobs/02_HEALER/Job/Astrologian.png",
  현자: "icons/jobs/02_HEALER/Job/Sage.png",
  몽크: "icons/jobs/03_DPS/Job/Monk.png",
  용기사: "icons/jobs/03_DPS/Job/Dragoon.png",
  닌자: "icons/jobs/03_DPS/Job/Ninja.png",
  사무라이: "icons/jobs/03_DPS/Job/Samurai.png",
  리퍼: "icons/jobs/03_DPS/Job/Reaper.png",
  바이퍼: "icons/jobs/03_DPS/Job/Viper.png",
  음유시인: "icons/jobs/03_DPS/Job/Bard.png",
  기공사: "icons/jobs/03_DPS/Job/Machinist.png",
  무도가: "icons/jobs/03_DPS/Job/Dancer.png",
  흑마도사: "icons/jobs/03_DPS/JobBlackMage.png",
  소환사: "icons/jobs/03_DPS/Job/Summoner.png",
  적마도사: "icons/jobs/03_DPS/Job/RedMage.png",
  픽토맨서: "icons/jobs/03_DPS/Job/Pictomancer.png",
};

const _S = (job, file) => `icons/skills/${job}/${file}`;
const _R = (job, file) => `icons/skills/${job}/Role_Actions/${file}`;

const PRESET_MITS = [
  // ── 탱커 공통 (Role Action) ────────────────────────────
  {
    name: "철벽 방어",
    jobGroup: "탱커",
    jobClass: "나이트",
    isCommon: true,
    skillCategory: "외생기",
    color: "#4D96FF",
    imageUrl: _R("01_PLD", "Rampart.png"),
  },
  {
    name: "앙갚음",
    jobGroup: "탱커",
    jobClass: "나이트",
    isCommon: true,
    skillCategory: "외생기",
    color: "#4D96FF",
    imageUrl: _R("01_PLD", "Reprisal.png"),
  },
  {
    name: "거리 유지",
    jobGroup: "탱커",
    jobClass: "나이트",
    isCommon: true,
    skillCategory: "외생기",
    color: "#4D96FF",
    imageUrl: _R("01_PLD", "Arm's_Length.png"),
  },
  // ── 나이트 (PLD) ──────────────────────────────────────
  {
    name: "신성한 방벽",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Holy_Sheltron.png"),
  },
  {
    name: "신성한 보호막",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Divine_Veil.png"),
  },
  {
    name: "중재",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Intervention.png"),
  },
  {
    name: "천하무적",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "무적기",
    color: "#FFD700",
    imageUrl: _S("01_PLD", "Hallowed_Ground.png"),
  },
  {
    name: "극한 방어",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Guardian.png"),
  },
  {
    name: "결연한 수호자",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Passage_of_Arms.png"),
  },
  {
    name: "방패 각성",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "생존기",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Bulwark.png"),
  },
  {
    name: "감싸기",
    jobGroup: "탱커",
    jobClass: "나이트",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("01_PLD", "Cover.png"),
  },
  // ── 전사 (WAR) ────────────────────────────────────────
  {
    name: "원초의 혈기",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "생존기",
    color: "#C7CEEA",
    imageUrl: _S("02_WAR", "Bloodwhetting.png"),
  },
  {
    name: "뿌리치기",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "보호막",
    color: "#C7CEEA",
    imageUrl: _S("02_WAR", "Shake_It_Off.png"),
  },
  {
    name: "일대일 결투",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "무적기",
    color: "#FFD700",
    imageUrl: _S("02_WAR", "Holmgang.png"),
  },
  {
    name: "원초의 분노",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "생존기",
    color: "#C7CEEA",
    imageUrl: _S("02_WAR", "Nascent_Flash.png"),
  },
  {
    name: "지옥행",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "무적기",
    color: "#C7CEEA",
    imageUrl: _S("02_WAR", "Damnation.png"),
  },
  {
    name: "평정심",
    jobGroup: "탱커",
    jobClass: "전사",
    skillCategory: "힐기",
    color: "#C7CEEA",
    imageUrl: _S("02_WAR", "Equilibrium.png"),
  },
  // ── 암흑기사 (DRK) ────────────────────────────────────
  {
    name: "헌신",
    jobGroup: "탱커",
    jobClass: "암흑기사",
    skillCategory: "외생기",
    color: "#9D4EDD",
    imageUrl: _S("03_DRK", "Oblation.png"),
  },
  {
    name: "흑야",
    jobGroup: "탱커",
    jobClass: "암흑기사",
    skillCategory: "보호막",
    color: "#9D4EDD",
    imageUrl: _S("03_DRK", "The_Blackest_Night.png"),
  },
  {
    name: "산송장",
    jobGroup: "탱커",
    jobClass: "암흑기사",
    skillCategory: "무적기",
    color: "#FFD700",
    imageUrl: _S("03_DRK", "Living_Dead.png"),
  },
  {
    name: "그림자 요새",
    jobGroup: "탱커",
    jobClass: "암흑기사",
    skillCategory: "생존기",
    color: "#9D4EDD",
    imageUrl: _S("03_DRK", "Shadowed_Vigil.png"),
  },
  {
    name: "어둠의 감정",
    jobGroup: "탱커",
    jobClass: "암흑기사",
    skillCategory: "생존기",
    color: "#9D4EDD",
    imageUrl: _S("03_DRK", "Dark_Mind.png"),
  },
  // ── 건브레이커 (GNB) ──────────────────────────────────
  {
    name: "빛의 심장",
    jobGroup: "탱커",
    jobClass: "건브레이커",
    skillCategory: "외생기",
    color: "#F4A261",
    imageUrl: _S("04_GNB", "Heart_of_Light.png"),
  },
  {
    name: "강옥의 심장",
    jobGroup: "탱커",
    jobClass: "건브레이커",
    skillCategory: "보호막",
    color: "#F4A261",
    imageUrl: _S("04_GNB", "Heart_of_Corundum.png"),
  },
  {
    name: "폭발 유성",
    jobGroup: "탱커",
    jobClass: "건브레이커",
    skillCategory: "무적기",
    color: "#FFD700",
    imageUrl: _S("04_GNB", "Superbolide.png"),
  },
  {
    name: "오로라",
    jobGroup: "탱커",
    jobClass: "건브레이커",
    skillCategory: "힐기",
    color: "#F4A261",
    imageUrl: _S("04_GNB", "Aurora.png"),
  },
  {
    name: "대성운",
    jobGroup: "탱커",
    jobClass: "건브레이커",
    skillCategory: "외생기",
    color: "#F4A261",
    imageUrl: _S("04_GNB", "Great_Nebula.png"),
  },

  // ── 백마도사 (WHM) ────────────────────────────────────
  {
    name: "거룩한 축복",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "즉발힐",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Benediction.png"),
  },
  {
    name: "물의 장막",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "보호막",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Aquaveil.png"),
  },
  {
    name: "신성한 축복",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "보호막",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Divine_Benison.png"),
  },
  {
    name: "절제",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "외생기",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Temperance.png"),
  },
  {
    name: "예배종",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "힐기",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Liturgy_of_the_Bell.png"),
  },
  {
    name: "성소",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "힐기",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Asylum.png"),
  },
  {
    name: "대사면",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "힐기",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Plenary_Indulgence.png"),
  },
  {
    name: "신성한 손길",
    jobGroup: "힐러",
    jobClass: "백마도사",
    skillCategory: "즉발힐",
    color: "#22c55e",
    imageUrl: _S("18_WHM", "Divine_Caress.png"),
  },
  // ── 학자 (SCH) ────────────────────────────────────────
  {
    name: "고무격려책",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Adloquium.png"),
  },
  {
    name: "의기왕성책",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Concitation.png"),
  },
  {
    name: "전개 전술",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Deployment_Tactics.png"),
  },
  {
    name: "응급 전술",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "즉발힐",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Emergency_Tactics.png"),
  },
  {
    name: "심모원려책",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "힐기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Excogitation.png"),
  },
  {
    name: "질풍노도계",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Expedient.png"),
  },
  {
    name: "생명회생술",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "생존기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Protraction.png"),
  },
  {
    name: "요정의 광휘",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "외생기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Fey_Illumination.png"),
  },
  {
    name: "빛의 속삭임",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "힐기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Whispering_Dawn.png"),
  },
  {
    name: "야전치유진",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Sacred_Soil.png"),
  },
  {
    name: "세라피즘",
    jobGroup: "힐러",
    jobClass: "학자",
    skillCategory: "힐기",
    color: "#89CFF0",
    imageUrl: _S("19_SCH", "Seraphism.png"),
  },
  // ── 점성술사 (AST) ────────────────────────────────────
  {
    name: "운명의 수레바퀴",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "외생기",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Collective_Unconscious.png"),
  },
  {
    name: "지상의 별",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "힐기",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Earthly_Star.png"),
  },
  {
    name: "천궁의 반목",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "힐기",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Celestial_Opposition.png"),
  },
  {
    name: "대우주",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "보호막",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Macrocosmos.png"),
  },
  {
    name: "상위 격상",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "즉발힐",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Exaltation.png"),
  },
  {
    name: "천궁의 교차",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "힐기",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Celestial_Intersection.png"),
  },
  {
    name: "태양궁",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "보호막",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Sun_Sign.png"),
  },
  {
    name: "하루별읽기",
    jobGroup: "힐러",
    jobClass: "점성술사",
    skillCategory: "기타",
    color: "#FFDAC1",
    imageUrl: _S("20_AST", "Neutral_Sect.png"),
  },
  // ── 현자 (SGE) ────────────────────────────────────────
  {
    name: "케이라콜레",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "외생기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Kerachole.png"),
  },
  {
    name: "혈액",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "보호막",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Haima.png"),
  },
  {
    name: "온혈액",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "보호막",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Panhaima.png"),
  },
  {
    name: "드루오콜레",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "즉발힐",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Druochole.png"),
  },
  {
    name: "타우로콜레",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "외생기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Taurochole.png"),
  },
  {
    name: "익소콜레",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "즉발힐",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Ixochole.png"),
  },
  {
    name: "체액 혼화",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "힐기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Krasis.png"),
  },
  {
    name: "전체론",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "외생기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Holos.png"),
  },
  {
    name: "생명력",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "기타",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Zoe.png"),
  },
  {
    name: "구조",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "힐기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Soteria.png"),
  },
  {
    name: "퓌시스 2",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "힐기",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Physis_II.png"),
  },
  {
    name: "소화작용",
    jobGroup: "힐러",
    jobClass: "현자",
    skillCategory: "즉발힐",
    color: "#A0C4FF",
    imageUrl: _S("21_SGE", "Pepsis.png"),
  },
  // ── 근거리 딜러 공통 (Role Action) ─────────────────────
  {
    name: "견제",
    jobGroup: "근거리 딜러",
    jobClass: "몽크",
    isCommon: true,
    skillCategory: "외생기",
    color: "#FFB3C6",
    imageUrl: _R("05_MNK", "Feint.png"),
  },
  // ── 몽크 (MNK) ────────────────────────────────────────
  {
    name: "만트라",
    jobGroup: "근거리 딜러",
    jobClass: "몽크",
    skillCategory: "힐기",
    color: "#FFB3C6",
    imageUrl: _S("05_MNK", "Mantra.png"),
  },
  {
    name: "금강의 극의",
    jobGroup: "근거리 딜러",
    jobClass: "몽크",
    skillCategory: "생존기",
    color: "#FFB3C6",
    imageUrl: _S("05_MNK", "Riddle_of_Earth.png"),
  },
  // ── 닌자 (NIN) ────────────────────────────────────────
  {
    name: "잔영",
    jobGroup: "근거리 딜러",
    jobClass: "닌자",
    skillCategory: "생존기",
    color: "#6BCB77",
    imageUrl: _S("09_NIN", "Shade_Shift.png"),
  },
  // ── 사무라이 (SAM) ────────────────────────────────────
  {
    name: "천안통",
    jobGroup: "근거리 딜러",
    jobClass: "사무라이",
    skillCategory: "생존기",
    color: "#F4A261",
    imageUrl: _S("06_SAM", "Tengentsu.png"),
  },
  // ── 리퍼 (RPR) ────────────────────────────────────────
  {
    name: "신비의 문장",
    jobGroup: "근거리 딜러",
    jobClass: "리퍼",
    skillCategory: "보호막",
    color: "#9D4EDD",
    imageUrl: _S("08_RPR", "Arcane_Crest.png"),
  },
  // ── 유격대 ────────────────────────────────────────────
  {
    name: "방랑하는 음악가",
    jobGroup: "유격대",
    jobClass: "음유시인",
    skillCategory: "외생기",
    color: "#FFD700",
    imageUrl: _S("11_BRD", "Troubadour.png"),
  },
  {
    name: "책략가",
    jobGroup: "유격대",
    jobClass: "기공사",
    skillCategory: "외생기",
    color: "#6BCB77",
    imageUrl: _S("12_MCH", "Tactician.png"),
  },
  {
    name: "수세의 삼바",
    jobGroup: "유격대",
    jobClass: "무도가",
    skillCategory: "외생기",
    color: "#FFB3C6",
    imageUrl: _S("13_DNC", "Shield_Samba.png"),
  },
  {
    name: "대지신의 연가",
    jobGroup: "유격대",
    jobClass: "음유시인",
    skillCategory: "힐기",
    color: "#FFD700",
    imageUrl: _S("11_BRD", "Nature's_Minne.png"),
  },
  {
    name: "치유의 왈츠",
    jobGroup: "유격대",
    jobClass: "무도가",
    skillCategory: "힐기",
    color: "#FFB3C6",
    imageUrl: _S("13_DNC", "Curing_Waltz.png"),
  },
  {
    name: "즉흥 연기",
    jobGroup: "유격대",
    jobClass: "무도가",
    skillCategory: "보호막",
    color: "#9D4EDD",
    imageUrl: _S("13_DNC", "Improvisation.png"),
  },
  {
    name: "무기파괴",
    jobGroup: "유격대",
    jobClass: "기공사",
    skillCategory: "외생기",
    color: "#6BCB77",
    imageUrl: _S("12_MCH", "Dismantle.png"),
  },
  // ── 마법 딜러 공통 (Role Action) ───────────────────────
  {
    name: "정신교란",
    jobGroup: "마법 딜러",
    jobClass: "흑마도사",
    isCommon: true,
    skillCategory: "외생기",
    color: "#C7CEEA",
    imageUrl: _R("14_BLM", "Addle.png"),
  },
  // ── 소환사 (SMN) ──────────────────────────────────────
  {
    name: "수호의 빛",
    jobGroup: "마법 딜러",
    jobClass: "소환사",
    skillCategory: "보호막",
    color: "#FFDAC1",
    imageUrl: _S("15_SMN", "Radiant_Aegis.png"),
  },
  // ── 적마도사 (RDM) ────────────────────────────────────
  {
    name: "바매직",
    jobGroup: "마법 딜러",
    jobClass: "적마도사",
    skillCategory: "외생기",
    color: "#FF9999",
    imageUrl: _S("16_RDM", "Magick_Barrier.png"),
  },
  // ── 픽토맨서 (PCT) ────────────────────────────────────
  {
    name: "템페라 밑칠",
    jobGroup: "마법 딜러",
    jobClass: "픽토맨서",
    skillCategory: "보호막",
    color: "#89CFF0",
    imageUrl: _S("17_PCT", "Tempera_Coat.png"),
  },
];

const DIFFICULTIES = ["영웅", "극", "절"];

const DIFF_CLASS = {
  절: "badge-절",
  "영웅+(세계최초)": "badge-영웅\\+",
  영웅: "badge-영웅",
  극: "badge-극",
  일반: "badge-일반",
};

const COLORS = [
  "#89CFF0",
  "#B5EAD7",
  "#FFDAC1",
  "#C7CEEA",
  "#FFB3C6",
  "#FFD700",
  "#6BCB77",
  "#4D96FF",
  "#F4A261",
  "#A0C4FF",
];

const DEFAULT_LINKS = [
  { id: 1, label: "xivanalysis", url: "https://xivanalysis.com/", icon: "📊" },
  { id: 2, label: "Raidplan.io", url: "https://raidplan.io/", icon: "🗺️" },
];

// 타임라인 컬럼 정의 (시트 가져오기 매핑에 사용)
const TIMELINE_MAP_COLUMNS = [
  { key: "startTime", label: "시작시간" },
  { key: "endTime", label: "종료시간" },
  { key: "phase", label: "기술명" },
  { key: "skillType", label: "구분" },
  { key: "notes", label: "비고" },
  { key: "memo", label: "메모" },
];

// ══════════════════════════════════════════════════════════
// SHARE LINK ENCODE / DECODE (URL-safe base64)
// ══════════════════════════════════════════════════════════
function btoaUrlSafe(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function atobUrlSafe(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return atob(str);
}

function encodeShareData(contentId, hiddenColsArr = []) {
  const content = Contents.get(contentId);
  if (!content) return null;
  const entries = Timeline.list(contentId)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const allMits = GlobalMit.list();
  const mitsAssigned = Mits.list(contentId);
  const entriesWithMits = entries.map((e) => {
    const mitsSnap = mitsAssigned
      .filter((a) => a.entryId === e.id)
      .map((a) => {
        const m = allMits.find((gm) => gm.id === a.gid);
        return m
          ? { name: m.name, jobGroup: m.jobGroup || "기타", icon: m.icon || "" }
          : null;
      })
      .filter(Boolean);
    return { ...e, _mits: mitsSnap };
  });
  const compactEntries = entriesWithMits.map((e) => {
    const o = {};
    if (e.startTime) o.s = e.startTime;
    if (e.endTime) o.e = e.endTime;
    if (e.phase) o.p = e.phase;
    if (e.skillType) o.sk = e.skillType;
    if (e.skillTypeCustom) o.skc = e.skillTypeCustom;
    if (e.notes) o.no = e.notes;
    if (e.memo) o.mo = e.memo;
    if (e.type) o.ty = e.type;
    if (e.label) o.lb = e.label;
    if (e.custom && Object.keys(e.custom).length) o.cu = e.custom;
    if (e._mits && e._mits.length)
      o.mi = e._mits.map((m) => [
        m.name,
        m.jobGroup || "기타",
        m.icon || "",
        m.imageUrl || "",
      ]);
    return o;
  });
  const payload = {
    v: 2,
    n: content.name,
    d: content.difficulty,
    ...(content.description ? { de: content.description } : {}),
    t: content.themeColor || "#89CFF0",
    ...(content.customColumns && content.customColumns.length
      ? { cc: content.customColumns }
      : {}),
    ...(hiddenColsArr.length ? { hc: hiddenColsArr } : {}),
    e: compactEntries,
  };
  try {
    return btoaUrlSafe(unescape(encodeURIComponent(JSON.stringify(payload))));
  } catch {
    return null;
  }
}

function decodeShareData(encoded) {
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atobUrlSafe(encoded))));
    if (raw.v !== 2) return raw;
    return {
      name: raw.n,
      difficulty: raw.d,
      description: raw.de || "",
      theme: raw.t || "#89CFF0",
      customColumns: raw.cc || [],
      hiddenCols: raw.hc || [],
      entries: (raw.e || []).map((o) => ({
        startTime: o.s || "",
        endTime: o.e || "",
        phase: o.p || "",
        skillType: o.sk || "",
        skillTypeCustom: o.skc || "",
        notes: o.no || "",
        memo: o.mo || "",
        type: o.ty || "",
        label: o.lb || "",
        custom: o.cu,
        _mits: (o.mi || []).map((m) =>
          Array.isArray(m)
            ? {
                name: m[0],
                jobGroup: m[1] || "기타",
                icon: m[2] || "",
                imageUrl: m[3] || "",
              }
            : {
                name: m.n || "",
                jobGroup: m.j || "기타",
                icon: m.i || "",
                imageUrl: "",
              },
        ),
      })),
    };
  } catch {
    return null;
  }
}

// ══════════════════════════════════════════════════════════
// STORAGE
// ══════════════════════════════════════════════════════════
const DB = {
  get(key, fallback = []) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  nextId(arr) {
    return arr.length ? Math.max(...arr.map((i) => i.id)) + 1 : 1;
  },
};

const Contents = {
  list() {
    return DB.get("ff14_contents");
  },
  get(id) {
    return this.list().find((c) => c.id === id);
  },
  create(data) {
    const arr = this.list();
    const item = {
      id: DB.nextId(arr),
      themeColor: "#89CFF0",
      createdAt: new Date().toISOString(),
      ...data,
    };
    DB.set("ff14_contents", [...arr, item]);
    return item;
  },
  update(id, data) {
    DB.set(
      "ff14_contents",
      this.list().map((c) => (c.id === id ? { ...c, ...data } : c)),
    );
  },
  delete(id) {
    DB.set(
      "ff14_contents",
      this.list().filter((c) => c.id !== id),
    );
    ["ff14_timeline_", "ff14_sections_", "ff14_mits_"].forEach((p) =>
      localStorage.removeItem(p + id),
    );
  },
};

const Timeline = {
  list(cid) {
    return DB.get(`ff14_timeline_${cid}`);
  },
  create(cid, data) {
    const arr = this.list(cid);
    const item = {
      id: DB.nextId(arr),
      contentId: cid,
      order: arr.length,
      ...data,
    };
    DB.set(`ff14_timeline_${cid}`, [...arr, item]);
    return item;
  },
  update(cid, id, data) {
    DB.set(
      `ff14_timeline_${cid}`,
      this.list(cid).map((e) => (e.id === id ? { ...e, ...data } : e)),
    );
  },
  delete(cid, id) {
    DB.set(
      `ff14_timeline_${cid}`,
      this.list(cid).filter((e) => e.id !== id),
    );
    const mits = Mits.list(cid).filter((a) => a.entryId !== id);
    Mits.setAll(cid, mits);
  },
};

const GlobalMit = {
  list() {
    return DB.get("ff14_global_mits");
  },
  get(id) {
    return this.list().find((m) => m.id === id);
  },
  create(data) {
    const arr = this.list();
    const item = {
      id: DB.nextId(arr),
      color: "#89CFF0",
      order: arr.length,
      ...data,
    };
    DB.set("ff14_global_mits", [...arr, item]);
    return item;
  },
  update(id, data) {
    DB.set(
      "ff14_global_mits",
      this.list().map((m) => (m.id === id ? { ...m, ...data } : m)),
    );
  },
  delete(id) {
    DB.set(
      "ff14_global_mits",
      this.list().filter((m) => m.id !== id),
    );
  },
};

const Mits = {
  list(cid) {
    return DB.get(`ff14_mits_${cid}`);
  },
  setAll(cid, arr) {
    DB.set(`ff14_mits_${cid}`, arr);
  },
  assign(cid, entryId, gid) {
    const arr = this.list(cid);
    if (!arr.find((a) => a.entryId === entryId && a.gid === gid)) {
      DB.set(`ff14_mits_${cid}`, [
        ...arr,
        { id: DB.nextId(arr), entryId, gid },
      ]);
    }
  },
  unassign(cid, entryId, gid) {
    DB.set(
      `ff14_mits_${cid}`,
      this.list(cid).filter((a) => !(a.entryId === entryId && a.gid === gid)),
    );
  },
  isAssigned(cid, entryId, gid) {
    return this.list(cid).some((a) => a.entryId === entryId && a.gid === gid);
  },
};

// Sections: 블록 기반 + phase(구분) 타입 지원
// section.type: 'block' (기본) | 'phase' (큰 제목)
const Sections = {
  list(cid) {
    return DB.get(`ff14_sections_${cid}`);
  },
  get(cid, id) {
    return this.list(cid).find((s) => s.id === id);
  },
  create(cid, data) {
    const arr = this.list(cid);
    const item = {
      id: DB.nextId(arr),
      contentId: cid,
      order: arr.length,
      type: "block",
      rows: data.type === "phase" ? [] : [makeRow(1)],
      ...data,
    };
    DB.set(`ff14_sections_${cid}`, [...arr, item]);
    return item;
  },
  update(cid, id, data) {
    DB.set(
      `ff14_sections_${cid}`,
      this.list(cid).map((s) => (s.id === id ? { ...s, ...data } : s)),
    );
  },
  delete(cid, id) {
    DB.set(
      `ff14_sections_${cid}`,
      this.list(cid).filter((s) => s.id !== id),
    );
  },
};

const Notes = {
  list(cid) {
    return DB.get(`ff14_notes_${cid}`);
  },
  create(cid, data) {
    const arr = this.list(cid);
    const item = {
      id: DB.nextId(arr),
      photos: [],
      order: arr.length,
      createdAt: new Date().toLocaleString("ko-KR"),
      ...data,
    };
    DB.set(`ff14_notes_${cid}`, [...arr, item]);
    return item;
  },
  update(cid, id, data) {
    DB.set(
      `ff14_notes_${cid}`,
      this.list(cid).map((n) => (n.id === id ? { ...n, ...data } : n)),
    );
  },
  delete(cid, id) {
    DB.set(
      `ff14_notes_${cid}`,
      this.list(cid).filter((n) => n.id !== id),
    );
  },
  addPhoto(cid, id, imageData) {
    const notes = this.list(cid).map((n) => {
      if (n.id !== id) return n;
      const photos = [
        ...(n.photos || []),
        { id: DB.nextId(n.photos || []), imageData },
      ];
      return { ...n, photos };
    });
    DB.set(`ff14_notes_${cid}`, notes);
  },
  removePhoto(cid, noteId, photoId) {
    const notes = this.list(cid).map((n) => {
      if (n.id !== noteId) return n;
      return { ...n, photos: (n.photos || []).filter((p) => p.id !== photoId) };
    });
    DB.set(`ff14_notes_${cid}`, notes);
  },
  updatePhotoCaption(cid, noteId, photoId, caption) {
    const notes = this.list(cid).map((n) => {
      if (n.id !== noteId) return n;
      return {
        ...n,
        photos: (n.photos || []).map((p) =>
          p.id === photoId ? { ...p, caption } : p,
        ),
      };
    });
    DB.set(`ff14_notes_${cid}`, notes);
  },
};

const Links = {
  list() {
    const stored = DB.get("ff14_links", null);
    if (stored === null) {
      DB.set("ff14_links", DEFAULT_LINKS);
      return DEFAULT_LINKS;
    }
    return stored;
  },
  create(data) {
    const arr = this.list();
    const item = { id: DB.nextId(arr), icon: "🔗", ...data };
    DB.set("ff14_links", [...arr, item]);
    return item;
  },
  update(id, data) {
    DB.set(
      "ff14_links",
      this.list().map((l) => (l.id === id ? { ...l, ...data } : l)),
    );
  },
  delete(id) {
    DB.set(
      "ff14_links",
      this.list().filter((l) => l.id !== id),
    );
  },
};

const GroupIcons = {
  list() {
    return DB.get("ff14_group_icons", {});
  },
  get(g) {
    return this.list()[g] || null;
  },
  set(g, dataUrl) {
    const all = this.list();
    all[g] = dataUrl;
    DB.set("ff14_group_icons", all);
  },
  remove(g) {
    const all = this.list();
    delete all[g];
    DB.set("ff14_group_icons", all);
  },
};

const ClassIcons = {
  list() {
    return DB.get("ff14_class_icons", {});
  },
  get(cls) {
    return this.list()[cls] || null;
  },
  set(cls, dataUrl) {
    const all = this.list();
    all[cls] = dataUrl;
    DB.set("ff14_class_icons", all);
  },
  remove(cls) {
    const all = this.list();
    delete all[cls];
    DB.set("ff14_class_icons", all);
  },
};

// ── GlobalMode singleton (이동 / 삭제 모드) ────────────
const GlobalMode = {
  _m: null,
  set(m) {
    this._m = this._m === m ? null : m;
  },
  get() {
    return this._m;
  },
  reset() {
    this._m = null;
  },
};

// ── Section row/cell helpers ──────────────────────────
function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function makeCell(type = "text") {
  return { id: genId(), type, content: "", imageData: null };
}

function makeRow(columns = 1) {
  return {
    id: genId(),
    columns,
    cells: Array.from({ length: columns }, () => makeCell("text")),
  };
}

// ── Theme color helper ────────────────────────────────
function applyTheme(hex) {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let hh = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          hh = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          hh = ((b - r) / d + 2) / 6;
          break;
        case b:
          hh = ((r - g) / d + 4) / 6;
          break;
      }
    }
    const H = Math.round(hh * 360),
      S = Math.round(s * 100),
      L = Math.round(l * 100);
    const root = document.documentElement;
    root.style.setProperty("--primary", `hsl(${H},${S}%,${L}%)`);
    root.style.setProperty(
      "--primary-hover",
      `hsl(${H},${S}%,${Math.max(L - 7, 10)}%)`,
    );
    root.style.setProperty(
      "--primary-light",
      `hsl(${H},${Math.min(S + 10, 100)}%,${Math.min(L + 35, 95)}%)`,
    );
    root.style.setProperty(
      "--primary-pale",
      `hsl(${H},${Math.min(S + 10, 100)}%,${Math.min(L + 42, 98)}%)`,
    );
  } catch (e) {}
}

// ══════════════════════════════════════════════════════════
// ROUTER
// ══════════════════════════════════════════════════════════
let currentRoute = null;

function navigate(hash) {
  const path = (hash || "#/").replace(/^#/, "") || "/";
  currentRoute = path;
  GlobalMode.reset();
  const navBackup = document.getElementById("nav-backup-btn");
  if (navBackup) navBackup.style.display = "none";

  document.querySelectorAll(".nav-link").forEach((a) => {
    const r = a.dataset.route;
    a.classList.remove("active");
    if (path === "/" && r === "/") a.classList.add("active");
    if (path === "/library" && r === "/library") a.classList.add("active");
    if (path === "/links" && r === "/links") a.classList.add("active");
  });

  const main = document.getElementById("main");
  const m = path.match(/^\/content\/(\d+)/);
  const shareM = path.match(/^\/share\/(.+)/);
  if (m) {
    renderContentDetail(main, parseInt(m[1]));
  } else if (shareM) {
    renderShareView(main, shareM[1]);
  } else if (path === "/library") {
    renderLibrary(main);
  } else if (path === "/links") {
    renderLinks(main);
  } else {
    renderHome(main);
  }
}

// ══════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el[k] = v;
    else if (v === false || v === null || v === undefined)
      el.removeAttribute(k);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, v);
  }
  children.forEach((c) => {
    if (c == null) return;
    el.append(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return el;
}

function diffBadge(diff) {
  const cls = DIFF_CLASS[diff] || "badge-일반";
  return h("span", { class: `badge ${cls}` }, diff);
}

function mitIcon(item, size = 28) {
  const color = item.color || "#89CFF0";
  const el = h("div", {
    class: "mit-icon",
    style: `width:${size}px;height:${size}px;background:${color}33;border-color:${color};`,
    title: item.name,
  });
  if (item.imageUrl) {
    el.append(h("img", { src: item.imageUrl, alt: item.name }));
  } else {
    el.textContent = item.name.slice(0, 1);
    el.style.fontSize = `${Math.floor(size * 0.42)}px`;
    el.style.fontWeight = "700";
    el.style.color = color;
  }
  return el;
}

function showModal(
  titleText,
  bodyEl,
  { onConfirm, confirmLabel = "저장", noCancelBtn = false } = {},
) {
  const overlay = document.getElementById("modal-overlay");
  const box = document.getElementById("modal-content");

  const header = h(
    "div",
    { class: "modal-header" },
    h("span", { class: "modal-title" }, titleText),
    h("button", { class: "modal-close", onclick: () => App.closeModal() }, "×"),
  );
  const body = h("div", { class: "modal-body" });
  body.append(bodyEl);

  const footer = h("div", { class: "modal-footer" });
  if (!noCancelBtn)
    footer.append(
      h(
        "button",
        { class: "btn btn-outline", onclick: () => App.closeModal() },
        "취소",
      ),
    );
  if (onConfirm)
    footer.append(
      h(
        "button",
        { class: "btn btn-primary", onclick: onConfirm },
        confirmLabel,
      ),
    );

  box.innerHTML = "";
  box.append(header, body, footer);
  overlay.classList.remove("hidden");
}

// ══════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════
function renderHome(main) {
  let search = "";

  function rebuild() {
    main.innerHTML = "";
    const contents = Contents.list().filter(
      (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()),
    );

    const headerEl = h(
      "div",
      { class: "page-header" },
      h(
        "div",
        {},
        h("h1", { class: "page-title" }, "공략 목록"),
        h(
          "p",
          { class: "page-subtitle" },
          "레이드 공략과 전략을 기록하고 공유해요!",
        ),
      ),
      h(
        "div",
        { class: "search-bar" },
        h(
          "div",
          { class: "search-input-wrap" },
          h("span", { class: "search-icon" }, "🔍"),
          Object.assign(
            h("input", {
              class: "search-input",
              type: "text",
              placeholder: "공략 검색...",
            }),
            {
              oninput(e) {
                search = e.target.value;
                rebuild();
              },
              value: search,
            },
          ),
        ),
        h(
          "button",
          { class: "btn btn-outline", onclick: () => openGlobalBackupModal() },
          "💾 백업/복원",
        ),
        h(
          "button",
          { class: "btn btn-primary", onclick: () => openContentForm() },
          "+ 새 공략",
        ),
      ),
    );

    main.append(headerEl);

    if (!contents.length) {
      main.append(
        h(
          "div",
          { class: "empty-state" },
          h("div", { class: "empty-state-icon" }, "📋"),
          h(
            "div",
            { class: "empty-state-title" },
            search ? "검색 결과가 없어요" : "등록된 공략이 없어요!",
          ),
          h(
            "div",
            { class: "empty-state-desc" },
            "+ 새 공략 버튼으로 첫 공략을 등록해 보세요.",
          ),
        ),
      );
      return;
    }

    const grid = h("div", { class: "content-grid" });
    contents
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach((c) => {
        const tlCount = Timeline.list(c.id).length;
        const scCount = Sections.list(c.id).length;
        const card = h(
          "div",
          {
            class: "card content-card",
            style: `background:linear-gradient(135deg,${c.themeColor}22 0%,${c.themeColor}08 100%);border-color:${c.themeColor}44;`,
            onclick: () => {
              location.hash = `#/content/${c.id}`;
            },
          },
          h(
            "div",
            { class: "content-card-header" },
            diffBadge(c.difficulty),
            h(
              "span",
              { class: "text-sm text-muted" },
              new Date(c.createdAt).toLocaleDateString("ko-KR"),
            ),
          ),
          h("div", { class: "content-card-title" }, c.name),
          c.description
            ? h("div", { class: "content-card-desc" }, c.description)
            : null,
          h(
            "div",
            { class: "content-card-meta" },
            h("span", {}, "🕐 타임라인 " + tlCount + "개"),
            h("span", {}, "📖 공략 " + scCount + "개"),
            h(
              "span",
              {
                style: "margin-left:auto;display:flex;gap:4px;",
                onclick: (e) => e.stopPropagation(),
              },
              h(
                "button",
                {
                  class: "btn-icon",
                  title: "수정",
                  onclick: () => openContentForm(c),
                },
                "✏️",
              ),
              h(
                "button",
                {
                  class: "btn-icon",
                  title: "삭제",
                  onclick: () => deleteContent(c.id),
                },
                "🗑️",
              ),
            ),
          ),
        );
        grid.append(card);
      });
    main.append(grid);
  }

  rebuild();
}

function openContentForm(existing = null) {
  const form = h("div", {});
  const nameInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예) 절 케프카 토벌전",
      value: existing?.name || "",
    }),
  );
  const diffSelect = h("select", { class: "form-select" });
  DIFFICULTIES.forEach((d) => {
    const opt = h("option", { value: d }, d);
    if ((existing?.difficulty || "절") === d) opt.selected = true;
    diffSelect.append(opt);
  });
  const descInput = Object.assign(
    h("textarea", {
      class: "form-textarea",
      placeholder: "공략 설명...",
      style: "min-height:80px",
    }),
  );
  descInput.value = existing?.description || "";
  const colorInput = Object.assign(
    h("input", {
      class: "theme-color-input",
      type: "color",
      value: existing?.themeColor || "#89CFF0",
    }),
  );

  form.append(
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "공략 이름 *"),
      nameInput,
    ),
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "난이도"),
        diffSelect,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "테마 색상"),
        colorInput,
      ),
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "설명"),
      descInput,
    ),
  );

  showModal(existing ? "공략 수정" : "새 공략 등록", form, {
    confirmLabel: "저장",
    onConfirm: () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.focus();
        return;
      }
      const data = {
        name,
        difficulty: diffSelect.value,
        description: descInput.value.trim(),
        themeColor: colorInput.value,
      };
      if (existing) Contents.update(existing.id, data);
      else Contents.create(data);
      App.closeModal();
      navigate(location.hash || "#/");
    },
  });
  setTimeout(() => nameInput.focus(), 50);
}

function deleteContent(id) {
  if (
    !confirm(
      "공략을 삭제하면 타임라인, 상세공략 데이터도 모두 삭제됩니다. 계속할까요?",
    )
  )
    return;
  Contents.delete(id);
  navigate("#/");
}

// ══════════════════════════════════════════════════════════
// CONTENT DETAIL PAGE
// ══════════════════════════════════════════════════════════
let detailTab = "timeline";

function renderContentDetail(main, contentId) {
  const content = Contents.get(contentId);
  if (!content) {
    main.innerHTML =
      '<p style="padding:40px;text-align:center;color:var(--muted-fg)">공략을 찾을 수 없습니다.</p>';
    return;
  }

  main.innerHTML = "";
  detailTab = detailTab || "timeline";

  const theme = content.themeColor || "#89CFF0";
  const diffCls = DIFF_CLASS[content.difficulty] || "badge-일반";

  applyTheme(theme);

  const colorInput = Object.assign(
    h("input", {
      class: "theme-color-input",
      type: "color",
      value: theme,
      title: "테마 색상",
    }),
  );
  colorInput.onchange = (e) => {
    const newColor = e.target.value;
    Contents.update(contentId, { themeColor: newColor });
    headerEl.style.background = `linear-gradient(135deg,${newColor}22 0%,${newColor}08 100%)`;
    headerEl.style.borderColor = `${newColor}44`;
    applyTheme(newColor);
  };

  const headerEl = h(
    "div",
    {
      class: "detail-header",
      style: `background:linear-gradient(135deg,${theme}22 0%,${theme}08 100%);border-color:${theme}44;`,
    },
    h(
      "div",
      { class: "detail-header-top" },
      h(
        "div",
        { style: "flex:1" },
        h(
          "div",
          { class: "detail-meta" },
          h("span", { class: `badge ${diffCls}` }, content.difficulty),
          h(
            "span",
            { class: "text-sm text-muted" },
            new Date(content.createdAt).toLocaleDateString("ko-KR") + " 등록",
          ),
        ),
        h("h1", { class: "detail-title" }, content.name),
        content.description
          ? h("p", { class: "detail-desc" }, content.description)
          : null,
      ),
      h(
        "div",
        { class: "theme-picker-wrap" },
        h("span", {}, "테마 색상"),
        colorInput,
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            onclick: () => {
              App.closeModal();
              openContentForm(content);
            },
          },
          "✏️ 수정",
        ),
      ),
    ),
  );

  const tabsEl = h("div", { class: "tabs" });
  const tabContent = h("div", {});

  function setTab(tab) {
    detailTab = tab;
    tabsEl
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    tabContent.innerHTML = "";
    if (tab === "timeline") renderTimelineTab(tabContent, contentId);
    else if (tab === "sections") renderSectionsTab(tabContent, contentId);
    else renderNotes(tabContent, contentId);
  }

  function activateMode(m) {
    GlobalMode.set(m);
    setTab(detailTab);
    const isMove = GlobalMode.get() === "move";
    const isDelete = GlobalMode.get() === "delete";
    moveModeBtn.classList.toggle("mode-active", isMove);
    deleteModeBtn.classList.toggle("mode-active", isDelete);
    moveModeBtn.style.color = isMove ? "var(--primary)" : "";
    deleteModeBtn.style.color = isDelete ? "var(--destructive)" : "";
  }

  const moveModeBtn = h(
    "button",
    {
      class: "btn btn-outline btn-sm mode-btn",
      title: "이동 모드",
      onclick: () => activateMode("move"),
    },
    "↕ 이동",
  );
  const deleteModeBtn = h(
    "button",
    {
      class: "btn btn-outline btn-sm mode-btn",
      title: "삭제 모드",
      onclick: () => activateMode("delete"),
    },
    "🗑 삭제",
  );

  const pickerWrap = headerEl.querySelector(".theme-picker-wrap");
  if (pickerWrap) {
    pickerWrap.append(moveModeBtn, deleteModeBtn);
  }

  // 네비 백업 버튼 연결
  const navBackup = document.getElementById("nav-backup-btn");
  if (navBackup) {
    navBackup.style.display = "inline-flex";
    navBackup.onclick = () => openBackupModal(contentId);
  }

  [
    ["⏱ 타임라인", "timeline"],
    ["📖 상세 공략", "sections"],
    ["📝 오답노트", "notes"],
  ].forEach(([label, id]) => {
    const btn = h(
      "button",
      {
        class: "tab-btn" + (detailTab === id ? " active" : ""),
        "data-tab": id,
      },
      label,
    );
    btn.onclick = () => {
      GlobalMode.reset();
      moveModeBtn.classList.remove("mode-active");
      moveModeBtn.style.color = "";
      deleteModeBtn.classList.remove("mode-active");
      deleteModeBtn.style.color = "";
      setTab(id);
    };
    tabsEl.append(btn);
  });

  main.append(headerEl, tabsEl, tabContent);
  setTab(detailTab);
}

// ══════════════════════════════════════════════════════════
// TIMELINE TAB
// 수정: 시작시간/종료시간 분리, 시트 가져오기 버튼 추가
// ══════════════════════════════════════════════════════════
function renderTimelineTab(container, contentId) {
  container.innerHTML = "";
  let tbody;
  let mitFilter = "all";
  let mitSubFilter = null;
  let deleteMode = GlobalMode.get() === "delete";
  let moveMode = GlobalMode.get() === "move";
  let selectedIds = new Set();
  let hiddenCols = new Set();

  function applyHiddenCols() {
    container.querySelectorAll("[data-col-key]").forEach((el) => {
      el.style.display = hiddenCols.has(el.dataset.colKey) ? "none" : "";
    });
    container.querySelectorAll("th[data-col-key]").forEach((th) => {
      th.classList.toggle("col-hidden", hiddenCols.has(th.dataset.colKey));
    });
  }

  function isLocked() {
    return !!(Contents.get(contentId) || {}).timelineLocked;
  }

  function updateDeleteBtn() {
    const btn = container.querySelector(".del-selected-btn");
    if (btn) btn.textContent = `선택 삭제 (${selectedIds.size}개)`;
  }

  function rebuild() {
    deleteMode = GlobalMode.get() === "delete";
    moveMode = GlobalMode.get() === "move";
    container.innerHTML = "";
    selectedIds = new Set();
    const content = Contents.get(contentId);
    const locked = !!(content || {}).timelineLocked;
    const customCols = (content && content.customColumns) || [];
    const entries = Timeline.list(contentId)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const totalCols = (deleteMode ? 9 : 8) + customCols.length;

    // 사용 중인 직업군 계산 (필터 바용)
    const allMitAssignments = Mits.list(contentId);
    const allGlobalMits = GlobalMit.list();
    const usedGroups = [
      ...new Set(
        allMitAssignments
          .map((a) => {
            const m = allGlobalMits.find((gm) => gm.id === a.gid);
            return m ? m.jobGroup || "기타" : null;
          })
          .filter(Boolean),
      ),
    ];

    // ── 도구박스 빌드 ───────────────────────────────────────
    const toolboxBody = h("div", { class: "toolbox-body" });

    toolboxBody.append(
      h(
        "button",
        {
          class: "toolbox-btn" + (locked ? " toolbox-btn-active" : ""),
          onclick: () => {
            Contents.update(contentId, { timelineLocked: !locked });
            rebuild();
          },
        },
        locked ? "🔓 잠금 해제" : "🔒 잠금",
      ),
    );

    const shareToolBtn = h(
      "button",
      {
        class: "toolbox-btn",
        onclick: () => {
          const ents = Timeline.list(contentId);
          if (!ents.length) {
            alert("공유할 타임라인 행이 없어요.");
            return;
          }
          const encoded = encodeShareData(contentId, [...hiddenCols]);
          if (!encoded) {
            alert("인코딩 오류가 발생했어요.");
            return;
          }
          const base = location.href.replace(/#.*$/, "");
          const url = `${base}#/share/${encoded}`;
          navigator.clipboard
            .writeText(url)
            .then(() => {
              shareToolBtn.textContent = "✅ 복사됨!";
              setTimeout(() => {
                shareToolBtn.textContent = "🔗 공유 링크";
              }, 2500);
            })
            .catch(() => {
              prompt("링크:", url);
            });
        },
      },
      "🔗 공유 링크",
    );
    toolboxBody.append(shareToolBtn);

    if (!locked) {
      toolboxBody.append(
        h(
          "button",
          {
            class: "toolbox-btn",
            onclick: () => openSheetImportModal(contentId, customCols, rebuild),
          },
          "📥 시트 가져오기",
        ),
        h(
          "button",
          {
            class: "toolbox-btn",
            onclick: () => openCustomColumnModal(contentId, rebuild),
          },
          "+ 열",
        ),
        h(
          "button",
          {
            class: "toolbox-btn toolbox-btn-primary",
            onclick: () => {
              tbody?.querySelector("tr.timeline-add-row")?.remove();
              tbody?.append(
                buildTimelineInlineRow(contentId, customCols, rebuild),
              );
              tbody?.querySelector(".timeline-add-row .inline-input")?.focus();
            },
          },
          "+ 행",
        ),
        h(
          "button",
          {
            class: "toolbox-btn",
            onclick: () => openDividerForm(contentId, rebuild),
          },
          "— 구분선",
        ),
      );
    }

    if (deleteMode) {
      toolboxBody.append(
        h("div", { class: "toolbox-sep" }),
        h(
          "button",
          {
            class: "toolbox-btn",
            onclick: () => {
              selectedIds = new Set(
                entries.filter((e) => e.type !== "divider").map((e) => e.id),
              );
              container.querySelectorAll(".del-row-cb").forEach((cb) => {
                cb.checked = true;
              });
              updateDeleteBtn();
            },
          },
          "☑ 모두 선택",
        ),
        h(
          "button",
          {
            class: "toolbox-btn toolbox-btn-danger del-selected-btn",
            onclick: () => {
              if (!selectedIds.size) {
                alert("삭제할 행을 선택하세요.");
                return;
              }
              if (!confirm(`${selectedIds.size}개 행을 삭제할까요?`)) return;
              selectedIds.forEach((id) => Timeline.delete(contentId, id));
              GlobalMode.reset();
              rebuild();
            },
          },
          `선택 삭제 (0개)`,
        ),
        h(
          "button",
          {
            class: "toolbox-btn",
            onclick: () => {
              GlobalMode.reset();
              rebuild();
            },
          },
          "✕ 취소",
        ),
      );
    }

    let toolboxOpen = true;
    const toolboxTitle = h("span", { class: "jump-sidebar-title" }, "🛠 도구");
    const toolboxToggle = h("button", { class: "toc-toggle-btn" }, "▶");
    toolboxToggle.onclick = () => {
      toolboxOpen = !toolboxOpen;
      toolboxSection.classList.toggle("collapsed", !toolboxOpen);
      toolboxToggle.textContent = toolboxOpen ? "▶" : "◀";
      toolboxTitle.style.display = toolboxOpen ? "" : "none";
      toolboxBody.style.display = toolboxOpen ? "" : "none";
    };
    const toolboxSection = h(
      "div",
      { class: "jump-sidebar" },
      h("div", { class: "jump-sidebar-header" }, toolboxTitle, toolboxToggle),
      toolboxBody,
    );

    // 외생기 직군/직업 필터 바
    // 2개 이상 직군 배치 또는 같은 직군 내 여러 직업 배치 시 표시
    const usedClassesMap = {};
    allMitAssignments.forEach((a) => {
      const m = allGlobalMits.find((gm) => gm.id === a.gid);
      if (!m) return;
      const g = m.jobGroup || "기타";
      if (!usedClassesMap[g]) usedClassesMap[g] = new Set();
      usedClassesMap[g].add(m.jobClass || "");
    });

    const showFilter =
      usedGroups.length > 1 ||
      Object.values(usedClassesMap).some((cs) => cs.size > 1);

    let filterBar = null;
    if (showFilter) {
      const filterRows = [];

      // 직군 필터 행 (2개 이상 직군일 때만)
      if (usedGroups.length > 1) {
        const mainFilterRow = h(
          "div",
          { class: "mit-filter-bar" },
          h("span", { class: "mit-filter-label" }, "🔍 외생기 직군:"),
          h(
            "button",
            {
              class: "mit-filter-btn" + (mitFilter === "all" ? " active" : ""),
              onclick: () => {
                mitFilter = "all";
                mitSubFilter = null;
                rebuild();
              },
            },
            "모두",
          ),
          ...usedGroups.map((g) =>
            h(
              "button",
              {
                class: "mit-filter-btn" + (mitFilter === g ? " active" : ""),
                onclick: () => {
                  if (mitFilter === g) {
                    mitFilter = "all";
                    mitSubFilter = null;
                  } else {
                    mitFilter = g;
                    mitSubFilter = null;
                  }
                  rebuild();
                },
              },
              `${g}만`,
            ),
          ),
        );
        filterRows.push(mainFilterRow);
      }

      // 직업 서브필터 행: 선택된 직군(또는 유일한 직군)에 여러 직업이 있을 때 표시
      const subFilterGroup =
        mitFilter !== "all"
          ? mitFilter
          : usedGroups.length === 1
            ? usedGroups[0]
            : null;
      if (
        subFilterGroup &&
        usedClassesMap[subFilterGroup] &&
        usedClassesMap[subFilterGroup].size > 1
      ) {
        const subClasses = [...usedClassesMap[subFilterGroup]].filter(Boolean);
        const label =
          usedGroups.length > 1 ? `↳ ${subFilterGroup}:` : "🔍 외생기 직업:";
        const subRow = h(
          "div",
          {
            class:
              "mit-filter-bar" +
              (usedGroups.length > 1 ? " mit-filter-sub" : ""),
          },
          h("span", { class: "mit-filter-label" }, label),
          h(
            "button",
            {
              class:
                "mit-filter-btn mit-filter-sub-btn" +
                (!mitSubFilter ? " active" : ""),
              onclick: () => {
                mitSubFilter = null;
                rebuild();
              },
            },
            "전체",
          ),
          ...subClasses.map((cls) =>
            h(
              "button",
              {
                class:
                  "mit-filter-btn mit-filter-sub-btn" +
                  (mitSubFilter === cls ? " active" : ""),
                onclick: () => {
                  mitSubFilter = cls;
                  rebuild();
                },
              },
              `${cls}만`,
            ),
          ),
        );
        filterRows.push(subRow);
      }

      filterBar = h("div", { class: "mit-filter-wrap" }, ...filterRows);
    }

    const wrap = h("div", { class: "timeline-table-wrap" });
    const table = h("table", { class: "timeline-table" });

    const theadCells = [];
    if (deleteMode) theadCells.push(h("th", { style: "width:32px;" }, ""));
    function colTh(key, label) {
      const th = h(
        "th",
        {
          "data-col-key": key,
          class: deleteMode ? "col-th-toggle" : "",
          title: deleteMode ? "클릭: 열 숨기기/보이기" : label,
        },
        label,
      );
      if (deleteMode) {
        th.onclick = () => {
          if (hiddenCols.has(key)) hiddenCols.delete(key);
          else hiddenCols.add(key);
          applyHiddenCols();
        };
      }
      return th;
    }
    theadCells.push(
      colTh("startTime", "시작시간"),
      colTh("endTime", "종료시간"),
      colTh("phase", "기술명"),
      colTh("skillType", "구분"),
      colTh("notes", "비고"),
      colTh("__mits", "외생기"),
      colTh("memo", "메모"),
      ...customCols.map((col) => {
        const delBtn = h(
          "button",
          {
            class: "col-del-btn",
            title: "열 삭제",
            onclick: (e) => {
              e.stopPropagation();
              if (!confirm(`"${col.name}" 열을 삭제할까요?`)) return;
              const c = Contents.get(contentId);
              Contents.update(contentId, {
                customColumns: (c.customColumns || []).filter(
                  (cc) => cc.id !== col.id,
                ),
              });
              rebuild();
            },
          },
          "×",
        );
        return h(
          "th",
          { "data-col-key": `custom:${col.id}` },
          col.name,
          delBtn,
        );
      }),
      h("th", { style: "width:36px;" }, ""),
    );
    const thead = h("thead", {}, h("tr", {}, ...theadCells));
    table.append(thead);

    tbody = h("tbody", {});
    if (!entries.length) {
      tbody.append(
        h(
          "tr",
          { class: "empty-row" },
          h(
            "td",
            {
              colspan: String(totalCols),
              style: "text-align:center;padding:32px;color:var(--muted-fg)",
            },
            "↑ 행 추가 버튼을 눌러 타임라인을 작성해 보세요",
          ),
        ),
      );
    } else {
      entries.forEach((entry) => {
        const row = buildTimelineRow(
          entry,
          contentId,
          customCols,
          mitFilter,
          mitSubFilter,
          rebuild,
          moveMode,
          locked,
          deleteMode,
        );
        if (deleteMode && entry.type !== "divider") {
          const cb = h("input", { type: "checkbox", class: "del-row-cb" });
          cb.onchange = () => {
            if (cb.checked) selectedIds.add(entry.id);
            else selectedIds.delete(entry.id);
            updateDeleteBtn();
          };
          row.insertBefore(h("td", { class: "del-cb-td" }, cb), row.firstChild);
        }
        tbody.append(row);
      });
      if (moveMode) applyDragDrop(tbody, contentId, entries, rebuild);
    }
    table.append(tbody);
    wrap.append(table);

    // ── 레이아웃 조립 ───────────────────────────────────────
    const dividers = entries.filter((e) => e.type === "divider");

    const mainArea = h("div", { class: "timeline-main" });
    mainArea.append(wrap);

    if (filterBar) container.append(filterBar);

    const rightCol = h("div", { class: "timeline-right-col" });
    rightCol.append(toolboxSection);

    if (dividers.length) {
      const btnList = h("div", { class: "jump-sidebar-list" });
      dividers.forEach((d) => {
        const btn = h(
          "button",
          { class: "jump-sidebar-btn" },
          d.label || "──────",
        );
        btn.onclick = () => {
          const row = wrap.querySelector(`tr[data-entry-id="${d.id}"]`);
          if (!row) return;
          row.scrollIntoView({ behavior: "smooth", block: "center" });
          wrap
            .querySelectorAll("tr.jump-highlight")
            .forEach((r) => r.classList.remove("jump-highlight"));
          let next = row.nextElementSibling;
          let count = 0;
          while (next && count < 3) {
            if (!next.classList.contains("divider-row")) {
              next.classList.add("jump-highlight");
              count++;
            }
            next = next.nextElementSibling;
          }
          setTimeout(() => {
            wrap
              .querySelectorAll("tr.jump-highlight")
              .forEach((r) => r.classList.remove("jump-highlight"));
          }, 1800);
        };
        btnList.append(btn);
      });

      let jumpCollapsed = false;
      const jumpTitle = h("span", { class: "jump-sidebar-title" }, "↓ 이동");
      const jumpToggle = h(
        "button",
        { class: "toc-toggle-btn", title: "접기/펼치기" },
        "▶",
      );
      jumpToggle.onclick = () => {
        jumpCollapsed = !jumpCollapsed;
        jumpSidebar.classList.toggle("collapsed", jumpCollapsed);
        jumpToggle.textContent = jumpCollapsed ? "◀" : "▶";
        jumpTitle.style.display = jumpCollapsed ? "none" : "";
        btnList.style.display = jumpCollapsed ? "none" : "";
      };
      const jumpSidebar = h(
        "div",
        { class: "jump-sidebar" },
        h("div", { class: "jump-sidebar-header" }, jumpTitle, jumpToggle),
        btnList,
      );
      rightCol.append(jumpSidebar);
    }

    const layout = h("div", { class: "timeline-layout" });
    layout.append(mainArea, rightCol);
    container.append(layout);
    applyHiddenCols();
  }

  rebuild();
}

function buildTimelineInlineRow(contentId, customCols, rebuild) {
  const tr = h("tr", { class: "timeline-add-row" });

  const startInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "0:00",
  });
  const endInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "0:10",
  });
  const phaseInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "예)거울 나라",
  });

  const skillSel = h("select", { class: "inline-select" });
  const customInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "직접 입력",
    style: "display:none;margin-top:3px;",
  });
  [
    { value: "", label: "(없음)" },
    ...SKILL_TYPES.map((t) => ({ value: t, label: t })),
  ].forEach(({ value, label }) => {
    skillSel.append(h("option", { value }, label));
  });
  skillSel.onchange = () => {
    customInput.style.display = skillSel.value === "기타" ? "" : "none";
  };
  const skillWrap = h(
    "div",
    { style: "display:flex;flex-direction:column;gap:2px;" },
    skillSel,
    customInput,
  );

  const notesInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "비고",
  });
  const memoInput = h("input", {
    class: "inline-input",
    type: "text",
    placeholder: "메모",
  });
  const customInputs = (customCols || []).map((col) =>
    h("input", { class: "inline-input", type: "text", placeholder: col.name }),
  );

  function save() {
    const startTime = startInput.value.trim();
    const phase = phaseInput.value.trim();
    if (!startTime) {
      startInput.classList.add("inline-error");
      startInput.focus();
      return;
    }
    const custom = {};
    (customCols || []).forEach((col, i) => {
      if (customInputs[i].value.trim())
        custom[col.id] = customInputs[i].value.trim();
    });
    Timeline.create(contentId, {
      startTime,
      endTime: endInput.value.trim() || undefined,
      phase,
      skillType: skillSel.value || undefined,
      skillTypeCustom:
        skillSel.value === "기타" ? customInput.value.trim() : undefined,
      notes: notesInput.value.trim() || undefined,
      memo: memoInput.value.trim() || undefined,
      custom,
    });
    rebuild();
  }

  [
    ...[startInput, endInput, phaseInput, notesInput, memoInput],
    ...customInputs,
  ].forEach((inp) => {
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        save();
      }
      if (e.key === "Escape") tr.remove();
      inp.classList.remove("inline-error");
    });
  });

  tr.append(
    h("td", { "data-col-key": "startTime" }, startInput),
    h("td", { "data-col-key": "endTime" }, endInput),
    h("td", { "data-col-key": "phase" }, phaseInput),
    h("td", { "data-col-key": "skillType" }, skillWrap),
    h("td", { "data-col-key": "notes" }, notesInput),
    h(
      "td",
      {
        "data-col-key": "__mits",
        class: "text-sm text-muted",
        style: "text-align:center;",
      },
      "—",
    ),
    h("td", { "data-col-key": "memo" }, memoInput),
    ...(customCols || []).map((col, i) =>
      h("td", { "data-col-key": `custom:${col.id}` }, customInputs[i]),
    ),
    h(
      "td",
      {},
      h(
        "div",
        { class: "row-actions" },
        h("button", { class: "btn btn-primary btn-sm", onclick: save }, "✓"),
        h(
          "button",
          { class: "btn btn-outline btn-sm", onclick: () => tr.remove() },
          "✗",
        ),
      ),
    ),
  );
  return tr;
}

function buildTimelineRow(
  entry,
  contentId,
  customCols,
  mitFilter,
  mitSubFilter,
  rebuild,
  moveMode,
  locked,
  deleteMode,
) {
  // ── 구분선 렌더링 ──────────────────────────────────────
  if (entry.type === "divider") {
    const theme = (Contents.get(contentId) || {}).themeColor || "#89CFF0";
    const row = h("tr", {
      class: "divider-row",
      "data-entry-id": String(entry.id),
      draggable: moveMode ? "true" : "false",
    });
    const colCount = (customCols || []).length + 8;
    const cell = h("td", {
      class: "divider-row-cell",
      colspan: String(colCount),
      style: `background:${theme};`,
    });
    if (moveMode) {
      cell.prepend(
        h("span", { class: "drag-handle", title: "드래그하여 이동" }, "⠿"),
      );
    }
    cell.append(h("span", { class: "divider-label" }, entry.label || "──────"));
    if (!locked) {
      const editBtn = h(
        "button",
        {
          class: "divider-edit-btn",
          onclick: (e) => {
            e.stopPropagation();
            openDividerForm(contentId, rebuild, entry);
          },
        },
        "✏️",
      );
      cell.append(editBtn);
    }
    if (deleteMode) {
      const delBtn = h(
        "button",
        {
          class: "divider-edit-btn",
          style: "margin-left:4px;",
          onclick: (e) => {
            e.stopPropagation();
            if (confirm("구분선을 삭제할까요?")) {
              Timeline.delete(contentId, entry.id);
              rebuild();
            }
          },
        },
        "×",
      );
      cell.append(delBtn);
    }
    row.append(cell);
    return row;
  }

  const allMits = GlobalMit.list();
  const assignedIds = Mits.list(contentId)
    .filter((a) => a.entryId === entry.id)
    .map((a) => a.gid);
  const assignedMits = assignedIds
    .map((id) => allMits.find((m) => m.id === id))
    .filter(Boolean);

  const skillCls = entry.skillType ? `skill-${entry.skillType}` : "";

  // 직업군 필터 + 직업군별 그룹핑
  const filtered = (() => {
    if (!mitFilter || mitFilter === "all") return assignedMits;
    const byGroup = assignedMits.filter(
      (m) => (m.jobGroup || "기타") === mitFilter,
    );
    if (!mitSubFilter) return byGroup;
    return byGroup.filter((m) => m.jobClass === mitSubFilter);
  })();
  const mitsByGroup = {};
  filtered.forEach((m) => {
    const g = m.jobGroup || "기타";
    if (!mitsByGroup[g]) mitsByGroup[g] = [];
    mitsByGroup[g].push(m);
  });

  const mitCell = h("td", { "data-col-key": "__mits" });
  const mitWrap = h("div", { class: "mit-cell" });
  const groupKeys = Object.keys(mitsByGroup);
  groupKeys.forEach((g, gi) => {
    if (gi > 0) mitWrap.append(h("span", { class: "mit-sep", title: g }, "│"));
    mitsByGroup[g].forEach((item) => {
      const icon = mitIcon(item, 28);
      if (!locked) {
        if (deleteMode) {
          icon.onclick = () => {
            Mits.unassign(contentId, entry.id, item.id);
            rebuild();
          };
          icon.title = `${item.name} [${g}] (클릭하면 제거)`;
          icon.classList.add("mit-icon-delete-mode");
        } else {
          icon.title = `${item.name} [${g}]`;
          icon.style.cursor = "default";
        }
      } else {
        icon.title = `${item.name} [${g}]`;
        icon.style.cursor = "default";
      }
      mitWrap.append(icon);
    });
  });
  if (!locked) {
    const addBtn = h(
      "button",
      {
        class: "mit-add-btn",
        title: "외생기 배치",
        onclick: () => openMitPicker(contentId, entry.id, rebuild),
      },
      "+",
    );
    mitWrap.append(addBtn);
  }
  mitCell.append(mitWrap);

  let skillDisplay;
  if (entry.skillType === "기타" && entry.skillTypeCustom) {
    skillDisplay = h(
      "span",
      { class: "skill-badge skill-기타" },
      entry.skillTypeCustom,
    );
  } else if (entry.skillType) {
    skillDisplay = h(
      "span",
      { class: `skill-badge ${skillCls}` },
      entry.skillType,
    );
  } else {
    skillDisplay = h("span", { class: "text-muted" }, "-");
  }

  const startTime = entry.startTime || entry.time || "-";
  const endTime = entry.endTime;

  const timeCell = h(
    "td",
    { "data-col-key": "startTime", class: "time-cell" },
    startTime,
  );
  const endTimeCell = h(
    "td",
    {
      "data-col-key": "endTime",
      class: "time-cell",
      style: "color:var(--muted-fg);font-weight:400;",
    },
    endTime ? endTime : h("span", { style: "color:var(--border);" }, "—"),
  );

  const customTds = (customCols || []).map((col) => {
    const val = (entry.custom || {})[col.id] || "";
    const td = h(
      "td",
      {
        "data-col-key": `custom:${col.id}`,
        class: "text-sm text-muted",
        style: "max-width:140px;",
      },
      val || "-",
    );
    td.ondblclick = () => {
      const inp = h("input", {
        class: "inline-input",
        type: "text",
        value: val,
        style: "width:100%;",
      });
      td.innerHTML = "";
      td.append(inp);
      inp.focus();
      inp.select();
      const commit = () => {
        const newVal = inp.value.trim();
        const custom = {
          ...(entry.custom || {}),
          [col.id]: newVal || undefined,
        };
        Timeline.update(contentId, entry.id, { custom });
        rebuild();
      };
      inp.onblur = commit;
      inp.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commit();
        }
        if (e.key === "Escape") rebuild();
      };
    };
    return td;
  });

  const row = h(
    "tr",
    {
      "data-entry-id": String(entry.id),
      draggable: moveMode ? "true" : "false",
    },
    moveMode
      ? h(
          "td",
          { style: "width:28px;text-align:center;padding:0 4px;" },
          h("span", { class: "drag-handle", title: "드래그하여 이동" }, "⠿"),
        )
      : null,
    timeCell,
    endTimeCell,
    h(
      "td",
      { "data-col-key": "phase" },
      entry.phase && entry.phase.trim() ? entry.phase : "-",
    ),
    h("td", { "data-col-key": "skillType" }, skillDisplay),
    h(
      "td",
      { "data-col-key": "notes", class: "text-sm text-muted" },
      entry.notes || "-",
    ),
    mitCell,
    h(
      "td",
      {
        "data-col-key": "memo",
        class: "text-sm text-muted",
        style: "max-width:160px",
      },
      entry.memo || "-",
    ),
    ...customTds,
    locked
      ? h("td", {})
      : h(
          "td",
          { style: "width:36px;text-align:center;padding:0 4px;" },
          h(
            "button",
            {
              class: "btn-icon",
              title: "수정",
              style: "font-size:13px;",
              onclick: () => openTimelineForm(contentId, entry, rebuild),
            },
            "✏️",
          ),
        ),
  );
  return row;
}

function openTimelineForm(contentId, existing, rebuild) {
  const form = h("div", {});
  const startInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "0:00",
      value: existing?.startTime || existing?.time || "",
    }),
  );
  const endInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "0:10",
      value: existing?.endTime || "",
    }),
  );
  const phaseInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예)거울 나라",
      value: existing?.phase || "",
    }),
  );
  const skillSel = h("select", { class: "form-select" });
  const customWrap = h("div", {
    class: "form-group",
    style: "margin-top:6px;",
  });
  const customInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "직접 입력",
      value: existing?.skillTypeCustom || "",
    }),
  );
  customWrap.append(
    h("label", { class: "form-label" }, "구분 직접 입력"),
    customInput,
  );

  [
    { value: "", label: "(없음)" },
    ...SKILL_TYPES.map((t) => ({ value: t, label: t })),
  ].forEach(({ value, label }) => {
    const opt = h("option", { value }, label);
    if ((existing?.skillType || "") === value) opt.selected = true;
    skillSel.append(opt);
  });

  function toggleCustom() {
    customWrap.style.display = skillSel.value === "기타" ? "" : "none";
  }
  skillSel.onchange = toggleCustom;
  toggleCustom();

  const notesInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "비고",
      value: existing?.notes || "",
    }),
  );
  const memoInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "자유 메모",
      value: existing?.memo || "",
    }),
  );

  form.append(
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "시작시간 *"),
        startInput,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "종료시간"),
        endInput,
      ),
    ),
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "기술명 *"),
        phaseInput,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "구분"),
        skillSel,
        customWrap,
      ),
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "비고"),
      notesInput,
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "메모"),
      memoInput,
    ),
  );

  showModal(existing ? "타임라인 수정" : "타임라인 행 추가", form, {
    onConfirm: () => {
      const startTime = startInput.value.trim();
      const phase = phaseInput.value.trim();
      if (!startTime) {
        startInput.focus();
        return;
      }
      const data = {
        startTime,
        phase,
        endTime: endInput.value.trim() || undefined,
        skillType: skillSel.value || undefined,
        skillTypeCustom:
          skillSel.value === "기타" ? customInput.value.trim() : undefined,
        notes: notesInput.value.trim() || undefined,
        memo: memoInput.value.trim() || undefined,
      };
      if (existing) Timeline.update(contentId, existing.id, data);
      else Timeline.create(contentId, data);
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => startInput.focus(), 50);
}

function openDividerForm(contentId, rebuild, existing) {
  const labelInput = h("input", {
    class: "form-input",
    type: "text",
    placeholder: "예) 1페이즈",
    value: existing?.label || "",
  });
  const form = h(
    "div",
    {},
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "구분선 제목"),
      labelInput,
    ),
  );
  showModal(existing ? "구분선 수정" : "구분선 추가", form, {
    onConfirm: () => {
      const label = labelInput.value.trim();
      const data = {
        type: "divider",
        label: label || "──────",
        phase: label || "──────",
      };
      if (existing) Timeline.update(contentId, existing.id, data);
      else Timeline.create(contentId, data);
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => labelInput.focus(), 50);
}

function applyDragDrop(tbody, contentId, entries, rebuild) {
  let dragSrcId = null;
  tbody.querySelectorAll('tr[draggable="true"]').forEach((row) => {
    row.addEventListener("dragstart", (e) => {
      dragSrcId = row.dataset.entryId;
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
      tbody
        .querySelectorAll(".drag-over")
        .forEach((r) => r.classList.remove("drag-over"));
    });
    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      tbody
        .querySelectorAll(".drag-over")
        .forEach((r) => r.classList.remove("drag-over"));
      row.classList.add("drag-over");
    });
    row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
    row.addEventListener("drop", (e) => {
      e.preventDefault();
      if (!dragSrcId || dragSrcId === row.dataset.entryId) return;
      const targetId = row.dataset.entryId;
      const srcIdx = entries.findIndex((en) => String(en.id) === dragSrcId);
      const tgtIdx = entries.findIndex((en) => String(en.id) === targetId);
      if (srcIdx === -1 || tgtIdx === -1) return;
      const reordered = [...entries];
      const [moved] = reordered.splice(srcIdx, 1);
      reordered.splice(tgtIdx, 0, moved);
      reordered.forEach((en, i) =>
        Timeline.update(contentId, en.id, { order: i }),
      );
      rebuild();
    });
  });
}

let _lastMitGroup = null;
let _lastMitClass = null;
(() => {
  try {
    const s = JSON.parse(localStorage.getItem("ff14_last_mit_job") || "null");
    if (s) {
      _lastMitGroup = s.g;
      _lastMitClass = s.c;
    }
  } catch {}
})();

function openMitPicker(contentId, entryId, rebuild) {
  const allMits = GlobalMit.list();
  if (!allMits.length) {
    showModal(
      "외생기 배치",
      h(
        "p",
        { style: "padding:16px 0;color:var(--muted-fg)" },
        "등록된 외생기가 없어요. 외생기 라이브러리에서 먼저 추가하세요.",
      ),
    );
    return;
  }

  // 직업군별로 묶기
  const byGroup = {};
  allMits.forEach((m) => {
    const g = m.jobGroup || "기타";
    if (!byGroup[g]) byGroup[g] = [];
    byGroup[g].push(m);
  });
  const groupNames = Object.keys(byGroup);

  const body = h("div", {});

  function showGroups() {
    body.innerHTML = "";
    const grid = h("div", { class: "picker-group-grid" });
    groupNames.forEach((g) => {
      const mits = byGroup[g];
      const assignedCount = mits.filter((m) =>
        Mits.isAssigned(contentId, entryId, m.id),
      ).length;
      const btn = h("div", {
        class: "picker-group-card" + (assignedCount ? " has-assigned" : ""),
      });
      const groupIconEl = h("div", { class: "picker-group-icon" });
      const groupImg = GroupIcons.get(g);
      if (groupImg) {
        groupIconEl.append(h("img", { src: groupImg, alt: g }));
      } else {
        groupIconEl.textContent = g.slice(0, 2);
      }
      btn.append(
        groupIconEl,
        h("div", { class: "picker-group-name" }, g),
        h(
          "div",
          { class: "picker-group-count" },
          assignedCount ? `✅ ${assignedCount}개 배치됨` : `${mits.length}개`,
        ),
      );
      btn.onclick = () => showSubClasses(g);
      grid.append(btn);
    });
    body.append(grid);
  }

  function showMitList(groupName, className) {
    _lastMitGroup = groupName;
    _lastMitClass = className;
    try {
      localStorage.setItem(
        "ff14_last_mit_job",
        JSON.stringify({ g: groupName, c: className }),
      );
    } catch {}
    body.innerHTML = "";
    const hasSubClasses = !!(
      JOB_GROUPS[groupName] && JOB_GROUPS[groupName].length
    );
    const backLabel =
      hasSubClasses && className ? `← ${groupName}` : "← 직업군 목록";
    const backFn =
      hasSubClasses && className ? () => showSubClasses(groupName) : showGroups;
    const backBtn = h(
      "button",
      {
        class: "btn btn-ghost btn-sm",
        style: "margin-bottom:10px;",
        onclick: backFn,
      },
      backLabel,
    );
    const title = h(
      "div",
      { class: "picker-group-title" },
      className ? `${groupName} › ${className}` : groupName,
    );
    const itemsWrap = h("div", {
      class: "picker-items",
      style: "margin-top:10px;",
    });

    const mits = className
      ? (byGroup[groupName] || []).filter((m) => m.jobClass === className)
      : byGroup[groupName] || [];

    if (!mits.length) {
      itemsWrap.append(
        h(
          "div",
          { style: "color:var(--muted-fg);font-size:13px;padding:16px 0;" },
          "등록된 외생기가 없어요",
        ),
      );
    }
    mits.forEach((item) => {
      const isAssigned = Mits.isAssigned(contentId, entryId, item.id);
      const card = h("div", {
        class: "picker-item" + (isAssigned ? " selected" : ""),
      });
      const icon = h("div", {
        class: "picker-item-icon",
        style: `background:${item.color || "#89CFF0"}33;`,
      });
      if (item.imageUrl)
        icon.append(h("img", { src: item.imageUrl, alt: item.name }));
      else {
        icon.textContent = item.name.slice(0, 2);
        icon.style.fontSize = "14px";
        icon.style.fontWeight = "700";
        icon.style.color = item.color || "#89CFF0";
      }
      card.append(icon, h("div", { class: "picker-item-name" }, item.name));
      card.onclick = () => {
        if (isAssigned) Mits.unassign(contentId, entryId, item.id);
        else Mits.assign(contentId, entryId, item.id);
        App.closeModal();
        rebuild();
      };
      itemsWrap.append(card);
    });

    body.append(backBtn, title, itemsWrap);
  }

  function showSubClasses(groupName) {
    const classes = JOB_GROUPS[groupName];
    if (!classes || !classes.length) {
      showMitList(groupName, null);
      return;
    }

    body.innerHTML = "";
    const backBtn = h(
      "button",
      {
        class: "btn btn-ghost btn-sm",
        style: "margin-bottom:10px;",
        onclick: showGroups,
      },
      "← 직업군 목록",
    );
    const title = h("div", { class: "picker-group-title" }, groupName);
    const grid = h("div", { class: "picker-class-grid" });

    const allMitsInGroup = byGroup[groupName] || [];
    const allAssigned = allMitsInGroup.filter((m) =>
      Mits.isAssigned(contentId, entryId, m.id),
    ).length;
    const allCard = h(
      "div",
      { class: "picker-class-card" + (allAssigned ? " has-assigned" : "") },
      h("div", { class: "picker-class-icon" }, "전체"),
      h("div", { class: "picker-class-name" }, "전체 보기"),
      h(
        "div",
        { class: "picker-class-count" },
        allAssigned ? `✅ ${allAssigned}개` : `${allMitsInGroup.length}개`,
      ),
    );
    allCard.onclick = () => showMitList(groupName, null);
    grid.append(allCard);

    classes.forEach((cls) => {
      const clsMits = allMitsInGroup.filter((m) => m.jobClass === cls);
      const clsAssigned = clsMits.filter((m) =>
        Mits.isAssigned(contentId, entryId, m.id),
      ).length;
      const classIcon = ClassIcons.get(cls);
      const iconEl = h("div", { class: "picker-class-icon" });
      if (classIcon) {
        iconEl.append(h("img", { src: classIcon, alt: cls }));
      } else {
        iconEl.textContent = cls.slice(0, 2);
      }
      const card = h(
        "div",
        { class: "picker-class-card" + (clsAssigned ? " has-assigned" : "") },
        iconEl,
        h("div", { class: "picker-class-name" }, cls),
        h(
          "div",
          { class: "picker-class-count" },
          clsAssigned ? `✅ ${clsAssigned}개` : `${clsMits.length}개`,
        ),
      );
      card.onclick = () => showMitList(groupName, cls);
      grid.append(card);
    });

    body.append(backBtn, title, grid);
  }

  if (_lastMitGroup && byGroup[_lastMitGroup]) {
    showMitList(_lastMitGroup, _lastMitClass || null);
  } else {
    showGroups();
  }
  showModal("외생기 배치 — 직업군 선택", body, { noCancelBtn: true });
}

// ══════════════════════════════════════════════════════════
// GOOGLE SPREADSHEET IMPORT
// ══════════════════════════════════════════════════════════
function openSheetImportModal(contentId, customCols, rebuild) {
  const SAVE_KEY = `ff14_sheet_last_${contentId}`;
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY));
    } catch {
      return null;
    }
  })();

  function parseSheetId(url) {
    const m = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return m ? m[1] : null;
  }

  function buildCsvUrl(sheetId, sheetName, range) {
    let url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    if (sheetName && sheetName.trim())
      url += `&sheet=${encodeURIComponent(sheetName.trim())}`;
    if (range && range.trim())
      url += `&range=${encodeURIComponent(range.trim())}`;
    return url;
  }

  function parseCSV(text) {
    const lines = text.split("\n").filter((l) => l.trim());
    return lines.map((line) => {
      const result = [];
      let cur = "";
      let inQuote = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          if (inQuote && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else inQuote = !inQuote;
        } else if (line[i] === "," && !inQuote) {
          result.push(cur);
          cur = "";
        } else {
          cur += line[i];
        }
      }
      result.push(cur);
      return result;
    });
  }

  let fetchedData = null;
  let mappingSelects = [];
  // 시작 위치: null이면 1행부터 기존 행 열 채우기, 숫자면 해당 entryId부터
  // (기존 행이 부족하면 새 행 생성, 기존 행이 더 많으면 나머지는 그대로 유지)
  let startEntryId = null;
  let startColLabel = null;

  const urlInput = h("input", {
    class: "form-input",
    type: "text",
    placeholder: "https://docs.google.com/spreadsheets/d/...",
  });
  const sheetInput = h("input", {
    class: "form-input",
    type: "text",
    placeholder: "시트 이름 (비워두면 첫 번째 시트)",
  });
  const rangeInput = h("input", {
    class: "form-input",
    type: "text",
    placeholder: "범위 예) C8:C50 또는 A2:F30",
  });

  // ── 삽입 위치 UI ─────────────────────────────────────────
  const positionBadge = h(
    "span",
    {
      style:
        "display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;background:var(--primary-light);color:var(--primary);",
    },
    "1행부터 (기존 행 열 채우기)",
  );

  function refreshPositionBadge() {
    if (startEntryId === null) {
      positionBadge.textContent = "1행부터 (기존 행 열 채우기)";
      positionBadge.style.background = "var(--primary-light)";
      positionBadge.style.color = "var(--primary)";
    } else {
      const entries = Timeline.list(contentId)
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const idx = entries.findIndex((e) => e.id === startEntryId);
      const rowLabel = idx >= 0 ? `${idx + 1}행` : "선택된 행";
      positionBadge.textContent = `📍 ${rowLabel}부터 (기존 행 열 채우기)`;
      positionBadge.style.background = "var(--primary-light)";
      positionBadge.style.color = "var(--primary)";
    }
  }

  const pickBtn = h(
    "button",
    { class: "btn btn-outline btn-sm" },
    "🖱 셀 클릭으로 시작 행 변경",
  );
  const resetPosBtn = h(
    "button",
    { class: "btn btn-ghost btn-sm", style: "font-size:11px;" },
    "↩ 1행으로 초기화",
  );

  resetPosBtn.onclick = () => {
    startEntryId = null;
    startColLabel = null;
    refreshPositionBadge();
  };

  pickBtn.onclick = () => {
    const overlay = document.getElementById("modal-overlay");
    overlay.classList.add("hidden");

    const banner = h(
      "div",
      {
        style: [
          "position:fixed;top:0;left:0;right:0;z-index:9999;",
          "background:var(--primary);color:#fff;",
          "padding:14px 20px;display:flex;align-items:center;justify-content:space-between;",
          "font-weight:700;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,.2);",
        ].join(""),
      },
      h(
        "span",
        {},
        "🖱 데이터를 채울 시작 셀을 클릭하세요 — 그 셀부터 아래로 기존 행이 채워집니다",
      ),
      h(
        "button",
        {
          style:
            "background:#fff;color:var(--primary);border:none;border-radius:6px;padding:6px 14px;font-weight:700;cursor:pointer;font-size:13px;",
          onclick: () => cleanupPickMode(true),
        },
        "취소",
      ),
    );
    document.body.prepend(banner);

    // 타임라인 각 td 셀에 pick-mode 스타일 적용
    const cells = document.querySelectorAll(
      ".timeline-table tbody tr[data-entry-id] td[data-col-key]",
    );
    const rows = document.querySelectorAll(
      ".timeline-table tbody tr[data-entry-id]",
    );

    cells.forEach((cell) => {
      const colKey = cell.dataset.colKey;
      if (colKey === "__mits" || !colKey) return; // 외생기 열은 제외

      cell.dataset.pickCell = "1";
      cell.style.cursor = "cell";

      const highlight = () => {
        cell.style.outline = "3px solid var(--primary)";
        cell.style.outlineOffset = "-2px";
        cell.style.background = "var(--primary-light)";
      };
      const unhighlight = () => {
        cell.style.outline = "";
        cell.style.outlineOffset = "";
        cell.style.background = "";
      };

      cell.addEventListener("mouseenter", highlight);
      cell.addEventListener("mouseleave", unhighlight);
      cell.addEventListener("click", onCellClick, { once: true });

      cell._pickCleanup = () => {
        cell.removeEventListener("mouseenter", highlight);
        cell.removeEventListener("mouseleave", unhighlight);
        cell.removeEventListener("click", onCellClick);
        cell.style.cursor = "";
        cell.style.outline = "";
        cell.style.outlineOffset = "";
        cell.style.background = "";
        delete cell.dataset.pickCell;
        delete cell._pickCleanup;
      };

      function onCellClick() {
        const row = cell.closest("tr[data-entry-id]");
        startEntryId = parseInt(row.dataset.entryId);
        // 컬럼 레이블 구하기
        const th = document.querySelector(
          `.timeline-table thead th[data-col-key="${colKey}"]`,
        );
        startColLabel = th ? th.textContent.replace("×", "").trim() : colKey;
        cleanupPickMode(false);
      }
    });

    if (!rows.length) {
      banner.remove();
      overlay.classList.remove("hidden");
      alert("타임라인에 행이 없습니다. 먼저 행을 추가하세요.");
      return;
    }

    function cleanupPickMode(cancelled) {
      banner.remove();
      document
        .querySelectorAll(
          ".timeline-table tbody tr[data-entry-id] td[data-col-key]",
        )
        .forEach((c) => {
          if (c._pickCleanup) c._pickCleanup();
        });
      refreshPositionBadge();
      overlay.classList.remove("hidden");
    }
  };

  const positionSection = h(
    "div",
    {
      style:
        "border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:14px;background:var(--background);",
    },
    h(
      "div",
      {
        style:
          "font-size:12px;font-weight:700;color:var(--muted-fg);margin-bottom:6px;",
      },
      "📍 시작 행",
    ),
    h(
      "p",
      { style: "font-size:11px;color:var(--muted-fg);margin:0 0 8px;" },
      "매핑한 열만 기존 행에 채워넣어요. 다른 열은 그대로 유지됩니다. 행이 부족하면 새 행을 추가해요.",
    ),
    h(
      "div",
      { style: "display:flex;align-items:center;gap:8px;flex-wrap:wrap;" },
      positionBadge,
      pickBtn,
      resetPosBtn,
    ),
  );

  // ── 나머지 UI ─────────────────────────────────────────────
  const fetchBtn = h(
    "button",
    { class: "btn btn-outline btn-sm", style: "margin-top:4px;" },
    "📥 미리보기",
  );
  const fetchStatus = h("div", {
    style:
      "font-size:12px;color:var(--muted-fg);margin-top:6px;min-height:18px;",
  });
  const previewArea = h("div", {});
  const mappingArea = h("div", {});

  function renderMappingUI() {
    mappingArea.innerHTML = "";
    mappingSelects = [];
    if (!fetchedData || !fetchedData.length) return;

    const colCount = fetchedData[0].length;
    mappingArea.append(
      h(
        "div",
        { class: "form-label", style: "margin:12px 0 6px;" },
        "4. 컬럼 매핑 설정",
      ),
      h(
        "p",
        { style: "font-size:12px;color:var(--muted-fg);margin-bottom:8px;" },
        "각 열을 타임라인 어느 컬럼에 넣을지 선택하세요.",
      ),
    );

    const tableWrap = h("div", {
      style:
        "border:1px solid var(--border);border-radius:8px;overflow:hidden;",
    });
    tableWrap.append(
      h(
        "div",
        { class: "sheet-mapping-header" },
        h("div", {}, "열"),
        h("div", {}, "미리보기 값"),
        h("div", {}, "타임라인 컬럼"),
      ),
    );

    for (let i = 0; i < colCount; i++) {
      const colLetter =
        i < 26
          ? String.fromCharCode(65 + i)
          : `A${String.fromCharCode(65 + i - 26)}`;
      const samples = fetchedData
        .slice(0, 3)
        .map((r) => r[i] || "")
        .filter(Boolean)
        .join(", ");
      const sel = h("select", {
        class: "form-select",
        style: "font-size:12px;padding:4px 8px;",
      });
      sel.append(h("option", { value: "" }, "(가져오지 않음)"));
      TIMELINE_MAP_COLUMNS.forEach((col) =>
        sel.append(h("option", { value: col.key }, col.label)),
      );
      (customCols || []).forEach((col) =>
        sel.append(
          h("option", { value: `custom:${col.id}` }, `📌 ${col.name}`),
        ),
      );

      tableWrap.append(
        h(
          "div",
          { class: "sheet-mapping-row" },
          h("div", { class: "sheet-col-label" }, colLetter),
          h(
            "div",
            { class: "sheet-col-sample", title: samples },
            samples || "(비어있음)",
          ),
          sel,
        ),
      );
      mappingSelects.push({ colIdx: i, sel });
    }
    mappingArea.append(tableWrap);
  }

  fetchBtn.onclick = async () => {
    const url = urlInput.value.trim();
    if (!url) {
      fetchStatus.textContent = "❌ 링크를 입력하세요.";
      fetchStatus.style.color = "var(--destructive)";
      return;
    }
    const sheetId = parseSheetId(url);
    if (!sheetId) {
      fetchStatus.textContent = "❌ Google 스프레드시트 링크를 입력하세요.";
      fetchStatus.style.color = "var(--destructive)";
      return;
    }

    fetchStatus.textContent = "⏳ 데이터를 가져오는 중...";
    fetchStatus.style.color = "var(--muted-fg)";
    fetchBtn.disabled = true;
    previewArea.innerHTML = "";
    mappingArea.innerHTML = "";

    try {
      const csvUrl = buildCsvUrl(sheetId, sheetInput.value, rangeInput.value);
      const resp = await fetch(csvUrl);
      if (!resp.ok) throw new Error(`서버 응답 오류 (${resp.status})`);
      const text = await resp.text();
      fetchedData = parseCSV(text);
      if (!fetchedData.length) throw new Error("데이터가 없습니다");

      fetchStatus.textContent = `✅ ${fetchedData.length}행 데이터를 가져왔습니다 (${fetchedData[0].length}개 열)`;
      fetchStatus.style.color = "green";

      const previewWrap = h("div", {
        style:
          "overflow-x:auto;max-height:130px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;margin-top:6px;",
      });
      const tbl = h("table", {
        style: "font-size:11px;border-collapse:collapse;width:100%;",
      });
      fetchedData.slice(0, 5).forEach((row, ri) => {
        const tr = h("tr", {
          style: ri % 2 === 0 ? "background:#f8fafc;" : "",
        });
        row.forEach((cell) => {
          tr.append(
            h(
              "td",
              {
                style:
                  "padding:3px 8px;border:1px solid var(--border);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",
              },
              cell,
            ),
          );
        });
        tbl.append(tr);
      });
      if (fetchedData.length > 5) {
        const tr = h("tr", {});
        tr.append(
          h(
            "td",
            {
              colspan: String(fetchedData[0].length),
              style:
                "text-align:center;color:var(--muted-fg);font-size:11px;padding:4px;",
            },
            `... 외 ${fetchedData.length - 5}행`,
          ),
        );
        tbl.append(tr);
      }
      previewWrap.append(tbl);
      previewArea.append(previewWrap);
      renderMappingUI();

      // 이전 설정으로 입력 채우기에서 pending 매핑 있으면 자동 적용
      if (pendingSavedMappings) {
        pendingSavedMappings.forEach(({ colIdx, key }) => {
          const entry = mappingSelects.find((m) => m.colIdx === colIdx);
          if (entry && key) entry.sel.value = key;
        });
        pendingSavedMappings = null;
      }
    } catch (e) {
      fetchStatus.textContent = `❌ 오류: ${e.message}. 스프레드시트 공개 설정을 확인하세요.`;
      fetchStatus.style.color = "var(--destructive)";
      fetchedData = null;
    } finally {
      fetchBtn.disabled = false;
    }
  };

  // ── "이전 설정으로 입력 채우기" 버튼 ──────────────────
  // 클릭 시: 입력란 자동 채우기 + 데이터 미리보기 fetch + 매핑 자동 선택
  // (실제 붙여넣기는 "타임라인에 붙여넣기" 버튼을 눌러야 함)
  let pendingSavedMappings = null;

  const quickApplyBtn = saved
    ? h(
        "div",
        { class: "quick-apply-box" },
        h(
          "div",
          { class: "quick-apply-info" },
          h(
            "span",
            { style: "font-size:13px;" },
            "⚡ 이전 설정이 저장되어 있어요",
          ),
          h(
            "span",
            { style: "font-size:11px;color:var(--muted-fg);margin-left:8px;" },
            `${saved.sheetName || "첫 번째 시트"} · ${saved.range || "전체 범위"} · 매핑 ${(saved.mappings || []).filter((m) => m.key).length}개`,
          ),
        ),
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            onclick: () => {
              if (!saved.url) {
                alert("저장된 URL이 없습니다.");
                return;
              }
              // 1. 입력란 자동 채우기
              urlInput.value = saved.url;
              sheetInput.value = saved.sheetName || "";
              rangeInput.value = saved.range || "";
              // 2. 저장된 매핑을 pending으로 등록 (fetchBtn 완료 후 적용)
              pendingSavedMappings = saved.mappings || [];
              // 3. 미리보기 자동 실행
              fetchBtn.click();
            },
          },
          "⚡ 이전 설정으로 입력 채우기",
        ),
      )
    : null;

  function applyPaste(data, mappingDef, startEId) {
    const currentEntries = Timeline.list(contentId)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    // null이면 1행(0번 인덱스)부터 — 기존과 달리 "맨 아래 추가"가 아님
    const startIdx =
      startEId == null
        ? 0
        : Math.max(
            0,
            currentEntries.findIndex((e) => e.id === startEId),
          );

    // 매핑된 열만 파싱 (빈 값인 셀도 포함해서 행 수를 맞춤)
    const newEntryData = data
      .map((row) => {
        const entry = {};
        (mappingDef || []).forEach(({ colIdx, key }) => {
          if (!key) return;
          const val =
            row[colIdx] !== undefined ? String(row[colIdx]).trim() : "";
          if (key.startsWith("custom:")) {
            const colId = key.slice(7);
            if (!entry.custom) entry.custom = {};
            if (val) entry.custom[colId] = val;
          } else {
            // 빈 값도 일단 기록 (행 수 맞추기 위해)
            entry[key] = val;
          }
        });
        return entry;
      })
      .filter((entry) => {
        // 매핑된 키 중 하나라도 실제 값이 있는 행만 처리
        return (
          Object.entries(entry).some(([k, v]) => k !== "custom" && v) ||
          (entry.custom && Object.values(entry.custom).some(Boolean))
        );
      });

    if (!newEntryData.length) {
      alert("가져올 데이터가 없습니다.");
      return;
    }

    let filled = 0,
      created = 0;
    newEntryData.forEach((entryData, i) => {
      const targetIdx = startIdx + i;

      if (targetIdx < currentEntries.length) {
        // ── 기존 행: 매핑된 열만 업데이트, 나머지 열은 그대로 ──
        const existing = currentEntries[targetIdx];
        const patch = {};
        Object.entries(entryData).forEach(([k, v]) => {
          if (k === "custom") return; // custom은 아래에서 별도 처리
          if (v !== "") patch[k] = v; // 빈 문자열은 건너뜀 (기존값 유지)
        });
        if (entryData.custom) {
          patch.custom = { ...(existing.custom || {}), ...entryData.custom };
        }
        if (Object.keys(patch).length > 0) {
          Timeline.update(contentId, existing.id, patch);
          filled++;
        }
      } else {
        // ── 기존 행 없음: 새 행 생성 (매핑된 열만 채우고 나머지는 빈 값) ──
        const newEntry = { ...entryData };
        // 새 행 필수 최소값: startTime 없으면 빈 문자열로 (표시는 "-")
        if (!newEntry.startTime) newEntry.startTime = "";
        Timeline.create(contentId, {
          ...newEntry,
          order: currentEntries.length + created,
        });
        created++;
      }
    });

    App.closeModal();
    rebuild();
    setTimeout(() => {
      const startLabel =
        startIdx === 0 && startEId == null ? "1행" : `${startIdx + 1}행`;
      let msg = "✅ ";
      if (filled) msg += `${filled}개 행에 열 채우기 완료`;
      if (filled && created) msg += " + ";
      if (created) msg += `${created}개 새 행 추가`;
      msg += ` (${startLabel}부터)`;
      alert(msg);
    }, 100);
  }

  const bodyChildren = [
    h(
      "div",
      { class: "sheet-info-box" },
      '💡 스프레드시트 공유 설정에서 "링크가 있는 사용자 모두"로 변경 후 링크를 붙여넣으세요.',
    ),
  ];
  if (quickApplyBtn) bodyChildren.push(quickApplyBtn);
  bodyChildren.push(
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "1. Google 스프레드시트 링크"),
      urlInput,
    ),
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "2. 시트 이름"),
        sheetInput,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "3. 범위"),
        rangeInput,
      ),
    ),
    h("div", {}, fetchBtn, fetchStatus),
    previewArea,
    mappingArea,
    positionSection,
  );
  const body = h("div", {}, ...bodyChildren);

  showModal("📥 시트 가져오기", body, {
    confirmLabel: "타임라인에 붙여넣기",
    onConfirm: () => {
      if (!fetchedData || !fetchedData.length) {
        alert("먼저 미리보기 버튼을 눌러 데이터를 가져오세요.");
        return;
      }
      const hasMapped = mappingSelects.some(({ sel }) => sel.value);
      if (!hasMapped) {
        alert("최소 한 개 이상의 열을 타임라인 컬럼과 매핑해 주세요.");
        return;
      }

      // 현재 매핑을 저장
      const mappingDef = mappingSelects.map(({ colIdx, sel }) => ({
        colIdx,
        key: sel.value,
      }));

      // localStorage에 설정 저장
      try {
        localStorage.setItem(
          SAVE_KEY,
          JSON.stringify({
            url: urlInput.value.trim(),
            sheetName: sheetInput.value.trim(),
            range: rangeInput.value.trim(),
            mappings: mappingDef,
          }),
        );
      } catch (_) {}

      applyPaste(fetchedData, mappingDef, startEntryId);
    },
  });

  refreshPositionBadge();
}

// ══════════════════════════════════════════════════════════
// SECTIONS TAB (상세 공략)
// 수정: phase(큰 제목) / block(작은 제목) 구조, TOC 사이드바
// ══════════════════════════════════════════════════════════
function renderSectionsTab(container, contentId) {
  container.innerHTML = "";

  const layout = h("div", { class: "sections-layout" });
  const mainArea = h("div", { class: "sections-main" });
  const rightCol = h("div", { class: "toc-right-col" });
  const tocSidebar = h("div", { class: "toc-sidebar" });

  layout.append(mainArea, rightCol);
  container.append(layout);

  // ── 도구모음 박스 (목차 위 별도 박스) ──────────────────
  let toolOpen = true;
  const toolToggle = h("button", { class: "toc-toggle-btn" }, "▾");
  function tocRichBtn(label, title, action, style = "") {
    const btn = h("button", { class: "rich-btn", title, style }, label);
    btn.onmousedown = (e) => {
      e.preventDefault();
      action();
    };
    return btn;
  }
  const tocFmtSizeSelect = h("select", {
    class: "rich-select",
    title: "글자 크기",
  });
  ["12", "14", "16", "18", "20", "24"].forEach((s) =>
    tocFmtSizeSelect.append(h("option", { value: s }, s + "px")),
  );
  tocFmtSizeSelect.onchange = () => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontSize", false, "7");
    document.querySelectorAll('.cell-richtext font[size="7"]').forEach((el) => {
      el.removeAttribute("size");
      el.style.fontSize = tocFmtSizeSelect.value + "px";
    });
    tocFmtSizeSelect.selectedIndex = 0;
  };
  const tocFmtColorInput = h("input", {
    type: "color",
    class: "rich-color",
    title: "글자 색상",
    value: "#333333",
  });
  tocFmtColorInput.oninput = () =>
    document.execCommand("foreColor", false, tocFmtColorInput.value);

  const sectionToolBody = h("div", { class: "toolbox-body" });
  function rebuildToolBtns() {
    sectionToolBody.innerHTML = "";
    sectionToolBody.append(
      h(
        "button",
        {
          class: "toolbox-btn",
          onclick: () => openSectionForm(contentId, null, "phase", rebuild),
        },
        "📌 구분 추가",
      ),
      h(
        "button",
        {
          class: "toolbox-btn",
          onclick: () => openSectionForm(contentId, null, "block", rebuild),
        },
        "+ 블록 추가",
      ),
      h("div", { class: "toolbox-sep" }),
      h(
        "div",
        { style: "display:flex;gap:3px;flex-wrap:wrap;padding:2px 4px;" },
        tocRichBtn(
          "B",
          "볼드 (Ctrl+B)",
          () => document.execCommand("bold"),
          "font-weight:bold;",
        ),
        tocRichBtn(
          "U",
          "밑줄 (Ctrl+U)",
          () => document.execCommand("underline"),
          "text-decoration:underline;",
        ),
        tocFmtSizeSelect,
        tocFmtColorInput,
      ),
    );
  }
  rebuildToolBtns();
  sectionToolBody.style.display = toolOpen ? "" : "none";
  toolToggle.onclick = () => {
    toolOpen = !toolOpen;
    sectionToolBody.style.display = toolOpen ? "" : "none";
    toolToggle.textContent = toolOpen ? "▾" : "▸";
  };

  const sectionToolbox = h(
    "div",
    { class: "jump-sidebar", style: "margin-bottom:12px;" },
    h(
      "div",
      { class: "jump-sidebar-header" },
      h("span", { class: "jump-sidebar-title" }, "🛠 도구모음"),
      toolToggle,
    ),
    sectionToolBody,
  );
  rightCol.append(sectionToolbox, tocSidebar);

  let tocCollapsed = false;

  function buildToc() {
    tocSidebar.innerHTML = "";
    const sections = Sections.list(contentId)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const tocHeader = h("div", { class: "toc-header" });
    const titleSpan = h("span", { class: "toc-title" }, "📋 목차");
    const toggleBtn = h("button", {
      class: "toc-toggle-btn",
      title: "목차 접기/펼치기",
    });
    tocHeader.append(titleSpan, toggleBtn);

    const tocBody = h("div", { class: "toc-body" });

    function updateCollapsed() {
      tocCollapsed
        ? tocSidebar.classList.add("collapsed")
        : tocSidebar.classList.remove("collapsed");
      sectionToolbox.style.display = tocCollapsed ? "none" : "";
      toggleBtn.textContent = tocCollapsed ? "▶" : "◀";
      titleSpan.style.display = tocCollapsed ? "none" : "";
      tocBody.style.display = tocCollapsed ? "none" : "";
    }

    toggleBtn.onclick = () => {
      tocCollapsed = !tocCollapsed;
      updateCollapsed();
    };
    updateCollapsed();

    if (!sections.length) {
      tocBody.append(h("div", { class: "toc-empty" }, "아직 공략이 없어요"));
    } else {
      sections.forEach((sec) => {
        const cls = sec.type === "phase" ? "toc-phase-item" : "toc-block-item";
        const prefix = sec.type === "phase" ? "" : "· ";
        const item = h(
          "div",
          { class: cls, title: sec.title },
          prefix + sec.title,
        );
        item.onclick = () => {
          const el = document.getElementById(`section-${sec.id}`);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        tocBody.append(item);
      });
    }

    tocSidebar.append(tocHeader, tocBody);
  }

  let deleteMode = GlobalMode.get() === "delete";
  const moveMode = GlobalMode.get() === "move";
  let selectedIds = new Set();

  function updateDeleteBtn() {
    const btn = mainArea.querySelector(".del-sec-btn");
    if (btn) btn.textContent = `선택 삭제 (${selectedIds.size}개)`;
  }

  function rebuild() {
    mainArea.innerHTML = "";
    selectedIds = new Set();
    const sections = Sections.list(contentId)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const leftBtns = [
      h(
        "button",
        {
          class: "btn btn-outline",
          onclick: () => openSectionForm(contentId, null, "phase", rebuild),
        },
        "📌 구분 추가",
      ),
      h(
        "button",
        {
          class: "btn btn-primary",
          onclick: () => openSectionForm(contentId, null, "block", rebuild),
        },
        "+ 블록 추가",
      ),
    ];
    if (sections.length && deleteMode) {
      leftBtns.push(
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            onclick: () => {
              selectedIds = new Set(sections.map((s) => s.id));
              mainArea.querySelectorAll(".del-sec-cb").forEach((cb) => {
                cb.checked = true;
              });
              updateDeleteBtn();
            },
          },
          "모두 선택",
        ),
        h(
          "button",
          {
            class: "btn btn-sm del-sec-btn",
            style: "background:var(--destructive);color:#fff;border:none;",
            onclick: () => {
              if (!selectedIds.size) {
                alert("삭제할 항목을 선택하세요.");
                return;
              }
              if (!confirm(`${selectedIds.size}개 항목을 삭제할까요?`)) return;
              selectedIds.forEach((id) => Sections.delete(contentId, id));
              GlobalMode.reset();
              rebuild();
            },
          },
          "선택 삭제 (0개)",
        ),
        h(
          "button",
          {
            class: "btn btn-ghost btn-sm",
            onclick: () => {
              GlobalMode.reset();
              rebuild();
            },
          },
          "취소",
        ),
      );
    }

    const toolbar = h("div", { class: "sections-toolbar" }, ...leftBtns);
    mainArea.append(toolbar);

    if (!sections.length) {
      mainArea.append(
        h(
          "div",
          { class: "empty-state" },
          h("div", { class: "empty-state-icon" }, "📖"),
          h(
            "div",
            { class: "empty-state-title" },
            "작성된 상세 공략이 없어요!",
          ),
          h(
            "div",
            { class: "empty-state-desc" },
            '"구분 추가"로 페이즈를 만들고, "블록 추가"로 공략 내용을 작성하세요.',
          ),
        ),
      );
      buildToc();
      return;
    }

    sections.forEach((section, idx) => {
      let el;
      if (section.type === "phase") {
        el = buildPhaseBlock(
          section,
          contentId,
          rebuild,
          moveMode,
          sections,
          idx,
        );
      } else {
        el = buildSectionBlock(
          section,
          contentId,
          rebuild,
          moveMode,
          sections,
          idx,
        );
      }
      el.id = `section-${section.id}`;

      if (deleteMode) {
        const wrapper = h("div", { class: "del-sec-wrapper" });
        const cb = h("input", { type: "checkbox", class: "del-sec-cb" });
        cb.onchange = () => {
          if (cb.checked) selectedIds.add(section.id);
          else selectedIds.delete(section.id);
          updateDeleteBtn();
        };
        wrapper.append(cb, el);
        wrapper.id = `section-${section.id}`;
        mainArea.append(wrapper);
      } else {
        mainArea.append(el);
      }
    });

    buildToc();
  }

  rebuild();
}

// ── Phase (큰 제목) 블록 ──────────────────────────────────
function buildPhaseBlock(
  section,
  contentId,
  rebuild,
  moveMode = false,
  allSections = [],
  idx = 0,
) {
  const block = h("div", { class: "section-phase" });
  const titleEl = h("div", { class: "section-phase-title" }, section.title);

  let actions;
  if (moveMode) {
    actions = h(
      "div",
      { class: "section-phase-actions" },
      h(
        "button",
        {
          class: "btn btn-outline btn-sm",
          disabled: idx === 0,
          onclick: () =>
            swapSectionOrder(contentId, allSections, idx, idx - 1, rebuild),
        },
        "▲",
      ),
      h(
        "button",
        {
          class: "btn btn-outline btn-sm",
          disabled: idx === allSections.length - 1,
          onclick: () =>
            swapSectionOrder(contentId, allSections, idx, idx + 1, rebuild),
        },
        "▼",
      ),
    );
  } else {
    actions = h(
      "div",
      { class: "section-phase-actions" },
      h(
        "button",
        {
          class: "btn btn-outline btn-sm",
          onclick: () => openSectionForm(contentId, section, "phase", rebuild),
        },
        "✏️ 수정",
      ),
    );
  }

  block.append(titleEl, actions);
  return block;
}

// ── 섹션 순서 바꾸기 헬퍼 ───────────────────────────────────
function swapSectionOrder(contentId, sections, idxA, idxB, rebuild) {
  if (idxB < 0 || idxB >= sections.length) return;
  const orderA = sections[idxA].order ?? idxA;
  const orderB = sections[idxB].order ?? idxB;
  Sections.update(contentId, sections[idxA].id, { order: orderB });
  Sections.update(contentId, sections[idxB].id, { order: orderA });
  rebuild();
}

// ── 일반 블록 ─────────────────────────────────────────────
function buildSectionBlock(
  section,
  contentId,
  rebuild,
  moveMode = false,
  allSections = [],
  idx = 0,
) {
  const block = h("div", { class: "section-block" });

  function isLocked() {
    return !!(Sections.get(contentId, section.id) || section).locked;
  }

  const lockBtn = h("button", { class: "btn btn-sm lock-btn" });
  function refreshLockBtn() {
    const locked = isLocked();
    lockBtn.textContent = locked ? "🔓 잠금 해제" : "🔒 잠금";
    lockBtn.style.background = locked ? "var(--primary-light)" : "#fff";
    lockBtn.style.color = locked ? "var(--primary)" : "var(--muted-fg)";
    lockBtn.style.borderColor = locked ? "var(--primary)" : "var(--border)";
  }
  lockBtn.onclick = () => {
    const locked = !isLocked();
    Sections.update(contentId, section.id, { locked });
    refreshLockBtn();
    rebuildRows();
  };
  refreshLockBtn();

  const blockActions = moveMode
    ? h(
        "div",
        { class: "section-actions" },
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            disabled: idx === 0,
            onclick: () =>
              swapSectionOrder(contentId, allSections, idx, idx - 1, rebuild),
          },
          "▲",
        ),
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            disabled: idx === allSections.length - 1,
            onclick: () =>
              swapSectionOrder(contentId, allSections, idx, idx + 1, rebuild),
          },
          "▼",
        ),
      )
    : h(
        "div",
        { class: "section-actions" },
        lockBtn,
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            onclick: () =>
              openSectionForm(contentId, section, "block", rebuild),
          },
          "✏️ 제목 수정",
        ),
      );

  const header = h(
    "div",
    { class: "section-block-header" },
    h("h3", { class: "section-block-title" }, section.title),
    blockActions,
  );

  const rowsArea = h("div", {});

  function rebuildRows() {
    rowsArea.innerHTML = "";
    const sec = Sections.get(contentId, section.id) || section;
    const currentRows = sec.rows || [];
    const locked = !!sec.locked;

    currentRows.forEach((row, rowIdx) => {
      rowsArea.append(
        buildRowEditor(
          row,
          rowIdx,
          currentRows.length,
          contentId,
          section.id,
          rebuildRows,
          locked,
        ),
      );
    });

    if (!locked) {
      const addBar = h(
        "div",
        { class: "add-row-bar" },
        h("span", {}, "+ 열 추가:"),
        ...[1, 2, 3, 4].map((n) =>
          h(
            "button",
            {
              class: "btn btn-outline btn-sm",
              onclick: () => {
                const s = Sections.get(contentId, section.id);
                const newRows = [...(s.rows || []), makeRow(n)];
                Sections.update(contentId, section.id, { rows: newRows });
                rebuildRows();
              },
            },
            `${n}분할`,
          ),
        ),
      );
      rowsArea.append(addBar);
    }
  }

  rebuildRows();
  block.append(header, rowsArea);
  return block;
}

function buildRowEditor(
  row,
  rowIdx,
  totalRows,
  contentId,
  sectionId,
  rebuildRows,
  locked = false,
) {
  const rowEl = h("div", { class: "section-row" + (locked ? " locked" : "") });

  if (!locked) {
    const rowHeader = h(
      "div",
      { class: "section-row-header" },
      h("span", {}, `행 ${rowIdx + 1}`),
      ...[1, 2, 3, 4].map((n) =>
        h(
          "button",
          {
            class: "col-btn" + (row.columns === n ? " active" : ""),
            onclick: () => {
              const s = Sections.get(contentId, sectionId);
              const cells = [...(row.cells || [])];
              while (cells.length < n) cells.push(makeCell("text"));
              while (cells.length > n) cells.pop();
              const newRows = (s.rows || []).map((r) =>
                r.id === row.id ? { ...r, columns: n, cells } : r,
              );
              Sections.update(contentId, sectionId, { rows: newRows });
              rebuildRows();
            },
          },
          `${n}분할`,
        ),
      ),
    );

    if (totalRows > 1) {
      rowHeader.append(
        h(
          "button",
          {
            class: "btn btn-sm",
            style:
              "margin-left:auto;color:var(--destructive);border:1px solid var(--destructive);background:#fff;font-size:11px;",
            onclick: () => {
              if (!confirm("이 행을 삭제할까요?")) return;
              const s = Sections.get(contentId, sectionId);
              const newRows = (s.rows || []).filter((r) => r.id !== row.id);
              Sections.update(contentId, sectionId, { rows: newRows });
              rebuildRows();
            },
          },
          "🗑️",
        ),
      );
    }
    rowEl.append(rowHeader);
  }

  const cellsWrap = h("div", { class: "section-row-cells" });
  (row.cells || []).forEach((cell, cellIdx) => {
    cellsWrap.append(
      buildCellEditor(
        cell,
        cellIdx,
        row,
        contentId,
        sectionId,
        rebuildRows,
        locked,
      ),
    );
  });

  rowEl.append(cellsWrap);
  return rowEl;
}

function buildCellEditor(
  cell,
  cellIdx,
  row,
  contentId,
  sectionId,
  rebuildRows,
  locked = false,
) {
  const cellEl = h("div", { class: "section-cell" });

  if (!locked) {
    const typeBar = h(
      "div",
      { class: "section-cell-type-toggle" },
      h(
        "button",
        {
          class: "cell-type-btn" + (cell.type === "text" ? " active" : ""),
          onclick: () =>
            updateCellField(
              cell.id,
              row,
              contentId,
              sectionId,
              { type: "text", imageData: null },
              rebuildRows,
            ),
        },
        "텍스트",
      ),
      h(
        "button",
        {
          class: "cell-type-btn" + (cell.type === "image" ? " active" : ""),
          onclick: () =>
            updateCellField(
              cell.id,
              row,
              contentId,
              sectionId,
              { type: "image", content: "" },
              rebuildRows,
            ),
        },
        "사진",
      ),
    );
    cellEl.append(typeBar);
  }

  let contentEl;
  if (cell.type === "text") {
    const richDiv = h("div", {
      class: "cell-richtext",
      contenteditable: locked ? "false" : "true",
      "data-placeholder": "텍스트 입력...",
    });
    richDiv.innerHTML = cell.content || "";
    if (locked)
      richDiv.style.cssText =
        "border-color:transparent;background:transparent;cursor:default;";
    if (!locked) {
      richDiv.oninput = () => {
        updateCellField(
          cell.id,
          row,
          contentId,
          sectionId,
          { content: richDiv.innerHTML },
          rebuildRows,
          false,
        );
      };
      richDiv.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "b") {
          e.preventDefault();
          document.execCommand("bold");
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "u") {
          e.preventDefault();
          document.execCommand("underline");
        }
      });
    }
    contentEl = richDiv;
  } else {
    const fileInput = h("input", {
      type: "file",
      accept: "image/*",
      style: "display:none",
    });
    if (cell.imageData) {
      const imgWidth = cell.imageWidth ?? 100;
      const imgWrap = h("div", {
        style: "display:flex;flex-direction:column;gap:6px;",
      });
      const img = h("img", {
        src: cell.imageData,
        class: "cell-img-preview",
        style: `width:${imgWidth}%;max-width:100%;height:auto;`,
      });

      if (!locked) {
        const sizeVal = h("span", { class: "img-size-val" }, imgWidth + "%");
        const slider = Object.assign(
          h("input", {
            type: "range",
            min: "10",
            max: "100",
            value: String(imgWidth),
            class: "img-size-slider",
          }),
          {
            oninput(e) {
              img.style.width = e.target.value + "%";
              sizeVal.textContent = e.target.value + "%";
            },
            onchange(e) {
              updateCellField(
                cell.id,
                row,
                contentId,
                sectionId,
                { imageWidth: Number(e.target.value) },
                rebuildRows,
                false,
              );
            },
          },
        );
        const sizeRow = h(
          "div",
          { class: "img-size-row" },
          h("span", { class: "img-size-label" }, "크기"),
          slider,
          sizeVal,
        );
        const delBtn = h(
          "button",
          {
            class: "btn btn-sm",
            style:
              "color:var(--destructive);border:1px solid var(--destructive);background:#fff;font-size:11px;align-self:flex-start;",
            onclick: () =>
              updateCellField(
                cell.id,
                row,
                contentId,
                sectionId,
                { imageData: null, imageWidth: 100, caption: "" },
                rebuildRows,
              ),
          },
          "🗑️ 사진 제거",
        );
        const captionInput = h("input", {
          type: "text",
          class: "note-photo-caption",
          placeholder: "사진 설명 (선택)...",
          value: cell.caption || "",
          style: "width:100%;margin-top:4px;",
        });
        captionInput.onblur = () =>
          updateCellField(
            cell.id,
            row,
            contentId,
            sectionId,
            { caption: captionInput.value },
            rebuildRows,
            false,
          );
        captionInput.onkeydown = (e) => {
          if (e.key === "Enter") captionInput.blur();
        };
        imgWrap.append(img, sizeRow, captionInput, delBtn);
      } else {
        imgWrap.append(img);
        if (cell.caption) {
          imgWrap.append(
            h(
              "div",
              {
                class: "note-photo-caption-view",
                style:
                  "margin-top:4px;text-align:center;font-size:12px;color:var(--muted-fg);",
              },
              cell.caption,
            ),
          );
        }
      }
      contentEl = imgWrap;
    } else {
      if (!locked) {
        const zone = h(
          "div",
          { class: "cell-img-zone", onclick: () => fileInput.click() },
          h("div", {}, "📷"),
          h("div", {}, "클릭하여 사진 업로드"),
          h(
            "div",
            { style: "color:var(--muted-fg);font-size:11px;margin-top:2px;" },
            "(컴퓨터 폴더에서 선택)",
          ),
        );
        contentEl = zone;
      } else {
        contentEl = h("div", { class: "locked-empty-img" }, "🖼️ 사진 없음");
      }
    }
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateCellField(
          cell.id,
          row,
          contentId,
          sectionId,
          { imageData: ev.target.result, type: "image" },
          rebuildRows,
        );
      };
      reader.readAsDataURL(file);
    };
    if (!locked) cellEl.append(fileInput);
  }

  cellEl.append(contentEl);
  return cellEl;
}

function updateCellField(
  cellId,
  row,
  contentId,
  sectionId,
  patch,
  rebuildRows,
  doRebuild = true,
) {
  const s = Sections.get(contentId, sectionId);
  const newRows = (s.rows || []).map((r) => {
    if (r.id !== row.id) return r;
    return {
      ...r,
      cells: r.cells.map((c) => (c.id === cellId ? { ...c, ...patch } : c)),
    };
  });
  Sections.update(contentId, sectionId, { rows: newRows });
  if (doRebuild) rebuildRows();
}

// ── 구분/블록 이름 폼 ─────────────────────────────────────
function openSectionForm(contentId, existing, type, rebuild) {
  const isPhase = type === "phase";
  const titleInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: isPhase
        ? "예) 1페이즈, 2페이즈"
        : "예) 지고한 신성, 죽음 메카닉",
      value: existing?.title || "",
    }),
  );

  const body = h(
    "div",
    {},
    h(
      "div",
      { class: "form-group" },
      h(
        "label",
        { class: "form-label" },
        isPhase ? "구분 이름 (큰 제목) *" : "블록 이름 (작은 제목) *",
      ),
      titleInput,
    ),
  );

  const modalTitle = existing
    ? isPhase
      ? "구분 수정"
      : "블록 이름 수정"
    : isPhase
      ? "구분 추가 (큰 제목)"
      : "블록 추가 (작은 제목)";

  showModal(modalTitle, body, {
    onConfirm: () => {
      const title = titleInput.value.trim();
      if (!title) {
        titleInput.focus();
        return;
      }
      if (existing) {
        Sections.update(contentId, existing.id, { title });
      } else {
        Sections.create(contentId, { title, type });
      }
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => titleInput.focus(), 50);
}

// ══════════════════════════════════════════════════════════
// NOTES TAB
// ══════════════════════════════════════════════════════════
function swapNoteOrder(contentId, notes, idxA, idxB, rebuild) {
  if (idxB < 0 || idxB >= notes.length) return;
  const orderA = notes[idxA].order ?? idxA;
  const orderB = notes[idxB].order ?? idxB;
  Notes.update(contentId, notes[idxA].id, { order: orderB });
  Notes.update(contentId, notes[idxB].id, { order: orderA });
  rebuild();
}

function renderNotes(container, contentId) {
  container.innerHTML = "";

  // ── 레이아웃: 노트 리스트(좌) + 도구모음(우, sticky) ──
  const notesLayout = h("div", { class: "notes-layout" });
  const notesMain = h("div", { class: "notes-main" });
  container.append(notesLayout);

  // ── 도구모음 패널 (sticky, 오른쪽) ──
  let toolOpen = true;
  const toolToggle = h("button", { class: "toc-toggle-btn" }, "▾");
  function noteRichExecBtn(label, ttl, action, style = "") {
    const btn = h("button", { class: "rich-btn", title: ttl, style }, label);
    btn.onmousedown = (e) => {
      e.preventDefault();
      action();
    };
    return btn;
  }
  const noteSizeSelect = h("select", {
    class: "rich-select",
    title: "글자 크기",
  });
  ["12", "14", "16", "18", "20", "24"].forEach((s) =>
    noteSizeSelect.append(h("option", { value: s }, s + "px")),
  );
  noteSizeSelect.onchange = () => {
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontSize", false, "7");
    document
      .querySelectorAll('[data-rich-note] font[size="7"]')
      .forEach((el) => {
        el.removeAttribute("size");
        el.style.fontSize = noteSizeSelect.value + "px";
      });
    noteSizeSelect.selectedIndex = 0;
  };
  const noteColorInput = h("input", {
    type: "color",
    class: "rich-color",
    title: "글자 색상",
    value: "#333333",
  });
  noteColorInput.oninput = () =>
    document.execCommand("foreColor", false, noteColorInput.value);

  const toolBody = h(
    "div",
    { class: "toolbox-body" },
    h(
      "button",
      {
        class: "toolbox-btn toolbox-btn-primary",
        onclick: () => openNoteForm(contentId, null, rebuild),
      },
      "+ 오답 추가",
    ),
    h("div", { class: "toolbox-sep" }),
    h(
      "div",
      { style: "display:flex;gap:3px;flex-wrap:wrap;padding:2px 4px;" },
      noteRichExecBtn(
        "B",
        "볼드 (Ctrl+B)",
        () => document.execCommand("bold"),
        "font-weight:bold;",
      ),
      noteRichExecBtn(
        "U",
        "밑줄 (Ctrl+U)",
        () => document.execCommand("underline"),
        "text-decoration:underline;",
      ),
      noteSizeSelect,
      noteColorInput,
    ),
  );
  toolToggle.onclick = () => {
    toolOpen = !toolOpen;
    toolBody.style.display = toolOpen ? "" : "none";
    toolToggle.textContent = toolOpen ? "▾" : "▸";
  };

  const notesToolbox = h(
    "div",
    { class: "jump-sidebar notes-toolbox" },
    h(
      "div",
      { class: "jump-sidebar-header" },
      h("span", { class: "jump-sidebar-title" }, "🛠 도구모음"),
      toolToggle,
    ),
    toolBody,
  );
  notesLayout.append(notesMain, notesToolbox);

  let selectedIds = new Set();

  function updateDeleteBtn() {
    const btn = notesMain.querySelector(".del-note-btn");
    if (btn) btn.textContent = `선택 삭제 (${selectedIds.size}개)`;
  }

  function rebuild() {
    notesMain.innerHTML = "";
    selectedIds = new Set();
    const deleteMode = GlobalMode.get() === "delete";
    const moveMode = GlobalMode.get() === "move";

    const rawNotes = Notes.list(contentId);
    const hasOrder = rawNotes.some((n) => n.order != null);
    const notes = hasOrder
      ? rawNotes.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : rawNotes.slice().reverse();

    if (deleteMode && notes.length) {
      const toolbar = h(
        "div",
        { class: "sections-toolbar" },
        h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            onclick: () => {
              selectedIds = new Set(
                notes.filter((n) => !n.locked).map((n) => n.id),
              );
              notesMain.querySelectorAll(".del-note-cb").forEach((cb) => {
                cb.checked = true;
              });
              updateDeleteBtn();
            },
          },
          "모두 선택",
        ),
        h(
          "button",
          {
            class: "btn btn-sm del-note-btn",
            style: "background:var(--destructive);color:#fff;border:none;",
            onclick: () => {
              if (!selectedIds.size) {
                alert("삭제할 항목을 선택하세요.");
                return;
              }
              if (!confirm(`${selectedIds.size}개 오답을 삭제할까요?`)) return;
              selectedIds.forEach((id) => Notes.delete(contentId, id));
              GlobalMode.reset();
              rebuild();
            },
          },
          "선택 삭제 (0개)",
        ),
        h(
          "button",
          {
            class: "btn btn-ghost btn-sm",
            onclick: () => {
              GlobalMode.reset();
              rebuild();
            },
          },
          "취소",
        ),
      );
      notesMain.append(toolbar);
    }

    if (!notes.length) {
      notesMain.append(
        h(
          "div",
          { class: "empty-state" },
          h("div", { class: "empty-state-icon" }, "📝"),
          h("div", { class: "empty-state-title" }, "오답 노트가 없어요!"),
          h(
            "div",
            { class: "empty-state-desc" },
            "+ 오답 추가 버튼으로 실수를 기록해 보세요.",
          ),
        ),
      );
      return;
    }

    notes.forEach((note, idx) => {
      const card = buildNoteCard(note, contentId, rebuild);

      if (moveMode) {
        const wrapper = h("div", {
          class: "del-note-wrapper",
          style: "align-items:center;",
        });
        const upBtn = h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            disabled: idx === 0,
            style: "padding:3px 8px;",
            onclick: () =>
              swapNoteOrder(contentId, notes, idx, idx - 1, rebuild),
          },
          "▲",
        );
        const dnBtn = h(
          "button",
          {
            class: "btn btn-outline btn-sm",
            disabled: idx === notes.length - 1,
            style: "padding:3px 8px;",
            onclick: () =>
              swapNoteOrder(contentId, notes, idx, idx + 1, rebuild),
          },
          "▼",
        );
        const arrows = h(
          "div",
          {
            style: "display:flex;flex-direction:column;gap:4px;flex-shrink:0;",
          },
          upBtn,
          dnBtn,
        );
        wrapper.append(arrows, card);
        notesMain.append(wrapper);
      } else if (deleteMode && !note.locked) {
        const wrapper = h("div", { class: "del-note-wrapper" });
        const cb = h("input", { type: "checkbox", class: "del-note-cb" });
        cb.onchange = () => {
          if (cb.checked) selectedIds.add(note.id);
          else selectedIds.delete(note.id);
          updateDeleteBtn();
        };
        wrapper.append(cb, card);
        notesMain.append(wrapper);
      } else {
        notesMain.append(card);
      }
    });
  }

  rebuild();
}

function buildNoteCard(note, contentId, rebuild) {
  const locked = !!note.locked;
  const card = h("div", {
    class: "note-card" + (locked ? " note-card-locked" : ""),
  });

  const lockBtn = h(
    "button",
    {
      class: "btn btn-sm " + (locked ? "btn-primary" : "btn-outline"),
      style: "font-size:12px;",
      title: locked ? "잠금 해제" : "잠금 (수정/삭제 방지)",
      onclick: () => {
        Notes.update(contentId, note.id, { locked: !locked });
        rebuild();
      },
    },
    locked ? "🔓 잠금 해제" : "🔒 잠금",
  );

  const btnGroup = h(
    "div",
    { style: "display:flex;gap:6px;margin-left:auto;align-items:center;" },
    lockBtn,
  );

  if (!locked) {
    btnGroup.prepend(
      h(
        "button",
        {
          class: "btn btn-outline btn-sm",
          onclick: () => openNoteForm(contentId, note, rebuild),
        },
        "✏️ 수정",
      ),
    );
  }

  const header = h(
    "div",
    { class: "note-card-header" },
    note.phase ? h("span", { class: "note-phase-badge" }, note.phase) : null,
    locked ? h("span", { class: "note-locked-badge" }, "🔒 잠김") : null,
    btnGroup,
  );

  const content = h("div", { class: "note-content" });
  content.innerHTML = note.content || "";

  const photos = h("div", { class: "note-photos" });
  (note.photos || []).forEach((p) => {
    const wrap = h("div", { class: "note-photo-wrap" });
    const img = h("img", {
      src: p.imageData,
      class: "note-photo",
      onclick: () => window.open(p.imageData, "_blank"),
    });
    wrap.append(img);
    if (!locked) {
      const del = h(
        "button",
        {
          class: "note-photo-del",
          onclick: () => {
            Notes.removePhoto(contentId, note.id, p.id);
            rebuild();
          },
        },
        "×",
      );
      const captionInput = h("input", {
        class: "note-photo-caption",
        type: "text",
        placeholder: "사진 설명...",
        value: p.caption || "",
      });
      captionInput.onblur = () =>
        Notes.updatePhotoCaption(contentId, note.id, p.id, captionInput.value);
      captionInput.onkeydown = (e) => {
        if (e.key === "Enter") captionInput.blur();
      };
      wrap.append(del, captionInput);
    } else if (p.caption) {
      wrap.append(h("div", { class: "note-photo-caption-view" }, p.caption));
    }
    photos.append(wrap);
  });

  if (!locked) {
    const fileInput = h("input", {
      type: "file",
      accept: "image/*",
      style: "display:none",
    });
    const addPhoto = h(
      "div",
      { class: "note-photo-add", onclick: () => fileInput.click() },
      h("div", {}, "📷"),
      h("div", {}, "사진 추가"),
    );
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        Notes.addPhoto(contentId, note.id, ev.target.result);
        rebuild();
      };
      reader.readAsDataURL(file);
    };
    photos.append(fileInput, addPhoto);
  }

  let improvementEl = null;
  if (note.improvement) {
    improvementEl = h("div", { class: "note-improvement" });
    improvementEl.innerHTML = note.improvement;
  }

  card.append(header, content);
  if (improvementEl) card.append(improvementEl);
  card.append(photos, h("div", { class: "note-date" }, note.createdAt));
  return card;
}

function openNoteForm(contentId, existing, rebuild) {
  const phaseInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예) 1페이즈, 보스 등장",
      value: existing?.phase || "",
    }),
  );

  const richNote = h("div", {
    class: "cell-richtext",
    contenteditable: "true",
    "data-rich-note": "1",
    "data-placeholder": "실수 내용이나 공략 메모를 입력하세요...",
    style: "min-height:120px;",
  });
  richNote.innerHTML = existing?.content || "";

  richNote.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      document.execCommand("bold");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();
      document.execCommand("underline");
    }
  });

  function noteFormRichBtn(label, title, action, style = "") {
    const btn = h("button", { class: "rich-btn", title, style }, label);
    btn.onmousedown = (e) => {
      e.preventDefault();
      richNote.focus();
      action();
    };
    return btn;
  }
  const noteFmtSizeSelect = h("select", {
    class: "rich-select",
    title: "글자 크기",
  });
  ["12", "14", "16", "18", "20", "24"].forEach((s) =>
    noteFmtSizeSelect.append(h("option", { value: s }, s + "px")),
  );
  noteFmtSizeSelect.onmousedown = (e) => e.stopPropagation();
  noteFmtSizeSelect.onchange = () => {
    richNote.focus();
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontSize", false, "7");
    richNote.querySelectorAll('font[size="7"]').forEach((el) => {
      el.removeAttribute("size");
      el.style.fontSize = noteFmtSizeSelect.value + "px";
    });
    noteFmtSizeSelect.value = "";
  };
  const noteFmtColorInput = h("input", {
    type: "color",
    class: "rich-color",
    title: "글자 색상",
    value: "#333333",
  });
  noteFmtColorInput.onmousedown = (e) => e.stopPropagation();
  noteFmtColorInput.oninput = () => {
    richNote.focus();
    document.execCommand("foreColor", false, noteFmtColorInput.value);
  };

  const noteFormToolbar = h(
    "div",
    { class: "rich-toolbar", style: "margin-bottom:6px;" },
    noteFormRichBtn(
      "B",
      "볼드 (Ctrl+B)",
      () => document.execCommand("bold"),
      "font-weight:bold;",
    ),
    noteFormRichBtn(
      "U",
      "밑줄 (Ctrl+U)",
      () => document.execCommand("underline"),
      "text-decoration:underline;",
    ),
    noteFmtSizeSelect,
    noteFmtColorInput,
  );

  const richImprove = h("div", {
    class: "cell-richtext",
    contenteditable: "true",
    "data-placeholder": "다음에 개선할 점을 입력하세요...",
    style: "min-height:80px;",
  });
  richImprove.innerHTML = existing?.improvement || "";
  richImprove.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      document.execCommand("bold");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();
      document.execCommand("underline");
    }
  });

  function improveRichBtn(label, title, action, style = "") {
    const btn = h("button", { class: "rich-btn", title, style }, label);
    btn.onmousedown = (e) => {
      e.preventDefault();
      richImprove.focus();
      action();
    };
    return btn;
  }
  const improveSizeSelect = h("select", {
    class: "rich-select",
    title: "글자 크기",
  });
  ["12", "14", "16", "18", "20", "24"].forEach((s) =>
    improveSizeSelect.append(h("option", { value: s }, s + "px")),
  );
  improveSizeSelect.onmousedown = (e) => e.stopPropagation();
  improveSizeSelect.onchange = () => {
    richImprove.focus();
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontSize", false, "7");
    richImprove.querySelectorAll('font[size="7"]').forEach((el) => {
      el.removeAttribute("size");
      el.style.fontSize = improveSizeSelect.value + "px";
    });
    improveSizeSelect.value = "";
  };
  const improveColorInput = h("input", {
    type: "color",
    class: "rich-color",
    title: "글자 색상",
    value: "#333333",
  });
  improveColorInput.onmousedown = (e) => e.stopPropagation();
  improveColorInput.oninput = () => {
    richImprove.focus();
    document.execCommand("foreColor", false, improveColorInput.value);
  };

  const improveToolbar = h(
    "div",
    { class: "rich-toolbar", style: "margin-bottom:6px;" },
    improveRichBtn(
      "B",
      "볼드 (Ctrl+B)",
      () => document.execCommand("bold"),
      "font-weight:bold;",
    ),
    improveRichBtn(
      "U",
      "밑줄 (Ctrl+U)",
      () => document.execCommand("underline"),
      "text-decoration:underline;",
    ),
    improveSizeSelect,
    improveColorInput,
  );

  const body = h(
    "div",
    {},
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "페이즈/구간"),
      phaseInput,
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "내용 *"),
      noteFormToolbar,
      richNote,
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "개선사항"),
      improveToolbar,
      richImprove,
    ),
  );

  showModal(existing ? "오답 수정" : "오답 추가", body, {
    onConfirm: () => {
      const content = richNote.innerHTML.trim();
      if (!content || content === "<br>") {
        richNote.focus();
        return;
      }
      const improvement = richImprove.innerHTML.trim();
      const data = {
        content,
        phase: phaseInput.value.trim() || undefined,
        improvement:
          improvement && improvement !== "<br>" ? improvement : undefined,
      };
      if (existing) Notes.update(contentId, existing.id, data);
      else Notes.create(contentId, data);
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => phaseInput.focus(), 50);
}

// ══════════════════════════════════════════════════════════
// CUSTOM COLUMN MODAL
// ══════════════════════════════════════════════════════════
function openCustomColumnModal(contentId, rebuild) {
  const nameInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예) 담당자, 우선순위, 비고2",
    }),
  );

  const body = h(
    "div",
    {},
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "열 이름 *"),
      nameInput,
    ),
    h(
      "p",
      { style: "font-size:12px;color:var(--muted-fg);margin-top:4px;" },
      "타임라인 표에 새 열이 추가됩니다. 각 행에서 더블클릭해 값을 편집할 수 있어요.",
    ),
  );

  showModal("+ 열 추가", body, {
    onConfirm: () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.focus();
        return;
      }
      const content = Contents.get(contentId);
      const existing = content.customColumns || [];
      if (existing.some((c) => c.name === name)) {
        alert("같은 이름의 열이 이미 있습니다.");
        return;
      }
      Contents.update(contentId, {
        customColumns: [...existing, { id: genId(), name }],
      });
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => nameInput.focus(), 50);
}

// ══════════════════════════════════════════════════════════
// BACKUP MODAL
// ══════════════════════════════════════════════════════════
function openBackupModal(contentId) {
  function gatherData() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      content: Contents.get(contentId),
      timeline: Timeline.list(contentId),
      sections: Sections.list(contentId),
      mits: Mits.list(contentId),
      notes: Notes.list(contentId),
    };
  }

  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const webhookUrlInput = h("input", {
    class: "form-input",
    type: "url",
    placeholder: "https://script.google.com/macros/s/.../exec",
    value: localStorage.getItem("ff14_webhook_url") || "",
  });
  webhookUrlInput.onchange = () =>
    localStorage.setItem("ff14_webhook_url", webhookUrlInput.value.trim());

  const statusEl = h("div", {
    style: "font-size:12px;margin-top:6px;min-height:18px;",
  });

  const content = Contents.get(contentId);
  const safeName = (content?.name || "backup").replace(
    /[^a-zA-Z0-9가-힣_-]/g,
    "_",
  );

  const body = h(
    "div",
    {},
    // ── 내보내기 ───────────────────────────────────────────
    h(
      "div",
      { class: "backup-section" },
      h("div", { class: "backup-section-title" }, "📤 내보내기"),
      h(
        "div",
        { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" },
        h(
          "button",
          {
            class: "btn btn-outline",
            onclick: () => {
              downloadJSON(gatherData(), `${safeName}_backup.json`);
            },
          },
          "💾 JSON 백업 다운로드",
        ),
        h(
          "button",
          {
            class: "btn btn-outline",
            onclick: () => {
              const entries = Timeline.list(contentId)
                .slice()
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
              const rows = [
                ["시작시간", "종료시간", "기술명", "구분", "비고", "메모"],
              ];
              entries.forEach((e) =>
                rows.push([
                  e.startTime || "",
                  e.endTime || "",
                  e.phase || "",
                  e.skillType || "",
                  e.notes || "",
                  e.memo || "",
                ]),
              );
              const csv = rows
                .map((r) =>
                  r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
                )
                .join("\n");
              const blob = new Blob(["\uFEFF" + csv], {
                type: "text/csv;charset=utf-8;",
              });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `${safeName}_timeline.csv`;
              a.click();
            },
          },
          "📊 타임라인 CSV 내보내기",
        ),
      ),
    ),

    h("hr", {
      style: "margin:16px 0;border:none;border-top:1px solid var(--border);",
    }),

    // ── 가져오기 ───────────────────────────────────────────
    h(
      "div",
      { class: "backup-section" },
      h("div", { class: "backup-section-title" }, "📥 복원 (JSON 가져오기)"),
      h(
        "p",
        { style: "font-size:12px;color:var(--muted-fg);margin:4px 0 8px;" },
        "⚠️ 가져오면 현재 데이터가 백업 파일로 덮어씌워집니다.",
      ),
      h(
        "button",
        {
          class: "btn btn-outline",
          onclick: () => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".json";
            fileInput.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const data = JSON.parse(ev.target.result);
                  if (!data.timeline || !data.content)
                    throw new Error("올바른 백업 파일이 아닙니다.");
                  if (
                    !confirm(
                      `"${data.content.name}" 데이터를 복원할까요? 현재 데이터가 덮어씌워집니다.`,
                    )
                  )
                    return;
                  DB.set(`ff14_timeline_${contentId}`, data.timeline);
                  DB.set(`ff14_sections_${contentId}`, data.sections || []);
                  DB.set(`ff14_mits_${contentId}`, data.mits || []);
                  DB.set(`ff14_notes_${contentId}`, data.notes || []);
                  if (data.content) Contents.update(contentId, data.content);
                  App.closeModal();
                  App.navigate(`/content/${contentId}`);
                  alert("✅ 복원 완료!");
                } catch (err) {
                  alert(`❌ 파일 읽기 오류: ${err.message}`);
                }
              };
              reader.readAsText(file);
            };
            fileInput.click();
          },
        },
        "📂 JSON 파일로 복원",
      ),
    ),

    h("hr", {
      style: "margin:16px 0;border:none;border-top:1px solid var(--border);",
    }),

    // ── Google Sheets 자동 백업 ──────────────────────────────
    h(
      "div",
      { class: "backup-section" },
      h("div", { class: "backup-section-title" }, "☁️ Google Sheets 자동 백업"),
      h(
        "p",
        { style: "font-size:12px;color:var(--muted-fg);margin:4px 0 8px;" },
        "Google Apps Script 웹훅 URL을 등록하면 버튼 클릭으로 시트에 백업됩니다.",
      ),
      h(
        "details",
        { style: "margin-bottom:10px;" },
        h(
          "summary",
          {
            style:
              "font-size:12px;cursor:pointer;color:var(--primary);font-weight:600;",
          },
          "🔧 Apps Script 설정 방법 보기",
        ),
        h(
          "div",
          {
            style:
              "margin-top:8px;font-size:12px;line-height:1.7;color:var(--text);background:var(--muted);border-radius:8px;padding:10px 14px;",
          },
          h(
            "ol",
            { style: "margin:0;padding-left:16px;" },
            h("li", {}, "스프레드시트 열기 → 확장 프로그램 → Apps Script"),
            h("li", {}, "아래 코드를 붙여넣고 저장"),
            h(
              "pre",
              {
                style:
                  "background:#1e1e1e;color:#d4d4d4;border-radius:6px;padding:8px;overflow-x:auto;font-size:11px;margin:6px 0;",
              },
              `function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Backup') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('Backup');
  sheet.getRange('A1').setValue(e.postData.contents);
  sheet.getRange('B1').setValue(new Date().toLocaleString('ko-KR'));
  return ContentService.createTextOutput('OK');
}`,
            ),
            h("li", {}, "배포 → 새 배포 → 웹 앱 → 액세스: 모든 사용자"),
            h("li", {}, "배포 URL을 아래에 붙여넣기"),
          ),
        ),
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "Apps Script 웹훅 URL"),
        webhookUrlInput,
      ),
      h(
        "div",
        { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" },
        h(
          "button",
          {
            class: "btn btn-primary",
            onclick: async () => {
              const url = webhookUrlInput.value.trim();
              if (!url) {
                alert("웹훅 URL을 먼저 입력하세요.");
                return;
              }
              statusEl.textContent = "⏳ 백업 전송 중...";
              statusEl.style.color = "var(--muted-fg)";
              try {
                await fetch(url, {
                  method: "POST",
                  mode: "no-cors",
                  body: JSON.stringify(gatherData()),
                  headers: { "Content-Type": "application/json" },
                });
                statusEl.textContent =
                  "✅ 전송 완료! (no-cors로 응답 확인 불가, 시트에서 확인하세요)";
                statusEl.style.color = "green";
              } catch (err) {
                statusEl.textContent = `❌ 전송 실패: ${err.message}`;
                statusEl.style.color = "var(--destructive)";
              }
            },
          },
          "☁️ 지금 백업 전송",
        ),
      ),
      statusEl,
    ),
  );

  showModal("💾 백업 / 복원", body, { noCancelBtn: false });
}

// ══════════════════════════════════════════════════════════
// SHARE VIEW — 읽기 전용 타임라인 (공유 링크로 접근 시)
// ══════════════════════════════════════════════════════════
function renderShareView(main, encoded) {
  main.innerHTML = "";
  const data = decodeShareData(encoded);

  if (!data || !data.entries) {
    main.append(
      h(
        "div",
        { class: "empty-state" },
        h("div", { class: "empty-state-icon" }, "⚠️"),
        h("div", { class: "empty-state-title" }, "링크가 유효하지 않아요"),
        h(
          "div",
          { class: "empty-state-desc" },
          "링크가 손상되었거나 만료되었을 수 있어요.",
        ),
        h(
          "a",
          { href: "#/", class: "btn btn-primary", style: "margin-top:16px;" },
          "← 홈으로",
        ),
      ),
    );
    return;
  }

  const theme = data.theme || "#89CFF0";
  const diffCls = DIFF_CLASS[data.difficulty] || "badge-일반";
  const sharedDate = data.sharedAt
    ? new Date(data.sharedAt).toLocaleDateString("ko-KR")
    : "";
  const customCols = data.customColumns || [];
  const entries = data.entries || [];
  const dividers = entries.filter((e) => e.type === "divider");

  // ── 헤더 ──────────────────────────────────────────────
  const headerEl = h(
    "div",
    {
      class: "share-header",
      style: `background:linear-gradient(135deg,${theme}22 0%,${theme}08 100%);border-color:${theme}44;`,
    },
    h(
      "div",
      { class: "share-header-top" },
      h(
        "div",
        { style: "flex:1;min-width:0;" },
        h(
          "div",
          { class: "detail-meta", style: "margin-bottom:4px;" },
          h("span", { class: `badge ${diffCls}` }, data.difficulty || ""),
          h(
            "span",
            { class: "share-readonly-badge" },
            "👁 공유 보기 (읽기 전용)",
          ),
          sharedDate
            ? h(
                "span",
                { class: "text-sm text-muted", style: "margin-left:8px;" },
                `공유일: ${sharedDate}`,
              )
            : null,
        ),
        h("h1", { class: "detail-title" }, data.name),
        data.description
          ? h("p", { class: "detail-desc" }, data.description)
          : null,
      ),
      h(
        "div",
        {
          style:
            "display:flex;flex-direction:column;gap:8px;align-items:flex-end;flex-shrink:0;",
        },
        h("a", { href: "#/", class: "btn btn-outline btn-sm" }, "← 홈으로"),
        h(
          "button",
          {
            class: "btn btn-primary btn-sm",
            onclick: () => {
              if (
                !confirm(
                  `"${data.name}" 공략을 내 공략 목록에 저장할까요?\n타임라인 데이터만 저장돼요 (오답노트·외생기 미포함).`,
                )
              )
                return;
              const existing = Contents.list();
              const newContent = Contents.create({
                name:
                  data.name +
                  (existing.some((c) => c.name === data.name)
                    ? " (공유됨)"
                    : ""),
                difficulty: data.difficulty,
                description: data.description,
                themeColor: data.theme,
                customColumns: customCols,
              });
              const cleanEntries = entries.map((e, i) => ({
                ...e,
                id: i + 1,
                order: i,
                _mits: undefined,
              }));
              DB.set(`ff14_timeline_${newContent.id}`, cleanEntries);
              alert("✅ 저장 완료! 공략 목록에서 확인하세요.");
              navigate(`#/content/${newContent.id}`);
            },
          },
          "💾 내 공략에 저장",
        ),
      ),
    ),
  );
  main.append(headerEl);

  // ── 점프 바 ────────────────────────────────────────────
  if (dividers.length) {
    let jumpBarOpen = true;
    const btnWrap = h("div", {
      style: "display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;",
    });
    dividers.forEach((d) => {
      const btn = h(
        "button",
        {
          style: `padding:2px 10px;border-radius:999px;border:1px solid ${theme};background:#fff;font-size:12px;font-weight:700;color:${theme};cursor:pointer;white-space:nowrap;`,
        },
        d.label || "──────",
      );
      btn.onclick = () => {
        const row = tableWrap.querySelector(`tr[data-entry-id="${d.id}"]`);
        if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      btnWrap.append(btn);
    });
    const toggleBtn = h(
      "button",
      {
        style: `padding:2px 8px;border-radius:999px;border:1px solid ${theme};background:${theme};color:#fff;font-size:11px;font-weight:700;cursor:pointer;`,
      },
      "◀",
    );
    toggleBtn.onclick = () => {
      jumpBarOpen = !jumpBarOpen;
      btnWrap.style.display = jumpBarOpen ? "" : "none";
      toggleBtn.textContent = jumpBarOpen ? "◀" : "▶";
    };
    main.append(
      h(
        "div",
        {
          style: `display:flex;flex-direction:column;margin-bottom:8px;padding:8px 12px;background:${theme}18;border-radius:var(--radius);border:1px solid ${theme};`,
        },
        h(
          "div",
          { style: "display:flex;align-items:center;gap:8px;" },
          h(
            "span",
            {
              style: `font-size:11px;font-weight:700;color:${theme};white-space:nowrap;`,
            },
            "↓ 이동",
          ),
          toggleBtn,
        ),
        btnWrap,
      ),
    );
  }

  // ── 타임라인 테이블 ────────────────────────────────────
  const shareHiddenCols = new Set(data.hiddenCols || []);
  const colKeys = [
    "startTime",
    "endTime",
    "phase",
    "skillType",
    "notes",
    "__mits",
    "memo",
    ...customCols.map((col) => `custom:${col.id}`),
  ];

  const theadCells = [
    h("th", { "data-col-key": "startTime" }, "시작시간"),
    h("th", { "data-col-key": "endTime" }, "종료시간"),
    h("th", { "data-col-key": "phase" }, "기술명"),
    h("th", { "data-col-key": "skillType" }, "구분"),
    h("th", { "data-col-key": "notes" }, "비고"),
    h("th", { "data-col-key": "__mits" }, "외생기"),
    h("th", { "data-col-key": "memo" }, "메모"),
    ...customCols.map((col) =>
      h("th", { "data-col-key": `custom:${col.id}` }, col.name),
    ),
  ];

  const tbody = h("tbody", {});
  entries.forEach((entry) => {
    if (entry.type === "divider") {
      const visibleCount = colKeys.filter(
        (k) => !shareHiddenCols.has(k),
      ).length;
      const cell = h("td", {
        colspan: String(visibleCount || 1),
        class: "divider-row-cell",
        style: `background:${theme};`,
      });
      cell.append(
        h("span", { class: "divider-label" }, entry.label || "──────"),
      );
      tbody.append(
        h(
          "tr",
          { class: "divider-row", "data-entry-id": String(entry.id) },
          cell,
        ),
      );
      return;
    }

    let skillDisplay;
    if (entry.skillType === "기타" && entry.skillTypeCustom) {
      skillDisplay = h(
        "span",
        { class: "skill-badge skill-기타" },
        entry.skillTypeCustom,
      );
    } else if (entry.skillType) {
      skillDisplay = h(
        "span",
        { class: `skill-badge skill-${entry.skillType}` },
        entry.skillType,
      );
    } else {
      skillDisplay = h("span", { class: "text-muted" }, "-");
    }

    const mitsSnap = entry._mits || [];
    const mitWrap = h("div", { class: "mit-cell" });
    const byGroup = {};
    mitsSnap.forEach((m) => {
      (byGroup[m.jobGroup] = byGroup[m.jobGroup] || []).push(m);
    });
    Object.keys(byGroup).forEach((g, gi) => {
      if (gi > 0) mitWrap.append(h("span", { class: "mit-sep" }, "│"));
      byGroup[g].forEach((m) => {
        const catStyle =
          m.skillCategory && SKILL_CAT_COLORS[m.skillCategory]
            ? `border-color:${SKILL_CAT_COLORS[m.skillCategory].border};`
            : "";
        const iconEl = h("div", {
          class: "mit-icon",
          title: `${m.name}${m.skillCategory ? " [" + m.skillCategory + "]" : ""} [${m.jobGroup}]`,
          style: `width:28px;height:28px;border-radius:7px;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;background:#f0f0f0;border:2px solid #ddd;flex-shrink:0;${catStyle}`,
        });
        if (m.imageUrl) {
          iconEl.append(
            h("img", {
              src: m.imageUrl,
              alt: m.name,
              style: "width:100%;height:100%;object-fit:contain;",
            }),
          );
        } else {
          iconEl.textContent = m.name.slice(0, 2);
          iconEl.style.fontSize = "10px";
          iconEl.style.fontWeight = "700";
          iconEl.style.color = "#555";
        }
        mitWrap.append(iconEl);
      });
    });
    if (!mitsSnap.length)
      mitWrap.append(h("span", { class: "text-muted" }, "-"));

    const endTime = entry.endTime;
    tbody.append(
      h(
        "tr",
        { "data-entry-id": String(entry.id) },
        h(
          "td",
          { "data-col-key": "startTime", class: "time-cell" },
          entry.startTime || entry.time || "-",
        ),
        h(
          "td",
          {
            "data-col-key": "endTime",
            class: "time-cell",
            style: "color:var(--muted-fg);",
          },
          endTime || h("span", { style: "color:var(--border);" }, "—"),
        ),
        h(
          "td",
          { "data-col-key": "phase" },
          entry.phase && entry.phase.trim() ? entry.phase : "-",
        ),
        h("td", { "data-col-key": "skillType" }, skillDisplay),
        h(
          "td",
          { "data-col-key": "notes", class: "text-sm text-muted" },
          entry.notes || "-",
        ),
        h("td", { "data-col-key": "__mits" }, mitWrap),
        h(
          "td",
          {
            "data-col-key": "memo",
            class: "text-sm text-muted",
            style: "max-width:160px;",
          },
          entry.memo || "-",
        ),
        ...customCols.map((col) =>
          h(
            "td",
            { "data-col-key": `custom:${col.id}`, class: "text-sm text-muted" },
            (entry.custom || {})[col.id] || "-",
          ),
        ),
      ),
    );
  });

  if (!entries.length) {
    tbody.append(
      h(
        "tr",
        {},
        h(
          "td",
          {
            colspan: String(colKeys.length),
            style: "text-align:center;padding:32px;color:var(--muted-fg);",
          },
          "타임라인 데이터가 없어요",
        ),
      ),
    );
  }

  const tableWrap = h(
    "div",
    { class: "timeline-table-wrap" },
    h(
      "table",
      { class: "timeline-table" },
      h("thead", {}, h("tr", {}, ...theadCells)),
      tbody,
    ),
  );

  // 숨긴 열 적용
  if (shareHiddenCols.size) {
    tableWrap.querySelectorAll("[data-col-key]").forEach((el) => {
      if (shareHiddenCols.has(el.dataset.colKey)) el.style.display = "none";
    });
  }

  main.append(tableWrap);

  // ── 하단 저장 안내 ─────────────────────────────────────
  main.append(
    h(
      "div",
      { class: "share-footer" },
      h(
        "span",
        { style: "font-size:13px;color:var(--muted-fg);" },
        "📋 이 페이지는 읽기 전용이에요. 내 공략에 저장하면 편집할 수 있어요.",
      ),
      h(
        "button",
        { class: "btn btn-outline btn-sm", onclick: () => navigate("#/") },
        "← 홈으로 돌아가기",
      ),
    ),
  );
}

// ══════════════════════════════════════════════════════════
// GLOBAL BACKUP MODAL (메인 화면용 — 전체 데이터 백업/복원)
// ══════════════════════════════════════════════════════════
function openGlobalBackupModal() {
  function gatherAll() {
    const contents = Contents.list();
    return {
      version: 2,
      exportedAt: new Date().toISOString(),
      contents,
      globalMits: GlobalMit.list(),
      links: Links.list(),
      perContent: contents.map((c) => ({
        contentId: c.id,
        timeline: Timeline.list(c.id),
        sections: Sections.list(c.id),
        mits: Mits.list(c.id),
        notes: Notes.list(c.id),
      })),
    };
  }

  function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const statusEl = h("div", {
    style: "font-size:12px;margin-top:6px;min-height:18px;",
  });

  const body = h(
    "div",
    {},
    // ── 내보내기 ───────────────────────────────────────────
    h(
      "div",
      { class: "backup-section" },
      h("div", { class: "backup-section-title" }, "📤 전체 데이터 내보내기"),
      h(
        "p",
        { style: "font-size:12px;color:var(--muted-fg);margin:4px 0 8px;" },
        `등록된 공략 ${Contents.list().length}개 · 외생기 ${GlobalMit.list().length}개 전체를 백업합니다.`,
      ),
      h(
        "div",
        { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" },
        h(
          "button",
          {
            class: "btn btn-outline",
            onclick: () => {
              const date = new Date().toISOString().slice(0, 10);
              downloadJSON(gatherAll(), `ff14_전체백업_${date}.json`);
            },
          },
          "💾 전체 JSON 백업 다운로드",
        ),
      ),
    ),

    h("hr", {
      style: "margin:16px 0;border:none;border-top:1px solid var(--border);",
    }),

    // ── 가져오기 ───────────────────────────────────────────
    h(
      "div",
      { class: "backup-section" },
      h("div", { class: "backup-section-title" }, "📥 전체 데이터 복원"),
      h(
        "p",
        { style: "font-size:12px;color:var(--muted-fg);margin:4px 0 8px;" },
        "⚠️ 복원 시 현재 저장된 모든 공략 · 외생기 · 링크 데이터가 백업 파일로 덮어씌워집니다.",
      ),
      h(
        "button",
        {
          class: "btn btn-outline",
          onclick: () => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".json";
            fileInput.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const data = JSON.parse(ev.target.result);
                  if (!data.contents && !data.content)
                    throw new Error("올바른 백업 파일이 아닙니다.");

                  // 버전 1 (단일 공략) 호환
                  if (data.version === 1 && data.content) {
                    if (
                      !confirm(
                        `"${data.content.name}" 공략 데이터를 복원할까요?`,
                      )
                    )
                      return;
                    const existing = Contents.get(data.content.id);
                    if (!existing) Contents.create(data.content);
                    else Contents.update(data.content.id, data.content);
                    DB.set(
                      `ff14_timeline_${data.content.id}`,
                      data.timeline || [],
                    );
                    DB.set(
                      `ff14_sections_${data.content.id}`,
                      data.sections || [],
                    );
                    DB.set(`ff14_mits_${data.content.id}`, data.mits || []);
                    DB.set(`ff14_notes_${data.content.id}`, data.notes || []);
                    App.closeModal();
                    navigate(location.hash || "#/");
                    alert("✅ 복원 완료!");
                    return;
                  }

                  // 버전 2 (전체)
                  const count = (data.contents || []).length;
                  if (
                    !confirm(
                      `${count}개 공략 전체 데이터를 복원할까요? 현재 데이터가 모두 덮어씌워집니다.`,
                    )
                  )
                    return;
                  DB.set("ff14_contents", data.contents || []);
                  DB.set("ff14_global_mits", data.globalMits || []);
                  DB.set("ff14_links", data.links || []);
                  (data.perContent || []).forEach((pc) => {
                    DB.set(`ff14_timeline_${pc.contentId}`, pc.timeline || []);
                    DB.set(`ff14_sections_${pc.contentId}`, pc.sections || []);
                    DB.set(`ff14_mits_${pc.contentId}`, pc.mits || []);
                    DB.set(`ff14_notes_${pc.contentId}`, pc.notes || []);
                  });
                  App.closeModal();
                  navigate("#/");
                  alert(`✅ 복원 완료! (${count}개 공략)`);
                } catch (err) {
                  alert(`❌ 파일 읽기 오류: ${err.message}`);
                }
              };
              reader.readAsText(file);
            };
            fileInput.click();
          },
        },
        "📂 JSON 파일로 전체 복원",
      ),
    ),
    statusEl,
  );

  showModal("💾 전체 백업 / 복원", body, { noCancelBtn: false });
}

// ══════════════════════════════════════════════════════════
// MITIGATION LIBRARY PAGE
// ══════════════════════════════════════════════════════════
function renderLibrary(main) {
  main.innerHTML = "";
  const groups = Object.keys(JOB_GROUPS);
  let selectedGroup = groups[0];
  let selectedClass = JOB_GROUPS[selectedGroup][0];

  const pageHeader = h(
    "div",
    { class: "page-header" },
    h(
      "div",
      {},
      h("h1", { class: "page-title" }, "외생기 라이브러리"),
      h(
        "p",
        { class: "page-subtitle" },
        "직업군별로 외생기(방어/회복 스킬)를 등록하세요. 타임라인에서 배치할 수 있어요.",
      ),
    ),
  );
  main.append(pageHeader);

  const layout = h("div", { class: "library-layout" });
  const groupNav = h("div", { class: "job-group-nav" });
  const panel = h("div", { class: "library-panel" });

  function rebuildGroupNav() {
    groupNav.innerHTML = "";
    groups.forEach((g) => {
      const btn = h(
        "button",
        { class: "job-group-btn" + (g === selectedGroup ? " active" : "") },
        g,
      );
      btn.onclick = () => {
        selectedGroup = g;
        selectedClass = JOB_GROUPS[g][0];
        rebuildGroupNav();
        rebuildPanel();
      };
      groupNav.append(btn);
    });
  }

  function autoSetJobIcons() {
    let count = 0;
    Object.entries(JOB_ICON_URLS).forEach(([cls, url]) => {
      if (!ClassIcons.get(cls)) {
        ClassIcons.set(cls, url);
        count++;
      }
    });
    rebuildPanel();
    if (count > 0)
      alert(`✅ ${count}개 직업 아이콘을 로컬 파일에서 자동 설정했어요!`);
    else alert("모든 직업 아이콘이 이미 설정되어 있어요.");
  }

  function loadPresetMitsData() {
    const existing = GlobalMit.list();
    const existingKeys = new Set(
      existing.map((m) => `${m.jobGroup}:${m.name}`),
    );
    let added = 0;
    PRESET_MITS.forEach((m, i) => {
      const key = `${m.jobGroup}:${m.name}`;
      if (!existingKeys.has(key)) {
        GlobalMit.create({ ...m, order: existing.length + i });
        added++;
      }
    });
    rebuildGroupNav();
    rebuildPanel();
    alert(
      added > 0
        ? `✅ ${added}개 외생기 데이터를 추가했어요!`
        : "이미 모든 기본 데이터가 있어요.",
    );
  }

  function rebuildPanel() {
    panel.innerHTML = "";
    const classes = JOB_GROUPS[selectedGroup];

    const panelHeader = h(
      "div",
      { class: "library-panel-header" },
      h("h2", { class: "library-panel-title" }, selectedGroup),
      h(
        "div",
        { style: "display:flex;gap:6px;flex-wrap:wrap;" },
        h(
          "button",
          { class: "btn btn-outline btn-sm", onclick: loadPresetMitsData },
          "📦 기본 데이터 불러오기",
        ),
        h(
          "button",
          {
            class: "btn btn-primary",
            onclick: () => openMitForm(null, selectedGroup, selectedClass),
          },
          "+ 외생기 추가",
        ),
      ),
    );

    const classTabs = h("div", { class: "job-class-tabs" });
    classes.forEach((cls) => {
      const clsIcon = ClassIcons.get(cls) || JOB_ICON_URLS[cls];
      const iconEl = h("span", {
        class: "class-tab-icon" + (clsIcon ? "" : " empty"),
      });
      if (clsIcon) {
        iconEl.append(h("img", { src: clsIcon, alt: cls }));
      }
      const tab = h(
        "button",
        { class: "job-class-tab" + (cls === selectedClass ? " active" : "") },
        iconEl,
        cls,
      );
      tab.onclick = () => {
        selectedClass = cls;
        classTabs
          .querySelectorAll(".job-class-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        rebuildItems();
      };
      classTabs.append(tab);
    });

    const itemsArea = h("div", {});
    let selectedCat = "전체";

    function rebuildItems() {
      itemsArea.innerHTML = "";

      // 분류 필터 바 — 현재 직업/직군에 실제 스킬이 있는 카테고리만 표시
      const allMitsForClass = GlobalMit.list().filter(
        (m) =>
          m.jobGroup === selectedGroup &&
          (m.jobClass === selectedClass || m.isCommon),
      );
      const usedCats = new Set(
        allMitsForClass.map((m) => m.skillCategory).filter(Boolean),
      );
      const visibleCats = [
        "전체",
        ...SKILL_CATEGORIES.filter((cat) => usedCats.has(cat)),
      ];
      if (selectedCat !== "전체" && !usedCats.has(selectedCat))
        selectedCat = "전체";

      const filterBar = h("div", { class: "cat-filter-bar" });
      visibleCats.forEach((cat) => {
        const catStyle =
          cat !== "전체" && SKILL_CAT_COLORS[cat]
            ? selectedCat === cat
              ? `background:${SKILL_CAT_COLORS[cat].bg};color:${SKILL_CAT_COLORS[cat].color};border-color:${SKILL_CAT_COLORS[cat].border};font-weight:700;`
              : `color:${SKILL_CAT_COLORS[cat].color};border-color:${SKILL_CAT_COLORS[cat].border};`
            : "";
        const btn = h(
          "button",
          {
            class: "cat-filter-btn" + (selectedCat === cat ? " active" : ""),
            style: catStyle,
            onclick: () => {
              selectedCat = cat;
              rebuildItems();
            },
          },
          cat,
        );
        filterBar.append(btn);
      });
      itemsArea.append(filterBar);

      let mits = GlobalMit.list().filter(
        (m) =>
          m.jobGroup === selectedGroup &&
          (m.jobClass === selectedClass || m.isCommon),
      );
      if (selectedCat !== "전체")
        mits = mits.filter((m) => m.skillCategory === selectedCat);

      if (!mits.length) {
        itemsArea.append(
          h(
            "div",
            { class: "empty-state", style: "padding:40px 0" },
            h("div", { class: "empty-state-icon" }, "🛡"),
            h("div", { class: "empty-state-title" }, "등록된 외생기가 없어요"),
            h(
              "div",
              { class: "empty-state-desc" },
              "+ 외생기 추가 버튼을 클릭하거나 기본 데이터를 불러오세요.",
            ),
          ),
        );
        return;
      }
      const grid = h("div", { class: "mit-grid" });
      mits
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .forEach((item) => {
          const card = h("div", { class: "mit-card" });
          const catC =
            item.skillCategory && SKILL_CAT_COLORS[item.skillCategory];
          const iconEl = h("div", {
            class: "mit-card-icon",
            style: `background:${item.color || "#89CFF0"}33;border:2px solid ${catC ? catC.border : item.color || "#89CFF0"};`,
          });
          if (item.imageUrl)
            iconEl.append(h("img", { src: item.imageUrl, alt: item.name }));
          else {
            iconEl.textContent = item.name.slice(0, 2);
            iconEl.style.fontSize = "18px";
            iconEl.style.fontWeight = "700";
            iconEl.style.color = item.color || "#89CFF0";
          }
          const actions = h(
            "div",
            { class: "mit-card-actions" },
            h(
              "button",
              {
                class: "btn-icon",
                title: "수정",
                onclick: () => openMitForm(item, selectedGroup, selectedClass),
              },
              "✏️",
            ),
            h(
              "button",
              {
                class: "btn-icon",
                title: "삭제",
                onclick: () => {
                  if (confirm("삭제할까요?")) {
                    GlobalMit.delete(item.id);
                    rebuildItems();
                  }
                },
              },
              "🗑️",
            ),
          );
          let catBadge = null;
          if (item.skillCategory && catC) {
            catBadge = h(
              "span",
              {
                class: "skill-cat-badge",
                style: `background:${catC.bg};color:${catC.color};border-color:${catC.border};`,
              },
              item.skillCategory,
            );
          }
          const nameRow = h(
            "div",
            {
              style:
                "display:flex;flex-direction:column;align-items:center;gap:2px;",
            },
            h("div", { class: "mit-card-name" }, item.name),
            catBadge,
            item.isCommon ? h("span", { class: "common-badge" }, "공통") : null,
          );
          card.append(iconEl, nameRow, actions);
          grid.append(card);
        });
      itemsArea.append(grid);
    }

    rebuildItems();
    panel.append(panelHeader, classTabs, itemsArea);
  }

  rebuildGroupNav();
  rebuildPanel();
  layout.append(groupNav, panel);
  main.append(layout);
}

function openMitForm(existing, defaultGroup, defaultClass) {
  const nameInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예) 책략가",
      value: existing?.name || "",
    }),
  );

  const groupSel = h("select", { class: "form-select" });
  Object.keys(JOB_GROUPS).forEach((g) => {
    const opt = h("option", { value: g }, g);
    if ((existing?.jobGroup || defaultGroup) === g) opt.selected = true;
    groupSel.append(opt);
  });

  const classSel = h("select", { class: "form-select" });
  function rebuildClassSel() {
    classSel.innerHTML = "";
    JOB_GROUPS[groupSel.value].forEach((cls) => {
      const opt = h("option", { value: cls }, cls);
      if ((existing?.jobClass || defaultClass) === cls) opt.selected = true;
      classSel.append(opt);
    });
  }
  groupSel.onchange = rebuildClassSel;
  rebuildClassSel();

  const colorInput = Object.assign(
    h("input", {
      class: "theme-color-input",
      type: "color",
      value: existing?.color || "#89CFF0",
    }),
  );

  // 아이콘 파일 업로드
  let imageUrl = existing?.imageUrl || null;
  const iconPreviewWrap = h("div", { style: "margin-top:8px;" });
  const iconFileInput = h("input", {
    type: "file",
    accept: "image/*",
    style: "display:none",
  });

  function refreshIconPreview() {
    iconPreviewWrap.innerHTML = "";
    if (imageUrl) {
      const img = h("img", { src: imageUrl, class: "icon-preview" });
      const removeBtn = h(
        "button",
        {
          class: "btn btn-outline btn-sm",
          style: "margin-left:8px;",
          onclick: () => {
            imageUrl = null;
            refreshIconPreview();
          },
        },
        "제거",
      );
      iconPreviewWrap.append(img, removeBtn);
    }
  }
  refreshIconPreview();

  const iconUploadBtn = h(
    "label",
    { class: "icon-upload-btn", style: "cursor:pointer;" },
    "📁 아이콘 파일 선택",
  );
  iconUploadBtn.append(iconFileInput);
  iconFileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      imageUrl = ev.target.result;
      refreshIconPreview();
    };
    reader.readAsDataURL(file);
  };

  const isCommonCheck = h("input", {
    type: "checkbox",
    style: "width:16px;height:16px;cursor:pointer;accent-color:var(--primary);",
  });
  if (existing?.isCommon) isCommonCheck.checked = true;

  // 스킬 분류 선택
  const catSel = h("select", { class: "form-select" });
  SKILL_CATEGORIES.forEach((cat) => {
    const opt = h("option", { value: cat }, cat);
    if ((existing?.skillCategory || "기타") === cat) opt.selected = true;
    catSel.append(opt);
  });

  // 외부 아이콘 URL 입력
  const iconUrlInput = h("input", {
    class: "form-input",
    type: "text",
    placeholder: "https://xivapi.com/... 또는 이미지 URL",
    value: "",
  });
  iconUrlInput.style.fontSize = "12px";
  const applyUrlBtn = h(
    "button",
    {
      class: "btn btn-outline btn-sm",
      type: "button",
      style: "white-space:nowrap;",
    },
    "URL 적용",
  );
  applyUrlBtn.onclick = () => {
    const url = iconUrlInput.value.trim();
    if (!url) return;
    imageUrl = url;
    refreshIconPreview();
    iconUrlInput.value = "";
  };

  const body = h(
    "div",
    {},
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "스킬명 *"),
      nameInput,
    ),
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "직군"),
        groupSel,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "직업"),
        classSel,
      ),
    ),
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "스킬 분류"),
        catSel,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "색상"),
        colorInput,
      ),
    ),
    h(
      "div",
      {
        class: "form-group",
        style: "display:flex;align-items:center;gap:8px;padding:6px 0;",
      },
      isCommonCheck,
      h(
        "label",
        {
          style:
            "cursor:pointer;font-size:13px;font-weight:600;color:var(--primary);",
          onclick: () => {
            isCommonCheck.checked = !isCommonCheck.checked;
          },
        },
        "공통 — 같은 직군의 모든 직업 탭에 표시",
      ),
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "아이콘 이미지"),
      h(
        "div",
        { style: "display:flex;gap:6px;align-items:center;margin-bottom:6px;" },
        iconUrlInput,
        applyUrlBtn,
      ),
      h(
        "div",
        { style: "display:flex;align-items:center;gap:8px;" },
        iconUploadBtn,
        iconPreviewWrap,
      ),
    ),
  );

  showModal(existing ? "외생기 수정" : "외생기 추가", body, {
    onConfirm: () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.focus();
        return;
      }
      const data = {
        name,
        jobGroup: groupSel.value,
        jobClass: classSel.value,
        skillCategory: catSel.value,
        color: colorInput.value,
        imageUrl,
        isCommon: isCommonCheck.checked,
      };
      if (existing) GlobalMit.update(existing.id, data);
      else GlobalMit.create(data);
      App.closeModal();
      navigate(location.hash || "#/");
    },
  });
  setTimeout(() => nameInput.focus(), 50);
}

// ══════════════════════════════════════════════════════════
// LINKS PAGE
// ══════════════════════════════════════════════════════════
function renderLinks(main) {
  main.innerHTML = "";

  function rebuild() {
    main.innerHTML = "";
    const links = Links.list();

    const pageHeader = h(
      "div",
      { class: "page-header" },
      h(
        "div",
        {},
        h("h1", { class: "page-title" }, "기타 링크"),
        h(
          "p",
          { class: "page-subtitle" },
          "자주 사용하는 외부 링크를 저장하세요.",
        ),
      ),
      h(
        "button",
        {
          class: "btn btn-primary",
          onclick: () => openLinkForm(null, rebuild),
        },
        "+ 링크 추가",
      ),
    );
    main.append(pageHeader);

    if (!links.length) {
      main.append(
        h(
          "div",
          { class: "empty-state" },
          h("div", { class: "empty-state-icon" }, "🔗"),
          h("div", { class: "empty-state-title" }, "등록된 링크가 없어요"),
          h(
            "div",
            { class: "empty-state-desc" },
            "+ 링크 추가 버튼으로 자주 쓰는 사이트를 등록하세요.",
          ),
        ),
      );
      return;
    }

    links.forEach((link) => {
      const card = h(
        "div",
        { class: "link-card" },
        h("div", { class: "link-card-icon" }, link.icon || "🔗"),
        h(
          "div",
          { class: "link-card-body" },
          h("div", { class: "link-card-label" }, link.label),
          h("div", { class: "link-card-url" }, link.url),
        ),
        h(
          "div",
          { class: "link-card-actions" },
          h(
            "button",
            {
              class: "btn btn-primary btn-sm",
              onclick: () => App.openPreview(link.url, link.label),
            },
            "미리보기",
          ),
          h(
            "a",
            {
              class: "btn btn-outline btn-sm",
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "↗ 열기",
          ),
          h(
            "button",
            { class: "btn-icon", onclick: () => openLinkForm(link, rebuild) },
            "✏️",
          ),
          h(
            "button",
            {
              class: "btn-icon",
              onclick: () => {
                if (confirm("삭제할까요?")) {
                  Links.delete(link.id);
                  rebuild();
                }
              },
            },
            "🗑️",
          ),
        ),
      );
      main.append(card);
    });
  }

  rebuild();
}

function openLinkForm(existing, rebuild) {
  const iconInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "예) 📊",
      value: existing?.icon || "",
    }),
  );
  const labelInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "text",
      placeholder: "링크 이름",
      value: existing?.label || "",
    }),
  );
  const urlInput = Object.assign(
    h("input", {
      class: "form-input",
      type: "url",
      placeholder: "https://...",
      value: existing?.url || "",
    }),
  );

  const body = h(
    "div",
    {},
    h(
      "div",
      { class: "form-row" },
      h(
        "div",
        { class: "form-group", style: "max-width:80px;" },
        h("label", { class: "form-label" }, "아이콘"),
        iconInput,
      ),
      h(
        "div",
        { class: "form-group" },
        h("label", { class: "form-label" }, "이름 *"),
        labelInput,
      ),
    ),
    h(
      "div",
      { class: "form-group" },
      h("label", { class: "form-label" }, "URL *"),
      urlInput,
    ),
  );

  showModal(existing ? "링크 수정" : "링크 추가", body, {
    onConfirm: () => {
      const label = labelInput.value.trim();
      const url = urlInput.value.trim();
      if (!label || !url) {
        label ? urlInput.focus() : labelInput.focus();
        return;
      }
      const data = { label, url, icon: iconInput.value.trim() || "🔗" };
      if (existing) Links.update(existing.id, data);
      else Links.create(data);
      App.closeModal();
      rebuild();
    },
  });
  setTimeout(() => labelInput.focus(), 50);
}

// ══════════════════════════════════════════════════════════
// APP CONTROLLER
// ══════════════════════════════════════════════════════════
const App = {
  closeModal(event) {
    if (event && event.target !== document.getElementById("modal-overlay"))
      return;
    document.getElementById("modal-overlay").classList.add("hidden");
  },
  openPreview(url, title) {
    document.getElementById("preview-title").textContent = title || url;
    document.getElementById("preview-external").href = url;
    document.getElementById("preview-iframe").src = url;
    document.getElementById("preview-overlay").classList.remove("hidden");
  },
  closePreview(event) {
    if (event && event.target !== document.getElementById("preview-overlay"))
      return;
    document.getElementById("preview-overlay").classList.add("hidden");
    document.getElementById("preview-iframe").src = "about:blank";
  },
};

// ══════════════════════════════════════════════════════════
// 단축키 / 도움말 모달
// ══════════════════════════════════════════════════════════
function openShortcutHelp() {
  function section(title, rows) {
    return h(
      "div",
      { style: "margin-bottom:20px;" },
      h(
        "div",
        {
          style:
            "font-weight:700;font-size:13px;color:var(--primary);margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid var(--primary-light);",
        },
        title,
      ),
      h(
        "table",
        { style: "width:100%;border-collapse:collapse;" },
        ...rows.map(([key, desc]) =>
          h(
            "tr",
            {},
            h(
              "td",
              { style: "width:36%;padding:5px 8px 5px 0;vertical-align:top;" },
              h(
                "kbd",
                {
                  style:
                    "display:inline-block;padding:2px 8px;border:1px solid #ccc;border-radius:5px;background:#f5f5f5;font-size:12px;font-family:monospace;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,.1);",
                },
                key,
              ),
            ),
            h(
              "td",
              {
                style:
                  "padding:5px 0;font-size:13px;color:#444;vertical-align:top;",
              },
              desc,
            ),
          ),
        ),
      ),
    );
  }

  function tip(icon, title, desc) {
    return h(
      "div",
      {
        style:
          "display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-radius:8px;background:var(--primary-light);margin-bottom:8px;",
      },
      h("span", { style: "font-size:18px;flex-shrink:0;" }, icon),
      h(
        "div",
        {},
        h(
          "div",
          { style: "font-weight:700;font-size:13px;margin-bottom:2px;" },
          title,
        ),
        h("div", { style: "font-size:12px;color:#555;line-height:1.5;" }, desc),
      ),
    );
  }

  const body = h(
    "div",
    { style: "max-height:70vh;overflow-y:auto;padding-right:4px;" },
    section("⌨️ 키보드 단축키", [
      ["?", "이 도움말 열기"],
      ["Esc", "모달 / 미리보기 닫기"],
      ["Enter", "타임라인 인라인 행 저장 (입력란 포커스 시)"],
      ["Esc (입력 중)", "타임라인 인라인 편집 취소"],
    ]),

    section("🖱️ 마우스 조작", [
      ["행 더블클릭", "타임라인 행 인라인 편집"],
      ["셀 더블클릭", "타임라인 특정 셀만 인라인 편집"],
      ["드래그 (이동 모드)", "타임라인 / 오답노트 순서 변경"],
    ]),

    h(
      "div",
      {
        style:
          "font-weight:700;font-size:13px;color:var(--primary);margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid var(--primary-light);",
      },
      "💡 기능 안내",
    ),
    tip(
      "💾",
      "전체 백업 / 복원",
      "메인 화면 → 💾 백업/복원 버튼으로 모든 공략·외생기·링크를 JSON 파일로 저장하고 복원할 수 있어요.",
    ),
    tip(
      "⚡",
      "이전 설정으로 입력 채우기",
      '구글 시트 불러오기 화면에서, 저장된 URL·시트·범위·매핑을 한 번에 자동 채워줍니다. 입력만 채울 뿐 실제 붙여넣기는 "타임라인에 붙여넣기" 버튼을 눌러야 해요.',
    ),
    tip(
      "↕",
      "이동 모드",
      "공략 상세 화면 우측 상단 ↕ 이동 버튼 → 드래그 핸들(⠿)로 타임라인 행·오답노트 순서를 바꿀 수 있어요.",
    ),
    tip(
      "🗑",
      "삭제 모드",
      "🗑 삭제 버튼을 누르면 체크박스가 나타나요. 여러 항목을 선택 후 한꺼번에 삭제할 수 있어요.",
    ),
    tip(
      "◀▶",
      "타임라인 이동 바",
      "타임라인 상단 이동 바의 ◀ 버튼으로 접고 ▶ 버튼으로 펼칠 수 있어요. 구분선(──)이 있을 때만 표시돼요.",
    ),
    tip(
      "🔒",
      "오답노트 잠금",
      "오답노트 카드의 잠금 버튼을 누르면 수정이 불가능해져요. 다시 누르면 해제돼요.",
    ),
  );

  showModal("⌨️ 단축키 / 도움말", body, { noCancelBtn: true });
}

// ── 키보드 단축키 ─────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const overlay = document.getElementById("modal-overlay");
    if (!overlay.classList.contains("hidden"))
      App.closeModal({ target: overlay });
    const previewOverlay = document.getElementById("preview-overlay");
    if (!previewOverlay.classList.contains("hidden"))
      App.closePreview({ target: previewOverlay });
  }
  if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
    const active = document.activeElement;
    const isTyping =
      active &&
      (active.tagName === "INPUT" ||
        active.tagName === "TEXTAREA" ||
        active.isContentEditable);
    if (!isTyping) openShortcutHelp();
  }
});

// ── 라우터 초기화 ─────────────────────────────────────────
window.addEventListener("hashchange", () => navigate(location.hash));
document.addEventListener("DOMContentLoaded", () =>
  navigate(location.hash || "#/"),
);
