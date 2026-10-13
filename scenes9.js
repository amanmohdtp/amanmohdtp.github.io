// Geometry and math. One scene per block. Add yours the same way.

add('Lotus','Wellness / meditation','Eight petals, breathing',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),u=Math.min(W,H)*.52/22,amp=38*(.4+m.x/W*1.2);
  c.fillStyle='rgb(14,5,16)';c.fillRect(0,0,W,H);const cx=0?W/2+(m.x-W/2)*.2:W/2,cy=0?H/2+(m.y-H/2)*.2:H/2;c.lineWidth=1.2;
  for(let i=1;i<=22;i++){c.beginPath();for(let a=0;a<=TAU+.05;a+=TAU/140){const r=i*u+Math.sin(a*8+t*8e-4*(1+PTR.sp*.05)+i*.35)*amp*i/22;
    c[a?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r*1)}
   c.strokeStyle=pal(320+i*7,80,65,.85);c.stroke()}}}},undefined,'rgb(14,5,16)');

add('Kaleidoscope','Drawing tool / hero','Draw, eight mirrors paint with you',(S,F)=>{const c=F.ctx;let last=null;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),cx=W/2,cy=H/2,x=m.x-cx,y=m.y-cy;wash(c,'6,6,12',.04,W,H);
  if(last&&(PTR.down||!PTR.on||PTR.sp>1)){c.globalCompositeOperation='lighter';c.lineWidth=1.5;c.lineCap='round';c.strokeStyle=pal(200+t/15,90,62,.8);
   for(let i=0;i<8;i++)for(const s of[1,-1]){c.save();c.translate(cx,cy);c.rotate(i*TAU/8);c.scale(1,s);c.beginPath();c.moveTo(last.x,last.y);c.lineTo(x,y);c.stroke();c.restore()}
   c.globalCompositeOperation='source-over'}last={x,y}}}},undefined,'rgb(6,6,12)');

add('Spirograph','Toy / education','Pointer changes the gears',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),r=.31+m.x/W*.4,d=.3+m.y/H*.7,sc=Math.min(W,H)*.4;c.fillStyle='rgb(8,8,12)';c.fillRect(0,0,W,H);
  c.lineWidth=1.1;c.strokeStyle=pal(40+t/30,85,65,.85);c.beginPath();
  for(let u=0;u<TAU*30;u+=.05){const x=(1-r)*Math.cos(u)+d*r*Math.cos((1-r)/r*u),y=(1-r)*Math.sin(u)-d*r*Math.sin((1-r)/r*u);c[u?'lineTo':'moveTo'](W/2+x*sc,H/2+y*sc)}c.stroke()}}},undefined,'rgb(8,8,12)');

sc4('Phyllotaxis','Nature / wellness','Tiny pointer moves reshape the sunflower','#0a0c0a',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),N=Math.round(700*K(S)+150),k=Math.min(W,H)*.48/Math.sqrt(N),ga=2.399963+(m.x/W-.5)*.02;paint(c,'10,12,10',W,H);
  for(let i=0;i<N;i++){const a=i*ga+t*1e-4,r=k*Math.sqrt(i);c.fillStyle=pal(i*.5+t*.02,75,62);c.beginPath();c.arc(W/2+Math.cos(a)*r,H/2+Math.sin(a)*r,.8+i/N*2.6,0,TAU);c.fill()}}}});

sc4('Dot Sphere','Globe / tech hero','Drag the planet with your pointer','#07080d',(S,F)=>{const c=F.ctx,N=460;let Q=[];
 return{init(){Q=Array.from({length:N},(_,i)=>{const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*2.39996;return{x:Math.cos(th)*r,y,z:Math.sin(th)*r}})},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),ry=t*4e-4+(m.x/W-.5)*3,rx=(m.y/H-.5)*1.4,R0=Math.min(W,H)*.36,cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx);paint(c,'7,8,13',W,H);
  const pts=Q.map(q=>{const x=q.x*cy+q.z*sy,z0=-q.x*sy+q.z*cy,y=q.y*cx-z0*sx,z=q.y*sx+z0*cx;return{x,y,z,h:200+q.y*60}}).sort((a,b)=>a.z-b.z);
  for(const p of pts){const s=1/(2-p.z*.5);c.fillStyle=pal(p.h,80,60+p.z*20,.25+(p.z+1)*.38);c.beginPath();c.arc(W/2+p.x*R0*s*1.6,H/2+p.y*R0*s*1.6,.8+(p.z+1)*1.6,0,TAU);c.fill()}}}});

sc4('Helix DNA','Biotech / health brand','Move sideways to twist it','#080a12',(S,F)=>{const c=F.ctx,N=36;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),tw=.35+(m.x/W-.5)*.25,r=Math.min(W*.3,H*.22);paint(c,'8,10,18',W,H);
  for(let i=0;i<N;i++){const y=H*.08+i*(H*.84/(N-1)),a=i*tw+t*.002,x1=W/2+Math.cos(a)*r,x2=W/2-Math.cos(a)*r,z=Math.sin(a);
   c.strokeStyle=`rgba(180,200,255,${.12+Math.abs(z)*.15})`;c.beginPath();c.moveTo(x1,y);c.lineTo(x2,y);c.stroke();
   c.fillStyle=pal(190,80,60+z*20);c.beginPath();c.arc(x1,y,3+z*2.5+1.5,0,TAU);c.fill();c.fillStyle=pal(330,80,60-z*20);c.beginPath();c.arc(x2,y,3-z*2.5+1.5,0,TAU);c.fill()}}}});

sc4('Spiral Galaxy','Space / science hero','Tilt the galaxy with your pointer','#05050a',(S,F)=>{const c=F.ctx;let Q=[];
 return{init(){Q=Array.from({length:Math.round(1500*K(S)+300)},()=>{const r=Math.pow(Math.random(),.6),arm=(Math.random()*3|0);return{r,th:r*4+arm*TAU/3+R(-.25,.25),h:r<.2?40:200+r*100,s:Math.random()*1.4+.4}})},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),RR=Math.min(W,H)*.46,tilt=.35+m.y/H*.5;wash(c,'5,5,10',.5,W,H);c.globalCompositeOperation='lighter';
  for(const q of Q){const a=q.th+t*3e-4/(.15+q.r);c.fillStyle=pal(q.h,80,70,.7);c.fillRect(W/2+Math.cos(a)*q.r*RR,H/2+Math.sin(a)*q.r*RR*tilt,q.s,q.s)}
  const g=c.createRadialGradient(W/2,H/2,0,W/2,H/2,RR*.25);g.addColorStop(0,'rgba(255,220,160,.5)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over'}}});

sc4('Radial Bars','Music / audio brand','A fake equalizer that follows your pointer','#0a0a10',(S,F)=>{const c=F.ctx,N=96;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),r0=Math.min(W,H)*.2,ma=Math.atan2(m.y-H/2,m.x-W/2);paint(c,'10,10,16',W,H);c.lineCap='round';c.lineWidth=Math.max(2,W/130);
  for(let i=0;i<N;i++){const a=i/N*TAU-Math.PI,v=.5+.5*Math.sin(i*.35+t*.003)*Math.sin(i*.11-t*.0017),da=Math.abs(Math.atan2(Math.sin(a-ma),Math.cos(a-ma))),L=r0*.15+(v+Math.max(0,1-da*2.2)*.8)*r0*1.1;
   c.strokeStyle=pal(i/N*300+t*.02,85,62);c.beginPath();c.moveTo(W/2+Math.cos(a)*r0,H/2+Math.sin(a)*r0);c.lineTo(W/2+Math.cos(a)*(r0+L),H/2+Math.sin(a)*(r0+L));c.stroke()}}}});
