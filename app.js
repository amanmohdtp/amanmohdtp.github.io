const $=id=>document.getElementById(id);
const BG={'Particle Type':'#080a12','Scramble Reveal':'#06090c','Orbit Words':'#070810','Spiral Scroll':'#090a10','Alphabet Rain':'#040806','Signal Lost':'#07080b','Breathing Grid':'#0a0c12'};
const bgOf=s=>s.bg||BG[s.name]||'#0a0c12';
// Small canvas helper: sizes itself to its container and keeps a crisp, correctly scaled 2D context.
class Space{constructor(el){this.el=el;const c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block';
 el.appendChild(c);this.c=c;this.ctx=c.getContext('2d');this.size={x:0,y:0};this.fit();this.ro=new ResizeObserver(()=>this.fit());this.ro.observe(el)}
 fit(){const d=Math.min(window.devicePixelRatio||1,2),w=this.el.clientWidth,h=this.el.clientHeight;if(!w||!h)return;
  this.c.width=Math.round(w*d);this.c.height=Math.round(h*d);this.ctx.setTransform(d,0,0,d,0,0);this.size.x=w;this.size.y=h}}
const live=new Set();let ov=null,cs=null;
window.PTR={x:0,y:0,on:false,click:false,down:false,sp:0,dx:0,dy:0,wh:0};window.TX={};
function showErr(el,m){const d=document.createElement('div');d.className='perr';d.textContent=m;el.appendChild(d)}
// o.live = true: the instance listens to the pointer. Otherwise it runs on autopilot (no interaction at all).
function mk(sc,el,o){
 const S=new Space(el),F={ctx:S.ctx},tx={};(TEXTS[sc.name]||[]).forEach(f=>tx[f.k]=f.v);
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
requestAnimationFrame(function loop(t){requestAnimationFrame(loop);
 for(const i of live){if(!i.run||!i.S.size.x)continue;if(ov&&i!==ov)continue;
  if(i.auto){if((i.f=i.f+1)%2)continue;i.p.on=false;i.p.down=false;i.p.sp=6;const k=Math.floor(t/4200);if(k!==i.lc){if(i.lc>=0)i.p.click=true;i.lc=k}}
  window.PTR=i.p;window.TX=i.tx;
  try{if(!i.ready){i.m.init();i.ready=true}i.m.frame(t,16)}catch(e){console.error(i.sc.name,e);i.run=false;showErr(i.el,i.sc.name+': '+e.message)}
  i.p.click=false;if(!i.auto)i.p.sp*=.9;i.p.dx=i.p.dy=i.p.wh=0}});
// Landing animation: stacked ink lines rise one after another and bulge into the name. Hover to send ripples through them.
const hero=(S,F)=>{const c=F.ctx;let rows=[],k='',t0=null,xs=4,n=0;
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0;if(t0===null)t0=t;
  if(k!==W+'x'+H){k=W+'x'+H;const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.fillStyle='#000';x.textAlign='center';x.textBaseline='middle';
   const s1=fitS(x,'PtsJs',q=>`800 ${q}px Syne,sans-serif`,W*.86,H*.3),s2=fitS(x,'Animations',q=>`800 ${q}px Syne,sans-serif`,W*.9,H*.21);
   x.font=`800 ${s1}px Syne,sans-serif`;x.fillText('PtsJs',W/2,H*.42);x.font=`800 ${s2}px Syne,sans-serif`;x.fillText('Animations',W/2,H*.42+s1*.62+s2*.28);
   const d=x.getImageData(0,0,W,H).data,step=Math.max(4,Math.round(H/150));xs=W<600?2:3;n=Math.ceil(W/xs)+1;rows=[];
   for(let y=step;y<H;y+=step){const h=new Float32Array(n);for(let i=0;i<n;i++){let a=0;for(let q=-1;q<=1;q++)a+=d[(y*W+Math.min(W-1,Math.max(0,i*xs+q)))*4+3];h[i]=a/765}rows.push({y,h,step})}}
  c.clearRect(0,0,W,H);const e=(t-t0)/1000,amp=rows.length?rows[0].step*1.9:0;c.lineWidth=1.1;
  rows.forEach((r,ri)=>{const u=Math.max(0,Math.min(1,(e-.2-ri/rows.length*1.7)/1.2)),er=1-Math.pow(1-u,3),p=new Path2D();
   for(let i=0;i<n;i++){const x=i*xs,dx=x-PTR.x,dy=r.y-PTR.y,rip=PTR.on?Math.exp(-(dx*dx+dy*dy)/9000)*Math.sin(Math.hypot(dx,dy)*.08-e*6)*8:0;
    const y=r.y-r.h[i]*amp*er+Math.sin(x*.012+e*1.2+ri*.2)*1.6*er+rip;i?p.lineTo(x,y):p.moveTo(x,y)}
   const f=new Path2D(p);f.lineTo(W,H);f.lineTo(0,H);f.closePath();c.fillStyle='#fff';c.fill(f);c.strokeStyle=ri%9===0?'#ff4d2e':'#111';c.stroke(p)})}}};
// Gallery: duplicates are hidden, new pieces come first, 20 per page, searchable.
const DROP=new Set(['Ember Drift','Aurora Veil','Paper Veins','Cobalt Grid','Static Storm','Rose Quartz','Deep Sea','Solar Wind','Vinyl','Sonar','Heartbeat','Ripple Pond','Halo','Ink Rose','Halftone Paper','Ripple Grid','Mint Waves','Compass Field','Ink Lens','Swarm Halo','Comet Tail','Snowflake','Mandala','Harmonic Bloom','Orbital Loom','Hex Tunnel','Triangle Warp','Square Vortex','Truchet Paper','Outline Echo','Blob Orbit','Lissajous Knot']);
(function(){const a=SCENES.slice(0,7),b=SCENES.slice(7,53),n=SCENES.slice(53),o=a.slice();b.forEach((s,j)=>{o.push(s);if(j%2&&n.length)o.push(n.shift())});
 const all=[...o,...n].filter(s=>!DROP.has(s.name));all.sort((x,y)=>(y.feat?1:0)-(x.feat?1:0));SCENES.length=0;SCENES.push(...all)})();
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
 try{mk({name:'hero',make:hero},$('hero'),{live:true})}catch(e){console.error('hero',e)}
 const h=decodeURIComponent(location.hash.slice(1)),s=SCENES.find(x=>x.name===h);if(s)open(s)});
