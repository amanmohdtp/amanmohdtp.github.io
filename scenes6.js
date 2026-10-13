// Emoji. One scene per block. Add yours the same way.

sc5('Rocket Launch','Startup / launch page','Liftoff on repeat: shaking camera, rushing stars','#05060d',(S,F)=>{const c=F.ctx;let St=[],Sm=[],Fl=[],last=-1;
 return{init(){St=Array.from({length:130},()=>({x:Math.random(),y:Math.random(),z:R(.2,1)}))},
 frame(t){const W=S.size.x,H=S.size.y,cyc=(t%9000)/9000,u=Math.max(0,(cyc-.18)/.82),th=cyc<.18?.25:Math.min(1,.5+u*2);if(cyc<last){Sm=[];Fl=[]}last=cyc;
  const shake=cyc<.18?th*1.2:th*2.2,sx=R(-shake,shake),sy=R(-shake,shake),sp=.3+Math.pow(u,1.4)*16,rs=Math.min(W,H)*.2,ry=H*.74-Math.pow(u,2.2)*H*.95;
  paint(c,'5,6,13',W,H);c.save();c.translate(sx,sy);
  for(const s of St){s.y+=s.z*sp*.0022*(1+u*2);if(s.y>1){s.y=0;s.x=Math.random()}c.fillStyle=`rgba(255,255,255,${.3+s.z*.6})`;c.fillRect(s.x*W,s.y*H,1+s.z*1.4,1+s.z*(1+u*7))}
  const padY=H*.92+u*H*3;c.fillStyle='#14161f';c.fillRect(0,padY,W,H);c.fillStyle='#1f2330';c.fillRect(W/2-rs*.9,padY-8,rs*1.8,8);
  for(let i=0;i<4;i++)Sm.push({x:W/2+R(-6,6),y:ry+rs*.5,vx:R(-1.4,1.4)*(1+(cyc<.18?0:1)),vy:R(.6,2.2)+u*4,r:R(5,10),a:.5});
  for(let i=0;i<5;i++)Fl.push({x:W/2+R(-4,4),y:ry+rs*.42,vy:R(3,7)+u*8,r:R(3,7),a:1});
  Sm=Sm.filter(p=>p.a>.02);for(const p of Sm){p.x+=p.vx;p.y+=p.vy;p.r+=.7;p.a*=.955;c.fillStyle=`rgba(180,185,200,${p.a*.5})`;c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill()}
  c.globalCompositeOperation='lighter';Fl=Fl.filter(p=>p.a>.05);for(const p of Fl){p.y+=p.vy;p.r*=.95;p.a*=.9;c.fillStyle=`hsla(${20+p.a*30},100%,${50+p.a*20}%,${p.a})`;c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill()}c.globalCompositeOperation='source-over';
  emo(c,'\u{1F680}',W/2,ry,rs,-Math.PI/4);c.restore()}}});

sc5('Butterfly Garden','Spring / kids / garden brand','Butterflies wander and follow your pointer','#bfe8ff',(S,F)=>{const c=F.ctx;let B=[];
 return{init(){B=Array.from({length:7},(_,i)=>({x:R(0,S.size.x),y:R(0,S.size.y*.7),a:R(0,TAU),sp:R(.8,1.6),ph:R(0,9),s:R(.7,1.1)}))},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),u=Math.min(W,H),g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#9fd8ff');g.addColorStop(.65,'#e6f6d2');g.addColorStop(1,'#a9d98a');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='#8fcf78';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=10)c.lineTo(x,H*.86+Math.sin(x*.01)*H*.03);c.lineTo(W,H);c.fill();
  const fl=['\u{1F337}','\u{1F33C}','\u{1F338}'];for(let i=0;i<9;i++)emo(c,fl[i%3],W*(i+.5)/9,H*.9+Math.sin(i*2)*H*.02,u*.14,Math.sin(t*.0015+i)*.12);
  for(const b of B){const dx=m.x-b.x,dy=m.y-b.y,d=Math.hypot(dx,dy)||1;b.a+=Math.sin(t*.001+b.ph)*.05+(PTR.on?Math.atan2(Math.sin(Math.atan2(dy,dx)-b.a),Math.cos(Math.atan2(dy,dx)-b.a))*.02:0);
   b.x+=Math.cos(b.a)*b.sp*(d<50&&PTR.on?.3:1.2);b.y+=Math.sin(b.a)*b.sp*(d<50&&PTR.on?.3:1.2);if(b.x<-30)b.x=W+30;if(b.x>W+30)b.x=-30;if(b.y<20||b.y>H*.8)b.a=-b.a;
   emo(c,'\u{1F98B}',b.x,b.y,u*.12*b.s,b.a+Math.PI/2,.25+Math.abs(Math.cos(t*.012*b.sp+b.ph))*.75)}}}});

sc5('Jelly Drift','Calm / ocean brand','Jellyfish pulse upward through the deep','#041c2c',(S,F)=>{const c=F.ctx;let J=[],Bb=[];
 return{init(){J=Array.from({length:8},(_,i)=>({x:R(.1,.9),y:R(0,1),s:R(.6,1.2),ph:R(0,9),v:R(.5,1)}));Bb=Array.from({length:40},()=>({x:Math.random(),y:Math.random(),r:R(1,3),v:R(.2,.6)}))},
 frame(t){const W=S.size.x,H=S.size.y,u=Math.min(W,H),g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a4a6e');g.addColorStop(1,'#020c18');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=W*(i/4)+Math.sin(t*3e-4+i)*40;c.fillStyle='rgba(120,200,255,.045)';c.beginPath();c.moveTo(x-20,0);c.lineTo(x+30,0);c.lineTo(x+W*.25,H);c.lineTo(x-W*.1,H);c.fill()}
  c.fillStyle='rgba(170,220,255,.5)';for(const b of Bb){b.y-=b.v*.0007;if(b.y<0)b.y=1;c.beginPath();c.arc(b.x*W+Math.sin(t*.001+b.v*9)*6,b.y*H,b.r,0,TAU);c.fill()}c.globalCompositeOperation='source-over';
  for(const j of J){const p=Math.sin(t*.004*j.v+j.ph);j.y-=(.35+Math.max(0,p)*.9)*j.v*.0009;if(j.y<-.15)j.y=1.15;const x=j.x*W+Math.sin(t*.0008+j.ph)*18,y=j.y*H,s=u*.2*j.s;
   const g2=c.createRadialGradient(x,y,0,x,y,s);g2.addColorStop(0,'rgba(120,220,255,.35)');g2.addColorStop(1,'rgba(120,220,255,0)');c.fillStyle=g2;c.fillRect(x-s,y-s,s*2,s*2);emo(c,'\u{1FABC}',x,y,s*.8,Math.sin(t*.0008+j.ph)*.1,1,.95,1+p*.1)}}}});

sc5('Emoji Campfire','Cozy / storytelling page','A small fire under the stars','#070a14',(S,F)=>{const c=F.ctx;let Sp=[];const St=Array.from({length:90},()=>({x:Math.random(),y:Math.random()*.7,p:R(0,9)}));
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,u=Math.min(W,H),fx=W/2,fy=H*.74,fl=1+Math.sin(t*.013)*.05+Math.sin(t*.031)*.04;paint(c,'7,10,20',W,H);
  for(const s of St){c.fillStyle=`rgba(255,255,255,${.35+.4*Math.sin(t*.002+s.p)})`;c.fillRect(s.x*W,s.y*H,1.5,1.5)}
  c.fillStyle='#0b0e16';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=12)c.lineTo(x,H*.84+Math.sin(x*.008)*H*.02);c.lineTo(W,H);c.fill();
  c.globalCompositeOperation='lighter';const g=c.createRadialGradient(fx,fy,0,fx,fy,u*.7*fl);g.addColorStop(0,'rgba(255,150,50,.38)');g.addColorStop(1,'rgba(255,100,20,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over';
  emo(c,'\u{1FAB5}',fx-u*.05,fy+u*.1,u*.16,.5);emo(c,'\u{1FAB5}',fx+u*.05,fy+u*.1,u*.16,-.5);emo(c,'\u{1F525}',fx,fy,u*.3*fl,Math.sin(t*.004)*.06,1,1,fl*1.02);
  if(Math.random()<.5)Sp.push({x:fx+R(-12,12),y:fy-u*.05,vx:R(-.5,.5),vy:R(-2.4,-.8),a:1});Sp=Sp.filter(p=>p.a>.03);c.globalCompositeOperation='lighter';
  for(const p of Sp){p.x+=p.vx+Math.sin(t*.01+p.y)*.3;p.y+=p.vy;p.a*=.975;c.fillStyle=`rgba(255,${150+p.a*80|0},60,${p.a})`;c.fillRect(p.x,p.y,2,2)}c.globalCompositeOperation='source-over'}}});

sc5('Moon Cycle','Calm / night mode','Eight moon phases drift through a quiet sky','#060914',(S,F)=>{const c=F.ctx,ph=['\u{1F311}','\u{1F312}','\u{1F313}','\u{1F314}','\u{1F315}','\u{1F316}','\u{1F317}','\u{1F318}'];let sh=null;
 const St=Array.from({length:150},()=>({x:Math.random(),y:Math.random(),p:R(0,9),s:R(.6,1.8)}));
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,u=Math.min(W,H),i=Math.floor(t/3200)%8,f=(t%3200)/3200,mix=Math.max(0,(f-.7)/.3),g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#04060e');g.addColorStop(1,'#101a38');c.fillStyle=g;c.fillRect(0,0,W,H);
  for(const s of St){c.fillStyle=`rgba(255,255,255,${.25+.55*Math.abs(Math.sin(t*.0012+s.p))})`;c.fillRect(((s.x*W+t*.004*s.s)%W),s.y*H,s.s,s.s)}
  const mx=W/2,my=H*.42+Math.sin(t*.0006)*6,g2=c.createRadialGradient(mx,my,u*.05,mx,my,u*.5);g2.addColorStop(0,'rgba(180,200,255,.28)');g2.addColorStop(1,'rgba(180,200,255,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  emo(c,ph[i],mx,my,u*.36,0,1,1-mix);emo(c,ph[(i+1)%8],mx,my,u*.36,0,1,mix);
  if(!sh&&Math.random()<.004)sh={x:R(.1,.9)*W,y:R(0,.3)*H,a:0};if(sh){sh.a+=.03;const x=sh.x+sh.a*W*.3,y=sh.y+sh.a*H*.25;c.strokeStyle=`rgba(255,255,255,${1-sh.a})`;c.lineWidth=1.5;c.beginPath();c.moveTo(x,y);c.lineTo(x-W*.08,y-H*.06);c.stroke();if(sh.a>=1)sh=null}
  c.fillStyle='#04050c';c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=10)c.lineTo(x,H*.84-Math.abs(Math.sin(x*.006)+Math.sin(x*.017))*H*.07);c.lineTo(W,H);c.fill()}}});
