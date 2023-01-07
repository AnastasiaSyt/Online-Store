import './style.css';
import App from "./components/app/app";
import Modal from './components/modal_window/modalAdd';


const content = document.getElementById("content");

if (content) {
    new App(content);
}

const confirm = document.getElementById('button_order');
confirm?.addEventListener('click', function() {
    new Modal().getModal()
  });