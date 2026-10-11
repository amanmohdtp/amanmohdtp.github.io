// Shared helpers and the first two scenes. Each scene: add(name, use, hint, make(space, form) -> {init, frame(t)})
// Space gives { size:{x,y} }, form gives { ctx } (a 2D canvas context). PTR is the pointer, TX holds editable text.
const Pt=(window.Pts&&Pts.Pt)||class{constructor(x=0,y=0){this.x=x;this.y=y}
 $subtract(o){return new Pt(this.x-o.x,this.y-o.y)}add(o){this.x+=o.x;this.y+=o.y;return this}
 multiply(k){this.x*=k;this.y*=k;return this}magnitude(){return Math.hypot(this.x,this.y)}};
const TAU=Math.PI*2,R=(a,b)=>a+Math.random()*(b-a),ease=x=>1-Math.pow(1-x,3);
const FONT='Syne,"Helvetica Neue",sans-serif',SERIF='Fraunces,Georgia,serif',MONO='"JetBrains Mono",ui-monospace,monospace';
const SCENES=[],TEXTS={};
const add=(name,use,hint,make,src,bg)=>SCENES.push({name,use,hint,make,src:src||make.toString(),bg});
const wash=(c,col,a,W,H)=>{c.fillStyle=`rgba(${col},${a})`;c.fillRect(0,0,W,H)};
const paint=(c,col,W,H)=>{c.fillStyle=`rgb(${col})`;c.fillRect(0,0,W,H)};
const A=(t,W,H)=>PTR.on?PTR:{x:W/2+Math.sin(t/1100)*W*.32,y:H/2+Math.cos(t/900)*H*.28};
const K=S=>Math.min(1,S.size.x*S.size.y/650000);
const pal=(h,s,l,a=1)=>`hsla(${h%360},${s}%,${l}%,${a})`;
const rgb=o=>`rgb(${o.bg})`;
const fitS=(c,str,tpl,maxW,maxH)=>{c.font=tpl(100);const w=c.measureText(str||' ').width||1;return Math.max(6,Math.min(100*maxW/w,maxH))};

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

add('Breathing Grid','Idle / empty state','Dots swell like a lung; your pointer parts them',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,g=Math.max(16,Math.round(Math.min(W,H)/14)),m=A(t,W,H);paint(c,'10,12,18',W,H);
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){
   const d=Math.hypot(x-W/2,y-H/2),k=.5+.5*Math.sin(d*.018*26/g-t*.0022),dx=x-m.x,dy=y-m.y,mm=Math.hypot(dx,dy),f=Math.max(0,1-mm/(g*6))*g*1.3;
   c.fillStyle=`hsl(${160+k*70},70%,${35+k*35}%)`;c.beginPath();c.arc(x+dx/(mm||1)*f,y+dy/(mm||1)*f,(1+k*5)*g/26,0,TAU);c.fill()}}}});
