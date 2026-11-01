(function(){
AOS.init({duration:800,once:true});
// Pesan dikirim ke email lewat layanan FormSubmit (tanpa server sendiri).
var TUJUAN='abdillahsiddiq660@gmail.com';
var f=document.getElementById('kontakForm'),btn=document.getElementById('kirim'),out=document.getElementById('hasil');
function tampil(tipe,teks){out.className='alert alert-'+tipe+' mb-0';out.textContent=teks}
f.addEventListener('submit',function(e){
  e.preventDefault();
  if(!f.checkValidity()){f.classList.add('was-validated');tampil('warning','Mohon lengkapi semua kolom bertanda * dan centang persetujuan privasi.');return}
  var d=Object.fromEntries(new FormData(f).entries());
  d._subject='Pesan baru dari website GeoDipa: '+d.subjek;d._template='table';d._captcha='false';
  btn.disabled=true;btn.textContent='Mengirim...';
  fetch('https://formsubmit.co/ajax/'+TUJUAN,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
   .then(function(r){return r.json()}).then(function(r){
     if(r.success==='true'||r.success===true){tampil('success','Terima kasih, pesan Anda sudah terkirim.');f.reset();f.classList.remove('was-validated')}
     else{tampil('danger','Pesan belum terkirim: '+(r.message||'coba lagi sebentar.'))}
   }).catch(function(){tampil('danger','Pesan belum terkirim. Pastikan Anda terhubung ke internet dan membuka website lewat alamat http/https, lalu coba lagi.')})
   .finally(function(){btn.disabled=false;btn.textContent='Kirim Pesan'});
});
})();