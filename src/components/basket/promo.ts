import './promo.css'

interface IPromo{
  getPage(): HTMLElement;
}

class Promo implements IPromo{
  getPage(): HTMLElement {
    const promoContent = document.createElement('div');
    promoContent.classList.add('promo_block');

    const promoText = document.createElement('div');
    promoText.classList.add('promo_text');
    promoText.textContent = 'Можно ввести следующие промокоды:'
    promoContent.appendChild(promoText);

    const promos = ['J5YU0', 'VD6YA', '13ZTQ', 'HM1V4', 'CA9JS', 'E11L3', '009N5','1BAXE', 'J8SIV', 'LF0UN'];
    const enterPromos = document.createElement('div');
    enterPromos.classList.add('enter_promo');
    
    promos.forEach((item) => {
      const promoItem = document.createElement('p');
      promoItem.classList.add('promotion');
      promoItem.textContent = item;
      enterPromos.appendChild(promoItem);
    })

    promoContent.appendChild(enterPromos);

    const inputBlock = document.createElement('div');
    inputBlock.classList.add('input_block');
    promoContent.appendChild(inputBlock);

    const inputPromo = document.createElement('input');
    inputPromo.setAttribute('type', 'text');
    inputPromo.classList.add('promo_input');
    inputPromo.placeholder = 'Введите промокод'

    const inputPromoButton = document.createElement('button');
    inputPromoButton.classList.add('promo_button');
    inputPromoButton.textContent = 'Ввод';

    inputBlock.appendChild(inputPromo);
    inputBlock.appendChild(inputPromoButton)
    return promoContent;
  }
}

export default Promo