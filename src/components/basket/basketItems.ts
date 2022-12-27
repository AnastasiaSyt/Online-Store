import './basketItems.css';
import BItem from './basketItem';

interface IBasketItems {
  getItems: () => HTMLElement
}

export default class BasketItems implements IBasketItems {
  getItems(){
    const itemsContent = document.createElement('div');
    itemsContent.classList.add('basket_items');

    const basketItemsHead = document.createElement('div');
    basketItemsHead.classList.add('basket_items-head');

    const head1 = document.createElement('p');
    const head2 = document.createElement('p');
    const head3 = document.createElement('p');
    const head4 = document.createElement('p');

    head1.classList.add('basket_items-head_name');
    head2.classList.add('basket_items-head_name');
    head3.classList.add('basket_items-head_name');
    head4.classList.add('basket_items-head_name');

    head1.innerHTML = 'Наименование';
    head2.innerHTML = 'Цвет';
    head3.innerHTML = 'Количество';
    head4.innerHTML = 'Цена';

    basketItemsHead.appendChild(head1);
    basketItemsHead.appendChild(head2);
    basketItemsHead.appendChild(head3);
    basketItemsHead.appendChild(head4);

    itemsContent.appendChild(basketItemsHead);

    const basketItem = new BItem().getItem();
    itemsContent.appendChild(basketItem);
    const basketItem2 = new BItem().getItem();
    itemsContent.appendChild(basketItem2);

    return itemsContent;
  }
}