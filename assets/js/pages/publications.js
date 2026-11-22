/* Publications page.
   Data: assets/data/publications.js     Look: assets/data/settings.js (section `publications`) */
(function(){
'use strict';
var SCC=window.SCC,$=SCC.$,esc=SCC.esc;

SCC.registerPage('publications',{init:function(view){
  var items=(window.SCC_PUBLICATIONS||[]).map(function(p){
    return {id:'pub-'+p.id,kicker:p.type,title:p.title,meta:[SCC.fmtDate(p.date),p.authors].filter(Boolean),summary:p.summary,tags:p.tags,
      media:{image:p.image,alt:p.title,feature:p.feature},files:p.files,link:p.link,status:p.status,sample:p.sample,featured:p.featured,
      filterKey:p.type,sortDate:p.date||'',
      searchText:[p.title,p.type,p.authors,p.summary,(p.tags||[]).join(' ')].filter(Boolean).join(' ').toLowerCase(),
      detail:function(){
        var h=SCC.paras(p.body||p.summary);
        if(p.citation)h+='<div class="cite"><small>Cite as</small><p>'+esc(p.citation)+'</p></div>';
        return h}}});
  SCC.collection($('#pubRoot',view),items,SCC.cfg('publications'),{noun:'publications'})}});
})();
