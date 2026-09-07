(function(){
  'use strict';
  const BANK=window.A22_BANK;
  const ERB_BASELINE=[
    {name:'Verbal Reasoning',scale:559,nn:51,inorm:18,focus:'Word relationships · logic · inference'},
    {name:'Vocabulary',scale:639,nn:91,inorm:48,focus:'Maintain strong vocabulary + context clues'},
    {name:'Reading Comprehension',scale:596,nn:66,inorm:33,focus:'Main idea · inference · evidence · nonfiction'},
    {name:'Writing Mechanics',scale:612,nn:82,inorm:39,focus:'Grammar · punctuation · capitalization · usage'},
    {name:'Writing Concepts & Skills',scale:570,nn:63,inorm:22,focus:'Organization · purpose · support · style'},
    {name:'Quantitative Reasoning',scale:551,nn:57,inorm:22,focus:'Patterns · comparisons · generalization · data reasoning'},
    {name:'Mathematics',scale:558,nn:59,inorm:29,focus:'Concepts · application · computation · word problems'}
  ];
  const STORE_KEY='audrey22_learning_os_v3';
  const APP_VERSION='3.4';
  const SESSION_PLAN_VERSION='fresh-25-plus-mistake-book-v1';
  const TRAINING_SECTIONS=[
    {key:'math',label:'Math',icon:'🧮'},
    {key:'reading',label:'Reading',icon:'📖'},
    {key:'english',label:'English',icon:'✍️'},
    {key:'science',label:'Science',icon:'🔬'},
    {key:'social',label:'Social Studies',icon:'🌎'},
    {key:'transfer',label:'Transfer Prep',icon:'🎓'},
    {key:'boss',label:'Boss Challenge',icon:'🧠'}
  ];
  const REVIEW_SECTION={key:'review',label:'Review',icon:'🔁'};
  const DAILY_FRESH_TARGET=25;
  const RECENT_FRESH_DAYS=7;
  const todayKey=()=>new Date().toISOString().slice(0,10);
  const addDays=(dateStr,n)=>{const d=new Date(dateStr+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const $=id=>document.getElementById(id);
  const defaultState=()=>({
    xp:0,streak:0,lastCompletedDate:null,
    history:[], attempts:{}, reviewQueue:[], mistakeBook:[], dailyFreshArchive:{},
    session:null,dailySession:null,
    parent:{
      schoolMath:'',schoolEnglish:'',schoolScience:'',schoolHistory:'',schoolNotes:'',
      advancedMath:'',advancedOther:'',
      milestone:'8th Grade Math Placement Readiness',milestoneDate:'Needs confirmation with Hillbrook',
      milestoneNotes:'Build evidence: school performance, placement-style accuracy, ERB growth, and teacher feedback.',
      dailyTarget:25,mathIntensity:'balanced', placementChecks:{}
    },
    roadmapChecks:{}
  });
  let state=load();
  let currentIndex=0;
  let selectedChoice=null;
  let currentSessionMode='daily';
  setTimeout(sanitizeStoredState,0);

  function load(){
    try{const raw=localStorage.getItem(STORE_KEY); if(!raw)return defaultState(); return deepMerge(defaultState(),JSON.parse(raw));}catch(e){return defaultState()}
  }
  function deepMerge(base,extra){
    if(Array.isArray(base)) return Array.isArray(extra)?extra:base;
    if(base && typeof base==='object'){
      const out={...base}; Object.keys(extra||{}).forEach(k=>{out[k]=(base[k]&&typeof base[k]==='object'&&!Array.isArray(base[k]))?deepMerge(base[k],extra[k]):extra[k]});return out;
    } return extra??base;
  }
  function save(){localStorage.setItem(STORE_KEY,JSON.stringify(state));}
  function seedFromString(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
  function rngFor(s){return BANK.mulberry32(seedFromString(s))}
  function choice(arr,rng){return arr[Math.floor(rng()*arr.length)]}
  function unique(arr){return [...new Set(arr)]}
  function validQuestion(q){
    return !!(q && typeof q.prompt==='string' && q.prompt.trim() && Array.isArray(q.choices) && q.choices.length>=2 && Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.choices.length);
  }
  function questionSignature(q){
    return [q?.subject||'',q?.skill||'',q?.passageTitle||'',q?.prompt||''].join('|').toLowerCase().replace(/\s+/g,' ').trim();
  }
  function recentFreshEntries(days=RECENT_FRESH_DAYS){
    const out=[];
    for(let i=1;i<=days;i++){
      const d=addDays(todayKey(),-i);
      const rows=state.dailyFreshArchive?.[d];
      if(Array.isArray(rows)) out.push(...rows);
    }
    return out;
  }
  function pruneFreshArchive(){
    const keepFrom=addDays(todayKey(),-(RECENT_FRESH_DAYS+3));
    Object.keys(state.dailyFreshArchive||{}).forEach(d=>{if(d<keepFrom)delete state.dailyFreshArchive[d]});
  }
  function archiveFreshSession(date,items){
    state.dailyFreshArchive=state.dailyFreshArchive||{};
    const prior=Array.isArray(state.dailyFreshArchive[date])?state.dailyFreshArchive[date]:[];
    const combined=[...prior,...items.map(q=>({id:q.id,signature:questionSignature(q),subject:q.subject,readingSet:q.readingSet||null}))];
    const seen=new Set();
    state.dailyFreshArchive[date]=combined.filter(x=>{const k=x.signature||x.id;if(!k||seen.has(k))return false;seen.add(k);return true});
    pruneFreshArchive();
  }
  function sanitizeStoredState(){
    if(state.session?.mode==='daily' && !state.dailySession) state.dailySession=state.session;
    if(state.dailySession && (!Array.isArray(state.dailySession.items) || state.dailySession.items.some(q=>!validQuestion(q)) || state.dailySession.planVersion!==SESSION_PLAN_VERSION)) state.dailySession=null;
    if(state.session && (!Array.isArray(state.session.items) || state.session.items.some(q=>!validQuestion(q)) || (state.session.mode==='daily' && state.session.planVersion!==SESSION_PLAN_VERSION))) state.session=null;
    state.reviewQueue=(state.reviewQueue||[]).filter(r=>r && validQuestion(r.question));
    state.mistakeBook=Array.isArray(state.mistakeBook)?state.mistakeBook:[];
    state.dailyFreshArchive=(state.dailyFreshArchive&&typeof state.dailyFreshArchive==='object')?state.dailyFreshArchive:{};
    // Backfill older V3 review items into the permanent Mistake Book so nothing gets lost on upgrade.
    state.reviewQueue.forEach(r=>{
      const sig=questionSignature(r.question);
      if(!state.mistakeBook.some(m=>m.signature===sig)){
        state.mistakeBook.push({id:'mb'+Math.random().toString(16).slice(2),signature:sig,question:stripReview(r.question),firstMissed:r.created||todayKey(),lastMissed:r.created||todayKey(),missCount:1,lastSelectedText:'Not recorded before V3.4',mastered:false,practiceCorrect:0});
      }
    });
    pruneFreshArchive();
    save();
  }

  function switchView(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===name));
    $('view-'+name).classList.add('active');
    if(name==='dashboard')renderDashboard();
    if(name==='skills')renderSkills();
    if(name==='review')renderReview();
    if(name==='roadmap')renderRoadmap();
    if(name==='parent')renderParent();
    if(name==='training')renderTraining();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
    if(t.dataset.view==='training') startDaily(false);
    else switchView(t.dataset.view);
  }));
  document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.jump)));
  $('quickStartBtn').addEventListener('click',()=>startDaily());
  $('heroStartBtn').addEventListener('click',()=>startDaily());
  $('generateSessionBtn').addEventListener('click',()=>startDaily(true));
  $('startReviewBtn').addEventListener('click',()=>startReviews());
  $('startMistakesBtn').addEventListener('click',()=>startMistakes());
  $('hintBtn').addEventListener('click',showHint);
  $('submitAnswerBtn').addEventListener('click',submitAnswer);
  $('nextQuestionBtn').addEventListener('click',nextQuestion);
  $('saveParentBtn').addEventListener('click',saveParent);
  $('resetBtn').addEventListener('click',resetAll);
  $('exportBtn').addEventListener('click',exportProgress);

  function inferMathSkills(text){
    const t=(text||'').toLowerCase(); const out=[];
    const map=[
      [['ratio','proportion','比例'],'Ratios & Proportions'],[['percent','percentage','百分'],'Percent'],[['fraction','decimal','分数','小数'],'Fractions & Decimals'],
      [['integer','negative','整数','负数'],'Integers'],[['expression','表达式'],'Expressions'],[['equation','linear equation','方程'],'Equations'],[['inequal','不等式'],'Inequalities'],
      [['geometry','angle','area','triangle','circle','几何'],'Geometry'],[['statistic','mean','median','data','统计'],'Statistics'],[['probab','概率'],'Probability'],
      [['word problem','应用题'],'Word Problems'],[['quantitative reasoning','quant reasoning','数量推理'],'Quantitative Reasoning'],[['function','函数'],'Functions'],[['system','联立'],'Systems of Equations'],[['exponent','polynomial','指数','多项式'],'Exponents & Polynomials'],[['quad','quadratic','二次'],'Quadratics']
    ];
    map.forEach(([keys,skill])=>{if(keys.some(k=>t.includes(k)))out.push(skill)});
    return out;
  }
  function inferStaticSkills(text,subject){
    const t=(text||'').toLowerCase(); const out=[];
    const maps={
      English:[[['grammar','语法'],'Grammar'],[['sentence','句子'],'Sentence Structure'],[['punct','标点'],'Punctuation'],[['vocab','词汇'],'Vocabulary in Context'],[['inference','推断'],'Inference'],[['evidence','证据'],'Evidence'],[['main idea','主旨'],'Main Idea'],[['author','purpose','作者'],'Author’s Purpose'],[['writing mechanics','mechanics'],'Writing Mechanics'],[['verbal reasoning','word relationship','deductive','inductive'],'Verbal Reasoning'],[['writing concepts','organization','audience','supporting details'],'Writing Concepts & Skills'],[['writing','essay','写作'],'Writing Logic']],
      Science:[[['experiment','variable','实验'],'Experimental Design'],[['cell','genetic','细胞','遗传'],'Cells & Genetics'],[['ecosystem','生态'],'Ecosystems'],[['matter','atom','物质'],'Matter'],[['force','motion','力','运动'],'Forces & Motion'],[['energy','能量'],'Energy'],[['earth','plate','climate','地球'],'Earth Systems'],[['space','moon','planet','太空'],'Space Science'],[['graph','data','图表'],'Data & Graphs']],
      'Social Studies':[[['source','primary','secondary','史料'],'Primary & Secondary Sources'],[['cause','effect','因果'],'Cause & Effect'],[['geography','map','地理'],'Geography'],[['civic','government','政府'],'Civics'],[['ancient','civilization','古代'],'Ancient Civilizations'],[['u.s.','american','美国史'],'U.S. History'],[['econom','经济'],'Economics'],[['reason','bias','perspective','历史推理'],'Historical Reasoning']]
    };
    (maps[subject]||[]).forEach(([keys,skill])=>{if(keys.some(k=>t.includes(k)))out.push(skill)});return out;
  }

  function erbTier(inorm){
    if(inorm<30)return {cls:'erb-priority',label:'PRIORITY'};
    if(inorm<40)return {cls:'erb-build',label:'BUILD'};
    return {cls:'erb-maintain',label:'MAINTAIN'};
  }
  function renderErbGrid(id){
    const el=$(id);if(!el)return;
    el.innerHTML=ERB_BASELINE.map(x=>{const t=erbTier(x.inorm);return `<div class="erb-score ${t.cls}"><div class="erb-score-top"><strong>${esc(x.name)}</strong><span>${t.label}</span></div><div class="erb-numbers"><b>IN ${x.inorm}</b><small>NN ${x.nn} · Scale ${x.scale}</small></div><p>${esc(x.focus)}</p></div>`}).join('');
  }

  function sectionKeyForQuestion(q){
    if(q && (q._reviewId || q._mistakeId || q.level==='REVIEW' || q.level==='MISTAKE')) return 'review';
    const map={Math:'math',Reading:'reading',English:'english',Science:'science','Social Studies':'social','Transfer Prep':'transfer',Reasoning:'boss'};
    return map[q?.subject]||'english';
  }

  function allocateTrainingCounts(total){
    const defs=[
      ['math',.32],['reading',.16],['english',.16],['science',.12],['social',.12],['transfer',.08],['boss',.04]
    ];
    const min=total>=defs.length?1:0;
    const rows=defs.map(([key,w],idx)=>{
      const raw=total*w;
      return {key,w,idx,raw,count:Math.max(min,Math.floor(raw)),frac:raw-Math.floor(raw)};
    });
    let sum=rows.reduce((a,r)=>a+r.count,0);
    while(sum>total){
      const candidates=rows.filter(r=>r.count>min).sort((a,b)=>a.frac-b.frac || b.count-a.count || b.idx-a.idx);
      if(!candidates.length)break;
      candidates[0].count--;sum--;
    }
    while(sum<total){
      const candidates=[...rows].sort((a,b)=>b.frac-a.frac || a.idx-b.idx);
      candidates[(sum-total+10000)%candidates.length].count++;sum++;
    }
    return Object.fromEntries(rows.map(r=>[r.key,r.count]));
  }

  function buildDailySession(forceNew=false){
    const date=todayKey();
    if(!forceNew && state.dailySession && state.dailySession.date===date && state.dailySession.mode==='daily' && state.dailySession.planVersion===SESSION_PLAN_VERSION) {state.session=state.dailySession;return state.dailySession;}
    const seedSalt=forceNew?'|regen|'+Date.now():'';
    const rng=rngFor(date+'|'+JSON.stringify(state.parent)+seedSalt);
    const target=DAILY_FRESH_TARGET;
    const counts=allocateTrainingCounts(target);
    const groups={math:[],reading:[],english:[],science:[],social:[],transfer:[],boss:[]};

    // Fresh Daily 25 = NEW practice only. Mistakes are intentionally kept in a separate Review/Mistake Book workout.
    const recent=[...recentFreshEntries(),...((state.dailyFreshArchive&&state.dailyFreshArchive[date])||[])];
    const blockedIds=new Set(recent.map(x=>x.id).filter(Boolean));
    const blockedSigs=new Set(recent.map(x=>x.signature).filter(Boolean));
    const blockedReadingSets=new Set(recent.map(x=>x.readingSet).filter(Boolean));
    const usedSigs=new Set();

    const mathCount=counts.math;
    const readingCount=counts.reading;
    const englishCount=counts.english;
    const scienceCount=counts.science;
    const socialCount=counts.social;
    const transferCount=counts.transfer;
    const reasoningCount=counts.boss;

    const schoolMath=inferMathSkills(state.parent.schoolMath);
    const advanced=inferMathSkills(state.parent.advancedMath);
    const foundation=['Fractions & Decimals','Percent','Ratios & Proportions','Integers','Equations','Word Problems','Geometry','Statistics','Probability'];
    const placement=['Ratios & Proportions','Percent','Equations','Word Problems','Geometry','Statistics','Probability','Inequalities'];
    const erbMath=['Quantitative Reasoning','Word Problems','Ratios & Proportions','Percent','Statistics','Geometry'];
    const advDefault=['Functions','Systems of Equations','Exponents & Polynomials','Quadratics'];
    const intensity=state.parent.mathIntensity;
    for(let i=0;i<mathCount;i++){
      let pool,level='CORE';
      if(i<Math.ceil(mathCount*.30) && schoolMath.length){pool=schoolMath;level='SCHOOL'}
      else if(i===Math.ceil(mathCount*.30) || i===Math.ceil(mathCount*.30)+1){pool=erbMath;level='ERB PRIORITY'}
      else if((intensity==='advanced' && i>=Math.ceil(mathCount*.55)) || (intensity==='balanced' && i>=Math.ceil(mathCount*.78))){pool=advanced.length?advanced:advDefault;level='ADVANCED'}
      else if(i%3===1){pool=placement;level='PLACEMENT'}
      else pool=foundation;
      let q=null;
      for(let tries=0;tries<120;tries++){
        const skill=choice(pool,rng);
        const candidate=BANK.mathQuestion(skill,rng,level);
        candidate.origin=level==='SCHOOL'?'Hillbrook focus':(level==='ERB PRIORITY'?'ERB CTP skill map':(level==='PLACEMENT'?'Grade 7 / placement core':(level==='ADVANCED'?'Advanced extension':'CA Grade 7 core')));
        const sig=questionSignature(candidate);
        if(!usedSigs.has(sig) && !blockedSigs.has(sig)){q=candidate;usedSigs.add(sig);break}
      }
      if(!q){
        // Emergency fallback: still guarantee no duplicate inside today's 25, even if the recent cooldown has to relax.
        for(let tries=0;tries<120;tries++){
          const candidate=BANK.mathQuestion(choice(pool,rng),rng,level);
          const sig=questionSignature(candidate);
          if(!usedSigs.has(sig)){q=candidate;usedSigs.add(sig);break}
        }
      }
      if(q)groups.math.push(q);
    }

    // One coherent reading passage per day. Rotate passages so the exact passage does not repeat for 7 days.
    let readingPool=BANK.readingSets.filter(set=>!blockedReadingSets.has(set.id));
    if(!readingPool.length) readingPool=BANK.readingSets;
    const set=choice(readingPool,rng);
    const setQuestions=BANK.shuffle(rng,BANK.reading.filter(q=>q.readingSet===set.id));
    for(const base of setQuestions){
      if(groups.reading.length>=readingCount)break;
      const sig=questionSignature(base);
      if(!usedSigs.has(sig) && !blockedSigs.has(sig)){groups.reading.push({...base});usedSigs.add(sig)}
    }
    if(groups.reading.length<readingCount){
      const candidates=BANK.shuffle(rng,BANK.reading).filter(q=>!usedSigs.has(questionSignature(q))&&!blockedSigs.has(questionSignature(q)));
      for(const q of candidates){if(groups.reading.length>=readingCount)break;groups.reading.push({...q});usedSigs.add(questionSignature(q));}
    }

    const englishSchool=inferStaticSkills(state.parent.schoolEnglish,'English');
    const erbEnglish=['Verbal Reasoning','Writing Concepts & Skills','Writing Mechanics'];
    addStaticFresh(groups.english,BANK.english,englishCount,rng,unique([...englishSchool,...erbEnglish]),blockedIds,blockedSigs,usedSigs);
    addStaticFresh(groups.science,BANK.science,scienceCount,rng,inferStaticSkills(state.parent.schoolScience,'Science'),blockedIds,blockedSigs,usedSigs);
    addStaticFresh(groups.social,BANK.social,socialCount,rng,inferStaticSkills(state.parent.schoolHistory,'Social Studies'),blockedIds,blockedSigs,usedSigs);
    addStaticFresh(groups.transfer,BANK.transfer,transferCount,rng,[],blockedIds,blockedSigs,usedSigs);
    addStaticFresh(groups.boss,BANK.reasoning,reasoningCount,rng,[],blockedIds,blockedSigs,usedSigs);

    let ordered=TRAINING_SECTIONS.flatMap(sec=>groups[sec.key]||[]);
    // Fill any rare shortfall with brand-new dynamic math, never a duplicate inside the 25.
    while(ordered.length<target){
      let q=null;
      for(let tries=0;tries<200;tries++){
        const candidate=BANK.mathQuestion(choice(foundation,rng),rng,'CORE');
        candidate.origin='CA Grade 7 core';
        const sig=questionSignature(candidate);
        if(!usedSigs.has(sig) && !blockedSigs.has(sig)){q=candidate;usedSigs.add(sig);break}
      }
      if(!q)break;
      groups.math.push(q);
      ordered=TRAINING_SECTIONS.flatMap(sec=>groups[sec.key]||[]);
    }
    ordered=ordered.slice(0,target);
    if(ordered.length!==target) throw new Error('Could not build 25 unique fresh questions.');

    state.dailySession={date,mode:'daily',planVersion:SESSION_PLAN_VERSION,items:ordered,index:0,answers:[],completed:false};
    state.session=state.dailySession;
    archiveFreshSession(date,ordered);
    save();return state.dailySession;
  }

  function addStaticFresh(items,bank,count,rng,preferredSkills,blockedIds,blockedSigs,usedSigs){
    const pickOne=(pool,strictRecent=true)=>{
      const candidates=BANK.shuffle(rng,pool).filter(q=>{
        const sig=questionSignature(q);
        return !usedSigs.has(sig) && (!strictRecent || (!blockedIds.has(q.id)&&!blockedSigs.has(sig)));
      });
      return candidates[0]||null;
    };
    for(let i=0;i<count;i++){
      const preferred=(preferredSkills.length && i<Math.ceil(count/2))?bank.filter(q=>preferredSkills.includes(q.skill)):[];
      let q=preferred.length?pickOne(preferred,true):null;
      if(!q)q=pickOne(bank,true);
      if(!q && preferred.length)q=pickOne(preferred,false);
      if(!q)q=pickOne(bank,false);
      if(!q)break;
      items.push({...q});usedSigs.add(questionSignature(q));
    }
  }

  function startDaily(forceNew=false){
    currentSessionMode='daily';
    const daily=buildDailySession(forceNew);
    state.session=daily;
    save();
    currentIndex=daily.index||0;
    switchView('training');
  }

  function startReviews(){
    const date=todayKey();const due=state.reviewQueue.filter(r=>r.due<=date);
    if(!due.length){alert('No reviews are due right now. Nice work. 🏆');return}
    currentSessionMode='review';
    state.session={date,mode:'review',items:due.map(r=>({...r.question,_reviewId:r.id,_reviewStage:r.stage||0,level:'REVIEW'})),index:0,answers:[],completed:false};save();currentIndex=0;switchView('training');
  }

  function startMistakes(){
    const active=(state.mistakeBook||[]).filter(m=>!m.mastered && validQuestion(m.question)).sort((a,b)=>(b.missCount||0)-(a.missCount||0)||String(b.lastMissed).localeCompare(String(a.lastMissed)));
    if(!active.length){alert('No active mistakes right now. Keep going. 🏆');return}
    const chosen=active.slice(0,25);
    currentSessionMode='mistakes';
    state.session={date:todayKey(),mode:'mistakes',items:chosen.map(m=>{const rq=state.reviewQueue.find(r=>questionSignature(r.question)===m.signature);return {...m.question,_mistakeId:m.id,_reviewId:rq?.id,level:'MISTAKE'};}),index:0,answers:[],completed:false};
    save();currentIndex=0;switchView('training');
  }

  function sectionStats(session,key){
    const indices=[];
    (session?.items||[]).forEach((q,i)=>{if(sectionKeyForQuestion(q)===key)indices.push(i)});
    const done=indices.filter(i=>session.answers?.[i]).length;
    return {indices,done,total:indices.length};
  }

  function renderTrainingSectionTabs(){
    const el=$('trainingSectionTabs');
    const s=state.session;
    if(!el)return;
    if(!s || s.completed){el.innerHTML='';return}
    const activeKey=sectionKeyForQuestion(s.items[currentIndex]);
    const sections=s.mode==='daily'?TRAINING_SECTIONS:[REVIEW_SECTION];
    el.innerHTML=sections.map(sec=>{
      const st=sectionStats(s,sec.key);
      const disabled=st.total===0;
      const isActive=sec.key===activeKey;
      const isComplete=st.total>0 && st.done===st.total;
      return `<button type="button" class="training-section-tab subject-${sec.key} ${isActive?'active':''} ${isComplete?'complete':''}" data-training-section="${sec.key}" aria-pressed="${isActive?'true':'false'}" ${disabled?'disabled':''}><span class="training-tab-icon">${sec.icon}</span><span class="training-tab-copy"><strong>${sec.label}</strong><small>${st.done}/${st.total} done</small></span></button>`;
    }).join('');
    el.querySelectorAll('[data-training-section]').forEach(btn=>{
      btn.addEventListener('click',()=>jumpToTrainingSection(btn.dataset.trainingSection));
    });
  }

  function jumpToTrainingSection(key){
    const s=state.session;if(!s||s.completed)return;
    const st=sectionStats(s,key);if(!st.indices.length)return;
    // Always jump to the first unanswered question in that subject. If the subject is complete, open its first question for review.
    const nextUnanswered=st.indices.find(i=>!s.answers?.[i]);
    currentIndex=nextUnanswered===undefined?st.indices[0]:nextUnanswered;
    s.index=currentIndex;save();
    showCurrentQuestion();
    const stage=$('questionStage');
    if(stage) stage.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderTraining(){
    const s=state.session;
    if(!s || s.completed){$('trainingEmpty').classList.remove('hidden');$('questionStage').classList.add('hidden');$('sessionComplete').classList.add('hidden');return}
    $('trainingEmpty').classList.add('hidden');$('questionStage').classList.remove('hidden');$('sessionComplete').classList.add('hidden');
    $('trainingTitle').textContent=s.mode==='review'?'Spaced Review Workout':(s.mode==='mistakes'?'Mistake Book Workout':'Today’s #22 Workout');
    $('trainingSummary').textContent=s.mode==='daily'?'25 fresh questions today — no duplicates in the set, and exact questions are rotated away for 7 days. Mistake review is separate.':`${s.items.length} mistake-review questions ready`;
    currentIndex=Math.min(s.index||0,s.items.length-1);
    updateSessionProgress();
    renderTrainingSectionTabs();
    showCurrentQuestion();
  }

  function showCurrentQuestion(){
    const s=state.session;if(!s||s.completed)return;
    const q=s.items[currentIndex]; if(!q){completeSession();return}
    if(!validQuestion(q)){ state.session=null; save(); buildDailySession(true); currentIndex=0; renderTraining(); return showCurrentQuestion(); }
    selectedChoice=null;
    $('qSubject').textContent=q.subject;
    $('qSkill').textContent=q.skill;
    $('qLevel').textContent=q.level||'CORE';
    const sec=TRAINING_SECTIONS.find(x=>x.key===sectionKeyForQuestion(q));
    const secStats=sectionStats(s,sec?.key||sectionKeyForQuestion(q));
    const secPos=secStats.indices.indexOf(currentIndex)+1;
    $('qCounter').textContent=`${currentIndex+1} / ${s.items.length} · ${sec?.label||q.subject} ${secPos}/${secStats.total}`;
    $('qPrompt').textContent=q.prompt;
    $('qChoices').innerHTML='';
    (q.choices||[]).forEach((c,i)=>{
      const b=document.createElement('button');b.className='choice';b.innerHTML=`<span class="choice-key">${String.fromCharCode(65+i)}</span><span>${esc(c)}</span>`;b.addEventListener('click',()=>{if($('questionNav').classList.contains('hidden')){selectedChoice=i;document.querySelectorAll('.choice').forEach((x,j)=>x.classList.toggle('selected',j===i))}});$('qChoices').appendChild(b);
    });
    if(q.passage){$('passageBox').classList.remove('hidden');$('passageBox').innerHTML=`<strong>${esc(q.passageTitle||'Reading Passage')}</strong>\n\n${esc(q.passage)}`;} else $('passageBox').classList.add('hidden');
    $('hintBox').classList.add('hidden');$('feedbackBox').className='feedback hidden';$('explanationBox').classList.add('hidden');$('questionNav').classList.add('hidden');$('submitAnswerBtn').disabled=false;updateSessionProgress();renderTrainingSectionTabs();
  }

  function showHint(){const q=state.session?.items[currentIndex];if(!q)return;$('hintBox').textContent=q.hint||'Break the problem into smaller steps and use evidence from the question.';$('hintBox').classList.remove('hidden')}

  function submitAnswer(){
    const s=state.session,q=s?.items[currentIndex];if(!q)return;
    if(selectedChoice===null){alert('Choose an answer first. 🏀');return}
    const correct=selectedChoice===q.answer;
    const buttons=[...document.querySelectorAll('.choice')];buttons.forEach((b,i)=>{b.classList.remove('selected');if(i===q.answer)b.classList.add('correct');else if(i===selectedChoice&&!correct)b.classList.add('incorrect');b.disabled=true});
    $('feedbackBox').textContent=correct?'✅ Correct — good read.':'❌ Not yet. Use the explanation, then this skill will come back in review.';
    $('feedbackBox').className='feedback '+(correct?'correct':'incorrect');
    $('explanationBox').innerHTML=`<strong>WHY:</strong> ${esc(q.explanation)}<br><strong>SKILL:</strong> ${esc(q.skill)}${q.origin?`<br><strong>TRACK:</strong> ${esc(q.origin)}`:''}`;$('explanationBox').classList.remove('hidden');$('questionNav').classList.remove('hidden');$('submitAnswerBtn').disabled=true;
    recordAttempt(q,correct,selectedChoice);s.answers[currentIndex]={correct,selected:selectedChoice};if(s.mode==='daily')state.dailySession=s;save();updateSessionProgress();renderTrainingSectionTabs();
  }

  function recordAttempt(q,correct,selectedIndex){
    const date=todayKey();const key=`${q.subject}|${q.skill}`;
    const a=state.attempts[key]||{correct:0,total:0,last:null};a.total++;if(correct)a.correct++;a.last=date;state.attempts[key]=a;
    state.history.push({date,subject:q.subject,skill:q.skill,correct,id:q.id,signature:questionSignature(q)});if(state.history.length>1500)state.history=state.history.slice(-1500);
    state.xp += correct ? (q.subject==='Reasoning'?22:2) : 1;

    const sig=questionSignature(q);
    let mb=state.mistakeBook.find(m=>m.signature===sig);
    if(!correct){
      const selectedText=(q.choices&&selectedIndex>=0)?String(q.choices[selectedIndex]):'No answer recorded';
      if(!mb){
        mb={id:'mb'+Date.now()+Math.random().toString(16).slice(2),signature:sig,question:stripReview(q),firstMissed:date,lastMissed:date,missCount:0,lastSelectedText:selectedText,mastered:false,practiceCorrect:0};
        state.mistakeBook.push(mb);
      }
      mb.lastMissed=date;mb.missCount=(mb.missCount||0)+1;mb.lastSelectedText=selectedText;mb.mastered=false;mb.practiceCorrect=0;
    }else if(mb){
      mb.practiceCorrect=(mb.practiceCorrect||0)+1;
    }

    if(q._reviewId){
      const idx=state.reviewQueue.findIndex(r=>r.id===q._reviewId);
      if(idx>=0){
        if(correct){
          const stage=(state.reviewQueue[idx].stage||0)+1;const intervals=[3,7,14,30];
          if(stage>=4){state.reviewQueue.splice(idx,1);if(mb)mb.mastered=true;}
          else{state.reviewQueue[idx].stage=stage;state.reviewQueue[idx].due=addDays(date,intervals[stage-1]);}
        }
        else{state.reviewQueue[idx].stage=0;state.reviewQueue[idx].due=addDays(date,1);}
      }
    } else if(!correct){
      const exists=state.reviewQueue.some(r=>questionSignature(r.question)===sig);
      if(!exists)state.reviewQueue.push({id:'rv'+Date.now()+Math.random().toString(16).slice(2),question:stripReview(q),due:addDays(date,1),stage:0,created:date});
    }
  }

  function stripReview(q){const x={...q};delete x._reviewId;delete x._reviewStage;return x}

  function nextQuestion(){
    const s=state.session;if(!s)return;
    currentIndex++;s.index=currentIndex;if(s.mode==='daily')state.dailySession=s;save();
    if(currentIndex>=s.items.length)completeSession();else showCurrentQuestion();
  }

  function completeSession(){
    const s=state.session;if(!s)return;s.completed=true;s.index=s.items.length;if(s.mode==='daily')state.dailySession=s;
    const correct=s.answers.filter(a=>a&&a.correct).length;const total=s.answers.length;state.xp+=22;
    updateStreak();save();
    $('questionStage').classList.add('hidden');$('trainingEmpty').classList.add('hidden');$('sessionComplete').classList.remove('hidden');
    const pct=total?Math.round(correct/total*100):0;
    $('sessionResultText').textContent=`${correct}/${total} correct (${pct}%). The important part is what becomes stronger next time.`;
    $('sessionResultStats').innerHTML=`<div class="score-item"><span>${correct}</span><small>Correct</small></div><div class="score-item"><span>${state.reviewQueue.filter(r=>r.due<=todayKey()).length}</span><small>Reviews Due</small></div><div class="score-item"><span>+22</span><small>Finish XP</small></div>`;
    renderDashboard();
  }
  function updateStreak(){
    const date=todayKey();if(state.lastCompletedDate===date)return;
    if(state.lastCompletedDate===addDays(date,-1))state.streak++;else state.streak=1;state.lastCompletedDate=date;
  }
  function updateSessionProgress(){
    const s=state.session;if(!s)return;const done=s.answers.filter(Boolean).length;const pct=s.items.length?done/s.items.length*100:0;$('sessionProgressText').textContent=`${done} / ${s.items.length} complete`;$('sessionProgressBar').style.width=pct+'%';
  }

  function recentHistory(days=7){const cutoff=addDays(todayKey(),-(days-1));return state.history.filter(h=>h.date>=cutoff)}
  function statsFor(subject){const arr=recentHistory().filter(h=>h.subject===subject || (subject==='English'&&h.subject==='Reading'));const c=arr.filter(x=>x.correct).length;return {total:arr.length,correct:c,pct:arr.length?Math.round(c/arr.length*100):null}}
  function renderDashboard(){
    const s=state.dailySession&&state.dailySession.date===todayKey()?state.dailySession:null;const done=s?s.answers.filter(Boolean).length:0,total=s?s.items.length:DAILY_FRESH_TARGET;$('todayProgress').textContent=`${done}/${total}`;$('streakCount').textContent=state.streak;$('xpCount').textContent=state.xp;
    $('dashSchoolFocus').textContent=[state.parent.schoolMath,state.parent.schoolEnglish,state.parent.schoolScience,state.parent.schoolHistory].filter(Boolean).join(' · ')||'Not set yet';
    $('dashAdvancedFocus').textContent=[state.parent.advancedMath,state.parent.advancedOther].filter(Boolean).join(' · ')||'Not set yet';
    $('milestoneName').textContent=state.parent.milestone||'8th Grade Math Placement Readiness';$('milestoneDate').textContent='Date: '+(state.parent.milestoneDate||'needs confirmation');$('milestoneNote').textContent=state.parent.milestoneNotes||'Build evidence before the decision window.';
    const mastery=masteryPercent();$('milestoneMeter').style.width=Math.max(15,Math.min(95,mastery))+'%';
    const subjects=[['Math','🧮'],['English','📚'],['Science','🔬'],['Social Studies','🌎'],['Reasoning','🧠']];
    $('weeklySubjectCards').innerHTML=subjects.map(([sub,icon])=>{const st=statsFor(sub);return `<div class="subject-card"><span>${icon} ${sub}</span><strong>${st.pct===null?'—':st.pct+'%'}</strong><small>${st.total?`${st.correct}/${st.total} correct this week`:'No attempts yet'}</small></div>`}).join('');
    renderErbGrid('erbScoreGrid');
    const ranked=rankSkills();
    $('needsAttention').innerHTML=(ranked.filter(x=>x.total>=2).slice(0,4).map(x=>`<div class="list-item"><strong>${esc(x.skill)}</strong><span>${x.pct}% · ${x.total} attempts</span></div>`).join('')||'<div class="subtle">Complete a few workouts and weak spots will appear here.</div>');
    $('recentWins').innerHTML=(ranked.slice().reverse().filter(x=>x.total>=2).slice(0,4).map(x=>`<div class="list-item"><strong>${esc(x.skill)}</strong><span>${x.pct}% · ${statusFor(x.total,x.pct).label}</span></div>`).join('')||'<div class="subtle">Your wins will show up after practice.</div>');
  }
  function rankSkills(){return Object.entries(state.attempts).map(([key,a])=>({key,subject:key.split('|')[0],skill:key.split('|')[1],total:a.total,pct:Math.round(a.correct/a.total*100)})).sort((a,b)=>a.pct-b.pct||b.total-a.total)}
  function masteryPercent(){const r=rankSkills().filter(x=>x.total>=3);if(!r.length)return 35;return Math.round(r.reduce((s,x)=>s+x.pct,0)/r.length)}
  function statusFor(total,pct){if(!total)return {icon:'⬜',label:'Not checked'};if(pct<60)return {icon:'🔴',label:'Needs work'};if(total<3)return {icon:'🟡',label:'Learning'};if(pct>=85&&total>=4)return {icon:'🟢',label:'Mastered'};return {icon:'🔵',label:'Practicing'}}

  function renderSkills(){
    const groups={Math:BANK.SKILLS.Math,English:[...BANK.SKILLS.English],Science:BANK.SKILLS.Science,'Social Studies':BANK.SKILLS['Social Studies'],Reasoning:BANK.SKILLS.Reasoning};
    $('skillsContainer').innerHTML=Object.entries(groups).map(([sub,skills])=>{
      const tiles=skills.map(skill=>{let keys=[`${sub}|${skill}`];if(sub==='English')keys.push(`Reading|${skill}`);let c=0,t=0;keys.forEach(k=>{const a=state.attempts[k];if(a){c+=a.correct;t+=a.total}});const pct=t?Math.round(c/t*100):0,st=statusFor(t,pct);return `<div class="skill-tile"><span class="status">${st.icon}</span><strong>${esc(skill)}</strong><small>${t?`${pct}% · ${t} attempts · ${st.label}`:st.label}</small></div>`}).join('');
      return `<section class="skill-group"><div class="skill-group-head"><h2>${sub}</h2><span class="pill">${skills.length} SKILLS</span></div><div class="skill-grid">${tiles}</div></section>`;
    }).join('');
  }

  function renderReview(){
    const date=todayKey();
    const sorted=[...state.reviewQueue].sort((a,b)=>a.due.localeCompare(b.due));
    const due=sorted.filter(r=>r.due<=date);
    $('reviewCount').textContent=`${due.length} DUE`;
    $('reviewQueueList').innerHTML=sorted.length?sorted.map(r=>`<div class="review-item"><div><h3>${esc(r.question.subject)} · ${esc(r.question.skill)}</h3><p>${esc(r.question.prompt)}</p></div><div class="due">${r.due<=date?'DUE NOW':'Due '+r.due}<br>Stage ${r.stage||0}/4</div></div>`).join(''):'<div class="empty-state"><div class="big-icon">✅</div><h2>Queue clear.</h2><p>Missed questions will come back on a spaced schedule after they enter the Mistake Book.</p></div>';

    const mistakes=[...(state.mistakeBook||[])].sort((a,b)=>Number(a.mastered)-Number(b.mastered)||(b.missCount||0)-(a.missCount||0)||String(b.lastMissed).localeCompare(String(a.lastMissed)));
    const active=mistakes.filter(m=>!m.mastered);
    $('mistakeCount').textContent=`${active.length} ACTIVE · ${mistakes.length} TOTAL`;
    $('mistakeBookList').innerHTML=mistakes.length?mistakes.map(m=>{
      const q=m.question||{};const correctText=q.choices?.[q.answer]??'—';
      return `<article class="mistake-item ${m.mastered?'mastered':''}">
        <div class="mistake-head"><div><span class="mistake-subject">${esc(q.subject)} · ${esc(q.skill)}</span><h3>${esc(q.prompt)}</h3></div><span class="mistake-status">${m.mastered?'MASTERED':'REVIEW'}</span></div>
        <div class="mistake-answer-grid"><div><small>LAST WRONG ANSWER</small><strong>${esc(m.lastSelectedText||'Not recorded')}</strong></div><div><small>CORRECT ANSWER</small><strong>${esc(correctText)}</strong></div></div>
        <p class="mistake-why"><b>Why:</b> ${esc(q.explanation||'Review the rule and solve it again.')}</p>
        <div class="mistake-foot"><span>Missed ${m.missCount||1}× · First ${esc(m.firstMissed||'—')} · Last ${esc(m.lastMissed||'—')}</span><span>${m.mastered?'✅ Mastered after spaced review':'🔁 Keep practicing'}</span></div>
      </article>`;
    }).join(''):'<div class="empty-state"><div class="big-icon">🏆</div><h2>No mistakes yet.</h2><p>Every wrong answer will be saved here permanently with the correct answer and explanation.</p></div>';
  }

  const roadmapData=[
    ['7th Grade','BUILD & PROVE',['Excel in current courses','Strengthen math foundations + placement readiness','Build strong English reading/writing','Raise ERB priority areas: verbal reasoning, writing concepts, quantitative reasoning, math','Know 8th-grade placement rules','Keep sports, health, and interests strong']],
    ['8th Grade','LEVEL UP',['Enter the strongest appropriate math path','Strengthen analytical writing','Confirm 9th-grade course placement rules','Prepare for high-school study habits','Develop leadership and meaningful activities','Use summer strategically']],
    ['9th Grade','HIGH SCHOOL BEGINS',['Protect GPA from day one','Choose rigorous but sustainable courses','Build 2–4 meaningful long-term activities','Develop strong teacher relationships','Explore interests without résumé stuffing','Plan summer growth']],
    ['10th Grade','EXPLORE & BUILD',['Keep GPA strong','Add Honors/AP when ready','Take PSAT baseline','Deepen extracurricular impact','Explore possible majors/careers','Plan meaningful summer work']],
    ['11th Grade','PEAK & PREPARE',['Take rigorous courses/AP','PSAT/NMSQT','SAT/ACT if useful for targets','Build college list','Leadership + deeper impact','Ask for recommendations','Begin essays and personal story']],
    ['12th Grade','APPLICATION SEASON',['Maintain grades and rigor','Finalize college list','Write and polish essays','Submit applications','Complete FAFSA/financial aid','Scholarships','Make final decision']],
    ['College & Beyond','NEW CHAPTER',['Choose a college that fits Audrey','Keep learning, growing, leading','Explore internships/career paths','Build real-world skills','Maintain health and passions','Create positive impact']]
  ];
  function renderRoadmap(){
    $('roadmapContainer').innerHTML=roadmapData.map((r,i)=>`<section class="roadmap-step"><div class="roadmap-num">${i+1}</div><div><h2>${r[0]}</h2><h3>${r[1]}</h3><div class="roadmap-checks">${r[2].map((x,j)=>{const key=`${i}-${j}`;return `<label><input type="checkbox" data-roadmap="${key}" ${state.roadmapChecks[key]?'checked':''}> <span>${esc(x)}</span></label>`}).join('')}</div></div></section>`).join('');
    document.querySelectorAll('[data-roadmap]').forEach(cb=>cb.addEventListener('change',()=>{state.roadmapChecks[cb.dataset.roadmap]=cb.checked;save()}));
  }

  const placementItems=[
    'Get Audrey’s 6th-grade placement assessment/results','Get detailed ERB content-strand/subscore report if available','Use Spring 2026 ERB baseline in training plan','Confirm exact 7th-grade math pathway names','Understand why Standard placement was chosen','Confirm 7→8 placement decision window','Ask whether another placement assessment occurs','Ask whether students can move up midyear or for 8th grade','Confirm teacher recommendation criteria','Confirm how ERB and class grades are used','Ask what evidence demonstrates readiness for a higher path','Confirm all 8th-grade math options','Understand 8→9 math placement before 8th grade begins','Check whether English has level/placement decisions','Check world-language placement/prerequisites'
  ];
  function renderParent(){
    renderErbGrid('parentErbScoreGrid');
    const p=state.parent;$('schoolMathInput').value=p.schoolMath;$('schoolEnglishInput').value=p.schoolEnglish;$('schoolScienceInput').value=p.schoolScience;$('schoolHistoryInput').value=p.schoolHistory;$('schoolNotesInput').value=p.schoolNotes;$('advancedMathInput').value=p.advancedMath;$('advancedOtherInput').value=p.advancedOther;$('milestoneInput').value=p.milestone;$('milestoneDateInput').value=p.milestoneDate;$('milestoneNotesInput').value=p.milestoneNotes;$('mathIntensityInput').value=p.mathIntensity;
    $('placementChecklist').innerHTML=placementItems.map((x,i)=>`<label class="check-row"><input type="checkbox" data-placement="${i}" ${p.placementChecks[i]?'checked':''}><span>${esc(x)}</span></label>`).join('');
    document.querySelectorAll('[data-placement]').forEach(cb=>cb.addEventListener('change',()=>{state.parent.placementChecks[cb.dataset.placement]=cb.checked;save()}));
  }
  function saveParent(){
    const p=state.parent;p.schoolMath=$('schoolMathInput').value.trim();p.schoolEnglish=$('schoolEnglishInput').value.trim();p.schoolScience=$('schoolScienceInput').value.trim();p.schoolHistory=$('schoolHistoryInput').value.trim();p.schoolNotes=$('schoolNotesInput').value.trim();p.advancedMath=$('advancedMathInput').value.trim();p.advancedOther=$('advancedOtherInput').value.trim();p.milestone=$('milestoneInput').value.trim()||'8th Grade Math Placement Readiness';p.milestoneDate=$('milestoneDateInput').value.trim()||'Needs confirmation with Hillbrook';p.milestoneNotes=$('milestoneNotesInput').value.trim();p.dailyTarget=DAILY_FRESH_TARGET;p.mathIntensity=$('mathIntensityInput').value;state.dailySession=null;if(state.session?.mode==='daily')state.session=null;save();alert('Saved. Tomorrow’s fresh 25 will use this school + advanced focus. 🏀 #22');renderDashboard();
  }
  function resetAll(){if(!confirm('Reset ALL Audrey #22 progress, review history, streaks, and parent settings?'))return;state=defaultState();save();renderParent();renderDashboard();alert('Reset complete.')}
  function exportProgress(){
    const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`audrey22-progress-${todayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
  }

  async function retireOldOfflineCache(){
    // GitHub Pages updates matter more than offline caching for this app. Old service workers caused stale UI after uploads.
    try{
      if('serviceWorker' in navigator){
        const regs=await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r=>r.unregister()));
      }
      if('caches' in window){
        const keys=await caches.keys();
        await Promise.all(keys.filter(k=>k.startsWith('audrey22-')).map(k=>caches.delete(k)));
      }
    }catch(e){}
  }

  // Initial render
  renderDashboard();
  retireOldOfflineCache();
})();
