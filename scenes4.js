// 25 more pieces. Text pieces are editable in full screen.
const sc4=(name,use,hint,bgc,make)=>add(name,use,hint,make,undefined,bgc);
const T1=(name,label,v)=>TEXTS[name]=[{k:'word',label,v}];
const ctr=c=>{c.textAlign='center';c.textBaseline='middle'};
const fnt=(w,s,f=FONT)=>`${w} ${s}px ${f}`;

T1('Outline Echo','Text','ECHO');
sc4('Outline Echo','Hero word / brand mark','Layers of outline trail your pointer','#08080c',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=TX.word||' ',s=fitS(c,w,x=>fnt(800,x),W*.8,H*.45),dx=(m.x-W/2)/W,dy=(m.y-H/2)/H;
  paint(c,'8,8,12',W,H);c.font=fnt(800,s);ctr(c);c.lineWidth=1.4;
  for(let i=14;i>0;i--){c.strokeStyle=pal(200+i*9,80,62,1-i*.06);c.strokeText(w,W/2+dx*i*s*.1,H/2+dy*i*s*.1)}
  c.fillStyle='#fff';c.fillText(w,W/2,H/2)}}});

T1('Depth Extrude','Text','DEPTH');
sc4('Depth Extrude','Bold headline','The block leans toward your pointer','#101014',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=TX.word||' ',s=fitS(c,w,x=>fnt(800,x),W*.78,H*.45),dx=(m.x-W/2)/W,dy=(m.y-H/2)/H;
  paint(c,'16,16,20',W,H);c.font=fnt(800,s);ctr(c);
  for(let i=26;i>0;i--){c.fillStyle=`hsl(${12+i*1.5},80%,${58-i*1.2}%)`;c.fillText(w,W/2-dx*i*s*.03,H/2-dy*i*s*.03)}
  c.fillStyle='#fff3e6';c.fillText(w,W/2,H/2)}}});

T1('Neon Sign','Text','OPEN');
sc4('Neon Sign','Shop / bar / night brand','Flickers on its own, click to short it out','#0c0810',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=TX.word||' ',s=fitS(c,w,x=>fnt(800,x),W*.78,H*.4),hue=300+m.x/W*80;
  const fl=(Math.sin(t*.037)*Math.sin(t*.0113)>.93||PTR.click)?.25:1;paint(c,'12,8,16',W,H);c.font=fnt(800,s);ctr(c);c.lineJoin='round';
  c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=s*.03;c.strokeText(w,W/2,H/2);
  c.shadowColor=pal(hue,100,60);c.shadowBlur=34*fl;c.strokeStyle=pal(hue,100,66,fl);c.lineWidth=s*.045;c.strokeText(w,W/2,H/2);
  c.shadowBlur=8*fl;c.strokeStyle=`rgba(255,255,255,${.95*fl})`;c.lineWidth=s*.016;c.strokeText(w,W/2,H/2);c.shadowBlur=0}}});

T1('Dot Matrix Ticker','Text','HELLO FROM PTS');
sc4('Dot Matrix Ticker','News bar / announcement','An LED board scrolling your text','#0a0806',(S,F)=>{const c=F.ctx,rows=11;let ck='',D=null,mw=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,w=(TX.word||' ').toUpperCase();
  if(ck!==w){ck=w;c.font=fnt(700,rows,MONO);mw=Math.ceil(c.measureText(w).width)+2;const o=document.createElement('canvas');o.width=mw;o.height=rows;const x=o.getContext('2d');x.font=fnt(700,rows,MONO);x.textBaseline='middle';x.fillStyle='#fff';x.fillText(w,1,rows/2+.5);D=x.getImageData(0,0,mw,rows).data}
  const g=Math.max(5,Math.floor(Math.min(H*.7/rows,W/56))),cols=Math.ceil(W/g)+1,tot=mw+14,off=Math.floor(t*.018),y0=(H-rows*g)/2;paint(c,'10,8,6',W,H);
  for(let i=0;i<cols;i++){const sc=(i+off)%tot;for(let r=0;r<rows;r++){const lit=sc<mw&&D[(r*mw+sc)*4+3]>110;c.fillStyle=lit?'#ffb02e':'rgba(255,170,40,.07)';c.beginPath();c.arc(i*g+g/2,y0+r*g+g/2,g*.36,0,TAU);c.fill()}}}}});

T1('Type Tunnel','Text','GO');
sc4('Type Tunnel','Intro / transition','Fly through your word, steer with the pointer','#06060c',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=TX.word||' ',mx=fitS(c,w,x=>fnt(800,x),W*1.3,H*1.2),ph=(t*4e-4)%1,N=14;paint(c,'6,6,12',W,H);ctr(c);
  for(let i=0;i<N;i++){const z=(i+ph)/N;c.font=fnt(800,Math.max(4,Math.pow(z,2.4)*mx));c.strokeStyle=pal(180+i*14,80,62,Math.min(1,z*1.4));c.lineWidth=1+z*2;
   c.save();c.translate(W/2+(m.x-W/2)*(1-z)*.5,H/2+(m.y-H/2)*(1-z)*.5);c.rotate(Math.sin(t/2000)*.08*(1-z));c.strokeText(w,0,0);c.restore()}}}});

T1('Circle Text','Text','PTS ANIMATIONS');
sc4('Circle Text','Badge / seal / footer mark','Rings of text counter-rotate, pointer speeds them','#0b0b10',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=(TX.word||' ').trim()||' ',b=Math.min(W,H)/2,sp=1+m.x/W*2;paint(c,'11,11,16',W,H);ctr(c);
  [.86,.62,.38].forEach((k,ri)=>{const r=b*k,fs=b*.11,cw=fs*.64,n=Math.floor(TAU*r/cw),str=(w+'   ').repeat(Math.ceil(n/(w.length+3))+1).slice(0,n),dir=ri%2?1:-1;
   c.font=fnt(700,fs);for(let j=0;j<n;j++){const a=j*TAU/n+t*4e-4*sp*dir;c.save();c.translate(W/2+Math.cos(a)*r,H/2+Math.sin(a)*r);c.rotate(a+Math.PI/2);c.fillStyle=pal(ri*60+200+j*2,80,68);c.fillText(str[j],0,0);c.restore()}})}}});

T1('Chromatic Split','Text','GLITCH');
sc4('Chromatic Split','Fashion / music hero','Colour channels pull apart as you move','#0a0a0c',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=TX.word||' ',s=fitS(c,w,x=>fnt(800,x),W*.84,H*.5),d=4+Math.hypot(m.x-W/2,m.y-H/2)*.05+PTR.sp*.4;
  paint(c,'10,10,12',W,H);c.font=fnt(800,s);ctr(c);c.globalCompositeOperation='lighter';
  [['#ff2a55',-1],['#2aff9d',0],['#2a6bff',1]].forEach(([col,k])=>{c.fillStyle=col;c.fillText(w,W/2+k*d,H/2+Math.sin(t/300+k)*d*.3)});c.globalCompositeOperation='source-over'}}});

T1('Bouncy Logo','Text','PTS');
sc4('Bouncy Logo','Playful screensaver / 404','Click to add another one','#0a0a10',(S,F)=>{const c=F.ctx;let B=[];
 return{init(){B=[{x:60,y:60,vx:1.6,vy:1.2,h:20}]},frame(t){const W=S.size.x,H=S.size.y,w=TX.word||' ',m=A(t,W,H);wash(c,'10,10,16',.22,W,H);
  const s=fitS(c,w,x=>fnt(800,x),W*.34,H*.25);c.font=fnt(800,s);ctr(c);const tw=c.measureText(w).width/2+4,th=s*.5;
  if(PTR.click&&B.length<6)B.push({x:m.x,y:m.y,vx:R(-2,2)||1.4,vy:R(-2,2)||1.1,h:R(0,360)});
  for(const b of B){b.x+=b.vx;b.y+=b.vy;if(b.x<tw||b.x>W-tw){b.vx*=-1;b.x=Math.max(tw,Math.min(W-tw,b.x));b.h+=47}if(b.y<th||b.y>H-th){b.vy*=-1;b.y=Math.max(th,Math.min(H-th,b.y));b.h+=47}
   c.fillStyle=pal(b.h,85,62);c.fillText(w,b.x,b.y)}}}});

T1('Ribbon Text','Text','FLOW');
sc4('Ribbon Text','Section divider / heading','Twisting ribbons, pointer height sets the swell','#0b0b12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),w=(TX.word||' ').replace(/\s+/g,' '),s=Math.max(14,Math.min(H*.17,W/9)),amp=H*.18*(.4+(1-m.y/H));paint(c,'11,11,18',W,H);c.font=fnt(800,s);ctr(c);
  for(const off of[0,Math.PI]){let x=-10,i=0;while(x<W+s){const ch=w[i%w.length],ph=x*.012+t*.002+off,sy=Math.cos(ph*1.3+t*.001);
   c.save();c.translate(x,H/2+Math.sin(ph)*amp);c.rotate(Math.cos(ph)*.5);c.scale(1,sy);c.fillStyle=pal(x/W*160+(off?20:200),80,sy>0?62:42);c.fillText(ch,0,0);c.restore();x+=s*.64;i++}}}}});

sc4('Lissajous Knot','Science / music site','Move to retune the curves','#07080e',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),a=3+m.x/W*4,b=2+m.y/H*4,r=Math.min(W,H)*.42;paint(c,'7,8,14',W,H);c.lineWidth=1.3;
  for(let k=0;k<4;k++){c.beginPath();for(let u=0;u<=TAU;u+=.012){const x=Math.sin(a*u+t*4e-4*(k+1)+k),y=Math.sin(b*u+k*.7);c[u?'lineTo':'moveTo'](W/2+x*r,H/2+y*r)}c.strokeStyle=pal(200+k*45,80,64,.85);c.stroke()}}}});

sc4('Blob Orbit','Hero / app background','Soft blobs drift and lean toward you','#0b0a12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),Rb=Math.min(W,H)*.22;paint(c,'11,10,18',W,H);c.globalCompositeOperation='lighter';
  for(let i=0;i<5;i++){const cx=W/2+Math.cos(t*3e-4*(i+1)+i*1.3)*W*.25+(m.x-W/2)*.08,cy=H/2+Math.sin(t*3.7e-4*(i+1)+i)*H*.22+(m.y-H/2)*.08;
   c.beginPath();for(let a=0;a<=TAU+.1;a+=TAU/80){const r=Rb*(1+.25*Math.sin(3*a+t*.001+i)+.15*Math.sin(5*a-t*.0013));c[a?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r)}
   const g=c.createRadialGradient(cx,cy,0,cx,cy,Rb*1.4);g.addColorStop(0,pal(i*60+200,90,60,.8));g.addColorStop(1,pal(i*60+200,90,40,0));c.fillStyle=g;c.fill()}c.globalCompositeOperation='source-over'}}});

sc4('Ocean Bands','Footer / calm hero','Layered waves, pointer height sets the swell','#06101c',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'6,16,28',W,H);
  for(let i=0;i<7;i++){const y0=H*(.35+i*.1),amp=H*.035*(1+i*.2)*(.6+(1-m.y/H));c.beginPath();c.moveTo(0,H);
   for(let x=0;x<=W+8;x+=8)c.lineTo(x,y0+Math.sin(x*.01*(1+i*.1)+t*6e-4*(1+i*.2)+m.x*.004*i)*amp+Math.sin(x*.023-t*9e-4)*amp*.4);
   c.lineTo(W,H);c.fillStyle=`hsl(${200+i*6},70%,${14+i*5}%)`;c.fill()}}}});

sc4('Starfield Warp','Space / launch page','Hold to hyperjump, move to steer','#030308',(S,F)=>{const c=F.ctx;let P=[];
 return{init(){P=Array.from({length:Math.round(520*K(S)+80)},()=>({x:R(-1,1),y:R(-1,1),z:R(.05,1)}))},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),f=Math.min(W,H)*.5,cx=W/2+(m.x-W/2)*.3,cy=H/2+(m.y-H/2)*.3,v=.008+(PTR.down?.04:0)+PTR.sp*6e-4;wash(c,'3,3,8',.4,W,H);
  for(const p of P){const pz=p.z;p.z-=v;if(p.z<=.01){p.x=R(-1,1);p.y=R(-1,1);p.z=1;continue}
   c.strokeStyle=`rgba(200,220,255,${1-p.z})`;c.lineWidth=(1-p.z)*2+.3;c.beginPath();c.moveTo(cx+p.x/pz*f,cy+p.y/pz*f);c.lineTo(cx+p.x/p.z*f,cy+p.y/p.z*f);c.stroke()}}}});

sc4('Rain Ripples','Weather / calm brand','Click to drop a stone','#06101a',(S,F)=>{const c=F.ctx;let Rp=[];
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),mr=Math.min(W,H)*.35;paint(c,'6,16,26',W,H);
  if(Math.random()<.035||(PTR.on&&PTR.sp>8&&Math.random()<.25))Rp.push({x:Math.random()*W,y:Math.random()*H,t0:t,h:190+R(-15,15)});
  if(PTR.click)Rp.push({x:m.x,y:m.y,t0:t,h:200});Rp=Rp.filter(r=>t-r.t0<2400);c.lineWidth=1.4;
  for(const r of Rp){const age=(t-r.t0)/2400;for(let k=0;k<3;k++){const rad=age*mr-k*10;if(rad>0){c.strokeStyle=pal(r.h,70,70,(1-age)*(1-k*.3));c.beginPath();c.arc(r.x,r.y,rad,0,TAU);c.stroke()}}}}}});

sc4('Pendulum Wave','Education / hypnotic loader','Pointer sets the swing and the speed','#0b0b10',(S,F)=>{const c=F.ctx,N=15;let ph=0,lt=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);ph+=(t-lt)*(.6+m.x/W*1.6);lt=t;paint(c,'11,11,16',W,H);
  const top=H*.1,len=H*.6,amp=.35+m.y/H*.5;c.strokeStyle='rgba(255,255,255,.25)';c.beginPath();c.moveTo(W*.06,top);c.lineTo(W*.94,top);c.stroke();
  for(let i=0;i<N;i++){const px=W*.1+i*(W*.8/(N-1)),a=amp*Math.cos(TAU*(30+i)*ph/60000),bx=px+Math.sin(a)*len,by=top+Math.cos(a)*len;
   c.strokeStyle='rgba(255,255,255,.18)';c.beginPath();c.moveTo(px,top);c.lineTo(bx,by);c.stroke();c.fillStyle=pal(i*24+180,80,65);c.beginPath();c.arc(bx,by,Math.max(4,W/60),0,TAU);c.fill()}}}});

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

sc4('Studio Clock','Portfolio / footer widget','Real time, smooth sweep','#0e0e12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,r=Math.min(W,H)*.4,d=new Date(),ms=d.getMilliseconds()/1000,s=d.getSeconds()+ms,mi=d.getMinutes()+s/60,h=d.getHours()%12+mi/60;paint(c,'14,14,18',W,H);c.save();c.translate(W/2,H/2);
  for(let i=0;i<60;i++){const a=i/60*TAU-Math.PI/2,L=i%5?r*.04:r*.1;c.strokeStyle=i%5?'rgba(255,255,255,.3)':'#fff';c.lineWidth=i%5?1:2;c.beginPath();c.moveTo(Math.cos(a)*(r-L),Math.sin(a)*(r-L));c.lineTo(Math.cos(a)*r,Math.sin(a)*r);c.stroke()}
  const hand=(v,len,w,col)=>{const a=v*TAU-Math.PI/2;c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(-Math.cos(a)*len*.12,-Math.sin(a)*len*.12);c.lineTo(Math.cos(a)*len,Math.sin(a)*len);c.stroke()};
  hand(h/12,r*.5,5,'#fff');hand(mi/60,r*.78,3,'#fff');hand(s/60,r*.88,1.5,'#ff4d2e');c.fillStyle='#ff4d2e';c.beginPath();c.arc(0,0,5,0,TAU);c.fill();c.restore()}}});

sc4('Hex Pulse','Dashboard / honeycomb section','Waves roll out from your pointer','#08080e',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),h=Math.max(14,Math.min(W,H)/12),sq=Math.sqrt(3);paint(c,'8,8,14',W,H);
  for(let i=-1;i*h*1.5<W+h;i++)for(let j=-1;j*h*sq<H+h;j++){const x=i*h*1.5,y=j*h*sq+(i&1?h*sq/2:0),v=Math.sin(Math.hypot(x-m.x,y-m.y)*.025-t*.003)*.5+.5,rr=h*.92*(.35+.65*v);
   c.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;c[k?'lineTo':'moveTo'](x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fillStyle=pal(180+v*140,80,32+v*30);c.fill()}}}});

sc4('Radial Bars','Music / audio brand','A fake equalizer that follows your pointer','#0a0a10',(S,F)=>{const c=F.ctx,N=96;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),r0=Math.min(W,H)*.2,ma=Math.atan2(m.y-H/2,m.x-W/2);paint(c,'10,10,16',W,H);c.lineCap='round';c.lineWidth=Math.max(2,W/130);
  for(let i=0;i<N;i++){const a=i/N*TAU-Math.PI,v=.5+.5*Math.sin(i*.35+t*.003)*Math.sin(i*.11-t*.0017),da=Math.abs(Math.atan2(Math.sin(a-ma),Math.cos(a-ma))),L=r0*.15+(v+Math.max(0,1-da*2.2)*.8)*r0*1.1;
   c.strokeStyle=pal(i/N*300+t*.02,85,62);c.beginPath();c.moveTo(W/2+Math.cos(a)*r0,H/2+Math.sin(a)*r0);c.lineTo(W/2+Math.cos(a)*(r0+L),H/2+Math.sin(a)*(r0+L));c.stroke()}}}});

sc4('Phyllotaxis','Nature / wellness','Tiny pointer moves reshape the sunflower','#0a0c0a',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),N=Math.round(700*K(S)+150),k=Math.min(W,H)*.48/Math.sqrt(N),ga=2.399963+(m.x/W-.5)*.02;paint(c,'10,12,10',W,H);
  for(let i=0;i<N;i++){const a=i*ga+t*1e-4,r=k*Math.sqrt(i);c.fillStyle=pal(i*.5+t*.02,75,62);c.beginPath();c.arc(W/2+Math.cos(a)*r,H/2+Math.sin(a)*r,.8+i/N*2.6,0,TAU);c.fill()}}}});

sc4('Soft Gradients','Brand hero / SaaS','Colour clouds, one follows your pointer','#0a0a12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),rr=Math.min(W,H)*.6;paint(c,'10,10,18',W,H);c.globalCompositeOperation='lighter';
  for(let i=0;i<5;i++){const x=i?W/2+Math.cos(t*2.5e-4*(i+1)+i*2)*W*.35:m.x,y=i?H/2+Math.sin(t*3e-4*(i+1)+i)*H*.3:m.y,g=c.createRadialGradient(x,y,0,x,y,rr);g.addColorStop(0,pal(i*70+200,90,58,.55));g.addColorStop(1,pal(i*70+200,90,40,0));c.fillStyle=g;c.fillRect(0,0,W,H)}c.globalCompositeOperation='source-over'}}});

sc4('Life Garden','Playground / science','Click or sweep to plant living cells','#07090a',(S,F)=>{const c=F.ctx;let g,a,gl,n=0,cols=0,rows=0,lt=0,rs=0;
 const seed=p=>{for(let i=0;i<g.length;i++)g[i]=Math.random()<p?1:0};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),cs=Math.max(7,Math.round(Math.min(W,H)/38)),cc=Math.floor(W/cs),rr=Math.floor(H/cs);
  if(cc!==cols||rr!==rows){cols=cc;rows=rr;g=new Uint8Array(cols*rows);a=new Uint8Array(cols*rows);gl=new Float32Array(cols*rows);seed(.22)}
  const ci=Math.floor(m.x/cs),cj=Math.floor(m.y/cs),rad=PTR.click?6:(PTR.on&&PTR.sp>2?2:0);
  if(rad)for(let i=-rad;i<=rad;i++)for(let j=-rad;j<=rad;j++){const x=ci+i,y=cj+j;if(x>=0&&y>=0&&x<cols&&y<rows&&Math.random()<.6)g[y*cols+x]=1}
  if(t-lt>110){lt=t;n=0;const o=new Uint8Array(g.length);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let s=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)if(i||j)s+=g[((y+j+rows)%rows)*cols+(x+i+cols)%cols];const k=y*cols+x;o[k]=g[k]?(s==2||s==3?1:0):(s==3?1:0);n+=o[k]}g=o;rs++;if(n<cols*rows*.02||rs>230){seed(.22);rs=0}}
  paint(c,'7,9,10',W,H);for(let k=0;k<g.length;k++){gl[k]=Math.max(g[k],gl[k]*.88);if(gl[k]>.04){c.fillStyle=pal(140+(k%cols)/cols*120,70,55,gl[k]);c.fillRect((k%cols)*cs+1,Math.floor(k/cols)*cs+1,cs-2,cs-2)}}}}});

sc4('Spiral Galaxy','Space / science hero','Tilt the galaxy with your pointer','#05050a',(S,F)=>{const c=F.ctx;let Q=[];
 return{init(){Q=Array.from({length:Math.round(1500*K(S)+300)},()=>{const r=Math.pow(Math.random(),.6),arm=(Math.random()*3|0);return{r,th:r*4+arm*TAU/3+R(-.25,.25),h:r<.2?40:200+r*100,s:Math.random()*1.4+.4}})},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),RR=Math.min(W,H)*.46,tilt=.35+m.y/H*.5;wash(c,'5,5,10',.5,W,H);c.globalCompositeOperation='lighter';
  for(const q of Q){const a=q.th+t*3e-4/(.15+q.r);c.fillStyle=pal(q.h,80,70,.7);c.fillRect(W/2+Math.cos(a)*q.r*RR,H/2+Math.sin(a)*q.r*RR*tilt,q.s,q.s)}
  const g=c.createRadialGradient(W/2,H/2,0,W/2,H/2,RR*.25);g.addColorStop(0,'rgba(255,220,160,.5)');g.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g;c.fillRect(0,0,W,H);c.globalCompositeOperation='source-over'}}});

sc4('Lattice Wave','Data / terrain visual','A dot terrain that breathes, pointer sets the height','#06080e',(S,F)=>{const c=F.ctx,gx=34,gz=24;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),f=Math.min(W,H)*.9,amp=.25+(1-m.y/H)*.6,yaw=(m.x/W-.5)*1.2;paint(c,'6,8,14',W,H);
  for(let j=gz-1;j>=0;j--)for(let i=0;i<gx;i++){const X=(i-gx/2)*.3,Z=1.2+j*.2,Y=Math.sin(i*.4+t*.002)*Math.cos(j*.4-t*.0015)*amp,s=f/(Z+X*yaw*.4);
   c.fillStyle=pal(190+Y*120,80,45+Y*30+ (1-j/gz)*15,.25+(1-j/gz)*.7);c.beginPath();c.arc(W/2+X*s,H*.34+(1.1-Y)*s*.55,.8+s/f*1.2,0,TAU);c.fill()}}}});
