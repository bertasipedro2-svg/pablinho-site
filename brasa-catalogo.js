window.loadBrasaCatalog = async function loadBrasaCatalog(origin, localProducts, linksUrl, categories) {
  const base = new URL(origin);
  if (base.protocol !== 'https:' && !(base.protocol === 'http:' && base.hostname === '127.0.0.1')) {
    throw new Error('Endereço do Brasa inválido');
  }
  const fetchJson = async url => {
    const response = await fetch(url, { cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Cardápio indisponível');
    return response.json();
  };
  const [data, links] = await Promise.all([
    fetchJson(new URL('/api/catalogo-v12', base)),
    fetchJson(linksUrl),
  ]);
  if (!Array.isArray(data.products) || data.products.length > 300) throw new Error('Cardápio inválido');
  const ids = new Set();
  return data.products.map(product => {
    const { id, name, category, description, price_cents, image_url, available } = product;
    if (typeof id !== 'string' || !/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(id)
      || ids.has(id) || typeof name !== 'string' || !name || !categories.includes(category)
      || typeof description !== 'string' || !Number.isSafeInteger(price_cents) || price_cents < 0
      || typeof available !== 'boolean' || typeof image_url !== 'string') throw new Error('Produto inválido');
    ids.add(id);
    const local = localProducts.find(item => item.nome === links[id]);
    const image = image_url.startsWith('https://') || (image_url.startsWith('/') && !image_url.startsWith('//'))
      ? new URL(image_url, base).href : local?.imagem || 'topo';
    return { id, nome: name, categoria: category, preco: price_cents / 100, descricao: description,
      icone: local?.icone || 'grid', imagem: image, disponivel: available };
  });
};
