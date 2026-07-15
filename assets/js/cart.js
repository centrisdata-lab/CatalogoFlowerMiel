// ---------------------------------------------
// Flower Miel — Carrito de compras
// ---------------------------------------------
// Carrito simple del lado del cliente, persistido en localStorage para que
// no se pierda al recargar. Expone window.FlowerCart:
//   add(product)   -> agrega una unidad (o suma si ya está)
//   setQty(id, n)  -> cambia la cantidad (0 elimina)
//   clear()        -> vacía el carrito
//   open()/close() -> abre/cierra el panel
// Al finalizar la compra delega en FlowerPurchase.openOrder() con todos
// los productos y cantidades.

(function () {
  "use strict";

  const STORAGE_KEY = "flowermiel_cart_v1";

  const priceFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  function formatPrice(value) {
    return priceFormatter.format(value);
  }

  // ============================================
  // Estado
  // ============================================

  let items = loadItems();

  function loadItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // localStorage no disponible (modo incógnito estricto): el carrito
      // sigue funcionando en memoria durante la sesión.
    }
  }

  function count() {
    return items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function total() {
    return items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function add(product) {
    const existing = items.find(function (item) { return item.id === product.id; });
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1
      });
    }
    saveItems();
    render();
    bounceFloat();
  }

  function setQty(id, qty) {
    const item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    item.qty = qty;
    if (item.qty <= 0) {
      items = items.filter(function (i) { return i.id !== id; });
    }
    saveItems();
    render();
  }

  function clear() {
    items = [];
    saveItems();
    render();
    close();
  }

  // ============================================
  // UI: botón flotante + panel
  // ============================================

  let floatBtn = null;
  let panelEl = null;

  const CART_ICON =
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>';

  function buildUI() {
    floatBtn = document.createElement("button");
    floatBtn.type = "button";
    floatBtn.className = "cart-float";
    floatBtn.setAttribute("aria-label", "Ver carrito de compras");
    floatBtn.innerHTML = CART_ICON + '<span class="cart-float-badge">0</span>';
    floatBtn.addEventListener("click", open);
    document.body.appendChild(floatBtn);

    panelEl = document.createElement("div");
    panelEl.className = "cart-modal";
    panelEl.innerHTML =
      '<div class="cart-box" role="dialog" aria-modal="true" aria-label="Carrito de compras">' +
      '  <div class="cart-header">' +
      '    <h3>🛒 Tu carrito</h3>' +
      '    <button type="button" class="cart-close" aria-label="Cerrar">&times;</button>' +
      '  </div>' +
      '  <div class="cart-items"></div>' +
      '  <p class="cart-empty" hidden>Tu carrito está vacío. Agrega productos con el botón 🛒 de cada tarjeta.</p>' +
      '  <div class="cart-footer">' +
      '    <p class="cart-total-row">Total: <strong class="cart-total"></strong></p>' +
      '    <button type="button" class="btn btn-primary btn-block cart-checkout">Finalizar compra</button>' +
      '    <button type="button" class="cart-continue">&larr; Seguir comprando</button>' +
      '  </div>' +
      '</div>';

    panelEl.addEventListener("click", function (event) {
      if (event.target === panelEl) close();
    });
    panelEl.querySelector(".cart-close").addEventListener("click", close);
    panelEl.querySelector(".cart-continue").addEventListener("click", close);

    panelEl.querySelector(".cart-checkout").addEventListener("click", function () {
      if (items.length === 0) return;
      close();
      window.FlowerPurchase.openOrder({
        items: items.map(function (item) { return Object.assign({}, item); }),
        fromCart: true
      });
    });

    // Delegación para steppers y eliminar
    panelEl.querySelector(".cart-items").addEventListener("click", function (event) {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const id = button.dataset.id;
      const item = items.find(function (i) { return i.id === id; });
      if (!item) return;
      if (button.dataset.action === "inc") setQty(id, item.qty + 1);
      if (button.dataset.action === "dec") setQty(id, item.qty - 1);
      if (button.dataset.action === "remove") setQty(id, 0);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    document.body.appendChild(panelEl);
  }

  function render() {
    if (!floatBtn) buildUI();

    const itemCount = count();
    floatBtn.classList.toggle("visible", itemCount > 0);
    floatBtn.querySelector(".cart-float-badge").textContent = String(itemCount);

    const itemsContainer = panelEl.querySelector(".cart-items");
    const emptyMsg = panelEl.querySelector(".cart-empty");
    const footer = panelEl.querySelector(".cart-footer");

    if (items.length === 0) {
      itemsContainer.innerHTML = "";
      emptyMsg.hidden = false;
      footer.hidden = true;
      return;
    }

    emptyMsg.hidden = true;
    footer.hidden = false;
    panelEl.querySelector(".cart-total").textContent = formatPrice(total());

    itemsContainer.innerHTML = items.map(function (item) {
      return (
        '<div class="cart-item">' +
        '  <img src="' + item.image + '" alt="" class="cart-item-img">' +
        '  <div class="cart-item-info">' +
        '    <p class="cart-item-name">' + item.name + '</p>' +
        '    <p class="cart-item-price">' + formatPrice(item.price * item.qty) + '</p>' +
        '  </div>' +
        '  <div class="cart-item-controls">' +
        '    <div class="cart-qty">' +
        '      <button type="button" data-action="dec" data-id="' + item.id + '" aria-label="Quitar una unidad">&minus;</button>' +
        '      <span>' + item.qty + '</span>' +
        '      <button type="button" data-action="inc" data-id="' + item.id + '" aria-label="Agregar una unidad">+</button>' +
        '    </div>' +
        '    <button type="button" class="cart-item-remove" data-action="remove" data-id="' + item.id + '" aria-label="Eliminar del carrito">Eliminar</button>' +
        '  </div>' +
        '</div>'
      );
    }).join("");
  }

  function bounceFloat() {
    if (!floatBtn) return;
    floatBtn.classList.remove("bounce");
    void floatBtn.offsetWidth; // reinicia la animación
    floatBtn.classList.add("bounce");
  }

  function open() {
    if (!panelEl) buildUI();
    render();
    panelEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (!panelEl) return;
    panelEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildUI();
    render();
  });

  window.FlowerCart = {
    add: add,
    setQty: setQty,
    clear: clear,
    open: open,
    close: close,
    count: count
  };
})();
