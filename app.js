// ===== DEFAULTS =====
const DEFAULT_MONTH=()=>({
  income:[{id:1,name:'월급',category:'급여',amount:2197223}],
  fixed:[
    {id:1,name:'월세',category:'주거',amount:460000,isSavings:false},
    {id:2,name:'공과금 (전기)',category:'공과금',amount:25710,isSavings:false},
    {id:3,name:'공과금 (가스)',category:'공과금',amount:7650,isSavings:false},
    {id:4,name:'기부/주차',category:'기타',amount:10000,isSavings:false},
    {id:5,name:'보험+휴대폰',category:'보험/통신',amount:120000,isSavings:false},
    {id:6,name:'국민은행 적금',category:'저축',amount:1200000,isSavings:true},
    {id:7,name:'주택청약',category:'저축',amount:50000,isSavings:true},
  ],
  variable:[],
});

const DEFAULT_DATA=()=>{
  const _n=new Date();const _y=_n.getFullYear();const _m=_n.getMonth()+1;
  return ({
  themeOpacity:50,
  themeOpacityLocked:false,
  monthlyData:{},creditCards:[],assets:[],
  stocks:[
    {id:1,name:'삼성전자우',ticker:'005935',sector:'반도체',buyPrice:109472,currentPrice:109472,targetPrice:0,quantity:1,stockType:'domestic'},
    {id:2,name:'삼성전자',ticker:'005930',sector:'반도체',buyPrice:156700,currentPrice:156700,targetPrice:0,quantity:1,stockType:'domestic'},
    {id:3,name:'미국 나스닥 ETF',ticker:'QQQ',sector:'ETF',buyPrice:49145,currentPrice:49145,targetPrice:0,quantity:1,stockType:'foreign',buyAmount:49145,currentAmount:49145},
    {id:4,name:'426030',ticker:'426030',sector:'ETF',buyPrice:55780,currentPrice:55780,targetPrice:0,quantity:1,stockType:'domestic'},
  ],
  analysisYear:_y,
  analysisMonth:_m,
  expenseNatureSettings:{},
  consumptionCalendar:{},savingsGoals:{},foodCalendar:{},foodDirectSet:{},
  cardSettings:[{
    id:1,name:'신한카드 MR.LIFE',
    rates:[
      {id:1,minMonths:2,maxMonths:2,rate:5.9},
      {id:2,minMonths:3,maxMonths:3,rate:7.9},
      {id:3,minMonths:4,maxMonths:6,rate:10.9},
      {id:4,minMonths:7,maxMonths:12,rate:13.9},
      {id:5,minMonths:13,maxMonths:24,rate:15.9},
    ]
  }],
  currentMonths:{dashboard:{y:_y,m:_m},income:{y:_y,m:_m},credit:{y:_y,m:_m},food:{y:_y,m:_m},ledger:{y:_y,m:_m}},
  calYear:_y,ledger:{},subscriptions:[],automations:[],closedMonths:{},monthClosedArchive:{},ledgerFilter:null,ledgerTagFilter:null,
  budgetCategories:[
    {id:101,name:'식비',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
    {id:102,name:'생필품',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
    {id:103,name:'문화/여가',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
    {id:104,name:'기타',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
  ],
  monthBudgets:{},
  assetCategories:['계좌','적금','주식'],
  remainingBudgetSettings:{label:'현재 남은 예산',amount:0},
  fundCalc:{amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]},
  stockAssetDirect:false,
  stockAssetAutoId:null,
  defaultItems:{income:[],fixed:[]},
  calFoodSync:{},
  deleteExclusions:{income:false,food:false,ledger:false,consumption:false,closed:false},
  ledgerCategories:[
    {id:1,name:'🍚 식비',isSavings:false},
    {id:2,name:'🧴 생활용품',isSavings:false},
    {id:3,name:'🏠 주거·공과금',isSavings:false},
    {id:4,name:'🚗 교통·차량',isSavings:false},
    {id:5,name:'💪 건강',isSavings:false},
    {id:6,name:'🎨 문화·취미',isSavings:false},
    {id:7,name:'👕 패션·미용',isSavings:false},
    {id:8,name:'💰 금융',isSavings:false},
    {id:9,name:'✈ 여행',isSavings:false},
    {id:10,name:'🎁 경조사',isSavings:false},
    {id:11,name:'📦 기타',isSavings:false},
  ],
  keywordRules:[],
  calSpendMode:false,
  calAmountLegend:[
    {min:0,      max:0,      type:'none',       label:'0원'},
    {min:1,      max:9999,   type:'theme-ultralight', label:'~1만원'},
    {min:10000,  max:49999,  type:'theme-mid',   label:'1만~5만원'},
    {min:50000,  max:99999,  bg:'#FFF9C4', color:'#F57F17', label:'5만~10만원'},
    {min:100000, max:199999, bg:'#C8E6C9', color:'#2E7D32', label:'10만~20만원'},
    {min:200000, max:99999999,bg:'#FFCDD2',color:'#C62828', label:'20만원+'},
  ],
});};

let S=null;

function loadState(){
  try{
    const raw=localStorage.getItem('kakeibo_v4');
    if(raw){
      S=JSON.parse(raw);
      const D=DEFAULT_DATA();
      if(!S.monthlyData)S.monthlyData={};
      if(!S.cardSettings)S.cardSettings=D.cardSettings;
      if(!S.currentMonths)S.currentMonths=D.currentMonths;
      if(!S.calYear)S.calYear=new Date().getFullYear();
      if(!S.savingsGoals)S.savingsGoals={};
      if(!S.foodDirectSet)S.foodDirectSet={};
      if(!S.foodCalendar)S.foodCalendar={};
      if(!S.creditCards)S.creditCards=[];
      if(!S.assets)S.assets=[];
      if(!S.stocks)S.stocks=D.stocks;
      if(!S.consumptionCalendar)S.consumptionCalendar={};
      if(!S.ledger)S.ledger={};
      if(!S.subscriptions)S.subscriptions=[];
      if(!S.subSkipMonths)S.subSkipMonths={};
      if(!S.automations)S.automations=[];
      // Migrate automations: add type/memo/tags for old entries
      S.automations=S.automations.map(a=>({type:'expense',memo:a.name||'',tags:[],...a}));
      if(!S.autoSkippedIds)S.autoSkippedIds=[];
      if(!S.closedMonths)S.closedMonths={};
      if(!S.monthClosedArchive)S.monthClosedArchive={};
      if(!S.budgetCategories)S.budgetCategories=DEFAULT_DATA().budgetCategories;
      if(!S.monthBudgets)S.monthBudgets={};
      if(!S.assetCategories)S.assetCategories=['계좌','적금','주식'];
      if(!S.remainingBudgetSettings)S.remainingBudgetSettings={label:'현재 남은 예산',amount:0};
      // Migrate per-category sync: add synced/syncFrom/linkedCategories to old categories
      S.budgetCategories=S.budgetCategories.map(c=>({synced:true,syncFrom:'',linkedCategories:[],...c}));
      if(!S.ledgerCategories)S.ledgerCategories=DEFAULT_DATA().ledgerCategories;
      if(!S.keywordRules)S.keywordRules=[];
      if(!S.deleteExclusions)S.deleteExclusions={income:false,food:false,ledger:false,consumption:false,closed:false};
      if(S.calSpendMode===undefined)S.calSpendMode=false;
      if(!S.calAmountLegend)S.calAmountLegend=DEFAULT_DATA().calAmountLegend;
      // Migrate 1원~1만원 tier to theme-ultralight
      if(!S._callegend_ultra_v1){if(S.calAmountLegend&&S.calAmountLegend[1]&&S.calAmountLegend[1].type==='theme-light')S.calAmountLegend[1].type='theme-ultralight';S._callegend_ultra_v1=true;}
      // Migrate fundCalc: add assetLinked field
      if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
      if(S.fundCalc.assetLinked===undefined)S.fundCalc.assetLinked=false;
      if(S.fundCalc.assetLinkedAt===undefined)S.fundCalc.assetLinkedAt=null;
      if(!S.fundCalc.linkedAssetIds)S.fundCalc.linkedAssetIds=[];
      if(S.stockAssetDirect===undefined)S.stockAssetDirect=false;
      if(S.stockAssetAutoId===undefined)S.stockAssetAutoId=null;
      if(!S.calFoodSync)S.calFoodSync={};
      // 예산 카테고리 강제 리셋 (식비/생필품/문화여가/기타 각 20만)
      if(!S._budget_reset_v2){
        S.budgetCategories=[
          {id:201,name:'식비',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
          {id:202,name:'생필품',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
          {id:203,name:'문화/여가',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
          {id:204,name:'기타',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
        ];
        S.monthBudgets={};
        S._budget_reset_v2=true;
      }
      if(S.analysisYear===undefined)S.analysisYear=new Date().getFullYear();
      if(S.analysisMonth===undefined)S.analysisMonth=new Date().getMonth()+1;
      if(!S.expenseNatureSettings)S.expenseNatureSettings={};
      if(S.ledgerFilter===undefined)S.ledgerFilter=null;
      S.ledgerTagFilter=null;
      if(!S.currentMonths.ledger)S.currentMonths.ledger={...S.currentMonths.dashboard};
      if(S.themeOpacity===undefined)S.themeOpacity=50;
      if(S.themeOpacityLocked===undefined)S.themeOpacityLocked=false;
      if(!S.travels)S.travels={trips:[],bucketList:[]};
      if(!S.travels.trips)S.travels.trips=[];
      if(!S.travels.bucketList)S.travels.bucketList=[];
      // 가계부 카테고리 기본값 재설정 (v1: 식비/생활/주거/교통/문화/저축투자/기타)
      if(!S._lcat_reset_v1){
        S.ledgerCategories=[
          {id:1,name:'식비',isSavings:false},
          {id:2,name:'생활',isSavings:false},
          {id:3,name:'주거/공과',isSavings:false},
          {id:4,name:'교통',isSavings:false},
          {id:5,name:'문화/여가',isSavings:false},
          {id:6,name:'저축/투자',isSavings:true},
          {id:7,name:'기타',isSavings:false},
        ];
        S._lcat_reset_v1=true;
      }
      // 가계부 카테고리 이모지 버전으로 재설정 (v2: 11개 이모지 카테고리)
      if(!S._lcat_reset_v2){
        S.ledgerCategories=[
          {id:1,name:'🍚 식비',isSavings:false},
          {id:2,name:'🧴 생활용품',isSavings:false},
          {id:3,name:'🏠 주거·공과금',isSavings:false},
          {id:4,name:'🚗 교통·차량',isSavings:false},
          {id:5,name:'💪 건강',isSavings:false},
          {id:6,name:'🎨 문화·취미',isSavings:false},
          {id:7,name:'👕 패션·미용',isSavings:false},
          {id:8,name:'💰 금융',isSavings:false},
          {id:9,name:'✈ 여행',isSavings:false},
          {id:10,name:'🎁 경조사',isSavings:false},
          {id:11,name:'📦 기타',isSavings:false},
        ];
        S._lcat_reset_v2=true;
      }
      S.stocks=S.stocks.map(st=>{
        const isKrTicker=/^\d{6}$/.test(st.ticker);
        const defaultType=isKrTicker?'domestic':'foreign';
        return {sector:'',targetPrice:0,stockType:defaultType,...st};
      });
      // Migrate savingsGoals old format
      for(const y of Object.keys(S.savingsGoals)){
        const val=S.savingsGoals[y];
        if(val&&!Array.isArray(val)){
          const flat=[];
          for(const m of Object.keys(val)){if(Array.isArray(val[m]))val[m].forEach(g=>flat.push({...g,id:genId()}))}
          S.savingsGoals[y]=flat;
        }
      }
      // DATA MIGRATION: remove 커피+샐러드, autoFromFood; add isSavings to fixed items
      if(!S._migrated_v2){
        for(const key of Object.keys(S.monthlyData)){
          const d=S.monthlyData[key];
          if(d.variable){
            d.variable=d.variable.filter(v=>v.name!=='커피+샐러드'&&!v.autoFromFood);
          }
          if(d.fixed){
            d.fixed=d.fixed.map(f=>({isSavings:f.category==='저축'||f.isSavings===true,...f}));
          }
        }
        S._migrated_v2=true;
        saveState();
      }
    } else {
      const oldRaw=localStorage.getItem('kakeibo_v3');
      if(oldRaw){
        const old=JSON.parse(oldRaw);
        S=DEFAULT_DATA();
        S.creditCards=old.creditCards||[];S.assets=old.assets||[];
        S.stocks=(old.stocks||DEFAULT_DATA().stocks).map(st=>{
        const isKrTicker=/^\d{6}$/.test(st.ticker);
        const defaultType=isKrTicker?'domestic':'foreign';
        return {sector:'',targetPrice:0,stockType:defaultType,...st};
      });
        S.consumptionCalendar=old.consumptionCalendar||{};
        S.savingsGoals=old.savingsGoals||{};
        S.foodCalendar=old.foodCalendar||{};
        S.foodDirectSet=old.foodDirectSet||{};
        S.cardSettings=old.cardSettings||DEFAULT_DATA().cardSettings;
        S.currentMonths=old.currentMonths||DEFAULT_DATA().currentMonths;
        S.calYear=old.calYear||2026;
        if(old.globalIncome||old.globalFixed||old.globalVariable){
          const cm=S.currentMonths.dashboard;const key=mkey(cm.y,cm.m);
          const def=DEFAULT_MONTH();
          S.monthlyData[key]={
            income:old.globalIncome||def.income,
            fixed:(old.globalFixed||def.fixed).map(f=>({isSavings:f.category==='저축',...f})),
            variable:(old.globalVariable||[]).filter(v=>v.name!=='커피+샐러드'&&!v.autoFromFood),
          };
        }
        S._migrated_v2=true;
      } else {S=DEFAULT_DATA();S._migrated_v2=true;}
    }
  } catch(e){S=DEFAULT_DATA();S._migrated_v2=true;}
}

function saveState(){
  try{localStorage.setItem('kakeibo_v4',JSON.stringify(S));}catch(e){alert('저장 공간이 부족합니다. 백업 후 일부 데이터를 정리해 주세요.');}
  if(window.FB_SAVE) window.FB_SAVE(S);
  updateStorageBar();
}

// Firebase에서 불러온 데이터를 S에 병합
window.FB_MERGE = function(fbData) {
  try {
    S = fbData;
    const D = DEFAULT_DATA();
    if(!S.monthlyData)S.monthlyData={};
    if(!S.cardSettings)S.cardSettings=D.cardSettings;
    if(!S.currentMonths)S.currentMonths=D.currentMonths;
    if(!S.calYear)S.calYear=new Date().getFullYear();
    if(!S.savingsGoals)S.savingsGoals={};
    if(!S.foodDirectSet)S.foodDirectSet={};
    if(!S.foodCalendar)S.foodCalendar={};
    if(!S.creditCards)S.creditCards=[];
    if(!S.assets)S.assets=[];
    if(!S.stocks)S.stocks=D.stocks;
    if(!S.consumptionCalendar)S.consumptionCalendar={};
    if(!S.ledger)S.ledger={};
    if(!S.subscriptions)S.subscriptions=[];
    if(!S.automations)S.automations=[];
    // Migrate automations: add type/memo/tags for old entries
    S.automations=S.automations.map(a=>({type:'expense',memo:a.name||'',tags:[],...a}));
    if(!S.autoSkippedIds)S.autoSkippedIds=[];
    if(!S.closedMonths)S.closedMonths={};
    if(!S.monthClosedArchive)S.monthClosedArchive={};
    if(!S.budgetCategories)S.budgetCategories=D.budgetCategories;
    if(!S.monthBudgets)S.monthBudgets={};
    if(!S.assetCategories)S.assetCategories=['계좌','적금','주식'];
    if(!S.remainingBudgetSettings)S.remainingBudgetSettings={label:'현재 남은 예산',amount:0};
    if(!S.ledgerCategories)S.ledgerCategories=D.ledgerCategories;
    if(!S.keywordRules)S.keywordRules=[];
    if(S.calSpendMode===undefined)S.calSpendMode=false;
    if(!S.calAmountLegend)S.calAmountLegend=D.calAmountLegend;
    // Migrate 1원~1만원 tier to theme-ultralight
    if(!S._callegend_ultra_v1){if(S.calAmountLegend&&S.calAmountLegend[1]&&S.calAmountLegend[1].type==='theme-light')S.calAmountLegend[1].type='theme-ultralight';S._callegend_ultra_v1=true;}
    if(S.stockAssetDirect===undefined)S.stockAssetDirect=false;
    if(S.stockAssetAutoId===undefined)S.stockAssetAutoId=null;
    if(!S.calFoodSync)S.calFoodSync={};
    if(S.analysisYear===undefined)S.analysisYear=new Date().getFullYear();
    if(S.analysisMonth===undefined)S.analysisMonth=new Date().getMonth()+1;
    if(!S.expenseNatureSettings)S.expenseNatureSettings={};
    // 가계부 카테고리 이모지 버전으로 재설정 (v2)
    if(!S._lcat_reset_v2){
      S.ledgerCategories=[
        {id:1,name:'🍚 식비',isSavings:false},
        {id:2,name:'🧴 생활용품',isSavings:false},
        {id:3,name:'🏠 주거·공과금',isSavings:false},
        {id:4,name:'🚗 교통·차량',isSavings:false},
        {id:5,name:'💪 건강',isSavings:false},
        {id:6,name:'🎨 문화·취미',isSavings:false},
        {id:7,name:'👕 패션·미용',isSavings:false},
        {id:8,name:'💰 금융',isSavings:false},
        {id:9,name:'✈ 여행',isSavings:false},
        {id:10,name:'🎁 경조사',isSavings:false},
        {id:11,name:'📦 기타',isSavings:false},
      ];
      S._lcat_reset_v2=true;
    }
    // 예산 카테고리 강제 리셋
    if(!S._budget_reset_v2){
      S.budgetCategories=[
        {id:201,name:'식비',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
        {id:202,name:'생필품',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
        {id:203,name:'문화/여가',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
        {id:204,name:'기타',budget:200000,synced:true,syncFrom:'',linkedCategories:[]},
      ];
      S.monthBudgets={};
      S._budget_reset_v2=true;
    }
    if(S.ledgerFilter===undefined)S.ledgerFilter=null;
    S.ledgerTagFilter=null;
    if(!S.currentMonths.ledger)S.currentMonths.ledger={...S.currentMonths.dashboard};
    if(S.themeOpacity===undefined)S.themeOpacity=50;
    if(S.themeOpacityLocked===undefined)S.themeOpacityLocked=false;
    if(!S.travels)S.travels={trips:[],bucketList:[]};
    if(!S.travels.trips)S.travels.trips=[];
    if(!S.travels.bucketList)S.travels.bucketList=[];
    if(S.payDay===undefined)S.payDay=null;
    if(S.payDayLocked===undefined)S.payDayLocked=false;
    S.budgetCategories=S.budgetCategories.map(c=>({synced:true,syncFrom:'',linkedCategories:[],...c}));
    // Migrate fundCalc: add assetLinked field
    if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
    if(S.fundCalc.assetLinked===undefined)S.fundCalc.assetLinked=false;
    if(S.fundCalc.assetLinkedAt===undefined)S.fundCalc.assetLinkedAt=null;
    if(!S.fundCalc.linkedAssetIds)S.fundCalc.linkedAssetIds=[];
  } catch(e) { console.error('[FB_MERGE] 오류:', e); }
};


// ===== MONTHLY THEMES =====
let _dashVarMode = 'current'; // 'current' | 'avg3'

const MONTH_THEMES = {
  1:  { t1:'#1A237E', t2:'#42A5F5', mid:'#90CAF9', bg:'#EEF4FF', border:'#DDEAFF', name:'1월 딥네이비',
        cards:{ income:'#42A5F5', fixed:'#EF7B74', variable:'#FFB347', budget:'#7986CB' } },
  2:  { t1:'#AD1457', t2:'#F48FB1', mid:'#F8BBD0', bg:'#FFF0F5', border:'#FFD6E7', name:'2월 로즈핑크',
        cards:{ income:'#F48FB1', fixed:'#BA68C8', variable:'#FFB74D', budget:'#4DB6AC' } },
  3:  { t1:'#1B5E20', t2:'#66BB6A', mid:'#C8E6C9', bg:'#F0FFF4', border:'#C8EDD9', name:'3월 민트그린',
        cards:{ income:'#66BB6A', fixed:'#EF7B74', variable:'#FFA726', budget:'#42A5F5' } },
  4:  { t1:'#6A1B9A', t2:'#CE93D8', mid:'#E1BEE7', bg:'#F9F0FF', border:'#E8D5F5', name:'4월 라벤더',
        cards:{ income:'#CE93D8', fixed:'#F48FB1', variable:'#FFCC80', budget:'#80DEEA' } },
  5:  { t1:'#5E4BC4', t2:'#A29BFE', mid:'#D1C4E9', bg:'#F7F4FF', border:'#EEE9FF', name:'5월 퍼플',
        cards:{ income:'#A29BFE', fixed:'#F06292', variable:'#FDCB6E', budget:'#74B9FF' } },
  6:  { t1:'#0277BD', t2:'#4FC3F7', mid:'#B3E5FC', bg:'#EFF8FF', border:'#C9E8FF', name:'6월 오션블루',
        cards:{ income:'#4FC3F7', fixed:'#EF7B74', variable:'#FFA726', budget:'#80CBC4' } },
  7:  { t1:'#BF360C', t2:'#FF7043', mid:'#FFCCBC', bg:'#FFF4F0', border:'#FFD4C4', name:'7월 코랄핑크',
        cards:{ income:'#FF7043', fixed:'#CE93D8', variable:'#FFCA28', budget:'#7CB88A' } },
  8:  { t1:'#546E7A', t2:'#90A4AE', mid:'#ECEFF1', bg:'#F4F7F8', border:'#D8E4E8', name:'8월 스틸블루',
        cards:{ income:'#90A4AE', fixed:'#EF9A9A', variable:'#80CBC4', budget:'#80DEEA' } },
  9:  { t1:'#E65100', t2:'#FFA726', mid:'#FFE0B2', bg:'#FFF8EE', border:'#FFE0C0', name:'9월 앰버오렌지',
        cards:{ income:'#FFA726', fixed:'#EC407A', variable:'#FFEE58', budget:'#4DB6AC' } },
  10: { t1:'#B71C1C', t2:'#EF9A9A', mid:'#FFCDD2', bg:'#FFF5F5', border:'#FFD0D0', name:'10월 버건디레드',
        cards:{ income:'#EF9A9A', fixed:'#CE93D8', variable:'#FFCC80', budget:'#80CBC4' } },
  11: { t1:'#4E342E', t2:'#A1887F', mid:'#D7CCC8', bg:'#FDF5F0', border:'#EDD9C8', name:'11월 웜브라운',
        cards:{ income:'#A1887F', fixed:'#CE93D8', variable:'#FFCC80', budget:'#A5D6A7' } },
  12: { t1:'#1B5E20', t2:'#00BCD4', mid:'#B2DFDB', bg:'#F0FBF5', border:'#C5EDD6', name:'12월 에메랄드',
        cards:{ income:'#00BCD4', fixed:'#F06292', variable:'#FFCA28', budget:'#90CAF9' } },
};

function applyMonthTheme(m) {
  const t = MONTH_THEMES[m] || MONTH_THEMES[5];
  const root = document.documentElement.style;
  root.setProperty('--t1', t.t1);
  root.setProperty('--t2', t.t2);
  root.setProperty('--t-bg', t.bg);
  root.setProperty('--t-border', t.border);
  root.setProperty('--t-light', t.bg);
  // 카드 상단 띠 컬러 — 테마별 보조 컬러 세트 적용
  if(t.cards) {
    root.setProperty('--card-income-strip', t.cards.income);
    root.setProperty('--card-fixed-strip', t.cards.fixed);
    root.setProperty('--card-var-strip', t.cards.variable);
    root.setProperty('--card-budget-strip', t.cards.budget);
  }
  // 테마색 그라데이션 배경 — 왼쪽상단 주색 / 중간 테마 미드색 / 오른쪽하단 보조색 (opacity 슬라이더 반영)
  const mid=t.mid||'#F0F0F8';
  const _opa=S&&S.themeOpacity!==undefined?S.themeOpacity:50;
  const _t1h=Math.round(0x50*_opa/100).toString(16).padStart(2,'0');
  const _mh =Math.round(0x26*_opa/100).toString(16).padStart(2,'0');
  const _t2h=Math.round(0x45*_opa/100).toString(16).padStart(2,'0');
  const _sbh=Math.round(0x28*_opa/100).toString(16).padStart(2,'0');
  document.body.style.background =
    `linear-gradient(145deg, ${t.t1}${_t1h} 0%, ${mid}${_mh} 44%, ${mid}${_mh} 56%, ${t.t2}${_t2h} 100%)`;
  // 사이드바 상단 틴트
  const sidebar=document.querySelector('.sidebar');
  if(sidebar){
    sidebar.style.background=`linear-gradient(180deg, ${t.t1}${_sbh} 0%, #ffffff 28%)`;
  }
  // 사이드바 월 레이블 색상
  const monthLabel=document.querySelector('.month-label');
  if(monthLabel) monthLabel.style.color=t.t1;
  // CSS 변수로 노출 — nav-item.active 스타일은 CSS 변수로만 처리 (인라인 스타일 직접 설정 금지)
  document.documentElement.style.setProperty('--t-active', t.t1);
  document.documentElement.style.setProperty('--t-active-bg', `${t.t1}15`);
  // 파비콘 & 로그인 화면 로고 서클도 월 테마로 갱신
  const _faviconSvg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='${t.t1}'/><stop offset='100%25' stop-color='${t.t2}'/></linearGradient></defs><rect width='100' height='100' rx='22' fill='url(%23g)'/><text y='72' x='50' text-anchor='middle' font-size='62' font-family='Apple SD Gothic Neo,Noto Sans KR,sans-serif' fill='white'>가</text></svg>`;
  const _faviconEl=document.querySelector("link[rel='icon']");
  if(_faviconEl)_faviconEl.href='data:image/svg+xml,'+_faviconSvg;
  // 로그인 화면 로고 서클 (login-screen에도 적용)
  document.querySelectorAll('.logo-circle').forEach(el=>{
    el.style.background=`linear-gradient(135deg,${t.t1},${t.t2})`;
  });
}

// ===== HELPERS =====
function fmt(n){if(n===undefined||n===null||isNaN(n))return'0원';return Math.round(n).toLocaleString('ko-KR')+'원';}
function fmtSigned(n){return n>0?'+'+fmt(n):fmt(n);}

// ===== NUMBER INPUT FORMATTING =====
function numInputFmt(el){
  const raw=el.value.replace(/[^0-9]/g,'');
  if(!raw){el.value='';return;}
  el.value=Number(raw).toLocaleString('ko-KR');
}
function numInputParse(val){
  return parseFloat(String(val||'').replace(/[^0-9.]/g,''))||0;
}
function genId(){return Date.now()+Math.floor(Math.random()*9999);}
function mkey(y,m){return y+'-'+m;}

function getMonthData(y,m){
  const key=mkey(y,m);
  if(!S.monthlyData[key]){
    const di=S.defaultItems||{income:[],fixed:[]};
    const hasDefaults=di.income.length>0||di.fixed.length>0;
    let py=y,pm=m-1;if(pm<1){pm=12;py--;}
    const prevKey=mkey(py,pm);
    if(hasDefaults){
      // Use saved defaults as the template
      S.monthlyData[key]={
        income:di.income.map(i=>({...i,id:genId()})),
        fixed:di.fixed.map(i=>({...i,id:genId()})),
        variable:[],
      };
    } else if(S.monthlyData[prevKey]){
      const prev=S.monthlyData[prevKey];
      S.monthlyData[key]={
        income:prev.income.map(i=>({...i,id:genId()})),
        fixed:prev.fixed.map(i=>({...i,id:genId()})),
        variable:prev.variable.filter(v=>!v.autoFromFood&&v.name!=='커피+샐러드').map(i=>({...i,id:genId()})),
      };
    } else {
      const def=DEFAULT_MONTH();
      S.monthlyData[key]={
        income:def.income.map(i=>({...i})),
        fixed:def.fixed.map(i=>({...i})),
        variable:def.variable.map(i=>({...i})),
      };
    }
    saveState();
  }
  return S.monthlyData[key];
}

function getFoodTotal(y,m){
  const key=mkey(y,m);
  const direct=S.foodDirectSet[key];
  if(direct&&direct.direct)return direct.amount||0;
  const days=S.foodCalendar[key]||{};
  return Object.values(days).reduce((s,d)=>s+(parseFloat(d.amount)||0),0);
}

function isCardDueInMonth(card,y,m){
  for(let i=0;i<card.months;i++){
    let mm=card.startMonth+i,yy=card.startYear;
    while(mm>12){mm-=12;yy++;}
    if(yy===y&&mm===m)return true;
  }
  return false;
}

function getCardTotalRemaining(card){
  const monthly=Math.ceil(card.amount/card.months);
  return card.amount-(card.paidMonths||[]).length*monthly;
}

function getLedgerCategorySums(y,m){
  const key=mkey(y,m);
  const entries=S.ledger[key]||[];
  const sums={};
  entries.filter(e=>e.type==='expense'&&!e.creditAutoId).forEach(e=>{
    sums[e.category]=(sums[e.category]||0)+e.amount;
  });
  return sums;
}

function getEffectiveVariable(y,m){
  const data=getMonthData(y,m);
  const ledgerSums=getLedgerCategorySums(y,m);
  const ledgerCats=Object.keys(ledgerSums);

  // Credit auto items: look up actual category from ledger entry (user may have edited it)
  const key=mkey(y,m);
  const ledgerEntries=S.ledger[key]||[];
  const creditAutoItems=(data.variable||[]).filter(item=>item.autoFromCredit);
  // Merge credit items by their actual ledger category
  const creditCatMap={};
  creditAutoItems.forEach(item=>{
    const ledEntry=ledgerEntries.find(e=>e.creditAutoId===item.creditAutoId);
    const cat=ledEntry?ledEntry.category:(item.category||'신용카드');
    creditCatMap[cat]=(creditCatMap[cat]||0)+(parseFloat(item.amount)||0);
  });
  const creditItems=Object.entries(creditCatMap).map(([cat,amt])=>({
    id:'credit_cat_'+cat,
    name:cat,
    category:cat,
    amount:amt+(ledgerSums[cat]||0),
    autoFromCredit:true,
    autoFromLedger:(ledgerSums[cat]||0)>0
  }));

  // Manual items (no autoFromFood, no autoFromCredit, sync ledger amounts for all categories including 식비)
  const manual=(data.variable||[]).filter(item=>!item.autoFromFood&&!item.autoFromCredit&&item.name!=='커피+샐러드').map(item=>{
    if(ledgerSums[item.category]!==undefined&&ledgerSums[item.category]>0){
      return{...item,amount:ledgerSums[item.category],autoFromLedger:true};
    }
    return item;
  });

  // Ledger-only items (exclude credit auto entries)
  const manualCats=new Set(manual.map(i=>i.category));
  const creditCats=new Set(creditItems.map(i=>i.category));
  const ledgerItems=ledgerCats
    .filter(cat=>!manualCats.has(cat)&&!creditCats.has(cat)&&ledgerSums[cat]>0)
    .map(cat=>({id:'led_'+cat,name:cat,category:cat,amount:ledgerSums[cat],autoFromLedger:true}));

  // 카테고리 기준 전체 중복 제거 (manual → ledger → credit 순 우선순위)
  const seenCats=new Set();
  const deduped=[];
  // 1순위: manual 중 가계부연동
  manual.forEach(item=>{if(item.autoFromLedger&&!seenCats.has(item.category)){seenCats.add(item.category);deduped.push(item);}});
  // 2순위: manual 중 일반 수동 입력
  manual.forEach(item=>{if(!item.autoFromLedger&&!seenCats.has(item.category)){seenCats.add(item.category);deduped.push(item);}});
  // 3순위: 가계부 전용 항목 (이미 본 카테고리 제외)
  const filteredLedger=ledgerItems.filter(item=>{if(seenCats.has(item.category))return false;seenCats.add(item.category);return true;});
  // 4순위: 신용카드 자동 항목 (이미 본 카테고리 제외)
  const filteredCredit=creditItems.filter(item=>{if(seenCats.has(item.category))return false;seenCats.add(item.category);return true;});
  return[...deduped,...filteredLedger,...filteredCredit];
}

function getCardRate(cardId,months){
  const card=S.cardSettings.find(c=>c.id===cardId);if(!card)return 0;
  for(const r of card.rates){if(months>=r.minMonths&&months<=r.maxMonths)return r.rate;}
  return 0;
}

function getTotalIncome(y,m){return getMonthData(y,m).income.reduce((s,i)=>s+(parseFloat(i.amount)||0),0);}
function getTotalFixed(y,m){return getMonthData(y,m).fixed.reduce((s,i)=>s+(parseFloat(i.amount)||0),0);}
function getTotalSavings(y,m){return getLedgerSavings(y,m);}
function getLedgerSavings(y,m){
  const key=mkey(y,m);
  const entries=S.ledger[key]||[];
  // #저축 태그가 달린 지출 항목만 저축으로 집계
  return entries.filter(e=>e.type==='expense'&&(e.tags||[]).includes('저축')).reduce((s,e)=>s+e.amount,0);
}
function getTotalVariable(y,m){return getEffectiveVariable(y,m).reduce((s,i)=>s+(parseFloat(i.amount)||0),0);}
function getTotalAssets(){return S.assets.reduce((s,a)=>s+(parseFloat(a.amount)||0),0);}
function getTotalStockValue(){return S.stocks.reduce((s,st)=>{
  if(st.stockType==='foreign'||st.stockType==='gold')return s+(parseFloat(st.currentAmount)||0);
  return s+(parseFloat(st.currentPrice)||0)*(parseFloat(st.quantity)||0);
},0);}
function getTotalStockCost(){return S.stocks.reduce((s,st)=>{
  if(st.stockType==='foreign'||st.stockType==='gold')return s+(parseFloat(st.buyAmount)||0);
  return s+(parseFloat(st.buyPrice)||0)*(parseFloat(st.quantity)||0);
},0);}

// Budget cats: per-category sync
function monthNum(y,m){return y*12+m;}
function parseSyncFrom(s){if(!s)return 0;const p=s.split('-');return monthNum(parseInt(p[0]),parseInt(p[1]));}
function getActiveBudgetCats(y,m){
  const curNum=monthNum(y,m);
  const key=mkey(y,m);
  const monthOverrides=(S.monthBudgets&&S.monthBudgets[key])||{};
  return (S.budgetCategories||[]).map(cat=>{
    // 월별 override 최우선 (자동 설정 포함)
    const ov=monthOverrides[cat.id];
    if(ov!==undefined)return{...cat,budget:ov};
    const sfNum=parseSyncFrom(cat.syncFrom);
    const useGlobal=cat.synced&&(sfNum===0||curNum>=sfNum);
    if(useGlobal)return cat;
    return cat;
  });
}

function renderAll(){
  applyMonthTheme(S.currentMonths.dashboard.m);
  syncThemeSlider();
  renderDashboard();renderIncome();renderCredit();renderAssets();
  renderCalendar();renderInstallment();
  renderLedger();renderLcatPanel();
  // 여행 플래너 초기화 + 현재 활성 여행 탭 재렌더 (Firebase 데이터 로드 후 빈 화면 방지)
  if(window.TravelApp){
    TravelApp.init();
    const myTabEl = document.getElementById('tab-travel-my');
    const bucketTabEl = document.getElementById('tab-travel-bucket');
    if(myTabEl && myTabEl.classList.contains('active')){
      initTravelState(); TravelApp.renderTravelMy();
    } else if(bucketTabEl && bucketTabEl.classList.contains('active')){
      initTravelState(); TravelApp.renderTravelBucket();
    }
  }
}

// ===== BUDGET CATEGORIES =====
// ===== MONTHLY THEME COLORS =====
// hex 색상을 rgba로 변환하는 헬퍼
function hexToRgba(hex,alpha){
  const h=hex.replace('#','');
  const r=parseInt(h.slice(0,2),16);
  const g=parseInt(h.slice(2,4),16);
  const b=parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// 식비 캘린더 테마 — MONTH_THEMES와 동일한 월별 색상 사용
function getMonthTheme(m){
  const t=MONTH_THEMES[m]||MONTH_THEMES[5];
  const _opa=S&&S.themeOpacity!==undefined?S.themeOpacity:50;
  const la=parseFloat((0.20*_opa/100).toFixed(3));
  const ba=parseFloat((0.50*_opa/100).toFixed(3));
  return {
    gradient:`linear-gradient(135deg,${t.t1},${t.t2})`,
    pastel:`linear-gradient(135deg,${t.bg},${t.bg})`,
    color:t.t1,
    light:hexToRgba(t.t2,la),
    border:hexToRgba(t.t1,ba),
    // raw theme values for spend-mode legend and today cell
    t1:t.t1,
    t2:t.t2,
    bg:t.bg,
    mid:t.mid||t.bg,
  };
}

function renderBudget(y,m){
  const el=document.getElementById('budget-cat-list');
  const footer=document.getElementById('budget-cat-footer');
  if(!el)return;

  const cats=getActiveBudgetCats(y,m);
  const effectiveVars=getEffectiveVariable(y,m);
  const foodTotal=getFoodTotal(y,m);
  const ledgerSums=getLedgerCategorySums(y,m);
  // Build catSpent: from effective variable (unless linkedCategories is set)
  const catSpent={};
  effectiveVars.forEach(v=>{catSpent[v.category]=(catSpent[v.category]||0)+(parseFloat(v.amount)||0);});

  if(cats.length===0){
    el.innerHTML=`<div class="budget-empty">+ 항목 추가로 카테고리별 예산을 설정하세요</div>`;
    if(footer)footer.innerHTML='';
    return;
  }

  const monthTheme=getMonthTheme(m);

  // 카테고리별 실제 지출 계산 (linkedCategories가 있으면 catSpent 기준 합산 — 신용카드 포함)
  function getCatSpent(cat){
    const linked=(cat.linkedCategories||[]);
    if(linked.length>0){
      // catSpent는 getEffectiveVariable 기반이므로 신용카드 결제 완료 항목도 포함됨
      return linked.reduce((s,lname)=>s+(catSpent[lname]||0),0);
    }
    return catSpent[cat.name]||0;
  }

  el.innerHTML=cats.map(cat=>{
    let spent=getCatSpent(cat);
    // For 식비: use food calendar total as budget if not manually set
    let effectiveBudget=cat.budget;
    let foodBadge='';
    if(cat.name.includes('식비')){
      // 캘린더 연동: 예산 목표를 식비 캘린더 합계로 반영 (지출은 항상 가계부/변동지출 기준)
      if(cat.calSync&&foodTotal>0){
        effectiveBudget=foodTotal;
        foodBadge='<span style="font-size:10px;color:var(--green);background:#E8F5EE;border-radius:4px;padding:1px 5px;margin-left:4px;font-weight:700;">🗓️캘린더</span>';
      } else if(!cat.foodBudgetManual&&foodTotal>0){
        effectiveBudget=foodTotal;
        foodBadge='<span style="font-size:10px;color:var(--blue);margin-left:4px;">(캘린더예산)</span>';
      } else {
        foodBadge='<span style="font-size:10px;color:var(--green);margin-left:4px;">(식비)</span>';
      }
    }
    const pct=effectiveBudget>0?Math.min(100,(spent/effectiveBudget)*100):0;
    const color=pct>=90?'var(--red)':pct>=70?'var(--orange)':monthTheme.color;
    const trackColor=pct>=90?'rgba(239,83,80,0.13)':pct>=70?'rgba(255,152,0,0.13)':monthTheme.light;
    const rem=effectiveBudget-spent;
    // 연동된 가계부 카테고리 태그 (인라인, 첫째+N 형식)
    const linkedArr=cat.linkedCategories||[];
    const hasLinked=linkedArr.length>0;
    const linkedTagsHtml=hasLinked
      ?(linkedArr.length===1
        ?`<span class="budget-linked-tag"><span class="badge-svg-icon">${_getCatSVG(linkedArr[0])}</span>${linkedArr[0]}</span>`
        :`<span class="budget-linked-tag"><span class="badge-svg-icon">${_getCatSVG(linkedArr[0])}</span>${linkedArr[0]}+${linkedArr.length-1}</span>`)
      :'';
    // 기본값 설정 모드
    const da=_defaultMode?` data-drag-id="${cat.id}" draggable="true" ondragstart="App._dmDragStart(event,'budget',${cat.id})" ondragover="App._dmDragOver(event,'budget')" ondragleave="App._dmDragLeave(event)" ondrop="App._dmDrop(event,'budget',${cat.id})" ondragend="App._dmDragEnd(event)"`:'';
    const defaultChk=_defaultMode
      ?`<span class="dm-handle" ontouchstart="App._dmTouchStart(event,'budget-cat-list')">⠿</span><input type="checkbox" class="budget-default-chk" data-id="${cat.id}" ${cat.synced!==false?'checked':''} style="accent-color:var(--green);width:15px;height:15px;flex-shrink:0;cursor:pointer;"/>`
      :'';
    return `
      <div class="budget-cat-row item-hover-edit${_defaultMode?' default-mode-item':''}"${da}${_defaultMode?'':` onclick="App.openBudgetModal(${cat.id})"`}>
        <div class="budget-cat-top">
          <div style="display:flex;align-items:center;gap:5px;flex:1;min-width:0;overflow:hidden;">
            ${defaultChk}
            <span class="budget-cat-name" style="flex-shrink:0;">${cat.name}${foodBadge}</span>
            ${linkedTagsHtml}
          </div>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0;">
            <span class="budget-cat-amounts">${fmt(spent)}<span class="budget-cat-of"> / ${fmt(effectiveBudget)}</span></span>
            ${_defaultMode?'':
              `<button class="budget-link-text-btn${hasLinked?' linked':''}" onclick="event.stopPropagation();App.openBudgetCatSyncModal(${cat.id})">🔗</button>
               <button class="icon-btn" onclick="event.stopPropagation();App.deleteBudgetCategory(${cat.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>`}
          </div>
        </div>
        <div class="budget-cat-bar-wrap" style="background:${trackColor};">
          <div class="budget-cat-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="budget-cat-bottom">
          <span class="budget-cat-pct" style="color:${color};">${pct.toFixed(0)}% 사용</span>
          <span style="font-size:11px;color:${rem>=0?color:'var(--red)'};">${rem>=0?'잔여 '+fmt(rem):'초과 '+fmt(-rem)}</span>
        </div>
      </div>`;
  }).join('');

  if(footer){
    const totalBudget=cats.reduce((s,c)=>{
      if(c.name.includes('식비')&&!c.foodBudgetManual&&foodTotal>0)return s+foodTotal;
      return s+c.budget;
    },0);
    const totalSpent=cats.reduce((s,c)=>s+getCatSpent(c),0);
    const rem=totalBudget-totalSpent;
    const pct=totalBudget>0?(totalSpent/totalBudget*100).toFixed(1):0;
    const color=parseFloat(pct)>=90?'var(--red)':parseFloat(pct)>=70?'var(--orange)':monthTheme.color;
    const trackColor=parseFloat(pct)>=90?'rgba(239,83,80,0.13)':parseFloat(pct)>=70?'rgba(255,152,0,0.13)':monthTheme.light;
    footer.innerHTML=`
      <div class="budget-cat-total-row">
        <span style="font-weight:700;font-size:13px;">전체 합계</span>
        <span style="font-size:13px;color:${rem>=0?color:'var(--red)'};">${fmt(totalSpent)} / ${fmt(totalBudget)}</span>
      </div>
      <div class="budget-cat-bar-wrap" style="margin:6px 0 4px;background:${trackColor};">
        <div class="budget-cat-bar-fill" style="width:${pct}%;background:${color}"></div>
      </div>
      <div class="budget-cat-bottom"><span style="color:${color};">${pct}% 사용</span><span style="color:${rem>=0?color:'var(--red)'};">${rem>=0?'잔여 '+fmt(rem):'초과 '+fmt(-rem)}</span></div>`;
  }
}

// ===== BUDGET CATEGORY SYNC MODAL =====
function openBudgetCatSyncModal(catId){
  const cat=(S.budgetCategories||[]).find(c=>c.id==catId);
  if(!cat)return;
  const linked=cat.linkedCategories||[];
  const lcats=S.ledgerCategories||[];
  const el=document.getElementById('modal-bcsync');
  const bodyEl=document.getElementById('bcsync-body');
  if(!el||!bodyEl)return;
  document.getElementById('bcsync-cat-name').textContent=cat.name;
  document.getElementById('bcsync-cat-id').value=catId;
  if(lcats.length===0){
    bodyEl.innerHTML='<div style="color:var(--text-sub);font-size:13px;padding:12px 0;">등록된 가계부 카테고리가 없습니다.<br>가계부 탭에서 카테고리를 먼저 추가해 주세요.</div>';
  } else {
    bodyEl.innerHTML=lcats.map(lc=>`
      <label class="bcsync-check-row">
        <input type="checkbox" class="bcsync-chk" value="${lc.name.replace(/"/g,'&quot;')}" ${linked.includes(lc.name)?'checked':''}/>
        <span class="bcsync-cat-icon badge-svg-icon">${_getCatSVG(lc.name)}</span>
        <span class="bcsync-check-label-text">${lc.name}</span>
      </label>`).join('');
  }
  openModal('bcsync');
}

function saveBudgetCatSync(){
  const catId=document.getElementById('bcsync-cat-id').value;
  const cat=(S.budgetCategories||[]).find(c=>c.id==catId);
  if(!cat)return;
  const checks=document.querySelectorAll('.bcsync-chk:checked');
  cat.linkedCategories=Array.from(checks).map(c=>c.value);
  const cm=S.currentMonths.income;
  saveState();closeModal();renderBudget(cm.y,cm.m);
}

function openBudgetModal(id){
  document.getElementById('modal-budget-id').value=id||'';
  const syncEl=document.getElementById('mb-synced');
  const foodManualRow=document.getElementById('mb-food-manual-row');
  const foodManualChk=document.getElementById('mb-food-budget-manual');
  const calSyncChk=document.getElementById('mb-food-cal-sync');
  if(id){
    const cat=(S.budgetCategories||[]).find(c=>c.id==id);if(!cat)return;
    document.getElementById('mb-name').value=cat.name;
    document.getElementById('mb-budget').value=cat.budget;
    if(syncEl)syncEl.checked=cat.synced!==false;
    document.getElementById('modal-budget-edit-label').textContent='수정';
    // Show food manual option only for 식비
    if(foodManualRow)foodManualRow.style.display=cat.name.includes('식비')?'flex':'none';
    if(foodManualChk)foodManualChk.checked=!!cat.foodBudgetManual;
    if(calSyncChk)calSyncChk.checked=!!cat.calSync;
  } else {
    document.getElementById('mb-name').value='';
    document.getElementById('mb-budget').value='';
    if(syncEl)syncEl.checked=true;
    document.getElementById('modal-budget-edit-label').textContent='추가';
    if(foodManualRow)foodManualRow.style.display='none';
    if(foodManualChk)foodManualChk.checked=false;
    if(calSyncChk)calSyncChk.checked=false;
  }
  openModal('budget');
}

function saveBudgetCategory(){
  const id=document.getElementById('modal-budget-id').value;
  const name=document.getElementById('mb-name').value.trim();
  const budget=numInputParse(document.getElementById('mb-budget').value);
  const syncedEl=document.getElementById('mb-synced');
  const synced=syncedEl?syncedEl.checked:true;
  if(!name)return alert('카테고리 이름을 입력해주세요');
  const cm=S.currentMonths.income;
  const curKey=mkey(cm.y,cm.m);
  if(!S.budgetCategories)S.budgetCategories=[];
  if(!S.monthBudgets)S.monthBudgets={};
  const foodManualChk=document.getElementById('mb-food-budget-manual');
  const foodCalSyncChk=document.getElementById('mb-food-cal-sync');
  if(id){
    const c=S.budgetCategories.find(c=>c.id==id);
    if(c){
      if(c.name.includes('식비')&&foodManualChk)c.foodBudgetManual=foodManualChk.checked;
      if(c.name.includes('식비')&&foodCalSyncChk)c.calSync=foodCalSyncChk.checked;
      c.name=name;c.budget=budget;
      const wasSynced=c.synced!==false;
      c.synced=synced;
      if(synced&&!wasSynced){
        // turning sync ON: set syncFrom to current month, keep past months in monthBudgets untouched
        c.syncFrom=cm.y+'-'+cm.m;
      } else if(!synced&&wasSynced){
        // turning sync OFF: save current global budget to this month's override
        c.syncFrom='';
        if(!S.monthBudgets[curKey])S.monthBudgets[curKey]={};
        S.monthBudgets[curKey][c.id]=budget;
      } else if(!synced){
        // stays unsynced: update only this month
        if(!S.monthBudgets[curKey])S.monthBudgets[curKey]={};
        S.monthBudgets[curKey][c.id]=budget;
      }
    }
  } else {
    const newCat={id:genId(),name,budget,synced,syncFrom:synced?(cm.y+'-'+cm.m):''};
    S.budgetCategories.push(newCat);
    if(!synced){
      if(!S.monthBudgets[curKey])S.monthBudgets[curKey]={};
      S.monthBudgets[curKey][newCat.id]=budget;
    }
  }
  saveState();closeModal();renderBudget(cm.y,cm.m);
}

function deleteBudgetCategory(id){
  if(!confirm('예산 카테고리를 삭제하시겠어요?'))return;
  const cm=S.currentMonths.income;
  S.budgetCategories=(S.budgetCategories||[]).filter(c=>c.id!=id);
  saveState();renderBudget(cm.y,cm.m);
}


// ===== REMAINING BUDGET =====
function saveRemainingBudget(val){
  if(!S.remainingBudgetSettings)S.remainingBudgetSettings={label:'현재 남은 예산',amount:0};
  S.remainingBudgetSettings.amount=numInputParse(val);
  saveState();
}


// ===== STOCK→ASSET AUTO SYNC =====
function getFoodBudgetAmount(y,m){
  const key=mkey(y,m);
  const foodCat=(S.budgetCategories||[]).find(c=>c.name.includes('식비'));
  if(!foodCat)return 0;
  // per-month override first
  if(S.monthBudgets&&S.monthBudgets[key]&&S.monthBudgets[key][foodCat.id]!==undefined){
    return S.monthBudgets[key][foodCat.id];
  }
  // synced: use global if syncFrom is before or equal this month
  if(foodCat.synced!==false){
    if(!foodCat.syncFrom)return foodCat.budget;
    const [sy,sm]=foodCat.syncFrom.split('-').map(Number);
    if(y>sy||(y===sy&&m>=sm))return foodCat.budget;
  }
  return foodCat.budget;
}

function syncStockAsset(){
  const totalBuy=(S.stocks||[]).reduce((s,st)=>{
    if(st.stockType==='foreign'||st.stockType==='gold')return s+(parseFloat(st.buyAmount)||0);
    return s+(parseFloat(st.buyPrice)||0)*(parseFloat(st.quantity)||0);
  },0);
  if(!S.assets)S.assets=[];
  let autoAsset=S.assets.find(a=>a.id===S.stockAssetAutoId||(a._isStockAuto&&a.category==='주식'));
  if(!autoAsset){
    autoAsset={id:genId(),name:'주식 매입금액(자동)',amount:totalBuy,category:'주식',_isStockAuto:true};
    S.assets.push(autoAsset);
    S.stockAssetAutoId=autoAsset.id;
  } else {
    autoAsset.amount=totalBuy;
    S.stockAssetAutoId=autoAsset.id;
  }
}

function toggleCalFoodSync(y,m){
  const key=y+'-'+m;
  if(!S.calFoodSync)S.calFoodSync={};
  S.calFoodSync[key]=!S.calFoodSync[key];
  saveState();renderCalendar();
}

// ===== ASSET → FUND CALC SYNC (선택 항목만) =====
function syncFundCalcToAssets(){
  if(!S.fundCalc||!S.fundCalc.assetLinked)return;
  const ids=S.fundCalc.linkedAssetIds||[];
  if(ids.length===0)return;
  const total=(S.assets||[]).filter(a=>ids.includes(String(a.id))).reduce((s,a)=>s+(parseFloat(a.amount)||0),0);
  S.fundCalc.amount=total;
  S.fundCalc.assetLinkedAt=Date.now();
  saveState();
  renderFundCalc();
  const dashTab=document.getElementById('tab-dashboard');
  if(dashTab&&dashTab.classList.contains('active'))renderDashboard();
}

function toggleAssetTotalLink(linked){
  if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
  S.fundCalc.assetLinked=!!linked;
  if(!linked){
    S.fundCalc.assetLinkedAt=null;
    S.fundCalc.linkedAssetIds=[];
  }
  saveState();renderFundCalc();
}

// ===== DASHBOARD =====
// ===== FUND CALCULATOR =====
function renderFundCalc(){
  const fc=S.fundCalc||{amount:0,items:[],assetLinked:false};
  const isLinked=!!fc.assetLinked;

  // 연동 배지: 몇 개 항목 연동 중인지 표시
  const linkedIds=fc.linkedAssetIds||[];
  const badgeEl=document.getElementById('fc-asset-linked-badge');
  if(badgeEl){
    badgeEl.style.display=isLinked?'inline-flex':'none';
    badgeEl.innerHTML=isLinked?`🔗 ${linkedIds.length}개 항목 연동중 <span class="fc-badge-unlink" onclick="event.stopPropagation();App.toggleAssetTotalLink(false)" title="연동 해제">🔒</span>`:'';
  }

  // 보유금액 입력창: 연동 시 비활성화
  const amtEl=document.getElementById('fc-amount-input');
  if(amtEl){
    if(document.activeElement!==amtEl)amtEl.value=fc.amount?(fc.amount).toLocaleString('ko-KR'):'';
    amtEl.readOnly=isLinked;
    amtEl.style.background=isLinked?'var(--green-light)':'';
    amtEl.style.cursor=isLinked?'default':'';
    amtEl.title=isLinked?'자산 항목 연동 중 — 직접 편집 불가':'';
  }

  // 연동 시각 표시
  const linkedTimeEl=document.getElementById('fc-linked-time');
  if(linkedTimeEl){
    if(isLinked&&fc.assetLinkedAt){
      const d=new Date(fc.assetLinkedAt);
      linkedTimeEl.textContent='마지막 반영: '+d.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'});
      linkedTimeEl.style.display='block';
    } else {
      linkedTimeEl.style.display='none';
    }
  }

  const dispEl=document.getElementById('fc-amount-display');
  const shownAmt=fc.amount||0;
  if(dispEl)dispEl.textContent=shownAmt>0?'보유: '+fmt(shownAmt):'';
  const listEl=document.getElementById('fc-items-list');
  if(listEl){
    if((fc.items||[]).length===0){
      listEl.innerHTML='<div class="fc-empty">아래 버튼으로 항목을 추가하세요</div>';
    } else {
      listEl.innerHTML=(fc.items||[]).map(item=>`
        <div class="fc-item">
          <input class="fc-item-name" type="text" value="${(item.name||'').replace(/"/g,'&quot;')}" placeholder="항목명"
            onchange="App.updateFundItem(${item.id},'name',this.value)"
            onkeydown="if(event.key==='Enter')this.blur()"/>
          <div class="fc-item-amount-wrap">
            <input class="fc-item-amount" type="text" inputmode="numeric" value="${item.amount?(item.amount).toLocaleString('ko-KR'):''}" placeholder="0"
              oninput="App.numInputFmt(this);App.previewFundItem()"
              onchange="App.updateFundItem(${item.id},'amount',this.value)"
              onkeydown="if(event.key==='Enter')App.updateFundItem(${item.id},'amount',this.value)"/>
            <span class="fc-item-unit">원</span>
          </div>
          <button class="icon-btn" onclick="App.deleteFundItem(${item.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>`).join('');
    }
  }
  _fcSummary();
}

// 합계 표시만 갱신 (DOM 재렌더링 없음 — focus 유지)
function _fcSummary(){
  const fc=S.fundCalc||{amount:0,items:[],assetLinked:false};
  const totalUsed=(fc.items||[]).reduce((s,i)=>s+(parseFloat(i.amount)||0),0);
  const baseAmt=parseFloat(fc.amount)||0;
  const remaining=baseAmt-totalUsed;
  const over=remaining<0;
  const tuEl=document.getElementById('fc-total-used');
  if(tuEl)tuEl.textContent=fmt(totalUsed);
  const rvEl=document.getElementById('fc-remaining-val');
  if(rvEl){rvEl.textContent=fmt(Math.abs(remaining));rvEl.style.color=over?'var(--red)':'var(--green)';}
  const obEl=document.getElementById('fc-over-badge');
  if(obEl)obEl.style.display=over?'inline-block':'none';
}

// oninput: 현재 DOM 값 기준으로 합계 미리보기 (state 저장 없음 → focus 유지)
function previewFundItem(){
  const fc=S.fundCalc||{amount:0,items:[]};
  let total=0;
  document.querySelectorAll('.fc-item-amount').forEach(el=>{total+=numInputParse(el.value);});
  const remaining=(parseFloat(fc.amount)||0)-total;
  const over=remaining<0;
  const tuEl=document.getElementById('fc-total-used');
  if(tuEl)tuEl.textContent=fmt(total);
  const rvEl=document.getElementById('fc-remaining-val');
  if(rvEl){rvEl.textContent=fmt(Math.abs(remaining));rvEl.style.color=over?'var(--red)':'var(--green)';}
  const obEl=document.getElementById('fc-over-badge');
  if(obEl)obEl.style.display=over?'inline-block':'none';
}

// oninput on main amount: 보유금액 표시 + 합계 미리보기 (state 저장 없음)
function previewFundAmount(val){
  const amount=numInputParse(val);
  const dispEl=document.getElementById('fc-amount-display');
  if(dispEl)dispEl.textContent=amount>0?'보유: '+fmt(amount):'';
  let total=0;
  document.querySelectorAll('.fc-item-amount').forEach(el=>{total+=numInputParse(el.value);});
  const remaining=amount-total;
  const over=remaining<0;
  const tuEl=document.getElementById('fc-total-used');
  if(tuEl)tuEl.textContent=fmt(total);
  const rvEl=document.getElementById('fc-remaining-val');
  if(rvEl){rvEl.textContent=fmt(Math.abs(remaining));rvEl.style.color=over?'var(--red)':'var(--green)';}
  const obEl=document.getElementById('fc-over-badge');
  if(obEl)obEl.style.display=over?'inline-block':'none';
}

function setFundAmount(val){
  if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false};
  if(S.fundCalc.assetLinked)return; // 연동 중 직접 편집 차단
  S.fundCalc.amount=numInputParse(val);
  saveState();renderFundCalc();
  // 대시보드 잔여 예산 실시간 반영
  const dashTab=document.getElementById('tab-dashboard');
  if(dashTab&&dashTab.classList.contains('active'))renderDashboard();
}

function addFundItem(){
  if(!S.fundCalc)S.fundCalc={amount:0,items:[]};
  S.fundCalc.items.push({id:genId(),name:'',amount:0});
  saveState();renderFundCalc();
}

function deleteFundItem(id){
  if(!S.fundCalc)return;
  S.fundCalc.items=(S.fundCalc.items||[]).filter(i=>i.id!=id);
  saveState();renderFundCalc();
}

function updateFundItem(id,field,value){
  if(!S.fundCalc)return;
  const item=(S.fundCalc.items||[]).find(i=>i.id==id);
  if(!item)return;
  item[field]=field==='amount'?numInputParse(value):value;
  saveState();
  // amount 저장 시 합계만 갱신 (list 재렌더 금지 — focus 유지)
  _fcSummary();
}

function resetFundCalc(){
  if(!confirm('자금 분배 계산기를 초기화하시겠어요?'))return;
  S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
  saveState();renderFundCalc();
}

function toggleAssetSelector(){
  const el=document.getElementById('fc-asset-selector');if(!el)return;
  const isHidden=el.style.display==='none';
  if(isHidden){
    const assets=S.assets||[];
    if(assets.length===0){el.innerHTML='<div class="fc-asset-selector-title">자산 없음</div>';el.style.display='block';return;}
    const linkedIds=(S.fundCalc&&S.fundCalc.linkedAssetIds)||[];
    el.innerHTML=`<div class="fc-asset-selector-title">🏦 자산 선택 (합산할 항목 체크)</div>`+
      assets.map(a=>`<label class="fc-asset-check-row">
        <input type="checkbox" class="fc-asset-chk" data-id="${a.id}" data-amount="${a.amount}" ${linkedIds.includes(String(a.id))?'checked':''}/>
        <span>${a.name} <span style="color:var(--green);font-weight:700;">${fmt(a.amount)}</span></span>
      </label>`).join('')+
      `<div class="fc-asset-btn-row">
        <button class="fc-asset-apply-btn" onclick="App.applyAssetSelection()">✓ 합산 적용 (1회)</button>
        <button class="fc-asset-apply-btn fc-asset-link-apply-btn" onclick="App.applyAssetLink()">🔗 연동으로 적용</button>
      </div>`;
    el.style.display='block';
  } else {
    el.style.display='none';
  }
}

function applyAssetSelection(){
  const checks=document.querySelectorAll('.fc-asset-chk:checked');
  let total=0;
  checks.forEach(c=>{total+=parseFloat(c.dataset.amount)||0;});
  if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
  // 연동 해제하고 1회 적용
  S.fundCalc.amount=total;
  S.fundCalc.assetLinked=false;
  S.fundCalc.assetLinkedAt=null;
  S.fundCalc.linkedAssetIds=[];
  const el=document.getElementById('fc-asset-selector');
  if(el)el.style.display='none';
  saveState();renderFundCalc();
}

function applyAssetLink(){
  const checks=document.querySelectorAll('.fc-asset-chk:checked');
  if(checks.length===0){alert('연동할 항목을 선택해 주세요.');return;}
  if(!S.fundCalc)S.fundCalc={amount:0,items:[],assetLinked:false,assetLinkedAt:null,linkedAssetIds:[]};
  const ids=Array.from(checks).map(c=>c.dataset.id);
  S.fundCalc.linkedAssetIds=ids;
  S.fundCalc.assetLinked=true;
  // 선택 항목 합산
  let total=0;
  checks.forEach(c=>{total+=parseFloat(c.dataset.amount)||0;});
  S.fundCalc.amount=total;
  S.fundCalc.assetLinkedAt=Date.now();
  const el=document.getElementById('fc-asset-selector');
  if(el)el.style.display='none';
  saveState();renderFundCalc();
}


// ===== DASHBOARD =====
function renderDashboard(){
  const cm=S.currentMonths.dashboard;
  document.getElementById('dash-month-label').textContent=cm.y+'년 '+cm.m+'월';

  const totalIncome=getTotalIncome(cm.y,cm.m);
  const totalFixed=getTotalFixed(cm.y,cm.m);
  const totalVar=getTotalVariable(cm.y,cm.m);
  const foodTotal=getFoodTotal(cm.y,cm.m);
  const totalExpense=totalFixed+totalVar+foodTotal;
  const remaining=totalIncome-totalExpense;

  const key=mkey(cm.y,cm.m);
  const entries=S.ledger[key]||[];

  // Banner
  const ledBannerIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledBannerOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  const ledgerRemaining=entries.length>0?ledBannerIn-ledBannerOut:remaining;
  const bannerIsLedger=entries.length>0;

  const fundCalcAmt=S.fundCalc&&S.fundCalc.amount>0?S.fundCalc.amount:null;
  const bannerRemaining=fundCalcAmt!==null?fundCalcAmt:ledgerRemaining;
  const bannerSubText=fundCalcAmt!==null
    ?'💰 자금 분배 계산기 연동 금액'
    :(bannerIsLedger?'📒 수입 '+fmt(ledBannerIn)+' − 지출 '+fmt(ledBannerOut):'수입 '+fmt(totalIncome)+' − 지출 '+fmt(totalExpense));

  const banner=document.getElementById('dash-budget-banner');
  const monthTheme=getMonthTheme(cm.m);
  banner.style.background=bannerRemaining>=0
    ?monthTheme.gradient
    :'linear-gradient(135deg,#F06292,#EF5350)';
  document.getElementById('dash-remaining').textContent=fmt(bannerRemaining);
  document.getElementById('dash-banner-sub').textContent=bannerSubText;

  // 배너 우측: 저축률 표시
  const savingsLcats=new Set((S.ledgerCategories||[]).filter(c=>c.isSavings).map(c=>c.name));
  const savingsAmt=entries.filter(e=>
    e.type==='expense'&&(savingsLcats.has(e.category)||(e.tags||[]).includes('저축'))
  ).reduce((s,e)=>s+e.amount,0);
  const srIncome=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const srRate=srIncome>0?(savingsAmt/srIncome*100):0;
  const srColor=srRate>=30?'#A8FFDB':srRate>=15?'#FFE0A8':'rgba(255,255,255,0.75)';
  const srPctEl=document.getElementById('dash-banner-sr-pct');
  const srAmtEl=document.getElementById('dash-banner-sr-amt');
  if(srPctEl){srPctEl.textContent=srRate.toFixed(1)+'%';srPctEl.style.color=srColor;}
  if(srAmtEl)srAmtEl.textContent='저축금액 '+fmt(savingsAmt);

  // 4 stat boxes
  const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  document.getElementById('dash-led-income').textContent=fmt(ledIn);
  document.getElementById('dash-led-expense').textContent=fmt(ledOut);
  const balEl=document.getElementById('dash-led-balance');
  balEl.textContent=fmt(ledIn-ledOut);
  balEl.style.color=ledIn-ledOut>=0?'var(--green)':'var(--red)';
  document.getElementById('dash-led-count').textContent=entries.length+'건';

  // 변동 지출 합계 (현재 모드에 맞게 계산)
  const varEl=document.getElementById('dash-variable-total');
  if(varEl){
    const varItems=_dashVarMode==='avg3'?get3MonthAvgVariable(cm.y,cm.m):getEffectiveVariable(cm.y,cm.m);
    const varTotal=varItems.reduce((s,i)=>s+(parseFloat(i.amount)||0),0);
    varEl.textContent=fmt(varTotal);
  }
  // 모드 버튼 상태 동기화
  const _btnC=document.getElementById('dvm-btn-current');
  const _btnA=document.getElementById('dvm-btn-avg3');
  if(_btnC)_btnC.classList.toggle('active',_dashVarMode==='current');
  if(_btnA)_btnA.classList.toggle('active',_dashVarMode==='avg3');

  // 자산 합계
  document.getElementById('dash-asset-total').textContent=fmt(getTotalAssets());
  document.getElementById('dash-stock-total').textContent=fmt(getTotalStockValue());

  // 자산 현황 섹션: 외곽선 제거, 배경 흰색
  const dashCards=document.querySelector('#tab-dashboard .dash-cards');
  if(dashCards){
    dashCards.style.border='none';
    dashCards.style.background='white';
    dashCards.style.boxShadow='var(--shadow)';
  }

  // 자산/주식 아코디언
  renderDashAssetExpand();
  renderDashExpand('stock',S.stocks.map(st=>{
    const t=st.stockType;
    const val=(t==='foreign'||t==='gold')?(parseFloat(st.currentAmount)||0):(parseFloat(st.currentPrice)||0)*(parseFloat(st.quantity)||0);
    const cost=(t==='foreign'||t==='gold')?(parseFloat(st.buyAmount)||0):(parseFloat(st.buyPrice)||0)*(parseFloat(st.quantity)||0);
    const label=t==='gold'?'금현물':t==='foreign'?'해외주식':st.ticker;
    return {name:st.name,cat:label,amount:val,color:val>=cost?'red':'blue'};
  }));

  // 변동 지출 도넛 차트
  renderDashDonut(cm.y,cm.m);

  // 최근 내역 (우측 패널)
  renderDashRecentEntries(cm.y,cm.m);
}

function renderDashExpand(section,items){
  const el=document.getElementById('dash-'+section+'-expand');if(!el)return;
  el.innerHTML=items.length===0
    ?'<div style="color:var(--text-sub);font-size:12px;padding:8px 0;">항목 없음</div>'
    :items.map(item=>`
      <div class="dash-expand-item">
        <div class="dash-expand-name">${item.name}${item.cat&&item.cat!==item.name?`<span class="dash-expand-cat">${item.cat}</span>`:''}</div>
        <div class="dash-expand-amount ${item.color}">${fmt(item.amount)}</div>
      </div>`).join('');
}

function renderDashAssetExpand(){
  const el=document.getElementById('dash-asset-expand');if(!el)return;
  el.innerHTML=S.assets.length===0
    ?'<div style="color:var(--text-sub);font-size:12px;padding:8px 0;">자산 없음</div>'
    :S.assets.map(a=>`
      <div class="dash-expand-item">
        <div class="dash-expand-name">${a.name}</div>
        <div class="dash-expand-amount purple">${fmt(parseFloat(a.amount)||0)}</div>
      </div>`).join('');
}

function toggleDashSection(section){
  const expand=document.getElementById('dash-'+section+'-expand');
  const arrow=document.getElementById('dash-'+section+'-arrow');
  if(!expand)return;
  const isOpen=expand.classList.contains('open');
  expand.classList.toggle('open',!isOpen);
  if(arrow)arrow.classList.toggle('open',!isOpen);
}

// ===== DASHBOARD VARIABLE EXPENSE DONUT CHART =====
// 카테고리별 안정적 색상 — 골든앵글(137.5°) 기반으로 최대한 다른 색 보장// ===== SVG 카테고리 아이콘 시스템 (filled/solid) =====
function _stripCatEmoji(name){
  if(!name)return'';
  // 앞의 이모지 + 공백 제거 (예: "🍚 식비" → "식비")
  return name.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F000}-\u{1F02F}✈♥⚡💳📱🏠🏦💡💊💪💰💴🎁👕💄🛍🛒🎬🎮🚗🍚🍜📦📌]+\s*/u,'').trim();
}
const _SVG_ICONS={
  cafe:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>`,
  food:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>`,
  car:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`,
  phone:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`,
  bag:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`,
  home:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  culture:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>`,
  health:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  wallet:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
  money:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>`,
  gift:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 6h-2.18c.07-.31.18-.62.18-.93A3.07 3.07 0 0 0 14.93 2c-1.6 0-2.48 1.33-3.48 2.88C10.46 3.33 9.58 2 7.97 2A3.07 3.07 0 0 0 4.9 5.07c0 .31.11.62.18.93H3c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>`,
  plane:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,
  fashion:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 2l-4 2.5L8 2 2 6.5l2.5 2.5L6 9.5V21h12V9.5l1.5-0.5L22 6.5z"/></svg>`,
  box:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/></svg>`,
  pin:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  lightning:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
  creditcard:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
};
function _getCatSVG(name){
  // 1순위: 사용자가 직접 설정한 아이콘
  if(S&&S.ledgerCategories){
    const cat=(S.ledgerCategories||[]).find(c=>c.name===name);
    if(cat&&cat.icon&&_SVG_ICONS[cat.icon])return _SVG_ICONS[cat.icon];
  }
  // 2순위: 키워드 자동 매칭
  const n=(name||'').toLowerCase();
  if(n.includes('카페')||n.includes('커피')||n.includes('스타벅스'))return _SVG_ICONS.cafe;
  if(n.includes('식비')||n.includes('음식')||n.includes('외식')||n.includes('🍚')||n.includes('🍜'))return _SVG_ICONS.food;
  if(n.includes('교통')||n.includes('차량')||n.includes('🚗'))return _SVG_ICONS.car;
  if(n.includes('통신')||n.includes('📱'))return _SVG_ICONS.phone;
  if(n.includes('쇼핑')||n.includes('생활용품')||n.includes('🛍')||n.includes('🛒'))return _SVG_ICONS.bag;
  if(n.includes('주거')||n.includes('공과')||n.includes('생활')||n.includes('🏠'))return _SVG_ICONS.home;
  if(n.includes('문화')||n.includes('취미')||n.includes('여가')||n.includes('🎬')||n.includes('🎮'))return _SVG_ICONS.culture;
  if(n.includes('의료')||n.includes('건강')||n.includes('💊')||n.includes('💪'))return _SVG_ICONS.health;
  if(n.includes('저축')||n.includes('금융')||n.includes('투자')||n.includes('🏦')||n.includes('💳'))return _SVG_ICONS.wallet;
  if(n.includes('수입')||n.includes('급여')||n.includes('💰')||n.includes('💴'))return _SVG_ICONS.money;
  if(n.includes('경조사')||n.includes('🎁'))return _SVG_ICONS.gift;
  if(n.includes('여행')||n.includes('✈'))return _SVG_ICONS.plane;
  if(n.includes('패션')||n.includes('미용')||n.includes('👕')||n.includes('💄'))return _SVG_ICONS.fashion;
  if(n.includes('기타')||n.includes('📦'))return _SVG_ICONS.box;
  return _SVG_ICONS.pin;
}


// ── 아이콘 피커: 이름 ↔ 표시 레이블
const _ICON_LABELS={
  cafe:'카페',food:'식비',car:'교통',phone:'통신',bag:'쇼핑',home:'주거',
  culture:'문화',health:'건강',wallet:'금융',money:'수입',
  gift:'경조사',plane:'여행',fashion:'패션',box:'기타',
  pin:'위치',lightning:'에너지',creditcard:'카드',heart:'좋아요',
};

function _openIconPicker(e,catId){
  e.stopPropagation();
  // 이미 열린 피커 닫기
  document.querySelectorAll('.lcat-icon-picker').forEach(el=>el.remove());
  const btn=e.currentTarget;
  const cat=(S.ledgerCategories||[]).find(c=>c.id==catId);
  const currentIcon=cat&&cat.icon;
  const picker=document.createElement('div');
  picker.className='lcat-icon-picker';
  picker.innerHTML=Object.entries(_ICON_LABELS).map(([key,label])=>`
    <button class="lcat-icon-opt${currentIcon===key?' lcat-icon-opt--active':''}"
      title="${label}"
      onclick="App._saveLcatIcon(${catId},'${key}',this)">
      ${_SVG_ICONS[key]||''}
      <span class="lcat-icon-opt-label">${label}</span>
    </button>`).join('');
  // 피커를 버튼 아래에 배치
  btn.parentNode.style.position='relative';
  btn.parentNode.appendChild(picker);
  // 바깥 클릭 시 닫기
  setTimeout(()=>{
    function closeOnOut(ev){
      if(!picker.contains(ev.target)){
        picker.remove();
        document.removeEventListener('click',closeOnOut,true);
      }
    }
    document.addEventListener('click',closeOnOut,true);
  },0);
}

function _saveLcatIcon(catId,iconKey){
  const cat=(S.ledgerCategories||[]).find(c=>c.id==catId);
  if(!cat)return;
  cat.icon=iconKey;
  saveState();
  renderLcatPanel();
  renderDashboard();
}

function _openColorPicker(e,catId){
  e.stopPropagation();
  document.querySelectorAll('.lcat-color-picker').forEach(el=>el.remove());
  const btn=e.currentTarget;
  const cat=(S.ledgerCategories||[]).find(c=>c.id==catId);
  const PRESET_COLORS=[
    '#FF6B6B','#FF8A65','#FFA94D','#FFCA28','#FFD54F',
    '#81C784','#43C98A','#4DB6AC','#4FC3F7','#64B5F6',
    '#74B9FF','#A29BFE','#CE93D8','#F48FB1','#E91E8C',
    '#90A4AE','#FDCB6E','#00CEC9','#6C5CE7','#E17055',
  ];
  const picker=document.createElement('div');
  picker.className='lcat-color-picker';
  picker.style.cssText='position:fixed;z-index:99999;background:var(--white,#fff);border:1.5px solid var(--border,#EEE9FF);border-radius:12px;padding:10px;box-shadow:0 4px 24px rgba(0,0,0,0.18);display:flex;flex-direction:column;gap:8px;min-width:220px;';
  const swatchGrid=PRESET_COLORS.map(col=>{
    const isActive=cat&&cat.color===col;
    return `<button onclick="App._saveLcatColor(${catId},'${col}')" title="${col}"
      style="width:26px;height:26px;border-radius:50%;background:${col};border:${isActive?'3px solid #333':'2px solid rgba(0,0,0,0.1)'};cursor:pointer;flex-shrink:0;transition:transform .15s;" onmouseenter="this.style.transform='scale(1.2)'" onmouseleave="this.style.transform='scale(1)'"></button>`;
  }).join('');
  picker.innerHTML=`
    <div style="font-size:11px;font-weight:700;color:var(--text-sub);margin-bottom:2px;">테마 색상 선택</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;">${swatchGrid}</div>
    <div style="display:flex;gap:6px;align-items:center;margin-top:2px;">
      <label style="font-size:11px;color:var(--text-sub);flex-shrink:0;">직접 입력</label>
      <input type="color" value="${cat&&cat.color||'#A29BFE'}" style="flex:1;height:28px;border-radius:6px;border:1.5px solid var(--border);cursor:pointer;padding:2px;"
        oninput="App._saveLcatColor(${catId},this.value)"/>
      ${cat&&cat.color?`<button onclick="App._saveLcatColor(${catId},'')" style="font-size:11px;padding:3px 8px;border-radius:8px;border:1.5px solid var(--border);background:none;cursor:pointer;color:var(--text-sub);">초기화</button>`:''}
    </div>`;
  document.body.appendChild(picker);
  // 버튼 위치 기준으로 피커 위치 계산
  const rect=btn.getBoundingClientRect();
  const pickerW=230;
  let left=rect.left;
  if(left+pickerW>window.innerWidth-8)left=window.innerWidth-pickerW-8;
  let top=rect.bottom+4;
  if(top+280>window.innerHeight)top=rect.top-288;
  picker.style.left=left+'px';
  picker.style.top=top+'px';
  setTimeout(()=>{
    function closeOnOut(ev){
      if(!picker.contains(ev.target)&&ev.target!==btn){
        picker.remove();
        document.removeEventListener('click',closeOnOut,true);
      }
    }
    document.addEventListener('click',closeOnOut,true);
  },0);
}

function _saveLcatColor(catId,color){
  const cat=(S.ledgerCategories||[]).find(c=>c.id==catId);
  if(!cat)return;
  if(color){cat.color=color;}else{delete cat.color;}
  saveState();
  renderLcatPanel();
  renderLedger();
  renderDashboard();
}

// ── 도넛 팔레트: 8가지 색상이 겹치지 않도록 명도·채도 분산
const _DONUT_PALETTE=[
  {c:'#A29BFE',l:'#DDD9FF'},{c:'#F06292',l:'#FBBDCF'},
  {c:'#FF7043',l:'#FFCCBC'},{c:'#26C6DA',l:'#B2EBF2'},
  {c:'#FFA726',l:'#FFE0B2'},{c:'#9CCC65',l:'#DCEDC8'},
  {c:'#EC407A',l:'#FCB8D0'},{c:'#7E57C2',l:'#D1C4E9'},
];
const _OTHER_DONUT={c:'#78909C',l:'#CFD8DC'};

function _donutSVG(segments,total){
  const size=200,cx=100,cy=100,R=86,ri=60,GAP=0.055; // GAP: 세그먼트 간 여백(rad)
  const FF="Apple SD Gothic Neo,Noto Sans KR,sans-serif";
  if(total===0){
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${cx}" cy="${cy}" r="${(R+ri)/2}" fill="none" stroke="#EEE9FF" stroke-width="${R-ri}"/>
      <text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="12" fill="#9490A8" font-family="${FF}">데이터 없음</text>
    </svg>`;
  }
  let angle=-Math.PI/2;
  const defs=[],paths=[];
  const total10k=(total/10000).toFixed(1);
  segments.forEach((seg,i)=>{
    const frac=seg.amount/total;
    if(frac<=0)return;
    const sweep=frac*2*Math.PI;
    const sA=angle+GAP/2,eA=angle+sweep-GAP/2;
    angle+=sweep;
    if(eA-sA<0.01)return;
    const x1=cx+R*Math.cos(sA),y1=cy+R*Math.sin(sA);
    const x2=cx+R*Math.cos(eA),y2=cy+R*Math.sin(eA);
    const x3=cx+ri*Math.cos(eA),y3=cy+ri*Math.sin(eA);
    const x4=cx+ri*Math.cos(sA),y4=cy+ri*Math.sin(sA);
    const la=eA-sA>Math.PI?1:0;
    const pct=(frac*100).toFixed(1);
    const safe=(seg.name||'').replace(/"/g,'&quot;');
    defs.push(`<linearGradient id="dg${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${seg.c}"/><stop offset="100%" stop-color="${seg.l}"/></linearGradient>`);
    paths.push(`<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} A${R} ${R} 0 ${la} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L${x3.toFixed(2)} ${y3.toFixed(2)} A${ri} ${ri} 0 ${la} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}Z"
      fill="url(#dg${i})" data-di="${i}" data-name="${safe}" data-amt="${seg.amount}" data-pct="${pct}" data-col="${seg.c}"
      style="cursor:pointer;transition:opacity .18s;" class="donut-seg"/>`);
  });
  return `<svg id="dash-donut-svgi" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="overflow:visible;display:block">
    <defs>${defs.join('')}</defs>
    <circle cx="${cx}" cy="${cy}" r="${(R+ri)/2}" fill="none" stroke="#F0EEFF" stroke-width="${R-ri}"/>
    ${paths.join('')}
    <text id="dc-label" x="${cx}" y="${cy-7}"  text-anchor="middle" font-size="11"   fill="#9490A8"  font-family="${FF}">총 변동지출</text>
    <text id="dc-val"   x="${cx}" y="${cy+12}" text-anchor="middle" font-size="15"   fill="#2D2D3A" font-weight="900" font-family="${FF}">${total10k}만원</text>
    <text id="dc-pct"   x="${cx}" y="${cy+28}" text-anchor="middle" font-size="11"   fill="#9490A8" font-family="${FF}" opacity="0"></text>
  </svg>`;
}

function get3MonthAvgVariable(y,m){
  const catTotals={};
  for(let i=0;i<3;i++){
    let ty=y,tm=m-i;
    while(tm<1){tm+=12;ty--;}
    const items=getEffectiveVariable(ty,tm);
    const catMap={};
    items.forEach(item=>{
      const cat=item.category||item.name||'기타';
      catMap[cat]=(catMap[cat]||0)+(parseFloat(item.amount)||0);
    });
    Object.entries(catMap).forEach(([cat,amt])=>{
      catTotals[cat]=(catTotals[cat]||0)+amt;
    });
  }
  return Object.entries(catTotals).map(([cat,total])=>({
    id:'avg3_'+cat,name:cat,category:cat,amount:Math.round(total/3)
  }));
}

function setDashVarMode(mode){
  _dashVarMode=mode;
  const btnCurrent=document.getElementById('dvm-btn-current');
  const btnAvg3=document.getElementById('dvm-btn-avg3');
  if(btnCurrent)btnCurrent.classList.toggle('active',mode==='current');
  if(btnAvg3)btnAvg3.classList.toggle('active',mode==='avg3');
  const cm=S.currentMonths.dashboard;
  const items=mode==='avg3'?get3MonthAvgVariable(cm.y,cm.m):getEffectiveVariable(cm.y,cm.m);
  const total=items.reduce((s,i)=>s+(parseFloat(i.amount)||0),0);
  const varEl=document.getElementById('dash-variable-total');
  if(varEl)varEl.textContent=fmt(total);
  renderDashDonut(cm.y,cm.m);
}

function renderDashDonut(y,m){
  const svgEl=document.getElementById('dash-donut-svg');
  const legEl=document.getElementById('dash-donut-legend');
  if(!svgEl||!legEl)return;
  const items=_dashVarMode==='avg3'?get3MonthAvgVariable(y,m):getEffectiveVariable(y,m);
  const catMap={};
  items.forEach(i=>{
    const cat=i.category||i.name||'기타';
    catMap[cat]=(catMap[cat]||0)+(parseFloat(i.amount)||0);
  });
  const sorted=Object.entries(catMap).sort((a,b)=>b[1]-a[1]);
  const total=sorted.reduce((s,[,v])=>s+v,0);
  if(total===0){
    svgEl.innerHTML=_donutSVG([],0);
    legEl.innerHTML='<div style="color:var(--text-sub);font-size:12px;padding:8px 0;">항목 없음</div>';
    return;
  }
  // 5% 기준: 미만은 기타로 합산
  const THRESHOLD=0.05;
  const mainEntries=sorted.filter(([,v])=>v/total>=THRESHOLD);
  const otherEntries=sorted.filter(([,v])=>v/total<THRESHOLD);
  const otherTotal=otherEntries.reduce((s,[,v])=>s+v,0);
  // 팔레트 할당
  const segs=mainEntries.map(([name,amount],i)=>({
    name,amount,
    c:_DONUT_PALETTE[i%_DONUT_PALETTE.length].c,
    l:_DONUT_PALETTE[i%_DONUT_PALETTE.length].l,
  }));
  if(otherTotal>0)segs.push({name:'기타',amount:otherTotal,c:_OTHER_DONUT.c,l:_OTHER_DONUT.l});
  svgEl.innerHTML=_donutSVG(segs,total);
  // 레전드 HTML 생성
  const legendItems=segs.map((seg,i)=>{
    const pct=(seg.amount/total*100).toFixed(1);
    const barW=Math.max(4,Math.round(seg.amount/total*100));
    const svgIcon=_getCatSVG(seg.name);
    const displayName=_stripCatEmoji(seg.name);
    const isOther=seg.name==='기타';
    return `<div class="ddl2-row" data-li="${i}" style="border-radius:10px;padding:7px 8px 5px;transition:background .15s;cursor:${isOther?'pointer':'default'};" ${isOther?'onclick="App._donutOtherToggle(this)"':''}>
      <div class="ddl2-header">
        <span class="ddl2-icon" style="color:${seg.c};">${svgIcon}</span>
        <span class="ddl2-name">${displayName}</span>
        ${isOther?`<span style="font-size:11px;color:var(--text-sub);margin-left:2px;">${pct}%</span>`:''}
        <span class="ddl2-amt" data-li-amt="${i}">${fmt(seg.amount)}</span>
        ${isOther?`<span class="ddl2-arrow" style="font-size:10px;color:var(--text-sub);margin-left:4px;transition:transform .22s;display:inline-block;">▼</span>`:''}
      </div>
      <div class="ddl2-bar-wrap">
        <div class="ddl2-bar-fill" data-li-bar="${i}" style="width:${barW}%;background:linear-gradient(90deg,${seg.c},${seg.l});"></div>
      </div>
      ${isOther&&otherEntries.length>0?`<div class="ddl2-other-list" style="overflow:hidden;max-height:0;transition:max-height .26s ease;">
        ${otherEntries.map(([n,v])=>`<div style="display:flex;align-items:center;gap:6px;padding:4px 6px 4px 8px;font-size:12px;color:var(--text-sub);">
          <span style="flex-shrink:0;width:16px;height:16px;display:flex;align-items:center;justify-content:center;color:${_OTHER_DONUT.c};">${_getCatSVG(n)}</span>
          <span style="flex:1;">${_stripCatEmoji(n)}</span>
          <span style="font-weight:700;color:var(--text-main);">${fmt(v)}</span>
          <span style="min-width:36px;text-align:right;">${(v/total*100).toFixed(1)}%</span>
        </div>`).join('')}
      </div>`:''}
    </div>`;
  }).join('');
  legEl.innerHTML=`<div class="ddl-scroll-inner">${legendItems}</div>`;
  // 호버 동기화: 도넛 세그먼트 ↔ 레전드 행
  const svgNode=document.getElementById('dash-donut-svgi');
  if(!svgNode)return;
  const allSegs=svgNode.querySelectorAll('.donut-seg');
  const allRows=legEl.querySelectorAll('.ddl2-row');
  const dcLabel=svgNode.querySelector('#dc-label');
  const dcVal=svgNode.querySelector('#dc-val');
  const dcPct=svgNode.querySelector('#dc-pct');
  const defaultLabel='총 변동지출';
  const defaultVal=(total/10000).toFixed(1)+'만원';
  function activateIdx(idx){
    const seg=segs[idx];if(!seg)return;
    allSegs.forEach((p,j)=>{p.style.opacity=j===idx?'1':'0.28';});
    allRows.forEach((r,j)=>{
      r.style.background=j===idx?`${segs[j].c}18`:'';
      const amtEl=r.querySelector('[data-li-amt]');
      if(amtEl)amtEl.style.fontWeight=j===idx?'800':'700';
      if(amtEl)amtEl.style.color=j===idx?segs[j].c:'var(--text-main)';
      const barEl=r.querySelector('[data-li-bar]');
      if(barEl)barEl.style.filter=j===idx?'brightness(1.1)':'none';
    });
    if(dcLabel)dcLabel.textContent=_stripCatEmoji(seg.name);
    if(dcVal){dcVal.textContent=fmt(seg.amount);dcVal.setAttribute('fill',seg.c);}
    if(dcPct){dcPct.textContent=(seg.amount/total*100).toFixed(1)+'%';dcPct.setAttribute('opacity','1');}
  }
  function deactivate(){
    allSegs.forEach(p=>{p.style.opacity='1';});
    allRows.forEach(r=>{r.style.background='';const a=r.querySelector('[data-li-amt]');if(a){a.style.fontWeight='700';a.style.color='var(--text-main)';}const b=r.querySelector('[data-li-bar]');if(b)b.style.filter='none';});
    if(dcLabel)dcLabel.textContent=defaultLabel;
    if(dcVal){dcVal.textContent=defaultVal;dcVal.setAttribute('fill','#2D2D3A');}
    if(dcPct)dcPct.setAttribute('opacity','0');
  }
  allSegs.forEach(p=>{
    p.addEventListener('mouseenter',()=>activateIdx(+p.dataset.di));
    p.addEventListener('mouseleave',deactivate);
  });
  allRows.forEach((r,i)=>{
    r.addEventListener('mouseenter',()=>activateIdx(i));
    r.addEventListener('mouseleave',deactivate);
  });
}
// 기타 드롭다운 토글 (window.App에 등록됨 — 아래 App 객체 참고)
function _donutOtherToggle(row){
  const list=row.querySelector('.ddl2-other-list');
  const arrow=row.querySelector('.ddl2-arrow');
  if(!list)return;
  const open=list.style.maxHeight!=='0px'&&list.style.maxHeight!=='';
  list.style.maxHeight=open?'0px':list.scrollHeight+'px';
  if(arrow)arrow.style.transform=open?'':'rotate(180deg)';
}

function showDonutTip(e,name,amount,pct){
  const tip=document.getElementById('dash-donut-tip');
  if(!tip)return;
  tip.innerHTML=`<div class="dash-donut-tip-name">${name}</div><div class="dash-donut-tip-amt">${fmt(Number(amount))} · ${pct}%</div>`;
  tip.style.display='block';
  tip.style.left=(e.clientX+16)+'px';
  tip.style.top=(e.clientY-8)+'px';
}
function hideDonutTip(){
  const tip=document.getElementById('dash-donut-tip');
  if(tip)tip.style.display='none';
}

function toggleDashVarSection(){
  const body=document.getElementById('dash-var-body');
  const arrow=document.getElementById('dash-var-arrow');
  const header=document.querySelector('.dash-var-header');
  if(!body)return;
  const open=!body.classList.contains('closed');
  body.classList.toggle('closed',open);
  if(arrow)arrow.textContent=open?'›':'∨';
  if(header)header.classList.toggle('open',!open);
}

// ===== DASHBOARD RECENT ENTRIES (RIGHT PANEL) =====
const _ENTRY_CAT_BG_MAP={
  '식비':'#FFEBE5','음식':'#FFEBE5','외식':'#FFEBE5',
  '교통':'#E3F0FF','통신':'#E3F0FF','교통·통신':'#E3F0FF','차량':'#E3F0FF',
  '쇼핑':'#FFF8E1','생활':'#FFF8E1','생활용품':'#FFF8E1',
  '문화':'#F3EFFF','취미':'#F3EFFF','문화·취미':'#F3EFFF','여가':'#F3EFFF',
  '주거':'#E6FBF5','공과금':'#E6FBF5','주거·공과금':'#E6FBF5',
  '의료':'#FFE4EE','건강':'#FFE4EE',
  '저축':'#E1F9F7','금융':'#E1F9F7','투자':'#E1F9F7',
  '수입':'#E7FAF1','급여':'#E7FAF1',
  '경조사':'#FFF0D4','여행':'#E8F4FF','패션':'#FFE8F0','미용':'#FFE8F0',
};
function _entryIconForCat(cat){return _getCatSVG(cat);}
function _entryBgForCat(cat,type){
  if(type==='income')return '#E7FAF1';
  if(!cat)return '#EEE9FF';
  const n=(cat||'').toLowerCase();
  const found=Object.keys(_ENTRY_CAT_BG_MAP).find(k=>n.includes(k.toLowerCase())||cat.includes(k));
  return found?_ENTRY_CAT_BG_MAP[found]:'#EEE9FF';
}
function _entryColorForCat(cat,type){
  if(type==='income')return '#1AAD6E';
  const n=(cat||'').toLowerCase();
  if(n.includes('식비')||n.includes('음식')||n.includes('외식'))return '#E64A19';
  if(n.includes('교통')||n.includes('차량'))return '#1976D2';
  if(n.includes('쇼핑')||n.includes('생활용품'))return '#F9A825';
  if(n.includes('문화')||n.includes('취미')||n.includes('여가'))return '#7B1FA2';
  if(n.includes('주거')||n.includes('공과'))return '#00796B';
  if(n.includes('의료')||n.includes('건강'))return '#C2185B';
  if(n.includes('저축')||n.includes('금융')||n.includes('투자'))return '#00838F';
  if(n.includes('여행')||n.includes('✈'))return '#1565C0';
  if(n.includes('패션')||n.includes('미용'))return '#AD1457';
  if(n.includes('경조사'))return '#E65100';
  return '#6B5CE7';
}
function _entryDateLabel(dateStr){
  if(!dateStr)return '';
  const d=new Date(dateStr);
  if(isNaN(d.getTime()))return dateStr;
  return (d.getMonth()+1)+'월 '+d.getDate()+'일';
}
function renderDashRecentEntries(y,m){
  const el=document.getElementById('dash-recent-list');
  if(!el)return;

  // 월 테마 색상 적용 (외곽선 없음, 더보기 버튼만 파스텔 그라데이션)
  const theme=getMonthTheme(m);
  const rightCol=document.querySelector('#tab-dashboard .dash-right-col');
  if(rightCol){
    rightCol.style.border='none';
    rightCol.style.background='white';
  }
  const header=document.querySelector('#tab-dashboard .dash-recent-header');
  if(header){
    header.style.borderBottomColor=theme.border;
    header.style.background='transparent';
  }
  const moreBtn=document.querySelector('#tab-dashboard .dash-more-btn');
  if(moreBtn)moreBtn.style.background=theme.pastel;

  const key=mkey(y,m);
  const all=(S.ledger[key]||[]).slice().sort((a,b)=>{
    const da=a.date||'',db=b.date||'';
    if(da!==db)return da<db?1:-1;
    // 같은 날짜 내 정렬: 가계부 탭과 동일하게 id 내림차순 (최근 추가 순)
    return (b.id||0)-(a.id||0);
  });

  // 오늘 기준 과거 7일(당일 포함) 항목만 표시
  const today=new Date();
  const cutoff=new Date(today);cutoff.setDate(today.getDate()-6);
  const cutoffStr=cutoff.toISOString().slice(0,10);
  const todayStr=today.toISOString().slice(0,10);
  const entries=all.filter(e=>e.date&&e.date>=cutoffStr&&e.date<=todayStr);

  if(entries.length===0){
    el.innerHTML='<div style="color:var(--text-sub);font-size:13px;text-align:center;padding:32px 16px;line-height:1.7;">이 달 내역이 없어요 😊<br><span style="font-size:11px;">더 보기로 전체 내역 확인</span></div>';
    return;
  }
  el.innerHTML=entries.map(e=>{
    const svgIcon=_entryIconForCat(e.category);
    const bg=_entryBgForCat(e.category,e.type);
    const iconColor=_entryColorForCat(e.category,e.type);
    const sign=e.type==='income'?'+':'-';
    const cls=e.type==='income'?'income':'expense';
    const dateLabel=_entryDateLabel(e.date||'');
    const memo=e.memo||e.category||'';
    const shortMemo=memo.length>20?memo.slice(0,19)+'…':memo;
    const displayCat=_stripCatEmoji(e.category||'');
    return `<div class="dash-entry-card">
      <div class="dash-entry-icon" style="background:${bg};color:${iconColor};">${svgIcon}</div>
      <div class="dash-entry-info">
        <div class="dash-entry-name">${shortMemo}</div>
        <div class="dash-entry-meta">${displayCat}${displayCat&&dateLabel?' · ':''}${dateLabel}</div>
      </div>
      <div class="dash-entry-amount ${cls}">${sign}${fmt(e.amount)}</div>
    </div>`;
  }).join('');
}

// ===== INCOME / EXPENSE =====
// ===== 기본값 설정 모드 =====
let _defaultMode=false;

function openDefaultMode(){
  _defaultMode=true;
  renderIncome();
  const cm=S.currentMonths.income;
  renderBudget(cm.y,cm.m);
}
function cancelDefaultMode(){
  _defaultMode=false;
  renderIncome();
  const cm=S.currentMonths.income;
  renderBudget(cm.y,cm.m);
}

// ===== 기본값 모드 드래그 정렬 =====
let _dmDragging=null;
let _dmTouchEl=null,_dmTouchListId=null;

function _dmDragStart(e,type,id){
  _dmDragging={type,id};
  e.dataTransfer.effectAllowed='move';
  const item=e.currentTarget.closest('[data-drag-id]');
  if(item)item.classList.add('dm-dragging');
}
function _dmDragOver(e,type){
  if(!_dmDragging||_dmDragging.type!==type)return;
  e.preventDefault();
  e.dataTransfer.dropEffect='move';
  e.currentTarget.classList.add('dm-drag-over');
}
function _dmDragLeave(e){
  e.currentTarget.classList.remove('dm-drag-over');
}
function _dmDrop(e,type,targetId){
  e.preventDefault();
  e.currentTarget.classList.remove('dm-drag-over');
  if(!_dmDragging||_dmDragging.type!==type)return;
  const fromId=_dmDragging.id;
  _dmDragging=null;
  if(fromId===targetId)return;
  const listId=type==='income'?'income-list':type==='budget'?'budget-cat-list':type==='lcat'?'lcat-list':'fixed-list';
  const list=document.getElementById(listId);
  const fromEl=list.querySelector(`[data-drag-id="${fromId}"]`);
  const toEl=list.querySelector(`[data-drag-id="${targetId}"]`);
  if(!fromEl||!toEl)return;
  const items=[...list.querySelectorAll('[data-drag-id]')];
  if(items.indexOf(fromEl)<items.indexOf(toEl))toEl.after(fromEl);
  else toEl.before(fromEl);
  if(type==='lcat')_saveLcatOrder();
}
function _dmDragEnd(e){
  document.querySelectorAll('.dm-dragging,.dm-drag-over').forEach(el=>{
    el.classList.remove('dm-dragging','dm-drag-over');
  });
  _dmDragging=null;
}
function _dmTouchStart(e,listId){
  const item=e.currentTarget.closest('[data-drag-id]');
  if(!item)return;
  _dmTouchEl=item;
  _dmTouchListId=listId;
  item.classList.add('dm-dragging');
  document.addEventListener('touchmove',_dmTouchMove,{passive:false});
  document.addEventListener('touchend',_dmTouchEnd,{once:true});
}
function _dmTouchMove(e){
  if(!_dmTouchEl||!_dmTouchListId)return;
  e.preventDefault();
  const touch=e.touches[0];
  const el=document.elementFromPoint(touch.clientX,touch.clientY);
  const target=el&&el.closest('[data-drag-id]');
  if(!target||target===_dmTouchEl)return;
  const list=document.getElementById(_dmTouchListId);
  if(!list.contains(target))return;
  const items=[...list.querySelectorAll('[data-drag-id]')];
  if(items.indexOf(_dmTouchEl)<items.indexOf(target))target.after(_dmTouchEl);
  else target.before(_dmTouchEl);
}
function _dmTouchEnd(){
  if(_dmTouchEl)_dmTouchEl.classList.remove('dm-dragging');
  const listId=_dmTouchListId;
  _dmTouchEl=null;_dmTouchListId=null;
  document.removeEventListener('touchmove',_dmTouchMove);
  if(listId==='lcat-list')_saveLcatOrder();
}

function _saveLcatOrder(){
  const list=document.getElementById('lcat-list');if(!list)return;
  const order=[...list.querySelectorAll('[data-drag-id]')].map(el=>Number(el.dataset.dragId));
  if(order.length&&S.ledgerCategories){
    S.ledgerCategories.sort((a,b)=>{const ai=order.indexOf(a.id),bi=order.indexOf(b.id);return(ai<0?9999:ai)-(bi<0?9999:bi);});
  }
  saveState();
  _syncLedgerCatSelects();
  _syncAutoModalCatSelect('');
}

// 현재 달 포함 이후 모든 달에 기본값 항목을 추가/업데이트 (직접 추가한 항목은 유지, 순서 동기화)
function _propagateDefaultsToFutureMonths(fromY,fromM){
  const di=S.defaultItems||{income:[],fixed:[]};
  const defIncNames=di.income.map(d=>d.name);
  const defFixNames=di.fixed.map(d=>d.name);
  Object.keys(S.monthlyData).forEach(key=>{
    const parts=key.split('-');
    const ky=parseInt(parts[0]),km=parseInt(parts[1]);
    if(ky<fromY||(ky===fromY&&km<fromM))return;
    const mdata=S.monthlyData[key];
    di.income.forEach(def=>{
      const ex=mdata.income.find(i=>i.name===def.name);
      if(ex){ex.category=def.category;ex.amount=def.amount;}
      else{mdata.income.push({...def,id:genId()});}
    });
    di.fixed.forEach(def=>{
      const ex=mdata.fixed.find(i=>i.name===def.name);
      if(ex){ex.category=def.category;ex.amount=def.amount;ex.isSavings=def.isSavings;}
      else{mdata.fixed.push({...def,id:genId()});}
    });
    // 기본값 순서 적용 (기본값 항목을 지정된 순서로 앞에, 나머지는 뒤에 유지)
    mdata.income.sort((a,b)=>{
      const ai=defIncNames.indexOf(a.name),bi=defIncNames.indexOf(b.name);
      if(ai<0&&bi<0)return 0;if(ai<0)return 1;if(bi<0)return -1;return ai-bi;
    });
    mdata.fixed.sort((a,b)=>{
      const ai=defFixNames.indexOf(a.name),bi=defFixNames.indexOf(b.name);
      if(ai<0&&bi<0)return 0;if(ai<0)return 1;if(bi<0)return -1;return ai-bi;
    });
  });
}

function saveDefaultItems(){
  const cm=S.currentMonths.income;
  const data=getMonthData(cm.y,cm.m);
  // 드래그로 변경된 DOM 순서 읽기
  const incomeOrder=[...document.getElementById('income-list').querySelectorAll('[data-drag-id]')].map(el=>Number(el.dataset.dragId));
  const fixedOrder=[...document.getElementById('fixed-list').querySelectorAll('[data-drag-id]')].map(el=>Number(el.dataset.dragId));
  // 현재 달 데이터를 DOM 순서에 맞게 정렬
  if(incomeOrder.length)data.income.sort((a,b)=>{const ai=incomeOrder.indexOf(a.id),bi=incomeOrder.indexOf(b.id);return(ai<0?9999:ai)-(bi<0?9999:bi);});
  if(fixedOrder.length)data.fixed.sort((a,b)=>{const ai=fixedOrder.indexOf(a.id),bi=fixedOrder.indexOf(b.id);return(ai<0?9999:ai)-(bi<0?9999:bi);});
  const checkedIncome=Array.from(document.querySelectorAll('.default-chk-income:checked')).map(el=>el.value);
  const checkedFixed=Array.from(document.querySelectorAll('.default-chk-fixed:checked')).map(el=>el.value);
  if(!S.defaultItems)S.defaultItems={income:[],fixed:[]};
  S.defaultItems.income=data.income.filter(i=>checkedIncome.includes(String(i.id))).map(i=>({name:i.name,category:i.category,amount:i.amount}));
  S.defaultItems.fixed=data.fixed.filter(i=>checkedFixed.includes(String(i.id))).map(i=>({name:i.name,category:i.category,amount:i.amount,isSavings:i.isSavings}));
  // 이후 달에도 즉시 반영 (순서 포함)
  _propagateDefaultsToFutureMonths(cm.y,cm.m);
  // 예산 카테고리 기본값(synced) + 순서 저장
  const budgetOrder=[...document.getElementById('budget-cat-list').querySelectorAll('[data-drag-id]')].map(el=>Number(el.dataset.dragId));
  if(budgetOrder.length&&S.budgetCategories){
    S.budgetCategories.sort((a,b)=>{const ai=budgetOrder.indexOf(a.id),bi=budgetOrder.indexOf(b.id);return(ai<0?9999:ai)-(bi<0?9999:bi);});
  }
  document.querySelectorAll('.budget-default-chk').forEach(chk=>{
    const id=parseInt(chk.dataset.id);
    const cat=(S.budgetCategories||[]).find(c=>c.id===id);
    if(cat)cat.synced=chk.checked;
  });
  saveState();
  _defaultMode=false;
  renderIncome();
  renderBudget(cm.y,cm.m);
}

// 체크한 항목을 기본값에서 제거하고 이후 달에서도 삭제
function deleteDefaultItems(){
  const cm=S.currentMonths.income;
  const data=getMonthData(cm.y,cm.m);
  const checkedIncome=Array.from(document.querySelectorAll('.default-chk-income:checked')).map(el=>el.value);
  const checkedFixed=Array.from(document.querySelectorAll('.default-chk-fixed:checked')).map(el=>el.value);
  if(checkedIncome.length===0&&checkedFixed.length===0){
    alert('삭제할 항목을 체크해주세요.');return;
  }
  const incNames=data.income.filter(i=>checkedIncome.includes(String(i.id))).map(i=>i.name);
  const fixNames=data.fixed.filter(i=>checkedFixed.includes(String(i.id))).map(i=>i.name);
  // 기본값에서 제거
  if(S.defaultItems){
    S.defaultItems.income=(S.defaultItems.income||[]).filter(i=>!incNames.includes(i.name));
    S.defaultItems.fixed=(S.defaultItems.fixed||[]).filter(i=>!fixNames.includes(i.name));
  }
  // 현재 달 포함 이후 달에서 해당 항목 삭제
  Object.keys(S.monthlyData).forEach(key=>{
    const parts=key.split('-');
    const ky=parseInt(parts[0]),km=parseInt(parts[1]);
    if(ky<cm.y||(ky===cm.y&&km<cm.m))return;
    const mdata=S.monthlyData[key];
    mdata.income=mdata.income.filter(i=>!incNames.includes(i.name));
    mdata.fixed=mdata.fixed.filter(i=>!fixNames.includes(i.name));
  });
  saveState();
  _defaultMode=false;
  renderIncome();
}

function renderIncome(){
  const cm=S.currentMonths.income;
  document.getElementById('income-month-label').textContent=cm.y+'년 '+cm.m+'월';

  const data=getMonthData(cm.y,cm.m);
  const totalIncome=getTotalIncome(cm.y,cm.m);
  const totalFixed=getTotalFixed(cm.y,cm.m);
  const totalVar=getTotalVariable(cm.y,cm.m);

  document.getElementById('income-total').textContent=fmt(totalIncome);
  document.getElementById('fixed-total').textContent=fmt(totalFixed);
  document.getElementById('variable-total').textContent=fmt(totalVar);

  // Remaining budget display
  const rb=S.remainingBudgetSettings||{label:'현재 남은 예산',amount:0};
  const lblEl=document.getElementById('remaining-label-display');
  const inpEl=document.getElementById('remaining-budget-input');
  if(lblEl)lblEl.textContent=rb.label;
  if(inpEl&&!inpEl.matches(':focus'))inpEl.value=rb.amount||'';

  renderBudget(cm.y,cm.m);

  // Show default mode banner if active
  const defaultBanner=document.getElementById('default-mode-banner');
  if(defaultBanner)defaultBanner.style.display=_defaultMode?'flex':'none';

  const curDefIncome=(S.defaultItems&&S.defaultItems.income)||[];
  const curDefFixed=(S.defaultItems&&S.defaultItems.fixed)||[];
  const isDefaultIncome=item=>curDefIncome.some(d=>d.name===item.name&&d.amount===item.amount);
  const isDefaultFixed=item=>curDefFixed.some(d=>d.name===item.name&&d.amount===item.amount);

  // Income list
  document.getElementById('income-list').innerHTML=data.income.map(item=>{
    const da=_defaultMode?` data-drag-id="${item.id}" draggable="true" ondragstart="App._dmDragStart(event,'income',${item.id})" ondragover="App._dmDragOver(event,'income')" ondragleave="App._dmDragLeave(event)" ondrop="App._dmDrop(event,'income',${item.id})" ondragend="App._dmDragEnd(event)"`:'';
    return `<div class="expense-item${_defaultMode?' default-mode-item':' item-hover-edit'}"${da}${_defaultMode?'':` onclick="App.editItem('income',${item.id})"`}>
      ${_defaultMode?`<span class="dm-handle" ontouchstart="App._dmTouchStart(event,'income-list')">⠿</span><label class="dm-chk-label"><input type="checkbox" class="default-chk default-chk-income" value="${item.id}" ${isDefaultIncome(item)?'checked':''}><span class="dm-chk-indicator"></span></label>`:''}
      <div class="item-left"><span class="item-name">${item.name}</span><span class="item-cat">${item.category}</span></div>
      <div class="item-right">
        <span class="item-amount green">${fmt(item.amount)}</span>
        ${_defaultMode?'':`<div class="item-actions"><button class="icon-btn" onclick="event.stopPropagation();App.deleteItem('income',${item.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button></div>`}
      </div>
    </div>`;
  }).join('')||(data.income.length===0&&_defaultMode?'<div style="font-size:12px;color:var(--text-sub);padding:8px 0;">수입 항목이 없습니다</div>':'');

  // Fixed list (with isSavings badge)
  document.getElementById('fixed-list').innerHTML=data.fixed.map(item=>{
    const da=_defaultMode?` data-drag-id="${item.id}" draggable="true" ondragstart="App._dmDragStart(event,'fixed',${item.id})" ondragover="App._dmDragOver(event,'fixed')" ondragleave="App._dmDragLeave(event)" ondrop="App._dmDrop(event,'fixed',${item.id})" ondragend="App._dmDragEnd(event)"`:'';
    return `<div class="expense-item${_defaultMode?' default-mode-item':' item-hover-edit'}"${da}${_defaultMode?'':` onclick="App.editItem('fixed',${item.id})"`}>
      ${_defaultMode?`<span class="dm-handle" ontouchstart="App._dmTouchStart(event,'fixed-list')">⠿</span><label class="dm-chk-label"><input type="checkbox" class="default-chk default-chk-fixed" value="${item.id}" ${isDefaultFixed(item)?'checked':''}><span class="dm-chk-indicator"></span></label>`:''}
      <div class="item-left">
        <span class="item-name">${item.name}${item.isSavings?'<span class="savings-tag">💜저축</span>':''}</span>
        <span class="item-cat">${item.category}</span>
      </div>
      <div class="item-right">
        <span class="item-amount ${item.isSavings?'purple':'red'}">${fmt(item.amount)}</span>
        ${_defaultMode?'':`<div class="item-actions"><button class="icon-btn" onclick="event.stopPropagation();App.deleteItem('fixed',${item.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button></div>`}
      </div>
    </div>`;
  }).join('')||(data.fixed.length===0&&_defaultMode?'<div style="font-size:12px;color:var(--text-sub);padding:8px 0;">고정 지출 항목이 없습니다</div>':'');

  // Variable list
  const effectiveVars=getEffectiveVariable(cm.y,cm.m).slice().sort((a,b)=>(parseFloat(b.amount)||0)-(parseFloat(a.amount)||0));

  let varHTML=effectiveVars.map(item=>{
    const isAuto=item.autoFromLedger||item.autoFromCredit;
    const showCat=item.name!==item.category;
    const catEsc=item.name.replace(/"/g,'&quot;');
    return `
      <div class="expense-item var-hoverable"
           data-vcat="${catEsc}" data-vtotal="${item.amount}"
           onclick="App.showVarPreview(this)">
        <div class="item-left">
          <span class="var-cat-icon badge-svg-icon" style="color:var(--text-sub);margin-right:4px;">${_getCatSVG(item.category)}</span>
          <span class="item-name">${item.name}</span>
          ${showCat?`<span class="item-cat">${item.category}</span>`:''}
        </div>
        <div class="item-right">
          <span class="item-amount orange">${fmt(item.amount)}</span>
          ${!isAuto?`<div class="item-actions">
            <button class="icon-btn" onclick="event.stopPropagation();App.editItem('variable',${item.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="icon-btn" onclick="event.stopPropagation();App.deleteItem('variable',${item.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
          </div>`:''}
        </div>
      </div>`;
  }).join('');

  document.getElementById('variable-list').innerHTML=varHTML||'<div style="color:var(--text-sub);font-size:13px;padding:12px 0;">항목 없음</div>';
  renderFundCalc();
}

// ===== CREDIT CARD =====
function renderCredit(){
  const cm=S.currentMonths.credit;
  const ct=getMonthTheme(cm.m);
  const creditBanner=document.querySelector('.credit-banner');
  if(creditBanner)creditBanner.style.background=ct.gradient;
  document.getElementById('credit-month-label').textContent=cm.y+'년 '+cm.m+'월';
  document.getElementById('credit-month-text').textContent=cm.y+'년 '+cm.m+'월 납부액';
  let monthTotal=0;
  for(const card of S.creditCards){
    if(isCardDueInMonth(card,cm.y,cm.m)){
      const monthly=Math.ceil(card.amount/card.months);
      if(!(card.paidMonths||[]).includes(mkey(cm.y,cm.m)))monthTotal+=monthly;
    }
  }
  document.getElementById('credit-month-total').textContent=fmt(monthTotal);
  const list=document.getElementById('credit-list');
  if(S.creditCards.length===0){
    list.innerHTML=`<div class="card" style="text-align:center;padding:50px;color:var(--text-sub);"><div style="font-size:40px;margin-bottom:12px;">💳</div><div style="font-weight:600;">등록된 대금이 없어요</div></div>`;
    return;
  }
  // 이번 달 일괄 결제 완료 버튼 표시
  const dueCards=S.creditCards.filter(c=>isCardDueInMonth(c,cm.y,cm.m));
  const allPaidThisMonth=dueCards.length>0&&dueCards.every(c=>(c.paidMonths||[]).includes(mkey(cm.y,cm.m)));
  const bulkBtnEl=document.getElementById('credit-bulk-pay-btn');
  if(bulkBtnEl){
    if(dueCards.length>0){
      bulkBtnEl.style.display='';
      bulkBtnEl.textContent=allPaidThisMonth?'✅ 결제 완료 해제':'✅ 이번 달 모두 결제 완료';
      bulkBtnEl.className='add-btn '+(allPaidThisMonth?'green-btn':'primary');
    } else {
      bulkBtnEl.style.display='none';
    }
  }
  // Group by card name
  const cardGroups={};
  for(const card of S.creditCards){
    if(!cardGroups[card.card])cardGroups[card.card]=[];
    cardGroups[card.card].push(card);
  }
  list.innerHTML=Object.entries(cardGroups).map(([cardName,items])=>{
    const oneTimeItems=items.filter(c=>c.months===1&&isCardDueInMonth(c,cm.y,cm.m));
    const installItems=items.filter(c=>c.months>1&&isCardDueInMonth(c,cm.y,cm.m));
    const groupRemaining=items.reduce((s,c)=>s+getCardTotalRemaining(c),0);

    // 이번 달 이용내역 section (일시불 / months=1)
    let oneTimeSection='';
    if(oneTimeItems.length>0){
      const rows=oneTimeItems.map(card=>{
        const monthly=Math.ceil(card.amount/card.months);
        const pk=mkey(card.startYear,card.startMonth);
        const isPaid=(card.paidMonths||[]).includes(pk);
        const isCurrent=(card.startYear===cm.y&&card.startMonth===cm.m);
        const statusClass=isPaid?'paid':isCurrent?'current':'future';
        const statusLabel=isPaid?'결제완료':isCurrent?'이번 달':'예정';
        return `
          <div class="credit-simple-row">
            <label class="credit-check-label" style="gap:10px;flex:1;min-width:0;">
              <input type="checkbox" ${isPaid?'checked':''} onchange="App.toggleCreditPaid(${card.id},'${pk}',this.checked)"/>
              <div style="min-width:0;">
                <div class="credit-item-name">${card.item}</div>
                <div class="credit-item-sub">일시불</div>
              </div>
            </label>
            <div class="credit-simple-right">
              <span class="credit-simple-amount">${fmt(monthly)}</span>
              <span class="credit-status-badge ${statusClass}">${statusLabel}</span>
              <div class="credit-row-actions">
                <button class="credit-edit-btn" onclick="App.editCredit(${card.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> 수정</button>
                <button class="credit-delete-btn" style="font-size:12px;padding:2px 6px;border:1px solid var(--border);border-radius:6px;" onclick="App.deleteCredit(${card.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
              </div>
            </div>
          </div>`;
      }).join('');
      oneTimeSection=`
        <div class="credit-section">
          <div class="credit-section-title">이번 달 이용내역 <span class="credit-section-count">(총 ${oneTimeItems.length}건)</span></div>
          ${rows}
        </div>`;
    }

    // 할부 이용내역 section (months>1)
    let installSection='';
    if(installItems.length>0){
      const installCards=installItems.map(card=>{
        const monthly=Math.ceil(card.amount/card.months);
        const paidCount=(card.paidMonths||[]).length;
        let tableRows='';
        for(let i=0;i<card.months;i++){
          let mm=card.startMonth+i,yy=card.startYear;
          while(mm>12){mm-=12;yy++;}
          const pk=mkey(yy,mm);
          const isPaid=(card.paidMonths||[]).includes(pk);
          const isCurrent=(yy===cm.y&&mm===cm.m);
          const day=Math.min(card.startDay||1,28);
          const dateStr=yy+'.'+String(mm).padStart(2,'0')+'.'+String(day).padStart(2,'0');
          const statusClass=isPaid?'paid':isCurrent?'current':'future';
          const statusLabel=isPaid?'결제완료':isCurrent?'이번 달':'예정';
          tableRows+=`
            <tr class="${isCurrent?'install-row-current':''}">
              <td>${i+1}회차${isCurrent?'<span class="install-current-badge"> (이번 달)</span>':''}</td>
              <td>${dateStr}</td>
              <td>${fmt(monthly)}</td>
              <td>
                <label class="credit-check-label" style="gap:4px;justify-content:flex-start;">
                  <input type="checkbox" ${isPaid?'checked':''} onchange="App.toggleCreditPaid(${card.id},'${pk}',this.checked)"/>
                  <span class="credit-status-badge ${statusClass}">${statusLabel}</span>
                </label>
              </td>
            </tr>`;
        }
        return `
          <div class="credit-install-item">
            <div class="credit-install-header">
              <div style="min-width:0;flex:1;">
                <div class="credit-item-name">${card.item}</div>
                <div class="credit-item-sub">${card.months}개월 할부</div>
              </div>
              <div class="credit-install-stats">
                <div class="credit-install-stat">
                  <div class="credit-install-stat-label">월 납부</div>
                  <div class="credit-install-stat-val">${fmt(monthly)}</div>
                </div>
                <div class="credit-install-stat">
                  <div class="credit-install-stat-label">진행</div>
                  <div class="credit-install-stat-val">${paidCount} / ${card.months}회</div>
                </div>
              </div>
              <div class="credit-row-actions">
                <button class="credit-edit-btn" onclick="App.editCredit(${card.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> 수정</button>
                <button class="credit-delete-btn" style="font-size:12px;padding:2px 6px;border:1px solid var(--border);border-radius:6px;" onclick="App.deleteCredit(${card.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
              </div>
            </div>
            <table class="credit-install-table">
              <thead><tr><th>회차</th><th>결제 예정일</th><th>금액</th><th>상태</th></tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>`;
      }).join('');
      installSection=`
        <div class="credit-section">
          <div class="credit-section-title">할부 이용내역 <span class="credit-section-count">(총 ${installItems.length}건)</span></div>
          ${installCards}
        </div>`;
    }

    return `
      <div class="credit-card-group">
        <div class="credit-card-group-header">
          <span class="credit-card-group-name">💳 ${cardName}</span>
          <span class="credit-card-group-count">총 ${oneTimeItems.length+installItems.length}건 · 남은 대금 ${fmt(groupRemaining)}</span>
        </div>
        ${oneTimeSection}${installSection}
      </div>`;
  }).join('');
}

// ===== ASSETS =====
// ===== ASSET STOCKS SECTION (in assets tab) =====
function renderAssetStocks(){
  const stocks=S.stocks||[];
  // Summary using unified getTotalStockValue/Cost
  const totalBuy=getTotalStockCost();
  const totalCurrent=getTotalStockValue();
  const totalProfit=totalCurrent-totalBuy;
  const totalRate=totalBuy>0?((totalProfit/totalBuy)*100):0;
  const totalEl=document.getElementById('asset-stock-total-display');
  if(totalEl)totalEl.textContent=fmt(totalCurrent);
  const sumEl=document.getElementById('asset-stock-summary');
  if(sumEl){
    sumEl.innerHTML=stocks.length===0?'':
      `<div class="asset-stock-sum-item">
        <div class="asset-stock-sum-label">총 매입금액</div>
        <div class="asset-stock-sum-val">${fmt(totalBuy)}</div>
      </div>
      <div class="asset-stock-sum-item">
        <div class="asset-stock-sum-label">총 평가금액</div>
        <div class="asset-stock-sum-val" style="color:#00CEC9;">${fmt(totalCurrent)}</div>
      </div>
      <div class="asset-stock-sum-item">
        <div class="asset-stock-sum-label">총 손익</div>
        <div class="asset-stock-sum-val" style="color:${totalProfit>=0?'var(--green)':'var(--red)'};">${totalProfit>=0?'+':''}${fmt(totalProfit)}<span style="font-size:12px;margin-left:4px;">(${totalRate>=0?'+':''}${totalRate.toFixed(1)}%)</span></div>
      </div>`;
  }
  const listEl=document.getElementById('asset-stock-list');
  if(!listEl)return;
  if(stocks.length===0){
    listEl.innerHTML='<div style="padding:16px 0;text-align:center;color:var(--text-sub);font-size:13px;">종목을 추가하세요</div>';
    return;
  }

  // Categorize by stockType
  const domestic=stocks.filter(st=>st.stockType==='domestic'||(!st.stockType&&/^\d{6}$/.test(st.ticker)));
  const foreignStocks=stocks.filter(st=>st.stockType==='foreign');
  const goldStocks=stocks.filter(st=>st.stockType==='gold');

  function domesticCard(st){
    const val=(parseFloat(st.currentPrice)||0)*(parseFloat(st.quantity)||0);
    const cost=(parseFloat(st.buyPrice)||0)*(parseFloat(st.quantity)||0);
    const profit=val-cost;
    const rate=cost>0?((val-cost)/cost*100):0;
    const pos=rate>=0;
    return `<div class="stk-card">
      <div class="stk-card-top">
        <div class="stk-card-name">${st.name}</div>
        <div class="stk-card-actions">
          <button class="icon-btn" onclick="App.editItem('stock',${st.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="icon-btn" onclick="App.deleteItem('stock',${st.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>
      </div>
      ${st.ticker?`<div class="stk-card-ticker">${st.ticker}${st.sector?' · '+st.sector:''}</div>`:''}
      <div class="stk-card-row">
        <span class="stk-card-label">매입단가</span>
        <span class="stk-card-val">${fmt(st.buyPrice)}</span>
      </div>
      <div class="stk-card-row">
        <span class="stk-card-label">현재가</span>
        <input class="stk-price-input" type="text" inputmode="numeric" value="${st.currentPrice?(st.currentPrice).toLocaleString('ko-KR'):''}"
          oninput="App.numInputFmt(this)"
          onchange="App.updateStockPrice(${st.id},this.value)"/>
      </div>
      <div class="stk-card-row">
        <span class="stk-card-label">${st.quantity}주 평가액</span>
        <span class="stk-card-val" style="font-weight:700;">${fmt(val)}</span>
      </div>
      <div class="stk-card-profit" style="color:${pos?'var(--green)':'var(--red)'};">
        ${pos?'+':''}${rate.toFixed(1)}% &nbsp; ${pos?'+':''}${fmt(Math.abs(profit))}
      </div>
    </div>`;
  }

  function manualCard(st){
    const val=parseFloat(st.currentAmount)||0;
    const cost=parseFloat(st.buyAmount)||0;
    const profit=val-cost;
    const rate=cost>0?((val-cost)/cost*100):0;
    const pos=rate>=0;
    return `<div class="stk-card">
      <div class="stk-card-top">
        <div class="stk-card-name">${st.name}</div>
        <div class="stk-card-actions">
          <button class="icon-btn" onclick="App.editItem('stock',${st.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="icon-btn" onclick="App.deleteItem('stock',${st.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>
      </div>
      ${st.ticker&&st.ticker!=='금현물'?`<div class="stk-card-ticker">${st.ticker}${st.sector?' · '+st.sector:''}</div>`:st.sector?`<div class="stk-card-ticker">${st.sector}</div>`:''}
      <div class="stk-card-row">
        <span class="stk-card-label">매입금액</span>
        <input class="stk-price-input" type="text" inputmode="numeric" value="${cost?(cost).toLocaleString('ko-KR'):''}" placeholder="0"
          oninput="App.numInputFmt(this)"
          onchange="App.updateStockBuyAmount(${st.id},this.value)"/>
      </div>
      <div class="stk-card-row">
        <span class="stk-card-label">평가금액</span>
        <input class="stk-price-input" type="text" inputmode="numeric" value="${val?(val).toLocaleString('ko-KR'):''}" placeholder="0"
          oninput="App.numInputFmt(this)"
          onchange="App.updateStockCurrentAmount(${st.id},this.value)" style="background:#e8f5e9;"/>
      </div>
      <div class="stk-card-row">
        <span class="stk-card-label">손익</span>
        <span class="stk-card-val" style="font-weight:700;color:${pos?'var(--green)':'var(--red)'};">${profit>=0?'+':''}${fmt(profit)}</span>
      </div>
      <div class="stk-card-profit" style="color:${pos?'var(--green)':'var(--red)'};">
        ${pos?'+':''}${rate.toFixed(1)}%
      </div>
    </div>`;
  }

  function colHTML(list,label,flag,cardFn){
    return `<div class="stk-col">
      <div class="stk-col-header ${flag}">${label} <span class="stk-col-count">${list.length}종목</span></div>
      ${list.length===0
        ? '<div class="stk-col-empty">없음</div>'
        : list.map(cardFn).join('')}
    </div>`;
  }

  listEl.innerHTML=`<div class="stk-split-grid">
    ${colHTML(domestic,'🇰🇷 국내주식','kr',domesticCard)}
    <div class="stk-right-col">
      ${colHTML(foreignStocks,'🌍 해외주식','us',manualCard)}
      ${colHTML(goldStocks,'🥇 금현물','gold',manualCard)}
    </div>
  </div>`;
}

function renderAssets(){
  const total=getTotalAssets();
  document.getElementById('asset-total-display').textContent=fmt(total);
  document.getElementById('asset-count-display').textContent=S.assets.length+'개 항목';
  const list=document.getElementById('asset-list');
  if(S.assets.length===0){
    list.innerHTML=`<div style="text-align:center;padding:32px;color:var(--text-sub);"><div style="font-size:32px;margin-bottom:8px;">🏦</div><div>아직 자산이 없어요</div></div>`;return;
  }
  // Group by category
  const cats=S.assetCategories||['계좌','적금','주식'];
  const grouped={};
  cats.forEach(c=>{grouped[c]=[];});
  grouped['기타']=grouped['기타']||[];
  S.assets.forEach(a=>{
    const cat=a.category&&cats.includes(a.category)?a.category:'기타';
    if(!grouped[cat])grouped[cat]=[];
    grouped[cat].push(a);
  });
  const catIcons={'계좌':'🏦','적금':'💰','주식':'📈','기타':'📌'};
  let html='';
  [...cats,'기타'].filter((c,i,arr)=>arr.indexOf(c)===i).forEach(cat=>{
    const items=grouped[cat]||[];
    if(items.length===0)return;
    const catTotal=items.reduce((s,a)=>s+(parseFloat(a.amount)||0),0);
    html+=`<div class="asset-category-section">
      <div class="asset-category-title">
        <span>${catIcons[cat]||'📌'} ${cat}</span>
        <span class="asset-category-badge">${fmt(catTotal)}</span>
      </div>`;
    html+=items.map(a=>`
      <div class="asset-item item-hover-edit" onclick="App.editItem('asset',${a.id})">
        <div class="asset-name">${a.name}</div>
        <div style="display:flex;align-items:center;gap:12px;">
          <span class="asset-amount">${fmt(a.amount)}</span>
          <button class="icon-btn" onclick="event.stopPropagation();App.deleteItem('asset',${a.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>
      </div>`).join('');
    html+='</div>';
  });
  list.innerHTML=html;
  renderAssetStocks();
}

// ===== STOCKS =====
async function tryFetchPrice(yahooUrl,isKorean){
  const proxies=[
    `https://corsproxy.io/?${encodeURIComponent(yahooUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`,
    `https://thingproxy.freeboard.io/fetch/${yahooUrl}`,
  ];
  for(const pUrl of proxies){
    try{
      const res=await fetch(pUrl,{signal:AbortSignal.timeout(7000)});
      if(!res.ok)continue;
      const text=await res.text();
      let data;
      try{data=JSON.parse(text);}catch{continue;}
      const price=data?.chart?.result?.[0]?.meta?.regularMarketPrice;
      if(price&&price>0)return isKorean?Math.round(price):Math.round(price*1370);
    }catch(e){}
  }
  return null;
}

async function fetchStockPrices(){
  const btn=document.getElementById('asset-stock-refresh-btn');
  const status=document.getElementById('asset-stock-refresh-status');
  if(!btn)return;
  btn.classList.add('loading');btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg> 새로고침 중...';
  if(status)status.textContent='현재가를 가져오는 중...';
  let updated=0,failed=[];
  for(const st of S.stocks){
    // Only auto-refresh domestic stocks; foreign/gold are manual
    if(st.stockType==='foreign'||st.stockType==='gold'){continue;}
    try{
      const isKorean=/^\d{6}$/.test(st.ticker);
      const baseUrl='https://query1.finance.yahoo.com/v8/finance/chart/';
      const q='?interval=1d&range=1d';
      const symbol=isKorean?st.ticker+'.KS':st.ticker;
      let price=await tryFetchPrice(baseUrl+encodeURIComponent(symbol)+q,isKorean);
      if(!price&&isKorean)price=await tryFetchPrice(baseUrl+encodeURIComponent(st.ticker+'.KQ')+q,true);
      if(!price&&isKorean)price=await tryFetchPrice('https://query2.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(symbol)+q,isKorean);
      if(price&&price>0){st.currentPrice=price;updated++;}
      else failed.push(st.name);
    }catch(e){failed.push(st.name);}
    await new Promise(r=>setTimeout(r,400));
  }
  saveState();renderAssetStocks();renderDashboard();
  btn.classList.remove('loading');btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg> 현재가 새로고침';
  const now=new Date().toLocaleTimeString('ko-KR');
  if(status){
    if(updated>0)status.textContent=`${now} — ${updated}개 업데이트${failed.length>0?' | 실패: '+failed.join(', '):''}`;
    else status.textContent=`${now} — 새로고침 실패 (장 마감 또는 네트워크 오류)`;
    status.style.color=failed.length>0?'var(--red)':'var(--green)';
  }
  document.querySelectorAll('.stock-price-input').forEach(el=>{
    el.classList.add('refreshed');setTimeout(()=>el.classList.remove('refreshed'),2000);
  });
}

// ===== CONSUMPTION CALENDAR =====
function renderCalendar(){
  const y=S.calYear;
  document.getElementById('cal-year-label').textContent=y+'년';
  const now=new Date();
  const months=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const grid=document.getElementById('cal-year-grid');

  grid.innerHTML=months.map((mLabel,idx)=>{
    const m=idx+1;
    const isNow=(now.getFullYear()===y&&now.getMonth()+1===m);
    const events=((S.consumptionCalendar[y]||{})[m])||[];
    const eventsTotal=events.reduce((s,e)=>s+(parseFloat(e.amount)||0),0);

    // 이 달 개별 저축 바
    const mTarget=events.reduce((s,e)=>s+(Number(e.amount)||0),0);
    const mSaved=events.reduce((s,e)=>s+(Number(e.savedAmt)||0),0);
    const mPct=mTarget>0?Math.min(100,(mSaved/mTarget)*100):0;
    const mDone=mPct>=100;
    const mBarColor=mDone?'linear-gradient(90deg,#43C98A,#00B894)':'linear-gradient(90deg,#A29BFE,#6C5CE7)';
    const mPctColor=mDone?'#43C98A':'#6C5CE7';
    const mBarHtml=mTarget>0?`<div class="cal-month-bar"><div class="cal-month-bar-track"><div class="cal-month-bar-fill" style="width:${mPct.toFixed(2)}%;background:${mBarColor}"></div></div><span class="cal-month-bar-pct" style="color:${mPctColor}">${mPct.toFixed(0)}%</span></div>`:'';

    return `
      <div class="cal-month-card ${isNow?'cal-month-now':''}">
        <div class="cal-month-header">
          <span>${mLabel}${isNow?'<span class="cal-now-tag">NOW</span>':''}</span>
          <div style="display:flex;align-items:center;gap:4px;">
            ${eventsTotal>0?`<span class="cal-month-total">${fmt(eventsTotal)}</span>`:''}
            <button class="cal-month-add" onclick="App.openCalModal(${y},${m})">+</button>
          </div>
        </div>
        <div class="cal-event-list">
          ${events.length===0?'<div class="cal-empty">일정 없음</div>':events.map(e=>`
            <div class="cal-event-item item-hover-edit" onclick="App.editCalEvent(${y},${m},${e.id})">
              <span class="cal-event-name">${e.isPlan?'<span style="font-size:10px;background:#A29BFE;color:white;border-radius:4px;padding:1px 5px;font-weight:700;margin-right:4px;">계획</span>':''}${e.name}${e.amount>0?'<br><span class="cal-event-amount">'+fmt(e.amount)+'</span>':''}</span>
              <div style="display:flex;gap:2px;flex-shrink:0;">
                <button class="cal-event-delete" onclick="event.stopPropagation();App.deleteCalEvent(${y},${m},${e.id})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
              </div>
            </div>`).join('')}
          ${mBarHtml}
        </div>
      </div>`;
  }).join('');
  renderSavingsGoals();
  renderFood();
}

function renderSavingsGoals(){
  const y=S.calYear;
  const goals=S.savingsGoals[y]||[];
  const totalTarget=goals.reduce((s,g)=>s+(parseFloat(g.target)||0),0);
  const totalSaved=goals.reduce((s,g)=>s+(parseFloat(g.saved)||0),0);
  const overallPct=totalTarget>0?Math.min(100,(totalSaved/totalTarget)*100):0;

  // 공통 헤더 업데이트
  const subEl=document.getElementById('savings-overall-sub');
  if(subEl)subEl.textContent='달성률 '+overallPct.toFixed(1)+'%';
  const savedEl=document.getElementById('savings-overall-saved');
  if(savedEl)savedEl.textContent='저축 '+fmt(totalSaved);
  const targetEl=document.getElementById('savings-overall-target');
  if(targetEl)targetEl.textContent='목표 '+fmt(totalTarget);
  const fillEl=document.getElementById('savings-overall-fill');
  if(fillEl){
    fillEl.style.width=overallPct+'%';
    fillEl.style.background=overallPct>=100
      ?'linear-gradient(90deg,#43C98A,#00B894)'
      :'linear-gradient(90deg,#A29BFE,#6C5CE7)';
  }

  const container=document.getElementById('savings-goals-container');
  if(!container)return;

  if(goals.length===0){
    container.innerHTML=`
      <div class="savings-empty-state">
        <div style="font-size:32px;margin-bottom:8px;">🎯</div>
        <div style="font-size:14px;font-weight:700;color:#5E4BC4;margin-bottom:3px;">아직 저축 목표가 없어요</div>
        <div style="font-size:12px;color:#9490A8;">"+ 목표 추가" 버튼을 눌러서 시작하세요!</div>
      </div>`;
    return;
  }

  container.innerHTML=goals.map(g=>{
    const target=parseFloat(g.target)||0;
    const saved=parseFloat(g.saved)||0;
    const pct=target>0?Math.min(100,(saved/target)*100):0;
    const remaining=Math.max(0,target-saved);
    const done=pct>=100;
    const color=g.color||'#A29BFE';
    return `
      <div class="savings-goal-card ${done?'goal-done':''} item-hover-edit" onclick="App.editSavingsGoal(${g.id})">
        <div class="savings-goal-card-top">
          <div class="savings-goal-card-title">
            <span class="savings-goal-dot" style="background:${color}"></span>
            <span class="savings-goal-card-name">${g.name}</span>
            ${done?'<span class="goal-done-badge">🎉 달성!</span>':''}
          </div>
          <div class="savings-goal-card-actions">
            <button class="icon-btn" onclick="event.stopPropagation();App.deleteSavingsGoal(${g.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
          </div>
        </div>
        <div class="savings-progress-track">
          <div class="savings-progress-fill" style="width:${pct}%;background:${done?'linear-gradient(90deg,#43C98A,#00B894)':color};"></div>
        </div>
        <div class="savings-goal-meta">
          <div class="savings-goal-meta-left">
            <span class="savings-saved-label">저축</span>
            <input class="savings-saved-input" type="text" inputmode="numeric"
              value="${saved?(saved).toLocaleString('ko-KR'):''}"
              oninput="App.numInputFmt(this)"
              onchange="App.updateSavedAmount(${g.id},this.value)"
              onkeydown="if(event.key==='Enter'){App.updateSavedAmount(${g.id},this.value);this.blur();}"
              onclick="event.stopPropagation()"
              style="border-color:${color}"/>
          </div>
          <div class="savings-goal-meta-right">
            <span class="savings-pct-badge" style="background:${color}22;color:${color}">${pct.toFixed(1)}%</span>
            <span class="savings-target-label">목표 ${fmt(target)}</span>
            ${!done?`<span class="savings-remaining-label">남은 ${fmt(remaining)}</span>`:''}
          </div>
        </div>
      </div>`;
  }).join('');

  // 월 카드 미니 바도 같이 갱신 (저축 변경 시 캘린더 그리드 반영)
  const grid=document.getElementById('cal-year-grid');
  if(grid){
    const hasSavings=goals.length>0&&totalTarget>0;
    const isDone=overallPct>=100;
    grid.querySelectorAll('.cal-month-savings-mini').forEach(el=>{
      if(!hasSavings){el.style.display='none';return;}
      el.style.display='';
      el.classList.toggle('cal-month-savings-done',isDone);
      const pctEl=el.querySelector('.cal-month-savings-mini-label span:last-child');
      if(pctEl){pctEl.textContent=overallPct.toFixed(0)+'%';pctEl.style.color=isDone?'#43C98A':'#A29BFE';}
      const fill=el.querySelector('.cal-month-savings-mini-fill');
      if(fill)fill.style.width=overallPct+'%';
    });
  }
}

function renderWeeklySpend(){
  const container=document.getElementById('weekly-spend-container');
  if(!container)return;
  const cm=S.currentMonths.food;
  const key=mkey(cm.y,cm.m);
  const ledgerEntries=(S.ledger[key]||[]).filter(e=>
    e.type==='expense'&&
    !(e.category||'').includes('공과금')
  );
  // 활성 자동화 (신용카드 자동화 포함) 금액도 합산
  const activeAutos=(S.automations||[]).filter(a=>{
    if(!a.active||a.type!=='expense')return false;
    const startY=a.startYear||cm.y;const startM=a.startMonth||1;
    return !(cm.y<startY||(cm.y===startY&&cm.m<startM));
  });
  const hasAny=ledgerEntries.length>0||activeAutos.length>0;
  if(!hasAny){
    container.innerHTML='<div class="weekly-spend-empty">이번 달 소비 내역이 없어요<br><span style="font-size:12px;color:var(--text-sub);">가계부에 지출을 입력하면 여기에 자동 표시됩니다</span></div>';
    return;
  }
  const daysInMonth=new Date(cm.y,cm.m,0).getDate();
  const weekTotals={};
  ledgerEntries.forEach(e=>{
    const d=parseInt((e.date||'').split('-')[2])||1;
    const wn=Math.ceil(d/7);
    weekTotals[wn]=(weekTotals[wn]||0)+e.amount;
  });
  // 자동화 항목도 billingDay 기준으로 주차별 합산
  activeAutos.forEach(a=>{
    const d=parseInt(a.billingDay)||1;
    const safeD=Math.min(d,daysInMonth);
    const wn=Math.ceil(safeD/7);
    weekTotals[wn]=(weekTotals[wn]||0)+(Number(a.amount)||0);
  });
  const total=Object.values(weekTotals).reduce((s,v)=>s+v,0);
  const maxWeek=Math.max(...Object.values(weekTotals),1);
  // 주차가 없으면 비어있을 수 있으므로 전체 주차 생성
  const numWeeks=Math.ceil(daysInMonth/7);
  const allWeeks=[];for(let w=1;w<=numWeeks;w++)if(weekTotals[w]>0)allWeeks.push([String(w),weekTotals[w]]);
  container.innerHTML=allWeeks.map(([wn,wTotal])=>{
    const wNum=parseInt(wn);
    const startDay=(wNum-1)*7+1;
    const endDay=Math.min(wNum*7,daysInMonth);
    const barPct=Math.round(wTotal/maxWeek*100);
    const pctOfTotal=total>0?(wTotal/total*100).toFixed(0):0;
    return `<div class="weekly-spend-row">
      <div class="weekly-spend-label">${wNum}주차<span class="weekly-spend-days">${startDay}~${endDay}일</span></div>
      <div class="weekly-spend-bar-wrap"><div class="weekly-spend-bar" style="width:${barPct}%"></div></div>
      <div class="weekly-spend-right">
        <span class="weekly-spend-amount">${fmt(wTotal)}</span>
        <span class="weekly-spend-pct">${pctOfTotal}%</span>
      </div>
    </div>`;
  }).join('')+`<div class="weekly-spend-total">이번 달 소비 합계 <strong>${fmt(total)}</strong></div>`;
}

// ===== FOOD CALENDAR — INLINE PANEL =====
let currentFoodPanel=null;

// 금액에 따른 범례 스타일 반환
function _getAmountLegendStyle(amount,ft){
  if(!amount||amount<=0)return {bg:'',color:'',border:''};
  const legend=(S&&S.calAmountLegend)||DEFAULT_DATA().calAmountLegend;
  let matched=null;
  for(let i=0;i<legend.length;i++){
    if(amount>=(legend[i].min||0))matched=legend[i];
  }
  if(!matched||matched.type==='none')return {bg:'',color:'',border:''};
  if(matched.type==='theme-ultralight')return {bg:ft.t1+'22',color:ft.t1,border:ft.t1+'44'};
  if(matched.type==='theme-light')return {bg:ft.bg,color:ft.t1,border:ft.border};
  if(matched.type==='theme-mid')return {bg:ft.mid||ft.bg,color:ft.t1,border:ft.border};
  return {bg:matched.bg||'',color:matched.color||'',border:''};
}

// ===== 여행 일정 캘린더 바 헬퍼 =====
// 해당 년월과 겹치는 여행 목록 반환
function _getTravelTripsForMonth(y, m) {
  if (!S.travels || !S.travels.trips) return [];
  const monthStart = new Date(y, m - 1, 1);
  const monthEnd = new Date(y, m, 0);
  return S.travels.trips.filter(t => {
    if (!t.startDate) return false;
    const start = new Date(t.startDate);
    const end = t.endDate ? new Date(t.endDate) : start;
    return start <= monthEnd && end >= monthStart;
  });
}

// 한 주 행에 표시할 여행 바 HTML 반환
function _renderTripBarsForWeek(trips, y, m, rowCells) {
  const dayCells = rowCells.filter(c => c.type === 'day');
  if (!trips.length || !dayCells.length) return '';
  const weekMinDay = Math.min(...dayCells.map(c => c.d));
  const weekMaxDay = Math.max(...dayCells.map(c => c.d));
  const daysInMonth = new Date(y, m, 0).getDate();
  const monthStart = new Date(y, m - 1, 1);
  const monthEnd = new Date(y, m, 0);

  const bars = [];
  trips.forEach(t => {
    const tripStart = new Date(t.startDate);
    const tripEnd = t.endDate ? new Date(t.endDate) : new Date(t.startDate);
    // 이 달 기준 시작·끝 일자 (다른 달은 클램프)
    let startDay, endDay;
    if (tripStart <= monthEnd && tripStart >= monthStart) {
      startDay = tripStart.getDate();
    } else if (tripStart < monthStart) {
      startDay = 1;
    } else {
      return;
    }
    if (tripEnd >= monthStart && tripEnd <= monthEnd) {
      endDay = tripEnd.getDate();
    } else if (tripEnd > monthEnd) {
      endDay = daysInMonth;
    } else {
      return;
    }
    // 이 주와 겹치는 범위
    const effStart = Math.max(startDay, weekMinDay);
    const effEnd = Math.min(endDay, weekMaxDay);
    if (effStart > effEnd) return;
    const startCell = rowCells.find(c => c.type === 'day' && c.d === effStart);
    const endCell = rowCells.find(c => c.type === 'day' && c.d === effEnd);
    if (!startCell || !endCell) return;
    const colStart = startCell.dow + 1;
    const colEnd = endCell.dow + 2;
    // travel.js 함수 사용 (script 로드 순서상 사용 가능)
    const flag = (typeof getCountryFlag === 'function') ? getCountryFlag(t) : '✈️';
    const bg = (typeof getTripFlagBg === 'function') ? getTripFlagBg(t) : '#74B9FF';
    // 왼쪽 끝/오른쪽 끝 둥글기: 이 달·이 주에서 시작/끝인지
    const roundLeft = effStart === startDay ? '6px' : '0';
    const roundRight = effEnd === endDay ? '6px' : '0';
    const startsHere = roundLeft !== '0';
    const endsHere = roundRight !== '0';
    bars.push({ colStart, colEnd, name: t.name, flag, bg, startsHere, endsHere });
  });
  if (!bars.length) return '';
  return `<div class="trip-events-row">${bars.map(b =>
    `<div class="trip-event-bar" style="grid-column:${b.colStart}/${b.colEnd};--bar-color:${b.bg};" title="${b.name} ${b.flag}"><div class="trip-bar-track">${b.startsHere?`<span class="trip-bar-plane">✈</span><span class="trip-bar-dash"></span><span class="trip-bar-label">${b.name} ${b.flag}</span>`:'<span class="trip-bar-cont"></span>'}<span class="trip-bar-dash"></span>${b.endsHere?'<span class="trip-bar-tip">›</span>':''}</div></div>`
  ).join('')}</div>`;
}
// ===== 여행 일정 캘린더 바 헬퍼 끝 =====

// 날짜별 소비 금액 계산 (가계부 지출 + 자동화) — renderFood 외부에서도 사용 가능
function _getDaySpendAmount(d, ledgerEntries, activeAutos){
  const ledgerAmt=ledgerEntries.filter(e=>{
    const ed=parseInt((e.date||'').split('-')[2])||0;
    return ed===d;
  }).reduce((s,e)=>s+(e.amount||0),0);
  const autoAmt=activeAutos.filter(a=>(parseInt(a.billingDay)||1)===d).reduce((s,a)=>s+(Number(a.amount)||0),0);
  return ledgerAmt+autoAmt;
}

function renderFood(){
  const cm=S.currentMonths.food;
  const ft=getMonthTheme(cm.m);
  const summaryBar=document.querySelector('.food-summary-bar');
  if(summaryBar){
    summaryBar.style.background=ft.light;
    summaryBar.style.borderColor=ft.border;
    const sumLabel=summaryBar.querySelector('.food-sum-label');
    const sumAmount=document.getElementById('food-total-display');
    const reflectAmt=document.getElementById('food-reflect-amount');
    if(sumLabel)sumLabel.style.color=ft.color;
    if(sumAmount)sumAmount.style.color=ft.color;
    if(reflectAmt)reflectAmt.style.color=ft.color;
  }
  // 소비금액 보기/숨기기 버튼 상태 업데이트
  _updateSpendToggleBtn(ft);
  document.getElementById('food-month-label').textContent=cm.y+'년 '+cm.m+'월';
  const key=mkey(cm.y,cm.m);
  const directSetting=S.foodDirectSet[key]||{direct:false,amount:0};
  const foodTotal=getFoodTotal(cm.y,cm.m);
  const dc=document.getElementById('food-direct-check');if(dc)dc.checked=directSetting.direct;
  const dw=document.getElementById('food-direct-input-wrap');if(dw)dw.style.display=directSetting.direct?'block':'none';
  if(directSetting.direct){const inp=document.getElementById('food-direct-input');if(inp)inp.value=directSetting.amount;}
  document.getElementById('food-total-display').textContent=fmt(foodTotal);
  document.getElementById('food-reflect-amount').textContent=fmt(foodTotal);
  const days=S.foodCalendar[key]||{};
  const firstDay=new Date(cm.y,cm.m-1,1).getDay();
  const daysInMonth=new Date(cm.y,cm.m,0).getDate();
  const dowLabels=['일','월','화','수','목','금','토'];

  // 공과금 제외 가계부 지출 항목
  const ledgerEntries=(S.ledger[key]||[]).filter(e=>e.type==='expense'&&!(e.category||'').includes('공과금'));

  // 이 달에 해당하는 활성 자동화 고정 지출 목록 (신용카드 자동화 포함)
  const activeAutos=(S.automations||[]).filter(a=>{
    if(!a.active||a.type!=='expense')return false;
    const startY=a.startYear||cm.y;const startM=a.startMonth||1;
    return !(cm.y<startY||(cm.y===startY&&cm.m<startM));
  });

  const spendMode=S.calSpendMode===true;

  // 모든 셀 목록 (앞 빈칸 + 날짜 + 뒤 빈칸)
  const allCells=[];
  for(let i=0;i<firstDay;i++)allCells.push({type:'empty'});
  for(let d=1;d<=daysInMonth;d++){
    const dow=(firstDay+d-1)%7;
    const dayAutos=activeAutos.filter(a=>(a.billingDay||1)===d);
    allCells.push({type:'day',d,dow,dd:days[d]||{},isOpen:currentFoodPanel===d,autos:dayAutos});
  }
  const rem=(firstDay+daysInMonth)%7;
  if(rem>0)for(let i=0;i<7-rem;i++)allCells.push({type:'empty'});

  const totalRows=allCells.length/7;
  let rowsHTML='';
  const _todayNow=new Date();
  const _isThisMonth=cm.y===_todayNow.getFullYear()&&cm.m===(_todayNow.getMonth()+1);
  const _todayD=_todayNow.getDate();
  // 이 달과 겹치는 여행 목록 (Google Calendar 스타일 바 렌더링용)
  const _travelTrips=_getTravelTripsForMonth(cm.y,cm.m);

  for(let row=0;row<totalRows;row++){
    const rowCells=allCells.slice(row*7,(row+1)*7);
    const rowDays=rowCells.filter(c=>c.type==='day').map(c=>c.d);

    // 식비 캘린더 주합계
    const foodWeekTotal=rowDays.reduce((s,d)=>s+(Number((days[d]||{}).amount)||0),0);
    // 소비 주합계 (가계부 + 자동화)
    const ledgerWeekTotal=rowDays.reduce((s,d)=>s+_getDaySpendAmount(d,ledgerEntries,activeAutos),0);

    const rowHTML=rowCells.map(cell=>{
      if(cell.type==='empty')return '<div class="food-day empty"></div>';
      const{d,dow,dd,isOpen,autos}=cell;
      const isToday=_isThisMonth&&d===_todayD;
      // 오늘: 외곽선만, 배경 없음
      const todayInlineStyle=isToday?`border:2px solid ${ft.t1};`:'';
      const todayNumInlineStyle=isToday?`color:${ft.t1};font-weight:900;`:'';
      const sunStyle=!isToday&&dow===0?'color:var(--red);':'';
      const satStyle=!isToday&&dow===6?'color:var(--blue);':'';

      if(spendMode){
        const daySpend=_getDaySpendAmount(d,ledgerEntries,activeAutos);
        const ls=_getAmountLegendStyle(daySpend,ft);
        // 오늘: 배경 없음(외곽선만), 나머지: 금액 tier 배경
        const cellBg=isToday?'var(--card-bg)':(ls.bg||'var(--card-bg)');
        const amtColor=isToday?ft.t1:(ls.color||'var(--text-sub)');
        const spendStr=daySpend>0
          ?`<div class="food-day-spend-amount" style="color:${amtColor};">₩&nbsp;${daySpend.toLocaleString('ko-KR')}</div>`
          :`<div class="food-day-spend-zero">—</div>`;
        return `<div class="food-day food-day-spend-mode${isOpen?' panel-open':''}${isToday?' today-theme':''}" style="background:${cellBg};${isToday?`border:2px solid ${ft.t1};`:''}" onclick="App.toggleFoodPanel(${d})" title="${d}일 클릭하여 편집">
          <div class="food-day-header-row">
            <div class="food-day-num ${dow===0?'sun':dow===6?'sat':''}" style="${todayNumInlineStyle}${sunStyle}${satStyle}">${d}</div>
          </div>
          ${spendStr}
        </div>`;
      }

      // 기본 모드 (식단/메모/일정 보기) — 자동화 뱃지 제거, 점만 표시
      const hasAutoThisDay=autos&&autos.length>0;
      const autosDot=hasAutoThisDay
        ?`<span class="food-auto-dot-wrap"><span class="food-auto-dot">●</span><span class="food-auto-dot-tip">${autos.map(a=>a.memo||a.name||'자동화').join(' · ')}</span></span>`
        :'';
      return `<div class="food-day${isOpen?' panel-open':''}${isToday?' today-theme':''}" style="${todayInlineStyle}" onclick="App.toggleFoodPanel(${d})" title="${d}일 클릭하여 편집">
        <div class="food-day-header-row">
          <div class="food-day-num ${dow===0?'sun':dow===6?'sat':''}" style="${todayNumInlineStyle}">${d}</div>
          ${autosDot}
        </div>
        ${dd.special?`<div class="food-special-tag">${dd.special}</div>`:''}
        ${dd.memo?`<div class="food-memo">${dd.memo}</div>`:''}
        ${dd.amount?`<div class="food-amount">${Number(dd.amount).toLocaleString('ko-KR')}</div>`:''}
      </div>`;
    }).join('');

    rowsHTML+=`<div class="food-cal-week-row">${rowHTML}</div>`;
    rowsHTML+=_renderTripBarsForWeek(_travelTrips,cm.y,cm.m,rowCells);
    rowsHTML+=`<div class="food-week-summary" style="border-color:${ft.border};background:${ft.light};">
      <span class="food-week-label" style="color:${ft.color};">${row+1}주차</span>
      <div class="food-week-totals">
        ${!spendMode&&foodWeekTotal>0?`<span class="food-week-chip food-week-food" style="background:${ft.light};color:${ft.color};">식비 ${fmt(foodWeekTotal)}</span>`:''}
        ${spendMode&&ledgerWeekTotal>0?`<span class="food-week-chip food-week-ledger" style="color:${ft.color};">소비 ${fmt(ledgerWeekTotal)}</span>`:''}
        ${spendMode&&ledgerWeekTotal===0?`<span class="food-week-none">기록 없음</span>`:''}
        ${!spendMode&&foodWeekTotal===0?`<span class="food-week-none">기록 없음</span>`:''}
      </div>
    </div>`;
  }

  // 범례 HTML 생성 (소비금액 표시 모드일 때만)
  let legendHTML='';
  if(spendMode){try{legendHTML=_buildLegendBar(ft);}catch(e){legendHTML='';}}

  // 소비 모드 배너
  const spendBanner=spendMode
    ?`<div class="cal-spend-mode-banner" style="background:linear-gradient(135deg,${ft.t1}18,${ft.t2}22);border-bottom:2px solid ${ft.t1}44;color:${ft.t1};">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        소비 금액 보기 모드 — 날짜별 지출액(가계부+자동화)이 표시됩니다
      </div>`
    :'';

  document.getElementById('food-calendar').innerHTML=`
    ${spendBanner}
    <div class="food-cal-header" style="background:${ft.light};">
      ${dowLabels.map((d,i)=>`<div class="food-cal-dow ${i===0?'sun':i===6?'sat':''}">${d}</div>`).join('')}
    </div>
    <div class="food-cal-rows">${rowsHTML}</div>
    <div style="padding:14px 18px;background:${ft.light};border-top:1.5px solid ${ft.border};font-size:13px;font-weight:700;text-align:right;color:${ft.color};">총 ${fmt(foodTotal)}</div>
    ${legendHTML}`;

  // 테마 진하기 슬라이더 값·잠금 상태 동기화
  syncThemeSlider();

  if(currentFoodPanel!==null){
    renderFoodPanel(currentFoodPanel);
  } else {
    const existing=document.getElementById('food-inline-panel');
    if(existing)existing.remove();
  }
}

// 소비금액 보기/숨기기 토글
function toggleCalSpendMode(){
  S.calSpendMode=!S.calSpendMode;
  saveState();
  renderFood();
}

// 토글 버튼 상태 업데이트
function _updateSpendToggleBtn(ft){
  const btn=document.getElementById('cal-spend-toggle-btn');
  if(!btn)return;
  const isSpend=!!S.calSpendMode;
  const t=ft||getMonthTheme((S.currentMonths.food||{m:new Date().getMonth()+1}).m);
  if(isSpend){
    btn.style.background=`linear-gradient(135deg,${t.t1},${t.t2})`;
    btn.style.color='white';
    btn.style.borderColor='transparent';
    btn.innerHTML=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> 소비 금액 숨기기`;
  }else{
    btn.style.background='white';
    btn.style.color=t.t1;
    btn.style.borderColor=t.border||'#EEE9FF';
    btn.innerHTML=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> 소비 금액 보기`;
  }
}

// 범례 바 HTML 빌드
function _buildLegendBar(ft){
  const legend=S.calAmountLegend||DEFAULT_DATA().calAmountLegend;
  const items=legend.map((tier,i)=>{
    let swatch='';
    if(tier.type==='none'||(!tier.bg&&!tier.type)){
      swatch=`<span class="cal-legend-swatch" style="background:white;border:1.5px solid #DDD;"></span>`;
    } else if(tier.type==='theme-ultralight'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.t1}22;border:1.5px solid ${ft.t1}44;"></span>`;
    } else if(tier.type==='theme-light'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.bg};border:1.5px solid ${ft.border};"></span>`;
    } else if(tier.type==='theme-mid'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.mid||ft.bg};border:1.5px solid ${ft.border};"></span>`;
    } else {
      swatch=`<span class="cal-legend-swatch" style="background:${tier.bg};border:1.5px solid ${tier.color||tier.bg};"></span>`;
    }
    return `<span class="cal-legend-item">${swatch}<span class="cal-legend-label">${tier.label}</span></span>`;
  }).join('');
  return `<div class="cal-amount-legend-bar">
    <span class="cal-legend-title">금액 범례</span>
    ${items}
    <button class="cal-legend-edit-btn" onclick="App.openLegendSettings()" title="범례 수정">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      수정
    </button>
  </div>`;
}

// 범례 설정 모달 열기
function openLegendSettings(){
  const legend=S.calAmountLegend||DEFAULT_DATA().calAmountLegend;
  const ft=getMonthTheme(S.currentMonths.food.m);

  const TYPE_OPTIONS=[
    {value:'none',        label:'없음'},
    {value:'theme-ultralight', label:'초연(테마)'},
    {value:'theme-light', label:'라이트(테마)'},
    {value:'theme-mid',   label:'미드(테마)'},
    {value:'custom',      label:'직접 지정'},
  ];

  const rows=legend.map((tier,i)=>{
    const isTheme=tier.type==='theme-ultralight'||tier.type==='theme-light'||tier.type==='theme-mid';
    const curType=(!tier.type||tier.type==='')?(tier.bg?'custom':'none'):tier.type;
    const effectiveType=isTheme?curType:'custom'===curType?'custom':curType;
    const typeOpts=TYPE_OPTIONS.map(o=>`<option value="${o.value}"${(curType===o.value||(curType!='none'&&!isTheme&&curType!='theme-ultralight'&&curType!='theme-light'&&curType!='theme-mid'&&o.value==='custom'))?'selected':''}>${o.label}</option>`).join('');
    const showCustom=!isTheme&&curType!='none';
    return `<div class="legend-edit-row" data-idx="${i}" style="display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:10px;border:1.5px solid var(--border);background:var(--bg);">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <input class="legend-edit-label form-input" style="width:96px;flex-shrink:0;" value="${tier.label.replace(/"/g,'&quot;')}" placeholder="라벨" oninput="App._refreshLegendPreview()"/>
        <input class="legend-edit-min form-input" type="number" style="width:82px;flex-shrink:0;" value="${tier.min||0}" placeholder="최소" oninput="App._refreshLegendPreview()"/>
        <span style="font-size:12px;color:#999;flex-shrink:0;">~</span>
        <input class="legend-edit-max form-input" type="number" style="width:82px;flex-shrink:0;" value="${tier.max>=99999999?'':tier.max}" placeholder="무제한" oninput="App._refreshLegendPreview()"/>
        <button onclick="App._deleteLegendRow(this)" title="이 구간 삭제" style="margin-left:auto;background:none;border:1.5px solid #FFCDD2;border-radius:8px;color:#E57373;font-size:13px;padding:3px 8px;cursor:pointer;flex-shrink:0;" onmouseenter="this.style.background='#FFEBEE'" onmouseleave="this.style.background='none'">🗑</button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <select class="legend-edit-type form-input" style="font-size:12px;padding:4px 8px;flex-shrink:0;" onchange="App._onLegendTypeChange(this,${i})">
          ${typeOpts}
        </select>
        <div class="legend-custom-colors" style="display:${showCustom?'flex':'none'};gap:6px;align-items:center;">
          <label style="font-size:11px;color:var(--text-sub);">배경</label>
          <input type="color" class="legend-edit-bg" value="${tier.bg||'#ffffff'}" style="width:34px;height:28px;border-radius:6px;border:1.5px solid var(--border);cursor:pointer;padding:2px;" oninput="App._refreshLegendPreview()"/>
          <label style="font-size:11px;color:var(--text-sub);">글자</label>
          <input type="color" class="legend-edit-color" value="${tier.color||'#333333'}" style="width:34px;height:28px;border-radius:6px;border:1.5px solid var(--border);cursor:pointer;padding:2px;" oninput="App._refreshLegendPreview()"/>
        </div>
        <div class="legend-theme-preview" style="display:${isTheme?'flex':'none'};align-items:center;gap:4px;">
          <span style="font-size:11px;color:${ft.t1};font-weight:700;background:${ft.bg};border:1.5px solid ${ft.border};border-radius:8px;padding:3px 8px;">월 테마 자동 적용</span>
        </div>
      </div>
    </div>`;
  }).join('');

  const modal=document.getElementById('modal-overlay');
  if(!modal)return;
  modal.classList.add('active');
  modal.style.display='flex';
  modal.style.alignItems='center';
  modal.style.justifyContent='center';
  modal.innerHTML=`<div class="modal active" style="max-width:580px;width:96%;padding:26px 24px;position:relative;top:auto;left:auto;transform:none;" onclick="event.stopPropagation()">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <div style="font-size:16px;font-weight:800;color:var(--text-main);">📊 금액 범례 수정</div>
      <button onclick="App.closeModal()" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-sub);padding:4px 8px;border-radius:8px;">✕</button>
    </div>
    <div style="font-size:12px;color:var(--text-sub);margin-bottom:12px;line-height:1.6;">
      구간별 라벨·금액범위·색상 타입을 설정하세요. <span style="color:#A29BFE;font-weight:600;">테마색</span>은 매월 자동 변경됩니다.
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;max-height:340px;overflow-y:auto;padding-right:4px;" id="legend-edit-rows">
      ${rows}
    </div>
    <div style="margin-top:14px;padding:10px 14px;border-radius:10px;background:var(--bg);border:1.5px solid var(--border);">
      <div style="font-size:11px;color:var(--text-sub);font-weight:600;margin-bottom:6px;">미리보기</div>
      <div id="legend-live-preview"></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:16px;border-top:1.5px solid var(--border);padding-top:14px;">
      <button onclick="App._addLegendRow()" style="background:none;border:1.5px solid #A29BFE;border-radius:20px;color:#A29BFE;font-size:12px;font-weight:700;padding:6px 14px;cursor:pointer;" onmouseenter="this.style.background='#F3F0FF'" onmouseleave="this.style.background='none'">＋ 구간 추가</button>
      <div style="display:flex;gap:8px;">
        <button class="backup-btn" onclick="App.closeModal()">취소</button>
        <button class="add-btn primary btn-save" onclick="App.saveLegendSettings()">저장</button>
      </div>
    </div>
  </div>`;

  // 초기 미리보기 렌더
  _refreshLegendPreview();
}

// 범례 행 추가
function _addLegendRow(){
  const container=document.getElementById('legend-edit-rows');
  if(!container)return;
  const ft=getMonthTheme(S.currentMonths.food.m);
  const TYPE_OPTIONS=[
    {value:'none',label:'없음'},
    {value:'theme-ultralight',label:'초연(테마)'},
    {value:'theme-light',label:'라이트(테마)'},
    {value:'theme-mid',label:'미드(테마)'},
    {value:'custom',label:'직접 지정'},
  ];
  const typeOpts=TYPE_OPTIONS.map(o=>`<option value="${o.value}"${o.value==='none'?'selected':''}>  ${o.label}</option>`).join('');
  const div=document.createElement('div');
  div.className='legend-edit-row';
  div.style.cssText='display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:10px;border:1.5px solid #A29BFE55;background:var(--bg);';
  div.innerHTML=`
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
      <input class="legend-edit-label form-input" style="width:96px;flex-shrink:0;" value="새 구간" placeholder="라벨" oninput="App._refreshLegendPreview()"/>
      <input class="legend-edit-min form-input" type="number" style="width:82px;flex-shrink:0;" value="0" placeholder="최소" oninput="App._refreshLegendPreview()"/>
      <span style="font-size:12px;color:#999;flex-shrink:0;">~</span>
      <input class="legend-edit-max form-input" type="number" style="width:82px;flex-shrink:0;" value="" placeholder="무제한" oninput="App._refreshLegendPreview()"/>
      <button onclick="App._deleteLegendRow(this)" title="이 구간 삭제" style="margin-left:auto;background:none;border:1.5px solid #FFCDD2;border-radius:8px;color:#E57373;font-size:13px;padding:3px 8px;cursor:pointer;flex-shrink:0;" onmouseenter="this.style.background='#FFEBEE'" onmouseleave="this.style.background='none'">🗑</button>
    </div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
      <select class="legend-edit-type form-input" style="font-size:12px;padding:4px 8px;flex-shrink:0;" onchange="App._onLegendTypeChange(this,-1)">
        ${typeOpts}
      </select>
      <div class="legend-custom-colors" style="display:none;gap:6px;align-items:center;">
        <label style="font-size:11px;color:var(--text-sub);">배경</label>
        <input type="color" class="legend-edit-bg" value="#ffffff" style="width:34px;height:28px;border-radius:6px;border:1.5px solid var(--border);cursor:pointer;padding:2px;" oninput="App._refreshLegendPreview()"/>
        <label style="font-size:11px;color:var(--text-sub);">글자</label>
        <input type="color" class="legend-edit-color" value="#333333" style="width:34px;height:28px;border-radius:6px;border:1.5px solid var(--border);cursor:pointer;padding:2px;" oninput="App._refreshLegendPreview()"/>
      </div>
      <div class="legend-theme-preview" style="display:none;align-items:center;gap:4px;">
        <span style="font-size:11px;color:${ft.t1};font-weight:700;background:${ft.bg};border:1.5px solid ${ft.border};border-radius:8px;padding:3px 8px;">월 테마 자동 적용</span>
      </div>
    </div>`;
  container.appendChild(div);
  // 새 행 스크롤
  div.scrollIntoView({behavior:'smooth',block:'nearest'});
  _refreshLegendPreview();
}

// 범례 행 삭제
function _deleteLegendRow(btn){
  const rows=document.querySelectorAll('#legend-edit-rows .legend-edit-row');
  if(rows.length<=1)return; // 최소 1개 유지
  const row=btn.closest('.legend-edit-row');
  if(row)row.remove();
  _refreshLegendPreview();
}

// 범례 타입 변경 시 색상 피커 토글 + 미리보기 업데이트
function _onLegendTypeChange(sel, idx){
  const row=sel.closest('.legend-edit-row');
  const customDiv=row.querySelector('.legend-custom-colors');
  const themeDiv=row.querySelector('.legend-theme-preview');
  const isTheme=sel.value==='theme-ultralight'||sel.value==='theme-light'||sel.value==='theme-mid';
  const isNone=sel.value==='none';
  customDiv.style.display=(!isTheme&&!isNone)?'flex':'none';
  themeDiv.style.display=isTheme?'flex':'none';
  _refreshLegendPreview();
}

// 실시간 미리보기 업데이트
function _refreshLegendPreview(){
  const previewEl=document.getElementById('legend-live-preview');
  if(!previewEl)return;
  const ft=getMonthTheme(S.currentMonths.food.m);
  const rows=document.querySelectorAll('#legend-edit-rows .legend-edit-row');
  const tempLegend=[];
  rows.forEach((row,i)=>{
    const label=(row.querySelector('.legend-edit-label')||{}).value||'';
    const minV=parseInt((row.querySelector('.legend-edit-min')||{}).value)||0;
    const maxRaw=(row.querySelector('.legend-edit-max')||{}).value;
    const maxV=maxRaw===''?99999999:(parseInt(maxRaw)||99999999);
    const typeEl=row.querySelector('.legend-edit-type');
    const type=typeEl?typeEl.value:'none';
    const bg=(row.querySelector('.legend-edit-bg')||{}).value||'#ffffff';
    const color=(row.querySelector('.legend-edit-color')||{}).value||'#333333';
    tempLegend.push({min:minV,max:maxV,type,label,bg,color});
  });
  if(!tempLegend.length){previewEl.innerHTML='';return;}

  const items=tempLegend.map(tier=>{
    let swatch='';
    if(tier.type==='none'){
      swatch=`<span class="cal-legend-swatch" style="background:white;border:1.5px solid #DDD;"></span>`;
    } else if(tier.type==='theme-ultralight'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.t1}22;border:1.5px solid ${ft.t1}44;"></span>`;
    } else if(tier.type==='theme-light'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.bg};border:1.5px solid ${ft.border};"></span>`;
    } else if(tier.type==='theme-mid'){
      swatch=`<span class="cal-legend-swatch" style="background:${ft.mid||ft.bg};border:1.5px solid ${ft.border};"></span>`;
    } else {
      swatch=`<span class="cal-legend-swatch" style="background:${tier.bg};border:1.5px solid ${tier.color};"></span>`;
    }
    return `<span class="cal-legend-item">${swatch}<span class="cal-legend-label">${tier.label||'—'}</span></span>`;
  }).join('');
  previewEl.innerHTML=`<div class="cal-legend-bar" style="flex-wrap:wrap;gap:6px;">${items}</div>`;
}

// 범례 설정 저장
function saveLegendSettings(){
  const rows=document.querySelectorAll('#legend-edit-rows .legend-edit-row');
  const newLegend=[];
  rows.forEach(row=>{
    const labelEl=row.querySelector('.legend-edit-label');
    const minEl=row.querySelector('.legend-edit-min');
    const maxEl=row.querySelector('.legend-edit-max');
    const typeEl=row.querySelector('.legend-edit-type');
    const bgEl=row.querySelector('.legend-edit-bg');
    const colorEl=row.querySelector('.legend-edit-color');
    const label=(labelEl?labelEl.value:'')||'구간';
    const min=parseInt(minEl?minEl.value:0)||0;
    const maxRaw=maxEl?maxEl.value:'';
    const max=maxRaw===''?99999999:(parseInt(maxRaw)||99999999);
    const t=typeEl?typeEl.value:'none';
    const bg=bgEl?bgEl.value:'#ffffff';
    const color=colorEl?colorEl.value:'#333333';
    const tier={label,min,max,type:t};
    if(t==='custom'){tier.bg=bg;tier.color=color;}
    newLegend.push(tier);
  });
  // 최소 금액 기준 정렬
  newLegend.sort((a,b)=>a.min-b.min);
  S.calAmountLegend=newLegend;
  saveState();
  closeModal();
  renderFood();
}

function toggleFoodPanel(d){
  const cm=S.currentMonths.food;
  if(currentFoodPanel===d){
    // Same day → close
    currentFoodPanel=null;
    const panel=document.getElementById('food-inline-panel');
    if(panel)panel.remove();
    // Update cell highlight
    renderFood();
    return;
  }
  currentFoodPanel=d;
  renderFood(); // re-render to highlight correct cell, then panel renders inside
}

function renderFoodPanel(d){
  const cm=S.currentMonths.food;
  const key=mkey(cm.y,cm.m);
  // Remove existing panel
  const existing=document.getElementById('food-inline-panel');
  if(existing)existing.remove();

  const panel=document.createElement('div');
  panel.id='food-inline-panel';
  panel.className='food-inline-panel';

  if(S.calSpendMode){
    // 소비모드: 지출 목록 표시
    const ledgerEntries=(S.ledger[key]||[]).filter(e=>e.type==='expense');
    const activeAutos=(S.automations||[]).filter(a=>{
      if(!a.active||a.type!=='expense')return false;
      const startY=a.startYear||cm.y;const startM=a.startMonth||1;
      return !(cm.y<startY||(cm.y===startY&&cm.m<startM));
    });
    const dateStr=`${cm.y}-${String(cm.m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayEntries=ledgerEntries.filter(e=>e.date===dateStr);
    const dayAutos=activeAutos.filter(a=>(a.billingDay||1)===d);
    const total=dayEntries.reduce((s,e)=>s+(Number(e.amount)||0),0)
      +dayAutos.reduce((s,a)=>s+(Number(a.amount)||0),0);
    const cats=S.ledgerCategories||[];
    const getCat=name=>cats.find(c=>c.name===name)||{strip:'#A29BFE',bg:'#F0EBFF',color:'#6C5CE7'};
    const autoRows=dayAutos.map(a=>`
      <div class="food-spend-row food-spend-auto">
        <div class="food-spend-row-left"><span class="food-spend-auto-badge">자동</span><span class="food-spend-memo">💸 ${a.memo||a.name||'자동화'}</span></div>
        <div class="food-spend-amt">₩${(Number(a.amount)||0).toLocaleString('ko-KR')}</div>
      </div>`).join('');
    const entryRows=dayEntries.map(e=>{
      const cc=getCat(e.category);
      return `<div class="food-spend-row" style="--cat-strip:${cc.strip};">
        <div class="food-spend-row-left"><span class="food-spend-cat-icon badge-svg-icon" style="color:${cc.strip};flex-shrink:0;">${_getCatSVG(e.category)}</span><span class="food-spend-memo">${e.category||''} ${e.memo?`· ${e.memo}`:''}</span></div>
        <div class="food-spend-amt">₩${(Number(e.amount)||0).toLocaleString('ko-KR')}</div>
      </div>`;}).join('');
    const emptyMsg=(autoRows||entryRows)?'':`<div class="food-spend-empty">이날 지출 내역이 없어요</div>`;
    panel.innerHTML=`
      <div class="food-panel-header">
        <span>🗒 ${cm.y}년 ${cm.m}월 ${d}일 지출 내역</span>
        <button class="food-panel-close" onclick="App.closeFoodPanel()">✕ 닫기</button>
      </div>
      <div class="food-spend-list">
        ${autoRows}${entryRows}${emptyMsg}
        ${total>0?`<div class="food-spend-total"><span>합계</span><span class="food-spend-total-amt">₩${total.toLocaleString('ko-KR')}</span></div>`:''}
      </div>`;
  } else {
    // 식비모드: 입력 필드 표시
    const dd=(S.foodCalendar[key]||{})[d]||{};
    panel.innerHTML=`
      <div class="food-panel-header">
        <span>🍱 ${cm.y}년 ${cm.m}월 ${d}일 기록</span>
        <button class="food-panel-close" onclick="App.closeFoodPanel()">✕ 닫기</button>
      </div>
      <div class="food-panel-fields">
        <div class="food-panel-field">
          <label>📌 특별 일정</label>
          <div class="food-panel-input-row">
            <input type="text" id="fp-special" class="form-input" value="${(dd.special||'').replace(/"/g,'&quot;')}" placeholder="연차, 생일파티..."
              onkeydown="if(event.key==='Enter')App.saveFoodField(${d},'special')"/>
            <button class="food-save-field-btn" onclick="App.saveFoodField(${d},'special')">저장</button>
          </div>
          <div class="food-field-feedback" id="fp-special-feedback"></div>
        </div>
        <div class="food-panel-field">
          <label>🍽️ 식사 메모</label>
          <div class="food-panel-input-row">
            <input type="text" id="fp-memo" class="form-input" value="${(dd.memo||'').replace(/"/g,'&quot;')}" placeholder="배달, 된장찌개..."
              onkeydown="if(event.key==='Enter')App.saveFoodField(${d},'memo')"/>
            <button class="food-save-field-btn" onclick="App.saveFoodField(${d},'memo')">저장</button>
          </div>
          <div class="food-field-feedback" id="fp-memo-feedback"></div>
        </div>
        <div class="food-panel-field">
          <label>💰 식비 금액 (원)</label>
          <div class="food-panel-input-row">
            <input type="text" inputmode="numeric" id="fp-amount" class="form-input" value="${dd.amount?(dd.amount).toLocaleString('ko-KR'):''}" placeholder="15,000"
              oninput="App.numInputFmt(this)"
              onkeydown="if(event.key==='Enter')App.saveFoodField(${d},'amount')"/>
            <button class="food-save-field-btn" onclick="App.saveFoodField(${d},'amount')">저장</button>
          </div>
          <div class="food-field-feedback" id="fp-amount-feedback"></div>
        </div>
      </div>`;
  }

  const foodCal=document.getElementById('food-calendar');
  if(foodCal)foodCal.insertAdjacentElement('afterend',panel);
  setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}),50);
}

function closeFoodPanel(){
  currentFoodPanel=null;
  const panel=document.getElementById('food-inline-panel');
  if(panel)panel.remove();
  renderFood();
}

function saveFoodField(d,field){
  const cm=S.currentMonths.food;
  const key=mkey(cm.y,cm.m);
  if(!S.foodCalendar[key])S.foodCalendar[key]={};
  if(!S.foodCalendar[key][d])S.foodCalendar[key][d]={};
  let value;
  if(field==='amount'){
    value=numInputParse(document.getElementById('fp-amount').value);
  } else {
    value=(document.getElementById('fp-'+field).value||'').trim();
  }
  S.foodCalendar[key][d][field]=value;
  saveState();

  // Green border feedback (update in-place without closing)
  const input=document.getElementById('fp-'+field);
  const feedback=document.getElementById('fp-'+field+'-feedback');
  if(input){
    const orig=input.style.borderColor;
    input.style.borderColor='var(--green)';
    setTimeout(()=>input.style.borderColor=orig,1800);
  }
  if(feedback){
    feedback.textContent='✓ 저장됨';
    feedback.style.color='var(--green)';
    setTimeout(()=>{feedback.textContent='';},1800);
  }

  // Update food total display only (not full re-render, to preserve panel)
  const foodTotal=getFoodTotal(cm.y,cm.m);
  const ftEl=document.getElementById('food-total-display');
  if(ftEl)ftEl.textContent=fmt(foodTotal);
  const frEl=document.getElementById('food-reflect-amount');
  if(frEl)frEl.textContent=fmt(foodTotal);

  // Update the day cell display
  const dayCells=document.querySelectorAll('.food-day:not(.empty)');
  const dayIdx=d-1; // cells start at 0 but there may be leading empty cells
  // Find by data-day or by scanning
  document.querySelectorAll('#food-calendar .food-day:not(.empty)').forEach((cell,i)=>{
    const num=cell.querySelector('.food-day-num');
    if(num&&parseInt(num.textContent)===d){
      const days=S.foodCalendar[key]||{};
      const dd2=days[d]||{};
      // Compute active autos for this day to preserve badges
      const activeAutos=(S.automations||[]).filter(a=>{
        if(!a.active||a.type!=='expense')return false;
        const startY=a.startYear||cm.y;const startM=a.startMonth||1;
        return !(cm.y<startY||(cm.y===startY&&cm.m<startM));
      });
      const dayAutos=activeAutos.filter(a=>(a.billingDay||1)===d);
      const autosDot2=dayAutos.length>0
        ?`<span class="food-auto-dot-wrap"><span class="food-auto-dot">●</span><span class="food-auto-dot-tip">${dayAutos.map(a=>a.memo||a.name||'자동화').join(' · ')}</span></span>`
        :'';
      const dowClass=num.classList.contains('sat')?'sat':num.classList.contains('sun')?'sun':'';
      cell.innerHTML=`
        <div class="food-day-header-row">
          <div class="food-day-num ${dowClass}">${d}</div>
          ${autosDot2}
        </div>
        ${dd2.special?`<div class="food-special-tag">${dd2.special}</div>`:''}
        ${dd2.memo?`<div class="food-memo">${dd2.memo}</div>`:''}
        ${dd2.amount?`<div class="food-amount">${Number(dd2.amount).toLocaleString('ko-KR')}</div>`:''}`;
    }
  });
  // Update calendar total footer
  const footer=document.querySelector('.food-calendar > div:last-child');
  if(footer&&footer.style.background)footer.textContent='총 '+fmt(foodTotal);

  // Update dashboard/income if open
  renderDashboard();renderIncome();
}

// ===== INSTALLMENT =====
function renderInstallment(){
  const opts=S.cardSettings.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('inst-card').innerHTML=opts;
  document.getElementById('mc-card').innerHTML=opts;
  renderCardSettings();calcInstallment();
}

function calcInstallment(){
  const principal=parseFloat(document.getElementById('inst-principal').value)||0;
  const months=parseInt(document.getElementById('inst-months').value)||0;
  const days=parseFloat(document.getElementById('inst-days').value)||30;
  const cardId=parseInt(document.getElementById('inst-card').value);
  const manualRateInput=document.getElementById('inst-rate').value;
  const manualRate=manualRateInput?parseFloat(manualRateInput):NaN;
  let rate=isNaN(manualRate)?getCardRate(cardId,months):manualRate;
  if(!manualRateInput)document.getElementById('inst-rate').placeholder=rate>0?`자동: ${rate}% (연)`:'수수료율이 자동 적용됩니다';
  const totalInterest=principal*(rate/100)*days/365;
  const monthlyPrincipal=months>0?Math.ceil(principal/months):0;
  const monthlyTotal=months>0?Math.ceil((principal+totalInterest)/months):0;
  document.getElementById('res-principal').textContent=fmt(principal);
  document.getElementById('res-interest').textContent=fmt(totalInterest);
  document.getElementById('res-monthly-principal').textContent=fmt(monthlyPrincipal);
  document.getElementById('res-monthly-total').textContent=fmt(monthlyTotal);
  document.getElementById('res-total').textContent=fmt(principal+totalInterest);
}

function renderCardSettings(){
  document.getElementById('card-settings-list').innerHTML=S.cardSettings.map(card=>`
    <div class="card-setting-item">
      <div class="card-setting-header">
        <input class="card-setting-name-input" type="text" value="${card.name}" onchange="App.updateCardName(${card.id},this.value)"/>
        <button class="card-setting-delete" onclick="App.deleteCardSetting(${card.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
      </div>
      <table class="rate-table">
        <thead><tr><th>최소</th><th>최대</th><th>연이율 (%)</th><th></th></tr></thead>
        <tbody>
          ${card.rates.map(r=>`
            <tr>
              <td><input class="rate-input" type="number" value="${r.minMonths}" onchange="App.updateRate(${card.id},${r.id},'minMonths',this.value)"/></td>
              <td><input class="rate-input" type="number" value="${r.maxMonths}" onchange="App.updateRate(${card.id},${r.id},'maxMonths',this.value)"/></td>
              <td><input class="rate-input" type="number" step="0.1" value="${r.rate}" onchange="App.updateRate(${card.id},${r.id},'rate',this.value)"/></td>
              <td><button class="icon-btn" onclick="App.deleteRate(${card.id},${r.id})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <button class="add-rate-btn" onclick="App.addRate(${card.id})">+ 구간 추가</button>
    </div>`).join('');
}

// ===== MODAL SYSTEM =====
function openModal(type){
  document.getElementById('modal-overlay').classList.add('active');
  document.querySelectorAll('.modal').forEach(m=>m.classList.remove('active'));
  const modal=document.getElementById('modal-'+type);
  if(modal)modal.classList.add('active');
  if(type==='credit'){
    const cm=S.currentMonths.credit;
    document.getElementById('mc-start-year').value=cm.y;
    document.getElementById('mc-start-month').value=cm.m;
  }
}

function openIncomeModal(){
  document.getElementById('modal-income-id').value='';
  document.getElementById('mi-name').value='';
  document.getElementById('mi-cat').value='';
  document.getElementById('mi-amount').value='';
  document.getElementById('modal-income-edit-label').textContent='추가';
  openModal('income');
}

function openFixedModal(){
  document.getElementById('modal-fixed-id').value='';
  document.getElementById('mf-name').value='';
  document.getElementById('mf-cat').value='';
  document.getElementById('mf-amount').value='';
  const cb=document.getElementById('mf-is-savings');if(cb)cb.checked=false;
  document.getElementById('modal-fixed-edit-label').textContent='추가';
  openModal('fixed');
}

function openStockModal(){
  document.getElementById('modal-stock-id').value='';
  document.getElementById('ms-name').value='';
  document.getElementById('ms-ticker').value='';
  document.getElementById('ms-sector').value='';
  document.getElementById('ms-buy').value='';
  document.getElementById('ms-current').value='';
  document.getElementById('ms-qty').value='1';
  document.getElementById('ms-buy-amount').value='';
  document.getElementById('ms-current-amount').value='';
  const tmEl=document.getElementById('ms-ticker-manual');if(tmEl)tmEl.value='';
  const smEl=document.getElementById('ms-sector-manual');if(smEl)smEl.value='';
  // Default to domestic
  const radios=document.querySelectorAll('input[name="ms-type"]');
  radios.forEach(r=>{r.checked=(r.value==='domestic');});
  onStockTypeChange('domestic');
  document.getElementById('modal-stock-edit-label').textContent='추가';
  openModal('stock');
}

function closeModal(){
  const ov=document.getElementById('modal-overlay');
  ov.classList.remove('active');
  ov.style.display='';
  ov.innerHTML='';
  document.querySelectorAll('.modal').forEach(m=>m.classList.remove('active'));
}

// ===== CRUD =====
function saveIncome(){
  const cm=S.currentMonths.income;
  const data=getMonthData(cm.y,cm.m);
  const id=document.getElementById('modal-income-id').value;
  const name=document.getElementById('mi-name').value.trim();
  const category=document.getElementById('mi-cat').value.trim()||'기타';
  const amount=numInputParse(document.getElementById('mi-amount').value);
  if(!name)return alert('항목명을 입력해주세요');
  if(id){const i=data.income.find(i=>i.id==id);if(i){i.name=name;i.category=category;i.amount=amount;}}
  else data.income.push({id:genId(),name,category,amount});
  saveState();closeModal();renderIncome();renderDashboard();
}

function saveFixed(){
  const cm=S.currentMonths.income;
  const data=getMonthData(cm.y,cm.m);
  const id=document.getElementById('modal-fixed-id').value;
  const name=document.getElementById('mf-name').value.trim();
  const category=document.getElementById('mf-cat').value.trim()||'기타';
  const amount=numInputParse(document.getElementById('mf-amount').value);
  if(!name)return alert('항목명을 입력해주세요');
  if(id){const i=data.fixed.find(i=>i.id==id);if(i){i.name=name;i.category=category;i.amount=amount;}}
  else data.fixed.push({id:genId(),name,category,amount});
  saveState();closeModal();renderIncome();renderDashboard();
}

function openVariableModal(){
  document.getElementById('modal-variable-id').value='';
  document.getElementById('mv-name').value='';
  document.getElementById('mv-cat').value='';
  document.getElementById('mv-amount').value='';
  document.getElementById('modal-variable-edit-label').textContent='추가';
  openModal('variable');
}

function saveVariable(){
  const cm=S.currentMonths.income;const data=getMonthData(cm.y,cm.m);
  const id=document.getElementById('modal-variable-id').value;
  const name=document.getElementById('mv-name').value.trim();
  const category=document.getElementById('mv-cat').value.trim()||'기타';
  const amount=numInputParse(document.getElementById('mv-amount').value);
  if(!name)return alert('항목명을 입력해주세요');
  if(id){const i=data.variable.find(i=>i.id==id);if(i){i.name=name;i.category=category;i.amount=amount;}}
  else data.variable.push({id:genId(),name,category,amount});
  saveState();closeModal();renderIncome();renderDashboard();
}

function _addCreditAutoEntries(card){
  const monthly=Math.ceil(card.amount/card.months);
  for(let i=0;i<card.months;i++){
    let mm=card.startMonth+i,yy=card.startYear;
    while(mm>12){mm-=12;yy++;}
    const pk=mkey(yy,mm);
    const day=Math.min(card.startDay||1,28);
    const dateStr=yy+'-'+String(mm).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    const autoId='credit_'+card.id+'_'+pk;
    if(!S.ledger[pk])S.ledger[pk]=[];
    S.ledger[pk].push({
      id:genId(),creditAutoId:autoId,
      date:dateStr,type:'expense',category:'신용카드',
      memo:card.card+' — '+card.item+(card.months>1?' ('+(i+1)+'/'+card.months+'회)':''),
      amount:monthly
    });
    const mdata=getMonthData(yy,mm);
    if(!mdata.variable)mdata.variable=[];
    mdata.variable=mdata.variable.filter(v=>v.creditAutoId!==autoId);
    mdata.variable.push({
      id:genId(),
      name:card.item+(card.months>1?' ('+(i+1)+'/'+card.months+'회)':''),
      category:'신용카드',amount:monthly,
      autoFromCredit:true,creditId:card.id,creditAutoId:autoId
    });
  }
}

function saveCredit(){
  const editId=parseInt(document.getElementById('mc-edit-id').value)||0;
  const cardSelId=document.getElementById('mc-card').value;
  const item=document.getElementById('mc-item').value.trim();
  const amount=numInputParse(document.getElementById('mc-amount').value);
  const months=parseInt(document.getElementById('mc-months').value)||1;
  const startYear=parseInt(document.getElementById('mc-start-year').value)||2026;
  const startMonth=parseInt(document.getElementById('mc-start-month').value)||1;
  const startDay=parseInt(document.getElementById('mc-start-day').value)||new Date().getDate();
  if(!item||amount<=0)return alert('항목명과 금액을 입력해주세요');
  const cardName=S.cardSettings.find(c=>c.id==cardSelId)?.name||'카드';
  if(editId){
    const existing=S.creditCards.find(c=>c.id==editId);
    if(!existing)return;
    for(const key of Object.keys(S.ledger)){
      S.ledger[key]=(S.ledger[key]||[]).filter(e=>!e.creditAutoId||!e.creditAutoId.startsWith('credit_'+editId+'_'));
    }
    for(const key of Object.keys(S.monthlyData)){
      if(S.monthlyData[key]&&S.monthlyData[key].variable){
        S.monthlyData[key].variable=S.monthlyData[key].variable.filter(v=>v.creditId!==editId);
      }
    }
    existing.card=cardName;existing.item=item;existing.amount=amount;
    existing.months=months;existing.startYear=startYear;existing.startMonth=startMonth;existing.startDay=startDay;
    existing.paidMonths=[];
    _addCreditAutoEntries(existing);
  } else {
    const creditId=genId();
    const newCard={id:creditId,card:cardName,item,amount,months,startYear,startMonth,startDay,paidMonths:[]};
    S.creditCards.push(newCard);
    _addCreditAutoEntries(newCard);
  }
  saveState();closeModal();renderCredit();renderIncome();renderDashboard();renderLedger();
}

function openCreditModal(){
  document.getElementById('mc-edit-id').value='';
  document.getElementById('mc-edit-label').textContent='추가';
  document.getElementById('mc-item').value='';
  document.getElementById('mc-amount').value='';
  document.getElementById('mc-months').value='';
  document.getElementById('mc-start-day').value='';
  const now=new Date();
  document.getElementById('mc-start-year').value=now.getFullYear();
  document.getElementById('mc-start-month').value=now.getMonth()+1;
  openModal('credit');
}

function editCredit(id){
  const card=S.creditCards.find(c=>c.id==id);if(!card)return;
  document.getElementById('mc-edit-id').value=id;
  document.getElementById('mc-edit-label').textContent='수정';
  const cardSetting=S.cardSettings.find(c=>c.name===card.card);
  document.getElementById('mc-item').value=card.item;
  document.getElementById('mc-amount').value=(card.amount||0).toLocaleString('ko-KR');
  document.getElementById('mc-months').value=card.months;
  document.getElementById('mc-start-year').value=card.startYear;
  document.getElementById('mc-start-month').value=card.startMonth;
  document.getElementById('mc-start-day').value=card.startDay||1;
  openModal('credit');
  if(cardSetting){const sel=document.getElementById('mc-card');if(sel)sel.value=cardSetting.id;}
}

function populateAssetCategorySelect(selectedCat){
  const sel=document.getElementById('ma-category');if(!sel)return;
  const cats=S.assetCategories||['계좌','적금','주식'];
  sel.innerHTML=cats.map(c=>`<option value="${c}" ${c===selectedCat?'selected':''}>${c}</option>`).join('');
}

function openAssetModal(){
  document.getElementById('modal-asset-id').value='';
  document.getElementById('ma-name').value='';
  document.getElementById('ma-amount').value='';
  document.getElementById('modal-asset-edit-label').textContent='추가';
  populateAssetCategorySelect('계좌');
  openModal('asset');
}

function promptAddAssetCategory(){
  const name=prompt('새 분류 이름을 입력하세요:');
  if(!name||!name.trim())return;
  const trimmed=name.trim();
  if(!S.assetCategories)S.assetCategories=['계좌','적금','주식'];
  if(!S.assetCategories.includes(trimmed))S.assetCategories.push(trimmed);
  saveState();populateAssetCategorySelect(trimmed);
}

function saveAsset(){
  const id=document.getElementById('modal-asset-id').value;
  const name=document.getElementById('ma-name').value.trim();
  const amount=numInputParse(document.getElementById('ma-amount').value);
  const catEl=document.getElementById('ma-category');
  const category=catEl?catEl.value:'계좌';
  if(!name)return alert('자산명을 입력해주세요');
  if(id){const a=S.assets.find(a=>a.id==id);if(a){a.name=name;a.amount=amount;a.category=category;}}
  else S.assets.push({id:genId(),name,amount,category});
  saveState();closeModal();renderAssets();renderDashboard();
  syncFundCalcToAssets();
}

function getStockTypeFromModal(){
  const radios=document.querySelectorAll('input[name="ms-type"]');
  for(const r of radios){if(r.checked)return r.value;}
  return 'domestic';
}
function onStockTypeChange(val){
  const isDomestic=val==='domestic';
  const isManual=val==='foreign'||val==='gold';
  document.getElementById('ms-domestic-fields').style.display=isDomestic?'':'none';
  document.getElementById('ms-manual-fields').style.display=isManual?'':'none';
}
function saveStock(){
  const id=document.getElementById('modal-stock-id').value;
  const name=document.getElementById('ms-name').value.trim();
  const ticker=document.getElementById('ms-ticker').value.trim();
  const sector=document.getElementById('ms-sector').value.trim();
  const stockType=getStockTypeFromModal();
  if(!name)return alert('종목명을 입력해주세요');
  let stObj;
  if(stockType==='domestic'){
    const buyPrice=numInputParse(document.getElementById('ms-buy').value);
    const currentPrice=numInputParse(document.getElementById('ms-current').value)||buyPrice;
    const quantity=parseFloat(document.getElementById('ms-qty').value)||1;
    stObj={name,ticker,sector,stockType,buyPrice,currentPrice,quantity};
  } else {
    const buyAmount=numInputParse(document.getElementById('ms-buy-amount').value);
    const currentAmount=numInputParse(document.getElementById('ms-current-amount').value)||buyAmount;
    stObj={name,ticker:stockType==='gold'?'금현물':ticker,sector,stockType,buyAmount,currentAmount,buyPrice:0,currentPrice:0,quantity:1};
  }
  if(id){const st=S.stocks.find(s=>s.id==id);if(st)Object.assign(st,stObj);}
  else S.stocks.push({id:genId(),...stObj});
  syncStockAsset();
  saveState();closeModal();renderAssetStocks();renderAssets();renderDashboard();
}

function editItem(type,id){
  if(type==='income'){
    const cm=S.currentMonths.income;const i=getMonthData(cm.y,cm.m).income.find(i=>i.id==id);if(!i)return;
    document.getElementById('modal-income-id').value=id;
    document.getElementById('mi-name').value=i.name;
    document.getElementById('mi-cat').value=i.category;
    document.getElementById('mi-amount').value=(i.amount||0).toLocaleString('ko-KR');
    document.getElementById('modal-income-edit-label').textContent='수정';
    openModal('income');
  } else if(type==='fixed'){
    const cm=S.currentMonths.income;const i=getMonthData(cm.y,cm.m).fixed.find(i=>i.id==id);if(!i)return;
    document.getElementById('modal-fixed-id').value=id;
    document.getElementById('mf-name').value=i.name;
    document.getElementById('mf-cat').value=i.category;
    document.getElementById('mf-amount').value=(i.amount||0).toLocaleString('ko-KR');
    document.getElementById('modal-fixed-edit-label').textContent='수정';
    openModal('fixed');
  } else if(type==='variable'){
    const cm=S.currentMonths.income;
    const item=getMonthData(cm.y,cm.m).variable.find(i=>i.id==id);
    if(!item)return;
    document.getElementById('modal-variable-id').value=id;
    document.getElementById('mv-name').value=item.name;
    document.getElementById('mv-cat').value=item.category;
    document.getElementById('mv-amount').value=(item.amount||0).toLocaleString('ko-KR');
    document.getElementById('modal-variable-edit-label').textContent='수정';
    openModal('variable');
  } else if(type==='asset'){
    const a=S.assets.find(a=>a.id==id);if(!a)return;
    document.getElementById('modal-asset-id').value=id;
    document.getElementById('ma-name').value=a.name;
    document.getElementById('ma-amount').value=(a.amount||0).toLocaleString('ko-KR');
    document.getElementById('modal-asset-edit-label').textContent='수정';
    populateAssetCategorySelect(a.category||'계좌');
    openModal('asset');
  } else if(type==='stock'){
    const st=S.stocks.find(s=>s.id==id);if(!st)return;
    document.getElementById('modal-stock-id').value=id;
    document.getElementById('ms-name').value=st.name;
    document.getElementById('ms-ticker').value=st.ticker==='금현물'?'':st.ticker;
    document.getElementById('ms-sector').value=st.sector||'';
    // Set stockType radio
    const t=st.stockType||'domestic';
    const radios=document.querySelectorAll('input[name="ms-type"]');
    radios.forEach(r=>{r.checked=(r.value===t);});
    onStockTypeChange(t);
    if(t==='domestic'){
      document.getElementById('ms-buy').value=st.buyPrice?(st.buyPrice).toLocaleString('ko-KR'):'';
      document.getElementById('ms-current').value=st.currentPrice?(st.currentPrice).toLocaleString('ko-KR'):'';
      document.getElementById('ms-qty').value=st.quantity||1;
    } else {
      document.getElementById('ms-buy-amount').value=st.buyAmount?(st.buyAmount).toLocaleString('ko-KR'):'';
      document.getElementById('ms-current-amount').value=st.currentAmount?(st.currentAmount).toLocaleString('ko-KR'):'';
      const tmEl=document.getElementById('ms-ticker-manual');
      const smEl=document.getElementById('ms-sector-manual');
      const tickerVal=st.ticker==='금현물'?'':st.ticker;
      if(tmEl)tmEl.value=tickerVal;
      if(smEl)smEl.value=st.sector||'';
    }
    document.getElementById('modal-stock-edit-label').textContent='수정';
    openModal('stock');
  }
}

function deleteItem(type,id){
  if(!confirm('삭제하시겠어요?'))return;
  if(type==='income'){const cm=S.currentMonths.income;getMonthData(cm.y,cm.m).income=getMonthData(cm.y,cm.m).income.filter(i=>i.id!=id);}
  else if(type==='fixed'){const cm=S.currentMonths.income;getMonthData(cm.y,cm.m).fixed=getMonthData(cm.y,cm.m).fixed.filter(i=>i.id!=id);}
  else if(type==='variable'){const cm=S.currentMonths.income;getMonthData(cm.y,cm.m).variable=getMonthData(cm.y,cm.m).variable.filter(i=>i.id!=id);}
  else if(type==='asset'){S.assets=S.assets.filter(a=>a.id!=id);if(S.fundCalc&&S.fundCalc.assetLinked){S.fundCalc.amount=getTotalAssets();S.fundCalc.assetLinkedAt=Date.now();}}
  else if(type==='stock'){S.stocks=S.stocks.filter(s=>s.id!=id);syncStockAsset();}
  saveState();renderAll();
}

function updateAssetAmount(id,val){const a=S.assets.find(a=>a.id==id);if(a)a.amount=numInputParse(val);saveState();renderAssets();renderDashboard();syncFundCalcToAssets();}
function updateStockPrice(id,val){const st=S.stocks.find(s=>s.id==id);if(st)st.currentPrice=numInputParse(val);syncStockAsset();saveState();renderAssetStocks();renderDashboard();}
function updateStockBuyAmount(id,val){const st=S.stocks.find(s=>s.id==id);if(st)st.buyAmount=numInputParse(val);syncStockAsset();saveState();renderAssetStocks();renderDashboard();}
function updateStockCurrentAmount(id,val){const st=S.stocks.find(s=>s.id==id);if(st)st.currentAmount=numInputParse(val);syncStockAsset();saveState();renderAssetStocks();renderDashboard();}

function deleteCredit(id){
  if(!confirm('삭제하시겠어요?'))return;
  const card=S.creditCards.find(c=>c.id==id);
  if(card){
    for(const key of Object.keys(S.ledger)){
      S.ledger[key]=(S.ledger[key]||[]).filter(e=>!e.creditAutoId||!e.creditAutoId.startsWith('credit_'+id+'_'));
    }
    for(const key of Object.keys(S.monthlyData)){
      if(S.monthlyData[key]&&S.monthlyData[key].variable){
        S.monthlyData[key].variable=S.monthlyData[key].variable.filter(v=>v.creditId!==id);
      }
    }
  }
  S.creditCards=S.creditCards.filter(c=>c.id!=id);
  saveState();renderCredit();renderIncome();renderDashboard();renderLedger();
}

function markAllCreditPaidThisMonth(){
  const cm=S.currentMonths.credit;
  const key=mkey(cm.y,cm.m);
  const dueCards=S.creditCards.filter(c=>isCardDueInMonth(c,cm.y,cm.m));
  if(dueCards.length===0)return;
  const allPaid=dueCards.every(c=>(c.paidMonths||[]).includes(key));
  dueCards.forEach(card=>{
    if(!card.paidMonths)card.paidMonths=[];
    if(!allPaid){
      if(!card.paidMonths.includes(key))card.paidMonths.push(key);
    } else {
      card.paidMonths=card.paidMonths.filter(m=>m!==key);
    }
  });
  saveState();renderCredit();renderIncome();renderDashboard();renderLedger();
}

function toggleCreditPaid(cardId,pk,checked){
  const card=S.creditCards.find(c=>c.id==cardId);if(!card)return;
  if(!card.paidMonths)card.paidMonths=[];
  if(checked&&!card.paidMonths.includes(pk)){
    card.paidMonths.push(pk);
  } else if(!checked){
    card.paidMonths=card.paidMonths.filter(m=>m!==pk);
  }
  saveState();renderCredit();renderIncome();renderDashboard();renderLedger();
}

// ===== CALENDAR =====
function openCalModal(y,m){
  document.getElementById('modal-cal-month').value=y+'-'+m;
  document.getElementById('modal-cal-id').value='';
  document.getElementById('modal-cal-month-label').textContent=y+'년 '+m+'월';
  document.getElementById('mc-event-name').value='';
  document.getElementById('mc-event-amount').value='';
  document.getElementById('mc-event-saved').value='';
  const planChk=document.getElementById('mc-is-plan');if(planChk)planChk.checked=false;
  // 식비 예산 힌트 표시
  const hint=document.getElementById('cal-food-hint');
  if(hint){
    const fb=getFoodBudgetAmount(y,m);
    if(fb>0){
      hint.style.display='block';
      hint.innerHTML='🍽️ '+y+'년 '+m+'월 식비 예산: <strong>'+fmt(fb)+'</strong>';
    } else {hint.style.display='none';}
  }
  openModal('cal');
}

function saveCalEvent(){
  const monthVal=document.getElementById('modal-cal-month').value;
  const[y,m]=monthVal.split('-').map(Number);
  const name=document.getElementById('mc-event-name').value.trim();
  const amount=numInputParse(document.getElementById('mc-event-amount').value);
  const savedAmt=numInputParse(document.getElementById('mc-event-saved').value);
  const isPlan=!!(document.getElementById('mc-is-plan')||{}).checked;
  if(!name)return alert('내용을 입력해주세요');
  if(!S.consumptionCalendar[y])S.consumptionCalendar[y]={};
  if(!S.consumptionCalendar[y][m])S.consumptionCalendar[y][m]=[];
  const editId=document.getElementById('modal-cal-id').value;
  if(editId){
    const ev=S.consumptionCalendar[y][m].find(e=>String(e.id)===String(editId));
    if(ev){ev.name=name;ev.amount=amount;ev.savedAmt=savedAmt;ev.isPlan=isPlan;}
  } else {
    S.consumptionCalendar[y][m].push({id:genId(),name,amount,savedAmt,isPlan});
  }
  saveState();closeModal();setTimeout(renderCalendar,0);
}

function deleteCalEvent(y,m,id){
  if(S.consumptionCalendar[y]&&S.consumptionCalendar[y][m])
    S.consumptionCalendar[y][m]=S.consumptionCalendar[y][m].filter(e=>e.id!=id);
  saveState();renderCalendar();
}

function editCalEvent(y,m,id){
  const ev=((S.consumptionCalendar[y]||{})[m]||[]).find(e=>String(e.id)===String(id));
  if(!ev)return;
  document.getElementById('modal-cal-month').value=y+'-'+m;
  document.getElementById('modal-cal-id').value=id;
  document.getElementById('modal-cal-month-label').textContent=y+'년 '+m+'월';
  document.getElementById('mc-event-name').value=ev.name||'';
  document.getElementById('mc-event-amount').value=ev.amount?(ev.amount).toLocaleString('ko-KR'):'';
  document.getElementById('mc-event-saved').value=ev.savedAmt?(ev.savedAmt).toLocaleString('ko-KR'):'';
  const planChk=document.getElementById('mc-is-plan');if(planChk)planChk.checked=!!ev.isPlan;
  const hint=document.getElementById('cal-food-hint');
  if(hint)hint.style.display='none';
  openModal('cal');
}

// Savings Goals
function openSavingsModal(){
  document.getElementById('modal-savings-id').value='';
  document.getElementById('msg-name').value='';
  document.getElementById('msg-target').value='';
  document.getElementById('msg-saved').value='';
  document.getElementById('msg-color').value='#A29BFE';
  document.querySelectorAll('.color-swatch').forEach(b=>b.classList.remove('active'));
  const first=document.querySelector('.color-swatch[data-color="#A29BFE"]');if(first)first.classList.add('active');
  openModal('savings');
}

function editSavingsGoal(id){
  const y=S.calYear;const g=(S.savingsGoals[y]||[]).find(g=>g.id==id);if(!g)return;
  document.getElementById('modal-savings-id').value=id;
  document.getElementById('msg-name').value=g.name;
  document.getElementById('msg-target').value=(g.target||0).toLocaleString('ko-KR');
  document.getElementById('msg-saved').value=(g.saved||0).toLocaleString('ko-KR');
  document.getElementById('msg-color').value=g.color||'#A29BFE';
  document.querySelectorAll('.color-swatch').forEach(b=>b.classList.toggle('active',b.dataset.color===(g.color||'#A29BFE')));
  openModal('savings');
}

function saveSavingsGoal(){
  const y=S.calYear;const id=document.getElementById('modal-savings-id').value;
  const name=document.getElementById('msg-name').value.trim();
  const target=numInputParse(document.getElementById('msg-target').value);
  const saved=numInputParse(document.getElementById('msg-saved').value);
  const color=document.getElementById('msg-color').value||'#A29BFE';
  if(!name)return alert('목표명을 입력해주세요');
  if(!S.savingsGoals[y])S.savingsGoals[y]=[];
  if(id){const g=S.savingsGoals[y].find(g=>g.id==id);if(g){g.name=name;g.target=target;g.saved=saved;g.color=color;}}
  else S.savingsGoals[y].push({id:genId(),name,target,saved,color});
  saveState();closeModal();renderSavingsGoals();
}

function deleteSavingsGoal(id){
  const y=S.calYear;if(S.savingsGoals[y])S.savingsGoals[y]=S.savingsGoals[y].filter(g=>g.id!=id);
  saveState();renderSavingsGoals();
}

function updateSavedAmount(id,val){
  const y=S.calYear;const g=(S.savingsGoals[y]||[]).find(g=>g.id==id);
  if(g)g.saved=numInputParse(val);
  saveState();renderSavingsGoals();
}

function pickSavingsColor(color,btn){
  document.getElementById('msg-color').value=color;
  document.querySelectorAll('.color-swatch').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

// Food direct
function toggleFoodDirect(checked){
  const cm=S.currentMonths.food;const key=mkey(cm.y,cm.m);
  if(!S.foodDirectSet[key])S.foodDirectSet[key]={direct:false,amount:0};
  S.foodDirectSet[key].direct=!!checked;
  const wrap=document.getElementById('food-direct-input-wrap');if(wrap)wrap.style.display=checked?'block':'none';
  saveState();renderFood();renderIncome();renderDashboard();
}

function saveFoodDirect(val){
  const cm=S.currentMonths.food;const key=mkey(cm.y,cm.m);
  if(!S.foodDirectSet[key])S.foodDirectSet[key]={direct:true,amount:0};
  S.foodDirectSet[key].amount=numInputParse(val);
  saveState();renderFood();renderIncome();renderDashboard();
}

function saveThemeOpacity(val){
  S.themeOpacity=Math.max(0,Math.min(100,parseInt(val)||50));
  saveState();
  applyMonthTheme(S.currentMonths.dashboard.m);
  renderFood();
  // 설정 탭이 열려 있을 때 현재 값 텍스트 즉시 반영
  const span=document.getElementById('opacity-val-span');
  if(span)span.textContent=S.themeOpacity;
}

function toggleThemeOpacityLock(){
  S.themeOpacityLocked=!S.themeOpacityLocked;
  saveState();
  syncThemeSlider();
}

function syncThemeSlider(){
  const slider=document.getElementById('theme-opacity-slider');
  const lockBtn=document.getElementById('theme-lock-btn');
  const locked=!!S.themeOpacityLocked;
  if(slider){
    slider.value=S.themeOpacity!==undefined?S.themeOpacity:50;
    slider.disabled=locked;
    slider.style.opacity=locked?'0.45':'1';
    slider.style.cursor=locked?'not-allowed':'pointer';
  }
  if(lockBtn){
    lockBtn.textContent=locked?'🔒':'🔓';
    lockBtn.title=locked?'잠금 해제':'잠금';
  }
}

// Card settings
function toggleCardSettings(){
  const panel=document.getElementById('card-settings-panel');
  const arrow=document.getElementById('card-settings-arrow');
  const isHidden=panel.style.display==='none';
  panel.style.display=isHidden?'block':'none';
  if(arrow)arrow.textContent=isHidden?'∧':'∨';
}

function addCardSetting(){
  S.cardSettings.push({id:genId(),name:'새 카드',rates:[{id:genId(),minMonths:2,maxMonths:2,rate:5.9}]});
  saveState();renderCardSettings();
}

function deleteCardSetting(id){
  if(S.cardSettings.length<=1)return alert('최소 1개의 카드는 있어야 해요');
  S.cardSettings=S.cardSettings.filter(c=>c.id!==id);
  saveState();renderCardSettings();
}

function updateCardName(id,name){const c=S.cardSettings.find(c=>c.id==id);if(c)c.name=name;saveState();renderInstallment();}
function addRate(cardId){const c=S.cardSettings.find(c=>c.id==cardId);if(!c)return;c.rates.push({id:genId(),minMonths:2,maxMonths:2,rate:5.9});saveState();renderCardSettings();}
function deleteRate(cardId,rateId){const c=S.cardSettings.find(c=>c.id==cardId);if(!c)return;c.rates=c.rates.filter(r=>r.id!=rateId);saveState();renderCardSettings();}
function updateRate(cardId,rateId,field,val){const c=S.cardSettings.find(c=>c.id==cardId);if(!c)return;const r=c.rates.find(r=>r.id==rateId);if(!r)return;r[field]=parseFloat(val)||0;saveState();calcInstallment();}

// ===== SAVINGS RATE =====
function renderSavingsRate(){
  const cm=S.currentMonths.dashboard;
  const key=mkey(cm.y,cm.m);
  const entries=S.ledger[key]||[];

  // 가계부 기록 기준 수입
  const income=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);

  // 가계부 기록 기준 저축 (isSavings 카테고리 또는 #저축 태그)
  const savingsLcats=new Set((S.ledgerCategories||[]).filter(c=>c.isSavings).map(c=>c.name));
  const savings=entries.filter(e=>
    e.type==='expense'&&
    (savingsLcats.has(e.category)||(e.tags||[]).includes('저축'))
  ).reduce((s,e)=>s+e.amount,0);

  const rate=income>0?(savings/income*100):0;
  const pct=Math.max(0,Math.min(100,rate));
  const color=rate>=30?'#43C98A':rate>=15?'#FFB347':'#F06292';
  const pctEl=document.getElementById('dash-sr-pct');
  const detailEl=document.getElementById('dash-sr-detail');
  const fillEl=document.getElementById('dash-sr-fill');
  if(pctEl){pctEl.textContent=rate.toFixed(1)+'%';pctEl.style.color=color;}
  if(detailEl)detailEl.textContent='저축 '+fmt(savings)+' / 수입 '+fmt(income)+' (가계부 기준)';
  if(fillEl){fillEl.style.width=pct+'%';fillEl.style.background=color;}
}

// ===== LEDGER AUTOMATION (monthly auto-register) =====
function applyLedgerAutomations(y,m){
  const automations=(S.automations||[]).filter(a=>a.active!==false);
  if(automations.length===0)return;
  const key=mkey(y,m);
  if(!S.ledger[key])S.ledger[key]=[];
  const skipped=S.autoSkippedIds||[];

  const today=new Date();
  const todayY=today.getFullYear(),todayM=today.getMonth()+1,todayD=today.getDate();

  // 미래 달이면 아무것도 생성하지 않음
  if(y>todayY||(y===todayY&&m>todayM))return;

  // 중복 자동화 항목 제거 (같은 날짜+메모+금액인 auto 항목)
  const dupSeen=new Set();
  S.ledger[key]=S.ledger[key].filter(e=>{
    if(!e.autoLedgerId)return true;
    const sig=e.date+'|'+e.memo+'|'+e.amount;
    if(dupSeen.has(sig))return false;
    dupSeen.add(sig);
    return true;
  });

  let changed=false;
  automations.forEach(a=>{
    const startY=a.startYear||(a.startMonth?todayY:null)||todayY;
    const startM=a.startMonth||1;

    // 시작 달 이전이면 스킵
    if(y<startY||(y===startY&&m<startM))return;

    const day=Math.min(a.billingDay||1,28);

    // 현재 달인 경우, 결제일이 아직 안 지났으면 스킵
    if(y===todayY&&m===todayM&&todayD<day)return;

    const autoLedgerId='auto_'+a.id+'_'+key;
    const dateStr=y+'-'+String(m).padStart(2,'0')+'-'+String(day).padStart(2,'0');
    const memo=a.memo||a.name||'자동화';

    // 기존 항목 확인 (ID 또는 동일 날짜+메모+금액)
    const exists=S.ledger[key].some(e=>
      e.autoLedgerId===autoLedgerId||
      (e.autoLedgerId&&e.date===dateStr&&e.memo===memo&&e.amount===a.amount)
    );
    if(!exists&&!skipped.includes(autoLedgerId)){
      S.ledger[key].push({
        id:genId(),autoLedgerId,
        date:dateStr,type:a.type||'expense',
        category:a.category||'📦 기타',
        memo,tags:a.tags||[],amount:a.amount
      });
      changed=true;
    }
  });
  if(changed)saveState();
}

function _syncAutoModalCatSelect(selected){
  const cats=S.ledgerCategories||[];
  const makeOpts=(sel)=>cats.map(c=>`<option value="${c.name}" ${c.name===sel?'selected':''}>${c.name}</option>`).join('');
  const modal=document.getElementById('ma2-cat-sel');
  if(modal){
    modal.innerHTML=makeOpts(selected);
    if(selected&&!cats.some(c=>c.name===selected))modal.innerHTML=`<option value="${selected}" selected>${selected}</option>`+modal.innerHTML;
  }
  const inline=document.getElementById('la-cat-sel');
  if(inline){inline.innerHTML=makeOpts('');}
}

function addAutoInline(){
  const type=document.getElementById('la-type').value;
  const billingDay=parseInt(document.getElementById('la-day').value)||1;
  const today=new Date();
  const startYear=today.getFullYear();
  const startMonth=today.getMonth()+1;
  const category=(document.getElementById('la-cat-sel').value)||((S.ledgerCategories&&S.ledgerCategories[0])?S.ledgerCategories[0].name:'📦 기타');
  const rawMemo=(document.getElementById('la-memo').value||'').trim();
  const tags=extractTagsFromMemo(rawMemo);
  const memo=cleanMemoText(rawMemo);
  const amount=numInputParse(document.getElementById('la-amount').value);
  if(!billingDay||billingDay<1||billingDay>31)return alert('날짜(일)를 1~31 사이로 입력해주세요');
  if(!memo||amount<=0)return alert('메모와 금액을 입력해주세요');
  if(!S.automations)S.automations=[];
  S.automations.push({id:genId(),type,billingDay,startYear,startMonth,category,memo,tags,amount,name:memo,active:true});
  saveState();
  document.getElementById('la-day').value='';
  document.getElementById('la-memo').value='';
  document.getElementById('la-amount').value='';
  const cm=S.currentMonths.ledger;
  applyLedgerAutomations(cm.y,cm.m);
  renderAutoList();renderLedger();renderDashboard();renderIncome();
}

// ===== LEDGER =====
// categoryId 기반 카테고리명 조회 (이름 변경 시 자동 반영)
function _getCatNameById(e){
  if(e.categoryId&&S.ledgerCategories){
    const cat=(S.ledgerCategories||[]).find(c=>c.id===e.categoryId);
    if(cat)return cat.name;
  }
  return e.category||'';
}
function renderLedger(){
  const cm=S.currentMonths.ledger;
  applyLedgerAutomations(cm.y,cm.m);
  const lbl=document.getElementById('ledger-month-label');
  if(lbl)lbl.textContent=cm.y+'년 '+cm.m+'월';
  const key=mkey(cm.y,cm.m);
  const closed=S.closedMonths[key];
  const banner=document.getElementById('ledger-closed-banner');
  if(banner){
    if(closed){
      banner.style.display='flex';
      banner.innerHTML=`<span>📋 마감 완료 (${new Date(closed.closedAt).toLocaleDateString('ko-KR')} 마감)${closed.note?' — '+closed.note:''}</span>
        <button onclick="App.reopenMonth()">다시 열기</button>`;
    } else {banner.style.display='none';}
  }
  const entries=S.ledger[key]||[];
  const filter=S.ledgerFilter;
  const tagFilter=S.ledgerTagFilter;
  let filtered=filter==='__credit__'?entries.filter(e=>e.creditAutoId):filter?entries.filter(e=>e.category===filter):entries;
  if(tagFilter)filtered=filtered.filter(e=>(e.tags||[]).includes(tagFilter));
  const cats=[...new Set(entries.map(e=>e.category))];
  const filterBar=document.getElementById('ledger-filter-bar');
  if(filterBar){
    const creditEntries=entries.filter(e=>e.creditAutoId);
    const isFiltered=!!(filter);
    const activeLabel=filter==='__credit__'?'💳 신용카드만':filter;
    const chipItems=[
      `<button class="ledger-filter-chip ${!filter?'active':''}" onclick="App.setLedgerFilter(null);App._closeLedgerFilterDropdown()">전체 (${entries.length})</button>`,
      ...cats.map(c=>{
        const cnt=entries.filter(e=>e.category===c).length;
        const cc=getCategoryColor(c);
        const isActive=filter===c;
        return `<button class="ledger-filter-chip ${isActive?'active':''}" style="--chip-strip:${cc.strip};--chip-bg:${cc.bg};--chip-color:${cc.color};" onclick="App.setLedgerFilter('${c}');App._closeLedgerFilterDropdown()">${c} (${cnt})</button>`;
      }),
      creditEntries.length>0?`<button class="ledger-filter-chip ledger-filter-credit ${filter==='__credit__'?'active':''}" onclick="App.setLedgerFilter(S.ledgerFilter==='__credit__'?null:'__credit__');App._closeLedgerFilterDropdown()">💳 신용카드만 (${creditEntries.length})</button>`:''
    ].join('');
    filterBar.innerHTML=`
      <div class="ledger-filter-wrap">
        <button class="ledger-filter-icon-btn ${isFiltered?'active':''}" onclick="App._toggleLedgerFilterDropdown()" title="카테고리 필터">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>${isFiltered?`<span class="ledger-filter-active-dot"></span>`:''}
        </button>
        <div class="ledger-filter-dropdown" id="ledger-filter-dropdown" style="display:none;">${chipItems}</div>
      </div>
      ${isFiltered?`<button class="ledger-filter-clear-btn" onclick="App.setLedgerFilter(null);App._closeLedgerFilterDropdown()">해제</button>`:''}
    `;
  }
  // Tag filter bar
  const allTags=[...new Set(entries.flatMap(e=>e.tags||[]))];
  const tagBarEl=document.getElementById('ledger-tag-filter-bar');
  if(tagBarEl){
    if(allTags.length>0){
      tagBarEl.style.display='flex';
      tagBarEl.innerHTML=allTags.map(t=>{
        const col=getTagColor(t);
        const active=tagFilter===t;
        return `<button class="ledger-tag-chip ${active?'active':''}" style="--tag-bg:${col.bg};--tag-color:${col.color};" onclick="App.setTagFilter('${t}')">#${t}</button>`;
      }).join('');
    } else {
      tagBarEl.style.display='none';
      tagBarEl.innerHTML='';
    }
  }
  const today=new Date();
  const todayStr=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
  const dateInp=document.getElementById('lq-date');if(dateInp&&!dateInp.value)dateInp.value=todayStr;
  const listEl=document.getElementById('ledger-list');if(!listEl)return;
  if(filtered.length===0){
    listEl.innerHTML=`<div class="ledger-empty"><div>📒</div><div>내역이 없어요</div><div>위 빠른 입력으로 시작하세요!</div></div>`;return;
  }
  const byDate={};
  filtered.slice().sort((a,b)=>{
    const dc=b.date.localeCompare(a.date);
    if(dc!==0)return dc;
    return (b.id||0)-(a.id||0);
  }).forEach(e=>{
    if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);
  });
  const dow=['일','월','화','수','목','금','토'];
  listEl.innerHTML=Object.entries(byDate).sort(([a],[b])=>b.localeCompare(a)).map(([date,items])=>{
    const d=new Date(date+'T12:00:00');
    const dayNet=items.reduce((s,e)=>s+(e.type==='income'?e.amount:-e.amount),0);
    return `
      <div class="ledger-date-group">
        <div class="ledger-date-header">
          <span>${date} (${dow[d.getDay()]})</span>
          <span style="font-weight:800;${dayNet>=0?'color:var(--green)':'color:var(--red)'}">${dayNet>=0?'+':''}${fmt(dayNet)}</span>
        </div>
        ${items.map(e=>{
          const catName=_getCatNameById(e);
          const cc=getCategoryColor(catName);
          const tagPills=(e.tags&&e.tags.length>0)?e.tags.map(t=>{const col=getTagColorForCategory(catName);return `<span class="ledger-tag-pill" style="--tag-bg:${col.bg};--tag-color:${col.color};" onclick="event.stopPropagation();App.setTagFilter('${t}')">#${t}</span>`;}).join(''):'';
          const creditBadge=e.creditAutoId?`<span class="ledger-credit-auto-badge" style="--cat-strip:${cc.strip};"><span class="badge-svg-icon" style="color:rgba(255,255,255,0.92);">${_SVG_ICONS.creditcard}</span>신용카드 자동</span>`:'';
          const savingsBadge=(e.tags||[]).includes('저축')?`<span class="ledger-savings-badge"><span class="badge-svg-icon" style="color:#E8627A;">${_SVG_ICONS.heart}</span>저축</span>`:'';
          const autoLedgerBadge=e.autoLedgerId?`<span class="ledger-auto-ledger-badge"><span class="badge-svg-icon" style="color:#F9A825;">${_SVG_ICONS.lightning}</span>자동화</span>`:'';
          return `
          <div class="ledger-entry ${e.type} item-hover-edit" style="--cat-strip:${cc.strip};--cat-bg:${cc.bg};--cat-color:${cc.color};" onclick="App.openEditLedgerModal('${key}',${e.id})">
            <div class="ledger-cat-strip"></div>
            <div class="ledger-entry-left">
              <span class="ledger-cat-badge" style="background:${cc.bg};color:${cc.color};"><span class="lcat-badge-icon">${_getCatSVG(catName)}</span>${_stripCatEmoji(catName)}</span>
              <div class="ledger-memo-wrap">
                <span class="ledger-memo">${e.memo||'—'}</span>
                ${tagPills}
              </div>
            </div>
            <div class="ledger-entry-mid">
              ${creditBadge}${savingsBadge}${autoLedgerBadge}
            </div>
            <div class="ledger-entry-right">
              <span class="ledger-amount ${e.type==='income'?'green':'red'}">${e.type==='income'?'+':'−'}${fmt(e.amount)}</span>
              <button class="icon-btn" onclick="event.stopPropagation();App.deleteLedgerEntry('${key}',${e.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
            </div>
          </div>`;}).join('')}
      </div>`;
  }).join('');
}

function addLedgerEntry(){
  const type=document.getElementById('lq-type').value;
  const date=document.getElementById('lq-date').value;
  const category=document.getElementById('lq-category').value;
  const rawMemo=document.getElementById('lq-memo').value.trim();
  const amount=numInputParse(document.getElementById('lq-amount').value);
  if(!date||amount<=0)return;
  // [수정] 입력한 날짜의 연·월 기준으로 저장 (현재 보고있는 월이 아닌 날짜 기준)
  const dateParts=date.split('-');
  const entryY=parseInt(dateParts[0]);const entryM=parseInt(dateParts[1]);
  const key=(entryY&&entryM)?mkey(entryY,entryM):mkey(S.currentMonths.ledger.y,S.currentMonths.ledger.m);
  let tags=extractTagsFromMemo(rawMemo);
  const memo=cleanMemoText(rawMemo);
  // 키워드 규칙 자동 태그 적용
  const kwRules=S.keywordRules||[];
  kwRules.forEach(r=>{
    if(r.keyword&&memo.toLowerCase().includes(r.keyword.toLowerCase())){
      if(r.tag){const t=r.tag.replace(/^#/,'');if(!tags.includes(t))tags.push(t);}
    }
  });
  const hintEl=document.getElementById('kw-auto-hint');if(hintEl)hintEl.classList.remove('visible');
  if(!S.ledger[key])S.ledger[key]=[];
  const _lcatForNew=(S.ledgerCategories||[]).find(c=>c.name===category);
  const _categoryIdForNew=_lcatForNew?_lcatForNew.id:undefined;
  S.ledger[key].push({id:genId(),date,type,category,categoryId:_categoryIdForNew,memo,tags,amount});
  document.getElementById('lq-memo').value='';
  document.getElementById('lq-amount').value='';
  hideMemoDropdown();
  document.getElementById('lq-amount').focus();
  saveState();renderLedger();renderDashboard();
  if(type==='expense')renderIncome();
}

function deleteLedgerEntry(key,id){
  const entry=(S.ledger[key]||[]).find(e=>e.id==id);
  if(entry&&entry.autoLedgerId){
    if(!S.autoSkippedIds)S.autoSkippedIds=[];
    if(!S.autoSkippedIds.includes(entry.autoLedgerId))S.autoSkippedIds.push(entry.autoLedgerId);
  }
  if(S.ledger[key])S.ledger[key]=S.ledger[key].filter(e=>e.id!=id);
  saveState();renderLedger();renderDashboard();renderIncome();
}

// 가계부 카테고리 셀렉트 공통 동기화 — lq-category(빠른입력)와 mle-category(수정모달) 모두 S.ledgerCategories로 통일
function _updateCatSelIcon(selId,iconSpanId){
  const sel=document.getElementById(selId);
  const span=document.getElementById(iconSpanId);
  if(sel&&span)span.innerHTML=_getCatSVG(sel.value);
}
function _syncLedgerCatSelects(selectedForEdit){
  const cats=S.ledgerCategories||[];
  // 빠른입력 셀렉트
  const lqSel=document.getElementById('lq-category');
  if(lqSel){
    const cur=lqSel.value;
    lqSel.innerHTML=cats.map(c=>`<option value="${c.name}">${c.name}</option>`).join('');
    if([...lqSel.options].some(o=>o.value===cur))lqSel.value=cur;
    if(!lqSel.dataset.iconBound){
      lqSel.dataset.iconBound='1';
      lqSel.addEventListener('change',()=>_updateCatSelIcon('lq-category','lq-cat-icon'));
    }
    _updateCatSelIcon('lq-category','lq-cat-icon');
  }
  // 수정 모달 셀렉트 (selectedForEdit가 주어진 경우에만)
  if(selectedForEdit!==undefined){
    const mleSel=document.getElementById('mle-category');
    if(mleSel){
      let opts=cats.map(c=>`<option value="${c.name}" ${c.name===selectedForEdit?'selected':''}>${c.name}</option>`).join('');
      if(selectedForEdit&&!cats.some(c=>c.name===selectedForEdit)){
        opts=`<option value="${selectedForEdit}" selected>${selectedForEdit}</option>`+opts;
      }
      mleSel.innerHTML=opts;
      if(!mleSel.dataset.iconBound){
        mleSel.dataset.iconBound='1';
        mleSel.addEventListener('change',()=>_updateCatSelIcon('mle-category','mle-cat-icon'));
      }
      _updateCatSelIcon('mle-category','mle-cat-icon');
    }
  }
}

function _populateLedgerEditCat(type,selected){
  _syncLedgerCatSelects(selected);
}

function onLedgerEditTypeChange(){
  const type=document.getElementById('mle-type').value;
  const cur=document.getElementById('mle-category').value;
  _populateLedgerEditCat(type,cur);
}

function openEditLedgerModal(key,id){
  const entries=S.ledger[key]||[];
  const entry=entries.find(e=>e.id==id);if(!entry)return;
  document.getElementById('mle-key').value=key;
  document.getElementById('mle-id').value=id;
  document.getElementById('mle-type').value=entry.type;
  document.getElementById('mle-date').value=entry.date;
  const rawMemo=(entry.memo||'')+(entry.tags&&entry.tags.length?entry.tags.map(t=>' #'+t).join(''):'');
  document.getElementById('mle-memo').value=rawMemo;
  document.getElementById('mle-amount').value=entry.amount;
  _populateLedgerEditCat(entry.type,entry.category);
  openModal('ledger-edit');
}

function saveLedgerEdit(){
  const key=document.getElementById('mle-key').value;
  const id=parseInt(document.getElementById('mle-id').value);
  const date=document.getElementById('mle-date').value;
  const type=document.getElementById('mle-type').value;
  const category=document.getElementById('mle-category').value;
  const rawMemo=document.getElementById('mle-memo').value.trim();
  const amount=numInputParse(document.getElementById('mle-amount').value);
  if(!date||amount<=0)return alert('날짜와 금액을 입력해주세요');
  const tags=extractTagsFromMemo(rawMemo);
  const memo=cleanMemoText(rawMemo);
  const entries=S.ledger[key];if(!entries)return;
  const idx=entries.findIndex(e=>e.id==id);if(idx<0)return;
  const _lcatForEdit=(S.ledgerCategories||[]).find(c=>c.name===category);
  const _categoryIdForEdit=_lcatForEdit?_lcatForEdit.id:entries[idx].categoryId;
  entries[idx]={...entries[idx],date,type,category,categoryId:_categoryIdForEdit,memo,tags,amount};
  saveState();closeModal();renderLedger();renderDashboard();renderIncome();
}

function setLedgerFilter(cat){S.ledgerFilter=cat;renderLedger();}

function setTagFilter(tag){
  S.ledgerTagFilter=(S.ledgerTagFilter===tag)?null:tag;
  renderLedger();
}

// ===== TAG UTILITIES =====
const CHOSUNG_LIST=['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function getChosung(str){
  return[...str].map(c=>{
    const code=c.charCodeAt(0);
    return(code>=0xAC00&&code<=0xD7A3)?CHOSUNG_LIST[Math.floor((code-0xAC00)/588)]:c;
  }).join('');
}
function isJamo(str){return/^[ㄱ-ㅎ]+$/.test(str);}
function matchesTag(query,tagName){
  if(!query)return true;
  const q=query.toLowerCase(),t=tagName.toLowerCase();
  if(t.includes(q))return true;
  if(isJamo(q)&&getChosung(t).startsWith(q))return true;
  return false;
}
function extractTagsFromMemo(text){
  const matches=text.match(/#([^\s#]+)/g);
  if(!matches)return[];
  return[...new Set(matches.map(m=>m.slice(1)))];
}
function cleanMemoText(text){
  return text.replace(/#[^\s#]+/g,'').replace(/\s+/g,' ').trim();
}
function getAllLedgerTags(){
  const tags=new Set(['식비','카페','교통','쇼핑','의료','문화','여행','생활','편의점','배달']);
  for(const key of Object.keys(S.ledger||{})){
    for(const e of(S.ledger[key]||[])){if(e.tags)e.tags.forEach(t=>tags.add(t));}
  }
  return[...tags];
}
const TAG_PALETTE=[
  {bg:'#E8F5EE',color:'#2E8B57'},
  {bg:'#EBF5FF',color:'#1565C0'},
  {bg:'#F0EEFF',color:'#6C5CE7'},
  {bg:'#FFF8EE',color:'#D4820A'},
  {bg:'#FFF0F5',color:'#C0396C'},
  {bg:'#E0F7F5',color:'#007B74'},
  {bg:'#FFF5F5',color:'#C0392B'},
  {bg:'#F5FFF5',color:'#2E7D32'},
  {bg:'#FFF9E6',color:'#B07C00'},
  {bg:'#EEF4FF',color:'#2A5BD7'},
];

// ===== 가계부 카테고리 색상 팔레트 =====
const LEDGER_CAT_COLORS={
  '식비':        {strip:'#FF6B6B',bg:'#FFF0F0',color:'#C0392B'},
  '생활':        {strip:'#FFA94D',bg:'#FFF5E6',color:'#D4620A'},
  '주거/공과':   {strip:'#74B9FF',bg:'#EBF5FF',color:'#1565C0'},
  '교통':        {strip:'#55EFC4',bg:'#E0FFF6',color:'#007B60'},
  '문화/여가':   {strip:'#A29BFE',bg:'#F0EEFF',color:'#6C5CE7'},
  '저축/투자':   {strip:'#FDCB6E',bg:'#FFFBE6',color:'#B07C00'},
  '기타':        {strip:'#B2BEC3',bg:'#F4F6F8',color:'#636E72'},
  '신용카드':    {strip:'#6C5CE7',bg:'#F0EEFF',color:'#4834d4'},
  '🍚 식비':    {strip:'#FF6B6B',bg:'#FFF0F0',color:'#C0392B'},
  '🧴 생활용품': {strip:'#FFA94D',bg:'#FFF5E6',color:'#D4620A'},
  '🏠 주거·공과금':{strip:'#74B9FF',bg:'#EBF5FF',color:'#1565C0'},
  '🚗 교통·차량': {strip:'#55EFC4',bg:'#E0FFF6',color:'#007B60'},
  '💪 건강':    {strip:'#43C98A',bg:'#E8F5EE',color:'#2E8B57'},
  '🎨 문화·취미': {strip:'#A29BFE',bg:'#F0EEFF',color:'#6C5CE7'},
  '👕 패션·미용': {strip:'#F48FB1',bg:'#FFF0F5',color:'#AD1457'},
  '💰 금융':    {strip:'#FDCB6E',bg:'#FFFBE6',color:'#B07C00'},
  '✈ 여행':     {strip:'#4DB6AC',bg:'#E0F7F5',color:'#007B74'},
  '🎁 경조사':  {strip:'#CE93D8',bg:'#F5EEFF',color:'#6A1B9A'},
  '📦 기타':    {strip:'#B2BEC3',bg:'#F4F6F8',color:'#636E72'},
};
const _CAT_FALLBACK_STRIPS=['#FF6B6B','#FFA94D','#74B9FF','#55EFC4','#A29BFE','#FDCB6E','#FD79A8','#00CEC9'];
function getCategoryColor(catName){
  // 1순위: 사용자가 직접 설정한 카테고리 색상
  if(S&&S.ledgerCategories){
    const lcat=(S.ledgerCategories||[]).find(c=>c.name===catName);
    if(lcat&&lcat.color){
      const c=lcat.color;
      return{strip:c,bg:c+'22',color:c};
    }
  }
  // 2순위: 사전 정의 색상표
  if(LEDGER_CAT_COLORS[catName])return LEDGER_CAT_COLORS[catName];
  // 3순위: 해시 기반 팔레트
  let h=0;for(let i=0;i<catName.length;i++)h=(h*31+catName.charCodeAt(i))&0xFFFF;
  const strip=_CAT_FALLBACK_STRIPS[Math.abs(h)%_CAT_FALLBACK_STRIPS.length];
  return{strip,bg:strip+'18',color:strip};
}

function getTagColor(tagName){
  let h=0;for(let i=0;i<tagName.length;i++)h=(h*31+tagName.charCodeAt(i))&0xFFFF;
  return TAG_PALETTE[Math.abs(h)%TAG_PALETTE.length];
}
// 태그 색을 카테고리 색과 일치시키는 함수 (가계부 항목 내 태그용)
function getTagColorForCategory(catName){
  const cc=getCategoryColor(catName);
  return{bg:cc.bg,color:cc.color};
}

// ===== TAG DROPDOWN =====
let _tagDropFocusIdx=-1;
let _tagHideTimer=null;

function onMemoInput(el){
  const val=el.value;
  const pos=el.selectionStart;
  const before=val.slice(0,pos);
  const hashMatch=before.match(/#([^\s#]*)$/);
  if(!hashMatch){hideMemoDropdown();}else{showMemoDropdown(el,hashMatch[1]);}
  _applyKwRules(val);
}

function showMemoDropdown(el,query){
  const dd=document.getElementById('lq-tag-dropdown');
  if(!dd)return;
  const allTags=getAllLedgerTags();
  const filtered=allTags.filter(t=>matchesTag(query,t)).slice(0,8);
  if(filtered.length===0){hideMemoDropdown();return;}
  _tagDropFocusIdx=-1;
  dd.innerHTML=filtered.map((t,i)=>{
    const col=getTagColor(t);
    return `<div class="lq-tag-option" data-tag="${t}" data-idx="${i}" style="--tag-bg:${col.bg};--tag-color:${col.color};" onmousedown="App.selectMemoTag('${t}')">#${t}</div>`;
  }).join('');
  dd.style.display='block';
}

function hideMemoDropdown(delay){
  if(delay){
    _tagHideTimer=setTimeout(()=>{
      const d=document.getElementById('lq-tag-dropdown');
      if(d)d.style.display='none';
      _tagDropFocusIdx=-1;
    },delay);
  } else {
    if(_tagHideTimer)clearTimeout(_tagHideTimer);
    const d=document.getElementById('lq-tag-dropdown');
    if(d)d.style.display='none';
    _tagDropFocusIdx=-1;
  }
}

function selectMemoTag(tag){
  if(_tagHideTimer)clearTimeout(_tagHideTimer);
  const el=document.getElementById('lq-memo');
  if(!el)return;
  const val=el.value,pos=el.selectionStart;
  const before=val.slice(0,pos),after=val.slice(pos);
  const newBefore=before.replace(/#([^\s#]*)$/,'#'+tag);
  const spacer=(after.startsWith(' ')||after==='')?'':' ';
  el.value=newBefore+spacer+after;
  el.focus();
  const np=newBefore.length+spacer.length;
  el.setSelectionRange(np,np);
  hideMemoDropdown();
}

function onMemoKeydown(event){
  const dd=document.getElementById('lq-tag-dropdown');
  const ddVisible=dd&&dd.style.display!=='none';
  if(!ddVisible){
    if(event.key==='Enter')addLedgerEntry();
    return;
  }
  const opts=dd.querySelectorAll('.lq-tag-option');
  if(event.key==='ArrowDown'){
    event.preventDefault();
    _tagDropFocusIdx=Math.min(_tagDropFocusIdx+1,opts.length-1);
    opts.forEach((o,i)=>o.classList.toggle('focused',i===_tagDropFocusIdx));
  } else if(event.key==='ArrowUp'){
    event.preventDefault();
    _tagDropFocusIdx=Math.max(_tagDropFocusIdx-1,0);
    opts.forEach((o,i)=>o.classList.toggle('focused',i===_tagDropFocusIdx));
  } else if(event.key==='Enter'){
    event.preventDefault();
    if(_tagDropFocusIdx>=0&&opts[_tagDropFocusIdx]){
      selectMemoTag(opts[_tagDropFocusIdx].dataset.tag);
    } else {
      hideMemoDropdown();
      addLedgerEntry();
    }
  } else if(event.key==='Escape'){
    hideMemoDropdown();
  }
}

// ===== LEDGER SEARCH =====
function toggleSearchPanel(){
  const panel=document.getElementById('ledger-search-panel');
  if(!panel)return;
  const isHidden=panel.style.display==='none';
  if(isHidden){
    panel.style.display='block';
    renderSearchPanel();
    setTimeout(()=>document.getElementById('ledger-search-input')?.focus(),80);
  } else {
    panel.style.display='none';
  }
}

function renderSearchPanel(){
  const el=document.getElementById('ledger-search-panel');
  if(!el)return;
  el.innerHTML=`
    <div class="search-panel-header">🔍 가계부 검색</div>
    <div class="search-input-row">
      <input type="text" id="ledger-search-input" class="lq-input" style="flex:1;"
        placeholder="메모, 태그, 카테고리 검색..."
        oninput="App.doLedgerSearch(this.value)"
        onkeydown="if(event.key==='Escape')App.toggleSearchPanel()"/>
      <button class="btn-cancel" style="margin-left:8px;" onclick="App.toggleSearchPanel()">닫기</button>
    </div>
    <div id="ledger-search-results" class="search-results-list">
      <div class="search-placeholder">검색어를 입력하세요</div>
    </div>`;
}

function doLedgerSearch(q){
  const resultsEl=document.getElementById('ledger-search-results');
  if(!resultsEl)return;
  const query=(q||'').trim().toLowerCase();
  if(!query){
    resultsEl.innerHTML='<div class="search-placeholder">검색어를 입력하세요</div>';
    return;
  }
  const allEntries=[];
  Object.entries(S.ledger||{}).forEach(([key,entries])=>{
    (entries||[]).forEach(e=>{
      const memo=(e.memo||'').toLowerCase();
      const cat=(e.category||'').toLowerCase();
      const tags=(e.tags||[]).join(' ').toLowerCase();
      if(memo.includes(query)||cat.includes(query)||tags.includes(query)){
        allEntries.push({...e,_key:key});
      }
    });
  });
  allEntries.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  if(allEntries.length===0){
    resultsEl.innerHTML=`<div class="search-placeholder">"${q}"에 대한 결과가 없어요</div>`;
    return;
  }
  const shown=allEntries.slice(0,50);
  resultsEl.innerHTML=`
    <div class="search-count">${allEntries.length}건 발견</div>
    ${shown.map(e=>{
      const dp=(e.date||'').split('-');
      const dateStr=dp.length===3?`${dp[0]}.${dp[1]}.${dp[2]}`:(e.date||'');
      const tags=(e.tags||[]).filter(t=>t).map(t=>`<span class="vpp-tag">${t}</span>`).join('');
      const isInc=e.type==='income';
      const color=isInc?'var(--green)':'var(--red)';
      const sign=isInc?'+':'-';
      return `<div class="search-result-item">
        <div class="search-result-left">
          <span class="search-result-cat">${e.category||''}</span>
          <span class="search-result-memo">${e.memo||'(메모 없음)'}</span>
          ${tags}
        </div>
        <div class="search-result-right">
          <span style="color:${color};font-weight:700;font-size:13px;">${sign}${Math.round(e.amount).toLocaleString('ko-KR')}원</span>
          <span class="search-result-date">${dateStr}</span>
        </div>
      </div>`;
    }).join('')}
    ${allEntries.length>50?'<div class="search-placeholder" style="padding:6px 0;">상위 50건만 표시됩니다</div>':''}`;
}

// ===== BUDGET AUTO SUGGESTION =====
function openBudgetAutoModal(){
  const cm=S.currentMonths.income;
  // 최근 3개월 데이터 수집
  const months=[];
  for(let i=1;i<=3;i++){
    let y=cm.y,m=cm.m-i;
    while(m<=0){m+=12;y--;}
    months.push({y,m});
  }
  // 월별 카테고리 지출 합산
  const catTotals={};
  months.forEach(({y,m})=>{
    const sums=getLedgerCategorySums(y,m);
    Object.entries(sums).forEach(([cat,amt])=>{
      if(!catTotals[cat])catTotals[cat]=[];
      catTotals[cat].push(amt);
    });
  });
  // 평균 계산
  const catAvg={};
  Object.entries(catTotals).forEach(([cat,amts])=>{
    catAvg[cat]=amts.reduce((s,a)=>s+a,0)/amts.length;
  });

  const existingCats=S.budgetCategories||[];
  const coveredLedgerCats=new Set();

  // 기존 예산 카테고리별 제안
  const existingSuggestions=existingCats.map(cat=>{
    const linked=cat.linkedCategories||[];
    let totalAvg=0;
    if(linked.length>0){
      linked.forEach(lc=>{coveredLedgerCats.add(lc);totalAvg+=catAvg[lc]||0;});
    } else {
      if(catAvg[cat.name]!==undefined){
        coveredLedgerCats.add(cat.name);
        totalAvg=catAvg[cat.name];
      } else {
        Object.entries(catAvg).forEach(([lcat,avg])=>{
          if(lcat.includes(cat.name)||cat.name.includes(lcat)){
            coveredLedgerCats.add(lcat);totalAvg+=avg;
          }
        });
      }
    }
    const suggested=totalAvg>0?Math.ceil(totalAvg*1.1/5000)*5000:cat.budget;
    return{id:cat.id,name:cat.name,current:cat.budget,suggested,avg:Math.round(totalAvg)};
  });

  // 새 카테고리 제안 (가계부에 있지만 예산에 없는 것, 1만원 이상)
  const newSuggestions=Object.entries(catAvg)
    .filter(([cat])=>!coveredLedgerCats.has(cat))
    .filter(([,avg])=>avg>=10000)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,3)
    .map(([cat,avg])=>({name:cat,suggested:Math.ceil(avg*1.1/5000)*5000,avg:Math.round(avg)}));

  const hasData=months.some(({y,m})=>(S.ledger[mkey(y,m)]||[]).length>0);
  const monthsLabel=months.map(({m})=>`${m}월`).join(', ');
  const el=document.getElementById('modal-budget-auto-body');
  if(!el)return;

  if(!hasData){
    el.innerHTML=`<div style="text-align:center;padding:20px;color:var(--text-sub);font-size:13px;">최근 3개월 가계부 데이터가 없어요.<br>가계부를 기록한 후 사용해 주세요.</div>`;
  } else {
    el.innerHTML=`
      <div style="font-size:11.5px;color:var(--text-sub);margin-bottom:14px;line-height:1.6;">📊 최근 ${monthsLabel} 평균 지출 기준 (+10% 여유)<br>금액을 직접 수정한 뒤 적용할 수 있어요.</div>
      <div class="auto-suggest-list">
        ${existingSuggestions.map((s,i)=>`
          <div class="auto-suggest-row">
            <div class="auto-suggest-left">
              <span class="auto-suggest-name">${s.name}</span>
              <span class="auto-suggest-avg">${s.avg>0?'평균 '+s.avg.toLocaleString('ko-KR')+'원':'데이터 없음'}</span>
            </div>
            <input type="text" inputmode="numeric" class="auto-suggest-input form-input" id="asg-${i}"
              value="${s.suggested.toLocaleString('ko-KR')}"
              data-id="${s.id}" data-is-new="false"
              oninput="App.numInputFmt(this)"/>
          </div>`).join('')}
        ${newSuggestions.length>0?`
          <div class="auto-suggest-divider">✨ 추가 제안 카테고리</div>
          ${newSuggestions.map((s,i)=>`
            <div class="auto-suggest-row">
              <div class="auto-suggest-left">
                <label class="auto-new-label">
                  <input type="checkbox" class="auto-new-chk" id="anc-${i}" checked/>
                  <span class="auto-suggest-name">${s.name}</span>
                </label>
                <span class="auto-suggest-avg">평균 ${s.avg.toLocaleString('ko-KR')}원</span>
              </div>
              <input type="text" inputmode="numeric" class="auto-suggest-input form-input" id="asg-new-${i}"
                value="${s.suggested.toLocaleString('ko-KR')}"
                data-name="${s.name}" data-is-new="true"
                oninput="App.numInputFmt(this)"/>
            </div>`).join('')}
        `:''}
      </div>`;
  }
  openModal('budget-auto');
}

function applyBudgetSuggestions(){
  const cm=S.currentMonths.income;
  const curKey=mkey(cm.y,cm.m);
  if(!S.budgetCategories)S.budgetCategories=[];
  if(!S.monthBudgets)S.monthBudgets={};
  if(!S.monthBudgets[curKey])S.monthBudgets[curKey]={};

  // 기존 카테고리: 이번 달에만 override 적용
  document.querySelectorAll('.auto-suggest-input[data-is-new="false"]').forEach(inp=>{
    const id=parseInt(inp.dataset.id);
    const budget=numInputParse(inp.value);
    if(!isNaN(budget)&&budget>=0)S.monthBudgets[curKey][id]=budget;
  });

  // 새 카테고리 추가 (체크된 것만, 이번 달 전용 unsynced)
  const newInputs=document.querySelectorAll('.auto-suggest-input[data-is-new="true"]');
  const newChks=document.querySelectorAll('.auto-new-chk');
  newInputs.forEach((inp,i)=>{
    if(newChks[i]&&!newChks[i].checked)return;
    const name=inp.dataset.name;
    const budget=numInputParse(inp.value);
    if(!name||isNaN(budget))return;
    if(S.budgetCategories.some(c=>c.name===name))return;
    const newId=genId();
    S.budgetCategories.push({id:newId,name,budget:0,synced:false,syncFrom:'',linkedCategories:[]});
    S.monthBudgets[curKey][newId]=budget;
  });

  saveState();closeModal();renderBudget(cm.y,cm.m);
}

// ===== CLOSE MONTH =====
function openCloseMonthModal(){
  const cm=S.currentMonths.ledger;const key=mkey(cm.y,cm.m);
  document.getElementById('cm-month-label').textContent=cm.y+'년 '+cm.m+'월';
  document.getElementById('cm-note').value=S.closedMonths[key]?.note||'';

  const entries=S.ledger[key]||[];
  const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  const budIn=getTotalIncome(cm.y,cm.m);
  const budOut=getTotalFixed(cm.y,cm.m)+getTotalVariable(cm.y,cm.m)+getFoodTotal(cm.y,cm.m);
  const savingsAmt=getTotalSavings(cm.y,cm.m);
  const sr=budIn>0?(savingsAmt/budIn*100).toFixed(1):0;
  const srColor=parseFloat(sr)>=30?'#43C98A':parseFloat(sr)>=15?'#FFB347':'#F06292';

  const effectiveVars=getEffectiveVariable(cm.y,cm.m);
  const catMap={};
  effectiveVars.forEach(v=>{catMap[v.category]=(catMap[v.category]||0)+(parseFloat(v.amount)||0);});
  // [수정] 식비 캘린더 금액을 별도로 더하지 않음 — getEffectiveVariable이 이미 가계부 식비 포함
  // [수정] 월 마감 카테고리별 지출: 주거/공과금, 금융 제외
  const catEntries=Object.entries(catMap).filter(([cat])=>!cat.includes('주거')&&!cat.includes('공과')&&!cat.includes('금융')).sort((a,b)=>b[1]-a[1]);
  const maxAmt=catEntries.length>0?catEntries[0][1]:1;

  // [수정] 카테고리별 고유 색상 팔레트 (모달)
  const CM_CAT_COLORS={
    '식비':'#FF8A65','🍚 식비':'#FF8A65',
    '생필품':'#4DB6AC','생활용품':'#4DB6AC','🧴 생활용품':'#4DB6AC',
    '문화/여가':'#CE93D8','문화·취미':'#CE93D8','🎨 문화·취미':'#CE93D8',
    '기타':'#90A4AE','📦 기타':'#90A4AE',
    '교통':'#64B5F6','교통·통신':'#64B5F6','🚗 교통·차량':'#64B5F6',
    '주거':'#FFD54F','주거/공과':'#FFD54F','주거·공과금':'#FFD54F','🏠 주거·공과금':'#FFD54F',
    '건강':'#81C784','💪 건강':'#81C784',
    '저축/투자':'#A29BFE','💰 금융':'#80CBC4',
    '패션·미용':'#F48FB1','👕 패션·미용':'#F48FB1',
    '여행':'#4FC3F7','✈ 여행':'#4FC3F7',
    '경조사':'#FFCA28','🎁 경조사':'#FFCA28',
  };
  const CM_FALLBACK=['#A29BFE','#64B5F6','#FF8A65','#4DB6AC','#F48FB1','#FFD54F','#81C784','#80CBC4'];
  const catRows=catEntries.map(([cat,amt],i)=>{
    const bCat=(S.budgetCategories||[]).find(b=>b.name===cat);
    const bAmt=bCat?.budget||0;
    const barPct=Math.min(100,(amt/(maxAmt||1))*100);
    const baseColor=CM_CAT_COLORS[cat]||CM_FALLBACK[i%CM_FALLBACK.length];
    const barColor=bAmt>0&&amt>bAmt?'var(--red)':baseColor;
    const note=bAmt>0?`<span class="cm-cat-note" style="color:${amt>bAmt?'var(--red)':'var(--green)'};">${amt>bAmt?'▲초과 '+fmt(amt-bAmt):'▽여유 '+fmt(bAmt-amt)}</span>`:'';
    return `
      <div class="cm-cat-row">
        <div class="cm-cat-label-row">
          <span class="cm-cat-name">${cat}</span>
          <div style="display:flex;align-items:center;gap:8px;">${note}<span class="cm-cat-amount">${fmt(amt)}</span></div>
        </div>
        <div class="cm-cat-bar-wrap">
          <div class="cm-cat-bar" style="width:${barPct}%;background:${barColor}"></div>
        </div>
      </div>`;
  }).join('');

  const cmNetChange=ledIn-ledOut;
  const cmNetColor=cmNetChange>=0?'var(--green)':'var(--red)';
  document.getElementById('cm-summary').innerHTML=`
    <div class="cm-stats-grid">
      <div class="cm-stat-box">
        <div class="cm-stat-label">💰 총 수입</div>
        <div class="cm-stat-val green">${fmt(ledIn)}</div>
      </div>
      <div class="cm-stat-box">
        <div class="cm-stat-label">💸 총 지출</div>
        <div class="cm-stat-val red">${fmt(ledOut)}</div>
      </div>
    </div>
    <div style="margin-top:16px;">
      <div class="cm-section-title">📊 카테고리별 지출 <span style="font-size:10px;font-weight:400;color:var(--text-sub);">*주거/공과금, 금융 제외</span></div>
      ${catRows||'<div style="color:var(--text-sub);font-size:13px;padding:10px 0;">기록된 지출이 없어요</div>'}
    </div>`;
  openModal('closeMonth');
}

function closeMonth(){
  const cm=S.currentMonths.ledger;
  // 아직 지나지 않은 달은 마감 불가
  const _now=new Date();
  const _nowY=_now.getFullYear(),_nowM=_now.getMonth()+1;
  if(cm.y>_nowY||(cm.y===_nowY&&cm.m>_nowM)){
    alert('아직 지나지 않은 달은 마감할 수 없어요.\n해당 월이 끝난 후 마감해 주세요.');
    return;
  }
  const key=mkey(cm.y,cm.m);
  const entries=S.ledger[key]||[];
  const budIn=getTotalIncome(cm.y,cm.m);
  const budOut=getTotalFixed(cm.y,cm.m)+getTotalVariable(cm.y,cm.m)+getFoodTotal(cm.y,cm.m);
  const savings=getTotalSavings(cm.y,cm.m);
  const sr=budIn>0?(savings/budIn*100).toFixed(1):0;
  const note=document.getElementById('cm-note').value;
  const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  const snapshot={
    closedAt:Date.now(),note,
    year:cm.y,month:cm.m,
    ledgerIncome:ledIn,ledgerExpense:ledOut,
    budgetIncome:budIn,budgetExpense:budOut,savings,savingsRate:sr,
    categories:(()=>{
      const effectiveVars=getEffectiveVariable(cm.y,cm.m);
      const catMap={};
      effectiveVars.forEach(v=>{catMap[v.category]=(catMap[v.category]||0)+(parseFloat(v.amount)||0);});
      // [수정] 식비 캘린더 금액을 별도로 더하지 않음 — getEffectiveVariable이 이미 가계부 식비 포함
      // [수정] 월 마감 카테고리 스냅샷: 주거/공과금, 금융 제외
      return Object.entries(catMap)
        .filter(([name])=>!name.includes('주거')&&!name.includes('공과')&&!name.includes('금융'))
        .sort((a,b)=>b[1]-a[1]).map(([name,amount])=>{
          const bCat=(S.budgetCategories||[]).find(b=>b.name===name);
          return{name,amount,budget:bCat?.budget||0};
        });
    })(),
    ledgerEntries:entries.map(e=>({...e})),
  };
  S.closedMonths[key]={closedAt:snapshot.closedAt,note,ledgerIncome:ledIn,ledgerExpense:ledOut,budgetIncome:budIn,budgetExpense:budOut,savings,savingsRate:sr};
  S.monthClosedArchive[key]=snapshot;
  saveState();closeModal();renderLedger();
}

function reopenMonth(){
  const cm=S.currentMonths.ledger;const key=mkey(cm.y,cm.m);
  if(!confirm('마감을 취소하고 다시 편집 가능하게 할까요?'))return;
  delete S.closedMonths[key];
  saveState();renderLedger();
}


function closeMonthDirect(y,m){
  // 아직 지나지 않은 달은 마감 불가
  const _now=new Date();
  const _nowY=_now.getFullYear(),_nowM=_now.getMonth()+1;
  if(y>_nowY||(y===_nowY&&m>_nowM)){
    alert('아직 지나지 않은 달은 마감할 수 없어요.\n해당 월이 끝난 후 마감해 주세요.');
    return;
  }
  const key=mkey(y,m);
  const note=document.getElementById('close-note-inline')?.value?.trim()||'';
  const entries=S.ledger[key]||[];
  const budIn=getTotalIncome(y,m);
  const budOut=getTotalFixed(y,m)+getTotalVariable(y,m)+getFoodTotal(y,m);
  const savings=getTotalSavings(y,m);
  const sr=budIn>0?(savings/budIn*100).toFixed(1):0;
  const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  const snapshot={
    closedAt:Date.now(),note,year:y,month:m,
    ledgerIncome:ledIn,ledgerExpense:ledOut,
    budgetIncome:budIn,budgetExpense:budOut,savings,savingsRate:sr,
    categories:(()=>{
      const effectiveVars=getEffectiveVariable(y,m);
      const catMap={};
      effectiveVars.forEach(v=>{catMap[v.category]=(catMap[v.category]||0)+(parseFloat(v.amount)||0);});
      return Object.entries(catMap)
        .filter(([name])=>!name.includes('주거')&&!name.includes('공과')&&!name.includes('금융'))
        .sort((a,b)=>b[1]-a[1])
        .map(([name,amount])=>{const bCat=(S.budgetCategories||[]).find(b=>b.name===name);return{name,amount,budget:bCat?.budget||0};});
    })(),
    ledgerEntries:entries.map(e=>({...e})),
  };
  S.closedMonths[key]={closedAt:snapshot.closedAt,note,ledgerIncome:ledIn,ledgerExpense:ledOut,budgetIncome:budIn,budgetExpense:budOut,savings,savingsRate:sr};
  S.monthClosedArchive[key]=snapshot;
  saveState();
  renderAnalysis();
  renderLedger();
}
function reopenMonthDirect(y,m){
  if(!confirm(`${m}월 마감을 취소할까요? 연간 통계와 마감 아카이브에서도 삭제됩니다.`))return;
  const key=mkey(y,m);
  delete S.closedMonths[key];
  delete S.monthClosedArchive[key];
  saveState();
  renderAnalysis();
  renderLedger();
  if(typeof renderMonthlyArchive==='function')renderMonthlyArchive();
}

// ===== MONTHLY ARCHIVE TAB =====
function renderMonthlyArchive(){
  const el=document.getElementById('archive-list');
  if(!el)return;
  const archive=S.monthClosedArchive||{};
  const keys=Object.keys(archive).sort((a,b)=>{
    const [ay,am]=a.split('-').map(Number);
    const [by,bm]=b.split('-').map(Number);
    return by!==ay?by-ay:bm-am;
  });
  const countEl=document.getElementById('archive-count');
  if(countEl)countEl.textContent=keys.length+'건';
  if(keys.length===0){
    el.innerHTML=`<div class="archive-empty">
      <div style="font-size:40px;margin-bottom:12px;">📋</div>
      <div style="font-size:15px;font-weight:700;color:var(--text-main);margin-bottom:6px;">아직 마감된 달이 없어요</div>
      <div style="font-size:13px;color:var(--text-sub);line-height:1.6;">가계부 탭에서 <strong>월 마감</strong> 버튼을 눌러<br>마감 확정을 하면 여기에 자동 저장됩니다.</div>
    </div>`;
    return;
  }
  el.innerHTML=keys.map(key=>{
    const snap=archive[key];
    const y=snap.year;const m=snap.month;
    const theme=MONTH_THEMES[m]||MONTH_THEMES[5];
    const sr=parseFloat(snap.savingsRate||0);
    const srColor=sr>=30?'var(--green)':sr>=15?'var(--orange)':'var(--red)';
    const closedDate=new Date(snap.closedAt).toLocaleDateString('ko-KR');
    // [수정] 카테고리별 고유 색상 팔레트
    const CAT_COLORS={
      '식비':'#FF8A65','🍚 식비':'#FF8A65',
      '생필품':'#4DB6AC','생활용품':'#4DB6AC','🧴 생활용품':'#4DB6AC',
      '문화/여가':'#CE93D8','문화·취미':'#CE93D8','🎨 문화·취미':'#CE93D8',
      '기타':'#90A4AE','📦 기타':'#90A4AE',
      '교통':'#64B5F6','교통·통신':'#64B5F6','🚗 교통·차량':'#64B5F6',
      '주거':'#FFD54F','주거/공과':'#FFD54F','주거·공과금':'#FFD54F','🏠 주거·공과금':'#FFD54F',
      '건강':'#81C784','💪 건강':'#81C784',
      '저축/투자':'#A29BFE','💰 금융':'#80CBC4',
      '패션·미용':'#F48FB1','👕 패션·미용':'#F48FB1',
      '여행':'#4FC3F7','✈ 여행':'#4FC3F7',
      '경조사':'#FFCA28','🎁 경조사':'#FFCA28',
    };
    const FALLBACK_COLORS=['#A29BFE','#64B5F6','#FF8A65','#4DB6AC','#F48FB1','#FFD54F','#81C784','#80CBC4'];
    const cats5=(snap.categories||[]).filter(c=>!c.name.includes('주거')&&!c.name.includes('공과')&&!c.name.includes('금융')).slice(0,5);
    // [수정] 최대 금액 기준으로 바 비율 계산 (상대 비율)
    const maxCatAmt=Math.max(...cats5.map(c=>c.amount),1);
    const catRows=cats5.map((c,i)=>{
      const barPct=Math.min(100,Math.round(c.amount/maxCatAmt*100));
      const baseColor=CAT_COLORS[c.name]||FALLBACK_COLORS[i%FALLBACK_COLORS.length];
      const barColor=c.budget>0&&c.amount>c.budget?'var(--red)':baseColor;
      const note=c.budget>0?`<span style="font-size:11px;color:${c.amount>c.budget?'var(--red)':'var(--green)'};">${c.amount>c.budget?'▲초과 '+fmt(c.amount-c.budget):'▽여유 '+fmt(c.budget-c.amount)}</span>`:'';
      return `<div class="arch-cat-row">
        <div class="arch-cat-top">
          <span class="arch-cat-name">${c.name}</span>
          <div style="display:flex;align-items:center;gap:6px;">${note}<span class="arch-cat-amount">${fmt(c.amount)}</span></div>
        </div>
        <div class="arch-cat-bar-wrap"><div class="arch-cat-bar" style="width:${barPct}%;background:${barColor};"></div></div>
      </div>`;
    }).join('');
    const top5Expenses=(snap.ledgerEntries||[])
      .filter(e=>e.type==='expense'&&!e.creditAutoId
        &&!(e.category||'').includes('주거')
        &&!(e.category||'').includes('공과')
        &&!(e.category||'').includes('금융'))
      .sort((a,b)=>b.amount-a.amount)
      .slice(0,5);
    const ledRows=top5Expenses.map((e,i)=>{
      const dp=(e.date||'').split('-');
      const ds=dp.length===3?dp[1]+'/'+dp[2]:(e.date||'');
      const rankColors=['#A29BFE','#74B9FF','#43C98A','#FFB347','#F06292'];
      return `<div class="arch-led-row">
        <span class="arch-led-rank" style="width:20px;height:20px;border-radius:50%;background:${rankColors[i]};color:white;font-weight:800;font-size:11px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</span>
        <span class="arch-led-date">${ds}</span>
        <span class="arch-led-cat">${e.category||''}</span>
        <span class="arch-led-memo">${e.memo||''}</span>
        <span class="arch-led-amount" style="color:var(--red);">-${fmt(e.amount)}</span>
      </div>`;
    }).join('');
    const totalEntries=(snap.ledgerEntries||[]).filter(e=>e.type==='expense'&&!e.creditAutoId
      &&!(e.category||'').includes('주거')
      &&!(e.category||'').includes('공과')
      &&!(e.category||'').includes('금융')).length;
    return `<div class="arch-card" id="arch-card-${key}">
      <div class="arch-card-header" style="background:linear-gradient(135deg,${theme.t1}18,${theme.t2}22);" onclick="App._toggleArchiveCard('${key}')">
        <span class="arch-month-badge" style="background:linear-gradient(135deg,${theme.t1},${theme.t2});flex-shrink:0;">${y}년 ${m}월</span>
        <div class="arch-header-info">
          <span class="arch-closed-date" style="color:${theme.t1};opacity:.7;">📋 ${closedDate}</span>
          ${snap.note?`<span class="arch-note-inline" style="color:${theme.t1};" title="${snap.note}">${snap.note}</span>`:''}
        </div>
        <span class="arch-expand-arrow" id="arch-arrow-${key}">∨</span>
      </div>
      <div class="arch-card-body" id="arch-body-${key}" style="display:none;">
        ${(()=>{
          const archNet=(snap.ledgerIncome||0)-(snap.ledgerExpense||0);
          const archNetColor=archNet>=0?'var(--green)':'var(--red)';
          return `<div class="arch-stats-grid">
          <div class="arch-stat-box">
            <div class="arch-stat-label">💰 총 수입</div>
            <div class="arch-stat-val green">${fmt(snap.ledgerIncome||0)}</div>
          </div>
          <div class="arch-stat-box">
            <div class="arch-stat-label">💸 총 지출</div>
            <div class="arch-stat-val red">${fmt(snap.ledgerExpense||0)}</div>
          </div>
          <div class="arch-stat-box">
            <div class="arch-stat-label">🐷 저축액</div>
            <div class="arch-stat-val" style="color:#A29BFE;">${fmt(snap.savings||0)}</div>
          </div>
          <div class="arch-stat-box" style="background:${archNetColor}18;border:1.5px solid ${archNetColor}44;">
            <div class="arch-stat-label">📈 순자산 증감</div>
            <div class="arch-stat-val" style="color:${archNetColor};font-size:20px;font-weight:900;">${archNet>=0?'+':''} ${fmt(Math.abs(archNet))}</div>
          </div>
        </div>`;})()}
        ${cats5.length>0?`
        <div class="arch-section-title">📊 카테고리별 지출 <span style="font-size:10px;font-weight:400;color:var(--text-sub);">*주거/공과금, 금융 제외</span></div>
        <div class="arch-cat-list">${catRows}</div>`:''}
        ${top5Expenses.length>0?`
        <div class="arch-section-title">💸 지출 TOP 5 (총 ${totalEntries}건 중)</div>
        <div class="arch-led-list">${ledRows}</div>`:''}
        <div class="arch-card-footer">
          <button class="arch-delete-btn" onclick="App.deleteArchiveEntry('${key}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> 이 마감 삭제</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function _toggleArchiveCard(key){
  const body=document.getElementById('arch-body-'+key);
  const arrow=document.getElementById('arch-arrow-'+key);
  if(!body)return;
  const isOpen=body.style.display!=='none';
  body.style.display=isOpen?'none':'block';
  if(arrow)arrow.textContent=isOpen?'∨':'∧';
}

function deleteArchiveEntry(key){
  const [y,m]=key.split('-').map(Number);
  if(!confirm(`⚠️ ${y}년 ${m}월 마감 기록을 삭제할까요?\n\n삭제하면 복구할 수 없습니다.`))return;
  if(S.monthClosedArchive)delete S.monthClosedArchive[key];
  saveState();
  renderMonthlyArchive();
}


function renderAutoList(){
  const el=document.getElementById('ledger-auto-list');if(!el)return;
  const automations=S.automations||[];
  if(automations.length===0){
    el.innerHTML=`<div class="sub-empty" style="padding:16px 0;color:var(--text-sub);font-size:13px;">자동화를 추가하면 매달 지정일에 가계부에 자동 등록돼요.</div>`;return;
  }
  const active=automations.filter(a=>a.active!==false);
  const totalOut=active.filter(a=>(a.type||'expense')!=='income').reduce((s,a)=>s+a.amount,0);
  const totalIn=active.filter(a=>a.type==='income').reduce((s,a)=>s+a.amount,0);
  let summaryParts=[];
  if(totalOut>0)summaryParts.push(`<span style="color:var(--red);">지출 <strong>${fmt(totalOut)}</strong></span>`);
  if(totalIn>0)summaryParts.push(`<span style="color:var(--green);">수입 <strong>${fmt(totalIn)}</strong></span>`);
  const summary=summaryParts.length>0?`<div class="auto-summary-bar"><span class="badge-svg-icon" style="color:#F9A825;vertical-align:middle;">${_SVG_ICONS.lightning}</span> 활성 자동화 월 합계: ${summaryParts.join(' · ')}</div>`:'';
  const isIncome=a=>(a.type||'expense')==='income';
  el.innerHTML=summary+`<div class="auto-cards-grid">`+automations.map(a=>`
    <div class="auto-card ${a.active===false?'auto-inactive':''}">
      <div class="auto-card-strip ${isIncome(a)?'income':''}"></div>
      <div class="auto-card-body">
        <div class="auto-card-left">
          <div class="auto-card-name">
            <span style="flex-shrink:0;opacity:.75;">${_getCatSVG(a.category||'')}</span>
            <span style="overflow:hidden;text-overflow:ellipsis;">${a.memo||a.name||'—'}</span>
            <span class="auto-type-badge ${isIncome(a)?'income':'expense'}">${isIncome(a)?'수입':'지출'}</span>
          </div>
          <div class="auto-card-meta">
            <span>${a.category||''}</span>
            <span>·</span>
            <span>매월 <span class="auto-day-badge">${a.billingDay}일</span></span>
            ${a.startYear?`<span>·</span><span style="font-size:10px;">시작 ${a.startYear}.${String(a.startMonth||1).padStart(2,'0')}</span>`:''}
          </div>
        </div>
        <div class="auto-card-right">
          <div class="auto-card-amount ${isIncome(a)?'green':'red'}">${fmt(a.amount)}</div>
          <label class="auto-toggle-wrap"><input type="checkbox" ${a.active!==false?'checked':''} onchange="App.toggleAuto(${a.id},this.checked)"/>${a.active!==false?'활성':'중지'}</label>
          <button class="icon-btn" onclick="App.editAuto(${a.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="icon-btn" onclick="App.deleteAuto(${a.id})"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
        </div>
      </div>
    </div>`).join('')+`</div>`;
}

function editAuto(id){
  const a=(S.automations||[]).find(a=>a.id==id);if(!a)return;
  const today=new Date();
  document.getElementById('modal-auto-id').value=id;
  document.getElementById('ma2-type').value=a.type||'expense';
  document.getElementById('ma2-day').value=a.billingDay;
  document.getElementById('ma2-start-year').value=a.startYear||today.getFullYear();
  document.getElementById('ma2-start-month').value=a.startMonth||(today.getMonth()+1);
  const memoWithTags=(a.tags&&a.tags.length>0)?((a.memo||a.name||'')+(a.tags.map(t=>' #'+t).join(''))).trim():(a.memo||a.name||'');
  document.getElementById('ma2-memo').value=memoWithTags;
  document.getElementById('ma2-amount').value=(a.amount||0).toLocaleString('ko-KR');
  document.getElementById('modal-auto-edit-label').textContent='수정';
  _syncAutoModalCatSelect(a.category);
  openModal('auto');
}

function saveAuto(){
  const id=document.getElementById('modal-auto-id').value;
  const type=document.getElementById('ma2-type').value;
  const billingDay=parseInt(document.getElementById('ma2-day').value)||1;
  const today=new Date();
  const startYear=parseInt(document.getElementById('ma2-start-year').value)||today.getFullYear();
  const startMonth=parseInt(document.getElementById('ma2-start-month').value)||(today.getMonth()+1);
  const category=document.getElementById('ma2-cat-sel').value||(S.ledgerCategories&&S.ledgerCategories[0]?S.ledgerCategories[0].name:'📦 기타');
  const rawMemo=document.getElementById('ma2-memo').value.trim();
  const tags=extractTagsFromMemo(rawMemo);
  const memo=cleanMemoText(rawMemo);
  const amount=numInputParse(document.getElementById('ma2-amount').value);
  if(!memo||amount<=0)return alert('메모와 금액을 입력해주세요');
  if(!S.automations)S.automations=[];
  if(id){
    const a=S.automations.find(a=>a.id==id);
    if(a){a.type=type;a.billingDay=billingDay;a.startYear=startYear;a.startMonth=startMonth;a.category=category;a.memo=memo;a.tags=tags;a.amount=amount;a.name=memo;}
  } else {
    S.automations.push({id:genId(),type,billingDay,startYear,startMonth,category,memo,tags,amount,name:memo,active:true});
  }
  saveState();closeModal();
  const cm=S.currentMonths.ledger;
  applyLedgerAutomations(cm.y,cm.m);
  renderAutoList();renderLedger();renderDashboard();renderIncome();
}

function deleteAuto(id){
  if(!confirm('삭제하시겠어요?\n(지난 달 가계부 기록은 유지됩니다)'))return;
  const now=new Date();
  const curKey=mkey(now.getFullYear(),now.getMonth()+1);
  Object.keys(S.ledger).forEach(key=>{
    if(key>=curKey)S.ledger[key]=(S.ledger[key]||[]).filter(e=>e.autoLedgerId!==('auto_'+id+'_'+key));
  });
  S.automations=(S.automations||[]).filter(a=>a.id!=id);
  saveState();renderAutoList();renderLedger();renderDashboard();renderIncome();
}

function toggleAuto(id,active){
  const a=(S.automations||[]).find(a=>a.id==id);if(a)a.active=active;
  saveState();
  if(active){const cm=S.currentMonths.ledger;applyLedgerAutomations(cm.y,cm.m);}
  renderAutoList();renderLedger();renderDashboard();renderIncome();
}

function toggleLedgerAutoPanel(){
  const panel=document.getElementById('ledger-auto-panel');
  const arrow=document.getElementById('ledger-auto-arrow');
  if(!panel)return;
  const hidden=panel.style.display==='none'||!panel.style.display;
  panel.style.display=hidden?'block':'none';
  if(arrow)arrow.textContent=hidden?'∧':'∨';
  if(hidden){_syncAutoModalCatSelect('');renderAutoList();}
}

// ===== LEDGER CATEGORY MANAGEMENT (lcat) =====
function renderLcatPanel(){
  const panel=document.getElementById('lcat-panel');if(!panel)return;
  const cats=S.ledgerCategories||[];
  if(cats.length===0){
    panel.innerHTML=`<div class="lcat-empty">카테고리를 추가하세요. 가계부 항목 분류에 사용됩니다.</div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <input id="lcat-new-name" class="lq-input" placeholder="카테고리명" style="flex:1;"
          onkeydown="if(event.key==='Enter')App.addLcatEntry()"/>
        <button class="lq-add-btn" onclick="App.addLcatEntry()">추가</button>
      </div>`;
    return;
  }
  panel.innerHTML=`<div class="lcat-hint">💡 아이콘을 클릭하면 직접 고를 수 있어요</div><div class="lcat-list" id="lcat-list">${cats.map(c=>{
    return `<div class="lcat-row" data-drag-id="${c.id}">
      <button class="lcat-icon-trigger" title="아이콘 변경" onclick="App._openIconPicker(event,${c.id})">${_getCatSVG(c.name)}</button>
      <button class="lcat-color-trigger" title="색상" onclick="App._openColorPicker(event,${c.id})" style="background:${c.color||'transparent'};border:2px solid ${c.color?c.color+'88':'var(--border)'};width:16px;height:16px;min-width:16px;border-radius:50%;cursor:pointer;flex-shrink:0;padding:0;"></button>
      <input class="lcat-name-input" type="text" value="${c.name}"
        onchange="App.saveLcatName(${c.id},this.value)"
        onkeydown="if(event.key==='Enter')this.blur()"/>
      <button class="icon-btn lcat-del-btn" onclick="App.deleteLcatEntry(${c.id})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
    </div>`;}).join('')}
  </div>
  <div style="display:flex;gap:8px;margin-top:10px;">
    <input id="lcat-new-name" class="lq-input" placeholder="새 카테고리명" style="flex:1;"
      onkeydown="if(event.key==='Enter')App.addLcatEntry()"/>
    <button class="lq-add-btn" onclick="App.addLcatEntry()">추가</button>
  </div>`;

  // 빠른입력 & 수정모달 카테고리 셀렉트를 S.ledgerCategories로 통일
  _syncLedgerCatSelects();
  _syncAutoModalCatSelect('');
}

function addLcatEntry(){
  const inp=document.getElementById('lcat-new-name');if(!inp)return;
  const name=inp.value.trim();if(!name)return alert('카테고리명을 입력해주세요');
  if(!S.ledgerCategories)S.ledgerCategories=[];
  if(S.ledgerCategories.some(c=>c.name===name))return alert('이미 있는 카테고리입니다');
  S.ledgerCategories.push({id:genId(),name,isSavings:false});
  saveState();renderLcatPanel();
}

function deleteLcatEntry(id){
  if(!confirm('카테고리를 삭제하시겠어요?'))return;
  S.ledgerCategories=(S.ledgerCategories||[]).filter(c=>c.id!=id);
  saveState();renderLcatPanel();
}

function toggleLcatSavings(id,checked){
  const c=(S.ledgerCategories||[]).find(c=>c.id==id);if(!c)return;
  c.isSavings=checked;
  saveState();renderLcatPanel();renderSavingsRate();renderDashboard();
}

function saveLcatName(id,name){
  const c=(S.ledgerCategories||[]).find(c=>c.id==id);if(!c)return;
  const newName=name.trim();if(!newName||newName===c.name)return;
  const oldName=c.name;
  c.name=newName;
  // 가계부 항목 일괄 반영: categoryId 또는 이름 일치하는 모든 항목
  Object.keys(S.ledger||{}).forEach(key=>{
    (S.ledger[key]||[]).forEach(e=>{
      if(e.categoryId==id||e.category===oldName)e.category=newName;
    });
  });
  // 변동지출 항목 일괄 반영
  Object.keys(S.monthlyData||{}).forEach(key=>{
    const d=S.monthlyData[key];if(!d)return;
    (d.variable||[]).forEach(v=>{if(v.category===oldName)v.category=newName;});
  });
  // 예산현황 연동 카테고리 배열 반영
  (S.budgetCategories||[]).forEach(bc=>{
    if(!bc.linkedCategories)return;
    bc.linkedCategories=bc.linkedCategories.map(n=>n===oldName?newName:n);
  });
  saveState();
  renderLcatPanel();
  renderDashboard();
  renderLedger();
}

function toggleLcatPanel(){
  const panel=document.getElementById('lcat-panel');
  const arrow=document.getElementById('lcat-panel-arrow');
  if(!panel)return;
  const hidden=panel.style.display==='none'||!panel.style.display;
  panel.style.display=hidden?'block':'none';
  if(arrow)arrow.textContent=hidden?'∧':'∨';
  if(hidden)renderLcatPanel();
}

// ===== KEYWORD RULES =====
function toggleKwRulePanel(){
  const panel=document.getElementById('kw-rule-panel');
  const arrow=document.getElementById('kw-rule-arrow');
  if(!panel)return;
  const hidden=panel.style.display==='none'||!panel.style.display;
  panel.style.display=hidden?'block':'none';
  if(arrow)arrow.textContent=hidden?'∧':'∨';
  if(hidden)renderKwRulePanel();
}

function renderKwRulePanel(){
  const panel=document.getElementById('kw-rule-panel');if(!panel)return;
  const rules=S.keywordRules||[];
  const cats=(S.ledgerCategories||[]).map(c=>c.name);
  const catOpts=cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  const chipsHTML=rules.length===0
    ?'<div class="lcat-empty" style="margin-bottom:10px;">키워드 규칙이 없어요. 아래서 추가해보세요!</div>'
    :`<div class="kw-chips-wrap">${rules.map(r=>{
        const catEmoji=(r.category||'').match(/\p{Extended_Pictographic}/u);
        return `<span class="kw-chip">
          <span class="kw-chip-kw">${r.keyword}</span>
          ${r.tag?`<span class="kw-chip-tag">${r.tag}</span>`:''}
          ${r.category?`<span class="kw-chip-cat">${catEmoji?catEmoji[0]:r.category.split(' ').pop()}</span>`:''}
          <button class="kw-chip-del" onclick="App.deleteKwRule(${r.id})" title="삭제">×</button>
        </span>`;
      }).join('')}</div>`;
  panel.innerHTML=`
    <div style="font-size:11.5px;color:var(--text-sub);margin-bottom:8px;">항목명에 키워드가 포함되면 태그·카테고리를 자동으로 설정해요.</div>
    ${chipsHTML}
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;align-items:flex-end;">
      <div style="flex:1;min-width:80px;"><div style="font-size:11px;color:var(--text-sub);margin-bottom:3px;">키워드</div>
        <input id="kw-new-keyword" class="lq-input" placeholder="스타벅스" style="width:100%;"/></div>
      <div style="flex:1;min-width:70px;"><div style="font-size:11px;color:var(--text-sub);margin-bottom:3px;">태그</div>
        <input id="kw-new-tag" class="lq-input" placeholder="#카페" style="width:100%;"/></div>
      <div style="flex:1;min-width:90px;"><div style="font-size:11px;color:var(--text-sub);margin-bottom:3px;">카테고리</div>
        <select id="kw-new-cat" class="lq-input" style="width:100%;"><option value="">선택 안함</option>${catOpts}</select></div>
      <button class="lq-add-btn" onclick="App.addKwRule()">추가</button>
    </div>`;
}

function addKwRule(){
  const kw=(document.getElementById('kw-new-keyword').value||'').trim();
  if(!kw)return alert('키워드를 입력해주세요');
  let tag=(document.getElementById('kw-new-tag').value||'').trim();
  if(tag&&!tag.startsWith('#'))tag='#'+tag;
  const cat=document.getElementById('kw-new-cat').value||'';
  if(!S.keywordRules)S.keywordRules=[];
  if(S.keywordRules.some(r=>r.keyword===kw))return alert('이미 등록된 키워드예요');
  S.keywordRules.push({id:genId(),keyword:kw,tag,category:cat});
  saveState();renderKwRulePanel();
}

function deleteKwRule(id){
  S.keywordRules=(S.keywordRules||[]).filter(r=>r.id!=id);
  saveState();renderKwRulePanel();
}

// 키워드 규칙 자동 적용 (메모 입력 시)
function _applyKwRules(memoVal){
  const hintEl=document.getElementById('kw-auto-hint');
  const rules=S.keywordRules||[];
  const text=(memoVal||'').replace(/#\S+/g,'').trim();
  if(!rules.length||!text){
    if(hintEl)hintEl.classList.remove('visible');
    return;
  }
  const matched=rules.filter(r=>r.keyword&&text.toLowerCase().includes(r.keyword.toLowerCase()));
  if(!matched.length){
    if(hintEl)hintEl.classList.remove('visible');
    return;
  }
  // 카테고리 자동 설정
  const firstCat=matched.find(r=>r.category)?.category;
  if(firstCat){const sel=document.getElementById('lq-category');if(sel)sel.value=firstCat;}
  // 힌트 표시
  const hints=matched.map(r=>[r.tag,r.category?r.category.split(' ')[0]:''].filter(Boolean).join(' '));
  if(hintEl){hintEl.textContent='⚡ 자동 적용: '+hints.join(' · ');hintEl.classList.add('visible');}
}

// ===== MONTH NAVIGATION =====
function changeMonth(dir,section){
  const ref=S.currentMonths[section];
  ref.m+=dir;
  if(ref.m>12){ref.m=1;ref.y++;}
  if(ref.m<1){ref.m=12;ref.y--;}
  ['dashboard','income','credit','food','ledger'].forEach(s=>{S.currentMonths[s]={y:ref.y,m:ref.m};});
  S.ledgerFilter=null;
  S.ledgerTagFilter=null;
  currentFoodPanel=null;
  applyMonthTheme(ref.m);
  saveState();renderAll();
}

function changeCalYear(dir){S.calYear+=dir;saveState();renderCalendar();}

// ===== MOBILE SIDEBAR =====
function toggleSsbItem(id){
  const content=document.getElementById(id);
  const arrow=document.getElementById(id+'-arrow');
  if(!content)return;
  const isOpen=content.style.display==='block';
  // 모두 닫기
  ['ssb-theme'].forEach(k=>{
    const el=document.getElementById(k);
    const ar=document.getElementById(k+'-arrow');
    if(el)el.style.display='none';
    if(ar)ar.classList.remove('open');
  });
  // 클릭한 것 토글
  if(!isOpen){
    content.style.display='block';
    if(arrow)arrow.classList.add('open');
  }
}

function toggleSidebar(){
  const sidebar=document.getElementById('sidebar');
  const overlay=document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar(){
  const sidebar=document.getElementById('sidebar');
  const overlay=document.getElementById('sidebar-overlay');
  if(sidebar)sidebar.classList.remove('open');
  if(overlay)overlay.classList.remove('active');
}

// ===== LEDGER EXCEL EXPORT =====
function exportLedgerExcel(){
  const cm=S.currentMonths.ledger;
  const key=mkey(cm.y,cm.m);
  const entries=S.ledger[key]||[];
  if(entries.length===0){alert('이번 달 가계부에 데이터가 없습니다.');return;}

  // 날짜 기준 정렬
  const sorted=[...entries].sort((a,b)=>(a.date||'').localeCompare(b.date||''));

  // 데이터 행 생성
  const rows=sorted.map(e=>{
    const isInc=e.type==='income';
    return {
      '날짜': e.date||'',
      '유형': isInc?'수입':'지출',
      '카테고리': e.category||'',
      '내용': e.memo||e.name||'',
      '태그': (e.tags||[]).join(', '),
      '수입(원)': isInc?e.amount:0,
      '지출(원)': !isInc?e.amount:0,
      '메모': e.note||'',
    };
  });

  // 합계 행
  const totalIn=sorted.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const totalOut=sorted.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  rows.push({});
  rows.push({'날짜':'합계','유형':'','카테고리':'','내용':'','태그':'','수입(원)':totalIn,'지출(원)':totalOut,'메모':''});

  // SheetJS로 엑셀 생성
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');return;}
  const ws=XLSX.utils.json_to_sheet(rows,{header:['날짜','유형','카테고리','내용','태그','수입(원)','지출(원)','메모']});
  // 컬럼 너비 설정
  ws['!cols']=[{wch:12},{wch:6},{wch:14},{wch:24},{wch:16},{wch:12},{wch:12},{wch:20}];
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,cm.y+'년 '+cm.m+'월');
  XLSX.writeFile(wb,'가계부_'+cm.y+'년_'+cm.m+'월.xlsx');
}

// ===== MONTHLY REPORT IMAGE =====
async function downloadMonthlyReport(){
  const btn=document.querySelector('.report-btn');
  if(btn){btn.textContent='⏳ 생성 중...';btn.disabled=true;}
  try{
    if(!window.html2canvas){
      await new Promise((res,rej)=>{
        const s=document.createElement('script');
        s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        s.onload=res;s.onerror=rej;document.head.appendChild(s);
      });
    }
    const cm=S.currentMonths.dashboard;
    const y=cm.y,m=cm.m;
    let py=y,pm=m-1;if(pm<1){pm=12;py--;}
    const prevKey=mkey(py,pm);
    const totalIncome=getTotalIncome(y,m);
    const totalFixed=getTotalFixed(y,m);
    const totalVar=getTotalVariable(y,m);
    const foodTotal=getFoodTotal(y,m);
    const totalSavings=getTotalSavings(y,m);
    // 가계부에 식비 기록이 있으면 foodTotal은 이미 totalVar에 포함돼 있으므로 별도 합산 제외
    const ledgerFoodCats=['식비','🍚 식비'];
    const ledgerKey=mkey(y,m);
    const ledgerFoodTotal=(S.ledger[ledgerKey]||[])
      .filter(e=>e.type==='expense'&&!e.creditAutoId&&ledgerFoodCats.includes(e.category))
      .reduce((s,e)=>s+e.amount,0);
    const hasLedgerFood=ledgerFoodTotal>0;
    // 가계부 식비 기록이 있으면 foodTotal 중복 제외, 없으면 식비 캘린더 사용
    const totalExpense=totalFixed+totalVar+(hasLedgerFood?0:foodTotal);
    const remaining=totalIncome-totalExpense;
    const savingsRate=totalIncome>0?(totalSavings/totalIncome*100):0;
    const stockVal=getTotalStockValue();
    const assetTotal=getTotalAssets();
    const prevIncome=S.monthlyData[prevKey]?getTotalIncome(py,pm):0;
    const prevLedgerFoodTotal=(S.ledger[mkey(py,pm)]||[])
      .filter(e=>e.type==='expense'&&!e.creditAutoId&&ledgerFoodCats.includes(e.category))
      .reduce((s,e)=>s+e.amount,0);
    const prevHasLedgerFood=prevLedgerFoodTotal>0;
    const prevExpense=S.monthlyData[prevKey]?(getTotalFixed(py,pm)+getTotalVariable(py,pm)+(prevHasLedgerFood?0:getFoodTotal(py,pm))):0;
    const prevSavings=S.monthlyData[prevKey]?getTotalSavings(py,pm):0;
    const netChange=remaining-(prevIncome>0?prevIncome-prevExpense:0);
    const entries=S.ledger[ledgerKey]||[];
    // [수정] 가계부 실적 기준 수입/지출 (신용카드 자동항목 포함, 대시보드와 동일 기준)
    const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
    const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
    const ledRemaining=ledIn-ledOut;
    const ledSavingsRate=ledIn>0?(totalSavings/ledIn*100):0;
    const expEntries=entries.filter(e=>e.type==='expense'&&!e.creditAutoId);
    const daysInMonth=new Date(y,m,0).getDate();
    const zeroDays=daysInMonth-new Set(expEntries.map(e=>e.date)).size;
    const avgPerDay=expEntries.length>0?Math.round(ledOut/daysInMonth):0;
    // 소비 분석 데이터
    const analysisData=getMonthAnalysisData(y,m);
    const{natureMap,totalExpense:analysisTotalExp,ledgerEntries}=analysisData;
    const _anaDataForDash=getMonthAnalysisData(y,m);
    const{score:consumeScore,grade:consumeGrade,feedback:consumeFeedback}=calcConsumeScore(natureMap,_anaDataForDash.totalIncome||analysisTotalExp);
    const prevConsumeScore=_getPrevScore(y,m);
    const prevScoreDiff=prevConsumeScore!=null?consumeScore-prevConsumeScore:null;
    const natDef=[
      {key:'필수',label:'필수지출',icon:'🏠',bg:'#F0EEFF',bar:'#A29BFE'},
      {key:'생활',label:'생활지출',icon:'🍴',bg:'#E8F8F0',bar:'#43C98A'},
      {key:'투자',label:'저축·투자',icon:'📈',bg:'#EBF5FF',bar:'#74B9FF'},
      {key:'특별',label:'특별지출',icon:'✈',bg:'#FFF8E1',bar:'#FFB347'},
    ];
    // 소비 패턴 인사이트 (태그 기반)
    const tagCnt={};const tagAmt={};
    ledgerEntries.forEach(e=>(e.tags||[]).forEach(t=>{tagCnt[t]=(tagCnt[t]||0)+1;tagAmt[t]=(tagAmt[t]||0)+e.amount;}));
    const insightTags=Object.entries(tagCnt).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const insightHtml=insightTags.map(([t,cnt])=>{
      const amt=tagAmt[t]||0;
      return`<div style="flex:1;background:#F7F4FF;border-radius:10px;padding:12px 14px;border:1.5px solid #EEE9FF;display:flex;align-items:center;gap:12px;"><span style="font-size:22px;flex-shrink:0;">🏷️</span><span style="font-size:12px;color:#444;line-height:1.6;">#${t} ${cnt}회 지출, ${Math.round(amt).toLocaleString('ko-KR')}원 — 소비 패턴을 확인해 보세요.</span></div>`;
    }).join('');
    // Top spending by category — 변동지출 + 식비만 집계 (고정지출 제외), 주거/공과금·금융 제외
    const catMap={};
    getEffectiveVariable(y,m).forEach(v=>{
      // 식비는 아래에서 effectiveFoodTotal로 통합 처리
      const catName=v.category;
      if(catName==='식비'||catName==='🍚 식비')return;
      // [수정] 한달 요약 TOP소비: 주거/공과금, 금융 제외
      if(catName.includes('주거')||catName.includes('공과')||catName.includes('금융'))return;
      catMap[catName]=(catMap[catName]||0)+(parseFloat(v.amount)||0);
    });
    // 식비: 가계부 기록이 있으면 가계부 기준, 없으면 식비 캘린더 기준
    const effectiveFoodTotal=hasLedgerFood?ledgerFoodTotal:foodTotal;
    if(effectiveFoodTotal>0)catMap['🍚 식비']=(catMap['🍚 식비']||0)+effectiveFoodTotal;
    const catEntries=Object.entries(catMap).sort((a,b)=>b[1]-a[1]);
    const top3=catEntries.slice(0,3);
    // 6-month trend
    const trend=[];
    for(let i=5;i>=0;i--){
      let ty=y,tm=m-i;
      while(tm<1){tm+=12;ty--;}
      const tKey=mkey(ty,tm);
      const tData=S.monthlyData[tKey];
      const tLedgerFood=(S.ledger[tKey]||[]).filter(e=>e.type==='expense'&&!e.creditAutoId&&ledgerFoodCats.includes(e.category)).reduce((s,e)=>s+e.amount,0);
      const tTotal=tData?(getTotalFixed(ty,tm)+getTotalVariable(ty,tm)+(tLedgerFood>0?0:getFoodTotal(ty,tm))):null;
      trend.push({y:ty,m:tm,total:tTotal});
    }
    const trendMax=Math.max(...trend.map(t=>t.total||0),1);
    const COLORS=['#A29BFE','#74B9FF','#43C98A','#FFB347','#F06292','#4DB6AC','#CE93D8','#FDCB6E'];
    // Donut SVG
    const donutCats=catEntries.slice(0,6).map((c,i)=>({name:c[0],value:c[1],color:COLORS[i%COLORS.length]}));
    const donutTotal=donutCats.reduce((s,c)=>s+c.value,0)||1;
    const R=58,CX=70,CY=70,CIRC=2*Math.PI*R;
    let donutPaths='',donutOffset=-CIRC/4;
    donutCats.forEach(c=>{
      const pct=c.value/donutTotal;
      const dash=pct*CIRC;
      const gap=CIRC-dash;
      donutPaths+=`<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${c.color}" stroke-width="22" stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}" stroke-dashoffset="${donutOffset.toFixed(1)}"/>`;
      donutOffset-=dash;
    });
    const donutSVG=`<svg width="140" height="140" viewBox="0 0 140 140">${donutPaths}<text x="${CX}" y="${CY-6}" text-anchor="middle" font-size="10" font-weight="800" fill="#2D2D3A" font-family="Apple SD Gothic Neo,Noto Sans KR,sans-serif">총 지출</text><text x="${CX}" y="${CY+8}" text-anchor="middle" font-size="9" fill="#9490A8" font-family="Apple SD Gothic Neo,Noto Sans KR,sans-serif">${Math.round(ledOut).toLocaleString('ko-KR')}원</text></svg>`;
    // Tips
    // Goals
    const goals=S.savingsGoals[y]||[];
    const pendingGoals=goals.filter(g=>g.saved<g.target).slice(0,3);
    const defaultGoals=['변동지출 계획 세우기','식비 예산 설정해보기','투자 비중 늘리기'];
    const goalsList=pendingGoals.length>0?pendingGoals.map(g=>g.name):defaultGoals;
    // 전월 카테고리 맵 (TOP 소비 증감 비교용)
    const prevCatMap={};
    if(S.monthlyData[prevKey]){
      getEffectiveVariable(py,pm).forEach(v=>{
        const cn=v.category;
        if(cn==='식비'||cn==='🍚 식비')return;
        prevCatMap[cn]=(prevCatMap[cn]||0)+(parseFloat(v.amount)||0);
      });
      const prevFoodAmt=getFoodTotal(py,pm);
      if(prevFoodAmt>0)prevCatMap['🍚 식비']=(prevCatMap['🍚 식비']||0)+prevFoodAmt;
    }
    // Fixed expense list
    const fixedItems=getMonthData(y,m).fixed;
    const now=new Date();
    const nowStr=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0')+' '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');

    const W=900;
    const html=`
<div style="width:${W}px;font-family:'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif;background:#fff;color:#2D2D3A;line-height:1.4;">
  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,${(MONTH_THEMES[m]||MONTH_THEMES[5]).t1} 0%,${(MONTH_THEMES[m]||MONTH_THEMES[5]).t2} 100%);padding:28px 36px;color:white;display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <div style="font-size:12px;font-weight:600;opacity:.8;margin-bottom:6px;">💜 월간 재무 리포트</div>
      <div style="font-size:32px;font-weight:900;letter-spacing:-1px;margin-bottom:4px;">${y}년 ${m}월</div>
      <div style="font-size:13px;background:rgba(255,255,255,.18);display:inline-block;padding:4px 14px;border-radius:20px;">한눈에 보는 나의 재무 현황</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;opacity:.75;margin-bottom:4px;">생성일 ${nowStr}</div>
      <div style="font-size:15px;font-weight:800;background:rgba(255,255,255,.2);padding:6px 14px;border-radius:12px;">💰 MoneyLog</div>
    </div>
  </div>
  <!-- STAT ROW -->
  <div style="display:flex;gap:10px;padding:20px 24px 8px;background:#F7F4FF;">
    ${[
      {label:'총 수입',value:fmt(ledIn),color:'#43C98A',change:'가계부 기준',up:true},
      {label:'총 지출',value:fmt(ledOut),color:'#F06292',change:'가계부 기준',up:true},
      {label:'총 저축(적금 포함)',value:fmt(totalSavings),color:'#A29BFE',change:prevSavings?fmtSigned(totalSavings-prevSavings):'—',up:totalSavings>=prevSavings},
      {label:'순자산 변화',value:(ledRemaining>=0?'+':'')+fmt(Math.abs(ledRemaining)),color:ledRemaining>=0?'#43C98A':'#F06292',change:'지난달 대비',up:true},
      {label:'이번 달 잔액',value:fmt(Math.abs(ledRemaining)),color:'#FFB347',change:'저축률',up:true,sub:ledSavingsRate.toFixed(1)+'%'},
    ].map(s=>`
      <div style="flex:1;background:white;border-radius:14px;padding:14px 16px;box-shadow:0 2px 12px rgba(162,155,254,.12);border:1.5px solid #EEE9FF;">
        <div style="font-size:11px;color:#9490A8;font-weight:600;margin-bottom:6px;">${s.label}</div>
        <div style="font-size:17px;font-weight:900;color:${s.color};margin-bottom:4px;">${s.value}</div>
        <div style="font-size:10px;color:#9490A8;">${s.sub||s.change}</div>
      </div>`).join('')}
  </div>
  <!-- 일평균 지출 + 무지출 날수 -->
  <div style="display:flex;gap:10px;padding:4px 24px 14px;background:#F7F4FF;">
    <div style="flex:1;background:white;border-radius:12px;padding:12px 16px;border:1.5px solid #EEE9FF;box-shadow:0 2px 8px rgba(162,155,254,.10);display:flex;align-items:center;gap:12px;">
      <div style="font-size:22px;">📅</div>
      <div>
        <div style="font-size:10px;color:#9490A8;font-weight:600;margin-bottom:3px;">일평균 지출</div>
        <div style="font-size:16px;font-weight:900;color:#F06292;">${avgPerDay>0?fmt(avgPerDay):'—'}</div>
      </div>
    </div>
    <div style="flex:1;background:white;border-radius:12px;padding:12px 16px;border:1.5px solid #EEE9FF;box-shadow:0 2px 8px rgba(162,155,254,.10);display:flex;align-items:center;gap:12px;">
      <div style="font-size:22px;">🏆</div>
      <div>
        <div style="font-size:10px;color:#9490A8;font-weight:600;margin-bottom:3px;">무지출 날수</div>
        <div style="font-size:16px;font-weight:900;color:#43C98A;">${zeroDays}일 <span style="font-size:11px;color:#9490A8;font-weight:500;">/ ${daysInMonth}일 중</span></div>
      </div>
    </div>
    <div style="flex:3;"></div>
  </div>
  <!-- 지출구조 + 저축투자 -->
  <div style="display:flex;gap:16px;padding:16px 24px;background:#F7F4FF;">
    <!-- Donut -->
    <div style="flex:1.1;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
      <div style="font-size:13px;font-weight:800;margin-bottom:14px;">지출 구조</div>
      <div style="display:flex;align-items:center;gap:16px;">
        ${donutSVG}
        <div style="flex:1;">
          ${donutCats.map((c,i)=>{
            const pct=ledOut>0?(c.value/ledOut*100).toFixed(1):0;
            return `<div style="display:flex;align-items:center;gap:7px;margin-bottom:8px;font-size:12px;">
              <div style="width:10px;height:10px;border-radius:50%;background:${c.color};flex-shrink:0;"></div>
              <span style="font-weight:600;">${c.name}</span>
              <span style="margin-left:auto;font-weight:800;color:#2D2D3A;">${Math.round(c.value).toLocaleString('ko-KR')}원</span>
              <span style="color:#9490A8;min-width:38px;text-align:right;">(${pct}%)</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
    <!-- 저축&투자 -->
    <div style="flex:1;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
      <div style="font-size:13px;font-weight:800;margin-bottom:14px;">저축 &amp; 투자 현황</div>
      <div style="margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
          <span style="font-size:12px;font-weight:600;flex-shrink:0;">적금(저축)</span>
          <span style="font-size:12px;font-weight:800;color:#A29BFE;">${fmt(totalSavings)} / ${fmt(totalIncome)}</span>
          <span style="font-size:12px;font-weight:800;color:#A29BFE;margin-left:auto;">${savingsRate.toFixed(1)}%</span>
        </div>
        <div style="height:9px;background:#EEE9FF;border-radius:5px;overflow:hidden;">
          <div style="height:100%;width:${Math.min(100,savingsRate)}%;background:linear-gradient(90deg,#A29BFE,#6C5CE7);border-radius:5px;"></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
        <span style="font-size:12px;font-weight:600;">주식 투자 평가액</span>
        <span style="font-size:13px;font-weight:800;color:#4DB6AC;">${fmt(stockVal)}</span>
      </div>
      <div style="height:9px;background:#E0F7F5;border-radius:5px;overflow:hidden;margin-bottom:14px;">
        <div style="height:100%;width:${totalIncome>0?Math.min(100,stockVal/totalIncome*100):0}%;background:linear-gradient(90deg,#4DB6AC,#26A69A);border-radius:5px;"></div>
      </div>
      <div style="font-size:13px;font-weight:800;margin-bottom:8px;color:#9490A8;">자산 현황</div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px dashed #EEE9FF;font-size:12px;">
        <span>🏦 총 자산</span><span style="font-weight:700;color:#64B5F6;">${fmt(assetTotal)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px;">
        <span>📈 주식 평가액</span><span style="font-weight:700;color:#4DB6AC;">${fmt(stockVal)}</span>
      </div>
    </div>
  </div>
  <!-- TOP소비 + 6개월추이 (고정지출 제거) -->
  <div style="display:flex;gap:16px;padding:0 24px 16px;background:#F7F4FF;">
    <!-- TOP소비 -->
    <div style="flex:1.2;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
      <div style="font-size:13px;font-weight:800;margin-bottom:4px;">이번 달 TOP 소비</div>
      <div style="font-size:10px;color:#9490A8;margin-bottom:12px;">*주거/공과금, 금융 제외</div>
      ${top3.map((c,i)=>{
        const pct=ledOut>0?(c[1]/ledOut*100).toFixed(1):0;
        const rankColors=['#A29BFE','#74B9FF','#43C98A'];
        const prevAmt=prevCatMap[c[0]]||0;
        const hasPrev=Object.keys(prevCatMap).length>0&&prevAmt>0;
        const diff=hasPrev?c[1]-prevAmt:null;
        const diffStr=diff!==null?(diff>0?`▲${Math.round(Math.abs(diff)/1000)}k`:`▽${Math.round(Math.abs(diff)/1000)}k`):'';
        const diffColor=diff!==null?(diff>0?'#F06292':'#43C98A'):'';
        return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:${i<2?'1px dashed #F0EBF8':'none'};">
          <div style="width:26px;height:26px;border-radius:50%;background:${rankColors[i]};color:white;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${c[0]}</div>
            <div style="font-size:10px;color:#9490A8;">${fmt(c[1])} (${pct}%)${diffStr?` <span style="color:${diffColor};font-weight:700;">${diffStr}</span>`:''}</div>
          </div>
          <div style="height:6px;width:70px;background:#F0EBF8;border-radius:4px;overflow:hidden;flex-shrink:0;">
            <div style="height:100%;width:${Math.min(100,pct)}%;background:${rankColors[i]};border-radius:4px;"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
    <!-- 6개월추이 -->
    <div style="flex:1;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
      <div style="font-size:13px;font-weight:800;margin-bottom:14px;">지출 추이 (최근 6개월)</div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:110px;">
        ${trend.map(t=>{
          const barH=t.total!=null?Math.max(8,Math.round((t.total/trendMax)*90)):0;
          const isCurrent=(t.y===y&&t.m===m);
          return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="font-size:9px;color:${isCurrent?'#5E4BC4':'#9490A8'};font-weight:${isCurrent?700:400};">${t.total!=null?Math.round(t.total/10000)+'만':'-'}</div>
            <div style="width:100%;background:${isCurrent?'#A29BFE':'#DDD9F5'};border-radius:4px 4px 0 0;height:${barH}px;"></div>
            <div style="font-size:9px;color:${isCurrent?'#5E4BC4':'#9490A8'};font-weight:${isCurrent?700:400};">${t.m}월</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>
  <!-- 이달의 소비 분석 -->
  <div style="padding:0 24px 16px;background:#F7F4FF;">
    <div style="font-size:14px;font-weight:800;margin-bottom:12px;display:flex;align-items:center;gap:6px;">📊 이달의 소비 분석</div>
    <div style="display:flex;gap:16px;margin-bottom:14px;">
      <!-- 소비 균형 점수 -->
      <div style="flex:1;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
        <div style="font-size:11px;font-weight:700;color:#9490A8;margin-bottom:14px;">🎯 소비 균형 점수</div>
        <div style="display:flex;align-items:baseline;gap:3px;margin-bottom:8px;">
          <span style="font-size:54px;font-weight:900;color:#FFB347;line-height:1;">${consumeScore}</span>
          <span style="font-size:20px;font-weight:900;color:#FFB347;">점</span>
        </div>
        <div style="display:inline-flex;align-items:center;gap:5px;background:#FFF8E1;border-radius:20px;padding:4px 12px;font-size:13px;font-weight:700;color:#D4820A;margin-bottom:12px;">${consumeGrade}</div>
        <div style="height:10px;background:#EEE9FF;border-radius:6px;overflow:hidden;margin-bottom:8px;">
          <div style="height:100%;width:${Math.min(100,consumeScore)}%;background:linear-gradient(90deg,#A29BFE,#FFB347);border-radius:6px;"></div>
        </div>
        <div style="font-size:12px;color:#9490A8;margin-bottom:12px;">
          ${prevConsumeScore!=null?`지난달 ${prevConsumeScore}점 대비 <span style="color:${prevScoreDiff>=0?'#43C98A':'#F06292'};font-weight:700;">${prevScoreDiff>=0?'↑':'↓'} ${Math.abs(prevScoreDiff)}점 ${prevScoreDiff>=0?'상승':'하락'}</span>`:'첫 달 분석입니다.'}
        </div>
        <div style="background:#F0EEFF;border-radius:10px;padding:10px 14px;font-size:12px;color:#5E4BC4;line-height:1.9;">
          ${consumeFeedback.slice(0,2).map(f=>`• ${f}`).join('<br/>')}
        </div>
      </div>
      <!-- 지출 성격 분류 -->
      <div style="flex:2.3;background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
        <div style="font-size:11px;font-weight:700;color:#9490A8;margin-bottom:14px;">📂 지출 성격 분류</div>
        <div style="display:flex;gap:10px;">
          ${natDef.map(n=>{
            const amt=natureMap[n.key]||0;
            const pct=analysisTotalExp>0?Math.round(amt/analysisTotalExp*100):0;
            let py2=y,pm2=m-1;if(pm2<1){pm2=12;py2--;}
            const{natureMap:pnm,totalExpense:pte}=getMonthAnalysisData(py2,pm2);
            const prevPct=pte>0?Math.round((pnm[n.key]||0)/pte*100):0;
            const isUp=pct>prevPct;
            return `<div style="flex:1;background:${n.bg};border-radius:12px;padding:14px 14px;border:1.5px solid rgba(0,0,0,.05);">
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:10px;">
                <span style="font-size:14px;">${n.icon}</span>
                <span style="font-size:11px;font-weight:700;color:#2D2D3A;">${n.label}</span>
              </div>
              <div style="font-size:30px;font-weight:900;color:${n.bar};line-height:1;margin-bottom:9px;">${pct}%</div>
              <div style="height:7px;background:rgba(0,0,0,.06);border-radius:4px;overflow:hidden;margin-bottom:8px;">
                <div style="height:100%;width:${Math.min(100,pct*1.8)}%;background:${n.bar};border-radius:4px;"></div>
              </div>
              <div style="font-size:10px;color:#9490A8;margin-bottom:2px;">${Math.round(amt).toLocaleString('ko-KR')}원</div>
              <div style="font-size:10px;font-weight:600;color:${isUp?'#F06292':'#43C98A'};">${isUp?'↑':'↓'}전월 ${prevPct}%</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
    <!-- 소비 패턴 인사이트 -->
    <div style="background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
      <div style="font-size:13px;font-weight:800;margin-bottom:12px;">💡 소비 패턴 인사이트</div>
      <div style="display:flex;gap:12px;">${insightHtml||'<div style="flex:1;background:#F7F4FF;border-radius:10px;padding:12px 14px;font-size:12px;color:#9490A8;">이번 달 태그 데이터가 없습니다.</div>'}</div>
    </div>
  </div>

  <!-- TOP5 태그 -->
  ${(()=>{
    const tagCount={};const tagAmount={};
    (S.ledger[ledgerKey]||[]).filter(e=>e.type==='expense').forEach(e=>(e.tags||[]).forEach(t=>{
      tagCount[t]=(tagCount[t]||0)+1;
      tagAmount[t]=(tagAmount[t]||0)+e.amount;
    }));
    const top5=Object.entries(tagCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
    if(top5.length===0)return '';
    return `<div style="padding:10px 24px 16px;background:#F7F4FF;">
      <div style="background:white;border-radius:16px;padding:18px 20px;border:1.5px solid #EEE9FF;box-shadow:0 2px 12px rgba(162,155,254,.10);">
        <div style="font-size:13px;font-weight:800;margin-bottom:12px;">🏷️ 이달의 주요 태그 TOP5</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${top5.map(([t,cnt],i)=>{
            const palBg=['#F0EEFF','#EBF5FF','#E8F5EE','#FFF8EE','#FFF0F5'];
            const palColor=['#6C5CE7','#1565C0','#2E8B57','#D4820A','#C0396C'];
            const amt=tagAmount[t]||0;
            return `<div style="display:flex;align-items:center;gap:6px;background:${palBg[i]};color:${palColor[i]};border-radius:20px;padding:6px 14px;font-size:13px;font-weight:700;">
              <span style="font-size:12px;background:${palColor[i]};color:white;border-radius:50%;width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;">${i+1}</span>
              #${t}
              <span style="font-size:11px;opacity:.7;">${cnt}회</span>
              <span style="font-size:11px;font-weight:800;color:${palColor[i]};">${amt.toLocaleString('ko-KR')}원</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  })()}
  <!-- FOOTER -->
  <div style="background:${(MONTH_THEMES[m]||MONTH_THEMES[5]).t1};padding:14px 36px;display:flex;justify-content:space-between;align-items:center;color:white;">
    <div style="font-size:12px;opacity:.85;">💜 MoneyLog · 나의 돈, 나의 미래를 기록합니다.</div>
    <div style="font-size:11px;opacity:.7;">${y}년 ${m}월 리포트 · 항상 현명한 소비 습관을 응원합니다! 💜</div>
  </div>
</div>`;
    const wrapper=document.createElement('div');
    wrapper.style.cssText='position:fixed;left:-9999px;top:0;z-index:-1;';
    wrapper.innerHTML=html;
    document.body.appendChild(wrapper);
    await new Promise(r=>setTimeout(r,300));
    const canvas=await window.html2canvas(wrapper.firstElementChild,{
      scale:2,backgroundColor:'#F7F4FF',useCORS:true,
      width:W,scrollX:0,scrollY:0,
    });
    document.body.removeChild(wrapper);
    const link=document.createElement('a');
    link.download=`월간리포트_${y}년${m}월.png`;
    link.href=canvas.toDataURL('image/png');
    link.click();
  } catch(e){
    alert('리포트 생성 실패: '+e.message);
  } finally {
    if(btn){btn.textContent='📊 한달 요약';btn.disabled=false;}
  }
}

// ===== BACKUP / EXPORT =====
function updateStorageBar(){
  const fill=document.getElementById('storage-fill');
  const txt=document.getElementById('storage-pct-text');
  if(!fill||!txt)return;
  try{
    const raw=localStorage.getItem('kakeibo_v4')||'';
    const bytes=new Blob([raw]).size;
    const maxBytes=5*1024*1024;
    const pct=Math.min(100,(bytes/maxBytes)*100);
    const kb=(bytes/1024).toFixed(0);
    txt.textContent=kb+'KB ('+Math.round(pct)+'%)';
    fill.style.width=pct+'%';
    fill.style.background=pct>75?'var(--red)':pct>50?'var(--orange)':'var(--green)';
  }catch(e){}
}

// ===== MONTHLY DATA DELETE =====
function _renderDeleteExclusionPanel(){
  const panel=document.getElementById('delete-exclusion-panel');
  if(!panel)return;
  const ex=S.deleteExclusions||{};
  const items=[
    {key:'income',label:'수입 / 지출',color:'#A29BFE'},
    {key:'food',label:'식비캘린더',color:'#FFB347'},
    {key:'ledger',label:'가계부',color:'#FF8A65'},
    {key:'consumption',label:'소비캘린더',color:'#74B9FF'},
    {key:'closed',label:'월 마감',color:'#81C784'},
  ];
  panel.innerHTML=items.map(item=>{
    const on=!!ex[item.key];
    return`<label style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);cursor:pointer;gap:8px;" onclick="App.toggleDeleteExclusion('${item.key}')">
      <div style="display:flex;align-items:center;gap:7px;">
        <span style="width:8px;height:8px;border-radius:2px;background:${item.color};display:inline-block;flex-shrink:0;"></span>
        <span style="font-size:12px;font-weight:500;color:var(--text-main);line-height:1.3;">${item.label}</span>
      </div>
      <div style="width:36px;height:20px;border-radius:10px;flex-shrink:0;background:${on?item.color:'var(--border)'};position:relative;transition:background .2s;">
        <div style="position:absolute;top:2px;left:${on?'18px':'2px'};width:16px;height:16px;border-radius:50%;background:white;box-shadow:0 1px 4px rgba(0,0,0,.18);transition:left .2s;"></div>
      </div>
    </label>`;
  }).join('');
}

function toggleDeleteExclusion(key){
  if(!S.deleteExclusions)S.deleteExclusions={income:false,food:false,ledger:false,consumption:false,closed:false};
  S.deleteExclusions[key]=!S.deleteExclusions[key];
  saveState();
  _renderDeleteExclusionPanel();
  // 오른쪽 목록도 갱신 (제외 태그 시각 업데이트)
  openDeleteModal();
  // 설정 페이지도 갱신
  const settingsEl=document.getElementById('tab-settings');
  if(settingsEl&&settingsEl.classList.contains('active'))renderSettings();
}

function openDeleteModal(){
  const allKeys=new Set();
  // 데이터가 있는 달 수집
  Object.keys(S.monthlyData||{}).forEach(k=>allKeys.add(k));
  Object.keys(S.foodCalendar||{}).forEach(k=>allKeys.add(k));
  Object.keys(S.foodDirectSet||{}).forEach(k=>{
    if(S.foodDirectSet[k]&&(S.foodDirectSet[k].direct||S.foodDirectSet[k].amount))allKeys.add(k);
  });
  Object.keys(S.ledger||{}).forEach(k=>{if((S.ledger[k]||[]).length>0)allKeys.add(k);});
  Object.keys(S.closedMonths||{}).forEach(k=>allKeys.add(k));
  // consumptionCalendar: {y:{m:[...]}}
  Object.keys(S.consumptionCalendar||{}).forEach(y=>{
    Object.keys(S.consumptionCalendar[y]||{}).forEach(m=>{
      if((S.consumptionCalendar[y][m]||[]).length>0)allKeys.add(y+'-'+m);
    });
  });
  Object.keys(S.monthBudgets||{}).forEach(k=>allKeys.add(k));

  const listEl=document.getElementById('delete-month-list');
  if(!listEl)return;

  if(allKeys.size===0){
    listEl.innerHTML='<div style="text-align:center;padding:24px;color:var(--text-sub);">삭제할 데이터가 없습니다</div>';
    openModal('delete');return;
  }

  // 정렬 (최신순)
  const sorted=[...allKeys].sort((a,b)=>{
    const [ay,am]=a.split('-').map(Number);
    const [by,bm]=b.split('-').map(Number);
    return by!==ay?by-ay:bm-am;
  });

  const TAG_KEY_MAP={'수입/지출':'income','식비':'food','가계부':'ledger','소비캘린더':'consumption','마감됨':'closed'};
  const ex=S.deleteExclusions||{};

  listEl.innerHTML=sorted.map(key=>{
    const [y,m]=key.split('-').map(Number);
    // 각 달에 있는 데이터 종류 파악
    const tags=[];
    if((S.monthlyData||{})[key]){
      const d=S.monthlyData[key];
      const hasIncome=(d.income||[]).length>0;
      const hasFixed=(d.fixed||[]).length>0;
      const hasVariable=(d.variable||[]).length>0;
      if(hasIncome||hasFixed||hasVariable)tags.push('수입/지출');
    }
    if((S.foodCalendar||{})[key]&&Object.keys(S.foodCalendar[key]).length>0)tags.push('식비');
    if((S.ledger||{})[key]&&(S.ledger[key]||[]).length>0)tags.push('가계부');
    if((S.consumptionCalendar||{})[y]&&(S.consumptionCalendar[y]||{})[m]&&
       (S.consumptionCalendar[y][m]||[]).length>0)tags.push('소비캘린더');
    if((S.closedMonths||{})[key])tags.push('마감됨');

    const tagHtml=tags.map(t=>{
      const excl=!!ex[TAG_KEY_MAP[t]||''];
      return excl
        ?`<span class="delete-tag" style="text-decoration:line-through;opacity:0.4;">🔒 ${t}</span>`
        :`<span class="delete-tag">${t}</span>`;
    }).join('');
    return `<div class="delete-month-row" data-key="${key}">
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1;min-width:0;">
        <input type="checkbox" class="delete-month-cb" data-key="${key}"
          onchange="App._updateDeleteBulkBtn()"
          style="accent-color:#F06292;width:15px;height:15px;flex-shrink:0;"/>
        <div class="delete-month-info" style="flex:1;min-width:0;">
          <div class="delete-month-label">${y}년 ${m}월</div>
          <div class="delete-month-tags">${tagHtml||'<span class="delete-tag">기타</span>'}</div>
        </div>
      </label>
      <button class="delete-month-btn" onclick="App.confirmDeleteMonth('${key}')">삭제</button>
    </div>`;
  }).join('');

  // 전체선택 체크박스 초기화
  const selectAll=document.getElementById('delete-select-all');
  if(selectAll)selectAll.checked=false;
  _updateDeleteBulkBtn();

  _renderDeleteExclusionPanel();
  openModal('delete');
}

function _updateDeleteBulkBtn(){
  const cbs=[...document.querySelectorAll('.delete-month-cb')];
  const checked=cbs.filter(c=>c.checked);
  const btn=document.getElementById('delete-bulk-btn');
  const countEl=document.getElementById('delete-selected-count');
  const allCb=document.getElementById('delete-select-all');
  if(btn){btn.style.display=checked.length>0?'block':'none';
    if(checked.length>0)btn.textContent=`🗑 ${checked.length}개월 삭제`;}
  if(countEl)countEl.textContent=checked.length>0?`${checked.length}개 선택됨`:'';
  if(allCb&&cbs.length>0)allCb.indeterminate=checked.length>0&&checked.length<cbs.length;
}

function toggleAllDeleteCheck(checked){
  document.querySelectorAll('.delete-month-cb').forEach(cb=>{cb.checked=checked;});
  _updateDeleteBulkBtn();
}

function deleteSelectedMonths(){
  const keys=[...document.querySelectorAll('.delete-month-cb:checked')].map(c=>c.dataset.key);
  if(keys.length===0)return;
  const ex=S.deleteExclusions||{};
  // 미리보기 메시지 생성
  const lines=keys.map(key=>{
    const [y,m]=key.split('-').map(Number);
    const parts=[];
    if((S.monthlyData||{})[key]&&!ex.income)parts.push('수입/지출');
    if(((S.ledger||{})[key]||[]).length>0&&!ex.ledger)parts.push('가계부');
    if(Object.keys((S.foodCalendar||{})[key]||{}).length>0&&!ex.food)parts.push('식비');
    if(!ex.closed&&((S.closedMonths||{})[key]||(S.monthBudgets||{})[key]))parts.push('마감/예산');
    return `${y}년 ${m}월 — ${parts.length>0?parts.join(', '):'(내용 없음)'}`;
  });
  if(!confirm(`⚠️ ${keys.length}개월 일괄 삭제\n\n${lines.join('\n')}\n\n이 작업은 되돌릴 수 없습니다.`))return;
  keys.forEach(key=>deleteMonthData(key));
}

function confirmDeleteMonth(key){
  const [y,m]=key.split('-').map(Number);
  const ex=S.deleteExclusions||{};
  // 삭제될 항목 계산
  const willDelete=[];
  const willSkip=[];
  // 수입/지출
  if((S.monthlyData||{})[key]){
    const d=S.monthlyData[key];
    const cnt=(d.income||[]).length+(d.fixed||[]).length+(d.variable||[]).length;
    if(cnt>0){
      if(ex.income)willSkip.push(`수입/지출 (${cnt}건) — 제외됨`);
      else willDelete.push(`수입/지출 (${cnt}건)`);
    }
  }
  // 가계부
  const ledCnt=((S.ledger||{})[key]||[]).length;
  if(ledCnt>0){
    if(ex.ledger)willSkip.push(`가계부 (${ledCnt}건) — 제외됨`);
    else willDelete.push(`가계부 (${ledCnt}건)`);
  }
  // 식비캘린더
  const foodDays=Object.keys((S.foodCalendar||{})[key]||{}).length;
  if(foodDays>0||(S.foodDirectSet||{})[key]){
    if(ex.food)willSkip.push(`식비캘린더 (${foodDays}일) — 제외됨`);
    else willDelete.push(`식비캘린더 (${foodDays}일)`);
  }
  // 소비캘린더
  const consCnt=((S.consumptionCalendar||{})[y]||({})[m]||[]).length;
  if(consCnt>0){
    if(ex.consumption)willSkip.push(`소비캘린더 (${consCnt}건) — 제외됨`);
    else willDelete.push(`소비캘린더 (${consCnt}건)`);
  }
  // 마감/예산
  if((S.closedMonths||{})[key]||(S.monthBudgets||{})[key]){
    if(ex.closed)willSkip.push('월 마감/예산 — 제외됨');
    else willDelete.push('월 마감/예산');
  }

  const deleteLines=willDelete.length>0?'🗑 삭제될 항목:\n'+willDelete.map(l=>`  • ${l}`).join('\n'):'삭제할 항목 없음';
  const skipLines=willSkip.length>0?'\n\n🔒 제외(보존):\n'+willSkip.map(l=>`  • ${l}`).join('\n'):'';

  if(!confirm(`⚠️ ${y}년 ${m}월 데이터 삭제\n\n${deleteLines}${skipLines}\n\n이 작업은 되돌릴 수 없습니다.`))return;
  deleteMonthData(key);
}

function deleteMonthData(key){
  const [y,m]=key.split('-').map(Number);
  const ex=S.deleteExclusions||{};
  // 해당 달 데이터만 삭제 (제외항목 체크된 카테고리는 건너뜀)
  if(!ex.income&&S.monthlyData)delete S.monthlyData[key];
  if(!ex.food&&S.foodCalendar)delete S.foodCalendar[key];
  if(!ex.food&&S.foodDirectSet)delete S.foodDirectSet[key];
  if(!ex.ledger&&S.ledger)delete S.ledger[key];
  if(!ex.closed&&S.closedMonths)delete S.closedMonths[key];
  if(!ex.closed&&S.monthBudgets)delete S.monthBudgets[key];
  if(!ex.consumption&&S.consumptionCalendar&&S.consumptionCalendar[y]){
    delete S.consumptionCalendar[y][m];
    if(Object.keys(S.consumptionCalendar[y]).length===0)
      delete S.consumptionCalendar[y];
  }
  // monthClosedArchive는 삭제하지 않음 — 월 마감 탭에서만 개별 삭제 가능
  saveState();
  // 모달 내 목록 갱신
  const listEl=document.getElementById('delete-month-list');
  if(listEl){
    const row=listEl.querySelector(`[data-key="${key}"]`);
    if(row)row.remove();
  }
  // 성공 피드백 후 목록 갱신
  openDeleteModal();
  renderAll();
  // 설정 페이지가 열려있으면 저장 용량 상세 수치도 갱신
  const settingsEl=document.getElementById('tab-settings');
  if(settingsEl&&settingsEl.classList.contains('active'))renderSettings();
}


// ===== TAB SWITCHING =====
function switchTab(tab){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.nav-item,.nav-sub-item').forEach(n=>{
    n.classList.remove('active');
    n.style.removeProperty('color');
    n.style.removeProperty('background');
  });
  document.querySelectorAll('.nav-item-group').forEach(g=>g.classList.remove('active'));
  // monthly-archive is now inside analysis tab
  const resolvedTab=(tab==='monthly-archive')?'analysis':tab;
  if(tab==='monthly-archive')_anaSubTab='archive';
  const tabEl=document.getElementById('tab-'+resolvedTab);
  if(tabEl)tabEl.classList.add('active');
  const navEl=document.querySelector('[data-tab="'+resolvedTab+'"]');
  if(navEl)navEl.classList.add('active');
  if(resolvedTab==='dashboard') renderDashboard();
  if(resolvedTab==='ledger'){
    const parentEl=document.querySelector('.nav-item-group[data-group="ledger"]');
    if(parentEl)parentEl.classList.add('active');
    const subMenu=document.getElementById('ledger-submenu');
    if(subMenu)subMenu.style.display='block';
    renderLedger();
  }
  if(resolvedTab==='analysis') renderAnalysis();
  if(resolvedTab==='archive') renderArchive();
  if(resolvedTab==='settings') renderSettings();
  if(resolvedTab==='travel-my'){
    if(window.TravelApp){initTravelState();TravelApp.renderTravelMy();}
    const grp=document.getElementById('nav-travel-group');
    if(grp)grp.classList.add('active');
    const sub=document.getElementById('nav-travel-submenu');
    if(sub)sub.style.display='block';
    const arr=document.getElementById('nav-travel-arrow');
    if(arr)arr.textContent='∧';
  }
  if(resolvedTab==='travel-bucket'){
    if(window.TravelApp){initTravelState();TravelApp.renderTravelBucket();}
    const grp=document.getElementById('nav-travel-group');
    if(grp)grp.classList.add('active');
    const sub=document.getElementById('nav-travel-submenu');
    if(sub)sub.style.display='block';
    const arr=document.getElementById('nav-travel-arrow');
    if(arr)arr.textContent='∧';
  }
  if(window.innerWidth<=680)closeSidebar();
}

// ===== ANALYSIS TAB =====
const ANA_NATURES=[
  {key:'필수',label:'필수지출',color:'#5E4BC4',light:'#F0EEFF',barColor:'#A29BFE',
   svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>'},
  {key:'생활',label:'생활지출',color:'#FF8C42',light:'#FFF4EC',barColor:'#FFB347',
   svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2"/><path d="M18 8h3"/><path d="M21 15a3 3 0 0 1-6 0"/></svg>'},
  {key:'투자',label:'저축·투자',color:'#4CAF82',light:'#E8F5EE',barColor:'#4CAF82',
   svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'},
  {key:'특별',label:'특별지출',color:'#64B5F6',light:'#EBF5FF',barColor:'#64B5F6',
   svg:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'},
];
let _anaExpandedMonth=null;
let _anaNaturePanelOpen=false;
let _anaMode='analysis';
let _anaExpandedClose=null;

// ── 재무관리 점수 (수입 대비 비율 기준) ──
// ※ 부동소수점 오차 방지를 위해 Math.round(pct*10)/10 (소수점 1자리) 기준으로 판단
function calcConsumeScore(natureMap,totalIncome){
  if(totalIncome<=0)return{score:0,grade:'🚨 관리 필요',color:'#F06292',feedback:['수입 데이터가 없습니다. 가계부에 수입을 입력해주세요.'],detail:{}};
  // 소수점 1자리 반올림으로 표시값과 판단 기준 일치
  const pct=(amt)=>Math.round((amt/totalIncome)*1000)/10; // 소수점 1자리
  let totalScore=0;
  const feedback=[];
  const detail={};

  // 저축·투자 (수입 대비)
  const 투자Pct=pct(natureMap['투자']||0);
  let 투자Pts=0;
  if(투자Pct>=40)투자Pts=25;
  else if(투자Pct>=30)투자Pts=20;
  else if(투자Pct>=20)투자Pts=15;
  else if(투자Pct>=10)투자Pts=10;
  else 투자Pts=0;
  totalScore+=투자Pts;
  detail['투자']={pct:Math.round(투자Pct),pts:투자Pts};
  if(투자Pct>=40)feedback.push('저축·투자 비중이 매우 높습니다. 탁월한 자산 형성 습관입니다.');
  else if(투자Pct>=20)feedback.push('안정적인 저축·투자 비중을 유지하고 있습니다.');
  else if(투자Pct>=10)feedback.push('저축·투자 비중이 다소 낮습니다. 더 늘려보세요.');
  else feedback.push('저축·투자 비중이 낮습니다. 수입의 10% 이상 저축·투자를 목표로 해보세요.');

  // 필수지출 (수입 대비)
  const 필수Pct=pct(natureMap['필수']||0);
  let 필수Pts=0;
  if(필수Pct>=20&&필수Pct<=35)필수Pts=25;
  else if(필수Pct>35&&필수Pct<=40)필수Pts=20;
  else if(필수Pct>40&&필수Pct<=45)필수Pts=15;
  else if(필수Pct>45&&필수Pct<=50)필수Pts=10;
  else if(필수Pct<20&&필수Pct>=15)필수Pts=20; // 너무 낮아도 약간 감점 (과소 계상 가능성)
  else 필수Pts=0;
  totalScore+=필수Pts;
  detail['필수']={pct:Math.round(필수Pct),pts:필수Pts};
  if(필수Pct>50)feedback.push('필수지출 비중이 수입의 50%를 넘습니다. 고정비 구조를 점검해 볼 필요가 있습니다.');
  else if(필수Pct>35)feedback.push('필수지출 비중이 다소 높습니다. 고정비 절감 방법을 검토해보세요.');
  else if(필수Pct>=20)feedback.push('필수지출 비중이 안정적입니다.');
  else feedback.push('필수지출 비중이 낮습니다. 현재 소득 대비 고정비 부담이 크지 않습니다.');

  // 생활지출 (수입 대비)
  const 생활Pct=pct(natureMap['생활']||0);
  let 생활Pts=0;
  if(생활Pct>=10&&생활Pct<=15)생활Pts=25;
  else if(생활Pct>15&&생활Pct<=20)생활Pts=20;
  else if(생활Pct>20&&생활Pct<=25)생활Pts=15;
  else if(생활Pct>25&&생활Pct<=30)생활Pts=10;
  else if(생활Pct>=7&&생활Pct<10)생활Pts=20; // 10% 미만이지만 합리적 수준
  else 생활Pts=0;
  totalScore+=생활Pts;
  detail['생활']={pct:Math.round(생활Pct),pts:생활Pts};
  if(생활Pct>30)feedback.push('생활·여가 지출 비중이 높습니다. 소비 지출을 점검해보세요.');
  else if(생활Pct>=10)feedback.push('생활지출 비중이 적정합니다.');
  else feedback.push('생활지출 비중이 낮습니다. 계획적인 소비 습관을 유지하고 있습니다.');

  // 특별지출 (수입 대비)
  const 특별Pct=pct(natureMap['특별']||0);
  let 특별Pts=0;
  if(특별Pct<=5)특별Pts=25;
  else if(특별Pct<=10)특별Pts=20;
  else if(특별Pct<=15)특별Pts=15;
  else if(특별Pct<=20)특별Pts=10;
  else 특별Pts=0;
  totalScore+=특별Pts;
  detail['특별']={pct:Math.round(특별Pct),pts:특별Pts};
  if(특별Pct>20)feedback.push('특별지출 비중이 높습니다. 일시적 지출이 과도하지 않은지 확인해보세요.');
  else if(특별Pct>10)feedback.push('특별지출 비중이 다소 있습니다. 계획적인 지출인지 확인해보세요.');
  else feedback.push('특별지출 비중이 잘 관리되고 있습니다.');

  if(feedback.length===0)feedback.push('전반적으로 균형 잡힌 재무 패턴을 유지하고 있습니다.');
  let grade,color;
  if(totalScore>=90){grade='💎 매우 우수';color='#4CAF82';}
  else if(totalScore>=80){grade='🌱 우수';color='#64B5F6';}
  else if(totalScore>=70){grade='👍 양호';color='#A29BFE';}
  else if(totalScore>=60){grade='📊 보통';color='#FFB347';}
  else if(totalScore>=50){grade='⚠ 개선 필요';color='#FF8C42';}
  else{grade='🚨 관리 필요';color='#F06292';}
  return{score:totalScore,grade,color,feedback,detail};
}

function _getPrevScore(y,m){
  let py=y,pm=m-1;if(pm<1){pm=12;py--;}
  const{natureMap:pn,totalIncome:pi}=getMonthAnalysisData(py,pm);
  if(!pi||pi<=0)return null;
  return calcConsumeScore(pn,pi).score;
}

function _buildScoreBox(score,grade,color,feedback,prevScore){
  const diff=prevScore!=null?score-prevScore:null;
  const diffColor=diff!=null?(diff>=0?'#4CAF82':'#F06292'):'';
  const diffHtml=prevScore!=null?`
    <div class="score-compare-row">
      <span class="score-compare-prev">지난달 <b>${prevScore}점</b></span>
      <span class="score-compare-delta" style="color:${diffColor};">${diff>=0?'▲':'▼'} ${Math.abs(diff)}점 ${diff>=0?'상승':'하락'}</span>
    </div>`:'';
  const fbHtml=feedback.map(f=>`<span class="score-fb-item">• ${f}</span>`).join('');
  const barPct=Math.min(100,score);
  return`<div class="score-box" style="--score-color:${color};">
    <div class="score-label">📊 재무관리 점수</div>
    <div class="score-box-inner">
      <div class="score-box-left">
        <div class="score-number" style="color:${color};">${score}<span class="score-unit">점</span></div>
      </div>
      <div class="score-box-divider"></div>
      <div class="score-box-right">
        <div class="score-grade" style="color:${color};background:${color}22;">✅ ${grade}</div>
        <div class="score-fb-list">${fbHtml}</div>
      </div>
    </div>
    <div class="score-bar-wrap"><div class="score-bar-fill" style="width:${barPct}%;background:${color};"></div></div>
    <div class="score-bar-labels"><span>0점</span><span>100점</span></div>
    ${diffHtml}
  </div>`;
}

function getDefaultNature(catName){
  const n=(catName||'').replace(/[^\u0000-\u007F\uAC00-\uD7A3]/g,'').trim();
  if(/주거|공과금/.test(n))return'필수';
  if(/교통|통신/.test(n))return'필수';
  if(/식비/.test(n))return'생활';
  if(/카페/.test(n))return'생활';
  if(/생활용품/.test(n))return'생활';
  if(/문화|취미/.test(n))return'생활';
  if(/패션|미용/.test(n))return'생활';
  if(/건강|교육/.test(n))return'투자';
  if(/금융/.test(n))return'투자';
  if(/여행/.test(n))return'특별';
  if(/경조사/.test(n))return'특별';
  return''; // 기타 = 미분류
}

// ── 분석 기간: 항상 해당 달 1일~말일 기준 ──
function getAnalysisPeriod(y,m){
  const _p=n=>String(n).padStart(2,'0');
  const lastDay=new Date(y,m,0).getDate();
  return{startY:y,startM:m,startDay:1,endY:y,endM:m,endDay:lastDay,
    label:`${y}.${_p(m)}.01 ~ ${y}.${_p(m)}.${_p(lastDay)}`};
}

// ── 분석 기간 내 가계부 항목 (해당 달 전체) ──
function getAnalysisPeriodEntries(y,m){
  return S.ledger[mkey(y,m)]||[];
}

// ── 정기비용 태그 총합 계산 (이달 고정지출 카드용) ──
function getFixed2Total(y,m){
  const key=mkey(y,m);
  const skipList=((S.subSkipMonths||{})[key]||[]);
  const subs=(S.subscriptions||[]).filter(s=>!skipList.includes(s.name));
  if(!subs.length)return 0;
  const curLedger=(S.ledger[key]||[]).filter(e=>e.type==='expense');
  return subs.reduce((tot,sub)=>{
    if(!sub.name)return tot;
    const nm=sub.name.trim().toLowerCase();
    const amt=curLedger.filter(e=>{
      const memo=(e.memo||'').toLowerCase();
      const tags=(e.tags||[]).map(t=>t.toLowerCase());
      return memo===nm||memo.includes(nm)||tags.includes(nm)||tags.includes(nm.replace(/^#/,''));
    }).reduce((s,e)=>s+(e.amount||0),0);
    return tot+amt;
  },0);
}

function getMonthAnalysisData(y,m){
  const key=mkey(y,m);
  const md=S.monthlyData[key]||{};
  const fixed=(md.fixed||[]).filter(f=>!f.isSavings);
  const variable=md.variable||[];
  const fixedTotal=fixed.reduce((s,f)=>s+(f.amount||0),0);
  const varTotal=variable.reduce((s,v)=>s+(v.amount||0),0);
  const totalExpense=fixedTotal+varTotal;

  // ── 가계부(ledger) 카테고리 기반으로 지출 성격 계산 ──
  const allPeriodEntries=getAnalysisPeriodEntries(y,m);
  const ledgerEntries=allPeriodEntries.filter(e=>e.type==='expense');
  const ledgerIncomeEntries=allPeriodEntries.filter(e=>e.type==='income');
  const ledgerTotal=ledgerEntries.reduce((s,e)=>s+(e.amount||0),0);

  // 총수입: 해당 달 monthlyData 수입 기준, 없으면 가계부 수입 합산
  const ledgerIncome=ledgerIncomeEntries.reduce((s,e)=>s+(e.amount||0),0);
  const mdIncome=(md.income||[]).reduce((s,i)=>s+(i.amount||0),0);
  const totalIncome=mdIncome||ledgerIncome||0;

  const ns=S.expenseNatureSettings||{};
  const natureMap={필수:0,생활:0,투자:0,특별:0};
  let unclassifiedTotal=0;

  const _applyNature=(catName,amt)=>{
    const n=ns.hasOwnProperty(catName)?ns[catName]:getDefaultNature(catName);
    if(n&&natureMap.hasOwnProperty(n))natureMap[n]+=amt;
    else unclassifiedTotal+=amt;
  };

  if(ledgerTotal>0){
    ledgerEntries.forEach(e=>_applyNature(e.category||'',e.amount||0));
  } else {
    [...fixed,...variable].forEach(e=>_applyNature(e.category||e.name||'',e.amount||0));
  }
  const scoreBase=ledgerTotal||totalExpense;

  const tagMap={};
  ledgerEntries.forEach(e=>{
    const tags=(e.tags||[]).filter(t=>t);
    if(tags.length===0){tagMap['(태그 없음)']=(tagMap['(태그 없음)']||0)+(e.amount||0);}
    else{tags.forEach(t=>{tagMap[t]=(tagMap[t]||0)+(e.amount||0);});}
  });
  return{fixed,variable,fixedTotal,varTotal,totalExpense:scoreBase,totalIncome,natureMap,tagMap,unclassifiedTotal,ledgerTotal,ledgerEntries};
}

function changeAnalysisMode(mode){
  _anaMode=mode;_anaExpandedClose=null;renderAnalysis();
}
function changeAnalysisMonth(delta){
  if(!S.analysisYear)S.analysisYear=new Date().getFullYear();
  if(!S.analysisMonth)S.analysisMonth=new Date().getMonth()+1;
  let y=S.analysisYear,m=S.analysisMonth+delta;
  if(m>12){m=1;y++;}if(m<1){m=12;y--;}
  S.analysisYear=y;S.analysisMonth=m;
  saveState();renderAnalysis();
}
function _toggleAnaMonth(m){
  _anaExpandedMonth=_anaExpandedMonth===m?null:m;
  renderAnalysis();
}
function _toggleClosedMonth(key){
  _anaExpandedClose=_anaExpandedClose===key?null:key;
  renderAnalysis();
}

function _toggleAnalysisMenu(e){
  e.stopPropagation();
  const sub=document.getElementById('analysis-submenu');
  if(!sub)return;
  const isOpen=sub.style.display!=='none'&&sub.style.display!=='';
  sub.style.display=isOpen?'none':'block';
  const arrow=document.getElementById('analysis-sub-arrow');
  if(arrow)arrow.textContent=isOpen?'›':'∨';
}

function _openNatureSettings(){
  _anaNaturePanelOpen=!_anaNaturePanelOpen;
  renderAnalysis();
}

function _setNature(cat,nature){
  if(!S.expenseNatureSettings)S.expenseNatureSettings={};
  if(nature)S.expenseNatureSettings[cat]=nature;
  else delete S.expenseNatureSettings[cat];
  saveState();
  renderAnalysis();
}

// ── 성격 설정 패널 상태 ──
let _selectedNatureKey='필수';

const DEFAULT_NATURES_DEF=[
  {key:'필수',label:'필수지출',icon:'🏠',desc:'생활 유지에 반드시 필요한 지출',defCats:['주거','공과금','교통','통신']},
  {key:'생활',label:'생활지출',icon:'🍴',desc:'일상적인 생활 소비 지출',defCats:['식비','카페','생활용품','문화','취미','패션','미용']},
  {key:'투자',label:'투자지출',icon:'📈',desc:'미래를 위한 자기계발 및 자산 투자',defCats:['건강','교육','금융']},
  {key:'특별',label:'특별지출',icon:'✈',desc:'비정기적이고 특별한 상황의 지출',defCats:['여행','경조사']},
];
function _buildNaturePanel(y){
  const ns=S.expenseNatureSettings||{};
  // 가계부 카테고리 목록 기반 (저축 제외)
  const allLcats=(S.ledgerCategories||[]).filter(c=>!c.isSavings).map(c=>c.name);
  // 실제 ledger 사용 카테고리 보완
  const usedCats=new Set(allLcats);
  for(let mo=1;mo<=12;mo++){
    const key=mkey(y,mo);
    (S.ledger[key]||[]).filter(e=>e.type==='expense'&&e.category).forEach(e=>usedCats.add(e.category));
  }
  const catList=[...usedCats];
  const sel=_selectedNatureKey;

  // 각 성격별 카테고리 카운트
  const natureCount={};
  catList.forEach(cat=>{
    const n=ns[cat]||getDefaultNature(cat)||'미분류';
    natureCount[n]=(natureCount[n]||0)+1;
  });

  // 좌측 목록
  const natListHtml=DEFAULT_NATURES_DEF.map(n=>{
    const cnt=catList.filter(c=>(ns[c]||getDefaultNature(c)||'미분류')===n.key).length;
    const isActive=sel===n.key;
    return`<div class="nsp-nat-item${isActive?' active':''}" onclick="App._selectNatureKey('${n.key}')">
      <span class="nsp-nat-icon">${n.icon}</span>
      <div class="nsp-nat-info">
        <div class="nsp-nat-name">${n.label}</div>
        <div class="nsp-nat-cnt">${cnt}개 카테고리</div>
      </div>
      <span class="nsp-nat-drag">⋮⋮</span>
    </div>`;
  }).join('');

  // 우측 편집 패널
  const selDef=DEFAULT_NATURES_DEF.find(n=>n.key===sel)||DEFAULT_NATURES_DEF[0];
  const ICONS=['🏠','🍴','📈','✈','💊','🎓','🚗','💡','🛒','🎁','💰','🐾','🎮','☕','📦'];
  const iconBtns=ICONS.map(ic=>`<button class="nsp-icon-btn${selDef.icon===ic?' active':''}" onclick="App._nsPickIcon('${ic}')">${ic}</button>`).join('');
  
  // 카테고리 체크박스
  const totalCats=catList.length;
  const checkedCats=catList.filter(c=>(ns[c]||getDefaultNature(c)||'미분류')===sel).length;
  const catChecks=catList.map(cat=>{
    const natOfCat=ns[cat]||getDefaultNature(cat)||'미분류';
    const checked=natOfCat===sel;
    return`<label class="nsp-cat-check${checked?' checked':''}">
      <input type="checkbox" ${checked?'checked':''} onchange="App._nsToggleCat(${JSON.stringify(cat)},this.checked,'${sel}')">
      <span>${cat}</span>
    </label>`;
  }).join('');

  return`<div class="nsp-panel">
    <div class="nsp-left">
      <div class="nsp-section-title">성격 목록</div>
      <div class="nsp-nat-list">${natListHtml}</div>
    </div>
    <div class="nsp-right">
      <div class="nsp-section-title">성격 수정</div>
      <div class="nsp-field"><label class="nsp-label">성격명</label>
        <input class="nsp-input" value="${selDef.label}" readonly></div>
      <div class="nsp-field"><label class="nsp-label">아이콘</label>
        <div class="nsp-icon-row">${iconBtns}</div></div>
      <div class="nsp-field"><label class="nsp-label">설명</label>
        <input class="nsp-input" id="nsp-desc-input" value="${selDef.desc}"></div>
      <div class="nsp-field">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <label class="nsp-label" style="margin:0;">포함 카테고리 선택</label>
          <span style="font-size:11px;color:var(--text-sub);">${checkedCats}/${totalCats}개 선택</span>
        </div>
        <div class="nsp-cat-list">${catChecks||'<div style="color:var(--text-sub);font-size:12px;">카테고리 없음</div>'}</div>
      </div>
    </div>
  </div>`;
}

function _selectNatureKey(key){
  _selectedNatureKey=key;
  renderAnalysis();
}

function _nsPickIcon(icon){
  // 아이콘 변경은 시각적 피드백용 (기본 4개 성격 아이콘은 고정)
  renderAnalysis();
}

function _nsToggleCat(cat,checked,natureKey){
  if(!S.expenseNatureSettings)S.expenseNatureSettings={};
  if(checked){
    S.expenseNatureSettings[cat]=natureKey;
  } else {
    // 기본값으로 되돌리기 (삭제하면 getDefaultNature 가 적용됨)
    delete S.expenseNatureSettings[cat];
  }
  saveState();
  renderAnalysis();
}

// ── 이 달 분석 데이터 삭제 ──
function deleteMonthAnalysisData(y,m){
  if(!confirm(`${y}년 ${m}월 가계부 데이터를 삭제할까요?\n(가계부 항목 + 수입/지출 데이터가 삭제되며 복구할 수 없습니다)`))return;
  const key=mkey(y,m);
  if(S.ledger)delete S.ledger[key];
  if(S.monthlyData)delete S.monthlyData[key];
  saveState();
  renderAnalysis();
}



// ── 태그 관리 모달 (정기비용 태그 분석용) ──
function _tagMgmtRender(){
  const el=document.getElementById('tag-mgmt-inner');
  if(!el)return;
  if(!S.subscriptions)S.subscriptions=[];
  const subs=S.subscriptions;
  el.innerHTML=`
    <div style="font-size:13px;font-weight:800;color:#5E4BC4;margin-bottom:6px;">🏷 정기 비용 태그 관리</div>
    <div style="font-size:12px;color:var(--text-sub);margin-bottom:14px;">가계부 메모 또는 태그에 포함된 항목을 자동으로 집계해요.</div>
    <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">
      ${subs.length===0?`<div style="text-align:center;padding:16px;color:var(--text-sub);font-size:12px;">등록된 태그 없음</div>`:
        subs.map((s,i)=>`<div style="display:flex;align-items:center;gap:7px;background:#F7F4FF;border-radius:10px;padding:8px 10px;border:1.5px solid var(--border);">
          <span style="font-size:15px;">🔄</span>
          <input style="flex:1;border:1.5px solid var(--border);border-radius:8px;padding:6px 10px;font-size:13px;font-family:var(--font);" value="${(s.name||'').replace(/"/g,'&quot;')}" onchange="App._updateSubName(${i},this.value)" placeholder="태그명 (가계부 메모와 일치)">
          <button onclick="App._deleteSub(${i})" style="flex-shrink:0;background:#FFF0F5;border:1.5px solid #F06292;border-radius:8px;padding:5px 10px;cursor:pointer;color:#F06292;font-size:12px;font-weight:700;white-space:nowrap;">🗑 삭제</button>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;">
      <button onclick="App._addSub()" style="flex:1;padding:10px;background:var(--purple-light);color:#5E4BC4;border:1.5px dashed #A29BFE;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;">+ 새 태그 추가</button>
      <button onclick="App._openTagSuggest()" style="flex:1;padding:10px;background:#E8F5EE;color:#4CAF82;border:1.5px dashed #4CAF82;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;">💡 태그 추천</button>
    </div>`;
}
function openTagMgmtModal(){
  document.getElementById('tag-mgmt-modal')?.remove();
  if(!S.subscriptions)S.subscriptions=[];
  const modal=document.createElement('div');
  modal.id='tag-mgmt-modal';
  modal.style.cssText='position:fixed;inset:0;background:rgba(45,45,58,.45);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);';
  modal.innerHTML=`<div style="background:white;border-radius:20px;padding:24px;width:min(500px,94vw);max-height:82vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18);">
    <div id="tag-mgmt-inner"></div>
    <div style="display:flex;justify-content:flex-end;margin-top:16px;">
      <button onclick="document.getElementById('tag-mgmt-modal').remove();App.renderAnalysis();" style="padding:10px 24px;background:linear-gradient(135deg,#A29BFE,#74B9FF);color:white;border:none;border-radius:12px;cursor:pointer;font-size:13px;font-weight:700;">닫기</button>
    </div>
  </div>`;
  modal.addEventListener('click',e=>{if(e.target===modal){modal.remove();renderAnalysis();}});
  document.body.appendChild(modal);
  _tagMgmtRender();
}
function _addSub(){
  if(!S.subscriptions)S.subscriptions=[];
  S.subscriptions.push({name:'',amount:0});
  saveState();
  _tagMgmtRender();
}
function _deleteSub(i){
  if(!S.subscriptions||!S.subscriptions[i])return;
  const sub=S.subscriptions[i];
  const y=S.analysisYear||new Date().getFullYear();
  const m=S.analysisMonth||(new Date().getMonth()+1);
  document.getElementById('delete-sub-confirm-modal')?.remove();
  const modal=document.createElement('div');
  modal.id='delete-sub-confirm-modal';
  modal.style.cssText='position:fixed;inset:0;background:rgba(45,45,58,.5);z-index:2000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);';
  modal.innerHTML=`<div style="background:white;border-radius:18px;padding:24px 22px;width:min(360px,90vw);box-shadow:0 8px 36px rgba(0,0,0,.18);">
    <div style="font-size:15px;font-weight:800;color:var(--text-main);margin-bottom:6px;">🗑 태그 삭제</div>
    <div style="font-size:13px;color:var(--text-sub);margin-bottom:18px;"><b style="color:var(--text-main);">${sub.name}</b> 태그를 어떻게 삭제할까요?</div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <button onclick="App._deleteSubThisMonth(${i},${y},${m})" style="padding:13px 14px;background:#FFF8F0;border:1.5px solid #FFB347;border-radius:12px;cursor:pointer;text-align:left;">
        <div style="font-size:13px;font-weight:700;color:#E65100;">📅 이번 달만 제외</div>
        <div style="font-size:11px;color:var(--text-sub);margin-top:3px;">${y}년 ${m}월 집계에서만 제외돼요. 태그는 유지됩니다.</div>
      </button>
      <button onclick="App._deleteSubPermanent(${i})" style="padding:13px 14px;background:#FFF0F5;border:1.5px solid #F06292;border-radius:12px;cursor:pointer;text-align:left;">
        <div style="font-size:13px;font-weight:700;color:#C62828;">🗑 이후 달도 삭제</div>
        <div style="font-size:11px;color:var(--text-sub);margin-top:3px;">태그를 완전히 제거해요. 이후 모든 달에서 집계되지 않아요.</div>
      </button>
    </div>
    <button onclick="document.getElementById('delete-sub-confirm-modal').remove()" style="margin-top:14px;width:100%;padding:10px;background:var(--border);border:none;border-radius:10px;cursor:pointer;font-size:13px;color:var(--text-sub);font-weight:600;">취소</button>
  </div>`;
  modal.addEventListener('click',e=>{if(e.target===modal)modal.remove();});
  document.body.appendChild(modal);
}
function _deleteSubThisMonth(i,y,m){
  document.getElementById('delete-sub-confirm-modal')?.remove();
  if(!S.subscriptions||!S.subscriptions[i])return;
  if(!S.subSkipMonths)S.subSkipMonths={};
  const mk=mkey(y,m);
  if(!S.subSkipMonths[mk])S.subSkipMonths[mk]=[];
  const name=S.subscriptions[i].name;
  if(!S.subSkipMonths[mk].includes(name))S.subSkipMonths[mk].push(name);
  saveState();
  _tagMgmtRender();
}
function _deleteSubPermanent(i){
  document.getElementById('delete-sub-confirm-modal')?.remove();
  if(!S.subscriptions)return;
  S.subscriptions.splice(i,1);
  saveState();
  _tagMgmtRender();
}
function _updateSubName(i,v){if(!S.subscriptions||!S.subscriptions[i])return;S.subscriptions[i].name=v.trim();saveState();}
function _updateSubAmount(i,v){if(!S.subscriptions||!S.subscriptions[i])return;S.subscriptions[i].amount=parseInt(v)||0;saveState();}
function _openTagSuggest(){
  // 태그별로 등장한 월(monthNum) 집합 수집
  const tagMonths={};// tag -> Set of monthNum (y*12+m)
  const tagCount={};// tag -> 총 건수
  Object.entries(S.ledger||{}).forEach(([key,entries])=>{
    const parts=key.split('-');
    const mn=parseInt(parts[0])*12+parseInt(parts[1]);
    (entries||[]).filter(e=>e.type==='expense').forEach(e=>{
      (e.tags||[]).filter(t=>t&&t.trim()).forEach(t=>{
        if(!tagMonths[t])tagMonths[t]=new Set();
        tagMonths[t].add(mn);
        tagCount[t]=(tagCount[t]||0)+1;
      });
    });
  });
  const existing=new Set((S.subscriptions||[]).map(s=>s.name));
  // 3개월 연속 조건 필터
  const result=Object.entries(tagMonths)
    .filter(([t])=>!existing.has(t)&&t.length>0)
    .filter(([,months])=>{
      const sorted=[...months].sort((a,b)=>a-b);
      for(let i=0;i<=sorted.length-3;i++){
        if(sorted[i+1]===sorted[i]+1&&sorted[i+2]===sorted[i]+2)return true;
      }
      return false;
    })
    .map(([t,months])=>{
      const sorted=[...months].sort((a,b)=>a-b);
      // 가장 최근 연속 3개월 구간 시작점 찾기
      let streak=1,maxStreak=1;
      for(let i=1;i<sorted.length;i++){
        streak=sorted[i]===sorted[i-1]+1?streak+1:1;
        if(streak>maxStreak)maxStreak=streak;
      }
      return[t,maxStreak,tagCount[t]||0];
    })
    .sort((a,b)=>b[1]-a[1]||b[2]-a[2]);
  document.getElementById('tag-suggest-popup')?.remove();
  const popup=document.createElement('div');
  popup.id='tag-suggest-popup';
  popup.style.cssText='position:fixed;inset:0;background:rgba(45,45,58,.45);z-index:2100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);';
  popup.innerHTML=`<div style="background:white;border-radius:20px;padding:24px;width:min(520px,94vw);max-height:80vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <div style="font-size:14px;font-weight:800;color:#5E4BC4;">✨ 반복 지출 감지 결과</div>
      <button onclick="document.getElementById('tag-suggest-popup').remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text-sub);">✕</button>
    </div>
    <div style="font-size:12px;color:var(--text-sub);margin-bottom:14px;">3개월 연속으로 사용된 #태그만 표시해요. 선택하면 정기 태그로 등록돼요.</div>
    ${result.length===0
      ?'<div style="text-align:center;padding:28px;color:var(--text-sub);font-size:13px;">3개월 연속 감지된 태그가 없어요.<br><span style="font-size:11px;">가계부 항목에 #태그를 꾸준히 입력해 보세요.</span></div>'
      :`<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
        ${result.map(([t,streak,cnt])=>`<label style="display:flex;align-items:center;gap:10px;background:#F7F4FF;border-radius:10px;padding:9px 13px;border:1.5px solid var(--border);cursor:pointer;" onmouseover="this.style.background='#EDE9FF'" onmouseout="this.style.background='#F7F4FF'">
          <input type="checkbox" value="${t.replace(/"/g,'&quot;')}" style="width:16px;height:16px;accent-color:#A29BFE;flex-shrink:0;">
          <span style="font-size:14px;font-weight:700;color:#5E4BC4;flex:1;">#${t.replace(/^#/,'')}</span>
          <span style="font-size:11px;background:#E8E4FF;color:#7C5CBF;border-radius:8px;padding:2px 8px;font-weight:600;">${streak}개월 연속</span>
        </label>`).join('')}
      </div>
      <button onclick="App._applyTagSuggestPopup()" style="width:100%;padding:11px;background:linear-gradient(135deg,#A29BFE,#74B9FF);color:white;border:none;border-radius:12px;cursor:pointer;font-size:13px;font-weight:700;">선택 적용</button>`}
  </div>`;
  popup.addEventListener('click',e=>{if(e.target===popup)popup.remove();});
  document.body.appendChild(popup);
}
function _applyTagSuggest(){
  const inner=document.getElementById('tag-mgmt-inner');
  if(!inner)return;
  const checked=[...inner.querySelectorAll('input[type=checkbox]:checked')].map(cb=>cb.value.trim()).filter(Boolean);
  if(checked.length===0){alert('선택한 태그가 없어요.');return;}
  if(!S.subscriptions)S.subscriptions=[];
  const existing=new Set(S.subscriptions.map(s=>s.name));
  checked.forEach(t=>{if(!existing.has(t))S.subscriptions.push({name:t,amount:0});});
  saveState();
  _tagMgmtRender();
}
function _applyTagSuggestPopup(){
  const popup=document.getElementById('tag-suggest-popup');
  if(!popup)return;
  const checked=[...popup.querySelectorAll('input[type=checkbox]:checked')].map(cb=>cb.value.trim()).filter(Boolean);
  if(checked.length===0){alert('선택한 태그가 없어요.');return;}
  if(!S.subscriptions)S.subscriptions=[];
  const existing=new Set(S.subscriptions.map(s=>s.name));
  checked.forEach(t=>{if(!existing.has(t))S.subscriptions.push({name:t,amount:0});});
  saveState();
  popup.remove();
  _tagMgmtRender();
}

// ── 정기비용 섹션 2 빌더 (가계부 기반) — 사진2 레이아웃 ──
function _buildFixed2Section(y,m,fmt){
  const key=mkey(y,m);
  let py=y,pm=m-1;if(pm<1){pm=12;py--;}
  let p2y=y,p2m=m-2;if(p2m<1){p2m+=12;p2y--;}
  const prevKey=mkey(py,pm);
  const prev2Key=mkey(p2y,p2m);
  const PILL_COLORS=['#7C5CBF','#4CAF82','#FF8C42','#64B5F6','#F06292','#A29BFE','#FFB347','#4DB6AC'];

  const skipList=((S.subSkipMonths||{})[key]||[]);
  const subs=(S.subscriptions||[]).filter(s=>!skipList.includes(s.name));

  const curLedger=(S.ledger[key]||[]).filter(e=>e.type==='expense');
  const prevLedger=(S.ledger[prevKey]||[]).filter(e=>e.type==='expense');
  const prev2Ledger=(S.ledger[prev2Key]||[]).filter(e=>e.type==='expense');

  function matchAmt(entries,sub){
    if(!sub.name)return 0;
    const nm=sub.name.trim().toLowerCase();
    return entries.filter(e=>{
      const memo=(e.memo||'').toLowerCase();
      const tags=(e.tags||[]).map(t=>t.toLowerCase());
      return memo===nm||memo.includes(nm)||tags.includes(nm)||tags.includes(nm.replace(/^#/,''));
    }).reduce((s,e)=>s+(e.amount||0),0);
  }

  if(subs.length===0){
    return`<div style="text-align:center;padding:32px 0;color:var(--text-sub);">
      <div style="font-size:32px;margin-bottom:10px;">🏷</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:6px;">등록된 정기 태그가 없어요</div>
      <div style="font-size:12px;">"태그 관리" 버튼으로 정기 지출 태그를 등록하면<br>가계부에서 자동으로 금액을 집계해요.</div>
    </div>`;
  }

  const rows=subs.map((sub,i)=>{
    const curAmt=matchAmt(curLedger,sub);
    const prevAmt=matchAmt(prevLedger,sub);
    const prev2Amt=matchAmt(prev2Ledger,sub);
    const avg3=Math.round((curAmt+prevAmt+prev2Amt)/3);
    return{sub,curAmt,prevAmt,prev2Amt,avg3,idx:i};
  });

  const fixedTotal=rows.reduce((s,r)=>s+r.curAmt,0);
  const prevTotal=rows.reduce((s,r)=>s+r.prevAmt,0);
  const diffTotal=fixedTotal-prevTotal;
  const ledgerExp=curLedger.reduce((s,e)=>s+(e.amount||0),0);
  const expPct=ledgerExp>0?Math.round(fixedTotal/ledgerExp*100):0;

  const tableRows=rows.map(r=>{
    const diff=r.curAmt-r.prevAmt;
    const diffPct=r.prevAmt>0?Math.round(diff/r.prevAmt*100):null;
    const pc=PILL_COLORS[r.idx%PILL_COLORS.length];
    const diffColor=diff>0?'#F06292':diff<0?'#4CAF82':'var(--text-sub)';
    const noData=r.curAmt===0;
    return`<tr class="rfa-row"${noData?' style="opacity:.5;"':''}>
      <td><span class="rfa-pill" style="background:${pc}22;color:${pc};">${r.sub.name||'?'}</span></td>
      <td style="font-weight:800;text-align:right;">${noData?'—':fmt(r.curAmt)}</td>
      <td style="text-align:right;color:var(--text-sub);">${r.avg3>0?fmt(r.avg3):'—'}</td>
      <td style="font-weight:700;text-align:right;color:${diffColor};">${diff===0||noData?'—':(diff>0?'+':'')+fmt(Math.abs(diff))}${diffPct!==null&&!noData&&diff!==0?`<br><span style="font-size:10px;">(${diff>0?'+':''}${diffPct}%)</span>`:''}</td>
    </tr>`;
  }).join('');

  return`<div style="display:grid;grid-template-columns:180px 1fr;gap:24px;align-items:start;">
    <div>
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:4px;">이번 달 정기 비용 (총합)</div>
      <div style="font-size:26px;font-weight:900;color:var(--text-main);letter-spacing:-1px;margin-bottom:6px;">${fmt(fixedTotal)}</div>
      ${ledgerExp>0?`<div style="font-size:12px;color:#5E4BC4;margin-bottom:4px;">총 지출의 <b>${expPct}%</b></div>`:''}
      <div style="font-size:12px;font-weight:700;color:${diffTotal===0?'var(--text-sub)':diffTotal>0?'#F06292':'#4CAF82'};">
        전월 대비 ${diffTotal===0?'변동 없음':(diffTotal>0?'+':'')+fmt(Math.abs(diffTotal))}${diffTotal!==0&&prevTotal>0?`<span style="font-size:10px;font-weight:400;"> (${Math.round(diffTotal/prevTotal*100)}%)</span>`:''}
      </div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:700;color:var(--text-sub);margin-bottom:10px;">정기 비용 태그별 상세</div>
      <div style="overflow-x:auto;">
        <table class="rfa-table" style="width:100%;">
          <thead><tr>
            <th>태그</th>
            <th style="text-align:right;">이번 달</th>
            <th style="text-align:right;">최근 3개월 평균</th>
            <th style="text-align:right;">전월 대비</th>
          </tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--text-sub);margin-top:10px;padding-top:8px;border-top:1px dashed var(--border);">
    ※ 가계부 항목의 태그 또는 메모에 등록된 태그명이 포함된 경우 자동 집계${skipList.length>0?` | 이번달 제외: ${skipList.join(', ')}` : ''}
  </div>`;
}
// ── 카테고리 유형 판별 ──
function _getCatType(cat){
  const n=(cat||'').toLowerCase();
  if(n.includes('주거')||n.includes('공과')||n.includes('금융')||n.includes('통신')||n.includes('카드'))return'고정지출';
  if(n.includes('여행')||n.includes('경조')||n.includes('기타'))return'기타';
  return'변동지출';
}
// ── 카테고리 상세 분석 카드 토글 ──
function _toggleCatDetail(id){
  const el=document.getElementById('catd-'+id);
  const btn=document.getElementById('catd-btn-'+id);
  if(!el)return;
  const open=el.style.display==='none'||!el.style.display;
  el.style.display=open?'block':'none';
  if(btn)btn.textContent=open?'상세 내역 접기 ▴':'상세 내역 보기 ▾';
}
// ── 카테고리 상세 분석 카드 그리드 ──
function _buildCatAnalysisSection(y,m,ledgerEntries,fmt){
  const prevY=m===1?y-1:y,prevM=m===1?12:m-1;
  const prevEntries=(getMonthAnalysisData(prevY,prevM).ledgerEntries)||[];
  const prevCat={};
  prevEntries.forEach(e=>{if(e.type==='expense'){const c=e.category||'기타';prevCat[c]=(prevCat[c]||0)+(e.amount||0);}});
  const catMap={};
  (ledgerEntries||[]).forEach(e=>{
    if(e.type==='expense'){
      const c=e.category||'기타';
      if(!catMap[c])catMap[c]={amount:0,count:0,entries:[],placeMap:{}};
      catMap[c].amount+=(e.amount||0);
      catMap[c].count++;
      catMap[c].entries.push(e);
      const place=(e.memo||'기타').trim()||'기타';
      catMap[c].placeMap[place]=(catMap[c].placeMap[place]||0)+(e.amount||0);
    }
  });
  const sorted=Object.entries(catMap).sort((a,b)=>b[1].amount-a[1].amount);
  if(!sorted.length)return'<div style="color:var(--text-sub);font-size:12px;padding:24px;text-align:center;">가계부 지출 내역 없음</div>';
  const typeColors={고정지출:['#EBF5FF','#0984E3'],변동지출:['#FFF3EF','#E17055'],기타:['#F5F6FA','#636E72']};
  return`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:13px;">${
    sorted.map(([cat,data],idx)=>{
      const cc=getCategoryColor(cat);
      const color=cc.strip,light=cc.bg;
      const icon=_getCatSVG(cat);
      const type=_getCatType(cat);
      const prev=prevCat[cat]||0;
      const diff=data.amount-prev;
      const diffPct=prev>0?Math.round(diff/prev*100):0;
      const avg=data.count>0?Math.round(data.amount/data.count):0;
      const places=Object.entries(data.placeMap).sort((a,b)=>b[1]-a[1]).slice(0,3);
      const [tbg,tc]=typeColors[type]||typeColors['기타'];
      const diffHtml=prev>0?(diff===0
        ?`<span style="font-size:11px;color:#B2BEC3;font-weight:500;">— 변동없음</span>`
        :`<span style="font-size:11px;font-weight:700;color:${diff>0?'#E17055':'#00B894'};background:${diff>0?'#FFF3EF':'#E8FBF5'};border-radius:5px;padding:1px 7px;">${diff>0?'▲':'▼'} ${Math.abs(diffPct)}%</span><span style="font-size:11px;font-weight:600;color:${diff>0?'#E17055':'#00B894'};margin-left:3px;">${diff>0?'+':''}${fmt(diff)}</span>`
      ):`<span style="font-size:11px;color:#B2BEC3;">전월 데이터 없음</span>`;
      const detailRows=data.entries.slice().sort((a,b)=>(a.date||'')>(b.date||'')?1:-1).map(e=>{
        const ds=(e.date||'').slice(5).replace('-','/');
        return`<div style="display:flex;align-items:center;gap:8px;padding:7px 13px;border-bottom:1px dashed #F3F3F3;"><span style="min-width:32px;font-size:10px;font-weight:700;color:${color};background:${light};border-radius:5px;padding:1px 4px;text-align:center;">${ds}</span><span style="flex:1;font-size:12px;color:#4A4A6A;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.memo||''}</span><span style="font-size:12px;font-weight:700;color:#1A1A2E;white-space:nowrap;">${fmt(e.amount)}</span></div>`;
      }).join('');
      return`<div style="background:white;border-radius:15px;border:1.5px solid ${color}18;box-shadow:0 2px 12px rgba(0,0,0,0.04);overflow:hidden;display:flex;flex-direction:column;">
        <div style="height:3px;background:linear-gradient(90deg,${color},${color}55);"></div>
        <div style="padding:13px 14px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:30px;height:30px;border-radius:9px;background:${light};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${color};">${icon}</div>
              <span style="font-size:13px;font-weight:700;color:var(--text-main);">${cat}</span>
            </div>
            <span style="font-size:9.5px;font-weight:700;background:${tbg};color:${tc};border-radius:5px;padding:2px 6px;">${type}</span>
          </div>
          <div style="font-size:20px;font-weight:900;color:${color};letter-spacing:-0.5px;margin-bottom:4px;line-height:1.2;">${fmt(data.amount)}</div>
          <div style="display:flex;align-items:center;gap:5px;margin-bottom:10px;">${diffHtml}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;background:#F8F9FB;border-radius:9px;padding:8px 10px;margin-bottom:10px;">
            <div><div style="font-size:9px;color:#B2BEC3;font-weight:600;margin-bottom:2px;">거래 건수</div><div style="font-size:12.5px;font-weight:700;color:var(--text-main);">${data.count}건</div></div>
            <div><div style="font-size:9px;color:#B2BEC3;font-weight:600;margin-bottom:2px;">평균 결제</div><div style="font-size:12.5px;font-weight:700;color:var(--text-main);">${fmt(avg)}</div></div>
          </div>
          ${places.length?`<div style="margin-bottom:11px;"><div style="font-size:9px;font-weight:700;color:#B2BEC3;margin-bottom:5px;letter-spacing:0.2px;">주요 사용처</div>${places.map(([name,amt],i)=>`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;"><div style="display:flex;align-items:center;gap:6px;min-width:0;"><span style="width:15px;height:15px;border-radius:4px;background:${i===0?color:i===1?color+'88':color+'44'};display:flex;align-items:center;justify-content:center;font-size:8.5px;color:white;font-weight:800;flex-shrink:0;">${i+1}</span><span style="font-size:11px;color:#4A4A6A;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name}</span></div><span style="font-size:11.5px;font-weight:700;color:var(--text-main);white-space:nowrap;margin-left:6px;">${fmt(amt)}</span></div>`).join('')}</div>`:''}
        </div>
        <button id="catd-btn-${idx}" onclick="App._toggleCatDetail(${idx})" style="width:100%;background:#F8F9FB;border:none;border-top:1px dashed #EBEBEB;padding:8px 0;font-size:11px;font-weight:600;color:#B2BEC3;cursor:pointer;">상세 내역 보기 ▾</button>
        <div id="catd-${idx}" style="display:none;border-top:1.5px solid ${light||'#F8F9FB'};">${detailRows||'<div style="padding:12px;color:var(--text-sub);font-size:12px;text-align:center;">내역 없음</div>'}</div>
      </div>`;
    }).join('')
  }</div>`;
}
// ── 분석 뷰 (현재 달 상세) ──
function _buildAnalysisView(y,m){
  const fmt=n=>Math.round(n).toLocaleString('ko-KR')+'원';
  const{fixed,fixedTotal,totalExpense,totalIncome,natureMap,ledgerEntries,ledgerTotal}=getMonthAnalysisData(y,m);
  const period=getAnalysisPeriod(y,m);
  // 재무관리 점수 (수입 대비)
  const{score,grade,color:scoreColor,feedback}=calcConsumeScore(natureMap,totalIncome);
  const prevScore=_getPrevScore(y,m);
  // 이달 고정지출 = 정기비용(태그 분석) 총합
  const tagFixed2Total=getFixed2Total(y,m);
  // 이번달 순수 지출 = 총 지출 - 필수지출 - 저축·투자
  const 순수지출=(natureMap['생활']||0)+(natureMap['특별']||0);
  // 성격별 카드 (수입 대비 %)
  const natureCardsHtml=ANA_NATURES.map(n=>{
    const amt=natureMap[n.key]||0;
    const pct=totalIncome>0?Math.round(amt/totalIncome*100):0;
    return`<div class="ana2-nature-card" onclick="App._openNatureDetail('${n.key}',${y},${m})" style="background:${n.light};border:1.5px solid ${n.color}33;cursor:pointer;transition:transform .15s,box-shadow .15s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 20px ${n.color}22'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;color:${n.color};">${n.svg||''}<span style="font-size:12px;font-weight:800;">${n.label}</span></div>
      <div style="font-size:18px;font-weight:900;color:${n.color};margin-bottom:3px;">${fmt(amt)}</div>
      <div style="font-size:13px;font-weight:700;color:${n.color};">${pct}%</div>
      <div style="font-size:10px;color:var(--text-sub);margin-top:3px;">수입 대비</div>
      <div style="font-size:10px;color:${n.color};margin-top:6px;opacity:.6;">▶ 상세 내역 보기</div>
    </div>`;
  }).join('');

  return`
    <div style="background:#F0EEFF;border-radius:10px;padding:9px 16px;margin-bottom:16px;display:flex;align-items:center;gap:8px;border:1.5px solid #A29BFE33;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5E4BC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <span style="font-size:12px;font-weight:700;color:#5E4BC4;">분석 기간 : ${period.label}</span>
    </div>

    <div class="ana2-top-cards">
      <div class="ana2-top-card" style="background:linear-gradient(135deg,#F8BBD0,#FCE4EC);border-color:#F48FB133;">
        <div class="ana2-top-card-label" style="color:#C2185B;">💸 이번 달 총 지출</div>
        <div class="ana2-top-card-val" style="color:#880E4F;">${fmt(totalExpense)}</div>
        ${totalIncome>0?`<div style="font-size:11px;color:#C2185B;margin-top:3px;">수입의 <b>${Math.round(totalExpense/totalIncome*100)}%</b></div>`:''}
      </div>
      <div class="ana2-top-card" style="background:linear-gradient(135deg,#E8EAF6,#EDE7F6);border-color:#9FA8DA33;">
        <div class="ana2-top-card-label" style="color:#3949AB;">🧾 이번 달 순수 지출</div>
        <div class="ana2-top-card-val" style="color:#1A237E;">${fmt(순수지출)}</div>
        <div style="font-size:11px;color:#3949AB;margin-top:3px;">필수·저축 제외 합산</div>
      </div>
      <div class="ana2-top-card" style="background:linear-gradient(135deg,#C8E6C9,#E8F5E9);border-color:#4CAF8233;">
        <div class="ana2-top-card-label" style="color:#2E7D32;">🏠 이달 고정 지출</div>
        <div class="ana2-top-card-val" style="color:#1B5E20;">${fmt(tagFixed2Total)}</div>
        <div style="font-size:11px;color:#388E3C;margin-top:3px;">정기비용(태그) 기준</div>
      </div>
    </div>

    <div class="ana2-section-card">
      <div class="ana2-section-hd">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="ana2-num-badge">①</span><span style="font-size:15px;font-weight:800;color:var(--text-main);">재무 분석</span></div>
          <div style="font-size:11px;color:var(--text-sub);margin-left:34px;">수입 대비 지출 성격별 비율을 분석합니다. ${totalIncome>0?`(분석 기준 수입 : ${fmt(totalIncome)})`:''}</div>
        </div>
      </div>
      <div class="ana2-nature-grid4">
        ${natureCardsHtml}
      </div>
      ${_buildScoreBox(score,grade,scoreColor,feedback,prevScore)}
    </div>

    <div class="ana2-section-card">
      <div class="ana2-section-hd">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="ana2-num-badge">②</span><span style="font-size:15px;font-weight:800;color:var(--text-main);">정기 비용(태그) 분석</span></div>
          <div style="font-size:11px;color:var(--text-sub);margin-left:34px;">매월 반복되는 내역을 태그로 분류하여 정리하세요.</div>
        </div>
        <button onclick="App.openTagMgmtModal()" style="display:flex;align-items:center;gap:6px;padding:7px 14px;background:#F0EEFF;color:#5E4BC4;border:1.5px solid #A29BFE55;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;white-space:nowrap;transition:background .15s;" onmouseover="this.style.background='#E0D9FF'" onmouseout="this.style.background='#F0EEFF'">
          🏷 태그 관리
        </button>
      </div>
      ${_buildFixed2Section(y,m,fmt)}
    </div>

    <div class="ana2-section-card">
      <div class="ana2-section-hd">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="ana2-num-badge">③</span><span style="font-size:15px;font-weight:800;color:var(--text-main);">카테고리 상세 분석</span></div>
          <div style="font-size:11px;color:var(--text-sub);margin-left:34px;">카테고리별 소비 패턴과 전월 대비 변화를 확인하세요.</div>
        </div>
        <div style="font-size:20px;font-weight:900;color:var(--red);">${fmt(totalExpense)}</div>
      </div>
      ${_buildCatAnalysisSection(y,m,ledgerEntries,fmt)}
    </div>
`;
}

// ── 월마감 뷰 (달 넘어가기 + 인라인 마감확정) ──
function _buildCloseView(){
  const fmt=n=>Math.round(n).toLocaleString('ko-KR')+'원';
  const y=S.analysisYear||new Date().getFullYear();
  const m=S.analysisMonth||(new Date().getMonth()+1);
  const key=mkey(y,m);
  const arch=(S.monthClosedArchive||{})[key];
  const isClosed=!!arch;
  // 미래 달은 마감 불가
  const _now=new Date();const _nowY=_now.getFullYear(),_nowM=_now.getMonth()+1;
  const isFuture=y>_nowY||(y===_nowY&&m>_nowM);

  const monthNav=`<div class="ana2-month-nav" style="margin-bottom:20px;">
    <button class="month-btn" onclick="App.changeAnalysisMonth(-1)">‹</button>
    <span class="month-label">${y}년 ${m}월</span>
    <button class="month-btn" onclick="App.changeAnalysisMonth(1)">›</button>
    ${isFuture?'<span style="margin-left:12px;font-size:11px;background:#F7F4FF;color:#9490A8;border-radius:8px;padding:3px 10px;font-weight:700;">📅 미래 달</span>':isClosed?'<span style="margin-left:12px;font-size:11px;background:#E8F5EE;color:#4CAF82;border-radius:8px;padding:3px 10px;font-weight:700;">✅ 마감완료</span>':'<span style="margin-left:12px;font-size:11px;background:#FFF0F5;color:#F06292;border-radius:8px;padding:3px 10px;font-weight:700;">미마감</span>'}
  </div>`;

  // 미래 달이면 안내 메시지만 표시
  if(isFuture){
    return monthNav+`<div class="ana-empty"><div style="font-size:36px;margin-bottom:12px;">📅</div><b>${y}년 ${m}월</b>은 아직 지나지 않은 달이에요.<br><span style="font-size:12px;">해당 월이 끝난 후 마감을 진행해 주세요.</span></div>`;
  }

  const entries=S.ledger[key]||[];
  const ledIn=entries.filter(e=>e.type==='income').reduce((s,e)=>s+e.amount,0);
  const ledOut=entries.filter(e=>e.type==='expense').reduce((s,e)=>s+e.amount,0);
  const budIn=isClosed?(arch.budgetIncome||arch.ledgerIncome||0):getTotalIncome(y,m);
  const budOut=isClosed?(arch.budgetExpense||arch.ledgerExpense||0):(getTotalFixed(y,m)+getTotalVariable(y,m)+getFoodTotal(y,m));
  const savingsAmt=isClosed?(arch.savings||0):getTotalSavings(y,m);
  const dispIn=isClosed?(arch.budgetIncome||arch.ledgerIncome||ledIn):budIn||ledIn;
  const dispOut=Math.max(0,ledOut-savingsAmt);
  const sr=budIn>0?(savingsAmt/budIn*100).toFixed(1):0;
  const srColor=parseFloat(sr)>=30?'#43C98A':parseFloat(sr)>=15?'#FFB347':'#F06292';

  const hasData=dispIn>0||dispOut>0||savingsAmt>0;
  if(!hasData&&!isClosed){
    return monthNav+`<div class="ana-empty"><div style="font-size:36px;margin-bottom:12px;">📭</div>이 달의 데이터가 없어요.<br><span style="font-size:12px;">수입·지출을 먼저 입력해 주세요.</span></div>
    <div style="background:white;border-radius:14px;border:1.5px solid var(--border);padding:20px;box-shadow:0 2px 10px rgba(160,140,220,.07);">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;color:var(--text-main);">📝 마감 메모 (선택)</div>
      <textarea id="close-note-inline" placeholder="이달 소감이나 특이사항 메모..." style="width:100%;min-height:70px;border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;font-size:13px;font-family:var(--font);resize:vertical;margin-bottom:14px;box-sizing:border-box;"></textarea>
      <button onclick="App.closeMonthDirect(${y},${m})" style="width:100%;padding:14px;background:linear-gradient(135deg,#5E4BC4,#A29BFE);color:white;border:none;border-radius:12px;cursor:pointer;font-size:15px;font-weight:800;">✅ ${m}월 마감 확정하기</button>
    </div>`;
  }

  const CM_CAT_COLORS={'식비':'#FF8A65','🍚 식비':'#FF8A65','생필품':'#4DB6AC','생활용품':'#4DB6AC','🧴 생활용품':'#4DB6AC','문화/여가':'#CE93D8','문화·취미':'#CE93D8','🎨 문화·취미':'#CE93D8','기타':'#90A4AE','📦 기타':'#90A4AE','교통':'#64B5F6','교통·통신':'#64B5F6','🚗 교통·차량':'#64B5F6','주거':'#FFD54F','주거/공과':'#FFD54F','주거·공과금':'#FFD54F','🏠 주거·공과금':'#FFD54F','건강':'#81C784','💪 건강':'#81C784','저축/투자':'#A29BFE','💰 금융':'#80CBC4','패션·미용':'#F48FB1','👕 패션·미용':'#F48FB1','여행':'#4FC3F7','✈ 여행':'#4FC3F7','경조사':'#FFCA28','🎁 경조사':'#FFCA28'};
  const CM_FALLBACK=['#A29BFE','#64B5F6','#FF8A65','#4DB6AC','#F48FB1','#FFD54F','#81C784','#80CBC4'];

  let catEntries=[];
  if(isClosed&&arch.categories&&arch.categories.length>0){
    catEntries=arch.categories;
  }else{
    const effectiveVars=getEffectiveVariable(y,m);
    const catMap={};
    effectiveVars.forEach(v=>{catMap[v.category]=(catMap[v.category]||0)+(parseFloat(v.amount)||0);});
    catEntries=Object.entries(catMap)
      .filter(([cat])=>!cat.includes('주거')&&!cat.includes('공과')&&!cat.includes('금융'))
      .sort((a,b)=>b[1]-a[1])
      .map(([name,amount])=>({name,amount,budget:(S.budgetCategories||[]).find(b=>b.name===name)?.budget||0}));
  }
  const maxAmt=catEntries.length>0?(catEntries[0].amount||0)||1:1;
  const catRowsHtml=catEntries.length===0
    ?'<div style="color:var(--text-sub);font-size:13px;padding:10px 0;">기록된 지출이 없어요</div>'
    :catEntries.map((c,i)=>{
      const name=c.name;const amt=c.amount||0;const bAmt=c.budget||0;
      const barPct=Math.min(100,(amt/(maxAmt||1))*100);
      const baseColor=CM_CAT_COLORS[name]||CM_FALLBACK[i%CM_FALLBACK.length];
      const barColor=bAmt>0&&amt>bAmt?'var(--red)':baseColor;
      const noteHtml=bAmt>0?`<span style="font-size:10px;font-weight:600;color:${amt>bAmt?'var(--red)':'var(--green)'};">${amt>bAmt?'▲초과 '+fmt(amt-bAmt):'▽여유 '+fmt(bAmt-amt)}</span>`:'';
      return`<div class="cm-cat-row">
        <div class="cm-cat-label-row"><span class="cm-cat-name">${name}</span>
          <div style="display:flex;align-items:center;gap:8px;">${noteHtml}<span class="cm-cat-amount">${fmt(amt)}</span></div>
        </div>
        <div class="cm-cat-bar-wrap"><div class="cm-cat-bar" style="width:${barPct}%;background:${barColor};"></div></div>
      </div>`;
    }).join('');

  const summaryHtml=`<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:18px;">
    <div class="cm-stat-box"><div class="cm-stat-label">💰 총 수입</div><div class="cm-stat-val green">${fmt(ledIn)}</div><div style="font-size:10px;color:var(--text-sub);margin-top:3px;">가계부 기준</div></div>
    <div class="cm-stat-box"><div class="cm-stat-label">💸 총 지출</div><div class="cm-stat-val red">${fmt(ledOut)}</div><div style="font-size:10px;color:var(--text-sub);margin-top:3px;">가계부 기준</div></div>
    <div class="cm-stat-box"><div class="cm-stat-label">🧾 순수 지출</div><div class="cm-stat-val red">${fmt(dispOut)}</div><div style="font-size:10px;color:var(--text-sub);margin-top:3px;">*저축/투자 제외</div></div>
    <div class="cm-stat-box"><div class="cm-stat-label">🏦 저축액</div><div class="cm-stat-val" style="color:#5E4BC4;">${fmt(savingsAmt)}</div></div>
    <div class="cm-stat-box"><div class="cm-stat-label">📈 저축률</div><div class="cm-stat-val" style="color:${srColor};">${sr}%</div></div>
  </div>`;

  const catSectionHtml=`<div style="background:white;border-radius:14px;border:1.5px solid var(--border);padding:18px;margin-bottom:18px;box-shadow:0 2px 10px rgba(160,140,220,.07);">
    <div style="font-size:13px;font-weight:700;margin-bottom:14px;color:var(--text-main);">📊 카테고리별 지출 <span style="font-size:10px;font-weight:400;color:var(--text-sub);">*주거/공과금·금융 제외</span></div>
    ${catRowsHtml}
  </div>`;

  let actionHtml='';
  if(isClosed){
    const closedDate=arch.closedAt?new Date(arch.closedAt).toLocaleDateString('ko-KR',{month:'long',day:'numeric'}):'';
    const noteText=arch.note?`<div style="background:#F7F4FF;border-radius:10px;padding:10px 14px;font-size:13px;color:var(--text-sub);margin-bottom:14px;">💬 ${arch.note}</div>`:'';
    actionHtml=`<div style="background:white;border-radius:14px;border:1.5px solid #C8EFDB;padding:20px;text-align:center;box-shadow:0 2px 10px rgba(76,175,130,.08);">
      <div style="font-size:14px;font-weight:800;color:#4CAF82;margin-bottom:6px;">✅ ${m}월 마감완료</div>
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:12px;">${closedDate} 확정됨</div>
      ${noteText}
      <button onclick="App.reopenMonthDirect(${y},${m})" style="font-size:12px;padding:8px 18px;background:#FFF0F5;border:1.5px solid #F0629266;border-radius:10px;cursor:pointer;color:#F06292;font-weight:600;">마감 취소</button>
    </div>`;
  }else{
    actionHtml=`<div style="background:white;border-radius:14px;border:1.5px solid var(--border);padding:20px;box-shadow:0 2px 10px rgba(160,140,220,.07);">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;color:var(--text-main);">📝 마감 메모 (선택)</div>
      <textarea id="close-note-inline" placeholder="이달 소감이나 특이사항 메모..." style="width:100%;min-height:70px;border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;font-size:13px;font-family:var(--font);resize:vertical;margin-bottom:14px;box-sizing:border-box;"></textarea>
      <button onclick="App.closeMonthDirect(${y},${m})" style="width:100%;padding:14px;background:linear-gradient(135deg,#5E4BC4,#A29BFE);color:white;border:none;border-radius:12px;cursor:pointer;font-size:15px;font-weight:800;letter-spacing:.3px;">✅ ${m}월 마감 확정하기</button>
    </div>`;
  }
  return monthNav+summaryHtml+catSectionHtml+actionHtml;
}

function renderAnalysis(){
  const container=document.getElementById('tab-analysis');
  if(!container)return;
  if(!S.analysisYear)S.analysisYear=new Date().getFullYear();
  if(!S.analysisMonth)S.analysisMonth=new Date().getMonth()+1;
  if(!S.expenseNatureSettings)S.expenseNatureSettings={};
  const y=S.analysisYear, m=S.analysisMonth;
  // 통계 모드 제거 — 분석 모드로 리디렉션
  if(_anaMode==='stats')_anaMode='analysis';
  const isAnalysis=_anaMode==='analysis';
  const isClose=_anaMode==='close';
  const nowY=new Date().getFullYear(),nowM=new Date().getMonth()+1;
  let bodyHtml='';
  if(isAnalysis)bodyHtml=_buildAnalysisView(y,m);
  else if(isClose)bodyHtml=_buildCloseView();
  else bodyHtml=_buildAnalysisView(y,m);
  const naturePanelHtml=isAnalysis&&_anaNaturePanelOpen?_buildNaturePanel(y):'';
  let pageTitle='재무 분석 📊';
  let pageSub='수입 대비 지출 성격을 분석하고, 재무 점수·정기비용·카테고리 현황을 확인하세요.';
  if(isClose){pageTitle='월마감 📋';pageSub='한 달의 결과를 요약해서 보여주는 보고서에요.';}
  container.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-sub">${pageSub}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        ${isAnalysis?`<button class="nsp-open-btn${_anaNaturePanelOpen?' active':''}" onclick="App._openNatureSettings()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          성격 설정 관리
        </button>`:''}

      </div>
    </div>
    <div class="ana2-mode-tabs">
      <button class="ana2-mode-btn${isAnalysis?' active':''}" onclick="App.changeAnalysisMode('analysis')">📊 분석</button>
      <button class="ana2-mode-btn${isClose?' active':''}" onclick="App.changeAnalysisMode('close')">📋 월마감</button>
    </div>
    ${naturePanelHtml}
    ${isAnalysis?`<div class="ana2-month-nav"><button class="month-btn" onclick="App.changeAnalysisMonth(-1)">‹</button><span class="month-label">${y}년 ${m}월</span><button class="month-btn" onclick="App.changeAnalysisMonth(1)">›</button><button onclick="App.deleteMonthAnalysisData(${y},${m})" style="margin-left:10px;font-size:11px;color:#F06292;background:#FFF0F5;border:1.5px solid #F0629244;border-radius:8px;padding:4px 10px;cursor:pointer;font-weight:600;">이 달 삭제</button></div>`:''}
    ${bodyHtml}
  `;
}



function toggleLedgerSubmenu(e){
  e.stopPropagation();
  const sub=document.getElementById('ledger-submenu');
  if(!sub)return;
  const isOpen=sub.style.display!=='none'&&sub.style.display!=='';
  sub.style.display=isOpen?'none':'block';
  const arrow=document.getElementById('ledger-sub-arrow');
  if(arrow)arrow.textContent=isOpen?'›':'∨';
}

// ===== APP EXPORT =====
// ===== VARIABLE EXPENSE INLINE PREVIEW =====
let _varPreviewCat=null;
let _varActiveEl=null;

function _clearVarActive(){
  if(_varActiveEl){
    _varActiveEl.classList.remove('var-active');
    _varActiveEl.style.removeProperty('--va-bg');
    _varActiveEl.style.removeProperty('--va-border');
    _varActiveEl=null;
  }
  document.querySelectorAll('.var-inline-panel').forEach(p=>p.remove());
  _varPreviewCat=null;
}

function showVarPreview(el){
  const category=el.dataset.vcat;
  const total=parseFloat(el.dataset.vtotal)||0;
  if(!category)return;
  // 같은 항목 다시 클릭 → 닫기
  if(_varPreviewCat===category){
    _clearVarActive();
    return;
  }
  // 이전 것 닫고 새 항목 열기
  _clearVarActive();
  _varActiveEl=el;
  _varPreviewCat=category;
  const cm=S.currentMonths.income;
  const theme=getMonthTheme(cm.m);
  // 활성 항목 스타일 (달 테마 컬러 전달)
  el.style.setProperty('--va-bg', theme.light);
  el.style.setProperty('--va-border', theme.border);
  el.classList.add('var-active');
  // 가계부 내역 조회 → 태그별 합계
  const key=mkey(cm.y,cm.m);
  const entries=(S.ledger[key]||[]).filter(e=>e.type==='expense'&&e.category===category);
  const tagMap={};
  entries.forEach(e=>{
    const tags=(e.tags||[]).filter(t=>t);
    if(tags.length===0){
      tagMap['(태그 없음)']=(tagMap['(태그 없음)']||0)+(e.amount||0);
    } else {
      tags.forEach(t=>{tagMap[t]=(tagMap[t]||0)+(e.amount||0);});
    }
  });
  const sorted=Object.entries(tagMap).sort((a,b)=>b[1]-a[1]);
  const listHTML=sorted.length===0
    ?'<div class="vpp-empty">내역 없음</div>'
    :sorted.map(([tag,amt])=>`
      <div class="vpp-item">
        <div class="vpp-left"><span class="vpp-tag">${tag}</span></div>
        <div class="vpp-right"><span class="vpp-amount">-${Math.round(amt).toLocaleString('ko-KR')}원</span></div>
      </div>`).join('');
  const panel=document.createElement('div');
  panel.className='var-inline-panel';
  panel.innerHTML=`
    <div class="vpp-inner" style="border-color:${theme.border};">
      <div class="vpp-list">${listHTML}</div>
    </div>`;
  el.after(panel);
  requestAnimationFrame(()=>panel.classList.add('open'));
}

function goToLedger(){
  _clearVarActive();
  document.querySelector('.nav-item[data-tab="ledger"]')?.click();
}

// ── 지출 성격 상세 내역 팝업 ──
function _openNatureDetail(key,y,m){
  const fmt=n=>Math.round(n).toLocaleString('ko-KR')+'원';
  const nature=ANA_NATURES.find(n=>n.key===key);
  if(!nature)return;
  const ns=S.expenseNatureSettings||{};
  // ★ 분석 기간 필터 적용 (분석 카드와 동일한 소스)
  const {totalIncome,ledgerEntries}=getMonthAnalysisData(y,m);
  const entries=ledgerEntries; // 이미 expense 만 필터됨
  const matched=entries.filter(e=>{
    const n=ns.hasOwnProperty(e.category||'')?ns[e.category||'']:getDefaultNature(e.category||'');
    return n===key;
  });
  const total=matched.reduce((s,e)=>s+(e.amount||0),0);
  // ★ % 기준: 수입 대비 (분석 카드와 동일)
  const pct=totalIncome>0?Math.round(total/totalIncome*100):0;
  const period=getAnalysisPeriod(y,m);

  // 카테고리 목록
  const cats=[...new Set(matched.map(e=>e.category||'기타'))];
  let activeCat=null;

  function renderList(cat){
    const list=cat?matched.filter(e=>(e.category||'기타')===cat):matched;
    if(list.length===0)return'<div style="padding:20px;text-align:center;color:var(--text-sub);font-size:13px;">해당 항목 없음</div>';
    return list.map(e=>{
      const d=e.date||'';
      const day=d.slice(-2).replace(/^0/,'')+'일';
      const tags=(e.tags||[]).map(t=>`<span style="font-size:10px;color:var(--text-sub);margin-left:4px;">${t}</span>`).join('');
      return`<div style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px dashed var(--border);">
        <div style="min-width:28px;text-align:center;font-size:11px;font-weight:700;color:${nature.color};background:${nature.light};border-radius:6px;padding:3px 4px;">${day}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:600;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.memo||'(메모 없음)'}${tags}</div>
          <div style="font-size:11px;color:var(--text-sub);margin-top:1px;">${e.category||'기타'}</div>
        </div>
        <div style="font-size:13px;font-weight:800;color:var(--text-main);flex-shrink:0;">${fmt(e.amount||0)}</div>
      </div>`;
    }).join('');
  }

  function render(){
    const catTabs=cats.map(c=>`<button onclick="window.__ndSetCat('${c.replace(/'/g,"\\'")}',${y},${m},'${key}')" style="font-size:11px;padding:4px 10px;border-radius:20px;font-weight:700;cursor:pointer;border:none;background:${activeCat===c?nature.color:'var(--bg)'};color:${activeCat===c?'white':nature.color};">${c}</button>`).join('');
    const catTotal=activeCat?matched.filter(e=>(e.category||'기타')===activeCat).reduce((s,e)=>s+(e.amount||0),0):total;
    const list=renderList(activeCat);
    const el=document.getElementById('nature-detail-modal');
    if(el)el.innerHTML=`
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:3100;display:flex;align-items:center;justify-content:center;padding:16px;" onclick="if(event.target===this)App._closeNatureDetail()">
        <div style="background:white;border-radius:20px;width:100%;max-width:460px;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2);overflow:hidden;">
          <div style="padding:18px 18px 14px;background:linear-gradient(135deg,${nature.light},white);">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;">
              <div>
                <div style="display:flex;align-items:center;gap:8px;color:${nature.color};margin-bottom:4px;">${nature.svg||''}<span style="font-size:15px;font-weight:900;">${nature.label} 상세</span></div>
                <div style="font-size:11px;color:var(--text-sub);">${period.label} · ${matched.length}건</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:22px;font-weight:900;color:${nature.color};">${fmt(catTotal)}</div>
                <div style="font-size:11px;color:var(--text-sub);">수입 대비 ${pct}%</div>
              </div>
            </div>
            ${cats.length>1?`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px dashed ${nature.color}22;">
              <button onclick="window.__ndSetCat(null,${y},${m},'${key}')" style="font-size:11px;padding:4px 10px;border-radius:20px;font-weight:700;cursor:pointer;border:none;background:${!activeCat?nature.color:'var(--bg)'};color:${!activeCat?'white':nature.color};">전체</button>
              ${catTabs}
            </div>`:''}
          </div>
          <div style="overflow-y:auto;flex:1;">${list}</div>
          <div style="padding:10px 16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:#fafafa;">
            <div style="font-size:12px;color:var(--text-sub);">${activeCat||'전체'} · ${activeCat?matched.filter(e=>(e.category||'기타')===activeCat).length:matched.length}건</div>
            <div style="font-size:14px;font-weight:900;color:${nature.color};">${fmt(catTotal)}</div>
          </div>
        </div>
      </div>`;
  }

  window.__ndSetCat=function(cat,y,m,key){
    activeCat=cat;
    render();
  };

  let el=document.getElementById('nature-detail-modal');
  if(!el){el=document.createElement('div');el.id='nature-detail-modal';document.body.appendChild(el);}
  render();
}

function _closeNatureDetail(){
  const el=document.getElementById('nature-detail-modal');
  if(el)el.innerHTML='';
}


// ===== 마감 아카이브 페이지 =====
function renderArchive(){
  const container=document.getElementById('archive-content');
  if(!container)return;
  const fmt=n=>Math.round(n).toLocaleString('ko-KR')+'원';
  // 미래 달 제외: 오늘 이후 달의 마감 항목은 표시하지 않음 (숫자 비교 — mkey는 "YYYY-M" 비패딩)
  const _now=new Date();
  const _nowY=_now.getFullYear(),_nowM=_now.getMonth()+1;
  const archived=Object.entries(S.monthClosedArchive||{})
    .filter(([key])=>{const[ky,km]=key.split('-').map(Number);return ky<_nowY||(ky===_nowY&&km<=_nowM);})
    .sort((a,b)=>{const[ay,am]=a[0].split('-').map(Number);const[by,bm]=b[0].split('-').map(Number);return by!==ay?by-ay:bm-am;});
  if(archived.length===0){
    container.innerHTML=`<div class="page-header"><div><h1 class="page-title">마감 아카이브 🗂️</h1><p class="page-sub">월별 마감 기록을 조회하고 재무 변화를 비교해보세요.</p></div></div><div class="ana-empty"><div style="font-size:36px;margin-bottom:12px;">📭</div>아직 마감된 달이 없어요.<br><span style="font-size:12px;">분석 → 월마감 탭에서 마감하면 여기에 기록됩니다.</span></div>`;
    return;
  }
  const totIncome=archived.reduce((s,[,d])=>s+(d.ledgerIncome||0),0);
  const totExpense=archived.reduce((s,[,d])=>s+(d.ledgerExpense||0),0);
  const totSavings=archived.reduce((s,[,d])=>s+(d.savings||0),0);
  const avgRate=archived.length>0?Math.round(archived.reduce((s,[,d])=>s+(d.savingsRate||0),0)/archived.length):0;
  const totNetChange=totIncome-totExpense;
  const netPct=totIncome>0?(totNetChange/totIncome*100).toFixed(1):0;
  const netColor=totNetChange>=0?'#4CAF82':'#F06292';
  const netVal=`${fmt(totNetChange)} (${netPct>0?'+':''}${netPct}%)`;
  const card=(label,val,color,sub)=>`<div style="background:white;border-radius:14px;border:1.5px solid var(--border);padding:14px 18px;box-shadow:0 2px 10px rgba(160,140,220,.08);">
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:4px;">${label}</div>
      <div style="font-size:18px;font-weight:900;color:${color};">${val}</div>
      ${sub?`<div style="font-size:10px;color:var(--text-sub);margin-top:2px;">${sub}</div>`:''}
    </div>`;
  const summaryHtml=`
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:10px;">
    ${card('마감 완료',archived.length+'개월','#5E4BC4','')}
    ${card('총 수입 누계',fmt(totIncome),'#4CAF82','')}
    ${card('총 지출 누계',fmt(totExpense),'#F06292','')}
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;">
    ${card('총 저축 누계',fmt(totSavings),'#5E4BC4','')}
    ${card('평균 저축률',avgRate+'%',avgRate>=30?'#4CAF82':'#FFB347','')}
    ${card('순 자산 증감 누계',netVal,netColor,'')}
  </div>`;
  const headerRow=`<div style="display:grid;grid-template-columns:100px 1fr 1fr 1fr 70px 90px 28px;gap:8px;padding:8px 16px;font-size:11px;font-weight:700;color:var(--text-sub);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;">
    <span>월</span><span>수입</span><span>지출</span><span>저축액</span><span style="text-align:center;">저축률</span><span style="text-align:right;">순자산 증감</span><span></span>
  </div>`;
  const rowsHtml=archived.map(([key,data])=>{
    const{year:y,month:mo,ledgerIncome:income,ledgerExpense:expense,savings,savingsRate,note,categories}=data;
    const isOpen=(_archExpandedKey===key);
    const rateColor=(savingsRate||0)>=50?'#4CAF82':(savingsRate||0)>=30?'#FFB347':'#F06292';
    const{natureMap,totalIncome:closedIncome}=getMonthAnalysisData(y,mo);
    // ★ 수입 기준: 마감 시점에 기록된 예산수입(budgetIncome) 우선 사용 → 재무성격 % 왜곡 방지
    // ?? 사용: budgetIncome=0인 경우도 올바르게 처리 (|| 는 0을 falsy로 취급)
    const incomeBase=(data.budgetIncome??income??closedIncome)??0;
    const{score,grade,color:scoreColor,feedback}=calcConsumeScore(natureMap,incomeBase);
    const prevScore=_getPrevScore(y,mo);
    const cats=(categories||[]);
    const maxCat=cats.length>0?Math.max(...cats.map(c=>c.amount)):1;
    const catRows=cats.map(c=>`<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;"><span style="font-weight:600;">${c.name}</span><span style="font-weight:700;">${fmt(c.amount)}</span></div><div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${Math.min(100,c.amount/(maxCat||1)*100)}%;background:linear-gradient(90deg,#A29BFE,#74B9FF);border-radius:3px;"></div></div></div>`).join('');
    const natCards=ANA_NATURES.map(n=>{const amt=natureMap[n.key]||0;const pct=incomeBase>0?Math.round(amt/incomeBase*100):0;return`<div class="ana2-closed-nature-card" style="background:${n.light};border:1.5px solid ${n.color}22;"><div style="font-size:10px;color:var(--text-sub);">${n.label}</div><div style="font-size:15px;font-weight:900;color:${n.color};">${pct}%</div><div style="font-size:10px;color:var(--text-sub);">${fmt(amt)}</div></div>`;}).join('');
    const scoreHtml=_buildScoreBox(score,grade,scoreColor,feedback,prevScore);
    const detailHtml=isOpen?`<div class="ana2-closed-detail" style="margin-top:0;border-top:none;border-radius:0 0 14px 14px;border:1.5px solid #A29BFE44;border-top:none;">
      <div class="ana2-closed-kpi-grid">
        <div class="ana2-kpi-box" style="border-color:#4CAF8244;"><div class="ana2-kpi-label">총 수입</div><div class="ana2-kpi-val" style="color:#4CAF82;">${fmt(income||0)}</div></div>
        <div class="ana2-kpi-box" style="border-color:#F0629244;"><div class="ana2-kpi-label">총 지출</div><div class="ana2-kpi-val" style="color:#F06292;">${fmt(expense||0)}</div></div>
        <div class="ana2-kpi-box" style="border-color:#A29BFE44;"><div class="ana2-kpi-label">저축액</div><div class="ana2-kpi-val" style="color:#A29BFE;">${fmt(savings||0)}</div></div>
        <div class="ana2-kpi-box" style="border-color:#A29BFE44;"><div class="ana2-kpi-label">저축률</div><div class="ana2-kpi-val" style="color:#A29BFE;">${savingsRate||0}%</div></div>
      </div>
      ${scoreHtml}
      <div style="margin-bottom:14px;"><div style="font-size:12px;font-weight:700;color:var(--text-sub);margin-bottom:8px;">재무 성격 요약</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">${natCards}</div></div>
      <div style="margin-bottom:14px;"><div style="font-size:12px;font-weight:700;color:var(--text-sub);margin-bottom:8px;">카테고리별 지출</div>${catRows||'<div style="color:var(--text-sub);font-size:12px;">기록 없음</div>'}</div>
      <div style="margin-bottom:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <div style="font-size:12px;font-weight:700;color:var(--text-sub);">이번 달 소감</div>
          <button onclick="App.deleteArchiveEntry('${key}')" style="font-size:11px;color:#F06292;background:#FFF0F5;border:1.5px solid #F0629244;border-radius:8px;padding:4px 10px;cursor:pointer;font-weight:600;">🗑 이 마감 삭제</button>
        </div>
        ${note?`<div style="background:white;border-radius:10px;border:1.5px solid var(--border);padding:10px 12px;font-size:13px;color:var(--text-main);">${note}</div>`:'<div style="color:var(--text-sub);font-size:12px;">소감 없음</div>'}
      </div>
    </div>`:'' ;
    const netChange=(income||0)-(expense||0);
    const netChgColor=netChange>=0?'#4CAF82':'#F06292';
    const netChgStr=(netChange>=0?'+':'')+fmt(netChange);
    return`<div style="margin-bottom:8px;">
      <div onclick="App._toggleArchiveRow('${key}')" style="display:grid;grid-template-columns:100px 1fr 1fr 1fr 70px 90px 28px;gap:8px;align-items:center;padding:14px 16px;background:white;border-radius:${isOpen?'14px 14px 0 0':'14px'};border:1.5px solid ${isOpen?'#A29BFE':'var(--border)'};cursor:pointer;box-shadow:0 1px 8px rgba(160,140,220,.07);">
        <span style="font-size:14px;font-weight:800;">${y}년 ${mo}월</span>
        <span style="font-size:13px;font-weight:700;color:#4CAF82;">${fmt(income||0)}</span>
        <span style="font-size:13px;font-weight:700;color:#F06292;">${fmt(expense||0)}</span>
        <span style="font-size:13px;font-weight:700;color:#5E4BC4;">${fmt(savings||0)}</span>
        <span style="text-align:center;font-size:14px;font-weight:900;color:${rateColor};">${savingsRate||0}%</span>
        <span style="text-align:right;font-size:13px;font-weight:900;color:${netChgColor};">${netChgStr}</span>
        <span style="text-align:center;font-size:14px;color:var(--text-sub);transition:transform .18s;display:inline-block;transform:${isOpen?'rotate(90deg)':'rotate(0)'};">›</span>
      </div>
      ${detailHtml}
    </div>`;
  }).join('');
  container.innerHTML=`
    <div class="page-header"><div>
      <h1 class="page-title">마감 아카이브 🗂️</h1>
      <p class="page-sub">월별 마감 기록을 조회하고 재무 변화를 비교해보세요.</p>
    </div></div>
    ${summaryHtml}
    ${headerRow}
    ${rowsHtml}
  `;
}

let _archExpandedKey=null;
function _toggleArchiveRow(key){
  _archExpandedKey=(_archExpandedKey===key)?null:key;
  renderArchive();
}

// ===== 설정 페이지 =====
function renderSettings(){
  const container=document.getElementById('settings-content');
  if(!container)return;
  const opacity=S.themeOpacity!==undefined?S.themeOpacity:50;
  const storageRaw=localStorage.getItem('kakeibo_v4')||'';
  const _storageBytes=new Blob([storageRaw]).size;
  const storagePct=Math.min(100,Math.round(_storageBytes/(5*1024*1024)*100));
  const storageKB=Math.round(_storageBytes/1024);
  // 카테고리별 용량 계산
  const _sz=obj=>{try{return new Blob([JSON.stringify(obj??{})]).size;}catch(e){return 0;}};
  // 뱃지용 카운트 계산
  const _incomeMonths=Object.keys(S.monthlyData||{}).length;
  const _cardCount=(S.creditCards||[]).length;
  const _assetCount=(S.assets||[]).length;const _stockCount=(S.stocks||[]).length;
  const _calMonths=new Set([...Object.keys(S.foodCalendar||{}),...Object.keys(S.foodDirectSet||{}),...(()=>{const ks=[];Object.keys(S.consumptionCalendar||{}).forEach(y=>Object.keys(S.consumptionCalendar[y]||{}).forEach(m=>ks.push(y+'-'+m)));return ks;})()]).size;
  const _ledgerEntries=Object.values(S.ledger||{}).reduce((s,arr)=>s+(arr||[]).length,0);
  const _archiveMonths=Object.keys(S.monthClosedArchive||{}).length;
  const _storageCats=[
    {label:'수입 / 지출',color:'#A29BFE',bytes:_sz(S.monthlyData),badge:_incomeMonths>0?_incomeMonths+'개월':null},
    {label:'신용카드',color:'#74B9FF',bytes:_sz(S.creditCards)+_sz(S.cardSettings),badge:_cardCount>0?_cardCount+'개':null},
    {label:'자산 목록',color:'#4DB6AC',bytes:_sz(S.assets)+_sz(S.stocks),badge:(_assetCount+_stockCount)>0?'자산 '+_assetCount+' · 주식 '+_stockCount:null},
    {label:'캘린더',color:'#FFB347',bytes:_sz(S.consumptionCalendar)+_sz(S.foodCalendar)+_sz(S.foodDirectSet)+_sz(S.calFoodSync),badge:_calMonths>0?_calMonths+'개월':null},
    {label:'가계부',color:'#FF8A65',bytes:_sz(S.ledger)+_sz(S.ledgerCategories)+_sz(S.keywordRules),badge:_ledgerEntries>0?_ledgerEntries+'건':null},
    {label:'분석',color:'#81C784',bytes:_sz(S.expenseNatureSettings)+_sz(S.savingsGoals)+_sz(S.budgetCategories)+_sz(S.monthBudgets)+_sz(S.automations),badge:null},
    {label:'마감 아카이브',color:'#F48FB1',bytes:_sz(S.monthClosedArchive)+_sz(S.closedMonths),badge:_archiveMonths>0?_archiveMonths+'개월':null},
    {label:'여행 플래너',color:'#81ECEC',bytes:_sz(S.travels),badge:((S.travels?.trips?.length||0)+(S.travels?.bucketList?.length||0))>0?'여행 '+(S.travels?.trips?.length||0)+' · 버킷 '+(S.travels?.bucketList?.length||0):null},
  ];
  const _catSum=_storageCats.reduce((s,c)=>s+c.bytes,0);
  _storageCats.push({label:'설정/기타',color:'#CE93D8',bytes:Math.max(0,_storageBytes-_catSum)});
  const _catTotal=_storageCats.reduce((s,c)=>s+c.bytes,0);
  const _barSegs=_storageCats.map(c=>`<div style="flex:${c.bytes||0};background:${c.color};min-width:${c.bytes>0?2:0}px;"></div>`).join('');
  const _catRows=_storageCats.filter(c=>c.bytes>0).map(c=>{
    const ckb=(c.bytes/1024).toFixed(1);
    const bw=_catTotal>0?Math.round((c.bytes/_catTotal)*100):0;
    const badgeHtml=c.badge?`<span style="font-size:10px;font-weight:600;background:${c.color}22;color:${c.color};border-radius:5px;padding:1px 6px;margin-left:2px;">${c.badge}</span>`:'';
    return`<div style="margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;border-radius:2px;background:${c.color};display:inline-block;flex-shrink:0;"></span>
          <span style="font-size:13px;font-weight:500;color:var(--text-main);">${c.label}</span>
          ${badgeHtml}
        </div>
        <span style="font-size:12px;font-weight:600;color:var(--text-main);">${ckb} KB</span>
      </div>
      <div style="height:3px;background:var(--border);border-radius:2px;overflow:hidden;">
        <div style="width:${bw}%;height:100%;background:${c.color};border-radius:2px;"></div>
      </div>
    </div>`;
  }).join('');
  // ── 여행 통계 계산 ──────────────────────────────────────────
  const _trips = (S.travels && S.travels.trips) || [];
  const _buckets = (S.travels && S.travels.bucketList) || [];
  const _tripCount = _trips.length;
  const _bucketCount = _buckets.length;
  const _bucketDone = _buckets.filter(b => b.checked).length;
  const _totalTravelExpense = _trips.reduce((sum, t) => sum + ((t.expenses||[]).reduce((s,e)=>s+(parseFloat(e.amount)||0),0)), 0);
  const _foreignTrips = _trips.filter(t => t.type === 'foreign').length;

  const _travelCatHtml = window.TravelApp ? TravelApp.renderTravelCategorySettings() : '<div style="color:var(--text-sub);font-size:13px;">여행 플래너 모듈 로딩 중...</div>';

  container.innerHTML=`
    <div class="page-header"><div>
      <h1 class="page-title">설정 ⚙️</h1>
      <p class="page-sub">앱 환경 설정, 데이터 관리, 저장 용량을 관리하세요.</p>
    </div></div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start;">
      <div>
        <!-- 테마 진하기 -->
        <div class="card" style="margin-bottom:16px;">
          <div style="font-size:15px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px;">🎨 테마 진하기</div>
          <div style="font-size:12px;color:var(--text-sub);margin-bottom:10px;">배경 색상의 진하기를 조절합니다.</div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span style="font-size:12px;color:var(--text-sub);">밝게</span>
            <input type="range" id="settings-opacity-slider" min="0" max="100" value="${opacity}" oninput="App.saveThemeOpacity(this.value)" class="theme-opacity-slider" style="flex:1;accent-color:#A29BFE;"/>
            <span style="font-size:12px;color:var(--text-sub);">진하게</span>
          </div>
          <span style="font-size:11px;color:var(--text-sub);">현재 값: <span id="opacity-val-span">${opacity}</span></span>
        </div>
        <!-- 저장 용량 -->
        <div class="card" style="margin-bottom:16px;">
          <div style="font-size:15px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px;">💾 저장 용량</div>
          <div style="height:8px;border-radius:4px;overflow:hidden;display:flex;background:var(--border);margin-bottom:6px;gap:1px;">
            ${_barSegs}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-sub);margin-bottom:16px;">
            <span>사용 중 <b style="color:${storagePct>80?'#F06292':'#5E4BC4'};">${storagePct}%</b></span>
            <span>${storageKB} KB / 5,000 KB</span>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:14px;">
            ${_catRows}
          </div>
        </div>
        <!-- 데이터 정리 시작 버튼 -->
        <button onclick="App.openDeleteModal()" style="width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#A29BFE,#7B68EE);color:white;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          🗑 데이터 정리 시작
          ${Object.values(S.deleteExclusions||{}).filter(Boolean).length>0?`<span style="font-size:11px;background:rgba(255,255,255,.25);border-radius:10px;padding:1px 7px;">${Object.values(S.deleteExclusions||{}).filter(Boolean).length}개 제외</span>`:''}
        </button>
      </div>
      <!-- 데이터 관리 -->
      <div class="card">
        <div style="font-size:15px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:8px;">📊 데이터 관리</div>
        <div style="font-size:12px;color:var(--text-sub);margin-bottom:16px;">데이터를 Excel 파일로 내보내거나 가져올 수 있습니다.</div>
        <div style="margin-bottom:20px;">
          <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--text-main);">📥 내보내기 (Excel)</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${[
              {id:'export-all',label:'전체 데이터 내보내기',desc:'수입·지출·자산·구독 전체',fn:'exportAllExcel()'},
              {id:'export-month',label:'이달 수입/지출',desc:'현재 달 거래 내역',fn:'exportMonthExcel()'},
              {id:'export-stats',label:'연간 통계 요약',desc:'월별 수입·지출·저축 집계',fn:'exportStatsExcel()'},
              {id:'export-analysis',label:'분석 데이터 내보내기',desc:'재무 성격·점수·카테고리 분석',fn:'exportAnalysisExcel()'},
            ].map(b=>`<button onclick="App.${b.fn}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:12px;border:1.5px solid var(--border);background:white;cursor:pointer;text-align:left;width:100%;transition:background .15s;" onmouseover="this.style.background='#F5EEFF'" onmouseout="this.style.background='white'">
              <div><div style="font-size:13px;font-weight:600;color:#5E4BC4;">📤 ${b.label}</div><div style="font-size:11px;color:var(--text-sub);">${b.desc}</div></div>
              <span style="font-size:11px;color:var(--text-sub);">xlsx ↓</span>
            </button>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:20px;">
          <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--text-main);">📤 가져오기 (Excel)</div>
          <label style="display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:12px;border:1.5px dashed #A29BFE;background:#F5EEFF;cursor:pointer;">
            <div><div style="font-size:13px;font-weight:600;color:#5E4BC4;">📂 Excel 파일 선택</div><div style="font-size:11px;color:var(--text-sub);margin-top:2px;">.xlsx 파일로 저장된 전체 백업을 복원합니다</div></div>
            <span style="font-size:20px;">⬆️</span>
            <input type="file" accept=".xlsx,.xls" onchange="App.importExcel(this)" style="display:none;"/>
          </label>
          <div style="font-size:11px;color:var(--text-sub);margin-top:6px;">⚠️ 가져오기 시 현재 데이터가 덮어쓰기됩니다. 먼저 백업을 권장합니다.</div>
        </div>
        <div style="padding-top:14px;border-top:1.5px solid var(--border);">
          <div style="font-size:13px;font-weight:700;margin-bottom:4px;color:var(--text-main);">🗑 데이터 삭제</div>
          <div style="font-size:12px;color:var(--text-sub);margin-bottom:10px;">삭제 제외항목을 설정한 뒤 월별로 정리하세요.</div>
        </div>
      </div>
    </div>

    <!-- 여행 분류 기본값 설정 (맨 아래) -->
    <div class="card" style="margin-top:16px;opacity:0.85;">
      <div style="font-size:13px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:8px;color:var(--text-sub);">🏷️ 여행 분류 기본값 설정</div>
      <div style="font-size:11px;color:var(--text-sub);margin-bottom:14px;">일정·지출·버킷의 분류 항목을 원하는 대로 추가·삭제할 수 있어요.</div>
      ${_travelCatHtml}
    </div>
  `;
}

// ===== EXCEL 내보내기/가져오기 =====
function exportAllExcel(){
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');return;}
  const wb=XLSX.utils.book_new();
  // 월별 수입/지출 시트
  const incRows=[];const expRows=[];
  Object.entries(S.monthlyData||{}).sort().forEach(([key,d])=>{
    const[y,m]=key.split('-').map(Number);
    (d.income||[]).forEach(i=>incRows.push({연도:y,월:m,항목:i.name,카테고리:i.category||'',금액:i.amount||0}));
    (d.fixed||[]).forEach(f=>expRows.push({연도:y,월:m,유형:'고정',항목:f.name,카테고리:f.category||'',금액:f.amount||0,저축여부:f.isSavings?'Y':'N'}));
    (d.variable||[]).forEach(v=>expRows.push({연도:y,월:m,유형:'변동',항목:v.name,카테고리:v.category||'',금액:v.amount||0,저축여부:'N'}));
  });
  // 가계부 시트
  const ledRows=[];
  Object.entries(S.ledger||{}).sort().forEach(([key,entries])=>{
    const[y,m]=key.split('-').map(Number);
    (entries||[]).forEach(e=>ledRows.push({연도:y,월:m,날짜:e.date||'',유형:e.type==='income'?'수입':'지출',카테고리:e.category||'',메모:e.memo||'',태그:(e.tags||[]).join(','),금액:e.amount||0}));
  });
  if(incRows.length>0)XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(incRows),'수입');
  if(expRows.length>0)XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(expRows),'수입지출');
  if(ledRows.length>0)XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(ledRows),'가계부');
  // 자산 시트
  if((S.assets||[]).length>0){
    const assetRows=(S.assets||[]).map(a=>({이름:a.name,카테고리:a.category||'',금액:a.amount||0,메모:a.note||''}));
    XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(assetRows),'자산');
  }
  // 구독 시트
  if((S.subscriptions||[]).length>0){
    const subRows=(S.subscriptions||[]).map(s=>({이름:s.name,금액:s.amount||0,주기:s.cycle||'월',카테고리:s.category||''}));
    XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(subRows),'구독');
  }
  if(wb.SheetNames.length===0)XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([{메시지:'데이터 없음'}]),'데이터없음');
  XLSX.writeFile(wb,'가계부_전체백업_'+new Date().toISOString().slice(0,10)+'.xlsx');
}

function exportMonthExcel(){
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');return;}
  const cm=S.currentMonths.dashboard;const y=cm.y,m=cm.m;
  const key=mkey(y,m);
  const rows=[];
  (S.ledger[key]||[]).forEach(e=>{
    rows.push({날짜:e.date||'',유형:e.type==='income'?'수입':'지출',카테고리:e.category||'',메모:e.memo||'',태그:(e.tags||[]).join(','),'금액(원)':e.amount||0});
  });
  if(rows.length===0){alert('이달 가계부 내역이 없습니다.');return;}
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.json_to_sheet(rows,{header:['날짜','유형','카테고리','메모','태그','금액(원)']});
  XLSX.utils.book_append_sheet(wb,ws,y+'년 '+m+'월');
  XLSX.writeFile(wb,'가계부_'+y+'년_'+m+'월.xlsx');
}

function exportStatsExcel(){
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');return;}
  const rows=[];
  const archived=Object.entries(S.monthClosedArchive||{}).sort();
  archived.forEach(([key,d])=>{
    rows.push({연도:d.year,월:d.month,'총수입(원)':d.ledgerIncome||0,'총지출(원)':d.ledgerExpense||0,'저축액(원)':d.savings||0,'저축률(%)':d.savingsRate||0,소감:d.note||''});
  });
  if(rows.length===0){alert('마감된 달이 없습니다. 월마감을 먼저 진행해주세요.');return;}
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),'연간통계');
  XLSX.writeFile(wb,'가계부_연간통계_'+new Date().getFullYear()+'.xlsx');
}

function exportAnalysisExcel(){
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');return;}
  const rows=[];
  const archived=Object.entries(S.monthClosedArchive||{}).sort();
  archived.forEach(([key,d])=>{
    const{y,m}={y:d.year,m:d.month};
    const{natureMap,totalIncome}=getMonthAnalysisData(y,m);
    const incomeBase=totalIncome||d.ledgerIncome||0;
    const{score,grade}=calcConsumeScore(natureMap,incomeBase);
    const pct=amt=>incomeBase>0?Math.round(amt/incomeBase*100):0;
    rows.push({
      연도:y,월:m,
      '총수입(원)':d.ledgerIncome||0,
      '총지출(원)':d.ledgerExpense||0,
      '저축률(%)':d.savingsRate||0,
      '재무관리점수':score,
      등급:grade,
      '필수지출(원)':natureMap['필수']||0,'필수지출(%)':pct(natureMap['필수']||0),
      '생활지출(원)':natureMap['생활']||0,'생활지출(%)':pct(natureMap['생활']||0),
      '저축투자(원)':natureMap['투자']||0,'저축투자(%)':pct(natureMap['투자']||0),
      '특별지출(원)':natureMap['특별']||0,'특별지출(%)':pct(natureMap['특별']||0),
    });
  });
  if(rows.length===0){alert('마감된 달이 없습니다. 월마감을 먼저 진행해주세요.');return;}
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),'분석데이터');
  XLSX.writeFile(wb,'가계부_분석데이터_'+new Date().getFullYear()+'.xlsx');
}

function importExcel(input){
  if(!window.XLSX){alert('엑셀 라이브러리를 불러오는 중입니다.');return;}
  const file=input.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const wb=XLSX.read(e.target.result,{type:'array'});
      const sheet=wb.Sheets['가계부']||wb.Sheets[wb.SheetNames[0]];
      if(!sheet){alert('올바른 형식의 파일이 아닙니다.');return;}
      alert('가져오기 기능: 전체 백업 파일의 경우 개발자에게 문의하거나 직접 데이터를 입력해주세요.\n(현재 버전은 가계부 시트 가져오기를 지원합니다)');
    }catch(err){
      alert('파일을 읽는 중 오류가 발생했습니다: '+err.message);
    }
    input.value='';
  };
  reader.readAsArrayBuffer(file);
}

window.App={
  changeMonth,changeCalYear,toggleDashSection,toggleDashVarSection,applyMonthTheme,setDashVarMode,
  showDonutTip,hideDonutTip,_donutOtherToggle,_openIconPicker,_saveLcatIcon,_openColorPicker,_saveLcatColor,switchTab,
  openModal,closeModal,openVariableModal,
  openBudgetModal,saveBudgetCategory,deleteBudgetCategory,openBudgetAutoModal,applyBudgetSuggestions,
  openBudgetCatSyncModal,saveBudgetCatSync,
  openIncomeModal,openFixedModal,openDefaultMode,cancelDefaultMode,saveDefaultItems,deleteDefaultItems,saveIncome,saveFixed,saveVariable,saveCredit,openCreditModal,editCredit,saveAsset,saveStock,
  editItem,deleteItem,
  updateAssetAmount,updateStockPrice,updateStockBuyAmount,updateStockCurrentAmount,onStockTypeChange,renderAssetStocks,
  deleteCredit,toggleCreditPaid,markAllCreditPaidThisMonth,
  applyLedgerAutomations,toggleLedgerAutoPanel,addAutoInline,
  toggleKwRulePanel,addKwRule,deleteKwRule,
  openEditLedgerModal,saveLedgerEdit,onLedgerEditTypeChange,
  openCalModal,saveCalEvent,deleteCalEvent,editCalEvent,
  openSavingsModal,editSavingsGoal,saveSavingsGoal,deleteSavingsGoal,updateSavedAmount,pickSavingsColor,
  toggleFoodPanel,closeFoodPanel,saveFoodField,toggleFoodDirect,saveFoodDirect,
  toggleCalSpendMode,openLegendSettings,saveLegendSettings,_onLegendTypeChange,_refreshLegendPreview,_addLegendRow,_deleteLegendRow,
  saveThemeOpacity,toggleThemeOpacityLock,syncThemeSlider,
  toggleCardSettings,addCardSetting,deleteCardSetting,updateCardName,addRate,deleteRate,updateRate,
  calcInstallment,
  addLedgerEntry,deleteLedgerEntry,setLedgerFilter,setTagFilter,
  onMemoInput,onMemoKeydown,selectMemoTag,hideMemoDropdown,
  toggleSearchPanel,doLedgerSearch,
  exportLedgerExcel,
  openCloseMonthModal,closeMonth,reopenMonth,
  renderMonthlyArchive,deleteArchiveEntry,_toggleArchiveCard,toggleLedgerSubmenu,
  _toggleCatDetail,
  renderAnalysis,changeAnalysisMode,changeAnalysisMonth,_toggleAnaMonth,_toggleClosedMonth,_toggleAnalysisMenu,_openNatureSettings,_setNature,calcConsumeScore,
  _selectNatureKey,_nsPickIcon,_nsToggleCat,openTagMgmtModal,_tagMgmtRender,_addSub,_deleteSub,_deleteSubThisMonth,_deleteSubPermanent,_updateSubName,_updateSubAmount,_openTagSuggest,_applyTagSuggest,_applyTagSuggestPopup,deleteMonthAnalysisData,_openNatureDetail,_closeNatureDetail,closeMonthDirect,reopenMonthDirect,
  fetchStockPrices,
  downloadMonthlyReport,
  showVarPreview,goToLedger,
  _toggleLedgerFilterDropdown(){
    const dd=document.getElementById('ledger-filter-dropdown');
    if(dd)dd.style.display=dd.style.display==='none'?'flex':'none';
  },
  _closeLedgerFilterDropdown(){
    const dd=document.getElementById('ledger-filter-dropdown');
    if(dd)dd.style.display='none';
  },
  toggleSsbItem,
  toggleSidebar,closeSidebar,
  toggleNavGroup:(g)=>{if(window.TravelApp)TravelApp.toggleNavGroup(g);},
  editAuto,saveAuto,deleteAuto,toggleAuto,
  openAssetModal,promptAddAssetCategory,openStockModal,
  renderWeeklySpend,
  toggleCalFoodSync,
  saveRemainingBudget,
  renderFundCalc,setFundAmount,addFundItem,deleteFundItem,updateFundItem,
  previewFundItem,previewFundAmount,
  resetFundCalc,toggleAssetSelector,applyAssetSelection,applyAssetLink,
  toggleAssetTotalLink,syncFundCalcToAssets,
  addLcatEntry,deleteLcatEntry,toggleLcatSavings,saveLcatName,toggleLcatPanel,
  toggleDeleteExclusion,openDeleteModal,confirmDeleteMonth,deleteMonthData,
  _updateDeleteBulkBtn,toggleAllDeleteCheck,deleteSelectedMonths,
  numInputFmt,numInputParse,
  _dmDragStart,_dmDragOver,_dmDragLeave,_dmDrop,_dmDragEnd,_dmTouchStart,_dmTouchMove,_dmTouchEnd,
  renderAll,
  renderArchive,renderSettings,
  _toggleArchiveRow,
  exportAllExcel,exportMonthExcel,exportStatsExcel,exportAnalysisExcel,
  importExcel,
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.nav-item,.nav-sub-item').forEach(item=>{
    if(item.dataset.tab)item.addEventListener('click',()=>switchTab(item.dataset.tab));
  });
  document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>e.stopPropagation()));

  // 모달 내 Enter 키 → 저장 버튼 자동 클릭
  document.addEventListener('keydown',e=>{
    if(e.key!=='Enter')return;
    const active=document.activeElement;
    if(!active||active.tagName==='TEXTAREA'||active.tagName==='SELECT')return;
    const modal=document.querySelector('.modal.active');
    if(!modal||!modal.contains(active))return;
    const saveBtn=modal.querySelector('.btn-save');
    if(saveBtn&&!saveBtn.disabled){e.preventDefault();saveBtn.click();}
  });

  loadState();
  updateStorageBar();
  // 항상 초기 렌더링 실행 (로컬 데이터 or 기본값 표시)
  // Firebase 모드에서는 FB_MERGE 후 renderAll()이 다시 호출되어 Firebase 데이터로 갱신됨
  try{renderAll();}catch(e){console.error('renderAll error:',e);}
});
