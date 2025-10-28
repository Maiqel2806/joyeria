const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const btnMenu = document.getElementById('btnMenu');
const nav = document.getElementById('nav');
btnMenu?.addEventListener('click', () => {
  const expanded = btnMenu.getAttribute('aria-expanded') === 'true';
  btnMenu.setAttribute('aria-expanded', String(!expanded));
  nav.style.display = expanded ? '' : 'block';
});

// Search toggling
document.getElementById('openSearch')?.addEventListener('click', ()=>{
  document.getElementById('searchInput')?.focus();
});

// Hero rotation
const heroImg = document.querySelector('#heroSlide img');
const slides = [
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516632664305-eda5f98a1f4b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1600&auto=format&fit=crop'
];
let s = 0;
setInterval(()=>{
  s = (s + 1) % slides.length;
  heroImg.style.opacity = 0;
  setTimeout(()=>{ heroImg.src = slides[s]; heroImg.style.opacity = 1; }, 250);
}, 5000);

// Catalog logic
let PRODUCTS = [];
let currentCategory = 'Todas';

const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const matSelect = document.getElementById('matSelect');
const maxPrice = document.getElementById('maxPrice');

async function loadData(){
  const res = await fetch('/data/products.json');
  PRODUCTS = await res.json();
  render();
}

function render(){
  const term = (searchInput?.value || '').toLowerCase();
  const mat = matSelect?.value || 'Todos';
  const maxP = Number(maxPrice?.value || 0);

  let list = PRODUCTS.filter(p => {
    const byCat = currentCategory === 'Todas' ? true : p.category === currentCategory;
    const byTerm = !term || p.name.toLowerCase().includes(term) || p.tags?.some(t => t.toLowerCase().includes(term));
    const byMat = mat === 'Todos' ? true : p.material === mat;
    const byMax = maxP ? p.price <= maxP : true;
    return byCat && byTerm && byMat && byMax;
  });

  switch (sortSelect?.value){
    case 'priceAsc': list = list.sort((a,b)=>a.price-b.price); break;
    case 'priceDesc': list = list.sort((a,b)=>b.price-a.price); break;
    case 'newest': list = list.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); break;
    default: break; // featured as-is
  }

  grid.innerHTML = list.map(p => card(p)).join('');
  empty.hidden = list.length !== 0;
}

function card(p){
  const badge = p.onSale ? `<span class="badge">-${Math.round(100-(p.price/p.oldPrice*100))}%</span>` : '';
  const priceHtml = p.onSale ? `<div class="price">$${p.price} <s>$${p.oldPrice}</s></div>` : `<div class="price">$${p.price}</div>`;
  return `
    <article class="card-p">
      ${badge}
      <img src="${p.image}" alt="${p.name}"/>
      <div class="p-info">
        <div class="name">${p.name}</div>
        ${priceHtml}
      </div>
    </article>
  `;
}

// Events
document.querySelectorAll('.nav a[data-filter]').forEach(a => {
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    currentCategory = a.dataset.filter;
    render();
  });
});
searchInput?.addEventListener('input', render);
sortSelect?.addEventListener('change', render);
matSelect?.addEventListener('change', render);
maxPrice?.addEventListener('input', render);

loadData();
