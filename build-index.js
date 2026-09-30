const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'code.html');
let html = fs.readFileSync(srcPath, 'utf8');

console.log('Original code.html size:', html.length, 'bytes');

// 1. Ensure Title, Meta Tags, and Schema.org
const headInsert = `
  <title>Reformas Integrales Barcelona | Presupuesto Cerrado y Garantía por Escrito</title>
  <meta name="description" content="Reformas integrales de pisos, baños, cocinas y locales en Barcelona. Más de 177 reseñas 5 estrellas en Google. Presupuesto cerrado, obra por etapas y financiación sin intereses." />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="Reformas Integrales Barcelona | Sin Sorpresas" />
  <meta property="og:description" content="Presupuesto cerrado, obra por etapas y garantía por escrito. Pide presupuesto gratis o habla con un técnico especialista en Barcelona." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://reformasintegralesbarcelona.info/" />
  <link rel="canonical" href="https://reformasintegralesbarcelona.info/" />
  
  <!-- Schema.org HomeAndConstructionBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Reformas Integrales Barcelona",
    "image": "https://lh3.googleusercontent.com/aida/AEtjO1V0RzJhJuDp8-KiLX2RRU-56U4PTNIPt36OQsqVbyvCn1_SjNc5Zb9Zu1zoDeKV8ZHtj-ROSL8NDeXfNPdi599AVlwmPVhT5-OVQVKd6zBDZmCzTP2aBlVBmDpik1T_95QesFSxEDo-nXF8tfUfkImmCLH2nvZBjdmWkgUdc843NoCxWxbxIg-as1_mZl7Pc4Z4hZ1C6TdQ2Sa74B-camt4A0uH3Wi1NN19VtoYvRgUY1sr2LvMqQu2Yw",
    "@id": "https://reformasintegralesbarcelona.info/",
    "url": "https://reformasintegralesbarcelona.info/",
    "telephone": "+34936940338",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Santa Carolina 77",
      "addressLocality": "Barcelona",
      "postalCode": "08025",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4116,
      "longitude": 2.1678
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "177",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "€€ - €€€"
  }
  </script>
`;

if (!html.includes('<title>')) {
  html = html.replace('<head>', '<head>' + headInsert);
}

// 2. Add scroll padding and smooth scrolling to CSS
const cssAddition = `
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5.5rem;
}
/* Before / After Slider Styles */
.ba-container {
  position: relative;
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;
}
.ba-container img {
  pointer-events: none;
}
.ba-before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  clip-path: inset(0 50% 0 0);
  transition: clip-path 0.05s ease-out;
}
.ba-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  cursor: ew-resize;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 25;
  transition: left 0.05s ease-out;
}
.ba-handle-btn {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background-color: #fc9430;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border: 2px solid #ffffff;
}
.ba-range {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
  z-index: 30;
  margin: 0;
  padding: 0;
}
`;

html = html.replace('</style>', cssAddition + '</style>');

// 3. Fix Desktop Navigation Links
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="servicios" href="#">Servicios</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="servicios" href="#servicios">Servicios</a>'
);
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="proyectos" href="#">Proyectos</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="proyectos" href="#proyectos">Proyectos</a>'
);
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="como-trabajamos" href="#">Cómo trabajamos</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="como-trabajamos" href="#como-trabajamos">Cómo trabajamos</a>'
);
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="precios" href="#">Precios</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="precios" href="#precios">Precios</a>'
);
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opiniones" href="#">Opiniones</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="opiniones" href="#opiniones">Opiniones</a>'
);
html = html.replace(
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="contacto" href="#">Contacto</a>',
  '<a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="contacto" href="#contacto">Contacto</a>'
);
html = html.replace(
  'data-path="pedir-presupuesto" href="#">Pide presupuesto gratis</a>',
  'data-path="pedir-presupuesto" href="#presupuesto">Pide presupuesto gratis</a>'
);

// 4. Add Section IDs
html = html.replace(
  '<!-- 3. SERVICIOS ("¿Qué reformamos?") -->\n<section class="w-full py-20 bg-surface">',
  '<!-- 3. SERVICIOS ("¿Qué reformamos?") -->\n<section class="w-full py-20 bg-surface" id="servicios">'
);
html = html.replace(
  '<!-- 4. PROYECTOS ANTES / DESPUÉS ("Así quedan nuestras reformas") -->\n<section class="w-full py-20 bg-surface-container-low">',
  '<!-- 4. PROYECTOS ANTES / DESPUÉS ("Así quedan nuestras reformas") -->\n<section class="w-full py-20 bg-surface-container-low" id="proyectos">'
);
html = html.replace(
  '<!-- 5. CÓMO TRABAJAMOS (Línea de tiempo con 5 pasos numerados) -->\n<section class="w-full py-20 bg-surface">',
  '<!-- 5. CÓMO TRABAJAMOS (Línea de tiempo con 5 pasos numerados) -->\n<section class="w-full py-20 bg-surface" id="como-trabajamos">'
);
html = html.replace(
  '<!-- 11. PREGUNTAS FRECUENTES (FAQ Acordeón) -->\n<section class="w-full py-20 bg-surface-container-low">',
  '<!-- 11. PREGUNTAS FRECUENTES (FAQ Acordeón) -->\n<section class="w-full py-20 bg-surface-container-low" id="faq">'
);

// 5. Add Hamburger Button and Mobile Drawer in Header
const headerTarget = '<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header>';
const headerReplacement = `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
<button id="mobile-menu-open-btn" class="xl:hidden w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container transition-colors" aria-label="Abrir menú">
  <span class="material-symbols-outlined text-[24px]">menu</span>
</button>
</div></div></header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-menu-drawer" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
  <div id="mobile-menu-content" class="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-surface-container-lowest p-6 shadow-2xl flex flex-col justify-between transform translate-x-full transition-transform duration-300 overflow-y-auto">
    <div>
      <div class="flex items-center justify-between pb-6 border-b border-surface-container">
        <div class="flex items-center gap-2">
          <span class="font-headline-sm text-headline-sm text-primary font-bold">Menú</span>
        </div>
        <button id="mobile-menu-close-btn" class="w-9 h-9 rounded-full bg-surface-container-low text-primary flex items-center justify-center hover:bg-surface-container" aria-label="Cerrar menú">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      <nav class="flex flex-col gap-4 py-6 font-label-lg text-label-lg">
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#servicios">Servicios</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#proyectos">Proyectos Antes / Después</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#como-trabajamos">Cómo trabajamos</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#precios">Precios y Calculadora</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#opiniones">Opiniones Google (177)</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#faq">Preguntas Frecuentes</a>
        <a class="mobile-nav-link text-on-surface hover:text-secondary py-2 transition-colors border-b border-surface-container-low" href="#contacto">Contacto y Sede</a>
      </nav>
    </div>
    <div class="pt-6 border-t border-surface-container flex flex-col gap-3">
      <a class="flex items-center justify-center gap-2 h-12 bg-secondary-container text-on-secondary rounded-xl font-label-md font-bold shadow-md hover:bg-secondary transition-all" href="#presupuesto" id="mobile-presupuesto-btn">
        <span class="material-symbols-outlined text-[20px]">description</span>
        <span>Pedir presupuesto gratis</span>
      </a>
      <a class="flex items-center justify-center gap-2 h-11 bg-primary text-on-primary rounded-xl font-label-md font-semibold hover:bg-primary-container transition-all" href="tel:+34936940338">
        <span class="material-symbols-outlined text-[20px]">call</span>
        <span>Llamar al 936 94 03 38</span>
      </a>
      <a class="flex items-center justify-center gap-2 h-11 bg-[#25D366] text-white rounded-xl font-label-md font-semibold hover:brightness-105 transition-all" href="https://wa.me/34644701077" target="_blank" rel="noopener noreferrer">
        <span class="material-symbols-outlined text-[20px]">chat</span>
        <span>WhatsApp 644 70 10 77</span>
      </a>
    </div>
  </div>
</div>`;

html = html.replace(headerTarget, headerReplacement);

// 6. Add Interactive Before / After Sliders in Section 4
// Project 1
const p1Target = `<div class="relative h-72 w-full select-none" id="slider-project-1">
<img class="absolute inset-0 w-full h-full object-cover" data-alt="After view of renovated modern Eixample apartment with warm lit Catalan vaulted ceiling, open marble kitchen island, chevron wood floors and bright terrace doors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9KLM1G6PADzs0aaAm4eGD57GBxoIu-PGx0NeOSPrheH0Zia7y7lF1gnq7_n5ljxuhXaHvRGA3GDiKSYJ2_-TXyEVQ8-TBL6WEz_surZRF8oAnVV4o48rhSBq80mH5Z-I3UtneXKdZEEO-HoLXUZPhfbAxvJ20WoVREJEnDgO8-5mwm1SBBqJ-kOjRFWpbTWV5WPCgjmD2Whq8psolSsgcyvHxOrxnkGR_lDsRW2BVXcUIC0RgglA"/>
<!-- Before layer with clip overlay simulation -->
<div class="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-surface-container-lowest">
<img class="w-[200%] max-w-none h-full object-cover" data-alt="Before view of outdated dark Barcelona apartment with old cracked tiles, obsolete electrical wiring, deteriorated dropped false ceilings and dark compartmentalized rooms." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_FAx0YBuh15jNVWIR4YLPct0_sV-DU9cyaHUf3gWrEFkNF9gk6bPzLX2kVzejZ1RasoxdViQ8ObEIhvJwDBMy-zGog0IEDv4bLQNNFaxcQSgsp80CzHo-FcWT79PTSUWirJlDsOZZlKh2cpnXwO_U2sJD9YMgXOahILxP3YJXlLsrLg7MvbTrRHzqJ1kEVcPMaDSVIUsPFDRNG6ObVBfRmAtFH-EsnTQ8uSUxIqicYOF8lzol7rw"/>
</div>
<!-- Labels -->
<span class="absolute bottom-3 left-3 bg-tertiary-container/85 text-surface font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">ANTES</span>
<span class="absolute bottom-3 right-3 bg-secondary-container/90 text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">DESPUÉS</span>
</div>`;

const p1Replacement = `<div class="ba-container relative h-72 w-full select-none" data-ba-slider="true">
  <img class="absolute inset-0 w-full h-full object-cover" alt="Después: Reforma Piso Modernista Eixample" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9KLM1G6PADzs0aaAm4eGD57GBxoIu-PGx0NeOSPrheH0Zia7y7lF1gnq7_n5ljxuhXaHvRGA3GDiKSYJ2_-TXyEVQ8-TBL6WEz_surZRF8oAnVV4o48rhSBq80mH5Z-I3UtneXKdZEEO-HoLXUZPhfbAxvJ20WoVREJEnDgO8-5mwm1SBBqJ-kOjRFWpbTWV5WPCgjmD2Whq8psolSsgcyvHxOrxnkGR_lDsRW2BVXcUIC0RgglA"/>
  <div class="ba-before">
    <img class="absolute inset-0 w-full h-full object-cover" alt="Antes: Piso Modernista Eixample" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_FAx0YBuh15jNVWIR4YLPct0_sV-DU9cyaHUf3gWrEFkNF9gk6bPzLX2kVzejZ1RasoxdViQ8ObEIhvJwDBMy-zGog0IEDv4bLQNNFaxcQSgsp80CzHo-FcWT79PTSUWirJlDsOZZlKh2cpnXwO_U2sJD9YMgXOahILxP3YJXlLsrLg7MvbTrRHzqJ1kEVcPMaDSVIUsPFDRNG6ObVBfRmAtFH-EsnTQ8uSUxIqicYOF8lzol7rw"/>
  </div>
  <div class="ba-handle">
    <div class="ba-handle-btn">
      <span class="material-symbols-outlined text-[20px]">drag_indicator</span>
    </div>
  </div>
  <input type="range" min="0" max="100" value="50" class="ba-range" aria-label="Deslizar antes y después" />
  <span class="absolute bottom-3 left-3 bg-tertiary-container/90 text-surface font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">ANTES</span>
  <span class="absolute bottom-3 right-3 bg-secondary-container/95 text-on-secondary font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">DESPUÉS</span>
</div>`;

// Project 2
const p2Target = `<div class="relative h-72 w-full select-none">
<img class="absolute inset-0 w-full h-full object-cover" data-alt="After view of renovated penthouse in Gracia Barcelona with wall-to-wall glass sliders looking onto wooden decked terrace, minimalist white interior, and oak wood accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjbLKKKvu-PSx-hLXBrKUtwUsroXNH-0hHgSxU-zQjzKTfJkzKdyJ9ZlR7gfh1pOVu6a5nFNPSU77Rk4bfv8lJxFZS7j2d4OTdgPTchhgZP5WGtHZgCFvOgdZ-2H0rib7ZKN6idRPmgzBKrJIjKwm_CrNQXk8Kx_5Y1qp_rR8LUdIiJZaEM9HUfsjSE288pUtoss3AP5hrRh4oI_caxO1bq6DjuV71DEimz4Uy8z7DsJfKO-mAbiU"/>
<div class="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-surface-container-lowest">
<img class="w-[200%] max-w-none h-full object-cover" data-alt="Before view of neglected attic flat in Gracia with water stained walls, old metal window frames, and narrow cramped corridor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDALyoJ977Yunye_C9e5InYaqaM8GxN3NhV8HbOpxDdVML48whseq5SSWVeetXBChdYjkpU45TmLKOL2tAeejcY4aVUczsmlckwXyvWDge6lfME38M-En2GBZy4EveCaM9mHhQY_OZ0_o1LPBkOgS1DFRdTgiG0zjFHEmMOScPWtFa-m1MqeS_cmQXtF5cgaqQL8ILEx7bOMWni6bHgWHUuZzKxtsuMGCouR7hzAC6nL2bcvMio"/>
</div>
<span class="absolute bottom-3 left-3 bg-tertiary-container/85 text-surface font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">ANTES</span>
<span class="absolute bottom-3 right-3 bg-secondary-container/90 text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">DESPUÉS</span>
</div>`;

const p2Replacement = `<div class="ba-container relative h-72 w-full select-none" data-ba-slider="true">
  <img class="absolute inset-0 w-full h-full object-cover" alt="Después: Ático con Terraza en Gràcia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjbLKKKvu-PSx-hLXBrKUtwUsroXNH-0hHgSxU-zQjzKTfJkzKdyJ9ZlR7gfh1pOVu6a5nFNPSU77Rk4bfv8lJxFZS7j2d4OTdgPTchhgZP5WGtHZgCFvOgdZ-2H0rib7ZKN6idRPmgzBKrJIjKwm_CrNQXk8Kx_5Y1qp_rR8LUdIiJZaEM9HUfsjSE288pUtoss3AP5hrRh4oI_caxO1bq6DjuV71DEimz4Uy8z7DsJfKO-mAbiU"/>
  <div class="ba-before">
    <img class="absolute inset-0 w-full h-full object-cover" alt="Antes: Ático con Terraza en Gràcia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDALyoJ977Yunye_C9e5InYaqaM8GxN3NhV8HbOpxDdVML48whseq5SSWVeetXBChdYjkpU45TmLKOL2tAeejcY4aVUczsmlckwXyvWDge6lfME38M-En2GBZy4EveCaM9mHhQY_OZ0_o1LPBkOgS1DFRdTgiG0zjFHEmMOScPWtFa-m1MqeS_cmQXtF5cgaqQL8ILEx7bOMWni6bHgWHUuZzKxtsuMGCouR7hzAC6nL2bcvMio"/>
  </div>
  <div class="ba-handle">
    <div class="ba-handle-btn">
      <span class="material-symbols-outlined text-[20px]">drag_indicator</span>
    </div>
  </div>
  <input type="range" min="0" max="100" value="50" class="ba-range" aria-label="Deslizar antes y después" />
  <span class="absolute bottom-3 left-3 bg-tertiary-container/90 text-surface font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">ANTES</span>
  <span class="absolute bottom-3 right-3 bg-secondary-container/95 text-on-secondary font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">DESPUÉS</span>
</div>`;

// Project 3
const p3Target = `<div class="relative h-72 w-full select-none">
<img class="absolute inset-0 w-full h-full object-cover" data-alt="After view of luxury family home renovation in Sarria Barcelona with built-in custom wood paneling, aerothermal hidden HVAC ducts, and designer neutral furnishings." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4O4pDo39ntbsdzfxRzi1dTwjR7h_KERJdTbUBenU1aCC5twE3v8PIl1BuKtWpSa8VvTQUosacBY53eXTwhnizyS0SuAmbEc7MgYANmti7RInk-fo4GI4sbI4-CB7SZpXCk6talAh2pOW2zlOTTi696-0TtOPLiEAPUgOEWWhMOwEg0XSLW5RGIyUhe3F_YfgAD1i4H4hiFnfukAozQHa2sucJV6SSNgC81HDjeUxQYUkTVpiuM-g"/>
<div class="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-surface-container-lowest">
<img class="w-[200%] max-w-none h-full object-cover" data-alt="Before view of run-down residential flat with dated yellowed wallpaper, dark wooden partitions, and old cast iron radiators." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlRUN1a7G8K3hX7xfCYfT8RSOBTBm6zJRCrdpIPikwdEksPJdhi6xw_B7ME15Fma6mBGaF-7CZt-EP4u_Xob6MdlWwsWViKjrFfqfh4XaRIXPH4VV-e9q94TUnUgcdGK0O5yHS__jWia6NPGug4BHOtuBKFPXZfIts8ejvqGKzlXrcxwVXgjN98wkQW1f12ntD6LZRpyDL_WHC8h_j0wRBo1e5spaMQ_vSMWWc9hZGWKzF-bYUc6s"/>
</div>
<span class="absolute bottom-3 left-3 bg-tertiary-container/85 text-surface font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">ANTES</span>
<span class="absolute bottom-3 right-3 bg-secondary-container/90 text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded backdrop-blur-sm">DESPUÉS</span>
</div>`;

const p3Replacement = `<div class="ba-container relative h-72 w-full select-none" data-ba-slider="true">
  <img class="absolute inset-0 w-full h-full object-cover" alt="Después: Reforma Integral Sarrià" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4O4pDo39ntbsdzfxRzi1dTwjR7h_KERJdTbUBenU1aCC5twE3v8PIl1BuKtWpSa8VvTQUosacBY53eXTwhnizyS0SuAmbEc7MgYANmti7RInk-fo4GI4sbI4-CB7SZpXCk6talAh2pOW2zlOTTi696-0TtOPLiEAPUgOEWWhMOwEg0XSLW5RGIyUhe3F_YfgAD1i4H4hiFnfukAozQHa2sucJV6SSNgC81HDjeUxQYUkTVpiuM-g"/>
  <div class="ba-before">
    <img class="absolute inset-0 w-full h-full object-cover" alt="Antes: Reforma Integral Sarrià" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlRUN1a7G8K3hX7xfCYfT8RSOBTBm6zJRCrdpIPikwdEksPJdhi6xw_B7ME15Fma6mBGaF-7CZt-EP4u_Xob6MdlWwsWViKjrFfqfh4XaRIXPH4VV-e9q94TUnUgcdGK0O5yHS__jWia6NPGug4BHOtuBKFPXZfIts8ejvqGKzlXrcxwVXgjN98wkQW1f12ntD6LZRpyDL_WHC8h_j0wRBo1e5spaMQ_vSMWWc9hZGWKzF-bYUc6s"/>
  </div>
  <div class="ba-handle">
    <div class="ba-handle-btn">
      <span class="material-symbols-outlined text-[20px]">drag_indicator</span>
    </div>
  </div>
  <input type="range" min="0" max="100" value="50" class="ba-range" aria-label="Deslizar antes y después" />
  <span class="absolute bottom-3 left-3 bg-tertiary-container/90 text-surface font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">ANTES</span>
  <span class="absolute bottom-3 right-3 bg-secondary-container/95 text-on-secondary font-label-sm px-2.5 py-1 rounded backdrop-blur-sm pointer-events-none z-20">DESPUÉS</span>
</div>`;

html = html.replace(p1Target, p1Replacement);
html = html.replace(p2Target, p2Replacement);
html = html.replace(p3Target, p3Replacement);

// 7. Success Modal Component
const modalHtml = `
<!-- Lead Success Modal -->
<div id="lead-success-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
  <div class="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-8 shadow-2xl transform transition-all text-center">
    <div class="w-16 h-16 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center mx-auto mb-4">
      <span class="material-symbols-outlined text-[36px]">verified</span>
    </div>
    <span class="font-label-sm uppercase tracking-wider text-secondary font-bold">Solicitud Registrada</span>
    <h3 class="font-headline-sm text-headline-sm text-primary mt-1 mb-3">¡Gracias por contactar con nosotros!</h3>
    <p class="font-body-md text-on-surface-variant mb-6 leading-relaxed" id="modal-success-msg">
      Hemos recibido tus datos correctamente. Un técnico especialista de <strong>Reformas Integrales Barcelona</strong> revisará tu proyecto y se pondrá en contacto contigo en menos de 24 horas.
    </p>
    <div class="bg-surface-container-low rounded-xl p-4 mb-6 text-left flex items-start gap-3">
      <span class="material-symbols-outlined text-primary text-[20px] mt-0.5">info</span>
      <div class="font-body-sm text-on-surface-variant">
        <p class="font-semibold text-primary">Próximos pasos:</p>
        <p>1. Contacto telefónico para resolver dudas previas.</p>
        <p>2. Visita técnica sin coste en tu vivienda o local.</p>
        <p>3. Entrega de presupuesto cerrado con desglose de partidas.</p>
      </div>
    </div>
    <button id="modal-close-btn" class="w-full h-12 bg-secondary-container text-on-secondary rounded-xl font-label-lg font-bold hover:bg-secondary transition-all shadow-md">
      Entendido, volver a la página
    </button>
  </div>
</div>

<!-- RGPD Cookie Consent Banner -->
<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container shadow-2xl hidden">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="flex items-start sm:items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined">cookie</span>
      </div>
      <p class="font-body-sm text-on-surface-variant">
        Utilizamos cookies técnicas y analíticas para optimizar tu experiencia y permitirte solicitar presupuestos sin compromiso conforme a la normativa RGPD. Consulta nuestra <a href="#" class="underline text-primary hover:text-secondary">Política de Privacidad</a>.
      </p>
    </div>
    <div class="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
      <button id="cookie-reject-btn" class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface font-label-sm hover:bg-surface-container-low transition-colors">
        Solo necesarias
      </button>
      <button id="cookie-accept-btn" class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-secondary-container text-on-secondary font-label-sm font-bold shadow-sm hover:bg-secondary transition-colors">
        Aceptar todas
      </button>
    </div>
  </div>
</div>
`;

// Insert modal and cookie banner before </body>
html = html.replace('</body>', modalHtml + '\n</body>');

// 8. Add Complete Client Scripts (Sliders, Modal, Cookie, Mobile Menu, Calculator WhatsApp)
const scriptAdditions = `
<script>
  // Interactive Before/After Sliders
  document.querySelectorAll('[data-ba-slider="true"]').forEach(function(slider) {
    var range = slider.querySelector('.ba-range');
    var beforeLayer = slider.querySelector('.ba-before');
    var handle = slider.querySelector('.ba-handle');

    function updateSlider(val) {
      if (beforeLayer) beforeLayer.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)';
      if (handle) handle.style.left = val + '%';
    }

    if (range) {
      range.addEventListener('input', function(e) {
        updateSlider(e.target.value);
      });
      // Initial value
      updateSlider(range.value);
    }
  });

  // Mobile Menu Drawer Logic
  (function() {
    var openBtn = document.getElementById('mobile-menu-open-btn');
    var closeBtn = document.getElementById('mobile-menu-close-btn');
    var drawer = document.getElementById('mobile-menu-drawer');
    var content = document.getElementById('mobile-menu-content');
    var navLinks = document.querySelectorAll('.mobile-nav-link');
    var mobilePresupuestoBtn = document.getElementById('mobile-presupuesto-btn');

    function openMenu() {
      if (!drawer || !content) return;
      drawer.classList.remove('hidden');
      setTimeout(function() {
        drawer.classList.remove('opacity-0');
        content.classList.remove('translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!drawer || !content) return;
      drawer.classList.add('opacity-0');
      content.classList.add('translate-x-full');
      setTimeout(function() {
        drawer.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (drawer) {
      drawer.addEventListener('click', function(e) {
        if (e.target === drawer) closeMenu();
      });
    }

    navLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
    if (mobilePresupuestoBtn) {
      mobilePresupuestoBtn.addEventListener('click', closeMenu);
    }
  })();

  // Modal Notification Logic
  function showLeadSuccess(name, phone) {
    var modal = document.getElementById('lead-success-modal');
    var msg = document.getElementById('modal-success-msg');
    if (msg && name) {
      msg.innerHTML = 'Hemos recibido tus datos correctamente, <strong>' + name + '</strong>. Un arquitecto técnico de <strong>Reformas Integrales Barcelona</strong> te llamará al <strong>' + (phone || '') + '</strong> en menos de 24 horas laborables para coordinar tu visita técnica gratuita.';
    }
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  var modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
      var modal = document.getElementById('lead-success-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // Hook Hero Form & CTA Form
  var heroForm = document.querySelector('#presupuesto form');
  if (heroForm) {
    heroForm.removeAttribute('onsubmit');
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('lead_name') ? document.getElementById('lead_name').value : '';
      var phone = document.getElementById('lead_phone') ? document.getElementById('lead_phone').value : '';
      showLeadSuccess(name, phone);
      heroForm.reset();
    });
  }

  var ctaForm = document.querySelector('section#contacto form, section.bg-primary-container form');
  if (ctaForm) {
    ctaForm.removeAttribute('onsubmit');
    ctaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('cta_name') ? document.getElementById('cta_name').value : '';
      var phone = document.getElementById('cta_phone') ? document.getElementById('cta_phone').value : '';
      showLeadSuccess(name, phone);
      ctaForm.reset();
    });
  }

  // Hook Calculator Phone CTA
  var calcPhoneInput = document.getElementById('calc-phone');
  if (calcPhoneInput) {
    var calcPhoneBtn = calcPhoneInput.parentElement.querySelector('button');
    if (calcPhoneBtn) {
      calcPhoneBtn.addEventListener('click', function() {
        var phone = calcPhoneInput.value.trim();
        if (!phone || phone.length < 9) {
          alert('Por favor, introduce un número de teléfono válido para enviarte el desglose.');
          calcPhoneInput.focus();
          return;
        }
        var est = document.getElementById('calc-result') ? document.getElementById('calc-result').textContent.trim() : '';
        showLeadSuccess('Estimado cliente', phone);
        calcPhoneInput.value = '';
      });
    }
  }

  // RGPD Cookie Consent
  (function() {
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept-btn');
    var rejectBtn = document.getElementById('cookie-reject-btn');

    if (!localStorage.getItem('cookie_consent_rib')) {
      setTimeout(function() {
        if (banner) banner.classList.remove('hidden');
      }, 1000);
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookie_consent_rib', 'accepted');
        if (banner) banner.classList.add('hidden');
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookie_consent_rib', 'necessary_only');
        if (banner) banner.classList.add('hidden');
      });
    }
  })();
</script>
`;

html = html.replace('</body>', scriptAdditions + '\n</body>');

const targetFile = path.join(__dirname, 'index.html');
fs.writeFileSync(targetFile, html, 'utf8');
console.log('Successfully wrote index.html! File size:', fs.statSync(targetFile).size, 'bytes');
