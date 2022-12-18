import ErrorPage from "./components/error404/errorPage";
import './style.css';


const content = document.getElementById("content");
content?.childNodes.forEach((node) => content.removeChild(node));
content?.append(new ErrorPage().getPage());