const $=id=>document.getElementById(id);
const TEXT=new Set(['Particle Type','Scramble Reveal','Orbit Words','Spiral Scroll','Alphabet Rain']);
const BG={'Particle Type':'#080a12','Scramble Reveal':'#06090c','Orbit Words':'#070810','Spiral Scroll':'#090a10','Alphabet Rain':'#040806','Signal Lost':'#07080b','Breathing Grid':'#0a0c12'};
const live=new Set();window.PTR={x:0,y:0,on:false,click:false,down:false,sp:0,dx:0,dy:0,wh:0};window.WORD='PTS';
function mk(sc,el,word,full){
 const S=new Pts.CanvasSpace(el).setup({bgcolor:'transparent',resize:true,retina:true}),F=S.getForm();
 const p={x:el.clientWidth/2,y:el.clientHeight/2,on:false,click:false,down:false,sp:0,dx:0,dy:0,wh:0};
 const loc=e=>{const r=el.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
 el.addEventListener('pointerenter',e=>{[p.x,p.y]=loc(e);p.on=true});
 el.addEventListener('pointermove',e=>{const[x,y]=loc(e);p.on=true;p.dx+=x-p.x;p.dy+=y-p.y;p.sp=Math.min(60,p.sp+Math.hypot(x-p.x,y-p.y)*.3);p.x=x;p.y=y});
 el.addEventListener('pointerleave',()=>{p.on=false;p.down=false});
 el.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;[p.x,p.y]=loc(e);p.on=true;p.click=true;p.down=true});
 addEventListener('pointerup',()=>p.down=false);
 if(full)el.addEventListener('wheel',e=>{p.wh+=e.deltaY},{passive:true});
 const i={sc,S,p,word,run:true,ready:false,m:sc.make(S,F),el};live.add(i);return i}
function dispose(i){i.run=false;live.delete(i);i.el.innerHTML=''}
requestAnimationFrame(function loop(t){requestAnimationFrame(loop);
 for(const i of live){if(!i.run||!(i.S.size&&i.S.size.x>0))continue;window.PTR=i.p;window.WORD=i.word;
  try{if(!i.ready){i.m.init();i.ready=true}i.m.frame(t,16)}catch(e){console.error(i.sc.name,e);i.run=false}
  i.p.click=false;i.p.sp*=.9;i.p.dx=i.p.dy=i.p.wh=0}});
// hero landing animation
const hero=(S,F)=>{const c=F.ctx;let P=[],k='',t0=null;
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0;if(t0===null)t0=t;
  if(k!==W+'x'+H){k=W+'x'+H;const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.fillStyle='#000';x.textAlign='center';x.textBaseline='middle';
   x.font=`800 ${Math.min(W*.9/3.3,H*.32)}px Syne,sans-serif`;x.fillText('PtsJs',W/2,H*.40);x.font=`800 ${Math.min(W*.9/6.6,H*.16)}px Syne,sans-serif`;x.fillText('Animations',W/2,H*.64);
   const d=x.getImageData(0,0,W,H).data,st=W<600?4:5,old=P;P=[];
   for(let y=0;y<H;y+=st)for(let xx=0;xx<W;xx+=st)if(d[(y*W+xx)*4+3]>128)P.push({hx:xx,hy:y,x:old.length?xx:R(0,W),y:old.length?y:R(-H*.3,H*1.3),vx:0,vy:0,dl:xx/W*900+R(0,500),a:Math.random()<.08})}
  c.clearRect(0,0,W,H);const e=t-t0,mx=PTR.x,my=PTR.y;
  for(const p of P){if(e>p.dl){p.vx+=(p.hx-p.x)*.05;p.vy+=(p.hy-p.y)*.05;
    if(PTR.on){const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy)||1;if(d<90){const f=(1-d/90)*3;p.vx+=dx/d*f;p.vy+=dy/d*f}}
    p.vx*=.84;p.vy*=.84;p.x+=p.vx;p.y+=p.vy}else{p.x+=Math.sin(t/300+p.hx)*.4;p.y+=Math.cos(t/350+p.hy)*.4}}
  c.fillStyle='#111';for(const p of P)if(!p.a)c.fillRect(p.x,p.y,2.2,2.2);c.fillStyle='#ff4d2e';for(const p of P)if(p.a)c.fillRect(p.x,p.y,2.6,2.6)}}};
// gallery
const gridEl=$('grid'),io=new IntersectionObserver(es=>es.forEach(e=>{const n=e.target,i=n._i;
 if(e.isIntersecting){if(!i||!live.has(i)){try{n._i=mk(n._sc,n,'PTS')}catch(err){console.error(n._sc.name,err);fail('Preview failed: '+err.message)}}else i.run=true}else if(i)i.run=false}),{rootMargin:'120px'});
const fsIcon='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
function code(sc){$('ct').textContent=sc.name+' — source';$('cc').textContent=sc.src;$('cm').classList.add('on')}
let ov=null,cs=null;
function open(sc){cs=sc;$('on').textContent=sc.name;$('oh').textContent=sc.hint;const w=$('w');w.hidden=!TEXT.has(sc.name);$('ov').classList.add('on');document.body.style.overflow='hidden';
 $('st').style.background=sc.bg||BG[sc.name]||'#0a0c12';ov=mk(sc,$('st'),(w.value.trim()||'PTS').toUpperCase(),true);history.replaceState(null,'','#'+encodeURIComponent(sc.name))}
function close(){if(ov){dispose(ov);ov=null}$('ov').classList.remove('on');document.body.style.overflow='';history.replaceState(null,'',location.pathname)}
$('x').onclick=close;$('oc').onclick=()=>code(cs);$('cx').onclick=()=>$('cm').classList.remove('on');
$('cp').onclick=async e=>{try{await navigator.clipboard.writeText($('cc').textContent);e.target.textContent='Copied ✓';setTimeout(()=>e.target.textContent='Copy',1400)}catch(_){}};
$('w').oninput=e=>{if(ov)ov.word=(e.target.value.trim()||'PTS').toUpperCase()};
addEventListener('keydown',e=>{if(e.key==='Escape'){$('cm').classList.contains('on')?$('cm').classList.remove('on'):close()}});
SCENES.forEach((s,n)=>{const a=document.createElement('article');a.className='card';
 a.innerHTML=`<div class="pv" style="background:${s.bg||BG[s.name]||'#0a0c12'}"><button class="fs" aria-label="Full screen">${fsIcon}</button></div><div class="meta"><small>${s.use}</small><h3><i>${String(n+1).padStart(2,'0')}</i>${s.name}</h3><p>${s.hint}</p><button class="vc">View code</button></div>`;
 const pv=a.querySelector('.pv');pv._sc=s;a.querySelector('.fs').onclick=()=>open(s);a.querySelector('.vc').onclick=()=>code(s);gridEl.appendChild(a);pv.dataset.n=n});
$('cnt').textContent=SCENES.length+' animations';
const fonts=Promise.race([Promise.all(['800 40px Syne','600 40px Fraunces','400 16px "JetBrains Mono"','700 16px "JetBrains Mono"'].map(f=>document.fonts.load(f,'PtsJs Animations 0'))),new Promise(r=>setTimeout(r,2500))]).catch(()=>{});
document.querySelectorAll('.card').forEach(c=>c.classList.add('in'));document.querySelectorAll('.pv').forEach(p=>io.observe(p));
fonts.then(()=>{try{mk({name:'hero',make:hero},$('hero'),'')}catch(e){console.error('hero',e);fail('Hero animation failed: '+e.message)}
 const h=decodeURIComponent(location.hash.slice(1)),s=SCENES.find(x=>x.name===h);if(s)open(s)});
