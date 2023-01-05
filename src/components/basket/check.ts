import './check.css'
import './../filterPage/button'


interface ICheck {
  getCheck: (defaultDeliveryState: number, defaultTax: number) => HTMLElement
}

export default class Check implements ICheck {
  getCheck(defaultDeliveryState: number, defaultTax: number) {
      const checkContent = document.createElement('div');
      checkContent.classList.add('check-content');

      const h2 = document.createElement('h2');
      h2.textContent = 'Итог';
      checkContent.appendChild(h2);


      //================
      const checkInfo = document.createElement('ul');
      checkInfo.classList.add('prices_ul');

      //=======
      const target1 = document.createElement('li');
      target1.classList.add('target_li')

      const goodsPosition = document.createElement('span');
      const goodsPrice = document.createElement('span')
      goodsPosition.classList.add('goods-position');
      goodsPosition.textContent= 'Товары';
      goodsPrice.classList.add('goods-price');
      goodsPrice.textContent = '$0.00';

      target1.appendChild(goodsPosition);
      target1.appendChild(goodsPrice);

      //=======
      const target2 = document.createElement('li');
      target2.classList.add('target_li');

      const taxPosition = document.createElement('span');
      const taxPrice = document.createElement('span');
      taxPosition.textContent = 'Налог';
      taxPrice.textContent = `$${defaultTax}`
      taxPosition.classList.add('tax-position');
      taxPrice.classList.add('tax-price');

      target2.appendChild(taxPosition);
      target2.appendChild(taxPrice);

      //=======
      const target3 = document.createElement('li');
      target3.classList.add('target_li');

      const deliveryPosition = document.createElement('span');
      const deliveryPrice = document.createElement('span');
      deliveryPosition.textContent = 'Доставка';
      deliveryPrice.textContent = `$${defaultDeliveryState}`;
      deliveryPosition.classList.add('delivery-position');
      deliveryPrice.classList.add('delivery-price');

      target3.appendChild(deliveryPosition);
      target3.appendChild(deliveryPrice);

      //=======
      const target4 = document.createElement('li');
      target4.classList.add('target_li');
      target4.classList.add('total');

      const totalPosition = document.createElement('span');
      const totalPrice = document.createElement('span');
      totalPosition.textContent = 'Всего';
      totalPrice.textContent ='$'
                                + (+deliveryPrice.textContent?.split('$')[1] +
                                +taxPrice.textContent?.split('$')[1] +
                                +goodsPrice.textContent?.split('$')[1]);
      totalPosition.classList.add('total-position');
      totalPrice.classList.add('total-price');

      target4.appendChild(totalPosition);
      target4.appendChild(totalPrice);

      //=======

      checkInfo.appendChild(target1);
      checkInfo.appendChild(target2);
      checkInfo.appendChild(target3);
      checkInfo.appendChild(target4);
      //================


      checkContent.appendChild(checkInfo)

      const button = document.createElement('button');
      button.classList.add('button');
      button.classList.add('order');
      button.textContent = 'оформить заказ';
      checkContent.appendChild(button)


      return checkContent;

  }
}