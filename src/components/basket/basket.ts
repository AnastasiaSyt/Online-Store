import Check from "./check";
import BasketItems from './basketItems'
import './basket.css'
import Promo from "./promo";

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

    const promoCheck = document.createElement('div');
    const tax = 10;
    const delivery = 18; 
    const check = new Check().getCheck(delivery, tax);
    promoCheck.appendChild(check)

    const promo = new Promo().getPage();
    promoCheck.appendChild(promo)
    basketContent.appendChild(promoCheck);

    const promos = ['J5YU0', 'VD6YA', '13ZTQ', 'HM1V4', 'CA9JS', 'E11L3', '009N5','1BAXE', 'J8SIV', 'LF0UN']
    const mySales: string[] = [];
    basketContent.querySelector('.promo_button')?.addEventListener('click', e =>{
      e.preventDefault();
      if(promos.indexOf((basketContent.querySelector('.promo_input') as HTMLInputElement).value.trim().toUpperCase()) !== -1 && mySales.indexOf((basketContent.querySelector('.promo_input') as HTMLInputElement).value.trim().toUpperCase()) === -1){
        mySales.push((basketContent.querySelector('.promo_input') as HTMLInputElement).value.trim().toUpperCase());
        document.querySelector('.sale-price')!.textContent = `${mySales.length*10}%`;
        document.querySelector('.total-price')!.textContent = '$' +
        ((+document!.querySelector('.goods-price')!.textContent!.split('$')[1] +
        +document!.querySelector('.tax-price')!.textContent!.split('$')[1] +
        +document!.querySelector('.delivery-price')!.textContent!.split('$')[1])*(1 - +document!.querySelector('.sale-price')!.textContent!.split('%')[0]/100)).toFixed(2);
      }
    })

    return basketContent;
  }
}