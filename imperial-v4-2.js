/* Imperial V4.2 — single visual engine. No modifications to products, prices, cart or WhatsApp. */
(()=>{'use strict';
const hero=document.querySelector('.hero'),menu=document.getElementById('menu');if(!hero||!menu)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
const low=()=>reduce.matches||document.documentElement.classList.contains('v42-low-motion');
/* Abertura Imperial: assinatura solicitada sob a marca */
if(!low()){
 const intro=document.createElement('div');intro.className='v42-intro';intro.setAttribute('role','presentation');
 intro.innerHTML='<div class="v42-intro-content"><div class="v42-intro-brand">PABLINHO<span>ESPETINHOS</span></div><div class="v42-intro-line"></div><p class="v42-intro-slogan">brasa boa, brasa forte</p></div><button type="button" class="v42-intro-skip" aria-label="Pular introdução">Pular introdução</button>';
 document.body.append(intro);let done=false;
 const dismiss=()=>{if(done)return;done=true;intro.classList.add('v42-intro-exit');setTimeout(()=>intro.remove(),650)};
 intro.querySelector('button').addEventListener('click',dismiss);
 setTimeout(dismiss,2200);
}
const progress=document.createElement('div');progress.className='v42-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const light=document.createElement('div');light.className='v42-light';light.setAttribute('aria-hidden','true');
const embers=document.createElement('div');embers.className='v42-embers';embers.setAttribute('aria-hidden','true');hero.append(light,embers);
function renderEmbers(){embers.replaceChildren();if(low())return;const n=fine.matches?14:6,f=document.createDocumentFragment();for(let i=0;i<n;i++){const e=document.createElement('i');e.className='v42-ember';e.style.setProperty('--x',(Math.random()*100).toFixed(1)+'%');e.style.setProperty('--s',(2+Math.random()*3).toFixed(1)+'px');e.style.setProperty('--t',(5+Math.random()*7).toFixed(1)+'s');e.style.setProperty('--d',(-Math.random()*12).toFixed(1)+'s');e.style.setProperty('--drift',((Math.random()-.5)*150).toFixed(0)+'px');f.append(e)}embers.append(f)}
renderEmbers();reduce.addEventListener?.('change',renderEmbers);
let scheduled=false;function updateProgress(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const d=document.documentElement;progress.style.transform='scaleX('+Math.min(1,Math.max(0,scrollY/Math.max(1,d.scrollHeight-innerHeight)))+')';scheduled=false})}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress,{passive:true});updateProgress();
const toast=document.createElement('div');toast.className='v42-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);let timer;
function notify(text){toast.textContent=text;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),1400)}
const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v42-visible');observer.unobserve(e.target)}}),{rootMargin:'0px 0px 40px 0px',threshold:.06}):null;
function enhance(){menu.querySelectorAll('.product:not([data-v42-ready])').forEach(card=>{card.dataset.v42Ready='1';if(!low()&&observer){card.classList.add('v42-reveal');observer.observe(card)}});menu.querySelectorAll('.product-image img:not([data-v42-img])').forEach(img=>{img.dataset.v42Img='1';img.decoding='async';img.loading='lazy';img.addEventListener('error',()=>{img.closest('.product-image')?.classList.add('v42-asset-warning');img.alt='Imagem indisponível: '+img.alt},{once:true})})}
enhance();new MutationObserver(enhance).observe(menu,{childList:true});
let active=null;function reset(){if(active){active.classList.remove('v42-hover');active.style.removeProperty('--v42-rx');active.style.removeProperty('--v42-ry');active=null}}
if(fine.matches){menu.addEventListener('pointermove',e=>{if(low()){reset();return}const card=e.target.closest('.product');if(card!==active){reset();active=card;if(card)card.classList.add('v42-hover')}if(!card)return;const r=card.getBoundingClientRect(),x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));card.style.setProperty('--v42-rx',((.5-y)*5).toFixed(1)+'deg');card.style.setProperty('--v42-ry',((x-.5)*5).toFixed(1)+'deg');card.style.setProperty('--v42-mx',(x*100).toFixed(0)+'%');card.style.setProperty('--v42-my',(y*100).toFixed(0)+'%')},{passive:true});menu.addEventListener('pointerleave',reset)}
function burst(x,y){if(low())return;for(let i=0;i<6;i++){const el=document.createElement('i');el.className='v42-particle';el.setAttribute('aria-hidden','true');el.style.left=x+'px';el.style.top=y+'px';const a=i*Math.PI/3;el.style.setProperty('--dx',Math.round(Math.cos(a)*35)+'px');el.style.setProperty('--dy',Math.round(Math.sin(a)*35-12)+'px');document.body.append(el);setTimeout(()=>el.remove(),600)}}
menu.addEventListener('click',e=>{const btn=e.target.closest('button[data-d]');if(!btn||Number(btn.dataset.d)<=0||!btn.closest('.product'))return;const r=btn.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2);notify('Adicionado ao carrinho')});
const motion=document.createElement('button');motion.type='button';motion.className='v42-motion-toggle';motion.textContent='Reduzir efeitos';motion.setAttribute('aria-pressed','false');motion.setAttribute('aria-label','Ativar ou desativar efeitos cinematográficos');motion.style.cssText='position:absolute;right:14px;top:14px;z-index:5;background:#20170ecb;color:#ffe1ad;border:1px solid #9c7139;border-radius:999px;padding:7px 12px;font-size:12px';hero.append(motion);
motion.addEventListener('click',()=>{const disabled=document.documentElement.classList.toggle('v42-low-motion');motion.setAttribute('aria-pressed',String(disabled));motion.textContent=disabled?'Ativar efeitos':'Reduzir efeitos';renderEmbers();reset();if(disabled)menu.querySelectorAll('.v42-reveal').forEach(el=>el.classList.add('v42-visible'))});
})();
