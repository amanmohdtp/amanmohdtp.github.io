// Text-driven scenes. Type in the box (top right) — every scene here reads WORD.
const M=()=>new Pt(PTR.x,PTR.y),FONT='Syne,"Helvetica Neue",sans-serif',SERIF='Fraunces,Georgia,serif',MONO='"JetBrains Mono",ui-monospace,monospace';
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

add('Scramble Reveal','Loading text / hover headline','Letters decode themselves — hover re-scrambles, click replays',(S,F)=>{let t0=0,k='';const G='!<>-_\\/[]{}=+*^?#ABCXYZ0123456789';
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(k!==WORD||PTR.click){k=WORD;t0=t}bg(F,S,'#06090c');
  const s=Math.min(W/(WORD.length*.75),H*.3);c.font=`700 ${s}px ${MONO}`;c.textAlign='center';c.textBaseline='middle';const cw=s*.6,x0=W/2-cw*WORD.length/2;
  [...WORD].forEach((ch,i)=>{const x=x0+cw*(i+.5),near=PTR.on&&Math.hypot(x-PTR.x,H/2-PTR.y)<cw*.8,done=(t-t0)>300+i*140&&!near;
   c.fillStyle=done?'#8dffb4':'#2a7a4a';c.fillText(done?ch:G[(Math.random()*G.length)|0],x,H/2)});
  c.font=`13px ${MONO}`;c.fillStyle='#4a6';c.fillText('> decoding '+WORD.toLowerCase()+'…',W/2,H/2+s*.8)}}});

add('Orbit Words','About / skills section','Words orbit your idea — pointer speed spins them, hover enlarges',(S,F)=>{const ws=['design','motion','code','noise','light','play','craft','space','rhythm','form','color','signal'];let a=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;a+=.003+PTR.sp*.0016;wash(c,'7,8,14',.3,W,H);c.textAlign='center';c.textBaseline='middle';
  c.font=`800 ${Math.min(W/(WORD.length*.8),110)}px ${SERIF}`;c.fillStyle='#fff';c.fillText(WORD,W/2,H/2);
  ws.forEach((w,i)=>{const k=i/ws.length*TAU+a*(1+(i%3)*.4),rx=W*.2+(i%3)*W*.09,ry=H*.14+(i%3)*H*.07,x=W/2+Math.cos(k)*rx,y=H/2+Math.sin(k)*ry,hov=Math.hypot(x-PTR.x,y-PTR.y)<60,z=.6+.4*Math.sin(k);
   c.font=`${(hov?30:16)*z+8}px ${SERIF}`;c.fillStyle=`hsla(${i*30},80%,${hov?85:65}%,${.4+z*.6})`;c.fillText(w,x,y)})}}});

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
