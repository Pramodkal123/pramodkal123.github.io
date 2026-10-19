"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[464],{9464:function(e,t,s){
"use strict";
s.d(t,{H:function(){return GemModal}});
var R=s(2265),h=R.createElement,PT=s(4887).createPortal,Cert=s(1247).F;
var CAT={"blue-sapphire":"Blue Sapphire","rubies":"Ruby","semi-precious":"Semi-Precious"};
var CSS=`
.gsx-back{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(6,16,30,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:fadeIn .25s ease-out forwards}
.gsx-dialog{position:relative;display:flex;flex-direction:column;width:100%;max-width:1020px;height:min(92vh,760px);background:#FAF8F5;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);color:#1C1C1C;font-family:"Times New Roman",Times,serif}
.gsx-close{position:absolute;top:14px;right:14px;z-index:30;width:38px;height:38px;border-radius:50%;border:1px solid #E7DEC8;background:#fff;color:#0E3A63;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.18);transition:background .2s,color .2s}
.gsx-close:hover{background:#0E3A63;color:#fff}
.gsx-scroll{flex:1;min-height:0;display:grid;grid-template-columns:1.05fr 1fr;grid-template-rows:minmax(0,1fr);overflow:hidden}.gsx-media{position:relative;min-height:0;overflow:hidden;display:flex;flex-direction:column;background:#0B1B2E;min-height:0}
.gsx-stage{position:relative;flex:1;min-height:320px;overflow:hidden;background:#000}
.gsx-stage img,.gsx-stage video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.gsx-tag{position:absolute;top:14px;left:14px;z-index:5;display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:rgba(0,0,0,.65);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.22);color:#fff;font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700}
.gsx-tag i{width:7px;height:7px;border-radius:50%;background:#34d399;display:inline-block}
.gsx-vctl{position:absolute;right:12px;bottom:12px;z-index:5;display:flex;gap:8px}
.gsx-vbtn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.6);color:#fff;font-size:12px;cursor:pointer}
.gsx-vbtn:hover{background:rgba(0,0,0,.85)}
.gsx-thumbs{display:flex;gap:8px;padding:10px 12px;overflow-x:auto;background:#0B1B2E;border-top:1px solid rgba(255,255,255,.08)}
.gsx-th{flex:0 0 auto;width:56px;height:56px;border-radius:10px;overflow:hidden;padding:0;border:2px solid transparent;background:#1b2e45;cursor:pointer;opacity:.65;transition:all .2s;color:#fff;font-size:15px}
.gsx-th:hover{opacity:1}
.gsx-th.on{opacity:1;border-color:#F0C50B}
.gsx-th img{width:100%;height:100%;object-fit:cover;display:block}
.gsx-info{display:flex;flex-direction:column;min-height:0;min-width:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:34px 34px 28px}
.gsx-info>*{flex-shrink:0}.gsx-grid{overflow:visible!important}.gsx-eyebrow{font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:#CA8A04;font-weight:700;padding-right:44px}
.gsx-title{margin:8px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:30px;line-height:1.15;color:#0E3A63}
.gsx-rule{width:56px;height:2px;margin:14px 0 16px;border-radius:2px;background:#F0C50B}
.gsx-badges{display:flex;flex-wrap:wrap;gap:8px}
.gsx-badge{display:inline-flex;align-items:center;padding:4px 11px;border-radius:999px;border:1px solid #E7DEC8;background:#fff;color:#0E3A63;font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700}
.gsx-badge.ok{background:#ecfdf5;border-color:#a7f3d0;color:#047857}
.gsx-badge.no{background:#111827;border-color:#111827;color:#fff}
.gsx-carat{display:flex;align-items:baseline;gap:6px;margin:18px 0 4px}
.gsx-carat b{font-weight:400;font-size:46px;line-height:1;color:#1C1C1C}
.gsx-carat span{font-size:20px;color:#6b7280}
.gsx-lbl{display:block;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#9ca3af;font-weight:700}
.gsx-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;margin-top:18px;background:#E7DEC8;border:1px solid #E7DEC8;border-radius:14px;overflow:visible}.gsx-cell:first-child{border-top-left-radius:13px}.gsx-cell:nth-child(2){border-top-right-radius:13px}
.gsx-cell{background:#fff;padding:11px 14px;min-width:0}
.gsx-cell.wide{grid-column:1/-1}
.gsx-cell strong{display:block;margin-top:3px;font-size:14.5px;color:#1C1C1C;font-weight:700;overflow-wrap:anywhere}
.gsx-desc{margin:20px 0 0;font-size:14.5px;line-height:1.7;color:#4b5563}
.gsx-cta{margin-top:auto;padding-top:24px;display:flex;flex-direction:column;gap:10px}
.gsx-primary,.gsx-secondary{width:100%;padding:15px 18px;border-radius:999px;font-family:inherit;font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:all .2s}
.gsx-primary{border:1px solid #0E3A63;background:#0E3A63;color:#fff;box-shadow:0 8px 20px rgba(14,58,99,.28)}
.gsx-primary:hover{background:#165A91;border-color:#165A91}
.gsx-secondary{border:1.5px solid #CA8A04;background:transparent;color:#92620a}
.gsx-secondary:hover{background:#F0C50B;border-color:#F0C50B;color:#0E3A63}
.gsx-note{text-align:center;font-size:11.5px;color:#9ca3af;margin:2px 0 0}
@media (max-width:820px){
.gsx-back{padding:0;align-items:flex-end}
.gsx-dialog{height:auto;max-height:94vh;border-radius:22px 22px 0 0}.gsx-scroll{display:block;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}.gsx-media{overflow:visible}
.gsx-stage{min-height:0;flex:none;aspect-ratio:1/1;max-height:46vh}
.gsx-info{overflow:visible;padding:24px 20px 30px}
.gsx-title{font-size:25px}
.gsx-carat b{font-size:38px}
}
`;
function GemModal(p){
  var isOpen=p.isOpen,g=p.gemstone,onClose=p.onClose,onInquire=p.onInquire;
  var st1=R.useState(""),img=st1[0],setImg=st1[1];
  var st2=R.useState("image"),mode=st2[0],setMode=st2[1];
  var st3=R.useState(true),playing=st3[0],setPlaying=st3[1];
  var st4=R.useState(true),muted=st4[0],setMuted=st4[1];
  var st5=R.useState(false),certOpen=st5[0],setCertOpen=st5[1];
  var vref=R.useRef(null);
  var hasVideo=!!(g&&g.videoUrl&&String(g.videoUrl).trim()!=="");
  var hasCert=!!(g&&g.certificateUrl&&String(g.certificateUrl).trim()!=="");
  var gid=g&&g.id;
  R.useEffect(function(){
    if(!g)return;
    setImg(g.mainImage||"");
    setMode(hasVideo?"video":"image");
    setPlaying(true);setMuted(true);setCertOpen(false);
  },[gid]);
  /* lock page scroll while open */
  R.useEffect(function(){
    if(!isOpen)return;
    var prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return function(){document.body.style.overflow=prev};
  },[isOpen]);
  /* ESC closes the gemstone popup (the certificate viewer handles its own ESC on top) */
  R.useEffect(function(){
    if(!isOpen||certOpen)return;
    var onKey=function(ev){if(ev.key==="Escape")onClose()};
    window.addEventListener("keydown",onKey);
    return function(){window.removeEventListener("keydown",onKey)};
  },[isOpen,certOpen,onClose]);
  var closeCert=R.useCallback(function(){setCertOpen(false)},[]);
  if(!isOpen||!g)return null;

  var gallery=Array.from(new Set([g.mainImage].concat(g.galleryImages||[]))).filter(Boolean);
  var soldOut=/sold/i.test(g.availability||"");
  var unheated=/^\s*(unheated|no heat|natural)/i.test(g.treatment||"");
  var label=g.name+(g.caratWeight?" ("+g.caratWeight+" ct)":"");
  var origin=g.origin||"Sri Lanka (Ceylon)";
  var cat=CAT[g.category]||"";
  var desc=g.fullDescription||g.shortDescription||("A "+(g.caratWeight||"")+" carat natural Ceylon gemstone, sourced from the esteemed mines of Sri Lanka and showcasing the colour typical of genuine Ceylon stones.");
  function cell(k,v,wide){return v?h("div",{className:"gsx-cell"+(wide?" wide":""),key:k},h("span",{className:"gsx-lbl"},k),h("strong",null,v)):null}

  var media;
  if(hasVideo&&mode==="video"){
    media=h("div",{className:"gsx-stage"},
      h("video",{ref:vref,src:g.videoUrl,poster:g.mainImage||g.videoThumbnail,autoPlay:true,loop:true,muted:muted,playsInline:true,
        onPlay:function(){setPlaying(true)},onPause:function(){setPlaying(false)}}),
      h("span",{className:"gsx-tag"},h("i",null),"360° Live Video"),
      h("div",{className:"gsx-vctl"},
        h("button",{type:"button",className:"gsx-vbtn",title:playing?"Pause":"Play","aria-label":playing?"Pause video":"Play video",onClick:function(){var v=vref.current;if(!v)return;v.paused?v.play():v.pause()}},playing?"⏸":"▶"),
        h("button",{type:"button",className:"gsx-vbtn",title:muted?"Unmute":"Mute","aria-label":muted?"Unmute video":"Mute video",onClick:function(){var v=vref.current;if(!v)return;v.muted=!v.muted;setMuted(v.muted)}},muted?"🔇":"🔊")));
  }else{
    media=h("div",{className:"gsx-stage"},h("img",{src:img||g.mainImage,alt:g.name}));
  }

  var thumbs=(hasVideo||gallery.length>1)?h("div",{className:"gsx-thumbs"},
    hasVideo?h("button",{type:"button",key:"v",className:"gsx-th"+(mode==="video"?" on":""),title:"Video","aria-label":"Show video",onClick:function(){setMode("video")}},"▶"):null,
    gallery.map(function(src,i){return h("button",{type:"button",key:i,className:"gsx-th"+(mode==="image"&&img===src?" on":""),"aria-label":"Show photo "+(i+1),onClick:function(){setImg(src);setMode("image")}},h("img",{src:src,alt:""}))})
  ):null;

  return PT(h(R.Fragment,null,
    h("div",{className:"gsx-back",role:"dialog","aria-modal":"true","aria-label":g.name,onClick:function(ev){if(ev.target===ev.currentTarget)onClose()}},
      h("style",null,CSS),
      h("div",{className:"gsx-dialog"},
        h("button",{type:"button",className:"gsx-close",onClick:onClose,"aria-label":"Close","title":"Close (Esc)",autoFocus:true},"✕"),
        h("div",{className:"gsx-scroll"},h("div",{className:"gsx-media"},media,thumbs),
        h("div",{className:"gsx-info"},
          h("span",{className:"gsx-eyebrow"},(cat?cat+" · ":"")+origin),
          h("h2",{className:"gsx-title"},g.name),
          h("div",{className:"gsx-rule"}),
          h("div",{className:"gsx-badges"},
            g.treatment?h("span",{className:"gsx-badge"+(unheated?" ok":"")},g.treatment):null,
            g.availability?h("span",{className:"gsx-badge"+(soldOut?" no":" ok")},g.availability):null,
            g.certification?h("span",{className:"gsx-badge"},"✓ "+g.certification):null),
          g.caratWeight?h("div",{className:"gsx-carat"},h("b",null,g.caratWeight),h("span",null,"ct")):null,
          h("div",{className:"gsx-grid"},
            cell("Color",g.color),cell("Shape",g.shape||g.cut),cell("Cut",g.cut&&g.cut!==g.shape?g.cut:""),
            cell("Treatment",g.treatment),cell("Origin",origin,true),cell("Certification",g.certification,true)),
          h("p",{className:"gsx-desc"},desc),
          h("div",{className:"gsx-cta"},
            h("button",{type:"button",className:"gsx-primary",onClick:function(){onClose();onInquire&&onInquire(label)}},"Inquire about this gemstone ",h("span",null,"→")),
            hasCert?h("button",{type:"button",className:"gsx-secondary",onClick:function(){setCertOpen(true)}},"View Certificate"):null,
            h("p",{className:"gsx-note"},"We respond within 24 hours"))))) ),
    hasCert?h(Cert,{isOpen:certOpen,certificateUrl:g.certificateUrl,title:label,certificationName:g.certification||"Official Gemological Laboratory Certificate",onClose:closeCert}):null),document.body);
}
},6783:function(e,t,s){s.d(t,{O9:function(){return c},T$:function(){return i},ZD:function(){return l},v1:function(){return o}});var a=s(1364);let r="bluehues_ceylon_site_config_v5",i={heroBannerImage:"/hero-mining.jpg",heroTagline:"CEYLON GEMSTONES \xb7 SRI LANKA",heroTitle:"Blue Hues",heroDescription1:"Sustainable gemstone mining and selling from the heart of Sri Lanka.",heroDescription2:"Preserving heritage, protecting nature, and honouring artisanal craftsmanship.",heroVideos:[{id:"vid-1",label:"01",url:"/videos/hero/gem1.mp4",title:"Ceylon Royal Blue Sapphire"},{id:"vid-2",label:"02",url:"/videos/hero/gem2.mp4",title:"Natural Vivid Ruby"},{id:"vid-3",label:"03",url:"/videos/hero/gem3.mp4",title:"Natural Padparadscha Sapphire"},{id:"vid-4",label:"04",url:"/videos/hero/gem4.mp4",title:"Cornflower Blue Sapphire"}],editorialIntroImage:"/gems/blue_sapphire.jpg",categoryBlueSapphireImage:"/gems/blue_sapphire.jpg",categoryRubiesImage:"/gems/ruby.jpg",categorySemiPreciousImage:"/gems/semi_precious.jpg",aboutBannerImage:"/sustainability.jpg",contactPhone:"+94 72 355 3882",contactEmail:"sales-us@ceybluehues.com",whatsappNumber:"94723553882"},l=()=>{try{let e=localStorage.getItem(r);if(!e)return localStorage.setItem(r,JSON.stringify(i)),i;let t=JSON.parse(e);return{...i,...t||{}}}catch(e){return i}},o=async()=>{let e=Date.now();for(let t of["/api/site-config?_t=".concat(e),"/api/site-config/?_t=".concat(e),"/api/site-config.php?_t=".concat(e)])try{let e=await fetch(t,{method:"GET",headers:{Accept:"application/json","Cache-Control":"no-cache, no-store, must-revalidate, max-age=0",Pragma:"no-cache",Expires:"0"},cache:"no-store"});if(e&&e.ok){let t=await e.text();if(t&&t.startsWith("{")){let e=JSON.parse(t);if(e&&"object"==typeof e){let t={...i,...e};try{localStorage.setItem(r,JSON.stringify(t))}catch(e){}return t}}}}catch(e){}return l()},c=async e=>{let t={...i,...e};try{localStorage.setItem(r,JSON.stringify(t)),a.H.emit("SITE_CONFIG_UPDATED")}catch(e){}let s=!1,l="";for(let e of["/api/site-config","/api/site-config/","/api/site-config.php"])try{let a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","Cache-Control":"no-cache, no-store, must-revalidate"},body:JSON.stringify(t),cache:"no-store"});if(a&&a.ok){let e=await a.json();if(e&&(e.success||e.siteConfig||e.config)){s=!0;break}}else{let e=await a.text().catch(()=>"");l="Server returned HTTP ".concat(a.status,": ").concat(e)}}catch(e){l=e.message||"Network request failed"}return s?(a.H.emit("SITE_CONFIG_UPDATED"),{success:!0}):{success:!1,error:l||"Failed to persist site configuration to server. Local changes preserved."}}}}]);