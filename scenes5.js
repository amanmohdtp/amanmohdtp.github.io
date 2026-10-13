// Images (cat.png). One scene per block. Add yours the same way.

sc5('Cat Pixels','Mascot / portfolio hero','Pixels fly in to build the cat, push them with your pointer','#101016',(S,F)=>{const c=F.ctx,im=IMG('cat.png');let P=[],k='';
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0,m=A(t,W,H);paint(c,'16,16,22',W,H);if(noImg(c,im,W,H,'cat.png'))return;
  if(k!==W+'x'+H){k=W+'x'+H;const f=fitImg(im.img,W,H),o=document.createElement('canvas');o.width=W;o.height=H;const x=o.getContext('2d');x.drawImage(im.img,f.x,f.y,f.w,f.h);let d;
   try{d=x.getImageData(0,0,W,H).data}catch(e){P=null;return}
   const st=Math.max(3,Math.round(Math.min(W,H)/70));P=[];for(let y=0;y<H;y+=st)for(let xx=0;xx<W;xx+=st){const i=(y*W+xx)*4;if(d[i+3]>60)P.push({hx:xx,hy:y,sx:R(0,W),sy:R(0,H),x:R(0,W),y:R(0,H),vx:0,vy:0,col:`rgb(${d[i]},${d[i+1]},${d[i+2]})`,s:st})}}
  if(!P){c.fillStyle='#8a8d99';c.font=`13px ${MONO}`;c.textAlign='center';c.fillText('Open the site through a web server',W/2,H/2);return}
  const ph=(t%10000)/10000,sc=ph>.68&&ph<.82;
  for(const p of P){p.vx+=((sc?p.sx:p.hx)-p.x)*.04;p.vy+=((sc?p.sy:p.hy)-p.y)*.04;
   if(PTR.on){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;if(d<80){p.vx+=dx/d*(1-d/80)*2.5;p.vy+=dy/d*(1-d/80)*2.5}}
   p.vx*=.85;p.vy*=.85;p.x+=p.vx;p.y+=p.vy;c.fillStyle=p.col;c.fillRect(p.x,p.y,p.s*.9,p.s*.9)}}}});

sc5('Cat Underwater','Pet / mascot brand','Seen through moving water, ripples follow your pointer','#0b3a4a',(S,F)=>{const c=F.ctx,im=IMG('cat.png');
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0e5a6e');g.addColorStop(1,'#06232e');c.fillStyle=g;c.fillRect(0,0,W,H);
  if(noImg(c,im,W,H,'cat.png'))return;const f=fitImg(im.img,W,H,.82),sh=Math.max(1,Math.round(H/260));
  for(let y=0;y<f.h;y+=sh){const yy=f.y+y,d=Math.hypot(f.x+f.w/2-m.x,yy-m.y),rip=Math.exp(-d*d/(2*(W*.18)**2))*Math.sin(d*.06-t*.006)*10,dx=Math.sin(yy*.04+t*.0026)*(3+W*.006)+Math.sin(yy*.011-t*.0017)*4+rip;
   c.drawImage(im.img,0,y/f.h*im.img.height,im.img.width,sh/f.h*im.img.height+.5,f.x+dx,yy,f.w,sh+.5)}
  c.fillStyle='rgba(20,110,150,.28)';c.fillRect(0,0,W,H);c.globalCompositeOperation='lighter';c.strokeStyle='rgba(180,255,255,.07)';c.lineWidth=2;
  for(let i=0;i<14;i++){c.beginPath();for(let x=0;x<=W;x+=10)c.lineTo(x,H*(i/14)+Math.sin(x*.02+t*.001*(1+i%3)+i)*14+Math.sin(x*.05-t*.0013)*6);c.stroke()}c.globalCompositeOperation='source-over'}}});

sc5('Cat Spotlight','Mystery / reveal section','A lantern roams the dark and reveals the cat','#05060a',(S,F)=>{const c=F.ctx,im=IMG('cat.png');let lay=null,lk='';const D=Array.from({length:70},()=>({x:Math.random(),y:Math.random(),v:R(.2,.8)}));
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);paint(c,'5,6,10',W,H);if(noImg(c,im,W,H,'cat.png'))return;const f=fitImg(im.img,W,H,.9),cw=c.canvas.width,dp=cw/W,key=cw+'x'+c.canvas.height;
  if(lk!==key){lk=key;lay=document.createElement('canvas');lay.width=cw;lay.height=c.canvas.height}
  const l=lay.getContext('2d'),r=Math.min(W,H)*.32;l.setTransform(dp,0,0,dp,0,0);l.globalCompositeOperation='source-over';l.clearRect(0,0,W,H);l.drawImage(im.img,f.x,f.y,f.w,f.h);
  l.globalCompositeOperation='destination-in';const g=l.createRadialGradient(m.x,m.y,r*.1,m.x,m.y,r);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.6,'rgba(0,0,0,.85)');g.addColorStop(1,'rgba(0,0,0,0)');l.fillStyle=g;l.fillRect(0,0,W,H);
  c.globalAlpha=.07;c.drawImage(im.img,f.x,f.y,f.w,f.h);c.globalAlpha=1;c.drawImage(lay,0,0,W,H);
  c.globalCompositeOperation='lighter';const g2=c.createRadialGradient(m.x,m.y,0,m.x,m.y,r*1.2);g2.addColorStop(0,'rgba(255,220,150,.22)');g2.addColorStop(1,'rgba(255,200,120,0)');c.fillStyle=g2;c.fillRect(0,0,W,H);
  for(const p of D){p.y-=p.v*.0006;if(p.y<0)p.y=1;const x=p.x*W+Math.sin(t*.0005+p.v*9)*10,y=p.y*H,a=Math.max(0,1-Math.hypot(x-m.x,y-m.y)/r);c.fillStyle=`rgba(255,235,190,${a*.8})`;c.fillRect(x,y,1.6,1.6)}c.globalCompositeOperation='source-over'}}});

TEXTS['ASCII Cat']=[{k:'word',label:'Characters, dark to light',v:' .:-=+*#%@'}];
sc5('ASCII Cat','Developer / retro brand','The cat becomes text. Change the characters in full screen','#06100a',(S,F)=>{const c=F.ctx,im=IMG('cat.png');let L=null,k='',cell=8,cols=0,rows=0;
 return{init(){},frame(t){const W=S.size.x|0,H=S.size.y|0;paint(c,'6,16,10',W,H);if(noImg(c,im,W,H,'cat.png'))return;
  if(k!==W+'x'+H){k=W+'x'+H;cell=Math.max(6,Math.round(Math.min(W,H)/56));cols=Math.floor(W/cell);rows=Math.floor(H/cell);const f=fitImg(im.img,cols,rows,.96),o=document.createElement('canvas');o.width=cols;o.height=rows;const x=o.getContext('2d');x.drawImage(im.img,f.x,f.y,f.w,f.h);
   try{const d=x.getImageData(0,0,cols,rows).data;L=new Float32Array(cols*rows);for(let i=0;i<L.length;i++)L[i]=(d[i*4]*.3+d[i*4+1]*.59+d[i*4+2]*.11)/255*(d[i*4+3]/255)}catch(e){L=null}}
  if(!L)return;const ramp=TX.word||' .:-=+*#%@',ox=(W-cols*cell)/2,oy=(H-rows*cell)/2,sw=(t*.012)%(rows+8)-4;c.font=`${cell*1.05}px ${MONO}`;c.textAlign='center';c.textBaseline='middle';
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){let v=L[j*cols+i];if(v<.04)continue;v=Math.min(1,v+Math.sin(t*.003+i*.4+j*.2)*.05);const ch=ramp[Math.min(ramp.length-1,Math.floor(v*ramp.length))];if(ch===' ')continue;
   c.fillStyle=`hsl(135,85%,${28+v*48+(Math.abs(j-sw)<2?25:0)}%)`;c.fillText(ch,ox+i*cell+cell/2,oy+j*cell+cell/2)}}}});
