/* Pablinho V10: non-destructive enhancements; no API and no dependencies. */
(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.createElement('div');progress.className='v10-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const top=document.createElement('button');top.type='button';top.className='v10-top';top.setAttribute('aria-label','Voltar ao topo');top.textContent='↑';document.body.append(top);
top.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'instant':'smooth'}));
let raf=false;function scroll(){if(raf)return;raf=true;requestAnimationFrame(()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.transform='scaleX('+Math.min(1,scrollY/max)+')';top.classList.toggle('visible',scrollY>700);raf=false;});}
addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true});scroll();
const hero=document.querySelector('.hero');if(hero){const pulse=document.createElement('span');pulse.className='v10-pulse';pulse.textContent='Imperial • V10';hero.append(pulse);}
const title=document.querySelector('.catalog-heading .eyebrow');if(title)title.textContent='IMPERIAL V10 · A EXPERIÊNCIA DA BRASA';
const toast=document.createElement('div');toast.className='v10-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);
let toastTimer;function notify(t){toast.textContent=t;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1900);}
document.addEventListener('click',e=>{if(e.target.closest('[data-add]'))notify('Adicionado ao seu pedido ✓');else if(e.target.closest('[data-d][data-i]')&&e.target.closest('[data-d]').dataset.d==='1')notify('Pedido atualizado ✓');});
const menu=document.getElementById('menu');if(menu){
let pending=false;const update=()=>{pending=false;const cards=menu.querySelectorAll('.product');cards.forEach(card=>{if(card.dataset.v10==='1')return;card.dataset.v10='1';if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--v10-x',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--v10-y',((e.clientY-r.top)/r.height*100)+'%');},{passive:true});}});};
new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(update);}}).observe(menu,{childList:true,subtree:false});update();
}
})();
