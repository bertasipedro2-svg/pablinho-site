/* Imperial V4.3 — decorative 3D overlay, leaves all commerce logic unchanged. */
(()=>{'use strict';const hero=document.querySelector('.hero'),menu=document.getElementById('menu');if(!hero||!menu)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
const stage=document.createElement('div');stage.className='v43-hero-stage';stage.setAttribute('aria-hidden','true');
for(const name of ['grid','scan','orb']){const el=document.createElement('div');el.className='v43-'+name;stage.append(el)}hero.append(stage);
const observer=new MutationObserver(()=>{menu.querySelectorAll('.product:not([data-v43])').forEach(card=>{card.dataset.v43='1';for(const side of ['tl','br']){const el=document.createElement('i');el.className='v43-corner '+side;el.setAttribute('aria-hidden','true');card.append(el)}})});
observer.observe(menu,{childList:true});menu.querySelectorAll('.product').forEach(card=>{card.dataset.v43='1';for(const side of ['tl','br']){const el=document.createElement('i');el.className='v43-corner '+side;el.setAttribute('aria-hidden','true');card.append(el)}});
/* Tiny parallax only for fine pointers, using one rAF at a time. */
if(fine.matches&&!reduce.matches){let next=null,frame=0;hero.addEventListener('pointermove',e=>{if(document.documentElement.classList.contains('v42-low-motion'))return;const r=hero.getBoundingClientRect();next=[(e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5];if(frame)return;frame=requestAnimationFrame(()=>{if(next)stage.style.transform='translate3d('+(-next[0]*10).toFixed(1)+'px,'+(-next[1]*8).toFixed(1)+'px,0)';frame=0})},{passive:true});hero.addEventListener('pointerleave',()=>{stage.style.transform=''})}
})();
