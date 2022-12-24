import Check from "./check";

interface IBasketPage {
  getPage: () => HTMLElement
}

export default class Basket implements IBasketPage {
  getPage() {
    const basketContent = document.createElement('div');

    const check = new Check().getCheck();
    basketContent.appendChild(check);

    return basketContent;
  }
}