// Shared helpers used by every scene file. Loaded first.
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

// Text scenes. Every text is editable in full screen (see TEXTS).
function textPts(str,W,H,step){const o=document.createElement('canvas');o.width=W;o.height=H;const c=o.getContext('2d');
 const s=fitS(c,str,x=>`800 ${x}px ${FONT}`,W*.88,H*.5);c.font=`800 ${s}px ${FONT}`;c.textAlign='center';c.textBaseline='middle';c.fillText(str,W/2,H/2);
 const d=c.getImageData(0,0,W,H).data,P=[];for(let y=0;y<H;y+=step)for(let x=0;x<W;x+=step)if(d[(y*W+x)*4+3]>128)P.push(new Pt(x,y));return P}

// 25 more pieces. Text pieces are editable in full screen.
const sc4=(name,use,hint,bgc,make)=>add(name,use,hint,make,undefined,bgc);
const T1=(name,label,v)=>TEXTS[name]=[{k:'word',label,v}];
const ctr=c=>{c.textAlign='center';c.textBaseline='middle'};
const fnt=(w,s,f=FONT)=>`${w} ${s}px ${f}`;

// Signature batch: image, emoji, text-effect and cinematic pieces. Pieces here are shown first in the gallery.
const sc5=(name,use,hint,bgc,make)=>{add(name,use,hint,make,undefined,bgc);SCENES[SCENES.length-1].feat=1};
const T5=(name,label,v)=>TEXTS[name]=[{k:'word',label,v}];
const IMGS={},IMG=src=>IMGS[src]||(IMGS[src]=(o=>{o.img.onload=()=>o.ok=true;o.img.onerror=()=>o.err=true;o.img.src=src;return o})({img:new Image(),ok:false,err:false}));
const noImg=(c,im,W,H,file)=>{if(im.ok)return false;c.fillStyle='#8a8d99';c.font=`13px ${MONO}`;c.textAlign='center';c.fillText(im.err?file+' not found in the repo root':'loading '+file,W/2,H/2);return true};
const fitImg=(im,W,H,m=.8)=>{const k=Math.min(W*m/im.width,H*m/im.height);return{w:im.width*k,h:im.height*k,x:(W-im.width*k)/2,y:(H-im.height*k)/2}};
// Emoji are drawn with the device emoji font (Apple Color Emoji on iPhone and Mac).
const EMO='"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
const emo=(c,ch,x,y,s,r=0,sx=1,al=1,sy=1)=>{c.save();c.translate(x,y);c.rotate(r);c.scale(sx,sy);c.globalAlpha=al;c.font=`${s}px ${EMO}`;c.textAlign='center';c.textBaseline='middle';c.fillText(ch,0,0);c.restore()};
const hash=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};

/* ---------- images (cat.png) ---------- */
