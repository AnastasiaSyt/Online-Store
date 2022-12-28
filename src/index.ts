
import FilterPage from "./components/filterPage/filterPage";
import CardProduct from "./components/cardProductPage/cardProductPage";
import BasketPage from "./components/basket/basket";
import './style.css';
import App from "./components/app/app";


// const content = document.getElementById("content");
// content?.childNodes.forEach((node) => content.removeChild(node));
// // content?.append(new FilterPage().getPage());

// const card = new CardProduct();
// const cardProduct = card.getPage();
// card.addItems();

// content?.append(cardProduct);

const content = document.getElementById("content");

if (content) {
    const app = new App(content);
    app.run();
}

