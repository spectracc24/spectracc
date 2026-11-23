/* ==========================================================================
   Generated figures: land cover, carbon surface, survey grid and the before/after slider.
   Used as the "feature" of an item (see data files). Mounted only when scrolled into view.
   API: SCC.figures.html(feature, {full:true})  -> placeholder markup
        SCC.figures.lazy(rootElement)           -> draws every placeholder inside rootElement
   ========================================================================== */
(function(){
'use strict';
var SCC=window.SCC,$=SCC.$,$$=SCC.$$,esc=SCC.esc;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function makeNoise(seed){var r=mulberry32(seed),S=64,g=new Float32Array(S*S);for(var i=0;i<g.length;i++)g[i]=r();
  var sm=function(t){return t*t*(3-2*t)};
  return function(x,y){var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;
    var a=g[((yi&63)*S)+(xi&63)],b=g[((yi&63)*S)+((xi+1)&63)],c=g[(((yi+1)&63)*S)+(xi&63)],d=g[(((yi+1)&63)*S)+((xi+1)&63)];
    var u=sm(xf),v=sm(yf);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}}
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


var LEG='<div class="legend"><span><i style="background:#367A55"></i>Forest</span><span><i style="background:#A9C6B2"></i>Regrowth</span><span><i style="background:#D9CBA0"></i>Cleared</span><span><i style="background:#9CC3D5"></i>Water</span></div>';

function html(f,o){f=f||{};o=o||{};
  return '<div class="fig-host is-loading" data-feat="'+esc(JSON.stringify({kind:f.kind||'grid',seed:f.seed||3,labels:f.labels||['2015','2025']}))+'"'+(o.full?' data-full="1"':'')+(o.caption?' data-cap="'+esc(o.caption)+'"':'')+'></div>'}

function mount(el){
  var f=JSON.parse(el.dataset.feat),full=!!el.dataset.full,cap=el.dataset.cap||'',k=f.kind,seed=+f.seed||3,out='';
  if(k==='compare'){
    out='<div class="cmp" style="--p:50%"><canvas class="before" aria-hidden="true"></canvas><canvas class="after" aria-hidden="true"></canvas><span class="yr l">'+esc(f.labels[0])+'</span><span class="yr r">'+esc(f.labels[1])+'</span><div class="hd"></div><input type="range" min="2" max="98" value="50" aria-label="Compare '+esc(f.labels[0])+' with '+esc(f.labels[1])+'"></div>'+
      (full?LEG+'<div class="stats" style="margin-top:12px"><div class="stat"><b class="s1">0%</b><span>Forest share, '+esc(f.labels[0])+'</span></div><div class="stat"><b class="s2">0%</b><span>Forest share, '+esc(f.labels[1])+'</span></div></div><p class="fig-cap">'+esc(cap||'Drag the slider to compare periods. Generated illustrative data.')+'</p>':'');
    el.innerHTML=out;var cmp=$('.cmp',el),a=makeLC(560,360,seed,15),b=makeLC(560,360,seed,25);
    paintLC($('canvas.before',cmp),a);paintLC($('canvas.after',cmp),b);
    if(full){$('.s1',el).textContent=Math.round(a.share(0)*100)+'%';$('.s2',el).textContent=Math.round(b.share(0)*100)+'%'}
    $('input',cmp).addEventListener('input',function(e){cmp.style.setProperty('--p',e.target.value+'%')});
  }else{
    el.innerHTML='<canvas class="thumb" data-kind="'+esc(k)+'" data-seed="'+seed+'" width="'+(full?560:400)+'" height="'+(full?360:250)+'" role="img" aria-label="Illustrative figure built from generated data"></canvas>'+(full?'<p class="fig-cap">'+esc(cap||'Illustrative figure built from generated data.')+'</p>':'');
    drawThumb($('canvas',el));
  }
  el.classList.remove('is-loading')}

var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);setTimeout(function(){mount(e.target)},0)}})},{rootMargin:'200px'}):null;
function lazy(root){$$('.fig-host.is-loading',root).forEach(function(el){if(el.dataset.q)return;el.dataset.q='1';if(io)io.observe(el);else setTimeout(function(){mount(el)},0)})}

SCC.figures={html:html,lazy:lazy,mount:mount};
})();
