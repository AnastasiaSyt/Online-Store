import Check from "./check";
import BasketItems from './basketItems'
import './basket.css'

interface IBasketPage {
  getPage: () => HTMLElement,
}

export default class Basket implements IBasketPage {

  getPage() {
    const basketContent = document.createElement('div');
    basketContent.classList.add('basket');
    basketContent.id = 'basketPage';

    const basketItems = new BasketItems().getItems();
    basketContent.appendChild(basketItems);

    const check = new Check().getCheck(18, 10);
    basketContent.appendChild(check);

    return basketContent;
  }
}