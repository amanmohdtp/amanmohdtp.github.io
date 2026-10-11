// Text-driven scenes. Type in the box (top right) — every scene here reads WORD.
const M=()=>new Pt(PTR.x,PTR.y),FONT='ui-sans-serif,system-ui,"Helvetica Neue",sans-serif',SERIF='ui-serif,Georgia,serif',MONO='ui-monospace,Menlo,monospace';
function textCv(str,W,H){const o=document.createElement('canvas');o.width=W;o.height=H;const c=o.getContext('2d');
 const s=Math.min(H*.45,W/(str.length*.64));c.font=`800 ${s}px ${FONT}`;c.textAlign='center';c.textBaseline='middle';c.fillStyle='#fff';c.fillText(str,W/2,H/2);return o}
function textPts(str,W,H,step){const o=textCv(str,W,H),d=o.getContext('2d').getImageData(0,0,W,H).data,P=[];
 for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step)if(d[(y*W+x)*4+3]>128)P.push(new Pt(x,y));return P}
const bg=(F,S,col='#080a12',a=1)=>{F.ctx.fillStyle=col;F.ctx.globalAlpha=a;F.ctx.fillRect(0,0,S.size.x,S.size.y);F.ctx.globalAlpha=1};
// shared: rebuild text points when word/size changes, keeping particle positions so they morph
const morph=(S,st,step)=>{const W=S.size.x|0,H=S.size.y|0,k=WORD+W+H+step;if(st.k===k)return;st.k=k;
 const T=textPts(WORD,W,H,step),o=st.P||[];st.P=T.map((h,i)=>({h,p:o[i]?o[i].p:new Pt(R(0,W),R(0,H)),v:o[i]?o[i].v:new Pt(0,0),ph:R(0,TAU)}))};

add('Particle Type','Headline that reacts to touch','Type a word. Push letters — hold to pull them in',(S,F)=>{const st={};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y;morph(S,st,W<600?6:5);wash(F.ctx,'8,10,18',.28,W,H);const m=M();
  for(const q of st.P){const d=q.p.$subtract(m),l=d.magnitude();
   if(PTR.on&&l<130)q.v.add(d.multiply((1-l/130)*(PTR.down?-1.1:1.4)/(l||1)));
   q.v.add(q.h.$subtract(q.p).multiply(.045)).multiply(.87);q.p.add(q.v);
   F.fillOnly(`hsl(${190+q.v.magnitude()*14},90%,${60+q.v.magnitude()*4}%)`).point(q.p,1.7,'circle')}}}});

add('Magnetic Letters','Nav / logo / hero word','Letters flee, tilt and snap back. Click for a shockwave',(S,F)=>{let L=[];
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx,w=WORD,s=Math.min(W/(w.length*.7),H*.38);bg(F,S,'#0d0d12');
  c.font=`800 ${s}px ${SERIF}`;c.textAlign='center';c.textBaseline='middle';const ws=[...w].map(ch=>c.measureText(ch).width),T=ws.reduce((a,b)=>a+b,0);let x=W/2-T/2;
  while(L.length<w.length)L.push({x:0,y:0,r:0,vx:0,vy:0,vr:0});
  [...w].forEach((ch,i)=>{const o=L[i],bx=x+ws[i]/2,by=H/2,dx=bx+o.x-PTR.x,dy=by+o.y-PTR.y,d=Math.hypot(dx,dy)||1;
   if(PTR.on&&d<220){const f=(1-d/220)*3;o.vx+=dx/d*f;o.vy+=dy/d*f;o.vr+=dx/d*.012}
   if(PTR.click){o.vx+=(bx-PTR.x)*.06;o.vy+=R(-25,-8);o.vr+=R(-.3,.3)}
   o.vx+=-o.x*.07;o.vy+=-o.y*.07;o.vr+=-o.r*.07;o.vx*=.85;o.vy*=.85;o.vr*=.85;o.x+=o.vx;o.y+=o.vy;o.r+=o.vr;
   c.save();c.translate(bx+o.x,by+o.y);c.rotate(o.r);c.fillStyle=`hsl(${(i*40+t/30)%360},75%,${70-Math.min(30,Math.hypot(o.x,o.y)/3)}%)`;c.fillText(ch,0,0);c.restore();x+=ws[i]})}}});

add('Neural Type','Product / AI landing hero','Letters become a living mesh near your pointer',(S,F)=>{const st={};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;st.k!==WORD+W+H&&(st.k=WORD+W+H,st.T=textPts(WORD,W|0,H|0,W<600?13:11));bg(F,S,'#070914');
  const P=st.T.map((h,i)=>{const d=h.$subtract(M()),l=d.magnitude(),f=PTR.on?Math.max(0,1-l/180)*40:0;
   return new Pt(h.x+d.x/(l||1)*f+Math.sin(t/700+i)*3,h.y+d.y/(l||1)*f+Math.cos(t/800+i*1.3)*3)});
  for(let i=0;i<P.length;i++){for(let j=i+1;j<P.length;j++){const d=P[i].$subtract(P[j]).magnitude();if(d<30)F.strokeOnly(`rgba(130,190,255,${(1-d/30)*.7})`,1).line([P[i],P[j]])}
   F.fillOnly('#dff').point(P[i],1.6,'circle')}}}});

add('Gravity Letters','Playful 404 / footer','Letters drop and pile up. Click to re-drop — pointer shoves them',(S,F)=>{let B=[],k='';
 const drop=(W)=>{B=[...(WORD+' ').repeat(3)].filter(c=>c!==' ').map(ch=>({ch,x:R(40,W-40),y:R(-600,-30),vx:0,vy:0,r:R(-1,1),s:R(30,70)}))};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(k!==WORD||PTR.click){k=WORD;drop(W)}bg(F,S,'#0c0b10');c.textAlign='center';c.textBaseline='middle';
  for(const b of B){b.vy+=.55;if(PTR.on){const d=Math.hypot(b.x-PTR.x,b.y-PTR.y);if(d<90){b.vx+=(b.x-PTR.x)/d*2;b.vy-=1.2}}
   b.x+=b.vx;b.y+=b.vy;b.vx*=.97;if(b.y>H-b.s/2-8){b.y=H-b.s/2-8;b.vy*=-.45;b.vx*=.9;b.r*=.9}if(b.x<10||b.x>W-10){b.vx*=-1;b.x=Math.max(10,Math.min(W-10,b.x))}
   c.save();c.translate(b.x,b.y);c.rotate(b.r+b.vx*.05);c.font=`800 ${b.s}px ${FONT}`;c.fillStyle=`hsl(${b.s*5},80%,66%)`;c.fillText(b.ch,0,0);c.restore()}}}});

add('Scramble Reveal','Loading text / hover headline','Letters decode themselves — hover re-scrambles, click replays',(S,F)=>{let t0=0,k='';const G='!<>-_\\/[]{}=+*^?#ABCXYZ0123456789';
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(k!==WORD||PTR.click){k=WORD;t0=t}bg(F,S,'#06090c');
  const s=Math.min(W/(WORD.length*.75),H*.3);c.font=`700 ${s}px ${MONO}`;c.textAlign='center';c.textBaseline='middle';const cw=s*.6,x0=W/2-cw*WORD.length/2;
  [...WORD].forEach((ch,i)=>{const x=x0+cw*(i+.5),near=PTR.on&&Math.hypot(x-PTR.x,H/2-PTR.y)<cw*.8,done=(t-t0)>300+i*140&&!near;
   c.fillStyle=done?'#8dffb4':'#2a7a4a';c.fillText(done?ch:G[(Math.random()*G.length)|0],x,H/2)});
  c.font=`13px ${MONO}`;c.fillStyle='#4a6';c.fillText('> decoding '+WORD.toLowerCase()+'…',W/2,H/2+s*.8)}}});

add('Wave Type','Section heading / marquee break','Pointer height sets the swell, pointer x sets the speed',(S,F)=>{let ph=0;
 return{init(){},frame(t,dt){const W=S.size.x,H=S.size.y,c=F.ctx,amp=PTR.on?(1-PTR.y/H)*H*.18:H*.08;ph+=(PTR.on?(PTR.x/W)*.05:.02);bg(F,S,'#0b0d14');
  c.font=`800 34px ${FONT}`;c.textAlign='center';c.textBaseline='middle';
  for(let row=0;row<9;row++){const y0=H*.2+row*H*.075;let x=10,i=0;
   while(x<W){const ch=WORD[(i+row)%WORD.length];c.fillStyle=`hsla(${200+row*18+i*4},80%,${55+row*3}%,${.35+row*.07})`;
    c.save();c.translate(x,y0+Math.sin(x*.012+ph*20+row*.6)*amp);c.rotate(Math.cos(x*.012+ph*20+row*.6)*amp*.01);c.fillText(ch,0,0);c.restore();x+=30;i++}}}}});

add('Orbit Words','About / skills section','Words orbit your idea — pointer speed spins them, hover enlarges',(S,F)=>{const ws=['design','motion','code','noise','light','play','craft','space','rhythm','form','color','signal'];let a=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;a+=.003+PTR.sp*.0016;wash(c,'7,8,14',.3,W,H);c.textAlign='center';c.textBaseline='middle';
  c.font=`800 ${Math.min(W/(WORD.length*.8),110)}px ${SERIF}`;c.fillStyle='#fff';c.fillText(WORD,W/2,H/2);
  ws.forEach((w,i)=>{const k=i/ws.length*TAU+a*(1+(i%3)*.4),rx=W*.2+(i%3)*W*.09,ry=H*.14+(i%3)*H*.07,x=W/2+Math.cos(k)*rx,y=H/2+Math.sin(k)*ry,hov=Math.hypot(x-PTR.x,y-PTR.y)<60,z=.6+.4*Math.sin(k);
   c.font=`${(hov?30:16)*z+8}px ${SERIF}`;c.fillStyle=`hsla(${i*30},80%,${hov?85:65}%,${.4+z*.6})`;c.fillText(w,x,y)})}}});

add('Typewriter Poem','Storytelling / intro screen','Click to skip to the next line',(S,F)=>{const L=['you arrived at the edge of the page,','where the cursor is a small, patient animal','and every word is a door left slightly open.','stay a while.'];let li=0,t0=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(PTR.click){li=(li+1)%L.length;t0=t}bg(F,S,'#f2ece0');
  const n=Math.floor((t-t0)/55),line=L[li],full=n>=line.length;if(full&&t-t0>line.length*55+1800){li=(li+1)%L.length;t0=t}
  c.font=`italic ${Math.min(34,W/line.length*1.7)}px ${SERIF}`;c.textAlign='center';c.fillStyle='#1d1a16';
  const txt=line.slice(0,n),x=W/2;c.fillText(txt,x,H/2);if(((t/450)|0)%2)c.fillRect(x+c.measureText(txt).width/2+4,H/2-26,2,32);
  c.font=`12px ${MONO}`;c.fillStyle='#8b8272';c.fillText((li+1)+' / '+L.length,W/2,H/2+60)}}});

add('Sliced Headline','Editorial hero / transition','Move around — the word shears apart under your pointer',(S,F)=>{const st={};
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0,c=F.ctx;if(st.k!==WORD+W+H){st.k=WORD+W+H;st.o=textCv(WORD,W,H)}bg(F,S,'#0a0a0d');
  for(let x=0;x<W;x+=4){const d=Math.abs(x-PTR.x),f=PTR.on?Math.max(0,1-d/260):0,dy=Math.sin(x*.02+t/500)*6+f*Math.sin(x*.05+t/150)*70*f,dx=f*(x<PTR.x?-1:1)*30;
   c.globalAlpha=1;c.drawImage(st.o,x,0,4,H,x+dx,dy,4,H)}
  c.globalCompositeOperation='source-atop';c.globalCompositeOperation='source-over'}}});

add('Fireflies','Night mode / ambient hero','Text made of glowing flies — your pointer is a lantern',(S,F)=>{const st={};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;morph(S,st,W<600?7:6);bg(F,S,'#05070b');c.globalCompositeOperation='lighter';const m=M();
  for(const q of st.P){const d=q.h.$subtract(m).magnitude(),lit=PTR.on?Math.max(0,1-d/200):0,tw=.5+.5*Math.sin(t/400+q.ph);
   const x=q.h.x+Math.sin(t/900+q.ph)*3,y=q.h.y+Math.cos(t/1100+q.ph)*3;
   const g=c.createRadialGradient(x,y,0,x,y,10);g.addColorStop(0,`rgba(255,${200+lit*55|0},90,${.15+tw*.4+lit*.6})`);g.addColorStop(1,'rgba(255,170,40,0)');c.fillStyle=g;c.fillRect(x-10,y-10,20,20)}
  c.globalCompositeOperation='source-over'}}});

add('Alphabet Rain','Tech / terminal intro','Columns spell your word where the pointer touches',(S,F)=>{let Y=[];
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx,n=Math.ceil(W/18);wash(c,'4,8,6',.12,W,H);c.font=`16px ${MONO}`;c.textAlign='center';
  while(Y.length<n)Y.push(R(-H,0));
  for(let i=0;i<n;i++){const x=i*18+9,near=PTR.on&&Math.abs(x-PTR.x)<60,ch=near?WORD[(Y[i]/18|0)%WORD.length]:String.fromCharCode(0x30A0+Math.random()*60|0);
   c.fillStyle=near?'#fff':`hsl(${130+i%20},80%,${40+Math.random()*25}%)`;c.fillText(ch,x,Y[i]);Y[i]+=near?9:R(4,9);if(Y[i]>H+20)Y[i]=R(-200,0)}}}});

add('Spiral Scroll','Scroll-driven storytelling','Scroll the wheel or drag to spin the text galaxy',(S,F)=>{let rot=0,vel=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;vel+=PTR.wh*.00006+(PTR.down?PTR.dx*.0012:0);vel*=.95;rot+=vel+.002;bg(F,S,'#090a10');
  const str=(WORD+' · ').repeat(40),cx=W/2,cy=H/2;c.textAlign='center';c.textBaseline='middle';
  for(let i=0;i<str.length;i++){const a=i*.21+rot*6,r=14+i*1.15*Math.min(W,H)/520;if(r>Math.hypot(W,H))break;
   c.save();c.translate(cx+Math.cos(a)*r,cy+Math.sin(a)*r);c.rotate(a+Math.PI/2);c.font=`700 ${10+r*.07}px ${FONT}`;c.fillStyle=`hsla(${(i*3+rot*200)%360},75%,70%,${Math.max(.15,1-r/(Math.min(W,H)))})`;c.fillText(str[i],0,0);c.restore()}}}});

add('Snake Cursor','Cursor follower / micro-interaction','Your cursor drags a ribbon of text behind it',(S,F)=>{let H2=[];
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx,x=PTR.on?PTR.x:W/2+Math.cos(t/900)*W*.3,y=PTR.on?PTR.y:H/2+Math.sin(t/700)*H*.25;
  wash(c,'8,9,14',.3,W,H);H2.unshift({x,y});if(H2.length>400)H2.pop();const str=(WORD+' ').repeat(30);c.textAlign='center';c.textBaseline='middle';
  let acc=0,li=0,prev=H2[0];for(let i=1;i<H2.length&&li<str.length;i++){acc+=Math.hypot(H2[i].x-prev.x,H2[i].y-prev.y);prev=H2[i];
   if(acc>24){acc=0;const a=Math.atan2(H2[i-1].y-H2[i].y,H2[i-1].x-H2[i].x);c.save();c.translate(H2[i].x,H2[i].y);c.rotate(a);c.font=`800 ${Math.max(8,34-li*.7)}px ${FONT}`;c.fillStyle=`hsla(${(t/10+li*12)%360},85%,65%,${1-li/str.length*.7})`;c.fillText(str[li],0,0);c.restore();li++}}}}});

add('Kinetic Marquee','Brand statement / footer','Move to speed it up, skew follows your pointer',(S,F)=>{let X=[];
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx,n=7,s=H/n*.8;bg(F,S,'#0e0e11');c.font=`900 ${s}px ${FONT}`;c.textBaseline='middle';
  const unit=(WORD+'  ✦  '),uw=c.measureText(unit).width;c.lineWidth=2;
  for(let i=0;i<n;i++){X[i]=(X[i]||0)+(i%2?-1:1)*(1+PTR.sp*.4+i*.3);const off=((X[i]%uw)+uw)%uw;
   c.save();c.transform(1,0,(PTR.on?(PTR.x/W-.5)*.5:0)*(i%2?-1:1),1,0,0);c.fillStyle=`hsl(${i*50},80%,62%)`;c.strokeStyle=c.fillStyle;
   for(let x=-uw+off;x<W+uw;x+=uw){i%2?c.strokeText(unit,x,H/n*(i+.5)):c.fillText(unit,x,H/n*(i+.5))}c.restore()}}}});

add('Fridge Poetry','Playground / gamified section','Drag the words around and write something',(S,F)=>{let T=[],g=null;const base=['light','keeps','falling','into','small','rooms','and','we','stay','soft','like','static','moving','slowly','toward','morning'];
 return{init(){const W=S.size.x,H=S.size.y;T=[...base,WORD.toLowerCase()].map(w=>({w,x:R(60,W-60),y:R(90,H-120),r:R(-.15,.15)}))},
 frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;bg(F,S,'#2a2b30');c.font=`600 22px ${SERIF}`;c.textAlign='center';c.textBaseline='middle';
  if(!T.find(q=>q.w===WORD.toLowerCase())&&WORD)T.push({w:WORD.toLowerCase(),x:W/2,y:H/2,r:0});
  if(PTR.click){g=[...T].reverse().find(q=>Math.abs(q.x-PTR.x)<c.measureText(q.w).width/2+12&&Math.abs(q.y-PTR.y)<22)||null;if(g){T.splice(T.indexOf(g),1);T.push(g)}}
  if(!PTR.down)g=null;if(g){g.x+=(PTR.x-g.x)*.35;g.y+=(PTR.y-g.y)*.35;g.r+=(PTR.dx*.004-g.r)*.2}
  for(const q of T){const w=c.measureText(q.w).width+24;c.save();c.translate(q.x,q.y);c.rotate(q.r);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(-w/2+3,-17+(q===g?9:4),w,34);c.fillStyle='#f4efe3';c.fillRect(-w/2,-17-(q===g?5:0),w,34);c.fillStyle='#1b1a18';c.fillText(q.w,0,-(q===g?5:0));c.restore()}}}});
