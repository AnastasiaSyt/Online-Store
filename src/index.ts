import BasketPage from "./components/basket/basket";
import './style.css';



const content = document.getElementById("content");
content?.childNodes.forEach((node) => content.removeChild(node));
content?.append(new BasketPage().getPage());