/* Interactive map page (Leaflet, bundled in assets/vendor/leaflet/).
   Data: assets/data/map.js. Tools below are matched to the tool ids listed there. */
(function(){
'use strict';
var SCC=window.SCC,$=SCC.$,$$=SCC.$$,esc=SCC.esc,ic=SCC.ic;

/* ---------- geometry helpers (spherical earth, R = 6378137 m) ---------- */
var R=6378137,RAD=Math.PI/180;
function ringArea(pts){var n=pts.length;if(n<3)return 0;var a=0;for(var i=0;i<n;i++){var p=pts[i],q=pts[(i+1)%n];a+=(q.lng-p.lng)*RAD*(2+Math.sin(p.lat*RAD)+Math.sin(q.lat*RAD))}return Math.abs(a*R*R/2)}
function ringLen(pts,closed,map){var d=0;for(var i=1;i<pts.length;i++)d+=map.distance(pts[i-1],pts[i]);if(closed&&pts.length>2)d+=map.distance(pts[pts.length-1],pts[0]);return d}
function fmtLen(m){return m>=1000?(m/1000).toFixed(m>=100000?0:2)+' km':Math.round(m)+' m'}
function fmtArea(m2){var ha=m2/10000;return (ha>=100?Math.round(ha).toLocaleString('en-US'):ha.toFixed(ha>=10?1:2))+' ha ('+(m2/1e6).toFixed(2)+' km²)'}
function dms(v,pos,neg){var h=v>=0?pos:neg,a=Math.abs(v),d=Math.floor(a),m=Math.floor((a-d)*60),s=((a-d)*60-m)*60;return d+'° '+m+'′ '+s.toFixed(1)+'″ '+h}
function ll(c){return L.latLng(c[1],c[0])}
function geomArea(g){var t=g.type,s=0;
  if(t==='Polygon'){g.coordinates.forEach(function(r,i){var a=ringArea(r.map(ll));s+=i?-a:a})}
  else if(t==='MultiPolygon'){g.coordinates.forEach(function(p){p.forEach(function(r,i){var a=ringArea(r.map(ll));s+=i?-a:a})})}
  return s}
function geomLen(g,map){var t=g.type,s=0;
  if(t==='LineString')s=ringLen(g.coordinates.map(ll),false,map);
  else if(t==='MultiLineString')g.coordinates.forEach(function(l){s+=ringLen(l.map(ll),false,map)});
  else if(t==='Polygon')g.coordinates.forEach(function(r){s+=ringLen(r.map(ll),false,map)});
  return s}

SCC.registerPage('map',{init:function(view,ov){
  var M=window.SCC_MAP||{},O=M.options||{},layersCfg=(M.layers||[]),toolsCfg=(M.tools||[]),bases=M.basemaps||[];
  var host=$('#mapRoot',view);
  host.innerHTML=
    '<div class="mapapp" style="--mh:'+(O.height||'min(78vh,720px)')+'"><aside class="map-side" aria-label="Map controls"><div class="mtabs" role="tablist"><button type="button" role="tab" id="tab-layers" aria-controls="pan-layers" aria-selected="true" data-tab="layers">'+ic('i-layers')+'Layers</button><button type="button" role="tab" id="tab-tools" aria-controls="pan-tools" aria-selected="false" data-tab="tools">'+ic('i-ruler')+'Tools</button></div>'+
    '<div class="mpan" id="pan-layers" role="tabpanel" aria-labelledby="tab-layers"></div><div class="mpan" id="pan-tools" role="tabpanel" aria-labelledby="tab-tools" hidden></div></aside>'+
    '<div class="map-main"><div id="mapEl" aria-label="Interactive map"></div>'+
    '<div class="map-legend" id="mapLegend"><button type="button" class="lg-h" aria-expanded="true">'+ic('i-layers')+'<span>Legend</span>'+ic('i-chev','lg-c')+'</button><div class="lg-b" id="lgBody"></div></div>'+
    '<div class="map-bar"><span id="mbCoord">Move the pointer over the map</span><span id="mbZoom"></span></div></div></div>'+
    (O.note?'<p class="note" style="margin-top:16px">'+esc(O.note)+'</p>':'');
  var wrap=$('.map-main',host);
  var ovl=SCC.loader.over(wrap,'Loading map…');
  var map=L.map('mapEl',{center:O.center||[0,110],zoom:O.zoom||8,minZoom:O.minZoom||2,maxZoom:O.maxZoom||18,zoomControl:true,attributionControl:true,worldCopyJump:true});
  L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);

  /* ----- basemaps ----- */
  var bmLayer=null,bmId=null,pending=0;
  function tileStart(){pending++;wrap.classList.add('tiles-busy')}
  function tileEnd(){pending=Math.max(0,pending-1);if(!pending)wrap.classList.remove('tiles-busy')}
  function setBase(id){var b=bases.filter(function(x){return x.id===id})[0]||bases[0];if(!b)return;bmId=b.id;
    if(bmLayer)map.removeLayer(bmLayer);
    bmLayer=L.tileLayer(b.url,{attribution:b.attribution||'',maxZoom:b.maxZoom||18,subdomains:'abc'}).addTo(map);
    bmLayer.on('loading',function(){wrap.classList.add('tiles-busy')});bmLayer.on('load',function(){wrap.classList.remove('tiles-busy')});
    $$('.bm',host).forEach(function(r){r.setAttribute('aria-pressed',r.dataset.bm===bmId?'true':'false')})}

  /* ----- layers ----- */
  var LY={};   /* id -> {cfg, leaflet, geo} */
  var order=[];
  function styleFor(cfg,feat){var s=cfg.style||{},c=null;
    if(cfg.classes&&cfg.classBy&&feat){c=cfg.classes.filter(function(x){return x.value===feat.properties[cfg.classBy]})[0]}
    var o={};for(var k in s)o[k]=s[k];
    if(c){o.fillColor=c.color;if(cfg.type==='line')o.color=c.color}
    return o}
  function popupHtml(cfg,f){var p=f.properties||{},t=p[cfg.popupTitle||'name'],rows=(cfg.popup||[]).filter(function(r){return p[r[0]]!=null&&p[r[0]]!==''});
    var extra=(!rows.length&&!cfg.popup)?Object.keys(p).filter(function(k){return k!==(cfg.popupTitle||'name')}).map(function(k){return [k,k]}):rows;
    return '<div class="pp"><b>'+esc(t!=null?t:cfg.name)+'</b>'+extra.map(function(r){return '<div><span>'+esc(r[1])+'</span> '+esc(p[r[0]])+'</div>'}).join('')+'</div>'}
  function build(cfg,geo){
    var opts={style:function(f){return styleFor(cfg,f)},
      pointToLayer:function(f,latlng){var s=styleFor(cfg,f);return L.circleMarker(latlng,s)},
      onEachFeature:function(f,l){l.bindPopup(popupHtml(cfg,f));
        if(cfg.type==='polygon'||cfg.type==='line'){l.on('mouseover',function(){if(l.setStyle)l.setStyle({weight:(styleFor(cfg,f).weight||2)+1.5})});l.on('mouseout',function(){if(l.setStyle)l.setStyle(styleFor(cfg,f))})}}};
    var g=L.geoJSON(geo,opts);return g}
  function addLayer(cfg,geo){
    var g=build(cfg,geo);LY[cfg.id]={cfg:cfg,leaflet:g,geo:geo,on:cfg.visible!==false};
    if(cfg.opacity!=null&&cfg.type==='polygon')g.setStyle({fillOpacity:cfg.opacity});
    if(LY[cfg.id].on)g.addTo(map);order.push(cfg.id)}
  function loadLayer(cfg){
    if(cfg.status==='soon'||(!cfg.data&&!cfg.url))return Promise.resolve();
    if(cfg.data){addLayer(cfg,cfg.data);return Promise.resolve()}
    return fetch(cfg.url).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){addLayer(cfg,j)}).catch(function(){cfg._failed=true})}

  /* ----- layer panel + legend ----- */
  function sw(cfg,color,kind){var st=cfg.style||{};
    if(kind==='point'||cfg.type==='point')return '<i class="sw pt" style="background:'+(color||st.fillColor||'#17324D')+';border-color:'+(st.color||'#fff')+'"></i>';
    if(cfg.type==='line')return '<i class="sw ln" style="border-top:3px '+(st.dashArray?'dashed':'solid')+' '+(color||st.color||'#17324D')+'"></i>';
    return '<i class="sw" style="background:'+(color||st.fillColor||st.color||'#999')+';border-color:'+(st.color&&!color?st.color:'rgba(0,0,0,.25)')+'"></i>'}
  function legendRows(cfg){
    if(cfg.classes)return cfg.classes.map(function(c){return '<li>'+sw(cfg,c.color)+'<span>'+esc(c.label)+'</span></li>'}).join('');
    return '<li>'+sw(cfg)+'<span>'+esc(cfg.legend||cfg.name)+'</span></li>'}
  function renderLegend(){
    var on=order.filter(function(id){return LY[id].on}),h='';
    on.forEach(function(id){var c=LY[id].cfg;h+='<div class="lg-g"><b>'+esc(c.name)+'</b><ul>'+legendRows(c)+'</ul></div>'});
    $('#lgBody',host).innerHTML=h||'<p class="muted" style="margin:0;font-size:13px">No layer is switched on.</p>'}
  function renderLayerPanel(){
    var groups=[],by={};layersCfg.forEach(function(c){var g=c.group||'Layers';if(!by[g]){by[g]=[];groups.push(g)}by[g].push(c)});
    var h='<div class="pgroup"><h4>Basemap</h4><div class="bms">'+bases.map(function(b){return '<button type="button" class="bm" data-bm="'+esc(b.id)+'" aria-pressed="false">'+esc(b.name)+'</button>'}).join('')+'</div></div>';
    groups.forEach(function(g){h+='<div class="pgroup"><h4>'+esc(g)+'</h4>'+by[g].map(function(c){
      if(c.status==='soon'||c._failed||(!LY[c.id]))return '<div class="lyr is-soon"><span class="lyr-t">'+esc(c.name)+'</span><span class="soon-b sm">'+(c._failed?'Not found':'Soon')+'</span></div>';
      var legendSw=c.classes?'':sw(c);
      return '<div class="lyr" data-l="'+esc(c.id)+'"><label class="lyr-t"><input type="checkbox" data-vis="'+esc(c.id)+'"'+(LY[c.id].on?' checked':'')+'> '+legendSw+'<span>'+esc(c.name)+'</span></label>'+
        '<div class="lyr-ctl"><label class="op">Opacity <input type="range" min="0" max="100" value="'+Math.round((c.opacity!=null?c.opacity:(c.type==='polygon'?((c.style||{}).fillOpacity!=null?c.style.fillOpacity:.6):1))*100)+'" data-op="'+esc(c.id)+'" aria-label="Opacity of '+esc(c.name)+'"></label><button type="button" class="mini" data-zoom="'+esc(c.id)+'" title="Zoom to layer">'+ic('i-target')+'<span class="sr">Zoom to '+esc(c.name)+'</span></button></div>'+
        (c.description?'<small class="lyr-d">'+esc(c.description)+'</small>':'')+'</div>'}).join('')+'</div>'});
    $('#pan-layers',host).innerHTML=h;setBase(bmId||M.defaultBasemap)}

  $('#pan-layers',host).addEventListener('change',function(e){var v=e.target.dataset.vis,o=e.target.dataset.op;
    if(v){var l=LY[v];l.on=e.target.checked;if(l.on)l.leaflet.addTo(map);else map.removeLayer(l.leaflet);renderLegend();refreshStatsSel()}
    if(o){var l2=LY[o],val=e.target.value/100;if(l2.cfg.type==='polygon')l2.leaflet.setStyle({fillOpacity:val});else if(l2.cfg.type==='line')l2.leaflet.setStyle({opacity:val});else l2.leaflet.eachLayer(function(m){m.setStyle({fillOpacity:val,opacity:val})})}});
  $('#pan-layers',host).addEventListener('input',function(e){var o=e.target.dataset.op;if(o){var l2=LY[o],val=e.target.value/100;if(l2.cfg.type==='polygon')l2.leaflet.setStyle({fillOpacity:val});else if(l2.cfg.type==='line')l2.leaflet.setStyle({opacity:val});else l2.leaflet.eachLayer(function(m){m.setStyle({fillOpacity:val,opacity:val})})}});
  $('#pan-layers',host).addEventListener('click',function(e){var b=e.target.closest('[data-bm]'),z=e.target.closest('[data-zoom]');
    if(b)setBase(b.dataset.bm);
    if(z){var l=LY[z.dataset.zoom];if(l){if(!l.on){l.on=true;l.leaflet.addTo(map);renderLegend();var cb=$('[data-vis="'+z.dataset.zoom+'"]',host);if(cb)cb.checked=true}var bd=l.leaflet.getBounds();if(bd.isValid())map.fitBounds(bd,{padding:[30,30]})}}});

  /* legend toggle */
  var lg=$('#mapLegend',host),lgClosed=O.legendOpen===false||window.innerWidth<700;if(lgClosed)lg.classList.add('closed');
  $('.lg-h',lg).setAttribute('aria-expanded',lgClosed?'false':'true');
  $('.lg-h',lg).addEventListener('click',function(){var c=lg.classList.toggle('closed');this.setAttribute('aria-expanded',c?'false':'true')});

  /* tabs */
  function tab(t){$$('.mtabs [role=tab]',host).forEach(function(b){b.setAttribute('aria-selected',b.dataset.tab===t?'true':'false')});$('#pan-layers',host).hidden=t!=='layers';$('#pan-tools',host).hidden=t!=='tools'}
  $('.mtabs',host).addEventListener('click',function(e){var b=e.target.closest('[data-tab]');if(b)tab(b.dataset.tab)});

  /* ===================== TOOLS ===================== */
  var active=null,mode=null,work=L.featureGroup().addTo(map),pts=[],vm=[],drawL=null,outEl=null;
  var out=function(h){if(outEl)outEl.innerHTML=h};
  var vertex=function(p){var m=L.circleMarker(p,{radius:4,color:'#fff',weight:1.5,fillColor:'#C0392B',fillOpacity:1,interactive:false}).addTo(work);vm.push(m);return m};
  function stop(){active=null;map.doubleClickZoom.enable();map.getContainer().classList.remove('is-measuring');$$('.tool',host).forEach(function(b){b.setAttribute('aria-pressed','false')});map.off('click',onClick);map.off('dblclick',onDbl)}
  function clearWork(){work.clearLayers();pts=[];vm=[];drawL=null}
  function activate(id){clearWork();if(active===id){stop();out('');return}stop();map.closePopup();active=id;mode=id;if(id==='distance'||id==='area')map.doubleClickZoom.disable();map.getContainer().classList.add('is-measuring');
    $$('.tool',host).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.tool===id?'true':'false')});
    map.on('click',onClick);if(id==='distance'||id==='area')map.on('dblclick',onDbl);
    var hint={distance:'Click to add points. Double-click to finish.',area:'Click the corners. Double-click to finish.',buffer:'Click the map to place the buffer center.',coords:'Click the map to read the coordinates.'}[id];out('<p class="muted t-hint">'+hint+'</p>')}
  function onDbl(e){if(active==='distance'||active==='area'){L.DomEvent.stop(e);if(pts.length>1){pts.pop();var v=vm.pop();if(v)work.removeLayer(v);if(drawL)work.removeLayer(drawL);drawL=mode==='distance'?L.polyline(pts,{color:'#C0392B',weight:3,dashArray:'6 6'}):L.polygon(pts,{color:'#C0392B',weight:2,fillOpacity:.15});work.addLayer(drawL);finish()}}}
  function finish(){stop();update(true)}
  function update(done){
    if(mode==='distance'){
      var d=ringLen(pts,false,map),segs=[];for(var i=1;i<pts.length;i++)segs.push(map.distance(pts[i-1],pts[i]));
      out('<div class="t-res"><b>'+fmtLen(d)+'</b><span>total length, '+pts.length+' points</span></div>'+(segs.length?'<ol class="t-seg">'+segs.map(function(s){return '<li>'+fmtLen(s)+'</li>'}).join('')+'</ol>':'')+(done?'<p class="muted t-hint">Finished. Press the tool again to start over.</p>':''))}
    else{var a=ringArea(pts),p=ringLen(pts,true,map);
      out('<div class="t-res"><b>'+(pts.length>2?fmtArea(a):'Add at least 3 points')+'</b><span>'+(pts.length>2?'area, perimeter '+fmtLen(p):'')+'</span></div>'+(done?'<p class="muted t-hint">Finished. Press the tool again to start over.</p>':''))}}
  function onClick(e){var p=e.latlng;
    if(active==='distance'||active==='area'){pts.push(p);vertex(p);
      if(drawL)work.removeLayer(drawL);
      drawL=active==='distance'?L.polyline(pts,{color:'#C0392B',weight:3,dashArray:'6 6'}):L.polygon(pts,{color:'#C0392B',weight:2,fillOpacity:.15});work.addLayer(drawL);update(false)}
    else if(active==='buffer'){clearWork();var km=Math.max(0.01,parseFloat($('#bufKm',host).value)||1),r=km*1000;
      L.circle(p,{radius:r,color:'#168C91',weight:2,fillColor:'#168C91',fillOpacity:.15}).addTo(work);vertex(p);
      out('<div class="t-res"><b>'+fmtArea(Math.PI*r*r)+'</b><span>buffer of '+km+' km around '+p.lat.toFixed(5)+', '+p.lng.toFixed(5)+'</span></div>')}
    else if(active==='coords'){clearWork();vertex(p);var txt=p.lat.toFixed(6)+', '+p.lng.toFixed(6);
      out('<div class="t-res"><b>'+txt+'</b><span>'+dms(p.lat,'N','S')+'<br>'+dms(p.lng,'E','W')+'</span></div><button type="button" class="btn btn-o mini-btn" id="cpCoord">'+ic('i-copy')+'Copy</button> <span class="muted" id="cpMsg" aria-live="polite"></span>');
      var b=$('#cpCoord',host);if(b)b.addEventListener('click',function(){SCC.copyText(txt,$('.t-res b',host),$('#cpMsg',host))})}}

  /* statistics */
  function statsFor(id){var l=LY[id];if(!l)return '';var f=(l.geo.features||[]),cfg=l.cfg,h='<div class="t-res"><b>'+esc(cfg.name)+'</b><span>'+f.length+' feature'+(f.length===1?'':'s')+'</span></div>';
    if(cfg.type==='polygon'){var tot=0,by={};f.forEach(function(x){var a=geomArea(x.geometry);tot+=a;if(cfg.classBy){var k=x.properties[cfg.classBy];by[k]=(by[k]||0)+a}});
      h+='<div class="t-kv"><span>Total area</span><b>'+fmtArea(tot)+'</b></div>';
      if(cfg.classBy&&cfg.classes){h+='<table class="t-tbl"><thead><tr><th>Class</th><th>Area (ha)</th><th>Share</th></tr></thead><tbody>'+cfg.classes.map(function(c){var a=by[c.value]||0;return '<tr><td>'+sw(cfg,c.color)+esc(c.label)+'</td><td>'+(a/10000).toFixed(1)+'</td><td>'+(tot?Math.round(a/tot*100):0)+'%</td></tr>'}).join('')+'</tbody></table>'}}
    else if(cfg.type==='line'){var len=0;f.forEach(function(x){len+=geomLen(x.geometry,map)});h+='<div class="t-kv"><span>Total length</span><b>'+fmtLen(len)+'</b></div>'}
    else{var num=null,key=null;f.forEach(function(x){for(var k in x.properties){if(typeof x.properties[k]==='number'){key=k;break}}});
      if(key){var vals=f.map(function(x){return x.properties[key]}).filter(function(v){return typeof v==='number'}),sum=vals.reduce(function(a,b){return a+b},0);
        h+='<div class="t-kv"><span>'+esc(key)+' (mean)</span><b>'+(sum/vals.length).toFixed(1)+'</b></div><div class="t-kv"><span>Min to max</span><b>'+Math.min.apply(null,vals)+' to '+Math.max.apply(null,vals)+'</b></div>'}}
    return h}
  function layerOptions(){return order.map(function(id){return '<option value="'+esc(id)+'">'+esc(LY[id].cfg.name)+'</option>'}).join('')}
  function refreshStatsSel(){var s=$('#toolLayer',host),e=$('#expLayer',host);[s,e].forEach(function(x){if(x){var v=x.value;x.innerHTML=layerOptions();if(v&&LY[v])x.value=v}})}

  function renderTools(){
    var ready=['distance','area','buffer','coords','stats','upload','export'];
    var h='<p class="muted t-intro">Pick a tool, then use the map. Results appear below.</p><div class="tools">'+toolsCfg.map(function(t){
      var on=t.status!=='soon'&&ready.indexOf(t.id)>-1;
      return on?'<button type="button" class="tool" data-tool="'+esc(t.id)+'" aria-pressed="false"><span class="tl">'+esc(t.label)+'</span><small>'+esc(t.desc||'')+'</small></button>':
        '<div class="tool is-soon" aria-disabled="true"><span class="tl">'+esc(t.label)+'</span><small>'+esc(t.desc||'')+'</small><span class="soon-b sm">Soon</span></div>'}).join('')+'</div>'+
      '<div class="t-opts" id="tOpts"></div><div class="t-out" id="tOut" aria-live="polite"></div>'+
      '<button type="button" class="btn btn-o mini-btn" id="tClear">'+ic('i-trash')+'Clear results</button>';
    $('#pan-tools',host).innerHTML=h;outEl=$('#tOut',host);
    $('#pan-tools',host).addEventListener('click',function(e){var b=e.target.closest('.tool[data-tool]');if(b){pick(b.dataset.tool)}
      if(e.target.closest('#tClear')){stop();clearWork();out('');$('#tOpts',host).innerHTML=''}});}
  function pick(id){var opts=$('#tOpts',host);opts.innerHTML='';
    if(id==='distance'||id==='area'||id==='coords'){activate(id)}
    else if(id==='buffer'){opts.innerHTML='<label class="field" style="margin:0 0 8px"><span class="lbl">Radius (km)</span><input id="bufKm" type="number" min="0.01" step="0.1" value="1" class="input"></label>';activate(id)}
    else if(id==='stats'){stop();clearWork();opts.innerHTML='<label class="field" style="margin:0 0 8px"><span class="lbl">Layer</span><select id="toolLayer" class="input">'+layerOptions()+'</select></label>';
      var s=$('#toolLayer',host),run=function(){out(statsFor(s.value))};s.addEventListener('change',run);run();$$('.tool',host).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.tool===id?'true':'false')})}
    else if(id==='export'){stop();clearWork();opts.innerHTML='<label class="field" style="margin:0 0 8px"><span class="lbl">Layer</span><select id="expLayer" class="input">'+layerOptions()+'</select></label><button type="button" class="btn btn-p mini-btn" id="doExp">'+ic('i-download')+'Download GeoJSON</button>';
      $('#doExp',host).addEventListener('click',function(){var id2=$('#expLayer',host).value,l=LY[id2];if(!l)return;var blob=new Blob([JSON.stringify(l.geo)],{type:'application/geo+json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=id2+'.geojson';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500);out('<p class="muted t-hint">Downloaded '+esc(id2)+'.geojson</p>')});
      $$('.tool',host).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.tool===id?'true':'false')})}
    else if(id==='upload'){stop();clearWork();opts.innerHTML='<label class="field" style="margin:0 0 8px"><span class="lbl">GeoJSON file</span><input id="upFile" type="file" accept=".geojson,.json,application/geo+json,application/json" class="input"></label><p class="muted t-hint">The file is read in your browser and is not uploaded anywhere.</p>';
      $('#upFile',host).addEventListener('change',function(ev){var f=ev.target.files[0];if(!f)return;var ld=SCC.loader.over(wrap,'Reading file…'),fr=new FileReader();
        fr.onload=function(){try{var j=JSON.parse(fr.result);if(j.type!=='FeatureCollection'&&j.type!=='Feature'&&!j.coordinates)throw new Error('not geojson');if(j.type==='Feature')j={type:'FeatureCollection',features:[j]};
          var first=(j.features[0]||{}).geometry||{},t=/Polygon/.test(first.type)?'polygon':(/Line/.test(first.type)?'line':'point'),id='up-'+Date.now();
          var cfg={id:id,name:f.name.replace(/\.(geo)?json$/i,''),group:'Your layers',type:t,visible:true,style:t==='point'?{radius:6,color:'#fff',weight:1.5,fillColor:'#7B3FA0',fillOpacity:1}:{color:'#7B3FA0',weight:2,fillColor:'#7B3FA0',fillOpacity:.25},legend:f.name};
          layersCfg.push(cfg);addLayer(cfg,j);renderLayerPanel();renderLegend();refreshStatsSel();var bd=LY[id].leaflet.getBounds();if(bd.isValid())map.fitBounds(bd,{padding:[30,30]});
          out('<div class="t-res"><b>'+esc(cfg.name)+'</b><span>added with '+j.features.length+' features</span></div>')}catch(err){out('<p class="err">This file could not be read as GeoJSON.</p>')}ld.done(0)};
        fr.onerror=function(){ld.done(0);out('<p class="err">This file could not be opened.</p>')};fr.readAsText(f)})}
  }

  /* readout */
  map.on('mousemove',function(e){$('#mbCoord',host).textContent=e.latlng.lat.toFixed(5)+', '+e.latlng.lng.toFixed(5)});
  var zoomTxt=function(){$('#mbZoom',host).textContent='Zoom '+map.getZoom()};map.on('zoomend',zoomTxt);zoomTxt();

  /* ----- start ----- */
  setBase(M.defaultBasemap);
  var P=Promise.all(layersCfg.map(function(c){ovl.label('Loading layers…');return loadLayer(c)})).then(function(){
    renderLayerPanel();renderLegend();renderTools();tab(O.defaultTab||'layers');
    var all=L.featureGroup(order.map(function(id){return LY[id].leaflet})),bd=all.getBounds();
    if(!O.center&&bd.isValid())map.fitBounds(bd,{padding:[30,30]});
    ovl.label('Drawing the map…');return SCC.delay(300)}).then(function(){ovl.done(0)});
  SCC.mapApi={map:map,layers:LY};
  return P
},show:function(){if(SCC.mapApi){var mp=SCC.mapApi.map;mp.invalidateSize();setTimeout(function(){mp.invalidateSize()},150)}}});
})();
