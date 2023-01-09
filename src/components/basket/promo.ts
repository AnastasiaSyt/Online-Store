import './promo.css'

interface IPromo{
  getPage(): HTMLElement;
}

class Promo implements IPromo{
  getPage(): HTMLElement {
    const promoContent = document.createElement('div');
    promoContent.classList.add('promo_block');

    const inputPromo = document.createElement('input');
    inputPromo.setAttribute('type', 'text');
    inputPromo.classList.add('promo_input');
    inputPromo.placeholder = 'Введите промокод'

    const inputPromoButton = document.createElement('button');
    inputPromoButton.classList.add('promo_button');
    inputPromoButton.textContent = 'Ввод';

    promoContent.appendChild(inputPromo);
    promoContent.appendChild(inputPromoButton)
    return promoContent;
  }
}

export default Promo