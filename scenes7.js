// Flow and particles. One scene per block. Add yours the same way.

add('Silk Currents','Hero background','Move through the current',(S,F)=>{const c=F.ctx;let P=[];
 const field=(x,y,t)=>(Math.sin(x*.004+t*3e-4)+Math.cos(y*.005-t*2e-4))*Math.PI;
 const sp=()=>({x:R(0,S.size.x),y:R(0,S.size.y),a:R(0,1)});
 return{init(){P=Array.from({length:(900*K(S))|0},sp)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,'8,10,18',.05,W,H);c.lineWidth=1;c.lineCap='round';
  for(const p of P){const a=field(p.x,p.y,t,W,H),x0=p.x,y0=p.y,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,k=d<160?(1-d/160)*(PTR.down?-4:4):0;
   p.x+=Math.cos(a)*1.4+dx/d*k;p.y+=Math.sin(a)*1.4+dy/d*k;
   c.strokeStyle=pal(190+p.a*50,80,68,.55);c.beginPath();c.moveTo(x0,y0);c.lineTo(p.x,p.y);c.stroke();
   if(p.x<0||p.x>W||p.y<0||p.y>H||Math.random()<.004)Object.assign(p,sp())}}}},undefined,'rgb(8,10,18)');

add('Typhoon','Weather / data story','A storm that notices you',(S,F)=>{const c=F.ctx;let P=[];
 const field=(x,y,t,W,H)=>Math.atan2(y-H/2,x-W/2)+Math.sin(Math.hypot(x-W/2,y-H/2)*.02-t*.001)*2;
 const sp=()=>({x:R(0,S.size.x),y:R(0,S.size.y),a:R(0,1)});
 return{init(){P=Array.from({length:(900*K(S))|0},sp)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,'4,10,14',.06,W,H);c.lineWidth=1;c.lineCap='round';
  for(const p of P){const a=field(p.x,p.y,t,W,H),x0=p.x,y0=p.y,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,k=d<160?(1-d/160)*(PTR.down?-4:4):0;
   p.x+=Math.cos(a)*1.8+dx/d*k;p.y+=Math.sin(a)*1.8+dy/d*k;
   c.strokeStyle=pal(170+p.a*80,85,62,.5);c.beginPath();c.moveTo(x0,y0);c.lineTo(p.x,p.y);c.stroke();
   if(p.x<0||p.x>W||p.y<0||p.y>H||Math.random()<.004)Object.assign(p,sp())}}}},undefined,'rgb(4,10,14)');

add('Gravity Well','Hero / physics toy','Hold to pull the whole system in',(S,F)=>{const c=F.ctx;let P=[];
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,2.2),l:0});
 return{init(){P=Array.from({length:(700*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,'4,6,14',.12,W,H);c.globalCompositeOperation='lighter';
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;const f=900/(d*d+900);p.vx+=(dx*.5+dy*.3)/d*f;p.vy+=(dy*.5-dx*.3)/d*f;p.vx*=.985;p.vy*=.985;
   p.x+=p.vx;p.y+=p.vy;c.fillStyle=c.strokeStyle=pal(200+p.a*80,90,65,.9);c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill();}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(4,6,14)');

add('Ember Sparks','Cursor effect','Your cursor sheds sparks',(S,F)=>{const c=F.ctx;let P=[];
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,2.5),l:0});
 return{init(){P=Array.from({length:(450*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,'8,4,2',.2,W,H);c.globalCompositeOperation='lighter';
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;if(p.l<=0){if(Math.random()<.15){const a=R(0,TAU),v=R(.5,4);p.x=m.x;p.y=m.y;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.l=R(30,90)}else continue}p.l--;p.vy+=.08;p.vx*=.99;
   p.x+=p.vx;p.y+=p.vy;c.fillStyle=c.strokeStyle=pal(15+p.a*35,100,60,Math.min(1,p.l/30));c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill();}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(8,4,2)');

add('First Snow','Seasonal banner','Push the flakes with your pointer',(S,F)=>{const c=F.ctx;let P=[];
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,3),l:0});
 return{init(){P=Array.from({length:(260*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'14,20,34',W,H);
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;p.vy=.5+p.r*.25;p.vx=Math.sin(t/900+p.a*9)*.5+(m.x/W-.5)*1.5;if(d<90){p.vx-=dx/d*2;p.vy-=dy/d*2}
   p.x+=p.vx;p.y+=p.vy;p.x=(p.x+W+20)%(W+20);p.y=(p.y+H+20)%(H+20);c.fillStyle=c.strokeStyle=pal(210+p.a*10,20,95,1);c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill();}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(14,20,34)');

add('Soap Bubbles','Kids / playful brand','Tap near a bubble to pop it',(S,F)=>{const c=F.ctx;let P=[];
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,6),l:0});
 return{init(){P=Array.from({length:(70*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'10,12,22',W,H);
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;p.vy=-(.4+p.r*.12);p.vx=Math.sin(t/700+p.a*20)*.5;if(PTR.click&&d<90)p.y=H+20;
   p.x+=p.vx;p.y+=p.vy;p.x=(p.x+W+20)%(W+20);p.y=(p.y+H+20)%(H+20);c.fillStyle=c.strokeStyle=pal(180+p.a*160,70,75,.7);c.beginPath();c.arc(p.x,p.y,p.r*4,0,TAU);c.stroke();}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(10,12,22)');

add('Confetti Cannon','Success / celebration','Tap anywhere to fire',(S,F)=>{const c=F.ctx;let P=[],tc=0;
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,4.5),l:0});
 return{init(){P=Array.from({length:(260*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'18,18,24',W,H);const burst=PTR.click||(!PTR.on&&((t/1800)|0)!==tc);if(burst)tc=(t/1800)|0;
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;if(p.l<=0){if(burst){const a=R(-2.4,-.75),v=R(4,13);p.x=PTR.on?m.x:W/2;p.y=PTR.on?m.y:H;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.l=R(90,170)}else continue}p.l--;p.vy+=.18;p.vx*=.99;
   p.x+=p.vx;p.y+=p.vy;c.fillStyle=c.strokeStyle=pal(0+p.a*360,90,62,Math.min(1,p.l/30));c.fillRect(p.x,p.y,p.r*2.2,p.r*1.2*Math.cos(t/90+p.a*9));}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(18,18,24)');

add('Lantern Moths','Atmospheric hero','Moths drift toward your light',(S,F)=>{const c=F.ctx;let P=[];
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,2.5),l:0});
 return{init(){P=Array.from({length:(160*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,'4,5,10',.15,W,H);c.globalCompositeOperation='lighter';
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;p.vx=(p.vx+R(-.3,.3))*.95;p.vy=(p.vy+R(-.3,.3))*.95;if(d<160){p.vx+=dx/d*.12;p.vy+=dy/d*.12}
   p.x+=p.vx;p.y+=p.vy;p.x=(p.x+W+20)%(W+20);p.y=(p.y+H+20)%(H+20);c.fillStyle=c.strokeStyle=pal(45+p.a*20,100,68,1);c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.fill();}
  c.globalCompositeOperation='source-over'}}},undefined,'rgb(4,5,10)');
