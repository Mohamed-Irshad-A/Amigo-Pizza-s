import subMenuNavCode from "./components/pizza_sub_menu_code.js";
import topSellersCode from "./components/topSellers_code.js";
import cheesyValcanoCode from "./components/cheesy_valcano.js";
import cheesikenCode from "./components/cheesikenCode.js";
import { cartFunctionality } from "./components/cartFunctionality.js";

// import { emptyCart } from "./components/cartLogic.js";


const subMenuNav = document.getElementById("menu-nav-area");
const topSellersCard = document.getElementById("top-sellers-cards");
const cheesyValcanoCard = document.getElementById("cheesy-valcano-cards");
const cheesiken = document.getElementById("Cheesiken-cards");

subMenuNav.innerHTML += subMenuNavCode;
topSellersCard.innerHTML += topSellersCode;
cheesyValcanoCard.innerHTML += cheesyValcanoCode;
cheesiken.innerHTML += cheesikenCode;

// cart functionality
const buttons = document.querySelectorAll(".add-to-cart");
cartFunctionality(buttons);


