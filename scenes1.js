// Typography classics. One scene per block. Add yours the same way.

TEXTS['Particle Type']=[{k:'word',label:'Text',v:'PTS'}];
add('Particle Type','Headline that reacts to touch','Push the letters, hold to pull them in',(S,F)=>{const st={},c=F.ctx;
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0,m=A(t,W,H),w=TX.word||' ',step=Math.max(4,Math.round(W/110)),k=w+W+H;
  if(st.k!==k){st.k=k;const T=textPts(w,W,H,step),o=st.P||[];st.P=T.map((h,i)=>({h,p:o[i]?o[i].p:new Pt(R(0,W),R(0,H)),v:o[i]?o[i].v:new Pt(0,0)}))}
  wash(c,'8,10,18',.28,W,H);const mp=new Pt(m.x,m.y),rad=Math.max(70,W*.12);
  for(const q of st.P){const d=q.p.$subtract(mp),l=d.magnitude();if(l<rad)q.v.add(d.multiply((1-l/rad)*(PTR.down?-1.1:1.4)/(l||1)));
   q.v.add(q.h.$subtract(q.p).multiply(.045)).multiply(.87);q.p.add(q.v);const sp=q.v.magnitude();
   c.fillStyle=`hsl(${190+sp*14},90%,${60+sp*4}%)`;c.fillRect(q.p.x,q.p.y,step*.4,step*.4)}}}});

TEXTS['Scramble Reveal']=[{k:'word',label:'Main text',v:'DECODE'},{k:'msg',label:'Status line',v:'> decoding message'}];
add('Scramble Reveal','Loading text / hover headline','Hover re-scrambles, click replays',(S,F)=>{let t0=0,k='';const c=F.ctx,G='!<>-_\\/[]{}=+*^?#ABCXYZ0123456789';
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,w=TX.word||' ';if(k!==w||PTR.click||(!PTR.on&&t-t0>6000)){k=w;t0=t}paint(c,'6,9,12',W,H);
  const s=fitS(c,w,x=>`700 ${x}px ${MONO}`,W*.9,H*.3);c.font=`700 ${s}px ${MONO}`;c.textAlign='center';c.textBaseline='middle';const cw=c.measureText('M').width,x0=W/2-cw*w.length/2;
  [...w].forEach((ch,i)=>{const x=x0+cw*(i+.5),near=PTR.on&&Math.hypot(x-PTR.x,H/2-PTR.y)<cw*.8,done=(t-t0)>300+i*140&&!near;c.fillStyle=done?'#8dffb4':'#2a7a4a';c.fillText(done||ch===' '?ch:G[(Math.random()*G.length)|0],x,H/2)});
  const msg=TX.msg||'',ms=fitS(c,msg,x=>`${x}px ${MONO}`,W*.9,14);c.font=`${ms}px ${MONO}`;c.fillStyle='#4a6';c.fillText(msg,W/2,H/2+s*.8)}}});

TEXTS['Orbit Words']=[{k:'word',label:'Center text',v:'PTS'},{k:'words',label:'Orbiting words (comma separated)',v:'design, motion, code, noise, light, play, craft, space, rhythm, form, color, signal'}];
add('Orbit Words','About / skills section','Pointer speed spins them, hover enlarges',(S,F)=>{let a=0;const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),ws=(TX.words||'').split(',').map(x=>x.trim()).filter(Boolean),w=TX.word||'',u=Math.max(.7,Math.min(W,H)/420);
  a+=.003+PTR.sp*.0016;wash(c,'7,8,14',.3,W,H);c.textAlign='center';c.textBaseline='middle';
  const cs=fitS(c,w,x=>`800 ${x}px ${SERIF}`,W*.36,H*.3);c.font=`800 ${cs}px ${SERIF}`;c.fillStyle='#fff';c.fillText(w,W/2,H/2);
  ws.forEach((x,i)=>{const k=i/ws.length*TAU+a*(1+(i%3)*.4),rx=W*.2+(i%3)*W*.07,ry=H*.15+(i%3)*H*.06,px=W/2+Math.cos(k)*rx,py=H/2+Math.sin(k)*ry,hov=Math.hypot(px-m.x,py-m.y)<60*u,z=.6+.4*Math.sin(k);
   c.font=`${((hov?30:16)*z+8)*u}px ${SERIF}`;c.fillStyle=`hsla(${i*30},80%,${hov?85:65}%,${.4+z*.6})`;c.fillText(x,px,py)})}}});

TEXTS['Spiral Scroll']=[{k:'phrase',label:'Text',v:'PTS'}];
add('Spiral Scroll','Scroll-driven storytelling','Scroll the wheel or drag to spin the text galaxy',(S,F)=>{let rot=0,vel=0;const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,u=Math.min(W,H)/520;vel+=PTR.wh*.00006+(PTR.down?PTR.dx*.0012:0);vel*=.95;rot+=vel+.002;paint(c,'9,10,16',W,H);
  const ph=(TX.phrase||' ').trim()||' ',str=(ph+' . ').repeat(Math.ceil(400/(ph.length+3))),cx=W/2,cy=H/2;c.textAlign='center';c.textBaseline='middle';
  for(let i=0;i<str.length;i++){const a=i*.21+rot*6,r=(14+i*1.15*u*1)*1;if(r>Math.hypot(W,H)/1.6)break;
   c.save();c.translate(cx+Math.cos(a)*r,cy+Math.sin(a)*r);c.rotate(a+Math.PI/2);c.font=`700 ${(10+r*.07)}px ${FONT}`;c.fillStyle=`hsla(${(i*3+rot*200)%360},75%,70%,${Math.max(.15,1-r/Math.min(W,H))})`;c.fillText(str[i],0,0);c.restore()}}}});

TEXTS['Alphabet Rain']=[{k:'word',label:'Text',v:'PTS'}];
add('Alphabet Rain','Tech / terminal intro','Columns spell your text where the pointer touches',(S,F)=>{let Y=[];const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),n=Math.ceil(W/18),w=TX.word||'?';wash(c,'4,8,6',.12,W,H);c.font=`16px ${MONO}`;c.textAlign='center';
  while(Y.length<n)Y.push(R(-H,0));
  for(let i=0;i<n;i++){const x=i*18+9,near=Math.abs(x-m.x)<60,ch=near?w[(Y[i]/18|0)%w.length]:String.fromCharCode(0x30A0+Math.random()*60|0);
   c.fillStyle=near?'#fff':`hsl(${130+i%20},80%,${40+Math.random()*25}%)`;c.fillText(ch,x,Y[i]);Y[i]+=near?9:R(4,9);if(Y[i]>H+20)Y[i]=R(-200,0)}}}});

TEXTS['Signal Lost']=[{k:'code',label:'Big text',v:'404'},{k:'msg',label:'Message',v:'signal lost, this page drifted out of orbit'}];
add('Signal Lost','404 page','Click to glitch it harder',(S,F)=>{let boost=0;const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,code=TX.code||' ',msg=TX.msg||'';if(PTR.click)boost=1;boost*=.94;
  const g=(Math.sin(t/700)>.88?1:.08)+boost*2;paint(c,'7,8,11',W,H);
  const s=fitS(c,code,x=>`700 ${x}px ${MONO}`,W*.8,H*.4);c.textAlign='center';c.textBaseline='middle';c.font=`700 ${s}px ${MONO}`;
  [['#ff2a55',-1],['#2affd5',1],['#fff',0]].forEach(([col,k])=>{c.fillStyle=col;c.globalCompositeOperation=k?'lighter':'source-over';c.fillText(code,W/2+k*g*s*.04+R(-g,g)*3,H/2-s*.05+R(-g,g)*2)});
  c.globalCompositeOperation='source-over';
  const dp=c.canvas.width/W;for(let i=0;i<Math.floor(g*10);i++){const y=R(0,H),h=R(1,10),off=R(-40,40)*g;c.drawImage(c.canvas,0,y*dp,c.canvas.width,h*dp,off,y,W,h)}
  for(let y=0;y<H;y+=3){c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,y,W,1)}
  const ms=fitS(c,msg,x=>`${x}px ${MONO}`,W*.9,16);c.font=`${ms}px ${MONO}`;c.fillStyle='#8a8d99';c.fillText(msg,W/2,H/2+s*.62)}}});
