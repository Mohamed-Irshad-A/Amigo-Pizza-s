import allProducts from "../data_sets/allProducts.js";

const cart = [];

const getCartItem = (id) => cart.find((item) => item.id === id);

const add = (id) => {
    const product = allProducts.find((item) => item.id === id);
    if (!product) return 0;

    const cartItem = getCartItem(id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            src: product.src,
            quantity: 1,
        });
    }
    return getCartItem(id).quantity; 
};

const sub = (id) => {
    const cartItem = getCartItem(id);
    if (!cartItem) return 0;

    cartItem.quantity--;

    if (cartItem.quantity <= 0) {
        const index = cart.indexOf(cartItem);
        cart.splice(index, 1); 
        return 0;
    }
    return cartItem.quantity;
};

const clearCart = () => {
    cart.length = 0;
}

const getCart = () => cart;

const TAX_RATE = 0.05;

function render() {
    const cart = getCart();
    const root = document.getElementById("cart-root");
    const footer = document.getElementById("checkout-footer");
    const countLabel = document.getElementById("item-count-label");
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    countLabel.textContent = totalItems === 0 ? "Nothing here yet" : `${totalItems} item${totalItems > 1 ? "s" : ""} in cart`;
    if (cart.length === 0) {
        footer.style.display = "none";
        root.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <a href="index.html" class="go-menu-btn">Browse Menu</a>
            </div>`;
        return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;


    const itemsHTML = cart.map((item, idx) => `
        <div class="cart-item" style="animation-delay:${idx * 0.07}s" id="cart-item-${item.id}">
            <img  class="item-img" src="${item.src}" alt="${item.name}" />
            <div class="item-img-placeholder" style="display:none;">🍕</div>

            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-unit-price">₹${item.price} each</div>
            </div>

                    <div class="item-right">
                        <div class="item-total-price" id="price-${item.id}">
                            ₹${item.price * item.quantity}
                        </div>
                        <div class="stepper">
                            <button class="stepper-btn" data-action="sub" data-id="${item.id}">−</button>
                            <span   class="stepper-qty" id="qty-${item.id}">${item.quantity}</span>
                            <button class="stepper-btn" data-action="add" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `).join("");

    root.innerHTML = `
                <section class="cart-section">
                    <div class="section-label">Order Items</div>
                    <div class="cart-list">${itemsHTML}</div>
                </section>

                <div class="bill-section">
                    <div class="bill-header">Bill Summary</div>
                    <div class="bill-row">
                        <span>Item total</span>
                        <span class="bill-value" id="bill-subtotal">₹${subtotal}</span>
                    </div>
                    <div class="bill-row">
                        <span>GST (5%)</span>
                        <span class="bill-value" id="bill-tax">₹${tax}</span>
                    </div>
                    <div class="bill-row">
                        <span>Delivery fee</span>
                        <span class="bill-value" style="color:#4caf50;">FREE</span>
                    </div>
                    <div class="bill-row total">
                        <span>To Pay</span>
                        <span class="bill-value" id="bill-total">₹${total}</span>
                    </div>
                </div>
            `;

    document.getElementById("footer-total").textContent = `₹${total}`;
    footer.style.display = "flex";

    document.querySelector(".cart-list").addEventListener("click", (e) => {
        const btn = e.target.closest(".stepper-btn");
        if (!btn) return;

        const id = btn.dataset.id;
        const action = btn.dataset.action;

        const qty = action === "add" ? add(id) : sub(id);

        if (qty <= 0) {
            render();
            return;
        }

        const cart2 = getCart();
        const item = cart2.find(i => i.id === id);
        document.getElementById(`qty-${id}`).textContent = qty;
        document.getElementById(`price-${id}`).textContent = `₹${item.price * qty}`;

        const sub2 = cart2.reduce((s, i) => s + i.price * i.quantity, 0);
        const tax2 = Math.round(sub2 * TAX_RATE);
        const total2 = sub2 + tax2;
        document.getElementById("bill-subtotal").textContent = `₹${sub2}`;
        document.getElementById("bill-tax").textContent = `₹${tax2}`;
        document.getElementById("bill-total").textContent = `₹${total2}`;
        document.getElementById("footer-total").textContent = `₹${total2}`;

        const totalItems2 = cart2.reduce((s, i) => s + i.quantity, 0);
        document.getElementById("item-count-label").textContent =
            `${totalItems2} item${totalItems2 > 1 ? "s" : ""} in cart`;
    });
}


window.placeOrder = () => {
    alert("🎉 Order placed! Thank you for choosing Amigo's Pizza.");
    clearCart();
    render();
};

export { add, sub, getCart, cart, render };
