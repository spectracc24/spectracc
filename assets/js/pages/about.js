/* About page: Our Team (Management and Experts).
   Data: assets/data/team.js     Look: assets/data/settings.js (section `team`) */
(function(){
'use strict';
var SCC=window.SCC,$=SCC.$,$$=SCC.$$,esc=SCC.esc,ic=SCC.ic,bic=SCC.bic,MARK=SCC.MARK;

SCC.registerPage('about',{init:function(view){
  var T=window.SCC_TEAM||{},cfg=SCC.cfg('team'),FIELDS=T.fields||[],FD=T.fieldDescriptions||{};
  var groups={management:T.management||[],experts:T.experts||[]};
  var root=$('#teamRoot',view),sel=null;
  var fieldsOf=function(m){return [].concat(m.field||[])};

  root.innerHTML=
    '<div class="team-group" id="grp-management"'+(groups.management.length?'':' hidden')+'><div class="grp-h"><p class="eyebrow">Leadership</p><h3 class="grp-t">Management</h3><p class="muted">The people who lead Spectra CC and run the organization day to day.</p></div><div class="team" id="mgmtGrid"></div></div>'+
    '<div class="team-group" id="grp-experts"'+(groups.experts.length?'':' hidden')+'><div class="grp-h"><p class="eyebrow">Expert network</p><h3 class="grp-t">Experts</h3><p class="muted">We match each engagement with qualified specialists. Select a discipline to see who covers it.</p></div>'+
    (cfg.showNetwork?'<div class="net-wrap"><svg class="net" id="net" viewBox="-50 0 620 380" role="group" aria-label="Expert network by discipline"></svg><div><h3>Specialists, mobilized by need</h3><p>Rather than one fixed bench, Spectra CC assembles the right mix of disciplines for each project and hands the know-how over to the client team.</p><div class="filters" id="teamFilters"></div></div></div>':
      (cfg.showFilters?'<div class="filters" id="teamFilters"></div>':''))+
    '<div class="team" id="expGrid"></div><p class="muted" id="expEmpty" hidden>No expert is listed for this discipline yet.</p></div>';
  [['mgmtGrid'],['expGrid']].forEach(function(g){var el=$('#'+g[0],root);el.style.setProperty('--cols',cfg.columns);el.style.setProperty('--phr',cfg.photoRatio);el.style.setProperty('--bio-lines',cfg.bioLines)});

  /* ----- card and profile ----- */
  function card(m,group,i){
    var ph=m.photo?SCC.img(m.photo,'Photo of '+m.name,'cover'):'<div class="imgw ph-logo">'+MARK+'</div>';
    var f=fieldsOf(m),bio=String(m.bio||(group==='experts'?FD[f[0]]:'')||'').replace(/\s*\n+\s*/g,' ');
    return '<article class="card member is-click"><button type="button" class="it-hit" data-m="'+group+':'+i+'" aria-haspopup="dialog" aria-label="View profile: '+esc(m.name)+'"></button>'+
      '<div class="ph">'+ph+'</div><div class="mb"><h3>'+esc(m.name)+'</h3><p class="role">'+esc(m.role)+'</p>'+
      (f.length&&group==='experts'?'<div class="chips">'+f.map(function(x){return '<span class="chip">'+ic('i-network')+esc(x)+'</span>'}).join('')+'</div>':'')+
      (bio?'<p class="bio">'+esc(bio)+'</p>':'')+'<span class="it-more">View profile'+ic('i-chev')+'</span></div></article>'}

  function profile(m,group){
    var f=fieldsOf(m),links=[];
    if(m.email)links.push('<a href="mailto:'+esc(m.email)+'">'+ic('i-mail')+'Email</a>');
    [['linkedin','LinkedIn','linkedin'],['orcid','ORCID','orcid'],['scholar','Google Scholar','googlescholar'],['researchgate','ResearchGate','researchgate']].forEach(function(l){
      if(m[l[0]])links.push('<a href="'+esc(m[l[0]])+'" target="_blank" rel="noopener noreferrer">'+bic(l[2])+l[1]+'</a>')});
    if(m.website)links.push('<a href="'+esc(m.website)+'" target="_blank" rel="noopener noreferrer">'+ic('i-globe')+'Website</a>');
    var list=function(t,a){return a&&a.length?'<h4 class="prof-h">'+t+'</h4><ul class="plist">'+a.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':''};
    var bio=m.bio?SCC.paras(m.bio):(group==='experts'&&FD[f[0]]?'<p>'+esc(FD[f[0]])+'</p>':'');
    return '<div class="prof"><div class="prof-ph">'+(m.photo?SCC.img(m.photo,'Photo of '+m.name,'cover'):'<div class="imgw ph-logo">'+MARK+'</div>')+'</div><div class="prof-tx">'+
      '<h2 id="mTitle">'+esc(m.name)+'</h2><p class="role">'+esc(m.role)+'</p>'+
      (f.length?'<div class="chips">'+f.map(function(x){return '<span class="chip">'+ic('i-network')+esc(x)+'</span>'}).join('')+'</div>':'')+
      '<div class="prof-bio">'+bio+'</div>'+list('Education',m.education)+list('Experience',m.experience)+
      (m.tags&&m.tags.length?'<h4 class="prof-h">Expertise</h4><div class="tags">'+m.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>':'')+
      (links.length?'<div class="prof-links">'+links.join('')+'</div>':'')+'</div></div>'}

  root.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(!b)return;
    var p=b.dataset.m.split(':'),m=groups[p[0]][+p[1]];if(m)SCC.modal.open({html:profile(m,p[0]),cls:'m-prof'})});

  /* ----- experts: network and filters ----- */
  function renderExperts(){
    var list=groups.experts.map(function(m,i){return {m:m,i:i}}).filter(function(x){return !sel||fieldsOf(x.m).indexOf(sel)>-1});
    $('#expGrid',root).innerHTML=list.map(function(x){return card(x.m,'experts',x.i)}).join('');SCC.hydrate(root);
    $('#expEmpty',root).hidden=list.length>0;
    $$('.node',root).forEach(function(g,i){var on=FIELDS[i]===sel;g.classList.toggle('on',on);g.setAttribute('aria-pressed',on?'true':'false')});
    $$('.edge',root).forEach(function(l,i){l.classList.toggle('on',FIELDS[i]===sel)});
    $$('.fbtn',root).forEach(function(b){b.setAttribute('aria-pressed',((b.dataset.f||null)===sel)?'true':'false')})}
  function set(f){sel=(f===sel)?null:f;renderExperts()}

  var net=$('#net',root),fil=$('#teamFilters',root);
  if(net){
    var cx=260,cy=190,rx=170,ry=135,nodes=[],svg='';
    FIELDS.forEach(function(f,i){var a=(-90+i*(360/FIELDS.length))*Math.PI/180;nodes.push({f:f,x:cx+Math.cos(a)*rx,y:cy+Math.sin(a)*ry,c:Math.cos(a)})});
    nodes.forEach(function(n,i){svg+='<line class="edge" x1="'+cx+'" y1="'+cy+'" x2="'+n.x.toFixed(1)+'" y2="'+n.y.toFixed(1)+'"/>'});
    svg+='<circle cx="'+cx+'" cy="'+cy+'" r="46" fill="#17324D"/><svg x="'+(cx-30)+'" y="'+(cy-30)+'" width="60" height="60" viewBox="-210 -210 420 420" fill="none" stroke-width="32" stroke-linecap="round"><path d="M-90.5 -165.9A189 189 0 1 0 163.8 -94.2" stroke="#fff"/><path d="M67.5 -112.3A131 131 0 1 0 112.8 66.7" stroke="#2DB1B7"/><path d="M71 0A71 71 0 1 0 0 71" stroke="#A9C6B2"/><circle r="19" stroke="none" fill="#fff"/></svg>';
    function wrap(t){if(t.length<=13||t.indexOf(' ')<0)return [t];var m=t.length/2,best=-1,d=1e9;for(var k=0;k<t.length;k++)if(t[k]===' '&&Math.abs(k-m)<d){d=Math.abs(k-m);best=k}return [t.slice(0,best),t.slice(best+1)]}
    nodes.forEach(function(n,i){var anchor=n.c>.3?'start':(n.c<-.3?'end':'middle'),tx=n.x+(n.c>.3?26:(n.c<-.3?-26:0)),ln=wrap(n.f),L=ln.length,y0;
      if(Math.abs(n.c)<=.3)y0=n.y<cy?n.y-26-(L-1)*15:n.y+34;else y0=n.y+5-(L-1)*7.5;
      svg+='<g class="node" tabindex="0" role="button" aria-pressed="false" aria-label="'+esc(n.f)+'"><circle cx="'+n.x.toFixed(1)+'" cy="'+n.y.toFixed(1)+'" r="17"/><text y="'+y0.toFixed(1)+'" style="text-anchor:'+anchor+'">'+ln.map(function(l,j){return '<tspan x="'+tx.toFixed(1)+'"'+(j?' dy="15"':'')+'>'+esc(l)+'</tspan>'}).join('')+'</text></g>'});
    net.innerHTML=svg;
    $$('.node',net).forEach(function(g,i){g.addEventListener('click',function(){set(FIELDS[i])});g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();set(FIELDS[i])}})})}
  if(fil&&cfg.showFilters!==false){
    fil.innerHTML='<button class="fbtn" type="button" data-f="" aria-pressed="true">All disciplines</button>'+FIELDS.map(function(f){return '<button class="fbtn" type="button" data-f="'+esc(f)+'" aria-pressed="false">'+esc(f)+'</button>'}).join('');
    $$('.fbtn',fil).forEach(function(b){b.addEventListener('click',function(){sel=b.dataset.f||null;renderExperts()})})}
  else if(fil)fil.hidden=true;

  $('#mgmtGrid',root).innerHTML=groups.management.map(function(m,i){return card(m,'management',i)}).join('');
  renderExperts()}});
})();
