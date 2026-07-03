/* ============ USMANOVA FIT — shared behaviours ============ */
(function(){
  "use strict";

  /* burger */
  var burger=document.getElementById('burger'),mm=document.getElementById('mobileMenu');
  if(burger&&mm){
    burger.addEventListener('click',function(){mm.style.display=mm.style.display==='block'?'none':'block';});
    document.querySelectorAll('[data-close-menu]').forEach(function(a){a.addEventListener('click',function(){mm.style.display='none';});});
  }

  /* smooth scroll */
  document.querySelectorAll('[data-scroll]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(id&&id.charAt(0)==='#'&&id.length>1){
        var t=document.querySelector(id);
        if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-64,behavior:'smooth'});}
      }
    });
  });

  /* marquee */
  var mq=document.getElementById('mqline');
  if(mq){
    var phrase=mq.getAttribute('data-text')||'';
    var line='';for(var i=0;i<12;i++)line+='<span>'+phrase+' ●</span>';
    mq.innerHTML=line+line;
  }

  /* countdown */
  var clock=document.getElementById('clock');
  if(clock){
    var KEY='uf_deadline_'+(location.pathname||'x');
    var dl=localStorage.getItem(KEY);
    if(!dl){dl=String(new Date().getTime()+(1*86400+8*3600+45*60)*1000);localStorage.setItem(KEY,dl);}
    dl=+dl;
    var pad=function(n){return n<10?'0'+n:''+n;};
    var el=function(id){return document.getElementById(id);};
    var tick=function(){
      var s=Math.max(0,Math.floor((dl-new Date().getTime())/1000));
      if(el('dd'))el('dd').textContent=pad(Math.floor(s/86400));
      if(el('hh'))el('hh').textContent=pad(Math.floor(s%86400/3600));
      if(el('mm'))el('mm').textContent=pad(Math.floor(s%3600/60));
      if(el('ss'))el('ss').textContent=pad(s%60);
    };
    tick();setInterval(tick,1000);
  }

  /* phone mask */
  var phone=document.getElementById('phone');
  if(phone){
    phone.addEventListener('input',function(){
      var d=phone.value.replace(/\D/g,'');
      if(d.charAt(0)==='8')d='7'+d.slice(1);
      if(d.charAt(0)==='9')d='7'+d;
      d=d.slice(0,11);var out='+7';
      if(d.length>1)out+=' ('+d.slice(1,4);
      if(d.length>=4)out+=') '+d.slice(4,7);
      if(d.length>=7)out+='-'+d.slice(7,9);
      if(d.length>=9)out+='-'+d.slice(9,11);
      phone.value=out;
    });
    phone.addEventListener('focus',function(){if(!phone.value)phone.value='+7 ';});
  }

  /* lead form validation + submit */
  var form=document.getElementById('leadForm');
  if(form){
    var okBox=document.getElementById('formOk');
    var setErr=function(id,on){var f=document.getElementById(id);if(!f)return;f.classList.toggle('invalid',on);var i=f.querySelector('input,select');if(i)i.classList.toggle('err',on);};
    form.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      var nameEl=document.getElementById('name'),name=nameEl?nameEl.value.trim():'';
      var pd=phone?phone.value.replace(/\D/g,''):'';
      var agreeEl=document.getElementById('agree'),agree=agreeEl?agreeEl.checked:true;
      if(name.length<2){setErr('f-name',true);ok=false;}else setErr('f-name',false);
      if(pd.length!==11){setErr('f-phone',true);ok=false;}else setErr('f-phone',false);
      if(!agree){ok=false;var c=form.querySelector('.consent');if(c){c.style.color='#ff4d4d';c.querySelector('input').style.outline='2px solid #ff4d4d';}}
      if(!ok)return;
      var btn=document.getElementById('submitBtn'),label=btn.textContent;
      btn.textContent='Отправляем…';btn.disabled=true;
      setTimeout(function(){
        var goalEl=document.getElementById('goal'),goal=goalEl?goalEl.value:'';
        var okText=document.getElementById('okText');
        if(okText)okText.textContent='Спасибо, '+name+'! Заявка принята'+(goal?' по цели «'+goal+'»':'')+'. Мы свяжемся с вами по номеру '+phone.value+'.';
        form.style.display='none';if(okBox)okBox.style.display='block';
        btn.textContent=label;btn.disabled=false;
      },700);
    });
    ['name','phone'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('input',function(){setErr('f-'+id,false);});});
    var ag=document.getElementById('agree');
    if(ag)ag.addEventListener('change',function(){var c=form.querySelector('.consent');if(c){c.style.color='';this.style.outline='';}});
    var rf=document.getElementById('resetForm');
    if(rf)rf.addEventListener('click',function(){form.reset();form.style.display='block';if(okBox)okBox.style.display='none';});
  }

  /* cookie */
  var cookie=document.getElementById('cookie');
  if(cookie){
    if(localStorage.getItem('uf_cookie')==='1')cookie.style.display='none';
    var cb=document.getElementById('cookieOk');
    if(cb)cb.addEventListener('click',function(){localStorage.setItem('uf_cookie','1');cookie.style.display='none';});
  }
})();
