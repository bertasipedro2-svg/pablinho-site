const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const json = fs.readFileSync('catalogo-dados.json','utf8');
const good = () => Response.json(JSON.parse(json));
async function mount(path, response, initial = {}, deny = false) {
  const source = fs.readFileSync(''+path,'utf8').replace(/<script src="[^"]*imperial-v4-2-images\.js"><\/script>/, () => '<script>'+fs.readFileSync('imperial-v4-2-images.js','utf8')+'</script>');
  const dom = new JSDOM(source, {
    url: 'https://pablinho.test/' + path, runScripts: 'dangerously',
    beforeParse(window) {
      window.AbortSignal = AbortSignal;
      for (const [key,value] of Object.entries(initial)) window.localStorage.setItem(key,value);
      if (deny) Object.defineProperty(window, 'localStorage', {get(){throw Error('blocked')}});
      window.fetch = async () => response();
      window.confirm = () => true;
    },
  });
  await new Promise(r => setTimeout(r,20));
  return dom;
}
(async () => {
  for (const path of ['index.html','v12/index.html']) {
    let dom = await mount(path, good);
    let window = dom.window;
    assert.equal(window.document.querySelectorAll('#menu .product').length,27);
    window.document.querySelector('#menu .add').click();
    const initial = Object.fromEntries(Object.keys(window.localStorage).map(k=>[k,window.localStorage.getItem(k)]));
    assert.notEqual(initial['pablinho-cart-v1'],'{}');
    dom.window.close();
    dom = await mount(path, () => new Response('',{status:503}), initial);
    window=dom.window;
    assert(window.document.querySelector('#menu [role=alert]'));
    assert(window.document.querySelector('#enviar').disabled);
    assert.equal(window.localStorage.getItem('pablinho-cart-v1'),initial['pablinho-cart-v1']);
    dom.window.close();
    dom = await mount(path, good, initial);
    assert.equal(dom.window.document.querySelector('#count').textContent,'1');
    dom.window.close();
    console.log(path + ': catálogo, falha sem venda e recuperação do carrinho');
  }
  const dom = await mount('admin/index.html',good,{},true);
  const {window} = dom;
  const doc = window.document;
  assert.equal(doc.querySelectorAll('.card').length,27);
  doc.querySelector('[name=preco]').value='';
  doc.querySelector('#export').click();
  assert.match(doc.querySelector('#status').textContent,/preço válido/);
  let exported;
  window.URL.createObjectURL = blob => { exported = blob; return '#download'; };
  window.HTMLAnchorElement.prototype.click = () => {};
  doc.querySelector('[name=preco]').value='95.90';
  doc.querySelector('#export').click();
  const text = await new Promise((resolve,reject)=>{const r=new window.FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsText(exported)});
  assert.equal(JSON.parse(text).produtos[0].preco,95.9);
  dom.window.close();
  const failed = await mount('admin/index.html', () => new Response('',{status:503}), {'pablinho-v12-admin-draft':json});
  assert.equal(failed.window.document.querySelectorAll('.card').length,27);
  assert.equal(failed.window.document.querySelector('#export').disabled,false);
  failed.window.close();
  console.log('Editor: storage bloqueado, preço inválido, exportação e recuperação local após HTTP 503');
})().catch(e=>{console.error(e);process.exitCode=1;});
