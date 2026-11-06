const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('[data-site-header]');
const toggle=document.querySelector('[data-nav-toggle]');
const nav=document.querySelector('[data-nav]');
const closeMenu=()=>{nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation');};
toggle?.addEventListener('click',()=>{const open=nav?.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(!!open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const hero=document.querySelector('[data-hero]');const heroTrack=document.querySelector('[data-hero-track]');
let ticking=false;
function updateScroll(){ticking=false;const y=window.scrollY;header?.classList.toggle('is-scrolled',y>70);if(!reduce&&heroTrack&&hero){const span=Math.min(Math.max(y/(heroTrack.offsetHeight*.85),0),1);hero.style.setProperty('--scroll-progress',span.toFixed(4));}}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}},{passive:true});updateScroll();
if(!reduce&&hero&&window.matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width-.5)*10+'px');hero.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height-.5)*10+'px');});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--pointer-x','0px');hero.style.setProperty('--pointer-y','0px');});}
if(!reduce&&'IntersectionObserver'in window){document.documentElement.classList.add('has-reveal');const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}},{threshold:.12,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));}else{document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('is-visible'));}
if(!reduce&&window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('[data-spotlight]').forEach(card=>{let frame=false;card.addEventListener('pointermove',e=>{if(frame)return;frame=true;requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',(e.clientX-r.left)+'px');card.style.setProperty('--mouse-y',(e.clientY-r.top)+'px');frame=false;});});});}
