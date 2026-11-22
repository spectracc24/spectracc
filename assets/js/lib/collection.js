/* ==========================================================================
   Collection renderer: the "design system" for lists of content.
   Publications, projects and case studies all use this. How a list looks is
   decided by the settings in assets/data/settings.js, not by code.

   SCC.collection(host, items, cfg, opts) draws filters, search, the list, "Show more"
   and the details window. Items must be in the normalized shape below
   (each page module converts its data file into it).

   Normalized item:
     id, kicker, title, meta:[...], summary, tags:[...],
     media:{ image, alt, feature }, files:[{label,url,format,size}], link:{url,label},
     status ('soon'), featured, sample, filterKey, searchText, sortDate,
     detail(item) -> HTML for the opened window   (null = no window)
     story(item)  -> HTML for the 'story' layout body
   ========================================================================== */
(function(){
'use strict';
var SCC=window.SCC,$=SCC.$,$$=SCC.$$,esc=SCC.esc,ic=SCC.ic;
var DEFAULTS={layout:'grid',columns:3,media:'auto',placeholder:'generated',mediaRatio:'16/10',mediaFit:'cover',
  show:['kicker','title','meta','summary','tags','files','actions'],summaryLines:3,filters:true,search:true,sort:'manual',pageSize:0,detail:'modal',sampleNote:''};
var KINDS=['lc','carbon','grid'];
function hash(s){var h=7;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}

function filesHtml(it,cls){
  if(!it.files||!it.files.length)return '';
  return '<div class="it-files '+(cls||'')+'">'+it.files.map(function(f){
    var meta=[f.format,f.size].filter(Boolean).join(' · '),label=esc(f.label||'Download');
    if(!f.url||it.status==='soon')return '<span class="dl is-off" aria-disabled="true">'+ic('i-download')+'<span>'+label+'</span><small>Coming soon</small></span>';
    var ext=/^https?:/i.test(f.url);
    return '<a class="dl" href="'+esc(f.url)+'"'+(ext?' target="_blank" rel="noopener noreferrer"':' download')+'>'+ic('i-download')+'<span>'+label+'</span>'+(meta?'<small>'+esc(meta)+'</small>':'')+'</a>'}).join('')+'</div>'}

function badges(it,kickerOn){
  var h='';
  if(kickerOn&&it.kicker)h+='<span class="chip">'+esc(it.kicker)+'</span>';
  if(it.sample)h+='<span class="chip ghost">Sample entry</span>';
  if(it.status==='soon')h+='<span class="soon-b">Coming soon</span>';
  return h?'<div class="chips">'+h+'</div>':''}

function linkBtn(it){
  if(!it.link||!it.link.url||it.status==='soon')return '';
  return '<a class="it-link" href="'+esc(it.link.url)+'" target="_blank" rel="noopener noreferrer">'+esc(it.link.label||'Open link')+ic('i-external')+'</a>'}

SCC.collection=function(host,items,userCfg,opts){
  var cfg={},k;for(k in DEFAULTS)cfg[k]=DEFAULTS[k];for(k in (userCfg||{}))cfg[k]=userCfg[k];
  opts=opts||{};var noun=opts.noun||'items';
  var story=cfg.layout==='story',compact=cfg.layout==='compact',show=cfg.show||DEFAULTS.show;
  var has=function(b){return show.indexOf(b)>-1};
  var state={f:'All',q:'',n:cfg.pageSize>0?cfg.pageSize:1e9};
  var byId={};items.forEach(function(it){byId[it.id]=it});

  /* shell */
  var keys=[];items.forEach(function(it){if(it.filterKey&&keys.indexOf(it.filterKey)<0)keys.push(it.filterKey)});
  var tb='';
  if((cfg.filters&&keys.length>1)||cfg.search){
    tb='<div class="toolbar">'+((cfg.filters&&keys.length>1)?'<div class="filters" style="margin:0" role="group" aria-label="Filter '+esc(noun)+'">'+['All'].concat(keys).map(function(x,i){return '<button class="fbtn" type="button" data-f="'+esc(x)+'" aria-pressed="'+(i===0?'true':'false')+'">'+esc(x)+'</button>'}).join('')+'</div>':'<span></span>')+
      (cfg.search?'<label class="search">'+ic('i-search')+'<input type="search" placeholder="Search '+esc(noun)+'" aria-label="Search '+esc(noun)+'"></label>':'')+'</div>'}
  host.innerHTML=(cfg.sampleNote?'<p class="note">'+esc(cfg.sampleNote)+'</p>':'')+tb+'<div class="col col-'+cfg.layout+'" style="--cols:'+cfg.columns+';--ratio:'+cfg.mediaRatio+';--lines:'+(cfg.summaryLines||0)+'"></div><div class="col-foot"><p class="muted col-count" aria-live="polite"></p><button class="btn btn-o col-more" type="button" hidden>Show more</button></div><div class="col-empty" hidden><p>Nothing matches this filter.</p><button class="btn btn-o" type="button">Clear filters</button></div>';
  var list=$('.col',host),count=$('.col-count',host),more=$('.col-more',host),empty=$('.col-empty',host),search=$('.search input',host);

  function mediaHtml(it,lead){
    if(compact||cfg.media==='none')return '';
    var m=it.media||{},img=(cfg.media==='image'||cfg.media==='auto')&&m.image,feat=(cfg.media==='feature'||cfg.media==='auto')&&m.feature&&!img,h='';
    if(img)h=SCC.img(m.image,m.alt||it.title,cfg.mediaFit);
    else if(feat)h=SCC.figures.html(m.feature,{full:story||lead});
    else if(cfg.placeholder==='logo')h='<div class="imgw ph-logo">'+SCC.MARK+'</div>';
    else if(cfg.placeholder==='generated'){var hs=hash(it.id);h=SCC.figures.html({kind:KINDS[hs%3],seed:hs%40+1},{full:story})}
    else return '';
    return h}

  function itemHtml(it,i,lead){
    var med=mediaHtml(it,lead),opens=cfg.detail==='modal'&&it.detail&&it.status!=='soon'&&!story,out='';
    var body='',b=badges(it,has('kicker'));
    if(b)body+=b;
    if(has('title'))body+='<'+(story?'h2':'h3')+' class="it-t">'+esc(it.title)+'</'+(story?'h2':'h3')+'>';
    if(has('meta')&&it.meta&&it.meta.length)body+='<p class="it-meta">'+it.meta.map(esc).join(' · ')+'</p>';
    if(story&&it.story)body+='<div class="it-story">'+it.story(it)+'</div>';
    else if(has('summary')&&it.summary)body+='<p class="it-sum">'+esc(it.summary)+'</p>';
    if(has('tags')&&it.tags&&it.tags.length)body+='<div class="tags">'+it.tags.slice(0,story?9:4).map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>';
    if(has('files'))body+=filesHtml(it);
    if(has('actions')){var a=(opens?'<span class="it-more">Details'+ic('i-chev')+'</span>':'')+linkBtn(it);if(a)body+='<div class="it-act">'+a+'</div>'}
    var hit=opens?'<button type="button" class="it-hit" data-open="'+esc(it.id)+'" aria-label="Open details: '+esc(it.title)+'"></button>':'';
    if(story)return '<article class="item story" id="'+esc(it.id)+'"><div class="story-tx">'+body+'</div>'+(med?'<div class="story-media">'+med+'</div>':'')+'</article>';
    return '<article class="item'+(lead?' is-lead':'')+(opens?' is-click':'')+(it.status==='soon'?' is-soon':'')+'" data-id="'+esc(it.id)+'">'+hit+(med?'<div class="item-media">'+med+'</div>':'')+'<div class="item-body">'+body+'</div></article>'}

  function sorted(arr){
    var a=arr.slice(),s=cfg.sort;
    if(s==='date-desc')a.sort(function(x,y){return String(y.sortDate||'').localeCompare(String(x.sortDate||''))});
    else if(s==='date-asc')a.sort(function(x,y){return String(x.sortDate||'').localeCompare(String(y.sortDate||''))});
    else if(s==='title')a.sort(function(x,y){return x.title.localeCompare(y.title)});
    return a}

  function apply(){
    var q=state.q.trim().toLowerCase();
    var all=sorted(items.filter(function(it){return (state.f==='All'||it.filterKey===state.f)&&(!q||(it.searchText||'').indexOf(q)>-1)}));
    var vis=all.slice(0,state.n),html='';
    if(cfg.layout==='featured'&&vis.length){var li=0;for(var j=0;j<vis.length;j++){if(vis[j].featured){li=j;break}}
      var lead=vis[li];html=itemHtml(lead,0,true)+vis.filter(function(_,j){return j!==li}).map(function(it,i){return itemHtml(it,i)}).join('')}
    else html=vis.map(function(it,i){return itemHtml(it,i)}).join('');
    list.innerHTML=html;SCC.hydrate(list);if(SCC.figures)SCC.figures.lazy(list);
    empty.hidden=all.length>0;list.hidden=all.length===0;
    more.hidden=all.length<=vis.length;
    count.textContent=all.length?(cfg.pageSize>0?'Showing '+vis.length+' of '+all.length+' '+noun:all.length+' '+(all.length===1?noun.replace(/s$/,''):noun)):'';
    $$('.fbtn',host).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===state.f?'true':'false')})}

  function openItem(id){var it=byId[id];if(!it)return;
    var m=it.media||{},img=(cfg.media==='image'||cfg.media==='auto')&&m.image,feat=(cfg.media==='feature'||cfg.media==='auto')&&m.feature&&!img,med='';
    if(img)med='<div class="m-media">'+SCC.img(m.image,m.alt||it.title,'cover')+'</div>';else if(feat)med='<div class="m-media">'+SCC.figures.html(m.feature,{full:true})+'</div>';
    var meta=(it.meta&&it.meta.length)?'<p class="it-meta">'+it.meta.map(esc).join(' · ')+'</p>':'';
    var html=med+'<div class="m-pad">'+badges(it,true)+'<h2 id="mTitle">'+esc(it.title)+'</h2>'+meta+'<div class="m-text">'+(it.detail?it.detail(it):'')+'</div>'+
      (it.tags&&it.tags.length?'<div class="tags" style="margin-top:16px">'+it.tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div>':'')+
      filesHtml(it,'big')+(it.link&&it.link.url?'<div class="it-act" style="margin-top:14px">'+linkBtn(it)+'</div>':'')+'</div>';
    SCC.modal.open({html:html,cls:'m-item',onOpen:function(b){if(SCC.figures)SCC.figures.lazy(b)}})}

  host.addEventListener('click',function(e){
    var f=e.target.closest('.fbtn');if(f&&f.dataset.f!=null){state.f=f.dataset.f;state.n=cfg.pageSize>0?cfg.pageSize:1e9;apply();return}
    var o=e.target.closest('[data-open]');if(o){openItem(o.dataset.open);return}
    if(e.target.closest('.col-more')){state.n+=cfg.pageSize;apply();return}
    if(e.target.closest('.col-empty button')){state.f='All';state.q='';if(search)search.value='';apply()}});
  if(search)search.addEventListener('input',function(){state.q=search.value;state.n=cfg.pageSize>0?cfg.pageSize:1e9;apply()});
  apply();
  return {refresh:apply,open:openItem}
};
})();
