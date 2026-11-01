(function(){
AOS.init({duration:800,once:true});
new PureCounter();
// steam & ember canvas
const c=document.getElementById('fx'),x=c.getContext('2d');let W,H,P=[];
function rs(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight}rs();addEventListener('resize',rs);
function mk(){const e=Math.random()<.4;return{x:Math.random()*W,y:H+10,r:e?Math.random()*2+.5:Math.random()*40+20,v:e?Math.random()*1.5+.6:Math.random()*.6+.2,e,a:Math.random()*.4+.1,d:Math.random()*6}}
for(let i=0;i<70;i++){const p=mk();p.y=Math.random()*H;P.push(p)}
(function loop(t){x.clearRect(0,0,W,H);P.forEach((p,i)=>{p.y-=p.v;p.x+=Math.sin(t/900+p.d)*.5;
 if(p.e){x.fillStyle=`rgba(${224+p.d*3|0},${60+p.d*20|0},40,${p.a+.4})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
 else{const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(95,174,46,${p.a*.55})`);g.addColorStop(1,'rgba(95,174,46,0)');x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
 if(p.y<-60)P[i]=mk()});requestAnimationFrame(loop)})(0);
// depth gauge
const dot=document.querySelector('#gauge i'),lab=document.querySelector('#gauge span');
addEventListener('scroll',()=>{const f=scrollY/(document.body.scrollHeight-innerHeight);dot.style.top=(f*100)+'%';lab.textContent='kedalaman '+(f*3).toFixed(1)+' km';
 dot.style.top=(f*100)+'%'},{passive:true});
// layers
const L=[['Tanah &amp; Batuan Penutup','0 – 0,5 km','Lapisan atas yang menutupi reservoir. Di sini lokasi sumur dan pembangkit dibangun dengan lahan yang relatif kecil.'],
['Batuan Penudung (Caprock)','0,5 – 1 km','Lapisan kedap yang menahan uap tetap bertekanan di dalam reservoir, seperti tutup panci raksasa.'],
['Reservoir Panas Bumi','1 – 2,5 km','Air dan uap panas bersuhu tinggi terjebak di batuan berpori. Sumur produksi dibor sampai ke sini untuk mengalirkan uap ke permukaan.'],
['Sumber Panas (Magma)','&gt; 2,5 km','Dapur panas dari aktivitas vulkanik yang memanaskan reservoir secara terus-menerus, sehingga energinya tidak habis.']];
const bt=document.getElementById('layers'),info=document.getElementById('layerInfo'),bands=document.querySelectorAll('.earth .band');
L.forEach((l,i)=>{const b=document.createElement('button');b.className='layer-btn';b.innerHTML=`<b>${l[0]}</b><small>${l[1]}</small>`;b.onclick=()=>pick(i);bt.appendChild(b)});
function pick(i){[...bt.children].forEach((b,j)=>b.classList.toggle('on',i===j));bands.forEach((b,j)=>b.classList.toggle('on',i===j));info.innerHTML=`<h5 class="serif mb-1">${L[i][0]}</h5><p class="mute mb-0">${L[i][2]}</p>`}
pick(2);
// bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%'}}),{threshold:.5});
document.querySelectorAll('.bar span').forEach(s=>io.observe(s));
// flip on tap
document.querySelectorAll('.flip').forEach(f=>f.addEventListener('click',()=>f.classList.toggle('open')));
// peta: ganti jenis peta
const gm=document.getElementById('gmap');
document.querySelectorAll('.maptabs button').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.maptabs button').forEach(x=>x.classList.toggle('on',x===b));
 gm.src=gm.src.replace(/([?&])t=[a-z]/,'$1t='+b.dataset.t)}));
// bagan struktur: pusatkan di layar kecil
const os=document.querySelector('.org-scroll');
if(os){const ctr=()=>{os.scrollLeft=(os.scrollWidth-os.clientWidth)/2};ctr();addEventListener('load',ctr)}
})();
