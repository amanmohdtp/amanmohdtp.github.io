// Nature and calm. One scene per block. Add yours the same way.

T5('Melting Text','Text','MELT');
sc5('Melting Text','Poster / event hero','Hot letters sag and drip, then freeze back','#14100e',(S,F)=>{const c=F.ctx;let o=null,k='',yt=0,yb=0,dr=[];
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0,w=TX.word||' ',key=w+W+H;
  if(k!==key){k=key;o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d'),s=fitS(x,w,q=>`400 ${q}px Anton,Impact,sans-serif`,W*.86,H*.5);x.font=`400 ${s}px Anton,Impact,sans-serif`;x.textAlign='center';x.textBaseline='middle';
   const g=x.createLinearGradient(0,H/2-s/2,0,H/2+s/2);g.addColorStop(0,'#ffd36b');g.addColorStop(1,'#ff4d2e');x.fillStyle=g;x.fillText(w,W/2,H/2);yt=Math.max(0,H/2-s*.55);yb=Math.min(H,H/2+s*.55);
   dr=Array.from({length:Math.ceil(W/3)},(_,i)=>.35+.65*Math.abs(Math.sin(i*.37)*Math.cos(i*.11+1.3)))}
  const cy=(t%9000)/9000,mt=cy<.12?0:cy<.58?ease((cy-.12)/.46):cy<.74?1:1-ease((cy-.74)/.26),s=yb-yt;paint(c,'20,16,14',W,H);
  const g2=c.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.6);g2.addColorStop(0,`rgba(255,90,40,${.12+mt*.1})`);g2.addColorStop(1,'rgba(255,90,40,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  c.fillStyle=`rgba(255,100,40,${mt*.85})`;c.beginPath();c.ellipse(W/2,yb+s*.12,W*.4*mt,s*.07*mt+.1,0,0,TAU);c.fill();
  for(let i=0;i<dr.length;i++){const x=i*3,d=dr[i];c.globalAlpha=1-mt*.2;c.drawImage(o,x,yt,3,yb-yt,x,yt+mt*d*s*.2,3,(yb-yt)*(1+mt*d*.9))}c.globalAlpha=1}}});

T5('Beach Wave','Text','hello');
sc5('Beach Wave','Travel / summer brand','Words written in sand, erased by the tide, written again','#d4b87c',(S,F)=>{const c=F.ctx;let sand=null,tp=null,tw=null,k='',lastC=1,wet=0;
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0,w=TX.word||' ',key=w+W+H;
  if(k!==key){k=key;sand=document.createElement('canvas');sand.width=W;sand.height=H;const s=sand.getContext('2d'),g=s.createLinearGradient(0,0,0,H);g.addColorStop(0,'#d8bd88');g.addColorStop(1,'#c9a86a');s.fillStyle=g;s.fillRect(0,0,W,H);
   for(let i=0;i<W*H/14;i++){s.fillStyle=Math.random()<.5?'rgba(255,240,200,.22)':'rgba(120,90,50,.18)';s.fillRect(Math.random()*W,Math.random()*H,1.2,1.2)}
   tp=document.createElement('canvas');tp.width=W;tp.height=H;const x=tp.getContext('2d'),fs=fitS(x,w,q=>`700 ${q}px Caveat,cursive`,W*.8,H*.34);x.font=`700 ${fs}px Caveat,cursive`;x.textAlign='center';x.textBaseline='middle';
   x.fillStyle='rgba(255,246,215,.65)';x.fillText(w,W/2+2,H*.56+2);x.fillStyle='rgba(105,75,38,.7)';x.fillText(w,W/2,H*.56);tw=document.createElement('canvas');tw.width=W;tw.height=H}
  const cy=(t%12000)/12000,L=tw.getContext('2d');if(cy<lastC){L.clearRect(0,0,W,H);L.drawImage(tp,0,0);wet=0}lastC=cy;
  const Y=H*.1+(cy<.2?0:cy<.42?ease((cy-.2)/.22):cy<.5?1:Math.max(0,1-ease((cy-.5)/.3)))*H*.66,edge=x=>Y+Math.sin(x*.02+t*.002)*H*.012+Math.sin(x*.05-t*.003)*H*.006;wet=Math.max(wet,Y);
  c.drawImage(sand,0,0);const fade=Math.min(1,cy/.12);c.globalAlpha=fade;c.drawImage(tw,0,0);c.globalAlpha=1;
  if(cy>.2&&cy<.55){L.globalCompositeOperation='destination-out';L.beginPath();L.moveTo(0,0);for(let x=0;x<=W;x+=8)L.lineTo(x,edge(x)+H*.02);L.lineTo(W,0);L.fill();L.globalCompositeOperation='source-over'}
  const dry=cy>.78?1-(cy-.78)/.22:1;c.fillStyle=`rgba(70,48,20,${.3*dry})`;c.fillRect(0,0,W,wet);
  c.beginPath();c.moveTo(0,0);for(let x=0;x<=W;x+=8)c.lineTo(x,edge(x));c.lineTo(W,0);c.closePath();const g=c.createLinearGradient(0,Math.max(0,Y-H*.2),0,Y+4);g.addColorStop(0,'rgba(10,110,130,.96)');g.addColorStop(.75,'rgba(60,190,200,.85)');g.addColorStop(1,'rgba(205,245,240,.6)');c.fillStyle=g;c.fill();
  c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=3;c.beginPath();for(let x=0;x<=W;x+=8)c[x?'lineTo':'moveTo'](x,edge(x));c.stroke();
  c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=1.5;for(let j=1;j<4;j++){c.beginPath();for(let x=0;x<=W;x+=8)c[x?'lineTo':'moveTo'](x,edge(x)-j*H*.03+Math.sin(x*.04+j+t*.002)*3);c.stroke()}
  c.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<60;i++){const x=hash(i)*W,y=hash(i+90)*Y*.95,a=Math.sin(t*.003+i*3);if(a>.6)c.fillRect(x,y,3,1)}}}});

T5('Cloud Go','Text','GO');
sc5('Cloud Go','Intro / launch page','Clouds drift, one spells your word, then the camera dives into the sky','#2f7ed8',(S,F)=>{const c=F.ctx;let sp=null,sh=null,Bg=[],T=[],k='';
 const mkS=(col)=>{const o=document.createElement('canvas');o.width=o.height=64;const x=o.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,col+'1)');g.addColorStop(.55,col+'.6)');g.addColorStop(1,col+'0)');x.fillStyle=g;x.fillRect(0,0,64,64);return o};
 return{init(){sp=mkS('rgba(255,255,255,');sh=mkS('rgba(150,175,215,');Bg=[];for(let i=0;i<9;i++){const d=R(.15,.9),cx=R(0,1),cy=R(.08,.8),n=12;for(let j=0;j<n;j++)Bg.push({x:cx+R(-.09,.09)*(1.3-d),y:cy+R(-.02,.03),r:R(.04,.09)*(1.3-d),d,v:R(.00001,.00003)*(1.2-d)*.6,off:R(0,9)})}},
 frame(t){const W=S.size.x|0,H=S.size.y|0,w=TX.word||' ',key=w+W+H;
  if(k!==key){k=key;const o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d'),fs=fitS(x,w,q=>`700 ${q}px Fredoka,"Arial Rounded MT Bold",sans-serif`,W*.6,H*.42);x.font=`700 ${fs}px Fredoka,"Arial Rounded MT Bold",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(w,W/2,H*.46);
   const st=Math.max(6,Math.round(W/46)),d=x.getImageData(0,0,W,H).data;T=[];for(let y=0;y<H;y+=st)for(let xx=0;xx<W;xx+=st)if(d[(y*W+xx)*4+3]>128)T.push({tx:xx/W,ty:y/H,sx:.2+R(-.1,.1),sy:.3+R(-.06,.06),r:st*1.05/W,o:R(0,9)})}
  const cy=(t%16000)/16000,mo=cy<.22?0:cy<.45?ease((cy-.22)/.23):1,zs=cy<.58?0:Math.min(1,(cy-.58)/.32),Z=Math.pow(16,zs),white=cy>.82&&cy<.93?(cy-.82)/.11:cy>=.93?1-(cy-.93)/.07:0,drift=Math.min(cy,.45)*.25,sd=W/2,sc=H*.46;
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1c5fc4');g.addColorStop(.7,'#6fb2f5');g.addColorStop(1,'#cfe8ff');c.fillStyle=g;c.fillRect(0,0,W,H);
  const g2=c.createRadialGradient(W*.8,H*.18,0,W*.8,H*.18,W*.5);g2.addColorStop(0,'rgba(255,245,200,.55)');g2.addColorStop(1,'rgba(255,245,200,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  const P=[];for(const b of Bg){const dl=1+(Z-1)*b.d,x=((b.x+b.v*t)%1.2-.1)*W,y=b.y*H;P.push({x:sd+(x-sd)*dl,y:sc+(y-sc)*dl,r:b.r*W*dl,a:.5*(1-b.d*.3),z:b.d})}
  for(const q of T){const x=(q.sx+drift)*W+(q.tx-q.sx-drift)*W*mo,y=q.sy*H+(q.ty-q.sy)*H*mo,wob=1+.1*Math.sin(t*.0012+q.o);P.push({x:sd+(x-sd)*Z,y:sc+(y-sc)*Z,r:q.r*W*Z*wob*(.9+.5*(1-mo)),a:.7,z:1.2})}
  P.sort((a,b)=>a.z-b.z);c.globalAlpha=1;for(const p of P){if(p.x<-p.r*2||p.x>W+p.r*2||p.y<-p.r*2||p.y>H+p.r*2)continue;c.globalAlpha=p.a*.7;c.drawImage(sh,p.x-p.r,p.y-p.r+p.r*.22,p.r*2,p.r*2)}
  for(const p of P){if(p.x<-p.r*2||p.x>W+p.r*2||p.y<-p.r*2||p.y>H+p.r*2)continue;c.globalAlpha=p.a;c.drawImage(sp,p.x-p.r,p.y-p.r,p.r*2,p.r*2)}
  c.globalAlpha=1;if(white>0){c.fillStyle=`rgba(255,255,255,${white})`;c.fillRect(0,0,W,H)}}}});

sc4('Ocean Bands','Footer / calm hero','Layered waves, pointer height sets the swell','#06101c',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'6,16,28',W,H);
  for(let i=0;i<7;i++){const y0=H*(.35+i*.1),amp=H*.035*(1+i*.2)*(.6+(1-m.y/H));c.beginPath();c.moveTo(0,H);
   for(let x=0;x<=W+8;x+=8)c.lineTo(x,y0+Math.sin(x*.01*(1+i*.1)+t*6e-4*(1+i*.2)+m.x*.004*i)*amp+Math.sin(x*.023-t*9e-4)*amp*.4);
   c.lineTo(W,H);c.fillStyle=`hsl(${200+i*6},70%,${14+i*5}%)`;c.fill()}}}});

sc4('Rain Ripples','Weather / calm brand','Click to drop a stone','#06101a',(S,F)=>{const c=F.ctx;let Rp=[];
 return{init(){Rp.push({x:S.size.x*.5,y:S.size.y*.55,t0:0,h:195})},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),mr=Math.min(W,H)*.35;paint(c,'6,16,26',W,H);
  if(Math.random()<.035||(PTR.on&&PTR.sp>8&&Math.random()<.25))Rp.push({x:Math.random()*W,y:Math.random()*H,t0:t,h:190+R(-15,15)});
  if(PTR.click)Rp.push({x:m.x,y:m.y,t0:t,h:200});Rp=Rp.filter(r=>t-r.t0<2400);c.lineWidth=1.4;
  for(const r of Rp){const age=(t-r.t0)/2400;for(let k=0;k<3;k++){const rad=age*mr-k*10;if(rad>0){c.strokeStyle=pal(r.h,70,70,(1-age)*(1-k*.3));c.beginPath();c.arc(r.x,r.y,rad,0,TAU);c.stroke()}}}}}});

sc4('Soft Gradients','Brand hero / SaaS','Colour clouds, one follows your pointer','#0a0a12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),rr=Math.min(W,H)*.6;paint(c,'10,10,18',W,H);c.globalCompositeOperation='lighter';
  for(let i=0;i<5;i++){const x=i?W/2+Math.cos(t*2.5e-4*(i+1)+i*2)*W*.35:m.x,y=i?H/2+Math.sin(t*3e-4*(i+1)+i)*H*.3:m.y,g=c.createRadialGradient(x,y,0,x,y,rr);g.addColorStop(0,pal(i*70+200,90,58,.55));g.addColorStop(1,pal(i*70+200,90,40,0));c.fillStyle=g;c.fillRect(0,0,W,H)}c.globalCompositeOperation='source-over'}}});
