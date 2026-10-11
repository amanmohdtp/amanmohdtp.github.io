// Each scene = { name, use (the real-world situation), hint, make(space, form) -> {init, frame(t,dt)} }
const {Pt,Group}=Pts;
const TAU=Math.PI*2,R=(a,b)=>a+Math.random()*(b-a),ease=x=>1-Math.pow(1-x,3);
const SCENES=[];
const add=(name,use,hint,make)=>SCENES.push({name,use,hint,make});
const wash=(c,col,a,W,H)=>{c.fillStyle=`rgba(${col},${a})`;c.fillRect(0,0,W,H)};

add('Murmuration','Hero background','Move your pointer — the flock follows',(S,F)=>{
 let b=[];const c=F.ctx;
 return{init(){b=Array.from({length:240},()=>({p:new Pt(R(0,S.size.x),R(0,S.size.y)),v:new Pt(R(-2,2),R(-2,2))}))},
 frame(t){const W=S.size.x,H=S.size.y;wash(c,'8,10,18',.16,W,H);
  const T=PTR.on?new Pt(PTR.x,PTR.y):new Pt(W/2+Math.cos(t/2000)*W/3,H/2+Math.sin(t/1300)*H/3);
  for(const a of b){const al=new Pt(0,0),s=new Pt(0,0);let n=0;
   for(const o of b){if(o===a)continue;const d=a.p.$subtract(o.p),l=d.magnitude();
    if(l<70){n++;al.add(o.v);if(l<20)s.add(d.$multiply(1/(l+1)))}}
   if(n)a.v.add(al.divide(n).subtract(a.v).multiply(.06));
   a.v.add(s.multiply(.35)).add(T.$subtract(a.p).multiply(.0004));
   a.v.divide(a.v.magnitude()||1).multiply(2.8);a.p.add(a.v);
   if(a.p.x<0)a.p.x=W;if(a.p.x>W)a.p.x=0;if(a.p.y<0)a.p.y=H;if(a.p.y>H)a.p.y=0;
   F.strokeOnly(`hsla(${185+a.p.x/W*60},90%,70%,.9)`,1.3).line([a.p,a.p.$subtract(a.v.$multiply(5))])}}}});

add('Ink Wander','Cursor trail / editorial hero','Move or drag — ink follows the flow field',(S,F)=>{
 let P=[];const c=F.ctx;
 return{init(){c.fillStyle='#f1ebdd';c.fillRect(0,0,S.size.x,S.size.y)},
 frame(t){const W=S.size.x,H=S.size.y;wash(c,'241,235,221',.012,W,H);
  const sx=PTR.on?PTR.x:W/2+Math.sin(t/900)*W/3,sy=PTR.on?PTR.y:H/2+Math.cos(t/1100)*H/3;
  for(let i=0;i<4;i++)P.push({p:new Pt(sx+R(-6,6),sy+R(-6,6)),a:0,h:R(0,25)});
  P=P.filter(q=>q.a<260);
  for(const q of P){const ang=(Math.sin(q.p.x*.004+t*.0003)+Math.cos(q.p.y*.005-t*.0002))*Math.PI;
   const o=q.p.clone();q.p.add(Math.cos(ang)*1.6,Math.sin(ang)*1.6);q.a++;
   F.strokeOnly(`hsla(${q.h},70%,${14+q.a/6}%,${.55-q.a/600})`,Math.max(.4,2.4-q.a/110)).line([o,q.p])}}}});

add('Tidal Ridge','Section divider / data hero','Touch the surface to send ripples',(S,F)=>{
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y;F.ctx.fillStyle='#0a0c14';F.ctx.fillRect(0,0,W,H);
  const px=PTR.on?PTR.x:W/2+Math.sin(t/1500)*W/3,py=PTR.on?PTR.y:H*.55,rows=34;
  for(let i=0;i<rows;i++){const y0=H*.18+i*(H*.7/rows),g=[];
   for(let x=-10;x<=W+10;x+=10){const d=Math.hypot(x-px,y0-py),r=Math.exp(-d*d/26000)*Math.sin(d*.05-t*.006)*34;
    g.push(new Pt(x,y0+Math.sin(x*.012+t*.0009+i*.35)*10+Math.sin(x*.03-t*.0013)*4+r))}
   g.push(new Pt(W+10,H+20),new Pt(-10,H+20));
   F.fill('#0a0c14').stroke(`hsla(${200+i*3},60%,${55+i}%,.9)`,1.2).polygon(g)}}}});

add('Orbit Loader','Loading screen','Click to restart the sequence',(S,F)=>{
 let t0=0;
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(PTR.click)t0=t;const u=((t-t0)/45)%100;
  c.fillStyle='rgba(8,10,18,.2)';c.fillRect(0,0,W,H);const cx=W/2,cy=H/2;
  for(let i=0;i<7;i++){const r=46+i*24;F.strokeOnly('#ffffff14',1).circle([[cx,cy],[r,r]]);
   for(let k=0;k<14;k++){const a=(t/1000)*(1.1+i*.35)*(i%2?-1:1)-k*.07;
    F.fillOnly(`hsla(${30+i*38},90%,65%,${1-k/14})`).point(new Pt(cx+Math.cos(a)*r,cy+Math.sin(a)*r),4-k*.25,'circle')}}
  c.fillStyle='#e9e6df';c.font='600 22px ui-serif,Georgia,serif';c.textAlign='center';c.fillText(Math.floor(u)+'%',cx,cy+7)}}});

add('Constellation','Pricing / feature grid backdrop','Your pointer becomes a star',(S,F)=>{
 let P=[];const c=F.ctx;
 return{init(){P=Array.from({length:110},()=>({p:new Pt(R(0,S.size.x),R(0,S.size.y)),v:new Pt(R(-.3,.3),R(-.3,.3))}))},
 frame(t){const W=S.size.x,H=S.size.y;c.fillStyle='#070914';c.fillRect(0,0,W,H);
  const all=P.map(q=>q.p);if(PTR.on)all.push(new Pt(PTR.x,PTR.y));
  for(const q of P){q.p.add(q.v);if(q.p.x<0||q.p.x>W)q.v.x*=-1;if(q.p.y<0||q.p.y>H)q.v.y*=-1}
  for(let i=0;i<all.length;i++){for(let j=i+1;j<all.length;j++){const d=all[i].$subtract(all[j]).magnitude();
    if(d<130)F.strokeOnly(`rgba(150,190,255,${(1-d/130)*.55})`,1).line([all[i],all[j]])}
   F.fillOnly('#cfe0ff').point(all[i],i==P.length?4:1.8,'circle')}}}});

add('Success Burst','Form submitted / payment complete','Click anywhere to celebrate',(S,F)=>{
 let B=[];
 const boom=(x,y,t)=>B.push({x,y,t,h:R(0,360),s:Array.from({length:42},(_,i)=>({a:i/42*TAU+R(-.1,.1),l:R(60,170)}))});
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;wash(c,'8,10,18',.22,W,H);
  if(PTR.click)boom(PTR.x,PTR.y,t);if(!B.length||t-B[B.length-1].t>2200)boom(W/2+R(-80,80),H/2+R(-80,80),t);
  B=B.filter(b=>t-b.t<1800);
  for(const b of B){const u=(t-b.t)/1800,e=ease(u);
   F.strokeOnly(`hsla(${b.h},90%,70%,${1-u})`,2*(1-u)).circle([[b.x,b.y],[e*220,e*220]]);
   for(const s of b.s){const r0=e*s.l*.6,r1=e*s.l+8;
    F.strokeOnly(`hsla(${b.h+s.a*20},95%,68%,${1-u})`,2.2*(1-u)).line([new Pt(b.x+Math.cos(s.a)*r0,b.y+Math.sin(s.a)*r0),new Pt(b.x+Math.cos(s.a)*r1,b.y+Math.sin(s.a)*r1)])}}}}});

add('Moiré Drift','Section transition / art-directed hero','Two rings of lines. Let them argue.',(S,F)=>{
 const ring=(x,y,col)=>{const c=F.ctx;c.strokeStyle=col;c.lineWidth=1;c.beginPath();
  for(let i=1;i<90;i++){c.moveTo(x+i*9,y);c.arc(x,y,i*9,0,TAU)}c.stroke()};
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y;F.ctx.fillStyle='#0b0b0f';F.ctx.fillRect(0,0,W,H);
  ring(W/2,H/2,'rgba(255,120,90,.55)');
  ring(PTR.on?PTR.x:W/2+Math.cos(t/1700)*W*.22,PTR.on?PTR.y:H/2+Math.sin(t/1300)*H*.22,'rgba(90,200,255,.55)')}}});

add('Breathing Grid','Idle / empty state','Dots swell like a lung; your pointer parts them',(S,F)=>{
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y,g=26;F.ctx.fillStyle='#0a0c12';F.ctx.fillRect(0,0,W,H);
  const px=PTR.on?PTR.x:-999,py=PTR.on?PTR.y:-999;
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){
   const d=Math.hypot(x-W/2,y-H/2),k=.5+.5*Math.sin(d*.018-t*.0022);
   const dx=x-px,dy=y-py,m=Math.hypot(dx,dy),f=Math.max(0,1-m/150)*34;
   F.fillOnly(`hsl(${160+k*70},70%,${35+k*35}%)`).point(new Pt(x+dx/(m||1)*f,y+dy/(m||1)*f),1+k*5,'circle')}}}});

add('Signal Lost','404 page','Click to glitch it harder',(S,F)=>{
 let boost=0;
 return{init(){},
 frame(t){const W=S.size.x,H=S.size.y,c=F.ctx;if(PTR.click)boost=1;boost*=.94;
  const g=(Math.sin(t/700)>.88?1:.08)+boost*2;c.fillStyle='#07080b';c.fillRect(0,0,W,H);
  c.textAlign='center';c.font=`700 ${Math.min(W*.3,220)}px ui-monospace,Menlo,monospace`;
  [['#ff2a55',-1],['#2affd5',1],['#fff',0]].forEach(([col,s])=>{c.fillStyle=col;c.globalCompositeOperation=s?'lighter':'source-over';
   c.fillText('404',W/2+s*g*9+R(-g,g)*3,H/2+20+R(-g,g)*2)});
  c.globalCompositeOperation='source-over';
  for(let i=0;i<Math.floor(g*10);i++){const y=R(0,H),h=R(1,10),off=R(-40,40)*g;
   c.drawImage(c.canvas,0,y*devicePixelRatio,c.canvas.width,h*devicePixelRatio,off,y,W,h)}
  for(let y=0;y<H;y+=3){c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,y,W,1)}
  c.fillStyle='#8a8d99';c.font='13px ui-monospace,monospace';c.fillText('signal lost — this page drifted out of orbit',W/2,H/2+70)}}});
