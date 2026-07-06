// ---------------------------------------------
// Flower Miel — Catálogo digital (vendedores, sin WhatsApp)
// ---------------------------------------------

const PRODUCTS = [
  {
    id: "miel-650",
    name: "Miel Pura y Cruda 650gr",
    category: "mieles",
    price: 35000,
    description: "Miel 100% pura y cruda, recolectada de las mejores flores. Conserva su sabor intenso y todas sus propiedades naturales.",
    image: "../assets/img/miel-pura-650g.jpg"
  },
  {
    id: "miel-300",
    name: "Miel Pura y Cruda 300gr",
    category: "mieles",
    price: 18000,
    description: "Miel artesanal sin procesos de refinamiento, con la esencia natural de las flores en un sabor fresco e intenso.",
    image: "../assets/img/miel-pura-300g.jpg"
  },
  {
    id: "miel-95",
    name: "Miel Pura y Cruda 95gr",
    category: "mieles",
    price: 6000,
    description: "Miel 100% pura y cruda en tamaño ideal para llevar siempre contigo y endulzar tus bebidas. Rica en antioxidantes y propiedades beneficiosas.",
    image: "../assets/img/miel-pura-95g.jpg"
  },
  {
    id: "miel-abejas-nativas",
    name: "Miel de Abejas Nativas 5gr",
    category: "mieles",
    price: 10000,
    description: "Miel de abejas nativas, 100% natural, ideal para apoyar la salud visual gracias a sus antioxidantes naturales.",
    image: "../assets/img/miel-abejas-nativas.jpg"
  },
  {
    id: "propoleo-25",
    name: "Extracto de Propóleo 25ml",
    category: "bienestar",
    price: 20000,
    description: "Propóleo natural con propiedades antioxidantes, ideal para fortalecer el sistema inmunológico y el bienestar diario.",
    image: "../assets/img/propoleo-25ml.jpg"
  },
  {
    id: "polen-70",
    name: "Polen 70gr",
    category: "bienestar",
    price: 10000,
    description: "Rico en vitaminas, minerales y antioxidantes. Promueve la energía y el bienestar general de forma 100% natural.",
    image: "../assets/img/polen-70g.jpg"
  },
  {
    id: "crema-facial-queen",
    name: "Crema Facial Queen 17gr",
    category: "cuidado-personal",
    price: 13000,
    description: "Crema facial restauradora a base de cera de abejas. Hidrata profundamente y protege tu piel de manera natural.",
    image: "../assets/img/crema-facial-queen.jpg"
  },
  {
    id: "shampoo-natural",
    name: "Shampoo Natural 500ml",
    category: "cuidado-personal",
    price: 23000,
    description: "A base de extractos herbales, miel y propóleo. Limpia y nutre profundamente dejando el cabello suave y brillante.",
    image: "../assets/img/shampoo-natural.jpg"
  },
  {
    id: "brillolips-bee",
    name: "Brillolips_Bee 7gr",
    category: "cuidado-personal",
    price: 8000,
    description: "Bálsamo labial 100% natural con cera de abejas. Hidrata, nutre y da brillo natural a tus labios.",
    image: "../assets/img/brillolips-bee.jpg"
  },
  {
    id: "extracto-plantas",
    name: "Extracto de Plantas 240ml",
    category: "cuidado-personal",
    price: 30000,
    description: "Fórmula natural con extractos de plantas que ayuda a detener la caída del cabello y estimula su crecimiento.",
    image: "../assets/img/extracto-plantas.jpg"
  },
  {
    id: "combo-miel",
    name: "Combo Miel",
    category: "combos",
    price: 38000,
    description: "Incluye Miel Pura y Cruda 300g, Crema Facial Restauradora Queen, Brillolips_Bee y bolinillo mielero. 100% natural.",
    image: "../assets/img/combo-miel.jpg"
  },
  {
    id: "kit-natural",
    name: "Kit Natural Flower Miel",
    category: "combos",
    price: 65000,
    description: "Lo mejor de la colmena: Miel 650g, Polen 80g, Propóleo 35ml y bolinillo mielero. Fortalece tu sistema inmunológico.",
    image: "../assets/img/kit-natural.jpg"
  },
  {
    id: "kit-natural-mini",
    name: "Kit Natural Mini",
    category: "combos",
    price: 48000,
    description: "Lo mejor de la colmena en presentación mini: Miel 300g, Polen 80g, Propóleo 35ml y bolinillo mielero. 100% natural.",
    image: "../assets/img/kit-natural-mini.jpg"
  },
  {
    id: "combo-cafe-miel",
    name: "Combo Café + Miel",
    category: "combos",
    price: 70000,
    description: "Combo exclusivo Marcál Café + Flower Miel: Café Excelso Molido 250g y Miel de Abejas Pura y Cruda 650g. Dos marcas, lo mejor de la naturaleza.",
    image: "../assets/img/combo-cafe-miel.jpg"
  }
];

const CATEGORY_LABELS = {
  "mieles": "Mieles",
  "bienestar": "Bienestar",
  "cuidado-personal": "Cuidado Personal",
  "combos": "Combos y Kits"
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
  initNav();
  initHeaderScroll();
  initImageZoom();
  document.getElementById("year").textContent = new Date().getFullYear();
});
