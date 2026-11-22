(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var root=document.documentElement;
function ic(n,c){return '<svg class="ic'+(c?' '+c:'')+'" aria-hidden="true"><use href="#'+n+'"/></svg>'}
function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)}

/* ---------- Content (edit here) ---------- */
var CONTACT={address:'',email:'',phone:'',website:''};
var STAGES=[
 {t:'Scientific and Expert Mobilization',i:'i-network',d:'We match client needs and program objectives with qualified specialists across geospatial science, forestry and other land-use sectors, environmental science and related disciplines.'},
 {t:'Methodological and Spatial Execution',i:'i-layers',d:'We deliver geospatial consulting, spatial analysis, applied research, environmental assessments and tailored technical solutions grounded in scientific methods.'},
 {t:'Decision-Grade Project Quality',i:'i-check',d:'We strengthen scientific rigor and technical reliability, so that decisions rest on evidence a donor, investor or regulator can check.'},
 {t:'Institutional Technical Independence',i:'i-db',d:'We build internal competencies through knowledge transfer, standardized workflows, institutional procedures, spatial data infrastructure and applied analytical skills.'},
 {t:'Sectoral Leadership and Collective Impact',i:'i-globe',d:'We contribute to a growing network of capable practitioners and institutions that together advance environmental sustainability.'}
];
var FIELDS=['Remote sensing','Forest ecology','Hydrology','Carbon accounting','Environmental governance','Spatial data science'];
var FIELD_DESC={
 'Remote sensing':'Optical, SAR and high-resolution imagery processing, land-cover mapping and change detection.',
 'Forest ecology':'Forest structure, ecosystem condition and biodiversity assessment in the field and from imagery.',
 'Hydrology':'Water, peat and catchment dynamics that shape land-use and carbon outcomes.',
 'Carbon accounting':'Carbon stock estimation, emissions baselines and monitoring for climate mitigation.',
 'Environmental governance':'Safeguards, policy context and institutional procedures that keep projects credible.',
 'Spatial data science':'Predictive modeling, spatial classification, data fusion and geospatial database design.'};
var TEAM=FIELDS.map(function(f){return {name:'[Full Name]',role:'[Job Title]',field:f,desc:FIELD_DESC[f]}});
var CASES=[
 {id:'c1',title:'Forest cover change analysis',pillar:'Geospatial consulting',client:'[Client name]',period:'[Month Year]',tags:['Remote sensing','LULCC','Forest cover'],
  context:'A growing forest management initiative needed a defensible record of where forest cover had changed before it planned protection and restoration work.',
  approach:['Assembled and corrected multi-temporal imagery for the project area.','Classified land cover for each period and checked the classes against field survey points.','Measured change by class and mapped where it concentrated.'],
  outcome:'A land-cover change map and area statistics the team can defend to donors and regulators, plus a documented workflow their own staff can repeat.',fig:'compare'},
 {id:'c2',title:'Baseline assessment of village forest areas',pillar:'Applied research',client:'[Client name]',period:'[Month Year]',tags:['Baseline','Village forest','Field survey'],
  context:'Village managers needed reference conditions for their forest area before setting management targets.',
  approach:['Derived land-cover classes from satellite imagery and verified them with field points.','Ran a landscape diagnostic to identify constraints and opportunities.','Defined indicators that the village team can track over time.'],
  outcome:'A baseline report with maps, indicators and a monitoring starting point that village managers can plan with.',fig:'grid',seed:8},
 {id:'c3',title:'Building an in-house GIS routine',pillar:'Training and capacity',client:'[Client name]',period:'[Month Year]',tags:['Capacity building','QC/QA','Spatial database'],
  context:'A growing organization collected field data in many formats and had no shared spatial database.',
  approach:['Set up a standard spatial database and naming workflow.','Wrote QC/QA protocols for field data collection.','Ran hands-on sessions in applied GIS and map production with the team.'],
  outcome:'A team that manages its own spatial data, with written procedures that outlast the engagement.',fig:'carbon',seed:14}
];
var PROJECTS=[
 {t:'Spatial carbon stock estimation',pl:'Consulting',area:'Carbon and climate analytics',kind:'carbon',seed:4,del:['Carbon stock map','Method note','Uncertainty summary']},
 {t:'Land-use and land-cover change mapping',pl:'Consulting',area:'Remote sensing',kind:'lc',seed:31,del:['Classified maps by period','Change statistics','Accuracy assessment']},
 {t:'Environmental baseline and landscape diagnostic',pl:'Research',area:'Environmental baseline assessments',kind:'lc',seed:17,del:['Baseline report','Reference condition maps','Constraints and opportunities']},
 {t:'Monitoring framework and indicator design',pl:'Research',area:'Monitoring, evaluation and performance',kind:'grid',seed:22,del:['Indicator set','Monitoring protocol','Reporting template']},
 {t:'Applied GIS and cartography training',pl:'Training',area:'Capacity development',kind:'grid',seed:6,del:['Training modules','Practice datasets','Participant map portfolio']},
 {t:'Geospatial database and field data QC/QA',pl:'Training',area:'Geospatial data engineering',kind:'carbon',seed:27,del:['Spatial database structure','QC/QA checklist','Field data protocol']}
];

/* ---------- Helpers ---------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeNoise(seed){var r=mulberry32(seed),S=64,g=new Float32Array(S*S);for(var i=0;i<g.length;i++)g[i]=r();
  var sm=function(t){return t*t*(3-2*t)};
  return function(x,y){var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;
    var a=g[((yi&63)*S)+(xi&63)],b=g[((yi&63)*S)+((xi+1)&63)],c=g[(((yi+1)&63)*S)+(xi&63)],d=g[(((yi+1)&63)*S)+((xi+1)&63)];
    var u=sm(xf),v=sm(yf);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}}
function smoothPath(c,pts,ox,oy,s){var n=pts.length;
  var P=function(i){var p=pts[(i+n)%n];return [(p[0]+ox)*s,(p[1]+oy)*s]};
  var p=P(0);c.moveTo(p[0],p[1]);
  for(var i=0;i<n;i++){var p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2);
    c.bezierCurveTo(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6,p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6,p2[0],p2[1])}
  c.closePath()}
function copyText(text,srcEl,msgEl){
  var done=function(ok){if(msgEl)msgEl.textContent=ok?'Copied':'Select the text and copy it manually'};
  var fallback=function(){try{var r=document.createRange();r.selectNodeContents(srcEl);var s=window.getSelection();s.removeAllRanges();s.addRange(r)}catch(e){}done(false)};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){done(true)},fallback)}else fallback()}

/* ---------- Logo ---------- */
var MARK='<svg viewBox="-210 -210 420 420" class="mk" aria-hidden="true" fill="none" stroke-width="32" stroke-linecap="round"><path d="M-90.5 -165.9A189 189 0 1 0 163.8 -94.2" style="stroke:var(--lg-o)"/><path d="M67.5 -112.3A131 131 0 1 0 112.8 66.7" style="stroke:var(--lg-m)"/><path d="M71 0A71 71 0 1 0 0 71" style="stroke:var(--lg-i)"/><circle r="19" stroke="none" style="fill:var(--lg-d)"/></svg>';
$$('[data-logo]').forEach(function(e){e.innerHTML=MARK+'<span class="wm"><b>Spectra CC</b><i>Citra Cendekia</i></span>'});

/* ---------- Theme ---------- */
try{var st=localStorage.getItem('scc-theme');if(st==='dark'||st==='light')root.setAttribute('data-theme',st)}catch(e){}
function themeChanged(){$('#themeUse').setAttribute('href',isDark()?'#i-sun':'#i-moon');window.dispatchEvent(new Event('scc-theme'))}
$('#themeBtn').addEventListener('click',function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('scc-theme',n)}catch(e){}themeChanged()});
if(window.matchMedia){var mq=matchMedia('(prefers-color-scheme: dark)');if(mq.addEventListener)mq.addEventListener('change',themeChanged)}
$('#themeUse').setAttribute('href',isDark()?'#i-sun':'#i-moon');

/* ---------- Land cover generator ---------- */
var PAL=[[54,122,85],[169,198,178],[217,203,160],[156,195,213]];
function makeLC(w,h,seed,yr){
  var r=mulberry32(seed),r2=mulberry32(seed+99),nz=makeNoise(seed+5),n=26,S=[];
  for(var i=0;i<n;i++){var x=r()*w,y=r()*h,c=r(),base=c<.52?0:(c<.72?1:2),q=r2();
    var c25=base===0?(q<.17?2:(q<.27?1:0)):(base===1?(q<.25?2:1):2);
    S.push({x:x,y:y,c:yr===25?c25:base})}
  var map=new Uint8Array(w*h);
  for(var yy=0;yy<h;yy++){for(var xx=0;xx<w;xx++){
    var j=(nz(xx/26,yy/26)-.5)*w*.07,best=1e9,bc=0;
    for(var k=0;k<n;k++){var s=S[k],dx=xx-s.x,dy=yy-s.y,d=Math.sqrt(dx*dx+dy*dy)+((k%2)?j:-j);if(d<best){best=d;bc=s.c}}
    var ry=h*.55+h*.12*Math.sin(xx/(w*.15)+seed)+(nz(xx/30,7)-.5)*14;
    if(Math.abs(yy-ry)<h*.011)bc=3;
    map[yy*w+xx]=bc}}
  return {map:map,w:w,h:h,share:function(c){var k=0;for(var i=0;i<map.length;i++)if(map[i]===c)k++;return k/map.length}}}
function paintLC(cv,L){var ctx=cv.getContext('2d');cv.width=L.w;cv.height=L.h;var id=ctx.createImageData(L.w,L.h),d=id.data;
  for(var i=0;i<L.map.length;i++){var p=PAL[L.map[i]];d[i*4]=p[0];d[i*4+1]=p[1];d[i*4+2]=p[2];d[i*4+3]=255}
  ctx.putImageData(id,0,0)}
var RAMP=[[0,[220,234,240]],[.3,[169,198,178]],[.6,[22,140,145]],[1,[23,50,77]]];
function ramp(v){for(var i=1;i<RAMP.length;i++){if(v<=RAMP[i][0]){var a=RAMP[i-1],b=RAMP[i],t=(v-a[0])/(b[0]-a[0]);return [a[1][0]+(b[1][0]-a[1][0])*t,a[1][1]+(b[1][1]-a[1][1])*t,a[1][2]+(b[1][2]-a[1][2])*t]}}return RAMP[RAMP.length-1][1]}
function fillCarbon(cv,seed){var w=cv.width,h=cv.height,ctx=cv.getContext('2d'),id=ctx.createImageData(w,h),d=id.data,r=mulberry32(seed),C=[],nz=makeNoise(seed+3);
  for(var i=0;i<9;i++)C.push([r()*w,r()*h,Math.min(w,h)*(.12+r()*.16),.5+r()*.5]);
  for(var y=0;y<h;y++)for(var x=0;x<w;x++){var v=0;for(var k=0;k<C.length;k++){var c=C[k],dx=x-c[0],dy=y-c[1];v+=c[3]*Math.exp(-(dx*dx+dy*dy)/(2*c[2]*c[2]))}
    v=Math.max(0,Math.min(1,v*.9+(nz(x/16,y/16)-.5)*.12));var p=ramp(v),o=(y*w+x)*4;d[o]=p[0];d[o+1]=p[1];d[o+2]=p[2];d[o+3]=235}
  ctx.putImageData(id,0,0)}
function gridOver(ctx,w,h,a,step){ctx.save();ctx.strokeStyle='rgba(255,255,255,'+a+')';ctx.lineWidth=1;ctx.beginPath();
  for(var x=step;x<w;x+=step){ctx.moveTo(x,0);ctx.lineTo(x,h)}for(var y=step;y<h;y+=step){ctx.moveTo(0,y);ctx.lineTo(w,y)}ctx.stroke();ctx.restore()}
function gridFig(cv,seed){var w=cv.width,h=cv.height,ctx=cv.getContext('2d'),r=mulberry32(seed);
  ctx.fillStyle='#DCEAF0';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#B7CBD6';ctx.lineWidth=1;ctx.beginPath();
  for(var x=w/10;x<w;x+=w/10){ctx.moveTo(x,0);ctx.lineTo(x,h)}for(var y=h/7;y<h;y+=h/7){ctx.moveTo(0,y);ctx.lineTo(w,y)}ctx.stroke();
  var pts=[];for(var i=0;i<5;i++)pts.push([w*(.12+i*.18+r()*.06),h*(.18+r()*.64)]);
  ctx.setLineDash([7,6]);ctx.strokeStyle='#17324D';ctx.lineWidth=2;ctx.beginPath();pts.forEach(function(p,i){i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])});ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle='#168C91';ctx.lineWidth=2.5;ctx.fillStyle='#17324D';ctx.font='500 '+Math.round(w/46)+'px Inter, sans-serif';
  pts.forEach(function(p,i){ctx.beginPath();ctx.moveTo(p[0]-9,p[1]);ctx.lineTo(p[0]+9,p[1]);ctx.moveTo(p[0],p[1]-9);ctx.lineTo(p[0],p[1]+9);ctx.stroke();ctx.fillText('00° 00′',p[0]+12,p[1]-8)})}
function drawThumb(cv){if(cv.dataset.done)return;var kind=cv.dataset.kind,seed=+cv.dataset.seed||3;
  if(kind==='lc'){paintLC(cv,makeLC(cv.width,cv.height,seed,25));gridOver(cv.getContext('2d'),cv.width,cv.height,.2,Math.round(cv.width/10))}
  else if(kind==='carbon'){fillCarbon(cv,seed);gridOver(cv.getContext('2d'),cv.width,cv.height,.22,Math.round(cv.width/10))}
  else gridFig(cv,seed);
  cv.dataset.done='1'}

/* ---------- Hero ---------- */
var heroApi=(function(){
  var sec=$('#hero'),c=$('#heroCanvas'),ctx=c.getContext('2d'),out=$('#heroCoord');
  var W=1,H=1,dpr=1,px=.72,py=.45,cx=.72,cy=.45;
  function dm(v,h,pad){var a=Math.abs(v),d=Math.floor(a),m=Math.round((a-d)*60);if(m===60){m=0;d++}return String(d).padStart(pad,'0')+'° '+String(m).padStart(2,'0')+'′ '+h}
  function readout(){out.textContent='Cursor  '+dm(py*.6,'S',2)+'  ·  '+dm(109+px*.8,'E',3)}
  function draw(t){ctx.clearRect(0,0,W,H);
    ctx.lineWidth=1;ctx.strokeStyle='rgba(220,234,240,0.06)';var gs=64;ctx.beginPath();
    for(var x=gs/2;x<W;x+=gs){ctx.moveTo(x,0);ctx.lineTo(x,H)}for(var y=gs/2;y<H;y+=gs){ctx.moveTo(0,y);ctx.lineTo(W,y)}ctx.stroke();
    var narrow=W<760,bx=W*(narrow?.62:.74),by=H*(narrow?.7:.46),ox=(cx-.72)*W,oy=(cy-.45)*H,N=15,sc=Math.min(W,900)*(narrow?.05:.034);
    for(var k=N;k>=0;k--){var d=k/N,rx=26+k*sc,ry=rx*.62,par=.1+(1-d)*.34,x0=bx+ox*par,y0=by+oy*par,ph=t*.00035+k*.55;
      ctx.beginPath();var M=96;
      for(var i=0;i<=M;i++){var a=i/M*Math.PI*2,w=1+.075*Math.sin(3*a+ph)+.045*Math.sin(5*a-ph*1.3+k)+.03*Math.sin(2*a+k),xx=x0+Math.cos(a)*rx*w,yy=y0+Math.sin(a)*ry*w;if(i)ctx.lineTo(xx,yy);else ctx.moveTo(xx,yy)}
      ctx.closePath();
      if(k===0){ctx.strokeStyle='rgba(235,243,247,.95)';ctx.lineWidth=2}else{ctx.strokeStyle='rgba(45,177,183,'+(0.10+(1-d)*.55).toFixed(3)+')';ctx.lineWidth=1.2}
      ctx.stroke()}}
  function size(){var r=sec.getBoundingClientRect();if(r.width<2)return;dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(0)}
  function loop(t){if(!$('#v-home').hidden){cx+=(px-cx)*.07;cy+=(py-cy)*.07;draw(t)}requestAnimationFrame(loop)}
  sec.addEventListener('pointermove',function(e){var r=sec.getBoundingClientRect();px=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));py=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height));readout();if(RM){cx=px;cy=py;draw(0)}});
  window.addEventListener('resize',size);
  size();readout();if(!RM)requestAnimationFrame(loop);
  return {size:size}
})();

/* ---------- Pathway ---------- */
(function(){
  var wrap=$('#stages'),det=$('#stageDetail'),btns=[];
  STAGES.forEach(function(s,i){var b=document.createElement('button');b.className='stg';b.setAttribute('role','tab');b.setAttribute('aria-selected',i===0?'true':'false');
    b.innerHTML='<span class="n">'+(i+1)+'</span><b>'+s.t+'</b>';b.addEventListener('click',function(){show(i)});
    b.addEventListener('keydown',function(e){var k=e.key;if(k==='ArrowRight'||k==='ArrowDown'){e.preventDefault();show((i+1)%STAGES.length,true)}else if(k==='ArrowLeft'||k==='ArrowUp'){e.preventDefault();show((i+STAGES.length-1)%STAGES.length,true)}});
    wrap.appendChild(b);btns.push(b)});
  function show(i,focus){btns.forEach(function(b,j){b.setAttribute('aria-selected',j===i?'true':'false');b.tabIndex=j===i?0:-1});
    det.innerHTML=ic(STAGES[i].i)+'<div><h3>Stage '+(i+1)+', '+STAGES[i].t+'</h3><p>'+STAGES[i].d+'</p></div>';if(focus)btns[i].focus()}
  show(0);
})();

/* ---------- About: team and network ---------- */
(function(){
  var net=$('#net'),grid=$('#teamGrid'),fil=$('#teamFilters'),sel=null;
  var cx=320,cy=190,rx=200,ry=135,nodes=[];
  var svg='<defs></defs>';
  FIELDS.forEach(function(f,i){var a=(-90+i*60)*Math.PI/180;nodes.push({f:f,x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry,c:Math.cos(a)})});
  nodes.forEach(function(n,i){svg+='<line class="edge" data-i="'+i+'" x1="'+cx+'" y1="'+cy+'" x2="'+n.x.toFixed(1)+'" y2="'+n.y.toFixed(1)+'"/>'});
  svg+='<circle cx="'+cx+'" cy="'+cy+'" r="46" fill="#17324D"/><svg x="'+(cx-30)+'" y="'+(cy-30)+'" width="60" height="60" viewBox="-210 -210 420 420" fill="none" stroke-width="32" stroke-linecap="round" style="--lg-o:#fff;--lg-m:#2DB1B7;--lg-i:#A9C6B2;--lg-d:#fff"><path d="M-90.5 -165.9A189 189 0 1 0 163.8 -94.2" style="stroke:var(--lg-o)"/><path d="M67.5 -112.3A131 131 0 1 0 112.8 66.7" style="stroke:var(--lg-m)"/><path d="M71 0A71 71 0 1 0 0 71" style="stroke:var(--lg-i)"/><circle r="19" stroke="none" style="fill:var(--lg-d)"/></svg>';
  nodes.forEach(function(n,i){var anchor=n.c>.3?'start':(n.c<-.3?'end':'middle'),tx=n.x+(n.c>.3?26:(n.c<-.3?-26:0)),ty=n.y+(Math.abs(n.c)<=.3?(n.y<cy?-26:34):5);
    svg+='<g class="node" data-i="'+i+'" tabindex="0" role="button" aria-pressed="false" aria-label="'+n.f+'"><circle cx="'+n.x.toFixed(1)+'" cy="'+n.y.toFixed(1)+'" r="17"/><text x="'+tx.toFixed(1)+'" y="'+ty.toFixed(1)+'" style="text-anchor:'+anchor+'">'+n.f+'</text></g>'});
  net.innerHTML=svg;
  function render(){grid.innerHTML=TEAM.filter(function(m){return !sel||m.field===sel}).map(function(m){
    return '<article class="card member"><div class="av">'+MARK+'</div><h3>'+m.name+'</h3><p class="role">'+m.role+'</p><div class="chips"><span class="chip">'+ic('i-network')+m.field+'</span></div><p>'+m.desc+'</p></article>'}).join('');
    $$('.node',net).forEach(function(g,i){var on=FIELDS[i]===sel;g.classList.toggle('on',on);g.setAttribute('aria-pressed',on?'true':'false')});
    $$('.edge',net).forEach(function(l,i){l.classList.toggle('on',FIELDS[i]===sel)});
    $$('.fbtn',fil).forEach(function(b){b.setAttribute('aria-pressed',((b.dataset.f||null)===sel)?'true':'false')})}
  function set(f){sel=(f===sel)?null:f;render()}
  fil.innerHTML='<button class="fbtn" data-f="" aria-pressed="true">All disciplines</button>'+FIELDS.map(function(f){return '<button class="fbtn" data-f="'+f+'" aria-pressed="false">'+f+'</button>'}).join('');
  $$('.fbtn',fil).forEach(function(b){b.addEventListener('click',function(){sel=b.dataset.f||null;render()})});
  $$('.node',net).forEach(function(g,i){g.addEventListener('click',function(){set(FIELDS[i])});g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();set(FIELDS[i])}})});
  render();
  $$('[data-jump]').forEach(function(b){b.addEventListener('click',function(){var t=document.getElementById(b.dataset.jump);if(t)t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})})});
})();

/* ---------- Case studies ---------- */
var caseDone=false;
function initCases(){if(caseDone)return;caseDone=true;
  var html=CASES.map(function(c){var fig='';
    if(c.fig==='compare')fig='<figure class="fig"><div class="cmp" id="cmp" style="--p:50%"><canvas class="before" aria-hidden="true"></canvas><canvas class="after" aria-hidden="true"></canvas><span class="yr l">2015</span><span class="yr r">2025</span><div class="hd"></div><input type="range" min="2" max="98" value="50" id="cmpIn" aria-label="Compare land cover between 2015 and 2025"></div>'+
      '<div class="legend"><span><i style="background:#367A55"></i>Forest</span><span><i style="background:#A9C6B2"></i>Regrowth</span><span><i style="background:#D9CBA0"></i>Cleared</span><span><i style="background:#9CC3D5"></i>Water</span></div>'+
      '<div class="stats" style="margin-top:12px"><div class="stat"><b id="cm15">0%</b><span>Forest share, 2015</span></div><div class="stat"><b id="cm25">0%</b><span>Forest share, 2025</span></div></div>'+
      '<figcaption>Drag the slider to compare periods. Generated illustrative data, not a real site.</figcaption></figure>';
    else fig='<figure class="fig"><canvas class="thumb" data-kind="'+c.fig+'" data-seed="'+(c.seed||3)+'" width="560" height="360" role="img" aria-label="Illustrative figure for this case study"></canvas><figcaption>Illustrative figure built from generated data.</figcaption></figure>';
    return '<article class="case" id="'+c.id+'"><div><div class="chips"><span class="chip">'+c.pillar+'</span><span class="chip ghost">Sample case</span></div><h2>'+c.title+'</h2><p class="meta">'+c.client+' · '+c.period+'</p>'+
      '<h3>Context</h3><p>'+c.context+'</p><h3>Approach</h3><ul class="ticks">'+c.approach.map(function(a){return '<li>'+ic('i-check')+'<span>'+a+'</span></li>'}).join('')+'</ul><h3>Outcome</h3><p>'+c.outcome+'</p>'+
      '<div class="tags" style="margin-top:16px">'+c.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div></div><div class="case-fig">'+fig+'</div></article>'}).join('');
  $('#caseList').innerHTML=html;
  var root=$('#cmp');if(root){var a=makeLC(560,360,21,15),b=makeLC(560,360,21,25);paintLC($('canvas.before',root),a);paintLC($('canvas.after',root),b);
    $('#cm15').textContent=Math.round(a.share(0)*100)+'%';$('#cm25').textContent=Math.round(b.share(0)*100)+'%';
    $('#cmpIn').addEventListener('input',function(e){root.style.setProperty('--p',e.target.value+'%')})}
  $$('#caseList canvas.thumb').forEach(drawThumb)}

/* ---------- Projects ---------- */
var projDone=false;
function initProjects(){if(projDone)return;projDone=true;
  var grid=$('#pGrid'),fil=$('#pFilters'),q=$('#pSearch'),pl='All';
  var pillars=['All','Consulting','Research','Training'];
  fil.innerHTML=pillars.map(function(p,i){return '<button class="fbtn" data-p="'+p+'" aria-pressed="'+(i===0?'true':'false')+'">'+p+'</button>'}).join('');
  grid.innerHTML=PROJECTS.map(function(p,i){return '<article class="pcard" data-pl="'+p.pl+'" data-t="'+(p.t+' '+p.area).toLowerCase()+'"><canvas class="thumb" data-kind="'+p.kind+'" data-seed="'+p.seed+'" width="400" height="250" role="img" aria-label="Illustrative map for '+p.t+'"></canvas>'+
    '<div class="pb"><div class="chips"><span class="chip">'+p.pl+'</span><span class="chip ghost">Sample entry</span></div><h3>'+p.t+'</h3><p class="meta" style="margin:0">'+p.area+'</p>'+
    '<details><summary>'+ic('i-chev')+'Details</summary><dl><dt>Client</dt><dd>[Client]</dd><dt>Location</dt><dd>[Location]</dd><dt>Year</dt><dd>[Year]</dd><dt>Deliverables</dt><dd>'+p.del.join(', ')+'</dd></dl></details></div></article>'}).join('');
  function apply(){var term=q.value.trim().toLowerCase(),n=0;$$('.pcard',grid).forEach(function(c){var ok=(pl==='All'||c.dataset.pl===pl)&&(!term||c.dataset.t.indexOf(term)>-1);c.hidden=!ok;if(ok)n++});
    $('#pEmpty').hidden=n>0;$$('.fbtn',fil).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.p===pl?'true':'false')})}
  $$('.fbtn',fil).forEach(function(b){b.addEventListener('click',function(){pl=b.dataset.p;apply()})});
  q.addEventListener('input',apply);
  $$('#pGrid canvas.thumb').forEach(drawThumb)}

/* ---------- Contact ---------- */
(function(){
  var rows=[['i-pin','Address','address','[ADDRESS]'],['i-mail','Email','email','[EMAIL]'],['i-phone','Phone','phone','[PHONE]'],['i-globe','Website','website','[WEBSITE]']];
  var h=rows.map(function(r){var v=CONTACT[r[2]];return '<div class="crow"><span class="ico">'+ic(r[0])+'</span><div><small>'+r[1]+'</small><span class="v'+(v?'':' ph')+'">'+(v||r[3])+'</span></div><button class="icon-btn" data-copy="'+(v||'')+'" aria-label="Copy '+r[1].toLowerCase()+'"'+(v?'':' disabled')+'>'+ic('i-copy')+'</button></div>'}).join('');
  h+='<div class="crow"><span class="ico">'+ic('i-compass')+'</span><div><small>Registered office region</small><span class="v">Kubu Raya, West Kalimantan, Indonesia</span></div><button class="icon-btn" data-copy="Kubu Raya, West Kalimantan, Indonesia" aria-label="Copy registered office region">'+ic('i-copy')+'</button></div>';
  $('#cinfo').innerHTML=h;
  $$('#cinfo [data-copy]').forEach(function(b){b.addEventListener('click',function(){copyText(b.dataset.copy,b.parentNode.querySelector('.v'),null)})});
  var form=$('#cform'),box=$('#draftBox'),txt=$('#draftText'),err=$('#cfErr');
  form.addEventListener('submit',function(e){e.preventDefault();
    var name=$('#cf-name').value.trim(),mail=$('#cf-mail').value.trim(),org=$('#cf-org').value.trim(),stage=$('#cf-stage').value,msg=$('#cf-msg').value.trim();
    var svc=$$('#cf-svc input:checked').map(function(x){return x.value});
    if(!name||mail.indexOf('@')<1){err.hidden=false;err.textContent='Enter your name and a valid email address so the draft can be completed.';box.hidden=true;return}
    err.hidden=true;
    txt.textContent='Subject: Inquiry to Spectra Citra Cendekia\n\nHello Spectra CC team,\n\nMy name is '+name+(org?' from '+org:'')+'.\nProject stage: '+stage+'.\nServices of interest: '+(svc.length?svc.join(', '):'to be discussed')+'.\n\n'+(msg||'I would like to discuss my project.')+'\n\nYou can reach me at '+mail+'.\n\nThank you,\n'+name;
    box.hidden=false;$('#copyMsg').textContent=''});
  $('#copyDraft').addEventListener('click',function(){copyText(txt.textContent,txt,$('#copyMsg'))});
})();

/* ---------- Router ---------- */
var ROUTES={'home':'v-home','about':'v-about','team':'v-about','case-studies':'v-case','projects':'v-projects','contact':'v-contact'};
function route(){var h=(location.hash||'#home').slice(1),key=ROUTES[h]?h:'home',id=ROUTES[key];
  $$('.view').forEach(function(v){v.hidden=v.id!==id});
  $$('[data-r]').forEach(function(a){var on=a.dataset.r.split(',').indexOf(key)>-1;if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  $('#navPanel').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');
  if(id==='v-home')heroApi.size();
  if(id==='v-case')initCases();
  if(id==='v-projects')initProjects();
  if(key==='team')requestAnimationFrame(function(){$('#team-section').scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})});
  else window.scrollTo(0,0)}
window.addEventListener('hashchange',route);
$('#menuBtn').addEventListener('click',function(){var o=$('#navPanel').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o?'true':'false')});
route();
})();
