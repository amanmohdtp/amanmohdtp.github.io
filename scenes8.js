// Grids and patterns. One scene per block. Add yours the same way.

add('Breathing Grid','Idle / empty state','Dots swell like a lung; your pointer parts them',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,g=Math.max(16,Math.round(Math.min(W,H)/14)),m=A(t,W,H);paint(c,'10,12,18',W,H);
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){
   const d=Math.hypot(x-W/2,y-H/2),k=.5+.5*Math.sin(d*.018*26/g-t*.0022),dx=x-m.x,dy=y-m.y,mm=Math.hypot(dx,dy),f=Math.max(0,1-mm/(g*6))*g*1.3;
   c.fillStyle=`hsl(${160+k*70},70%,${35+k*35}%)`;c.beginPath();c.arc(x+dx/(mm||1)*f,y+dy/(mm||1)*f,(1+k*5)*g/26,0,TAU);c.fill()}}}});

add('Halftone Gaze','Print / editorial hero','Dots swell where you look',(S,F)=>{const c=F.ctx,g=18;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'12,10,10',W,H);c.lineWidth=2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/300);
   c.fillStyle=c.strokeStyle=pal(20+d*.1,90,60);c.beginPath();
   c.arc(x,y,g*.48*Math.max(.06,u),0,TAU);c.fill();}}}},undefined,'rgb(12,10,10)');

add('Watching Eyes','Playful hero','Every needle tracks you',(S,F)=>{const c=F.ctx,g=30;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'10,10,12',W,H);c.lineWidth=2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/300);
   c.fillStyle=c.strokeStyle=pal(0+d*.1,0,90);c.beginPath();
   const a=Math.atan2(dy,dx)+Math.PI;c.moveTo(x,y);c.lineTo(x+Math.cos(a)*g*.45,y+Math.sin(a)*g*.45);c.stroke();}}}},undefined,'rgb(10,10,12)');

add('Spin Mosaic','Creative studio','Tiles twirl around your cursor',(S,F)=>{const c=F.ctx,g=26;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'8,6,16',W,H);c.lineWidth=2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/220);
   c.fillStyle=c.strokeStyle=pal(260+d*.1,80,65);c.beginPath();
   const a=(x+y)*.01+t*.001+u*4;c.moveTo(x-Math.cos(a)*g*.4,y-Math.sin(a)*g*.4);c.lineTo(x+Math.cos(a)*g*.4,y+Math.sin(a)*g*.4);c.stroke();}}}},undefined,'rgb(8,6,16)');

add('Pixel Tide','Game / retro brand','Square pixels rise and fall',(S,F)=>{const c=F.ctx,g=20;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'10,6,12',W,H);c.lineWidth=2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/200);
   c.fillStyle=c.strokeStyle=pal(300+d*.1,80,62);c.beginPath();
   const r=g*.9*(.5+.5*Math.sin(x*.03+t*.001)*Math.cos(y*.03-t*.0013+u*3));c.fillRect(x-r/2,y-r/2,r,r);}}}},undefined,'rgb(10,6,12)');

add('Warp Lens','Image / gallery hover','A lens bends the dot field',(S,F)=>{const c=F.ctx,g=16;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'4,8,14',W,H);c.lineWidth=2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/200);
   c.fillStyle=c.strokeStyle=pal(190+d*.1,85,65);c.beginPath();
   c.arc(x+dx/d*u*u*30,y+dy/d*u*u*30,1.5+u*3,0,TAU);c.fill();}}}},undefined,'rgb(4,8,14)');

sc4('Hex Pulse','Dashboard / honeycomb section','Waves roll out from your pointer','#08080e',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),h=Math.max(14,Math.min(W,H)/12),sq=Math.sqrt(3);paint(c,'8,8,14',W,H);
  for(let i=-1;i*h*1.5<W+h;i++)for(let j=-1;j*h*sq<H+h;j++){const x=i*h*1.5,y=j*h*sq+(i&1?h*sq/2:0),v=Math.sin(Math.hypot(x-m.x,y-m.y)*.025-t*.003)*.5+.5,rr=h*.92*(.35+.65*v);
   c.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;c[k?'lineTo':'moveTo'](x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath();c.fillStyle=pal(180+v*140,80,32+v*30);c.fill()}}}});

add('Truchet Maze','Pattern / background','Hover tiles to flip the maze',(S,F)=>{const c=F.ctx,g=44;let st={},cd={};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);c.fillStyle='rgb(6,8,14)';c.fillRect(0,0,W,H);c.lineWidth=3;c.lineCap='round';c.strokeStyle=pal(190,80,62);
  for(let i=0;i*g<W;i++)for(let j=0;j*g<H;j++){const x=i*g,y=j*g,k=i+','+j,near=Math.hypot(x+g/2-m.x,y+g/2-m.y)<g*.9;
   if(st[k]===undefined)st[k]=(Math.sin(i*12.9+j*78.2)*437.5)%1>0;if(near&&!cd[k]){st[k]=!st[k];cd[k]=1}else if(!near)cd[k]=0;
   c.beginPath();if(st[k]){c.arc(x,y,g/2,0,Math.PI/2);c.moveTo(x+g,y+g/2);c.arc(x+g,y+g,g/2,Math.PI,Math.PI*1.5)}
   else{c.arc(x+g,y,g/2,Math.PI/2,Math.PI);c.moveTo(x+g/2,y+g);c.arc(x,y+g,g/2,Math.PI*1.5,TAU)}c.stroke()}}}},undefined,'rgb(6,8,14)');
