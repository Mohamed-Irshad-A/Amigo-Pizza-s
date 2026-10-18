const cards = (obj) => {
    return obj.map((item) => `<div class="card">
            <img src="${item.src}" alt="" width="100px">
            <div class="overlay">
                <h2 class="pizza-title">${item.name}</h2>
                <p class="description">${item.description}</p>
                <hr class="small-divider" />
                <div class="pizza-price-container bg-blur">
                    <div class="price-and-description">
                        <p class="price">${item.price}</p>
                        <div class="pizza-description">${item.size}</div>
                    </div>
                    <div class="cart-container">
                        <button id=${item.id} class="add-to-cart btn">Add +</button>

                        <div class="quantity-box">
                            <button class="minus">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="plus">+</button>
                        </div>
                    </div>
                                        
                </div>
            </div>
        </div>
        `).join('');
}

// const container = document.querySelectorAll(".cart-container");
// cartLogic(container);

export default cards;