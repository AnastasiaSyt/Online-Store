import FilterPage from "./components/filterPage/filterPage";
import CardProduct from "./components/cardProductPage/cardProductPage";
import './style.css';



const content = document.getElementById("content");
content?.childNodes.forEach((node) => content.removeChild(node));
//content?.append(new FilterPage().getPage());
content?.append(new CardProduct().getCardProduct());