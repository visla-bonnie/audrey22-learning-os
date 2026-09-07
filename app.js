(function(){
  'use strict';
  const BANK=window.A22_BANK;
  const STORE_KEY='audrey22_learning_os_v1';
  const todayKey=()=>new Date().toISOString().slice(0,10);
  const addDays=(dateStr,n)=>{const d=new Date(dateStr+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const $=id=>document.getElementById(id);
  const defaultState=()=>({
    xp:0,streak:0,lastCompletedDate:null,
    history:[], attempts:{}, reviewQueue:[],
    session:null,
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

  document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>switchView(t.dataset.view)));
  document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.jump)));
  $('quickStartBtn').addEventListener('click',()=>startDaily());
  $('heroStartBtn').addEventListener('click',()=>startDaily());
  $('generateSessionBtn').addEventListener('click',()=>startDaily(true));
  $('startReviewBtn').addEventListener('click',()=>startReviews());
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
      [['word problem','应用题'],'Word Problems'],[['function','函数'],'Functions'],[['system','联立'],'Systems of Equations'],[['exponent','polynomial','指数','多项式'],'Exponents & Polynomials'],[['quad','quadratic','二次'],'Quadratics']
    ];
    map.forEach(([keys,skill])=>{if(keys.some(k=>t.includes(k)))out.push(skill)});
    return out;
  }
  function inferStaticSkills(text,subject){
    const t=(text||'').toLowerCase(); const out=[];
    const maps={
      English:[[['grammar','语法'],'Grammar'],[['sentence','句子'],'Sentence Structure'],[['punct','标点'],'Punctuation'],[['vocab','词汇'],'Vocabulary in Context'],[['inference','推断'],'Inference'],[['evidence','证据'],'Evidence'],[['main idea','主旨'],'Main Idea'],[['author','purpose','作者'],'Author’s Purpose'],[['writing','essay','写作'],'Writing Logic']],
      Science:[[['experiment','variable','实验'],'Experimental Design'],[['cell','genetic','细胞','遗传'],'Cells & Genetics'],[['ecosystem','生态'],'Ecosystems'],[['matter','atom','物质'],'Matter'],[['force','motion','力','运动'],'Forces & Motion'],[['energy','能量'],'Energy'],[['earth','plate','climate','地球'],'Earth Systems'],[['space','moon','planet','太空'],'Space Science'],[['graph','data','图表'],'Data & Graphs']],
      'Social Studies':[[['source','primary','secondary','史料'],'Primary & Secondary Sources'],[['cause','effect','因果'],'Cause & Effect'],[['geography','map','地理'],'Geography'],[['civic','government','政府'],'Civics'],[['ancient','civilization','古代'],'Ancient Civilizations'],[['u.s.','american','美国史'],'U.S. History'],[['econom','经济'],'Economics'],[['reason','bias','perspective','历史推理'],'Historical Reasoning']]
    };
    (maps[subject]||[]).forEach(([keys,skill])=>{if(keys.some(k=>t.includes(k)))out.push(skill)});return out;
  }

  function buildDailySession(forceNew=false){
    const date=todayKey();
    if(!forceNew && state.session && state.session.date===date && state.session.mode==='daily' && !state.session.completed) return state.session;
    const rng=rngFor(date+'|'+JSON.stringify(state.parent));
    const target=Math.max(10,Math.min(45,Number(state.parent.dailyTarget)||25));
    const items=[];

    // Due review first, but cap it so the day remains balanced.
    const due=state.reviewQueue.filter(r=>r.due<=date).sort((a,b)=>a.due.localeCompare(b.due));
    const reviewCap=Math.min(4,Math.max(1,Math.floor(target*.16)));
    due.slice(0,reviewCap).forEach(r=>items.push({...r.question,_reviewId:r.id,_reviewStage:r.stage||0,level:'REVIEW'}));

    const mathCount=Math.max(5,Math.round(target*.32));
    const readingCount=4;
    const englishCount=Math.max(3,Math.round(target*.16));
    const scienceCount=Math.max(3,Math.round(target*.16));
    const socialCount=Math.max(2,Math.round(target*.12));
    const reasoningCount=1;

    const schoolMath=inferMathSkills(state.parent.schoolMath);
    const advanced=inferMathSkills(state.parent.advancedMath);
    const foundation=['Fractions & Decimals','Percent','Ratios & Proportions','Integers','Equations','Word Problems','Geometry','Statistics','Probability'];
    const placement=['Ratios & Proportions','Percent','Equations','Word Problems','Geometry','Statistics','Probability','Inequalities'];
    const advDefault=['Functions','Systems of Equations','Exponents & Polynomials','Quadratics'];
    let mathSkills=[];
    const intensity=state.parent.mathIntensity;
    for(let i=0;i<mathCount;i++){
      let pool,level='CORE';
      if(i<Math.ceil(mathCount*.35) && schoolMath.length){pool=schoolMath;level='SCHOOL'}
      else if((intensity==='advanced' && i>=Math.ceil(mathCount*.45)) || (intensity==='balanced' && i>=Math.ceil(mathCount*.7))){pool=advanced.length?advanced:advDefault;level='ADVANCED'}
      else if(i%3===1){pool=placement;level='PLACEMENT'}
      else pool=foundation;
      const skill=choice(pool,rng); mathSkills.push(skill); items.push(BANK.mathQuestion(skill,rng,level));
    }

    // Keep one coherent reading passage per day.
    const set=choice(BANK.readingSets,rng);
    BANK.reading.filter(q=>q.readingSet===set.id).slice(0,readingCount).forEach(q=>items.push({...q}));

    addStatic(items,BANK.english,englishCount,rng,inferStaticSkills(state.parent.schoolEnglish,'English'));
    addStatic(items,BANK.science,scienceCount,rng,inferStaticSkills(state.parent.schoolScience,'Science'));
    addStatic(items,BANK.social,socialCount,rng,inferStaticSkills(state.parent.schoolHistory,'Social Studies'));
    addStatic(items,BANK.reasoning,reasoningCount,rng,[]);

    // Trim or fill to target.
    let shuffled=BANK.shuffle(rng,items);
    // Keep reading questions adjacent for sanity.
    const readingItems=shuffled.filter(q=>q.subject==='Reading');
    shuffled=shuffled.filter(q=>q.subject!=='Reading');
    const insertAt=Math.min(shuffled.length,Math.max(2,Math.floor(shuffled.length*.35)));
    shuffled.splice(insertAt,0,...readingItems);
    while(shuffled.length<target) shuffled.push(BANK.mathQuestion(choice(foundation,rng),rng,'CORE'));
    if(shuffled.length>target) shuffled=shuffled.slice(0,target);

    state.session={date,mode:'daily',items:shuffled,index:0,answers:[],completed:false};save();return state.session;
  }

  function addStatic(items,bank,count,rng,preferredSkills){
    let pool=bank;
    for(let i=0;i<count;i++){
      if(preferredSkills.length && i<Math.ceil(count/2)){
        const preferred=bank.filter(q=>preferredSkills.includes(q.skill));
        if(preferred.length)pool=preferred; else pool=bank;
      } else pool=bank;
      const candidates=BANK.shuffle(rng,pool).filter(q=>!items.some(x=>x.id===q.id));
      items.push({...choice(candidates.length?candidates:pool,rng)});
    }
  }

  function startDaily(forceNew=false){
    currentSessionMode='daily'; buildDailySession(forceNew); currentIndex=state.session.index||0; switchView('training'); showCurrentQuestion();
  }

  function startReviews(){
    const date=todayKey();const due=state.reviewQueue.filter(r=>r.due<=date);
    if(!due.length){alert('No reviews are due right now. Nice work. 🏆');return}
    currentSessionMode='review';
    state.session={date,mode:'review',items:due.map(r=>({...r.question,_reviewId:r.id,_reviewStage:r.stage||0,level:'REVIEW'})),index:0,answers:[],completed:false};save();currentIndex=0;switchView('training');showCurrentQuestion();
  }

  function renderTraining(){
    const s=state.session;
    if(!s || s.completed){$('trainingEmpty').classList.remove('hidden');$('questionStage').classList.add('hidden');$('sessionComplete').classList.add('hidden');return}
    $('trainingEmpty').classList.add('hidden');$('questionStage').classList.remove('hidden');$('sessionComplete').classList.add('hidden');
    $('trainingTitle').textContent=s.mode==='review'?'Review Workout':'Today’s #22 Workout';
    $('trainingSummary').textContent=s.mode==='review'?`${s.items.length} due review questions`:`${s.items.filter(x=>x.subject==='Math').length} Math · Reading · English · Science · Social Studies · Boss Challenge · Review`;
    currentIndex=Math.min(s.index||0,s.items.length-1); updateSessionProgress();
  }

  function showCurrentQuestion(){
    const s=state.session;if(!s||s.completed)return;
    const q=s.items[currentIndex]; if(!q){completeSession();return}
    selectedChoice=null;
    $('qSubject').textContent=q.subject;
    $('qSkill').textContent=q.skill;
    $('qLevel').textContent=q.level||'CORE';
    $('qCounter').textContent=`${currentIndex+1} / ${s.items.length}`;
    $('qPrompt').textContent=q.prompt;
    $('qChoices').innerHTML='';
    (q.choices||[]).forEach((c,i)=>{
      const b=document.createElement('button');b.className='choice';b.innerHTML=`<span class="choice-key">${String.fromCharCode(65+i)}</span><span>${esc(c)}</span>`;b.addEventListener('click',()=>{if($('questionNav').classList.contains('hidden')){selectedChoice=i;document.querySelectorAll('.choice').forEach((x,j)=>x.classList.toggle('selected',j===i))}});$('qChoices').appendChild(b);
    });
    if(q.passage){$('passageBox').classList.remove('hidden');$('passageBox').innerHTML=`<strong>${esc(q.passageTitle||'Reading Passage')}</strong>\n\n${esc(q.passage)}`;} else $('passageBox').classList.add('hidden');
    $('hintBox').classList.add('hidden');$('feedbackBox').className='feedback hidden';$('explanationBox').classList.add('hidden');$('questionNav').classList.add('hidden');$('submitAnswerBtn').disabled=false;updateSessionProgress();
  }

  function showHint(){const q=state.session?.items[currentIndex];if(!q)return;$('hintBox').textContent=q.hint||'Break the problem into smaller steps and use evidence from the question.';$('hintBox').classList.remove('hidden')}

  function submitAnswer(){
    const s=state.session,q=s?.items[currentIndex];if(!q)return;
    if(selectedChoice===null){alert('Choose an answer first. 🏀');return}
    const correct=selectedChoice===q.answer;
    const buttons=[...document.querySelectorAll('.choice')];buttons.forEach((b,i)=>{b.classList.remove('selected');if(i===q.answer)b.classList.add('correct');else if(i===selectedChoice&&!correct)b.classList.add('incorrect');b.disabled=true});
    $('feedbackBox').textContent=correct?'✅ Correct — good read.':'❌ Not yet. Use the explanation, then this skill will come back in review.';
    $('feedbackBox').className='feedback '+(correct?'correct':'incorrect');
    $('explanationBox').innerHTML=`<strong>WHY:</strong> ${esc(q.explanation)}<br><strong>SKILL:</strong> ${esc(q.skill)}`;$('explanationBox').classList.remove('hidden');$('questionNav').classList.remove('hidden');$('submitAnswerBtn').disabled=true;
    recordAttempt(q,correct);s.answers[currentIndex]={correct,selected:selectedChoice};save();updateSessionProgress();
  }

  function recordAttempt(q,correct){
    const date=todayKey();const key=`${q.subject}|${q.skill}`;
    const a=state.attempts[key]||{correct:0,total:0,last:null};a.total++;if(correct)a.correct++;a.last=date;state.attempts[key]=a;
    state.history.push({date,subject:q.subject,skill:q.skill,correct,id:q.id});if(state.history.length>1000)state.history=state.history.slice(-1000);
    state.xp += correct ? (q.subject==='Reasoning'?22:2) : 1;

    if(q._reviewId){
      const idx=state.reviewQueue.findIndex(r=>r.id===q._reviewId);
      if(idx>=0){
        if(correct){const stage=(state.reviewQueue[idx].stage||0)+1;const intervals=[3,7,14,30];if(stage>=4)state.reviewQueue.splice(idx,1);else{state.reviewQueue[idx].stage=stage;state.reviewQueue[idx].due=addDays(date,intervals[stage-1]);}}
        else{state.reviewQueue[idx].stage=0;state.reviewQueue[idx].due=addDays(date,1);}
      }
    } else if(!correct){
      const exists=state.reviewQueue.some(r=>r.question.id===q.id && r.due>=date);
      if(!exists)state.reviewQueue.push({id:'rv'+Date.now()+Math.random().toString(16).slice(2),question:stripReview(q),due:addDays(date,1),stage:0,created:date});
    }
  }
  function stripReview(q){const x={...q};delete x._reviewId;delete x._reviewStage;return x}

  function nextQuestion(){
    const s=state.session;if(!s)return;
    currentIndex++;s.index=currentIndex;save();
    if(currentIndex>=s.items.length)completeSession();else showCurrentQuestion();
  }

  function completeSession(){
    const s=state.session;if(!s)return;s.completed=true;s.index=s.items.length;
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
    const s=state.session&&state.session.date===todayKey()?state.session:null;const done=s?s.answers.filter(Boolean).length:0,total=s?s.items.length:0;$('todayProgress').textContent=`${done}/${total}`;$('streakCount').textContent=state.streak;$('xpCount').textContent=state.xp;
    $('dashSchoolFocus').textContent=[state.parent.schoolMath,state.parent.schoolEnglish,state.parent.schoolScience,state.parent.schoolHistory].filter(Boolean).join(' · ')||'Not set yet';
    $('dashAdvancedFocus').textContent=[state.parent.advancedMath,state.parent.advancedOther].filter(Boolean).join(' · ')||'Not set yet';
    $('milestoneName').textContent=state.parent.milestone||'8th Grade Math Placement Readiness';$('milestoneDate').textContent='Date: '+(state.parent.milestoneDate||'needs confirmation');$('milestoneNote').textContent=state.parent.milestoneNotes||'Build evidence before the decision window.';
    const mastery=masteryPercent();$('milestoneMeter').style.width=Math.max(15,Math.min(95,mastery))+'%';
    const subjects=[['Math','🧮'],['English','📚'],['Science','🔬'],['Social Studies','🌎'],['Reasoning','🧠']];
    $('weeklySubjectCards').innerHTML=subjects.map(([sub,icon])=>{const st=statsFor(sub);return `<div class="subject-card"><span>${icon} ${sub}</span><strong>${st.pct===null?'—':st.pct+'%'}</strong><small>${st.total?`${st.correct}/${st.total} correct this week`:'No attempts yet'}</small></div>`}).join('');
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
    const date=todayKey();const sorted=[...state.reviewQueue].sort((a,b)=>a.due.localeCompare(b.due));const due=sorted.filter(r=>r.due<=date);$('reviewCount').textContent=`${due.length} DUE`;
    $('reviewQueueList').innerHTML=sorted.length?sorted.map(r=>`<div class="review-item"><div><h3>${esc(r.question.subject)} · ${esc(r.question.skill)}</h3><p>${esc(r.question.prompt)}</p></div><div class="due">${r.due<=date?'DUE NOW':'Due '+r.due}<br>Stage ${r.stage||0}/4</div></div>`).join(''):'<div class="empty-state"><div class="big-icon">✅</div><h2>Queue clear.</h2><p>Wrong answers will automatically come back tomorrow, then 3, 7, 14, and 30 days later as they are mastered.</p></div>';
  }

  const roadmapData=[
    ['7th Grade','BUILD & PROVE',['Excel in current courses','Strengthen math foundations + placement readiness','Build strong English reading/writing','Track ERB / benchmark results','Know 8th-grade placement rules','Keep sports, health, and interests strong']],
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
    'Get Audrey’s 6th-grade placement assessment/results','Get ERB math subsection results','Confirm exact 7th-grade math pathway names','Understand why Standard placement was chosen','Confirm 7→8 placement decision window','Ask whether another placement assessment occurs','Ask whether students can move up midyear or for 8th grade','Confirm teacher recommendation criteria','Confirm how ERB and class grades are used','Ask what evidence demonstrates readiness for a higher path','Confirm all 8th-grade math options','Understand 8→9 math placement before 8th grade begins','Check whether English has level/placement decisions','Check world-language placement/prerequisites'
  ];
  function renderParent(){
    const p=state.parent;$('schoolMathInput').value=p.schoolMath;$('schoolEnglishInput').value=p.schoolEnglish;$('schoolScienceInput').value=p.schoolScience;$('schoolHistoryInput').value=p.schoolHistory;$('schoolNotesInput').value=p.schoolNotes;$('advancedMathInput').value=p.advancedMath;$('advancedOtherInput').value=p.advancedOther;$('milestoneInput').value=p.milestone;$('milestoneDateInput').value=p.milestoneDate;$('milestoneNotesInput').value=p.milestoneNotes;$('dailyTargetInput').value=p.dailyTarget;$('mathIntensityInput').value=p.mathIntensity;
    $('placementChecklist').innerHTML=placementItems.map((x,i)=>`<label class="check-row"><input type="checkbox" data-placement="${i}" ${p.placementChecks[i]?'checked':''}><span>${esc(x)}</span></label>`).join('');
    document.querySelectorAll('[data-placement]').forEach(cb=>cb.addEventListener('change',()=>{state.parent.placementChecks[cb.dataset.placement]=cb.checked;save()}));
  }
  function saveParent(){
    const p=state.parent;p.schoolMath=$('schoolMathInput').value.trim();p.schoolEnglish=$('schoolEnglishInput').value.trim();p.schoolScience=$('schoolScienceInput').value.trim();p.schoolHistory=$('schoolHistoryInput').value.trim();p.schoolNotes=$('schoolNotesInput').value.trim();p.advancedMath=$('advancedMathInput').value.trim();p.advancedOther=$('advancedOtherInput').value.trim();p.milestone=$('milestoneInput').value.trim()||'8th Grade Math Placement Readiness';p.milestoneDate=$('milestoneDateInput').value.trim()||'Needs confirmation with Hillbrook';p.milestoneNotes=$('milestoneNotesInput').value.trim();p.dailyTarget=Math.max(10,Math.min(45,Number($('dailyTargetInput').value)||25));p.mathIntensity=$('mathIntensityInput').value;state.session=null;save();alert('Saved. Tomorrow’s training will use this school + advanced focus. 🏀 #22');renderDashboard();
  }
  function resetAll(){if(!confirm('Reset ALL Audrey #22 progress, review history, streaks, and parent settings?'))return;state=defaultState();save();renderParent();renderDashboard();alert('Reset complete.')}
  function exportProgress(){
    const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`audrey22-progress-${todayKey()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
  }

  // Initial render
  renderDashboard();
  if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
