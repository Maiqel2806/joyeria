# Joyería — Starter VS Code (Vite + JSON)

Proyecto base para tu web de joyería en **VS Code**, con inventario **cambiante** vía `data/products.json` (sin backend).

## Requisitos
- Node.js 18+
- VS Code

## Ejecutar
```bash
npm install
npm run dev
```
Abre la URL que te mostrará Vite.

## Estructura
```
joyeria-vscode/
├─ data/
│  └─ products.json        # inventario editable
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ main.js              # lógica de filtros/búsqueda/orden
│  ├─ styles.css           # estilos base
├─ index.html              # layout principal
├─ package.json
└─ README.md
```

## Inventario cambiante
Edita `data/products.json` y guarda; el sitio se **actualiza** (HMR de Vite). Campo por producto:
```json
{
  "id": 1,
  "name": "Anillo Sol",
  "category": "Anillos",
  "material": "Plata 925",
  "price": 69,
  "oldPrice": 0,
  "onSale": false,
  "createdAt": "2025-09-10",
  "image": "https://...",
  "tags": ["solitario","minimal"]
}
```

## Siguientes pasos
- Conectar a un CMS Headless (Strapi/Shopify Headless) cuando quieras administración online.
- Añadir carrito/checkout (Shopify Buy SDK, Snipcart, o pasarela local).
- SEO: titles/OG/Schema en `index.html`.
- Reemplazar imágenes por las tuyas.
