"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[435],{1247:function(e,t,s){
"use strict";
s.d(t,{F:function(){return CertViewer}});
var R=s(2265),h=R.createElement,PT=s(4887).createPortal;
var CSS=`
.gsc-back{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:10px;background:rgba(6,16,30,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:fadeIn .25s ease-out forwards}
.gsc-panel{position:relative;display:flex;flex-direction:column;width:100%;max-width:1500px;height:96vh;background:#FAF8F5;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.55);font-family:"Times New Roman",Times,serif}
.gsc-head{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 14px 10px 20px;background:#0E3A63;color:#fff;border-bottom:3px solid #F0C50B}
.gsc-eyebrow{display:block;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#F0C50B;font-weight:700}
.gsc-title{margin:2px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:20px;line-height:1.2;color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gsc-sub{margin:2px 0 0;font-size:12px;color:rgba(255,255,255,.7);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gsc-hd-left{min-width:0}
.gsc-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
.gsc-btn{display:inline-flex;align-items:center;justify-content:center;height:34px;min-width:34px;padding:0 12px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;font-size:12px;font-weight:700;letter-spacing:.04em;cursor:pointer;text-decoration:none;transition:background .2s}
.gsc-btn:hover{background:rgba(255,255,255,.24)}
.gsc-close{width:36px;height:36px;padding:0;font-size:16px;background:#fff;color:#0E3A63;border-color:#fff}
.gsc-close:hover{background:#F0C50B;color:#0E3A63}
.gsc-stage{position:relative;flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background:#E9E3D6;background-image:radial-gradient(#d6cdb8 1px,transparent 1px);background-size:18px 18px;display:flex;padding:10px}
.gsc-paper{margin:auto;background:#fff;padding:6px;border-radius:6px;box-shadow:0 10px 30px rgba(15,23,42,.25);line-height:0;flex:none;box-sizing:border-box;cursor:zoom-in}.gsc-paper.fit{height:100%;width:auto;max-width:100%;display:flex}.gsc-paper.fit img{height:100%;width:auto;max-width:100%;object-fit:contain}.gsc-paper.zoomed{cursor:zoom-out}
.gsc-paper img{display:block}
.gsc-pdf{width:100%;height:100%;min-height:60vh;border:0;background:#fff;border-radius:6px}
.gsc-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 16px;background:#fff;border-top:1px solid #E7DEC8;font-size:12px;color:#64748b}
.gsc-ok{display:inline-flex;align-items:center;gap:7px;color:#166534;font-weight:700}
.gsc-ok i{width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block}
.gsc-zoom{display:inline-flex;align-items:center;gap:6px}
.gsc-zbtn{width:30px;height:30px;border-radius:8px;border:1px solid #E7DEC8;background:#FAF8F5;color:#0E3A63;font-size:15px;font-weight:700;cursor:pointer}
.gsc-zbtn:hover{background:#0E3A63;color:#fff}
.gsc-zval{min-width:44px;text-align:center;font-weight:700;color:#0E3A63}
.gsc-hint{display:inline}
@media (max-width:640px){
.gsc-back{padding:0}
.gsc-panel{height:100%;max-height:100%;border-radius:0}.gsc-ok span{display:none}
.gsc-head{padding:12px 14px}
.gsc-title{font-size:16px}
.gsc-stage{padding:6px}
.gsc-hint{display:none}
.gsc-open-txt{display:none}
}
`;
function CertViewer(p){
  var isOpen=p.isOpen,url=p.certificateUrl,title=p.title,name=p.certificationName,onClose=p.onClose;
  var zs=R.useState(100),zoom=zs[0],setZoom=zs[1];
  R.useEffect(function(){
    if(!isOpen)return;
    setZoom(100);
    var onKey=function(ev){if(ev.key==="Escape"){ev.preventDefault();onClose()}};
    window.addEventListener("keydown",onKey);
    return function(){window.removeEventListener("keydown",onKey)};
  },[isOpen,onClose]);
  if(!isOpen||!url)return null;
  var isPdf=/\.pdf($|\?|#)/i.test(url)||url.toLowerCase().indexOf(".pdf")>-1;
  return PT(h("div",{className:"gsc-back",role:"dialog","aria-modal":"true","aria-label":"Gemstone certificate",
      onClick:function(ev){if(ev.target===ev.currentTarget)onClose()}},
    h("style",null,CSS),
    h("div",{className:"gsc-panel"},
      h("div",{className:"gsc-head"},
        h("div",{className:"gsc-hd-left"},
          h("span",{className:"gsc-eyebrow"},isPdf?"Gemological Certificate · PDF":"Gemological Certificate"),
          h("h3",{className:"gsc-title"},name||"Official Gemological Laboratory Certificate"),
          title?h("p",{className:"gsc-sub"},title):null),
        h("div",{className:"gsc-actions"},
          h("a",{className:"gsc-btn",href:url,target:"_blank",rel:"noopener noreferrer",title:"Open in a new tab"},
            h("span",{className:"gsc-open-txt"},isPdf?"Open PDF":"Open full size"),h("span",{style:{marginLeft:6}},"↗")),
          h("button",{type:"button",className:"gsc-btn gsc-close",onClick:onClose,"aria-label":"Close certificate",title:"Close (Esc)",autoFocus:true},"✕"))),
      h("div",{className:"gsc-stage"},
        isPdf
          ?h("iframe",{className:"gsc-pdf",src:url,title:name||"Gemstone certificate PDF"})
          :h("div",{className:"gsc-paper "+(zoom===100?"fit":"zoomed"),title:"Click to zoom in / out",
              style:zoom===100?null:{width:zoom+"%"},
              onClick:function(){setZoom(function(z){return z===100?200:100})}},
              h("img",{src:url,alt:name||"Gemstone certificate",draggable:false,style:zoom===100?null:{width:"100%",height:"auto"}}))),
      h("div",{className:"gsc-foot"},
        h("span",{className:"gsc-ok"},h("i",null),h("span",null,"Verified gemological laboratory report")),
        isPdf
          ?h("span",{className:"gsc-hint"},"Press Esc to close")
          :h("span",{className:"gsc-zoom"},
              h("button",{type:"button",className:"gsc-zbtn","aria-label":"Zoom out",onClick:function(){setZoom(function(z){return Math.max(100,z-50)})}},"−"),
              h("span",{className:"gsc-zval"},zoom+"%"),
              h("button",{type:"button",className:"gsc-zbtn","aria-label":"Zoom in",onClick:function(){setZoom(function(z){return Math.min(400,z+50)})}},"+"),
              h("button",{type:"button",className:"gsc-zbtn",style:{width:"auto",padding:"0 10px",fontSize:12},onClick:function(){setZoom(100)}},"Reset"),
              h("span",{className:"gsc-hint",style:{marginLeft:10}},"Esc to close"))))),document.body);
}
},6043:function(e,t,s){s.d(t,{u:function(){return i}});var a=s(7437),r=s(2265),l=s(7648),n=s(349);let i=e=>{let{gemstone:t,onSelect:s}=e,[i,o]=(0,r.useState)(!1),c=(0,r.useRef)(null),d=(0,n.B2)(t),x=(0,n.ar)(t),u=!!(t.videoUrl&&""!==t.videoUrl.trim()),m="video"===t.featuredMediaType||!t.mainImage&&u,p=t.shortDescription||(t.certification?"".concat(t.certification," natural Ceylon ").concat(t.name.toLowerCase()," expertly calibrated for fine bespoke jewelry pieces."):"Natural Ceylon ".concat(t.name.toLowerCase()," displaying exceptional luster and clarity sourced directly from Sri Lanka."));return(0,a.jsxs)(l.default,{href:"/gemstones/".concat(t.slug),onClick:e=>{s&&(e.preventDefault(),e.stopPropagation(),s(t))},onMouseEnter:()=>{o(!0),c.current&&u&&c.current.play().catch(()=>{})},onMouseLeave:()=>{o(!1),c.current&&u&&!m&&c.current.pause()},className:"bg-white border border-gray-200/80 hover:border-[#165A91]/40 shadow-2xs hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col justify-between group overflow-hidden cursor-pointer relative ".concat(d?"":"opacity-90"),children:[(0,a.jsxs)("div",{className:"relative aspect-square w-full overflow-hidden bg-slate-950",children:[m&&u?(0,a.jsx)("video",{ref:c,src:t.videoUrl,poster:t.mainImage||t.videoThumbnail,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,className:"h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("img",{src:t.mainImage||"/gems/blue_sapphire.jpg",alt:t.name,loading:"lazy",decoding:"async",className:"h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ".concat(i&&u?"opacity-0":"opacity-100")}),u&&(0,a.jsx)("video",{ref:c,src:t.videoUrl,muted:!0,loop:!0,playsInline:!0,className:"absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ".concat(i?"opacity-100":"opacity-0 pointer-events-none")})]}),u&&(0,a.jsxs)("div",{className:"absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-sans font-semibold flex items-center space-x-1.5 border border-white/20 z-10",children:[(0,a.jsx)("span",{className:"text-[#FBBF24] text-[10px]",children:"▶"}),(0,a.jsx)("span",{children:"360\xb0 VIDEO"})]}),(0,a.jsx)("div",{className:"absolute top-3 right-3 flex flex-col items-end space-y-1 z-10",children:d?x?(0,a.jsx)("div",{className:"bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-sans font-semibold border border-emerald-500/30",children:"Natural Unheated"}):null:(0,a.jsx)("div",{className:"bg-black/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-sans font-medium border border-white/10",children:"Sold Out"})})]}),(0,a.jsxs)("div",{className:"p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("h3",{className:"font-playfair text-[15.5px] sm:text-[17px] md:text-[18px] text-[#0F172A] font-normal leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-[#165A91] transition-colors",children:[t.name," ",t.caratWeight?"".concat(t.caratWeight," Ct"):""]}),(0,a.jsx)("p",{className:"text-[12px] sm:text-[13px] text-slate-600 font-normal leading-relaxed line-clamp-2 min-h-[2.4rem] font-times",children:p})]}),(0,a.jsxs)("div",{className:"pt-1 flex items-center justify-between border-t border-slate-100",children:[(0,a.jsx)("span",{className:"inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-[#CA8A04] group-hover:text-[#EAB308] font-bold no-underline transition-colors font-serif pt-1",children:"VIEW GEMSTONE →"}),t.shape&&(0,a.jsx)("span",{className:"text-[11px] text-slate-400 font-sans uppercase tracking-wider pt-1",children:t.shape})]})]})]})}},3788:function(e,t,s){
"use strict";
s.d(t,{I:function(){return InquiryModal}});
var R=s(2265),h=R.createElement,PT=s(4887).createPortal,API=s(577);
var CSS=`
.gsq-back{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(6,16,30,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:fadeIn .25s ease-out forwards}
.gsq-dialog{position:relative;display:flex;flex-direction:column;width:100%;max-width:1020px;height:min(92vh,760px);background:#FAF8F5;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);color:#1C1C1C;font-family:"Times New Roman",Times,serif}
.gsq-close{position:absolute;top:14px;right:14px;z-index:30;width:38px;height:38px;border-radius:50%;border:1px solid #E7DEC8;background:#fff;color:#0E3A63;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.18);transition:background .2s,color .2s}
.gsq-close:hover{background:#0E3A63;color:#fff}
.gsq-scroll{flex:1;min-height:0;display:grid;grid-template-columns:1.05fr 1fr;grid-template-rows:minmax(0,1fr);overflow:hidden}
.gsq-aside{position:relative;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;gap:24px;padding:40px 36px;color:#fff;background:#0B1B2E;background-image:radial-gradient(circle at 20% 15%,rgba(22,90,145,.55),transparent 55%),radial-gradient(circle at 85% 90%,rgba(240,197,11,.14),transparent 50%)}
.gsq-aeyebrow{font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:#F0C50B;font-weight:700}
.gsq-atitle{margin:10px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:38px;line-height:1.12;color:#fff}
.gsq-arule{width:56px;height:2px;margin:16px 0 18px;border-radius:2px;background:#F0C50B}
.gsq-alead{margin:0;font-size:15px;line-height:1.7;color:rgba(255,255,255,.78)}
.gsq-gem{display:flex;align-items:center;gap:12px;margin-top:22px;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16)}
.gsq-gem i{flex:none;width:9px;height:9px;border-radius:50%;background:#F0C50B;box-shadow:0 0 0 4px rgba(240,197,11,.18)}
.gsq-gem span{display:block;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:700}
.gsq-gem strong{display:block;margin-top:3px;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:17px;color:#fff;overflow-wrap:anywhere}
.gsq-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}
.gsq-list li{display:flex;align-items:center;gap:11px;font-size:14px;color:rgba(255,255,255,.88)}
.gsq-list li b{flex:none;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(240,197,11,.16);border:1px solid rgba(240,197,11,.5);color:#F0C50B;font-size:11px}
.gsq-info{display:flex;flex-direction:column;min-height:0;min-width:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:34px 34px 28px}
.gsq-info>*{flex-shrink:0}
.gsq-eyebrow{font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:#CA8A04;font-weight:700;padding-right:44px}
.gsq-title{margin:8px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:30px;line-height:1.15;color:#0E3A63}
.gsq-rule{width:56px;height:2px;margin:14px 0 18px;border-radius:2px;background:#F0C50B}
.gsq-form{display:flex;flex-direction:column;gap:14px;flex:1}
.gsq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.gsq-lbl{display:block;margin-bottom:6px;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#9ca3af;font-weight:700}
.gsq-in{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1px solid #E7DEC8;background:#fff;color:#1C1C1C;font-family:inherit;font-size:14.5px;outline:none;transition:border-color .2s,box-shadow .2s}
.gsq-in::placeholder{color:#c4c8cf}
.gsq-in:focus{border-color:#0E3A63;box-shadow:0 0 0 3px rgba(14,58,99,.12)}
textarea.gsq-in{resize:none;line-height:1.6}
.gsq-cta{margin-top:auto;padding-top:10px;display:flex;flex-direction:column;gap:10px}
.gsq-primary{width:100%;padding:15px 18px;border-radius:999px;font-family:inherit;font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:all .2s;border:1px solid #0E3A63;background:#0E3A63;color:#fff;box-shadow:0 8px 20px rgba(14,58,99,.28)}
.gsq-primary:hover{background:#165A91;border-color:#165A91}
.gsq-primary:disabled{opacity:.6;cursor:wait}
.gsq-note{text-align:center;font-size:11.5px;color:#9ca3af;margin:2px 0 0}
.gsq-done{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;padding:30px 10px}
.gsq-done b{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:26px}
.gsq-done h3{margin:6px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:28px;color:#0E3A63}
.gsq-done p{margin:0;max-width:320px;font-size:14.5px;line-height:1.7;color:#4b5563}
@media (max-width:820px){
.gsq-back{padding:0;align-items:flex-end}
.gsq-dialog{height:auto;max-height:94vh;border-radius:22px 22px 0 0}
.gsq-scroll{display:block;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
.gsq-aside{overflow:visible;padding:28px 20px 24px;gap:0}
.gsq-atitle{font-size:28px;padding-right:44px}
.gsq-alead,.gsq-list{display:none}
.gsq-gem{margin-top:6px}
.gsq-info{overflow:visible;padding:24px 20px 30px}
.gsq-eyebrow,.gsq-title,.gsq-rule{display:none}
.gsq-row{grid-template-columns:1fr}
}
`;
function InquiryModal(p){
  var isOpen=p.isOpen,onClose=p.onClose,gem=p.gemstoneName;
  var s1=R.useState(false),done=s1[0],setDone=s1[1];
  var s2=R.useState(false),busy=s2[0],setBusy=s2[1];
  var s3=R.useState({fullName:"",email:"",phone:"",subject:"",message:""}),f=s3[0],setF=s3[1];
  R.useEffect(function(){
    setF(function(o){return Object.assign({},o,gem
      ?{subject:"Inquiry about "+gem,message:"I am interested in learning more about the "+gem+"."}
      :{subject:"General Gemstone Inquiry",message:"I am interested in receiving more details about your gemstone collection."})});
  },[gem,isOpen]);
  R.useEffect(function(){
    if(!isOpen)return;
    var prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    var onKey=function(ev){if(ev.key==="Escape")onClose()};
    window.addEventListener("keydown",onKey);
    return function(){document.body.style.overflow=prev;window.removeEventListener("keydown",onKey)};
  },[isOpen,onClose]);
  if(!isOpen)return null;
  function set(k){return function(ev){var v=ev.target.value;setF(function(o){var n=Object.assign({},o);n[k]=v;return n})}}
  function finish(){setBusy(false);setDone(true);setTimeout(function(){setDone(false);onClose()},3000)}
  function submit(ev){
    ev.preventDefault();
    if(!f.fullName||!f.email)return;
    setBusy(true);
    Promise.resolve().then(function(){return API._5({gemstoneName:gem||"General Gemstone Inquiry",clientName:f.fullName,email:f.email,phone:f.phone||"",contactMethod:"Email",message:(f.subject?"Subject: "+f.subject+"\n\n":"")+f.message})}).then(finish,finish);
  }
  function field(label,key,opts){
    opts=opts||{};
    var props={className:"gsq-in",value:f[key],onChange:set(key),placeholder:opts.ph||"",required:!!opts.req};
    if(opts.area){props.rows=opts.rows||4;}else{props.type=opts.type||"text";}
    return h("div",{key:key},h("label",{className:"gsq-lbl"},label),h(opts.area?"textarea":"input",props));
  }
  var body=done
    ?h("div",{className:"gsq-done"},h("b",null,"✓"),h("h3",null,"Inquiry Received"),h("p",null,"Thank you. We have received your request and will get back to you shortly."))
    :h("form",{className:"gsq-form",onSubmit:submit},
        h("div",{className:"gsq-row"},field("Full Name","fullName",{req:true,ph:"Your full name"}),field("Phone (optional)","phone",{type:"tel",ph:"+94 ..."})),
        field("Email Address","email",{type:"email",req:true,ph:"you@example.com"}),
        field("Subject","subject",{ph:"Inquiry subject"}),
        field("Message","message",{area:true,req:true,rows:4,ph:"Your inquiry message..."}),
        h("div",{className:"gsq-cta"},
          h("button",{type:"submit",className:"gsq-primary",disabled:busy},busy?"Sending message…":"Send message ",busy?null:h("span",null,"→")),
          h("p",{className:"gsq-note"},"🔒 All inquiries are confidential · We respond within 24 hours")));
  return PT(h("div",{className:"gsq-back",role:"dialog","aria-modal":"true","aria-label":"Send us a message",onClick:function(ev){if(ev.target===ev.currentTarget)onClose()}},
    h("style",null,CSS),
    h("div",{className:"gsq-dialog"},
      h("button",{type:"button",className:"gsq-close",onClick:onClose,"aria-label":"Close",title:"Close (Esc)"},"✕"),
      h("div",{className:"gsq-scroll"},
        h("div",{className:"gsq-aside"},
          h("div",null,
            h("span",{className:"gsq-aeyebrow"},"Private Inquiry · Blue Hues"),
            h("h2",{className:"gsq-atitle"},"Send us a Message"),
            h("div",{className:"gsq-arule"}),
            h("p",{className:"gsq-alead"},"Tell us what you are looking for and our gemologists will reply personally with details, videos and certification."),
            gem?h("div",{className:"gsq-gem"},h("i",null),h("div",null,h("span",null,"Inquiring about"),h("strong",null,gem))):null),
          h("ul",{className:"gsq-list"},
            h("li",null,h("b",null,"✓"),"Response within 24 hours"),
            h("li",null,h("b",null,"✓"),"Natural, certified Ceylon gemstones"),
            h("li",null,h("b",null,"✓"),"Insured worldwide delivery"))),
        h("div",{className:"gsq-info"},
          h("span",{className:"gsq-eyebrow"},"Contact · Sri Lanka (Ceylon)"),
          h("h3",{className:"gsq-title"},"Your Details"),
          h("div",{className:"gsq-rule"}),
          body)))),document.body);
}
},3280:function(e,t,s){
"use strict";
s.d(t,{K:function(){return VideoModal}});
var R=s(2265),h=R.createElement,PT=s(4887).createPortal;
var CSS=`
.gsv-back{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(6,16,30,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:fadeIn .25s ease-out forwards}
.gsv-dialog{position:relative;display:flex;flex-direction:column;width:100%;max-width:1020px;max-height:92vh;background:#FAF8F5;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);color:#1C1C1C;font-family:"Times New Roman",Times,serif}
.gsv-close{position:absolute;top:14px;right:14px;z-index:30;width:38px;height:38px;border-radius:50%;border:1px solid #E7DEC8;background:#fff;color:#0E3A63;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.18);transition:background .2s,color .2s}
.gsv-close:hover{background:#0E3A63;color:#fff}
.gsv-head{padding:24px 70px 16px 30px}
.gsv-eyebrow{font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:#CA8A04;font-weight:700}
.gsv-title{margin:6px 0 0;font-family:"Playfair Display",Georgia,serif;font-style:italic;font-weight:400;font-size:28px;line-height:1.15;color:#0E3A63}
.gsv-rule{width:56px;height:2px;margin:12px 0 0;border-radius:2px;background:#F0C50B}
.gsv-stage{position:relative;margin:0 20px;flex:1;min-height:0;border-radius:16px;overflow:hidden;background:#000;aspect-ratio:16/9;max-height:calc(92vh - 170px)}
.gsv-stage video,.gsv-stage iframe{position:absolute;inset:0;width:100%;height:100%;border:0;object-fit:contain;background:#000}
.gsv-tag{position:absolute;top:14px;left:14px;z-index:5;display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:rgba(0,0,0,.65);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.22);color:#fff;font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;pointer-events:none}
.gsv-tag i{width:7px;height:7px;border-radius:50%;background:#34d399;display:inline-block}
.gsv-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 30px 20px;font-size:12px;color:#9ca3af}
.gsv-foot b{color:#047857;font-weight:700;display:inline-flex;align-items:center;gap:7px}
.gsv-foot b i{width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block}
@media (max-width:820px){
.gsv-back{padding:0;align-items:flex-end}
.gsv-dialog{max-height:94vh;border-radius:22px 22px 0 0}
.gsv-head{padding:22px 64px 14px 20px}
.gsv-title{font-size:24px}
.gsv-stage{margin:0 12px}
.gsv-foot{padding:12px 20px 22px}
.gsv-hint{display:none}
}
`;
function VideoModal(p){
  var isOpen=p.isOpen,url=p.videoUrl,onClose=p.onClose;
  R.useEffect(function(){
    if(!isOpen)return;
    var prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    var onKey=function(ev){if(ev.key==="Escape")onClose()};
    window.addEventListener("keydown",onKey);
    return function(){document.body.style.overflow=prev;window.removeEventListener("keydown",onKey)};
  },[isOpen,onClose]);
  if(!isOpen||!url)return null;
  var ext=/youtube\.com|youtu\.be|vimeo\.com/i.test(url);
  return PT(h("div",{className:"gsv-back",role:"dialog","aria-modal":"true","aria-label":"Gemstone video",onClick:function(ev){if(ev.target===ev.currentTarget)onClose()}},
    h("style",null,CSS),
    h("div",{className:"gsv-dialog"},
      h("button",{type:"button",className:"gsv-close",onClick:onClose,"aria-label":"Close",title:"Close (Esc)",autoFocus:true},"✕"),
      h("div",{className:"gsv-head"},
        h("span",{className:"gsv-eyebrow"},"Gemstone Showcase · Sri Lanka (Ceylon)"),
        h("h2",{className:"gsv-title"},"360° Live Video"),
        h("div",{className:"gsv-rule"})),
      h("div",{className:"gsv-stage"},
        ext?h("iframe",{src:url,allow:"autoplay; encrypted-media",allowFullScreen:true,title:"Gemstone Video Showcase"})
           :h("video",{src:url,controls:true,autoPlay:true,muted:true,loop:true,playsInline:true}),
        ext?null:h("span",{className:"gsv-tag"},h("i",null),"360° Live Video")),
      h("div",{className:"gsv-foot"},
        h("b",null,h("i",null),"Blue Hues · Natural Ceylon Gemstones"),
        h("span",{className:"gsv-hint"},"Press Esc to close")))),document.body);
}
}}]);