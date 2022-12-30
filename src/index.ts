import './style.css';
import App from "./components/app/app";


const content = document.getElementById("content");

if (content) {
    new App(content);
}