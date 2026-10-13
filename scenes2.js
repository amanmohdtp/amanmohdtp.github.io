// Typography styles. One scene per block. Add yours the same way.

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
