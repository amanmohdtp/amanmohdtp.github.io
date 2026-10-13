// Simulations and time. One scene per block. Add yours the same way.

sc4('Pendulum Wave','Education / hypnotic loader','Pointer sets the swing and the speed','#0b0b10',(S,F)=>{const c=F.ctx,N=15;let ph=0,lt=0;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);ph+=(t-lt)*(.6+m.x/W*1.6);lt=t;paint(c,'11,11,16',W,H);
  const top=H*.1,len=H*.6,amp=.35+m.y/H*.5;c.strokeStyle='rgba(255,255,255,.25)';c.beginPath();c.moveTo(W*.06,top);c.lineTo(W*.94,top);c.stroke();
  for(let i=0;i<N;i++){const px=W*.1+i*(W*.8/(N-1)),a=amp*Math.cos(TAU*(30+i)*ph/60000),bx=px+Math.sin(a)*len,by=top+Math.cos(a)*len;
   c.strokeStyle='rgba(255,255,255,.18)';c.beginPath();c.moveTo(px,top);c.lineTo(bx,by);c.stroke();c.fillStyle=pal(i*24+180,80,65);c.beginPath();c.arc(bx,by,Math.max(4,W/60),0,TAU);c.fill()}}}});

sc4('Life Garden','Playground / science','Click or sweep to plant living cells','#07090a',(S,F)=>{const c=F.ctx;let g,a,gl,n=0,cols=0,rows=0,lt=0,rs=0;
 const seed=p=>{for(let i=0;i<g.length;i++)g[i]=Math.random()<p?1:0};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),cs=Math.max(7,Math.round(Math.min(W,H)/38)),cc=Math.floor(W/cs),rr=Math.floor(H/cs);
  if(cc!==cols||rr!==rows){cols=cc;rows=rr;g=new Uint8Array(cols*rows);a=new Uint8Array(cols*rows);gl=new Float32Array(cols*rows);seed(.22)}
  const ci=Math.floor(m.x/cs),cj=Math.floor(m.y/cs),rad=PTR.click?6:(PTR.on&&PTR.sp>2?2:0);
  if(rad)for(let i=-rad;i<=rad;i++)for(let j=-rad;j<=rad;j++){const x=ci+i,y=cj+j;if(x>=0&&y>=0&&x<cols&&y<rows&&Math.random()<.6)g[y*cols+x]=1}
  if(t-lt>110){lt=t;n=0;const o=new Uint8Array(g.length);for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let s=0;for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++)if(i||j)s+=g[((y+j+rows)%rows)*cols+(x+i+cols)%cols];const k=y*cols+x;o[k]=g[k]?(s==2||s==3?1:0):(s==3?1:0);n+=o[k]}g=o;rs++;if(n<cols*rows*.02||rs>230){seed(.22);rs=0}}
  paint(c,'7,9,10',W,H);for(let k=0;k<g.length;k++){gl[k]=Math.max(g[k],gl[k]*.88);if(gl[k]>.04){c.fillStyle=pal(140+(k%cols)/cols*120,70,55,gl[k]);c.fillRect((k%cols)*cs+1,Math.floor(k/cols)*cs+1,cs-2,cs-2)}}}}});

sc4('Studio Clock','Portfolio / footer widget','Real time, smooth sweep','#0e0e12',(S,F)=>{const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,r=Math.min(W,H)*.4,d=new Date(),ms=d.getMilliseconds()/1000,s=d.getSeconds()+ms,mi=d.getMinutes()+s/60,h=d.getHours()%12+mi/60;paint(c,'14,14,18',W,H);c.save();c.translate(W/2,H/2);
  for(let i=0;i<60;i++){const a=i/60*TAU-Math.PI/2,L=i%5?r*.04:r*.1;c.strokeStyle=i%5?'rgba(255,255,255,.3)':'#fff';c.lineWidth=i%5?1:2;c.beginPath();c.moveTo(Math.cos(a)*(r-L),Math.sin(a)*(r-L));c.lineTo(Math.cos(a)*r,Math.sin(a)*r);c.stroke()}
  const hand=(v,len,w,col)=>{const a=v*TAU-Math.PI/2;c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(-Math.cos(a)*len*.12,-Math.sin(a)*len*.12);c.lineTo(Math.cos(a)*len,Math.sin(a)*len);c.stroke()};
  hand(h/12,r*.5,5,'#fff');hand(mi/60,r*.78,3,'#fff');hand(s/60,r*.88,1.5,'#ff4d2e');c.fillStyle='#ff4d2e';c.beginPath();c.arc(0,0,5,0,TAU);c.fill();c.restore()}}});

sc4('Lattice Wave','Data / terrain visual','A dot terrain that breathes, pointer sets the height','#06080e',(S,F)=>{const c=F.ctx,gx=34,gz=24;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),f=Math.min(W,H)*.9,amp=.25+(1-m.y/H)*.6,yaw=(m.x/W-.5)*1.2;paint(c,'6,8,14',W,H);
  for(let j=gz-1;j>=0;j--)for(let i=0;i<gx;i++){const X=(i-gx/2)*.3,Z=1.2+j*.2,Y=Math.sin(i*.4+t*.002)*Math.cos(j*.4-t*.0015)*amp,s=f/(Z+X*yaw*.4);
   c.fillStyle=pal(190+Y*120,80,45+Y*30+ (1-j/gz)*15,.25+(1-j/gz)*.7);c.beginPath();c.arc(W/2+X*s,H*.34+(1.1-Y)*s*.55,.8+s/f*1.2,0,TAU);c.fill()}}}});
