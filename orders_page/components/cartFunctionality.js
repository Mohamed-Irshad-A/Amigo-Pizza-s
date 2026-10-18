import { add, sub, cart, render } from "./cartLogic.js";

const cartNav = document.getElementById("cart-nav");
const cartPage = document.querySelector(".cart");
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");


cartNav.style.cursor = "pointer";

cartNav.addEventListener("click", () => {
    sections.forEach(obj => {
        obj.classList.toggle("none");
    })
    header.classList.toggle("none");
    cartPage.style.display = "block";
    cartNav.style.display = "none";
    render();
})

const backToMenu = document.getElementById("back-to-menu");
backToMenu.addEventListener("click", () => {
    sections.forEach(section => {
        section.classList.toggle("none");
    })
    header.classList.toggle("none");
    cartPage.style.display = "none";
    cartNav.style.display = "flex";
})


const cartFunctionality = (buttons) => {
    [...buttons].forEach((btn) => {
        const id = btn.id;
        const container = btn.parentElement;
        const quantityBox = container.querySelector(".quantity-box");
        const quantityText = container.querySelector(".quantity");
        const plusBtn = container.querySelector(".plus");
        const minusBtn = container.querySelector(".minus");

        btn.addEventListener("click", () => {
            const qty = add(id);
            quantityText.textContent = qty;
            quantityBox.style.display = "flex";
            btn.style.display = "none";
            cartNav.style.display = "flex";
            render();
        });

        plusBtn.addEventListener("click", () => {
            quantityText.textContent = add(id);
            render();
        });

        minusBtn.addEventListener("click", () => {
            const qty = sub(id);
            if (qty <= 0) {
                quantityBox.style.display = "none";
                btn.style.display = "flex";
                if (cart.length === 0) cartNav.style.display = "none";
            } else {
                quantityText.textContent = qty;
            }
            render();
        });
    });
};

export { cartFunctionality };
