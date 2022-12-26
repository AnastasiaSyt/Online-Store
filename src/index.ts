
import FilterPage from "./components/filterPage/filterPage";
import CardProduct from "./components/cardProductPage/cardProductPage";
import BasketPage from "./components/basket/basket";
import './style.css';



const content = document.getElementById("content");
content?.childNodes.forEach((node) => content.removeChild(node));

// content?.append(new FilterPage().getPage());

const card = new CardProduct();
const cardProduct = card.getCardProduct();
card.addItems();
content?.append(cardProduct);
content?.append(new BasketPage().getPage());
