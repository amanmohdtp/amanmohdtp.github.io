// Cinematic and anime. One scene per block. Add yours the same way.

sc5('Rainy Neon City','Anime / cyberpunk story','Night rain over the neon skyline, with lightning','#0a0612',(S,F)=>{const c=F.ctx;let Bd=[],Rn=[],k='',fl=0;
 return{init(){Rn=Array.from({length:Math.round(220*K(S)+60)},()=>({x:Math.random(),y:Math.random(),v:R(16,26),l:R(10,22)}))},
 frame(t){const W=S.size.x|0,H=S.size.y|0,y0=H*.72;
  if(k!==W+'x'+H){k=W+'x'+H;Bd=[];let x=-10,i=0;while(x<W){const w=R(W*.05,W*.11),h=R(H*.16,H*.5),far=i%3===0;Bd.push({x,w,h:far?h*.7:h,far,hue:Math.random()<.5?330:185,sign:Math.random()<.45,seed:i*7+3});x+=w*(far?.6:1);i++}}
  if(Math.random()<.0025)fl=1;fl*=.9;const sk=c.createLinearGradient(0,0,0,y0);sk.addColorStop(0,`rgb(${18+fl*60|0},${10+fl*60|0},${36+fl*80|0})`);sk.addColorStop(1,'#4a1858');c.fillStyle=sk;c.fillRect(0,0,W,y0);
  const draw=()=>{for(const b of Bd){c.fillStyle=b.far?'#1a0e2a':'#0a0614';c.fillRect(b.x,y0-b.h,b.w,b.h);
    const cw=Math.max(4,W/70);for(let wy=y0-b.h+8;wy<y0-6;wy+=cw*1.8)for(let wx=b.x+5;wx<b.x+b.w-cw;wx+=cw*1.6){const hh=hash(wx*3.1+wy*1.7+b.seed);if(hh>.55&&(hh+Math.floor(t/1500)*.07)%1>.1){c.fillStyle=hh>.85?'#8fe8ff':'#ffd37a';c.globalAlpha=b.far?.5:.9;c.fillRect(wx,wy,cw*.7,cw)}}c.globalAlpha=1;
    if(b.sign&&!b.far){c.shadowColor=`hsl(${b.hue},100%,60%)`;c.shadowBlur=18;c.strokeStyle=`hsl(${b.hue},100%,68%)`;c.lineWidth=2.4;c.strokeRect(b.x+b.w*.2,y0-b.h*.62,b.w*.6,b.h*.12);c.shadowBlur=0}}};
  draw();const gr=c.createLinearGradient(0,y0,0,H);gr.addColorStop(0,'#150a24');gr.addColorStop(1,'#05030a');c.fillStyle=gr;c.fillRect(0,y0,W,H-y0);
  c.save();c.globalAlpha=.22;c.translate(0,y0*2);c.scale(1,-1);c.beginPath();c.rect(0,y0,W,H);c.clip();draw();c.restore();
  c.strokeStyle='rgba(255,120,200,.18)';c.lineWidth=1;for(let i=0;i<10;i++){const y=y0+(i+1)*(H-y0)/11+Math.sin(t*.002+i)*2;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke()}
  c.strokeStyle='rgba(170,190,255,.4)';c.lineWidth=1;c.beginPath();for(const r of Rn){r.y+=r.v/H;r.x-=r.v*.18/W;if(r.y>1){r.y=-.05;r.x=Math.random()*1.2}c.moveTo(r.x*W,r.y*H);c.lineTo(r.x*W-r.l*.18,r.y*H-r.l)}c.stroke();
  if(fl>.02){c.fillStyle=`rgba(210,220,255,${fl*.3})`;c.fillRect(0,0,W,H)}}}});

sc5('Sunset Hills','Anime / travel / calm hero','Hills glide past a huge sun. Move to shift the camera','#f5a65a',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),px=(m.x/W-.5)*30,u=Math.min(W,H),g=c.createLinearGradient(0,0,0,H*.75);g.addColorStop(0,'#2b2a6e');g.addColorStop(.5,'#d4568a');g.addColorStop(1,'#ffb35a');c.fillStyle=g;c.fillRect(0,0,W,H);
  const sx=W*.5+px*.3,sy=H*.48,g2=c.createRadialGradient(sx,sy,0,sx,sy,u*.6);g2.addColorStop(0,'rgba(255,240,190,.95)');g2.addColorStop(.25,'rgba(255,190,110,.6)');g2.addColorStop(1,'rgba(255,150,90,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);c.fillStyle='#fff3c8';c.beginPath();c.arc(sx,sy,u*.13,0,TAU);c.fill();
  for(let i=0;i<4;i++){const x=((t*.012*(1+i*.4)+i*W*.35)%(W+300))-150+px*.6,y=H*(.14+i*.07);c.fillStyle='rgba(255,190,160,.75)';c.beginPath();c.ellipse(x,y,90+i*18,16+i*3,0,0,TAU);c.ellipse(x+40,y-8,50,16,0,0,TAU);c.fill();c.fillStyle='rgba(190,90,130,.35)';c.beginPath();c.ellipse(x,y+9,84+i*16,7,0,0,TAU);c.fill()}
  for(let i=0;i<5;i++){const by=H*(.56+i*.075),col=[`#e0708a`,`#b5568f`,`#7c3f86`,`#4a2a6e`,`#241648`][i];c.fillStyle=col;c.beginPath();c.moveTo(0,H);for(let x=0;x<=W+6;x+=6){const xx=x+t*.01*(i+1)+px*(i+1)*.5;c.lineTo(x,by+Math.sin(xx*.006+i*2)*H*.05+Math.sin(xx*.015+i)*H*.02)}c.lineTo(W,H);c.fill()}
  for(let b=0;b<5;b++){const x=((t*.05*(.8+b*.1)+b*W*.3)%(W+120))-60,y=H*(.2+b*.05)+Math.sin(t*.002+b)*8,fl=Math.sin(t*.012+b*2)*5;c.strokeStyle='#2a1640';c.lineWidth=1.6;c.beginPath();c.moveTo(x-9,y-fl);c.quadraticCurveTo(x-4,y-fl-3,x,y);c.quadraticCurveTo(x+4,y-fl-3,x+9,y-fl);c.stroke()}}}});

sc5('Starry Lake','Night / dreamy hero','A mirror lake, slow stars and a passing meteor','#05070f',(S,F)=>{const c=F.ctx;let Rp=[],ms=null;const St=Array.from({length:260},()=>({x:Math.random(),y:Math.random(),s:R(.5,1.8),p:R(0,9)}));
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,y0=H*.58,g=c.createLinearGradient(0,0,0,y0);g.addColorStop(0,'#03040c');g.addColorStop(1,'#16223f');c.fillStyle=g;c.fillRect(0,0,W,y0);
  const stars=(flip)=>{c.save();if(flip){c.translate(0,y0*2);c.scale(1,-1);c.globalAlpha=.4}for(const s of St){const y=s.y*y0,tw=.35+.65*Math.abs(Math.sin(t*.0012+s.p)),mw=Math.abs(s.y*y0-(y0*.3+(s.x-.5)*y0*.6))<y0*.12?1.6:1;c.fillStyle=`rgba(255,255,255,${tw*(mw>1?.9:.6)})`;c.fillRect(s.x*W+(flip?Math.sin(y*.2+t*.002)*2:0),y,s.s,s.s)}c.restore()};
  stars(false);c.fillStyle='#080b14';c.beginPath();c.moveTo(0,y0);for(let x=0;x<=W;x+=8)c.lineTo(x,y0-Math.abs(Math.sin(x*.007+1)*1.2+Math.sin(x*.019))*H*.06);c.lineTo(W,y0);c.fill();
  const lg=c.createLinearGradient(0,y0,0,H);lg.addColorStop(0,'#101a30');lg.addColorStop(1,'#04060d');c.fillStyle=lg;c.fillRect(0,y0,W,H-y0);stars(true);
  if(!ms&&Math.random()<.006)ms={x:R(.1,.7)*W,y:R(0,.25)*y0,a:0};if(ms){ms.a+=.025;const x=ms.x+ms.a*W*.35,y=ms.y+ms.a*y0*.3;for(const f of[1,-1]){c.strokeStyle=`rgba(255,255,255,${(1-ms.a)*(f<0?.3:1)})`;c.lineWidth=1.6;c.beginPath();c.moveTo(x,f<0?y0*2-y:y);c.lineTo(x-W*.1,f<0?y0*2-(y-y0*.08):y-y0*.08);c.stroke()}if(ms.a>=1)ms=null}
  if(Math.random()<.02)Rp.push({x:R(0,W),y:R(y0+10,H),t0:t});Rp=Rp.filter(r=>t-r.t0<2000);c.lineWidth=1;for(const r of Rp){const a=(t-r.t0)/2000;c.strokeStyle=`rgba(200,220,255,${(1-a)*.4})`;c.beginPath();c.ellipse(r.x,r.y,a*50,a*10,0,0,TAU);c.stroke()}}}});

sc5('Lighthouse Storm','Cinematic / drama','The beam sweeps a dark sea while lightning splits the sky','#060a12',(S,F)=>{const c=F.ctx;let bolt=null,fl=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,y0=H*.58,lx=W*.8,ly=H*.5;
  if(!bolt&&Math.random()<.004){let x=R(.1,.6)*W,y=0;bolt=[[x,y]];while(y<y0){x+=R(-24,24);y+=R(14,30);bolt.push([x,y])}fl=1}fl*=.9;if(fl<.04)bolt=null;
  const sk=c.createLinearGradient(0,0,0,y0);sk.addColorStop(0,`rgb(${10+fl*90|0},${14+fl*90|0},${24+fl*110|0})`);sk.addColorStop(1,'#1d2b3d');c.fillStyle=sk;c.fillRect(0,0,W,y0);
  c.fillStyle='rgba(30,40,56,.8)';for(let i=0;i<7;i++){c.beginPath();c.ellipse(((i*W*.2+t*.006*(1+i%3))%(W+300))-150,H*(.1+i%4*.07),130,26,0,0,TAU);c.fill()}
  const a=t*.0014,dir=Math.cos(a);if(dir>0){const L=W*1.2,sp=.16,g=c.createLinearGradient(lx,ly,lx-L,ly);g.addColorStop(0,`rgba(255,245,200,${.55*dir})`);g.addColorStop(1,'rgba(255,245,200,0)');c.fillStyle=g;c.beginPath();c.moveTo(lx,ly);c.lineTo(lx-L,ly-L*sp*(1-Math.sin(a)*.6));c.lineTo(lx-L,ly+L*sp*(1-Math.sin(a)*.6));c.fill()}
  c.fillStyle='#10161f';c.beginPath();c.moveTo(lx-W*.18,H);c.quadraticCurveTo(lx-W*.05,y0*.95,lx,y0*.9);c.lineTo(W,y0*.9);c.lineTo(W,H);c.fill();
  const tw=W*.045,th=H*.3,tb=y0*.9;c.fillStyle='#e8e4dc';c.beginPath();c.moveTo(lx-tw,tb);c.lineTo(lx-tw*.6,tb-th);c.lineTo(lx+tw*.6,tb-th);c.lineTo(lx+tw,tb);c.fill();c.fillStyle='#c4352a';for(let i=0;i<3;i++){c.beginPath();c.moveTo(lx-tw+i*tw*.3,tb-i*th*.3-th*.1);c.lineTo(lx+tw-i*tw*.3,tb-i*th*.3-th*.1);c.lineTo(lx+tw*.9-i*tw*.3,tb-i*th*.3-th*.2);c.lineTo(lx-tw*.9+i*tw*.3,tb-i*th*.3-th*.2);c.fill()}
  c.fillStyle='#ffe9a0';c.fillRect(lx-tw*.5,tb-th-tw*.9,tw,tw*.9);c.fillStyle='#2a2f3a';c.fillRect(lx-tw*.7,tb-th-tw,tw*1.4,tw*.2);
  for(let i=0;i<7;i++){const by=y0+i*(H-y0)/6.5,sh=(i+1)/7;c.fillStyle=`rgb(${(8+i*4)*(1+fl)|0},${(22+i*8)*(1+fl*.6)|0},${(36+i*9)*(1+fl*.5)|0})`;c.beginPath();c.moveTo(0,H);for(let x=0;x<=W+8;x+=8)c.lineTo(x,by+Math.sin(x*.012*(1+sh)+t*.0016*(1+i*.3))*H*.014*(1+sh*2)+Math.sin(x*.03-t*.0021)*H*.006);c.lineTo(W,H);c.fill()}
  if(bolt){c.strokeStyle=`rgba(255,255,255,${fl})`;c.lineWidth=2.4;c.shadowColor='#bcd0ff';c.shadowBlur=18;c.beginPath();bolt.forEach((p,i)=>c[i?'lineTo':'moveTo'](p[0],p[1]));c.stroke();c.shadowBlur=0}}}});

sc4('Starfield Warp','Space / launch page','Hold to hyperjump, move to steer','#030308',(S,F)=>{const c=F.ctx;let P=[];
 return{init(){P=Array.from({length:Math.round(520*K(S)+80)},()=>({x:R(-1,1),y:R(-1,1),z:R(.05,1)}))},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),f=Math.min(W,H)*.5,cx=W/2+(m.x-W/2)*.3,cy=H/2+(m.y-H/2)*.3,v=.008+(PTR.down?.04:0)+PTR.sp*6e-4;wash(c,'3,3,8',.4,W,H);
  for(const p of P){const pz=p.z;p.z-=v;if(p.z<=.01){p.x=R(-1,1);p.y=R(-1,1);p.z=1;continue}
   c.strokeStyle=`rgba(200,220,255,${1-p.z})`;c.lineWidth=(1-p.z)*2+.3;c.beginPath();c.moveTo(cx+p.x/pz*f,cy+p.y/pz*f);c.lineTo(cx+p.x/p.z*f,cy+p.y/p.z*f);c.stroke()}}}});
