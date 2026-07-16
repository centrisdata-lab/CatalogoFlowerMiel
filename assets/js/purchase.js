// ---------------------------------------------
// Flower Miel — Módulo de compra
// ---------------------------------------------
// Módulo independiente que gestiona el flujo de compra. Acepta un producto
// suelto (botón "Comprar") o un pedido con varios productos y cantidades
// (carrito). Expone:
//   window.FlowerPurchase.open(product)     -> compra rápida de un producto
//   window.FlowerPurchase.openOrder(order)  -> pedido { items: [{...producto, qty}], fromCart }
// Para agregar un nuevo método de pago basta con añadir una entrada a
// PAYMENT_METHODS (no hay que tocar nada más).

(function () {
  "use strict";

  // ============================================
  // Configuración
  // ============================================

  const PURCHASE_WHATSAPP_NUMBER = "573208568248";

  // Transferencia directa a Nequi (sin pasarela ni comisiones).
  const NEQUI_CONFIG = {
    number: "3208568248",
    displayNumber: "320 856 8248"
  };

  // Pasarela de pagos en línea (Colombia).
  // Estructura preparada para Wompi (soporta PSE, tarjetas, Botón Bancolombia,
  // Nequi). Para activarla:
  //   1. Crear cuenta en https://wompi.co y obtener la llave pública.
  //   2. Poner la llave en publicKey (pub_prod_xxx).
  //   3. Generar la firma de integridad por transacción: Wompi exige un hash
  //      SHA-256 de "referencia + monto + moneda + secreto de integridad".
  //      El secreto NO debe estar en este archivo (es público); se necesita
  //      un pequeño endpoint que la calcule. Implementar buildSignature()
  //      para llamarlo, o desactivar la firma desde el panel de Wompi.
  // Si se prefiere otra pasarela (ePayco, Mercado Pago, PayU), agregar su
  // builder en GATEWAYS y cambiar "provider".
  const ONLINE_PAYMENT_CONFIG = {
    provider: "wompi",
    publicKey: "",          // <- llave pública de la pasarela (vacía = aún no activada)
    currency: "COP",
    redirectUrl: window.location.origin, // a dónde vuelve el cliente tras pagar
    buildSignature: null     // async (reference, amountInCents, currency) => firma
  };

  // Builders de URL de checkout por proveedor. Cada uno recibe el pedido
  // y la config, y devuelve la URL a la que redirigir al cliente.
  const GATEWAYS = {
    wompi: async function (order, config) {
      const amountInCents = orderTotal(order) * 100;
      const reference = "FM-" + order.items.map(function (i) { return i.id; }).join("-").slice(0, 24) + "-" + Date.now();
      const params = new URLSearchParams({
        "public-key": config.publicKey,
        "currency": config.currency,
        "amount-in-cents": String(amountInCents),
        "reference": reference,
        "redirect-url": config.redirectUrl
      });
      if (typeof config.buildSignature === "function") {
        const signature = await config.buildSignature(reference, amountInCents, config.currency);
        params.set("signature:integrity", signature);
      }
      return "https://checkout.wompi.co/p/?" + params.toString();
    }
  };

  function isOnlinePaymentReady() {
    return Boolean(ONLINE_PAYMENT_CONFIG.publicKey) && Boolean(GATEWAYS[ONLINE_PAYMENT_CONFIG.provider]);
  }

  // ============================================
  // Helpers de pedido
  // ============================================

  const priceFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  function formatPrice(value) {
    return priceFormatter.format(value);
  }

  function orderTotal(order) {
    return order.items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function orderCount(order) {
    return order.items.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function isSingleUnit(order) {
    return order.items.length === 1 && order.items[0].qty === 1;
  }

  // "2× Miel Pura y Cruda 650gr, 1× Polen 70gr"
  function itemsLabel(order) {
    return order.items.map(function (item) {
      return item.qty + "× " + item.name;
    }).join(", ");
  }

  function whatsappOrderMessage(order) {
    if (isSingleUnit(order)) {
      const item = order.items[0];
      return "Hola, quiero comprar el siguiente producto: " + item.name + " (" + formatPrice(item.price) + ").";
    }
    return "Hola, quiero comprar los siguientes productos: " + itemsLabel(order) +
      ". Total: " + formatPrice(orderTotal(order)) + ".";
  }

  function nequiConfirmMessage(order) {
    const detail = isSingleUnit(order)
      ? "el producto: " + order.items[0].name
      : "mi pedido: " + itemsLabel(order);
    return "Hola, acabo de hacer la transferencia por Nequi de " + formatPrice(orderTotal(order)) +
      " para " + detail + ". Por favor alistar mi pedido. 🙌";
  }

  // El pedido se confirmó por un canal (WhatsApp/Nequi): si venía del
  // carrito, lo vaciamos para evitar pedidos duplicados.
  function onOrderConfirmed(order) {
    if (order && order.fromCart && window.FlowerCart) {
      window.FlowerCart.clear();
    }
  }

  // ============================================
  // Métodos de compra disponibles
  // ============================================
  // Cada método define su tarjeta en el modal y qué hacer al elegirlo.
  // handler recibe el pedido y el elemento raíz del modal (para mostrar
  // mensajes de estado si hace falta).

  const PAYMENT_METHODS = [
    {
      id: "online",
      // Oculto por ahora: cambiar a true cuando la pasarela esté activada
      // (ver ONLINE_PAYMENT_CONFIG arriba).
      enabled: false,
      icon: "💳",
      title: "Pagar en línea",
      description: "PSE, tarjeta, Nequi o Botón Bancolombia. Pago seguro.",
      async handler(order, modal) {
        if (!isOnlinePaymentReady()) {
          showNotice(modal, "El pago en línea estará disponible muy pronto. Mientras tanto puedes pagar por Nequi o pedir por WhatsApp 💛");
          return;
        }
        const buildCheckoutUrl = GATEWAYS[ONLINE_PAYMENT_CONFIG.provider];
        const url = await buildCheckoutUrl(order, ONLINE_PAYMENT_CONFIG);
        window.location.href = url;
      }
    },
    {
      id: "nequi",
      icon: "📲",
      title: "Transferir a Nequi o Bre-B",
      description: "Desde Nequi, Bancolombia o cualquier banco con llave Bre-B.",
      handler(order, modal) {
        showNequiPanel(order, modal);
      }
    },
    {
      id: "whatsapp",
      icon: "",
      iconSvg: '<svg viewBox="0 0 24 24" width="26" height="26" fill="#25d366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.876.51 3.633 1.398 5.144L2 22l4.965-1.372A9.94 9.94 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.062a8.03 8.03 0 01-4.099-1.126l-.294-.175-3.038.84.812-2.96-.192-.303A8.024 8.024 0 013.938 12c0-4.444 3.618-8.062 8.063-8.062 4.444 0 8.062 3.618 8.062 8.062 0 4.445-3.618 8.062-8.062 8.062z"/></svg>',
      title: "Pedir por WhatsApp",
      description: "Coordina tu pedido directamente con nosotros.",
      handler(order) {
        const url = "https://wa.me/" + PURCHASE_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(whatsappOrderMessage(order));
        window.open(url, "_blank", "noopener");
        onOrderConfirmed(order);
      }
    }
  ];

  // ============================================
  // Modal
  // ============================================

  let modalEl = null;
  let currentOrder = null;

  function buildModal() {
    const modal = document.createElement("div");
    modal.className = "purchase-modal";
    modal.id = "purchaseModal";
    modal.innerHTML =
      '<div class="purchase-modal-box" role="dialog" aria-modal="true" aria-labelledby="purchaseModalTitle">' +
      '  <button type="button" class="purchase-modal-close" aria-label="Cerrar">&times;</button>' +
      '  <div class="purchase-product">' +
      '    <img src="" alt="" class="purchase-product-img">' +
      '    <div>' +
      '      <h3 class="purchase-product-name" id="purchaseModalTitle"></h3>' +
      '      <p class="purchase-product-price"></p>' +
      '    </div>' +
      '  </div>' +
      '  <ul class="purchase-items" hidden></ul>' +
      '  <div class="purchase-qty-row" hidden>' +
      '    <div class="purchase-qty">' +
      '      <button type="button" class="purchase-qty-dec" aria-label="Reducir cantidad">&minus;</button>' +
      '      <span class="purchase-qty-value">1</span>' +
      '      <button type="button" class="purchase-qty-inc" aria-label="Aumentar cantidad">+</button>' +
      '    </div>' +
      '    <button type="button" class="purchase-add-cart">' +
      '      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="10" y1="10" x2="14" y2="10"/></svg>' +
      '      Añadir al carrito' +
      '    </button>' +
      '  </div>' +
      '  <p class="purchase-qty-hint">💡 Usa "Añadir al carrito" solo si quieres comprar más productos. Si únicamente llevas este, elige abajo cómo pagar.</p>' +
      '  <p class="purchase-modal-question">¿Cómo deseas realizar tu compra?</p>' +
      '  <div class="purchase-options">' +
      PAYMENT_METHODS.filter(function (method) { return method.enabled !== false; }).map(function (method) {
        return (
          '<button type="button" class="purchase-option" data-method="' + method.id + '">' +
          '  <span class="purchase-option-icon">' + (method.iconSvg || method.icon) + '</span>' +
          '  <span class="purchase-option-text">' +
          '    <span class="purchase-option-title">' + method.title + '</span>' +
          '    <span class="purchase-option-desc">' + method.description + '</span>' +
          '  </span>' +
          '</button>'
        );
      }).join("") +
      '  </div>' +
      '  <p class="purchase-notice" hidden></p>' +
      '  <div class="purchase-nequi-panel" hidden>' +
      '    <p class="purchase-nequi-title">📲 Transfiere por Nequi</p>' +
      '    <div class="purchase-nequi-number-row">' +
      '      <span class="purchase-nequi-number">' + NEQUI_CONFIG.displayNumber + '</span>' +
      '      <button type="button" class="purchase-nequi-copy">Copiar</button>' +
      '    </div>' +
      '    <p class="purchase-breb-note"><span class="breb-badge">Bre-B</span><span>Este número también es nuestra <strong>llave Bre-B</strong>, por si transfieres desde otro banco.</span></p>' +
      '    <p class="purchase-nequi-amount">Valor a transferir: <strong class="purchase-nequi-amount-value"></strong></p>' +
      '    <ol class="purchase-nequi-steps">' +
      '      <li>Envía el valor exacto a ese número desde Nequi, Bancolombia o tu banco (llave Bre-B).</li>' +
      '      <li>Toca el botón verde para confirmarnos tu transferencia.</li>' +
      '      <li>¡Listo! Alistamos tu pedido de inmediato. 🐝</li>' +
      '    </ol>' +
      '    <a class="btn btn-whatsapp btn-block purchase-nequi-confirm" target="_blank" rel="noopener" href="#">' +
      '      Ya transferí · Confirmar por WhatsApp' +
      '    </a>' +
      '    <button type="button" class="purchase-nequi-back">&larr; Elegir otro método de pago</button>' +
      '  </div>' +
      '</div>';

    modal.addEventListener("click", function (event) {
      if (event.target === modal) close();
    });
    modal.querySelector(".purchase-modal-close").addEventListener("click", close);

    modal.querySelectorAll(".purchase-option").forEach(function (button) {
      button.addEventListener("click", function () {
        const method = PAYMENT_METHODS.find(function (m) { return m.id === button.dataset.method; });
        if (method && currentOrder) method.handler(currentOrder, modal);
      });
    });

    modal.querySelector(".purchase-nequi-back").addEventListener("click", function () {
      showMethodsView(modal);
    });

    modal.querySelector(".purchase-nequi-copy").addEventListener("click", function () {
      const button = this;
      navigator.clipboard.writeText(NEQUI_CONFIG.number).then(function () {
        button.textContent = "¡Copiado!";
        setTimeout(function () { button.textContent = "Copiar"; }, 2000);
      }).catch(function () {
        button.textContent = NEQUI_CONFIG.number;
      });
    });

    modal.querySelector(".purchase-nequi-confirm").addEventListener("click", function () {
      onOrderConfirmed(currentOrder);
    });

    // Selector de cantidad (solo en compra de un producto): actualiza el
    // precio mostrado y la cantidad que llevará el pedido/carrito.
    modal.querySelector(".purchase-qty-dec").addEventListener("click", function () {
      changeQty(-1);
    });
    modal.querySelector(".purchase-qty-inc").addEventListener("click", function () {
      changeQty(1);
    });

    modal.querySelector(".purchase-add-cart").addEventListener("click", function () {
      if (!currentOrder || !window.FlowerCart) return;
      const item = currentOrder.items[0];
      window.FlowerCart.add({ id: item.id, name: item.name, price: item.price, image: item.image }, item.qty);
      close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    document.body.appendChild(modal);
    return modal;
  }

  function showNotice(modal, message) {
    const notice = modal.querySelector(".purchase-notice");
    notice.textContent = message;
    notice.hidden = false;
  }

  // El selector de cantidad solo aplica al comprar un producto suelto
  // (desde el carrito las cantidades se manejan en el propio carrito).
  function qtyRowApplies(order) {
    return Boolean(order) && order.items.length === 1 && !order.fromCart;
  }

  function changeQty(delta) {
    if (!currentOrder || !qtyRowApplies(currentOrder)) return;
    const item = currentOrder.items[0];
    item.qty = Math.max(1, item.qty + delta);
    renderOrderSummary(currentOrder);
  }

  function showMethodsView(modal) {
    modal.querySelector(".purchase-modal-question").hidden = false;
    modal.querySelector(".purchase-options").hidden = false;
    modal.querySelector(".purchase-notice").hidden = true;
    modal.querySelector(".purchase-nequi-panel").hidden = true;
    modal.querySelector(".purchase-qty-row").hidden = !qtyRowApplies(currentOrder);
    modal.querySelector(".purchase-qty-hint").hidden = !qtyRowApplies(currentOrder);
  }

  function showNequiPanel(order, modal) {
    modal.querySelector(".purchase-nequi-amount-value").textContent = formatPrice(orderTotal(order));
    modal.querySelector(".purchase-nequi-confirm").href =
      "https://wa.me/" + PURCHASE_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(nequiConfirmMessage(order));

    modal.querySelector(".purchase-modal-question").hidden = true;
    modal.querySelector(".purchase-options").hidden = true;
    modal.querySelector(".purchase-notice").hidden = true;
    modal.querySelector(".purchase-qty-row").hidden = true;
    modal.querySelector(".purchase-qty-hint").hidden = true;
    modal.querySelector(".purchase-nequi-panel").hidden = false;
  }

  function renderOrderSummary(order) {
    const img = modalEl.querySelector(".purchase-product-img");
    const nameEl = modalEl.querySelector(".purchase-product-name");
    const priceEl = modalEl.querySelector(".purchase-product-price");
    const itemsEl = modalEl.querySelector(".purchase-items");

    const firstItem = order.items[0];
    img.src = firstItem.image;
    img.alt = firstItem.name;

    if (order.items.length === 1) {
      nameEl.textContent = firstItem.name;
      priceEl.textContent = formatPrice(firstItem.price * firstItem.qty) +
        (firstItem.qty > 1 ? " · " + firstItem.qty + " × " + formatPrice(firstItem.price) : "");
      itemsEl.hidden = true;
      itemsEl.innerHTML = "";
      modalEl.querySelector(".purchase-qty-value").textContent = String(firstItem.qty);
      return;
    }

    nameEl.textContent = "Tu pedido (" + orderCount(order) + " productos)";
    priceEl.textContent = "Total: " + formatPrice(orderTotal(order));
    itemsEl.innerHTML = order.items.map(function (item) {
      return "<li><span>" + item.qty + "× " + item.name + "</span><span>" + formatPrice(item.price * item.qty) + "</span></li>";
    }).join("");
    itemsEl.hidden = false;
  }

  function openOrder(order) {
    if (!order || !order.items || order.items.length === 0) return;
    if (!modalEl) modalEl = buildModal();
    currentOrder = order;

    renderOrderSummary(order);
    showMethodsView(modalEl);

    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function open(product) {
    openOrder({ items: [Object.assign({}, product, { qty: 1 })] });
  }

  function close() {
    if (!modalEl) return;
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
    currentOrder = null;
  }

  window.FlowerPurchase = { open: open, openOrder: openOrder, close: close };
})();
