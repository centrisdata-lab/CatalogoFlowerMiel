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
    name: "Miel Pura y Cruda 250gr",
    category: "mieles",
    price: 15000,
    description: "Miel artesanal sin procesos de refinamiento, con la esencia natural de las flores en un sabor fresco e intenso.",
    image: "assets/img/miel-pura-250g.jpg"
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
    description: "Incluye Miel Pura y Cruda 250g, Crema Facial Restauradora Queen, Brillolips_Bee y bolinillo mielero. 100% natural.",
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
    description: "Lo mejor de la colmena en presentación mini: Miel 250g, Polen 80g, Propóleo 35ml y bolinillo mielero. 100% natural.",
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
    name: "Jaula para marcar reinas tipo Émbolo",
    category: "insumos-apicolas",
    price: 15000,
    description: "Sujeta a la reina con suavidad contra la malla gracias a su émbolo de espuma, dejándola quieta para marcarla sin lastimarla. Marcaje rápido, seguro y preciso.",
    image: "assets/img/jaula-introduccion-reina.jpg"
  },
  {
    id: "jaula-marcaje-reinas",
    name: "Pinza para almacenar reina",
    category: "insumos-apicolas",
    price: 13000,
    description: "Captura y resguarda a la reina de forma segura mientras revisas o trasladas la colmena. Su diseño transparente te permite verla en todo momento sin estresarla.",
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
    name: "Palanca en acero inoxidable",
    category: "insumos-apicolas",
    price: 23000,
    description: "Palanca multiusos en acero inoxidable con gancho levanta cuadros: despega marcos, raspa propóleo y cera. La herramienta esencial que no puede faltar en tu apiario.",
    image: "assets/img/levantamarco.jpg"
  },
  {
    id: "porta-candi-reina",
    name: "Alimentador de jarabe externo",
    category: "insumos-apicolas",
    price: 5000,
    description: "Se instala en la piquera para dar jarabe a tus abejas sin abrir la colmena. Refuerza la alimentación en épocas de escasez de forma práctica y sin robos entre colmenas.",
    image: "assets/img/porta-candi-reina.jpg"
  },
  {
    id: "rulo-cria-reinas",
    name: "Rulo para Cría de Reinas",
    category: "insumos-apicolas",
    price: 3500,
    description: "Protege la celda real y acompaña el nacimiento seguro de tus futuras reinas. Con copacelda y accesorios para criar reinas como un profesional.",
    image: "assets/img/rulo-cria-reinas.jpg"
  },
  {
    id: "dispensador-miel-vidrio-abejas",
    name: "Dispensador de Miel en Vidrio con Abejas",
    category: "accesorios-miel",
    price: 40000,
    description: "Tarro de vidrio con forma de colmena, decorado con abejitas de cristal y su bolinillo a juego. Una pieza preciosa que sirve la miel y decora tu mesa.",
    image: "assets/img/dispensador-miel-vidrio-abejas.jpg"
  },
  {
    id: "dispensador-miel-vidrio",
    name: "Dispensador de Miel en Vidrio",
    category: "accesorios-miel",
    price: 32000,
    description: "Elegante tarro de vidrio en forma de colmena con tapa y bolinillo de cristal incluido. Conserva tu miel siempre a la mano y sin desperdicio.",
    image: "assets/img/dispensador-miel-vidrio.jpg"
  },
  {
    id: "dispensador-miel-vidrio-madera",
    name: "Dispensador de Miel en Vidrio y Madera",
    category: "accesorios-miel",
    price: 30000,
    description: "Tarro de vidrio estilo colmena con tapa y bolinillo de madera natural. La combinación perfecta entre lo rústico y lo práctico para servir tu miel.",
    image: "assets/img/dispensador-miel-vidrio-madera.jpg"
  },
  {
    id: "dispensador-miel-pasta-valvula",
    name: "Dispensador de Miel con Válvula",
    category: "accesorios-miel",
    price: 27000,
    description: "Dispensador con palanca y bandeja recogegotas: sirve la cantidad exacta de miel con solo presionar, sin goteos ni manos pegajosas. Diseño en panal.",
    image: "assets/img/dispensador-miel-pasta-valvula.jpg"
  },
  {
    id: "valvula-dispensador-miel",
    name: "Válvula Dispensador de Miel",
    category: "accesorios-miel",
    price: 15000,
    description: "Válvula de repuesto con tapa y sello hermético para tus baldes o envases de miel. Sirve y envasa sin derrames, con cierre seguro entre usos.",
    image: "assets/img/valvula-dispensador-miel.jpg"
  },
  {
    id: "mini-bolinillo-mielero",
    name: "Mini Bolinillo Mielero",
    category: "accesorios-miel",
    price: 1000,
    description: "Bolinillo de madera natural en tamaño mini: toma la miel justa para tu té, tostada o postre sin que chorree. Práctico, económico y siempre útil.",
    image: "assets/img/mini-bolinillo-mielero.jpg"
  },
  {
    id: "peluche-abeja",
    name: "Peluche Abeja",
    category: "souvenirs",
    price: 40000,
    description: "Suave, tierno y abrazable. El regalo ideal para los amantes de las abejas, grandes y chicos. También queda hermoso decorando tu espacio.",
    image: "assets/img/peluche-abeja.jpg"
  },
  {
    id: "gorra-abeja-amarilla",
    name: "Gorra Abeja Amarilla",
    category: "souvenirs",
    price: 20000,
    description: "Gorra en tono miel con una abeja bordada entre flores. Cómoda, con visera curva y ajuste trasero. Perfecta para el campo o el día a día.",
    image: "assets/img/gorra-abeja-amarilla.jpg"
  },
  {
    id: "gorra-abeja-azul",
    name: "Gorra Abeja Azul",
    category: "souvenirs",
    price: 20000,
    description: "Gorra tipo trucker azul con malla blanca y abeja bordada en dorado. Fresca, con ajuste trasero y un estilo que se lleva a todas partes.",
    image: "assets/img/gorra-abeja-azul.jpg"
  },
  {
    id: "medias-abejas",
    name: "Medias Abejas",
    category: "souvenirs",
    price: 17000,
    description: "Medias en color miel con estampado de panal y abejitas. Suaves, cómodas y con ese detalle especial que alegra cualquier atuendo.",
    image: "assets/img/medias-abejas.jpg"
  },
  {
    id: "delantal-abeja",
    name: "Delantal Abeja",
    category: "souvenirs",
    price: 15000,
    description: "Delantal con una simpática abejita estampada y tirante ajustable al cuello. Ideal para cocinar, para el apiario o para regalar con cariño.",
    image: "assets/img/delantal-abeja.jpg"
  },
  {
    id: "collar-abeja",
    name: "Collar Abeja",
    category: "souvenirs",
    price: 10000,
    description: "Delicado collar con dije de abeja en esmalte negro y dorado con brillos. Un detalle elegante para llevar contigo el amor por las abejas.",
    image: "assets/img/collar-abeja.jpg"
  },
  {
    id: "diadema-antenas-abeja",
    name: "Diadema Antenas de Abeja",
    category: "souvenirs",
    price: 7000,
    description: "Diadema con antenas de pompón y coronita dorada. La favorita de los niños en las visitas al apiario y para disfraces o fotos divertidas.",
    image: "assets/img/diadema-antenas-abeja.jpg"
  }
];

const CATEGORY_LABELS = {
  "mieles": "Mieles",
  "bienestar": "Bienestar",
  "cuidado-personal": "Cuidado Personal",
  "combos": "Combos y Kits",
  "insumos-apicolas": "Insumos Apícolas",
  "accesorios-miel": "Accesorios para Miel",
  "souvenirs": "Souvenirs Abeja"
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
      <button type="button" class="btn-share" aria-label="Compartir producto">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Compartir
      </button>
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

// Comparte el producto con su foto usando el menú nativo del celular
// (WhatsApp, estados, Instagram, etc.). Si el navegador no soporta compartir
// archivos, cae a compartir solo texto; y si tampoco, copia el link.
async function shareProduct(product, button) {
  const url = `${window.location.origin}/#catalogo`;
  const text = `${product.name} - ${priceFormatter.format(product.price)}\n\n${product.description}\n\nMíralo en nuestro catálogo:`;
  const originalText = button.innerHTML;
  button.disabled = true;
  button.textContent = "Preparando...";

  try {
    const response = await fetch(product.image);
    const blob = await response.blob();
    const file = new File([blob], `${product.id}.jpg`, { type: blob.type || "image/jpeg" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: product.name, text: `${text} ${url}` });
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: product.name, text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    button.textContent = "¡Copiado!";
    setTimeout(() => { button.innerHTML = originalText; }, 1500);
    return;
  } catch (err) {
    // El usuario canceló el menú de compartir: no es un error que deba avisarse.
    if (err.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      button.textContent = "¡Copiado!";
      setTimeout(() => { button.innerHTML = originalText; }, 1500);
      return;
    } catch (copyErr) {
      button.textContent = "No se pudo compartir";
      setTimeout(() => { button.innerHTML = originalText; }, 2000);
      return;
    }
  } finally {
    button.disabled = false;
    if (button.textContent === "Preparando...") button.innerHTML = originalText;
  }
}

function initBuyButtons() {
  const grid = document.getElementById("productGrid");
  grid.addEventListener("click", (event) => {
    const buyButton = event.target.closest(".btn-buy");
    const cartButton = event.target.closest(".btn-add-cart");
    const shareButton = event.target.closest(".btn-share");
    if (!buyButton && !cartButton && !shareButton) return;

    const card = (buyButton || cartButton || shareButton).closest(".product-card");
    const product = PRODUCTS.find((p) => p.id === card.dataset.productId);
    if (!product) return;

    if (shareButton) {
      shareProduct(product, shareButton);
      return;
    }

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
