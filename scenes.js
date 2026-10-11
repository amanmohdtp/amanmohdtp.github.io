// Each scene = { name, use (the real-world situation), hint, make(space, form) -> {init, frame(t,dt)} }
const {Pt,Group}=Pts;
const TAU=Math.PI*2,R=(a,b)=>a+Math.random()*(b-a),ease=x=>1-Math.pow(1-x,3);
const SCENES=[];
const add=(name,use,hint,make,src,bg)=>SCENES.push({name,use,hint,make,src:src||make.toString(),bg});
const wash=(c,col,a,W,H)=>{c.fillStyle=`rgba(${col},${a})`;c.fillRect(0,0,W,H)};

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
  c.textAlign='center';c.font=`700 ${Math.min(W*.3,220)}px ${MONO}`;
  [['#ff2a55',-1],['#2affd5',1],['#fff',0]].forEach(([col,s])=>{c.fillStyle=col;c.globalCompositeOperation=s?'lighter':'source-over';
   c.fillText('404',W/2+s*g*9+R(-g,g)*3,H/2+20+R(-g,g)*2)});
  c.globalCompositeOperation='source-over';
  for(let i=0;i<Math.floor(g*10);i++){const y=R(0,H),h=R(1,10),off=R(-40,40)*g;
   c.drawImage(c.canvas,0,y*devicePixelRatio,c.canvas.width,h*devicePixelRatio,off,y,W,h)}
  for(let y=0;y<H;y+=3){c.fillStyle='rgba(0,0,0,.25)';c.fillRect(0,y,W,1)}
  c.fillStyle='#8a8d99';c.font=`13px ${MONO}`;c.fillText('signal lost — this page drifted out of orbit',W/2,H/2+70)}}});
