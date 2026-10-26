/* Uses the public Busuanzi API; only this portfolio's canonical URL is counted.
   API: https://github.com/soxft/busuanzi/wiki/api */
(function(){
 'use strict';
 const panel=document.querySelector('[data-visitor-stats]');if(!panel)return;
 const status=panel.querySelector('[data-visitor-status]');
 const canonical='https://rgwvb.github.io/personal-website/';
 const allowed=new Set(['/personal-website/','/personal-website/index.html','/personal-website/high-school.html','/personal-website/university.html']);
 if(location.hostname!=='rgwvb.github.io'||!allowed.has(location.pathname)){status.textContent='預覽模式，不列入統計';return;}
 const key='zhong-portfolio-stat-identity-v1';
 let identity='';try{identity=localStorage.getItem(key)||'';}catch{}
 const headers={'x-bsz-referer':canonical};
 if(identity&&identity.length<4096&&!/[\r\n]/.test(identity))headers.Authorization='Bearer '+identity;
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
 async function count(){
  try{
   const response=await fetch('https://busuanzi.9420.ltd/api',{method:'POST',headers,credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal});
   if(!response.ok)throw new Error('Counter unavailable');
   const result=await response.json();const uv=result.data?.page_uv,pv=result.data?.page_pv;
   if(result.success!==true||!Number.isSafeInteger(uv)||uv<0||!Number.isSafeInteger(pv)||pv<0)throw new Error('Invalid counter response');
   const token=response.headers.get('Set-Bsz-Identity');if(token&&token.length<4096){try{localStorage.setItem(key,token);}catch{}}
   panel.querySelector('[data-visitor-total]').textContent=uv.toLocaleString('zh-TW');
   panel.querySelector('[data-view-total]').textContent=pv.toLocaleString('zh-TW');
   panel.dataset.state='ready';status.textContent='啟用後開始累計・全站共用';
  }catch{
   panel.dataset.state='unavailable';status.textContent='統計暫時無法讀取，稍後重新整理即可';
  }finally{clearTimeout(timer);}
 }
 count();
})();
