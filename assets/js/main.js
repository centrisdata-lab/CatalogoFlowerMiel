// ---------------------------------------------
// Flower Miel — Catálogo digital
// ---------------------------------------------

const PRODUCTS = [
  {
    id: "miel-650",
    name: "Miel Pura y Cruda 650gr",
    category: "mieles",
    price: 35000,
    description: "Miel 100% pura y cruda, recolectada de las mejores flores. Conserva su sabor intenso y todas sus propiedades naturales.",
    image: "assets/img/miel-pura-650g.jpg"
  },
  {
    id: "miel-300",
    name: "Miel Pura y Cruda 300gr",
    category: "mieles",
    price: 18000,
    description: "Miel artesanal sin procesos de refinamiento, con la esencia natural de las flores en un sabor fresco e intenso.",
    image: "assets/img/miel-pura-300g.jpg"
  },
  {
    id: "miel-95",
    name: "Miel Pura y Cruda 95gr",
    category: "mieles",
    price: 6000,
    description: "Miel 100% pura y cruda en tamaño ideal para llevar siempre contigo y endulzar tus bebidas. Rica en antioxidantes y propiedades beneficiosas.",
    image: "assets/img/miel-pura-95g.jpg"
  },
  {
    id: "miel-abejas-nativas",
    name: "Miel de Abejas Nativas 5gr",
    category: "mieles",
    price: 10000,
    description: "Miel de abejas nativas, 100% natural, ideal para apoyar la salud visual gracias a sus antioxidantes naturales.",
    image: "assets/img/miel-abejas-nativas.jpg"
  },
  {
    id: "propoleo-25",
    name: "Extracto de Propóleo 25ml",
    category: "bienestar",
    price: 20000,
    description: "Propóleo natural con propiedades antioxidantes, ideal para fortalecer el sistema inmunológico y el bienestar diario.",
    image: "assets/img/propoleo-25ml.jpg"
  },
  {
    id: "polen-70",
    name: "Polen 70gr",
    category: "bienestar",
    price: 10000,
    description: "Rico en vitaminas, minerales y antioxidantes. Promueve la energía y el bienestar general de forma 100% natural.",
    image: "assets/img/polen-70g.jpg"
  },
  {
    id: "crema-facial-queen",
    name: "Crema Facial Queen 17gr",
    category: "cuidado-personal",
    price: 13000,
    description: "Crema facial restauradora a base de cera de abejas. Hidrata profundamente y protege tu piel de manera natural.",
    image: "assets/img/crema-facial-queen.jpg"
  },
  {
    id: "shampoo-natural",
    name: "Shampoo Natural 500ml",
    category: "cuidado-personal",
    price: 23000,
    description: "A base de extractos herbales, miel y propóleo. Limpia y nutre profundamente dejando el cabello suave y brillante.",
    image: "assets/img/shampoo-natural.jpg"
  },
  {
    id: "brillolips-bee",
    name: "Brillolips_Bee 7gr",
    category: "cuidado-personal",
    price: 8000,
    description: "Bálsamo labial 100% natural con cera de abejas. Hidrata, nutre y da brillo natural a tus labios.",
    image: "assets/img/brillolips-bee.jpg"
  },
  {
    id: "extracto-plantas",
    name: "Extracto de Plantas 240ml",
    category: "cuidado-personal",
    price: 30000,
    description: "Fórmula natural con extractos de plantas que ayuda a detener la caída del cabello y estimula su crecimiento.",
    image: "assets/img/extracto-plantas.jpg"
  },
  {
    id: "combo-miel",
    name: "Combo Miel",
    category: "combos",
    price: 38000,
    description: "Incluye Miel Pura y Cruda 300g, Crema Facial Restauradora Queen, Brillolips_Bee y bolinillo mielero. 100% natural.",
    image: "assets/img/combo-miel.jpg"
  },
  {
    id: "kit-natural",
    name: "Kit Natural Flower Miel",
    category: "combos",
    price: 65000,
    description: "Lo mejor de la colmena: Miel 650g, Polen 80g, Propóleo 35ml y bolinillo mielero. Fortalece tu sistema inmunológico.",
    image: "assets/img/kit-natural.jpg"
  },
  {
    id: "kit-natural-mini",
    name: "Kit Natural Mini",
    category: "combos",
    price: 48000,
    description: "Lo mejor de la colmena en presentación mini: Miel 300g, Polen 80g, Propóleo 35ml y bolinillo mielero. 100% natural.",
    image: "assets/img/kit-natural-mini.jpg"
  },
  {
    id: "combo-cafe-miel",
    name: "Combo Café + Miel",
    category: "combos",
    price: 70000,
    description: "Combo exclusivo Marcál Café + Flower Miel: Café Excelso Molido 250g y Miel de Abejas Pura y Cruda 650g. Dos marcas, lo mejor de la naturaleza.",
    image: "assets/img/combo-cafe-miel.jpg"
  },
  {
    id: "ahumador-apicultura",
    name: "Ahumador para Apicultura",
    category: "insumos-apicolas",
    price: 80000,
    description: "En acero inoxidable con fuelle y rejilla de protección. Calma a tus abejas de forma segura y revisa la colmena con total tranquilidad. El compañero infaltable de todo apicultor.",
    image: "assets/img/ahumador-apicultura.jpg"
  },
  {
    id: "cepillo-abejas",
    name: "Cepillo de Abejas",
    category: "insumos-apicolas",
    price: 15000,
    description: "Cerdas suaves y mango de madera para apartar a las abejas del panal sin lastimarlas. Ideal para cosechar tu miel cuidando cada abeja de la colmena.",
    image: "assets/img/cepillo-abejas.jpg"
  },
  {
    id: "colmena-abejas-nativas",
    name: "Colmena para Abejas Nativas (sin abejas)",
    category: "insumos-apicolas",
    price: 75000,
    description: "Colmena en madera diseñada para abejas nativas sin aguijón (meliponicultura). Lista para que instales tu propia colonia. Medidas internas 17×17 cm y 25 cm de altura; 4 piezas: piquera, 2 alzas y techo con respiradero.",
    image: "assets/img/colmena-abejas-nativas.jpg"
  },
  {
    id: "colmena-abejas-nativas-con-abejas",
    name: "Colmena para Abejas Nativas (con abejas)",
    category: "insumos-apicolas",
    price: 250000,
    description: "Colmena en madera con su colonia de abejas nativas sin aguijón ya establecida: llega viva, activa y lista para crecer. Medidas internas 17×17 cm y 25 cm de altura; 4 piezas: piquera, 2 alzas y techo con respiradero.",
    image: "assets/img/colmena-abejas-nativas-con-abejas.jpg"
  },
  {
    id: "jaula-benton-reina",
    name: "Jaula Benton para Reina",
    category: "insumos-apicolas",
    price: 1200,
    description: "La jaula clásica para transportar e introducir reinas con seguridad: compartimentos para el candi y la reina con su séquito, y ventilación adecuada en todo el viaje.",
    image: "assets/img/jaula-benton-reina.jpg"
  },
  {
    id: "jaula-introduccion-reina",
    name: "Jaula de Introducción para Reina",
    category: "insumos-apicolas",
    price: 15000,
    description: "Jaula tipo clip para presentar la nueva reina a la colmena de forma gradual y protegida, aumentando su aceptación por las obreras. Introducciones sin riesgo.",
    image: "assets/img/jaula-introduccion-reina.jpg"
  },
  {
    id: "jaula-marcaje-reinas",
    name: "Jaula de Marcaje para Reinas",
    category: "insumos-apicolas",
    price: 13000,
    description: "Tubo con émbolo de espuma que sujeta a la reina con delicadeza para marcarla con el código de color de su año. Identifícala fácil en cada revisión, sin dañarla.",
    image: "assets/img/jaula-marcaje-reinas.jpg"
  },
  {
    id: "levantador-marcos",
    name: "Levantador de Marcos",
    category: "insumos-apicolas",
    price: 30000,
    description: "Pinza levanta cuadros en acero con mangos de madera: agarra los marcos con firmeza y revisa tu colmena de forma rápida, cómoda y sin apretones.",
    image: "assets/img/levantador-marcos.jpg"
  },
  {
    id: "levantamarco",
    name: "Levantamarco",
    category: "insumos-apicolas",
    price: 23000,
    description: "Palanca multiusos en acero inoxidable con gancho levanta cuadros: despega marcos, raspa propóleo y cera. La herramienta esencial que no puede faltar en tu apiario.",
    image: "assets/img/levantamarco.jpg"
  },
  {
    id: "porta-candi-reina",
    name: "Porta Candi para Reina",
    category: "insumos-apicolas",
    price: 5000,
    description: "Alimenta y libera gradualmente a la reina durante su introducción: las obreras consumen el candi y la aceptan de forma natural. Sencillo, práctico y seguro.",
    image: "assets/img/porta-candi-reina.jpg"
  },
  {
    id: "rulo-cria-reinas",
    name: "Rulo para Cría de Reinas",
    category: "insumos-apicolas",
    price: 3500,
    description: "Protege la celda real y acompaña el nacimiento seguro de tus futuras reinas. Con copacelda y accesorios para criar reinas como un profesional.",
    image: "assets/img/rulo-cria-reinas.jpg"
  }
];

const CATEGORY_LABELS = {
  "mieles": "Mieles",
  "bienestar": "Bienestar",
  "cuidado-personal": "Cuidado Personal",
  "combos": "Combos y Kits",
  "insumos-apicolas": "Insumos Apícolas"
};

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = product.category;
  card.dataset.name = product.name.toLowerCase();
  card.dataset.productId = product.id;

  card.innerHTML = `
    <div class="product-image-wrap" data-zoom-trigger>
      <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-image">
      <span class="product-badge">${CATEGORY_LABELS[product.category] ?? ""}</span>
      <span class="zoom-hint">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </span>
    </div>
    <div class="product-body">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${priceFormatter.format(product.price)}</span>
        <div class="product-actions">
          <button type="button" class="btn-add-cart" aria-label="Agregar al carrito" title="Agregar al carrito">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="10" y1="10" x2="14" y2="10"/></svg>
          </button>
          <button type="button" class="btn btn-primary btn-buy">Comprar</button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function renderProducts(products) {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");

  grid.innerHTML = "";

  if (products.length === 0) {
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;
  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.appendChild(createProductCard(product)));
  grid.appendChild(fragment);
}

function filterProducts(searchTerm, category) {
  const term = searchTerm.trim().toLowerCase();

  return PRODUCTS.filter((product) => {
    const matchesCategory = category === "todos" || product.category === category;
    const matchesSearch =
      term === "" ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
}

function initBuyButtons() {
  const grid = document.getElementById("productGrid");
  grid.addEventListener("click", (event) => {
    const buyButton = event.target.closest(".btn-buy");
    const cartButton = event.target.closest(".btn-add-cart");
    if (!buyButton && !cartButton) return;

    const card = (buyButton || cartButton).closest(".product-card");
    const product = PRODUCTS.find((p) => p.id === card.dataset.productId);
    if (!product) return;

    if (buyButton) {
      window.FlowerPurchase.open(product);
      return;
    }

    window.FlowerCart.add(product);
    cartButton.classList.add("added");
    setTimeout(() => cartButton.classList.remove("added"), 1200);
  });
}

function initCatalog() {
  const searchInput = document.getElementById("searchInput");
  const chips = document.querySelectorAll(".chip");

  let activeCategory = "todos";

  const applyFilters = () => {
    const filtered = filterProducts(searchInput.value, activeCategory);
    renderProducts(filtered);
  };

  searchInput.addEventListener("input", applyFilters);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.dataset.filter;
      applyFilters();
    });
  });

  renderProducts(PRODUCTS);
}

function initNav() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initImageZoom() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imageModalImg");
  const modalCaption = document.getElementById("imageModalCaption");
  const modalClose = document.getElementById("imageModalClose");
  const grid = document.getElementById("productGrid");
  const gallery = document.getElementById("apiturismoGallery");

  function openModal(imageSrc, name) {
    modalImg.src = imageSrc;
    modalImg.alt = name;
    modalCaption.textContent = name;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-zoom-trigger]");
    if (!trigger) return;
    const card = trigger.closest(".product-card");
    const img = trigger.querySelector(".product-image");
    openModal(img.src, card.querySelector(".product-name").textContent);
  });

  gallery.addEventListener("click", (event) => {
    const img = event.target.closest("img");
    if (!img) return;
    openModal(img.src, img.alt);
  });

  const galleryToggle = document.getElementById("apiturismoGalleryToggle");
  if (galleryToggle) {
    galleryToggle.addEventListener("click", () => {
      const expanded = galleryToggle.dataset.expanded === "true";
      gallery.querySelectorAll(".gallery-item-extra").forEach((item) => {
        item.classList.toggle("gallery-item-hidden", expanded);
      });
      galleryToggle.dataset.expanded = String(!expanded);
      galleryToggle.textContent = expanded ? "Ver más fotos" : "Ver menos fotos";
    });
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCatalog();
  initBuyButtons();
  initNav();
  initHeaderScroll();
  initImageZoom();
  document.getElementById("year").textContent = new Date().getFullYear();
});
