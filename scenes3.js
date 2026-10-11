// Generative engines + presets. Each engine: (space, form, params) -> {init, frame}
const A=(t,W,H)=>PTR.on?PTR:{x:W/2+Math.sin(t/1100)*W*.32,y:H/2+Math.cos(t/900)*H*.28};
const K=S=>Math.min(1,S.size.x*S.size.y/650000);
const pal=(h,s,l,a=1)=>`hsla(${h%360},${s}%,${l}%,${a})`;
const rgb=o=>`rgb(${o.bg})`;

function flow(S,F,o){const c=F.ctx;let P=[];
 const f={curl:(x,y,t)=>(Math.sin(x*.004+t*3e-4)+Math.cos(y*.005-t*2e-4))*Math.PI,
  swirl:(x,y,t,W,H)=>Math.atan2(y-H/2,x-W/2)+1.6+Math.sin(t*4e-4)*.5,
  grid:(x,y,t)=>Math.round((Math.sin(x*.01+t*5e-4)+Math.cos(y*.01))*2)*Math.PI/4,
  turb:(x,y,t)=>Math.sin(x*.01+Math.sin(y*.013+t*7e-4)*3)*TAU,
  ring:(x,y,t,W,H)=>Math.atan2(y-H/2,x-W/2)+Math.sin(Math.hypot(x-W/2,y-H/2)*.02-t*.001)*2}[o.f];
 const sp=()=>({x:R(0,S.size.x),y:R(0,S.size.y),a:R(0,1)});
 return{init(){P=Array.from({length:(o.n*K(S))|0},sp)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);wash(c,o.bg,o.fade,W,H);c.lineWidth=o.w;c.lineCap='round';
  for(const p of P){const a=f(p.x,p.y,t,W,H),x0=p.x,y0=p.y,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,k=d<160?(1-d/160)*(PTR.down?-4:4):0;
   p.x+=Math.cos(a)*o.s+dx/d*k;p.y+=Math.sin(a)*o.s+dy/d*k;
   c.strokeStyle=pal(o.h+p.a*o.hr,o.sat,o.l,o.al);c.beginPath();c.moveTo(x0,y0);c.lineTo(p.x,p.y);c.stroke();
   if(p.x<0||p.x>W||p.y<0||p.y>H||Math.random()<.004)Object.assign(p,sp())}}}}

function rings(S,F,o){const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),u=Math.min(W,H)*.52/o.n,amp=o.amp*(.4+m.x/W*1.2);
  c.fillStyle=rgb(o);c.fillRect(0,0,W,H);const cx=o.follow?W/2+(m.x-W/2)*.2:W/2,cy=o.follow?H/2+(m.y-H/2)*.2:H/2;c.lineWidth=1.2;
  for(let i=1;i<=o.n;i++){c.beginPath();for(let a=0;a<=TAU+.05;a+=TAU/140){const r=i*u+Math.sin(a*o.k+t*o.sp*(1+PTR.sp*.05)+i*o.ph)*amp*i/o.n;
    c[a?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r*(o.sq||1))}
   c.strokeStyle=pal(o.h+i*o.hr,o.sat,o.l,.85);c.stroke()}}}}

function grid(S,F,o){const c=F.ctx,g=o.g;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);c.fillStyle=rgb(o);c.fillRect(0,0,W,H);c.lineWidth=o.w||2;c.lineCap='round';
  for(let x=g/2;x<W;x+=g)for(let y=g/2;y<H;y+=g){const dx=x-m.x,dy=y-m.y,d=Math.hypot(dx,dy)||1,u=Math.max(0,1-d/(o.rad||300)),a0=Math.atan2(dy,dx);
   c.fillStyle=c.strokeStyle=pal(o.h+d*.1,o.sat,o.l);let r,a;c.beginPath();
   switch(o.m){
    case'halftone':c.arc(x,y,g*.48*Math.max(.06,u),0,TAU);c.fill();break;
    case'wave':c.arc(x,y,g*.3*(.5+.5*Math.sin(d*.04-t*.004))+.5,0,TAU);c.fill();break;
    case'warp':c.arc(x+dx/d*u*u*30,y+dy/d*u*u*30,1.5+u*3,0,TAU);c.fill();break;
    case'eye':a=a0+Math.PI;c.moveTo(x,y);c.lineTo(x+Math.cos(a)*g*.45,y+Math.sin(a)*g*.45);c.stroke();break;
    case'spin':a=(x+y)*.01+t*.001+u*4;c.moveTo(x-Math.cos(a)*g*.4,y-Math.sin(a)*g*.4);c.lineTo(x+Math.cos(a)*g*.4,y+Math.sin(a)*g*.4);c.stroke();break;
    case'pix':r=g*.9*(.5+.5*Math.sin(x*.03+t*.001)*Math.cos(y*.03-t*.0013+u*3));c.fillRect(x-r/2,y-r/2,r,r)}}}}}

function parts(S,F,o){const c=F.ctx;let P=[],tc=0;
 const mk=()=>({x:R(0,S.size.x),y:R(0,S.size.y),vx:0,vy:0,a:R(0,1),r:R(1,o.r),l:0});
 return{init(){P=Array.from({length:(o.n*K(S))|0},mk)},
 frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),q=o.m,sk=q=='spark'||q=='confetti';
  o.fade?wash(c,o.bg,o.fade,W,H):(c.fillStyle=rgb(o),c.fillRect(0,0,W,H));c.globalCompositeOperation=o.add?'lighter':'source-over';
  const burst=PTR.click||(!PTR.on&&((t/1800)|0)!==tc);if(burst)tc=(t/1800)|0;
  for(const p of P){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)||1;let al=o.al||1;
   if(q=='well'){const f=900/(d*d+900);p.vx+=(dx*.5+dy*.3)/d*f;p.vy+=(dy*.5-dx*.3)/d*f;p.vx*=.985;p.vy*=.985}
   else if(q=='snow'){p.vy=.5+p.r*.25;p.vx=Math.sin(t/900+p.a*9)*.5+(m.x/W-.5)*1.5;if(d<90){p.vx-=dx/d*2;p.vy-=dy/d*2}}
   else if(q=='bubble'){p.vy=-(.4+p.r*.12);p.vx=Math.sin(t/700+p.a*20)*.5;if(burst&&d<90)p.y=H+20}
   else if(q=='moth'){p.vx=(p.vx+R(-.3,.3))*.95;p.vy=(p.vy+R(-.3,.3))*.95;if(d<160){p.vx+=dx/d*.12;p.vy+=dy/d*.12}}
   else if(q=='halo'){const a=p.a*TAU+t/800*(1+p.r*.1),r=40+p.r*34-(PTR.down?30:0);p.vx=(m.x+Math.cos(a)*r-p.x)*.1;p.vy=(m.y+Math.sin(a)*r-p.y)*.1}
   else{if(p.l<=0){if(q=='spark'?Math.random()<.15:burst){const sp=q=='spark',a=sp?R(0,TAU):R(-2.4,-.75),v=sp?R(.5,4):R(4,13),on=PTR.on;
      p.x=sp||on?m.x:W/2;p.y=sp||on?m.y:H;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.l=sp?R(30,90):R(90,170)}else continue}
     p.l--;p.vy+=q=='spark'?.08:.18;p.vx*=.99;al=Math.min(1,p.l/30)}
   p.x+=p.vx;p.y+=p.vy;if(!sk&&q!='well'&&q!='halo'){p.x=(p.x+W+20)%(W+20);p.y=(p.y+H+20)%(H+20)}
   c.fillStyle=c.strokeStyle=pal(o.h+p.a*o.hr,o.sat,o.l,al);
   if(q=='confetti')c.fillRect(p.x,p.y,p.r*2.2,p.r*1.2*Math.cos(t/90+p.a*9));
   else{c.beginPath();c.arc(p.x,p.y,q=='bubble'?p.r*4:p.r,0,TAU);q=='bubble'?c.stroke():c.fill()}}
  c.globalCompositeOperation='source-over'}}}

function kal(S,F,o){const c=F.ctx;let last=null;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),cx=W/2,cy=H/2,x=m.x-cx,y=m.y-cy;wash(c,o.bg,o.fade,W,H);
  if(last&&(PTR.down||!PTR.on||PTR.sp>1)){c.globalCompositeOperation='lighter';c.lineWidth=o.w;c.lineCap='round';c.strokeStyle=pal(o.h+t/15,90,62,.8);
   for(let i=0;i<o.n;i++)for(const s of[1,-1]){c.save();c.translate(cx,cy);c.rotate(i*TAU/o.n);c.scale(1,s);c.beginPath();c.moveTo(last.x,last.y);c.lineTo(x,y);c.stroke();c.restore()}
   c.globalCompositeOperation='source-over'}last={x,y}}}}

function spiro(S,F,o){const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),r=o.a+m.x/W*o.b,d=.3+m.y/H*.7,sc=Math.min(W,H)*.4;c.fillStyle=rgb(o);c.fillRect(0,0,W,H);
  c.lineWidth=o.w;c.strokeStyle=pal(o.h+t/30,85,65,.85);c.beginPath();
  for(let u=0;u<TAU*o.turns;u+=.05){const x=(1-r)*Math.cos(u)+d*r*Math.cos((1-r)/r*u),y=(1-r)*Math.sin(u)-d*r*Math.sin((1-r)/r*u);c[u?'lineTo':'moveTo'](W/2+x*sc,H/2+y*sc)}c.stroke()}}}

function tunnel(S,F,o){const c=F.ctx;
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H),ph=(t*7e-4)%1,rot=t*3e-4*(PTR.on?(m.x/W-.5)*8:1);c.fillStyle=rgb(o);c.fillRect(0,0,W,H);c.lineWidth=1.6;
  for(let i=o.n-1;i>=0;i--){const s=Math.pow((i+ph)/o.n,2.2),r=s*Math.max(W,H)*.8,cx=W/2+(m.x-W/2)*(1-s)*.6,cy=H/2+(m.y-H/2)*(1-s)*.6;
   c.beginPath();for(let k=0;k<=o.k;k++){const a=k*TAU/o.k+i*o.tw+rot;c[k?'lineTo':'moveTo'](cx+Math.cos(a)*r,cy+Math.sin(a)*r)}
   c.strokeStyle=pal(o.h+i*6,80,60,Math.min(1,s*2.2));c.stroke()}}}}

function truchet(S,F,o){const c=F.ctx,g=o.g;let st={},cd={};
 return{init(){},frame(t){const W=S.size.x,H=S.size.y,m=A(t,W,H);c.fillStyle=rgb(o);c.fillRect(0,0,W,H);c.lineWidth=o.w;c.lineCap='round';c.strokeStyle=pal(o.h,o.sat,o.l);
  for(let i=0;i*g<W;i++)for(let j=0;j*g<H;j++){const x=i*g,y=j*g,k=i+','+j,near=Math.hypot(x+g/2-m.x,y+g/2-m.y)<g*.9;
   if(st[k]===undefined)st[k]=(Math.sin(i*12.9+j*78.2)*437.5)%1>0;if(near&&!cd[k]){st[k]=!st[k];cd[k]=1}else if(!near)cd[k]=0;
   c.beginPath();if(st[k]){c.arc(x,y,g/2,0,Math.PI/2);c.moveTo(x+g,y+g/2);c.arc(x+g,y+g,g/2,Math.PI,Math.PI*1.5)}
   else{c.arc(x+g,y,g/2,Math.PI/2,Math.PI);c.moveTo(x+g/2,y+g);c.arc(x,y+g,g/2,Math.PI*1.5,TAU)}c.stroke()}}}}

// ---- presets (grouped, then interleaved so the gallery never repeats a family back-to-back)
const G={flow:[],rings:[],grid:[],parts:[],geo:[]};
const reg=(g,E,name,use,hint,o)=>G[g].push([name,use,hint,E,o]);
[['Silk Currents','Hero background','Move through the current',{f:'curl',n:900,s:1.4,w:1,h:190,hr:50,sat:80,l:68,al:.55,bg:'8,10,18',fade:.05}],
 ['Ember Drift','Landing / launch page','Hold to pull the embers inward',{f:'swirl',n:800,s:1.6,w:1.2,h:10,hr:40,sat:95,l:60,al:.6,bg:'12,6,6',fade:.06}],
 ['Aurora Veil','Night-mode hero','Your pointer parts the northern lights',{f:'turb',n:800,s:1.2,w:1.4,h:120,hr:150,sat:80,l:65,al:.4,bg:'5,8,14',fade:.04}],
 ['Paper Veins','Editorial / portfolio','Ink on paper, pushed by your hand',{f:'curl',n:700,s:1.3,w:.9,h:20,hr:20,sat:30,l:15,al:.4,bg:'244,239,228',fade:.02}],
 ['Cobalt Grid','Dashboard / SaaS backdrop','Right-angle currents with a blue pulse',{f:'grid',n:700,s:2,w:1,h:215,hr:20,sat:90,l:60,al:.7,bg:'6,8,22',fade:.08}],
 ['Typhoon','Weather / data story','A storm that notices you',{f:'ring',n:900,s:1.8,w:1,h:170,hr:80,sat:85,l:62,al:.5,bg:'4,10,14',fade:.06}],
 ['Static Storm','Glitch / music site','Fast white noise, short memory',{f:'curl',n:700,s:3,w:.8,h:0,hr:0,sat:0,l:90,al:.7,bg:'0,0,0',fade:.22}],
 ['Rose Quartz','Beauty / wellness','Soft pink turbulence on pale paper',{f:'turb',n:700,s:1.3,w:1,h:340,hr:30,sat:60,l:40,al:.35,bg:'250,236,238',fade:.02}],
 ['Deep Sea','Ocean / calm page','Slow teal currents, thick lines',{f:'swirl',n:600,s:1,w:1.6,h:185,hr:40,sat:70,l:55,al:.35,bg:'2,14,20',fade:.04}],
 ['Solar Wind','Space / energy brand','Gold rings spiralling outward',{f:'ring',n:800,s:1.8,w:1.1,h:35,hr:40,sat:100,l:60,al:.55,bg:'10,4,2',fade:.07}]].forEach(a=>reg('flow',flow,...a));
[['Vinyl','Music / podcast','Move sideways to deepen the grooves',{n:38,k:3,sp:6e-4,ph:.2,amp:6,h:40,hr:2,sat:20,l:75,bg:'10,10,12'}],
 ['Sonar','Tech / radar UI','Pulses roll outward',{n:14,k:1,sp:.002,ph:.5,amp:14,h:140,hr:3,sat:80,l:55,bg:'3,12,8'}],
 ['Lotus','Wellness / meditation','Eight petals, breathing',{n:22,k:8,sp:8e-4,ph:.35,amp:38,h:320,hr:7,sat:80,l:65,bg:'14,5,16'}],
 ['Heartbeat','Health / care brand','Squashed rings that pulse',{n:30,k:2,sp:.003,ph:.15,amp:20,sq:.55,h:350,hr:2,sat:90,l:60,bg:'12,4,6'}],
 ['Ripple Pond','Calm hero section','The pond leans toward your pointer',{n:26,k:0,sp:.003,ph:.5,amp:12,follow:1,h:195,hr:3,sat:70,l:60,bg:'4,10,16'}],
 ['Halo','Light-mode accent','Blue halos on a pale page',{n:24,k:5,sp:5e-4,ph:.3,amp:22,h:230,hr:5,sat:60,l:40,bg:'240,242,246'}],
 ['Ink Rose','Fashion / luxury','Twelve-fold monochrome bloom',{n:18,k:12,sp:4e-4,ph:.6,amp:30,h:0,hr:0,sat:0,l:85,bg:'8,8,8'}]].forEach(a=>reg('rings',rings,...a));
[['Halftone Gaze','Print / editorial hero','Dots swell where you look',{m:'halftone',g:18,rad:300,h:20,sat:90,l:60,bg:'12,10,10'}],
 ['Halftone Paper','Light portfolio','Newsprint halftone, hand-lit',{m:'halftone',g:16,rad:280,h:10,sat:20,l:15,bg:'244,239,228'}],
 ['Ripple Grid','Product background','Waves travel through a dot field',{m:'wave',g:22,h:200,sat:80,l:65,bg:'6,8,16'}],
 ['Mint Waves','Fintech / health','Fine mint ripples',{m:'wave',g:16,h:150,sat:70,l:60,bg:'3,12,10'}],
 ['Watching Eyes','Playful hero','Every needle tracks you',{m:'eye',g:30,w:2,h:0,sat:0,l:90,bg:'10,10,12'}],
 ['Compass Field','Map / travel site','A field of compass needles',{m:'eye',g:22,w:2,h:12,sat:90,l:45,bg:'244,239,228'}],
 ['Spin Mosaic','Creative studio','Tiles twirl around your cursor',{m:'spin',g:26,rad:220,h:260,sat:80,l:65,bg:'8,6,16'}],
 ['Pixel Tide','Game / retro brand','Square pixels rise and fall',{m:'pix',g:20,rad:200,h:300,sat:80,l:62,bg:'10,6,12'}],
 ['Warp Lens','Image / gallery hover','A lens bends the dot field',{m:'warp',g:16,rad:200,h:190,sat:85,l:65,bg:'4,8,14'}],
 ['Ink Lens','Light gallery hover','Same lens, printed in ink',{m:'warp',g:16,rad:200,h:10,sat:10,l:15,bg:'244,239,228'}]].forEach(a=>reg('grid',grid,...a));
[['Gravity Well','Hero / physics toy','Hold to pull the whole system in',{m:'well',n:700,r:2.2,h:200,hr:80,sat:90,l:65,al:.9,bg:'4,6,14',fade:.12,add:1}],
 ['Ember Sparks','Cursor effect','Your cursor sheds sparks',{m:'spark',n:450,r:2.5,h:15,hr:35,sat:100,l:60,bg:'8,4,2',fade:.2,add:1}],
 ['First Snow','Seasonal banner','Push the flakes with your pointer',{m:'snow',n:260,r:3,h:210,hr:10,sat:20,l:95,bg:'14,20,34'}],
 ['Soap Bubbles','Kids / playful brand','Tap near a bubble to pop it',{m:'bubble',n:70,r:6,h:180,hr:160,sat:70,l:75,al:.7,bg:'10,12,22'}],
 ['Confetti Cannon','Success / celebration','Tap anywhere to fire',{m:'confetti',n:260,r:4.5,h:0,hr:360,sat:90,l:62,bg:'18,18,24'}],
 ['Lantern Moths','Atmospheric hero','Moths drift toward your light',{m:'moth',n:160,r:2.5,h:45,hr:20,sat:100,l:68,bg:'4,5,10',fade:.15,add:1}],
 ['Swarm Halo','Loader / AI thinking','A crown of light follows you',{m:'halo',n:300,r:3,h:280,hr:90,sat:90,l:68,bg:'8,4,16',fade:.2,add:1}],
 ['Comet Tail','Cursor trail','Long glowing tails',{m:'spark',n:500,r:2.2,h:200,hr:20,sat:90,l:68,bg:'3,4,10',fade:.04,add:1}]].forEach(a=>reg('parts',parts,...a));
[[kal,'Kaleidoscope','Drawing tool / hero','Draw — eight mirrors paint with you',{n:8,w:1.5,h:200,fade:.04,bg:'6,6,12'}],
 [kal,'Snowflake','Winter campaign','Six-fold symmetry, drag to draw',{n:6,w:1.2,h:195,fade:.05,bg:'4,8,16'}],
 [kal,'Mandala','Spiritual / art brand','Fourteen petals of light',{n:14,w:1,h:320,fade:.03,bg:'10,4,12'}],
 [spiro,'Spirograph','Toy / education','Pointer changes the gears',{a:.31,b:.4,turns:30,w:1.1,h:40,bg:'8,8,12'}],
 [spiro,'Harmonic Bloom','Science / audio','Slide to morph the curve',{a:.55,b:.35,turns:24,w:1.2,h:300,bg:'6,6,14'}],
 [spiro,'Orbital Loom','Textile / generative art','Threads of one long orbit',{a:.12,b:.5,turns:40,w:.9,h:160,bg:'4,10,10'}],
 [tunnel,'Hex Tunnel','Transition / intro','Steer the tunnel',{n:26,k:6,tw:.06,h:180,bg:'4,6,12'}],
 [tunnel,'Triangle Warp','Sci-fi / gaming','Fly through triangles',{n:30,k:3,tw:.1,h:320,bg:'8,4,14'}],
 [tunnel,'Square Vortex','Bold brand intro','A twisting square corridor',{n:28,k:4,tw:.14,h:30,bg:'12,6,4'}],
 [truchet,'Truchet Maze','Pattern / background','Hover tiles to flip the maze',{g:44,w:3,h:190,sat:80,l:62,bg:'6,8,14'}],
 [truchet,'Truchet Paper','Light pattern','A hand-drawn maze that rewrites itself',{g:40,w:3,h:15,sat:70,l:35,bg:'244,239,228'}]].forEach(([E,...a])=>reg('geo',E,...a));
for(let i=0;i<12;i++)Object.values(G).forEach(L=>{const p=L[i];if(!p)return;const[name,use,hint,E,o]=p;
 SCENES.push({name,use,hint,bg:rgb(o),make:(S,F)=>E(S,F,o),
  src:`// helpers: A(pointer|autopilot) K(density) pal(hsla) wash(fade)\nconst preset = ${JSON.stringify(o,null,1)};\n\n${E.toString()}\n\n// run: E(space, form, preset)`})});
