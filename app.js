const $=id=>document.getElementById(id);
const BG={'Particle Type':'#080a12','Scramble Reveal':'#06090c','Orbit Words':'#070810','Spiral Scroll':'#090a10','Alphabet Rain':'#040806','Signal Lost':'#07080b','Breathing Grid':'#0a0c12'};
const bgOf=s=>s.bg||BG[s.name]||'#0a0c12';
// Small canvas helper: sizes itself to its container and keeps a crisp, correctly scaled 2D context.
class Space{constructor(el,md){this.el=el;this.md=md||1;const c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block';
 el.appendChild(c);this.c=c;this.ctx=c.getContext('2d');this.size={x:0,y:0};this.fit();this.ro=new ResizeObserver(()=>this.fit());this.ro.observe(el)}
 fit(){const d=Math.min(window.devicePixelRatio||1,this.md),w=this.el.clientWidth,h=this.el.clientHeight;if(!w||!h)return;
  this.c.width=Math.round(w*d);this.c.height=Math.round(h*d);this.ctx.setTransform(d,0,0,d,0,0);this.size.x=w;this.size.y=h}}
const live=new Set();let ov=null,cs=null;
window.PTR={x:0,y:0,on:false,click:false,down:false,sp:0,dx:0,dy:0,wh:0};window.TX={};
function showErr(el,m){const d=document.createElement('div');d.className='perr';d.textContent=m;el.appendChild(d)}
// o.live = true: the instance listens to the pointer. Otherwise it runs on autopilot (no interaction at all).
function mk(sc,el,o){
 const S=new Space(el,o.live?2:1),F={ctx:S.ctx},tx={};(TEXTS[sc.name]||[]).forEach(f=>tx[f.k]=f.v);
 const p={x:el.clientWidth/2,y:el.clientHeight/2,on:false,click:false,down:false,sp:0,dx:0,dy:0,wh:0};
 const i={sc,S,p,tx,run:true,ready:false,auto:!o.live,lc:-1,f:0,m:sc.make(S,F),el};
 if(o.live){
  const loc=e=>{const r=el.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
  el.addEventListener('pointerenter',e=>{[p.x,p.y]=loc(e);p.on=true});
  el.addEventListener('pointermove',e=>{const[x,y]=loc(e);p.on=true;p.dx+=x-p.x;p.dy+=y-p.y;p.sp=Math.min(60,p.sp+Math.hypot(x-p.x,y-p.y)*.3);p.x=x;p.y=y});
  el.addEventListener('pointerleave',()=>{p.on=false;p.down=false});
  el.addEventListener('pointerdown',e=>{[p.x,p.y]=loc(e);p.on=true;p.click=true;p.down=true});
  addEventListener('pointerup',()=>p.down=false);
  el.addEventListener('wheel',e=>{p.wh+=e.deltaY},{passive:true});
 }
 live.add(i);return i}
function dispose(i){i.run=false;live.delete(i);i.S.ro.disconnect();i.el.innerHTML=''}
// Smoothness: previews pause while the page scrolls, render at about 20fps, and take turns so no frame does all the work.
let scrolling=false,stt,fc=0,uid=0;
addEventListener('scroll',()=>{scrolling=true;clearTimeout(stt);stt=setTimeout(()=>scrolling=false,140)},{passive:true});
requestAnimationFrame(function loop(t){requestAnimationFrame(loop);fc++;
 for(const i of live){if(!i.run||!i.S.size.x)continue;if(ov&&i!==ov)continue;
  if(i.auto){if(document.hidden||(scrolling&&i.shown))continue;if((fc+(i.id||(i.id=++uid)))%3)continue;
   i.p.on=false;i.p.down=false;i.p.sp=6;const k=Math.floor(t/4200);if(k!==i.lc){if(i.lc>=0)i.p.click=true;i.lc=k}}
  window.PTR=i.p;window.TX=i.tx;
  try{if(!i.ready){i.m.init();i.ready=true}i.m.frame(t,16);i.shown=true}catch(e){console.error(i.sc.name,e);i.run=false;showErr(i.el,i.sc.name+': '+e.message)}
  i.p.click=false;if(!i.auto)i.p.sp*=.9;i.p.dx=i.p.dy=i.p.wh=0}});
// The landing hero is pure CSS (smooth on the compositor). Pause its drift when it is off screen.
new IntersectionObserver(([e])=>$('hero').classList.toggle('off',!e.isIntersecting)).observe($('hero'));
// Gallery: signature pieces first, 20 per page, searchable.
SCENES.sort((x,y)=>(y.feat?1:0)-(x.feat?1:0));

const PER=20,gridEl=$('grid');let list=SCENES.slice(),page=0;
const io=new IntersectionObserver(es=>es.forEach(e=>{const n=e.target,i=n._i;
 if(e.isIntersecting){if(!i||!live.has(i)){try{n._i=mk(n._sc,n,{live:false})}catch(err){console.error(n._sc.name,err);showErr(n,n._sc.name+': '+err.message)}}else i.run=true}else if(i)i.run=false}),{rootMargin:'120px'});
const fsIcon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
function code(sc){$('ct').textContent=sc.name+' source';$('cc').textContent=sc.src;$('cm').classList.add('on')}
function buildEd(sc,inst){const box=$('ed'),f=TEXTS[sc.name]||[];box.innerHTML='';box.hidden=!f.length;
 f.forEach(d=>{const l=document.createElement('label'),s=document.createElement('span'),inp=document.createElement('input');s.textContent=d.label;inp.value=inst.tx[d.k];inp.maxLength=d.k==='words'?260:60;inp.autocomplete='off';
  inp.oninput=()=>{inst.tx[d.k]=inp.value};l.append(s,inp);box.append(l)})}
function open(sc){cs=sc;$('on').textContent=sc.name;$('oh').textContent=sc.hint;$('ov').classList.add('on');document.body.style.overflow='hidden';
 $('st').style.background=bgOf(sc);ov=mk(sc,$('st'),{live:true});buildEd(sc,ov);history.replaceState(null,'','#'+encodeURIComponent(sc.name))}
function close(){if(ov){dispose(ov);ov=null}$('ov').classList.remove('on');$('ed').hidden=true;document.body.style.overflow='';history.replaceState(null,'',location.pathname)}
$('x').onclick=close;$('oc').onclick=()=>code(cs);$('cx').onclick=()=>$('cm').classList.remove('on');
$('cp').onclick=async e=>{try{await navigator.clipboard.writeText($('cc').textContent);e.target.textContent='Copied';setTimeout(()=>e.target.textContent='Copy',1400)}catch(_){}};
addEventListener('keydown',e=>{if(e.key==='Escape'){$('cm').classList.contains('on')?$('cm').classList.remove('on'):close()}});
function render(){io.disconnect();[...live].forEach(i=>{if(i.auto)dispose(i)});gridEl.innerHTML='';
 list.slice(page*PER,page*PER+PER).forEach((s,n)=>{const a=document.createElement('article');a.className='card in';
  a.innerHTML=`<div class="pv" style="background:${bgOf(s)}"><button class="fs" aria-label="Full screen">${fsIcon}</button></div><div class="meta"><small></small><h3><i>${String(page*PER+n+1).padStart(2,'0')}</i><span></span></h3><p></p><button class="vc">View code</button></div>`;
  a.querySelector('small').textContent=s.use;a.querySelector('h3 span').textContent=s.name;a.querySelector('p').textContent=s.hint;
  const pv=a.querySelector('.pv');pv._sc=s;a.querySelector('.fs').onclick=()=>open(s);a.querySelector('.vc').onclick=()=>code(s);gridEl.appendChild(a)});
 if(!list.length)gridEl.innerHTML='<p class="none">No animations match your search.</p>';
 const pages=Math.ceil(list.length/PER),pg=$('pager');pg.innerHTML='';
 if(pages>1){const b=(l,p,on,dis)=>{const x=document.createElement('button');x.textContent=l;x.className=on?'on':'';x.disabled=!!dis;x.onclick=()=>{page=p;render();$('gallery').scrollIntoView()};pg.appendChild(x)};
  b('Prev',page-1,0,page===0);for(let p=0;p<pages;p++)b(p+1,p,p===page);b('Next',page+1,0,page===pages-1)}
 if(fontsReady)document.querySelectorAll('.pv').forEach(p=>io.observe(p))}
let fontsReady=false,tm;
$('q').oninput=e=>{clearTimeout(tm);tm=setTimeout(()=>{const w=e.target.value.toLowerCase().split(/\s+/).filter(Boolean);list=SCENES.filter(s=>w.every(x=>(s.name+' '+s.use+' '+s.hint).toLowerCase().includes(x)));page=0;render();if(w.length)$('gallery').scrollIntoView()},180)};
render();
const fonts=Promise.race([Promise.all(['800 40px Syne','600 40px Fraunces','400 16px "JetBrains Mono"','700 16px "JetBrains Mono"','400 40px Anton','700 40px Caveat','700 40px Fredoka'].map(f=>document.fonts.load(f,'PtsJs Animations 0'))),new Promise(r=>setTimeout(r,2500))]).catch(()=>{});
fonts.then(()=>{fontsReady=true;document.querySelectorAll('.pv').forEach(p=>io.observe(p));
 const h=decodeURIComponent(location.hash.slice(1)),s=SCENES.find(x=>x.name===h);if(s)open(s)});
