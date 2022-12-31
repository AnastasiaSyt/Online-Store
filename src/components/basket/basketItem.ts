import './basketItem.css'
import './check'


interface IItem {
  getItem: (defaultName: string, defaultAccessNumber: number, defaultPrice: number) => HTMLElement;
}

export default class BItem implements IItem {

  getItem(defaultName: string, defaultAccessNumber: number, defaultPrice: number) {
    const itemContent = document.createElement('div');
    itemContent.classList.add('basket-item')

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox')
    checkBox.classList.add('checked')

    itemContent.appendChild(checkBox)

    //==========
    const itemNameBlock = document.createElement('div');
    itemNameBlock.classList.add('item-name_block');

    const itemImg = document.createElement('img');
    itemImg.src = '../../img/flower.jpg'
    itemImg.classList.add('basket-item_img');
    itemNameBlock.appendChild(itemImg);

    //=======
    const itemName = document.createElement('div');
    itemName.classList.add('item-name');

    const h2Name = document.createElement('h2');
    h2Name.innerHTML = defaultName;
    itemName.appendChild(h2Name);

    const accessNumber = document.createElement('p');
    accessNumber.innerHTML = `Доступно: ${defaultAccessNumber}`;
    itemName.appendChild(accessNumber);

    //=======
    itemNameBlock.appendChild(itemName);
    //==========

    const color = document.createElement('div');
    color.classList.add('item-color');

    const colorP = document.createElement('p');
    colorP.classList.add('color_text');
    colorP.innerHTML = 'Белый';
    color.appendChild(colorP);

    const colorCircle = document.createElement('div');
    colorCircle.classList.add('color-chooser');
    color.appendChild(colorCircle)

    const colorA = document.createElement('a');
    colorA.classList.add('color-chooser_text');
    colorA.innerHTML = 'Изменить';
    color.appendChild(colorA);

    //==========

    const counterBlock = document.createElement('div');
    counterBlock.classList.add('counter_block');

    const counterDecrease = document.createElement('button');
    counterDecrease.classList.add('counter_button');
    counterDecrease.classList.add('decrease');
    counterDecrease.innerHTML='&ndash;';

    const counterIncrease = document.createElement('button');
    counterIncrease.classList.add('counter_button');
    counterIncrease.classList.add('increase');
    counterIncrease.innerHTML='+';



    const counterNumber = document.createElement('div');
    counterNumber.classList.add('counter_number');
    counterNumber.innerHTML = '1';

    counterBlock.appendChild(counterDecrease);
    counterBlock.appendChild(counterNumber);
    counterBlock.appendChild(counterIncrease);

    counterIncrease.addEventListener('click', encreaseCounter)
    counterDecrease.addEventListener('click', decreaseCounter)

    const price = document.createElement('p');
    price.classList.add('price');
    price.innerHTML = "$" + defaultPrice;

    function encreaseCounter(){
      if(counterNumber.textContent!=null){
        if(checkBox.checked && +counterNumber.textContent+1 <= defaultAccessNumber){
          counterNumber.textContent = (+counterNumber.textContent+1).toString();
          document.querySelector('.goods-price')!.textContent = '$' + (
          +document.querySelector('.goods-price')!.textContent!.split('$')[1]
          + defaultPrice);
          document.querySelector('.total-price')!.textContent = '$' + (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] + +document!.querySelector('.tax-price')!.textContent!.split('$')[1] + +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
        }
      }
      priceRegulation();
    }

    function decreaseCounter(){
      if(counterNumber.textContent!=null && +counterNumber.textContent>1){
        counterNumber.textContent = (+counterNumber.textContent-1).toString();
        if(checkBox.checked){
          document.querySelector('.goods-price')!.textContent = '$' + (
          +document.querySelector('.goods-price')!.textContent!.split('$')[1]
          - defaultPrice);
          if(+counterNumber.textContent < defaultAccessNumber) document.querySelector('.total-price')!.textContent = '$' + (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] + +document!.querySelector('.tax-price')!.textContent!.split('$')[1] + +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
        }
      }
      priceRegulation();
    }

    function priceRegulation(){
      if (defaultPrice && counterNumber.textContent){
        price.textContent ='$' + (defaultPrice * +counterNumber.textContent).toString();
      }
    }
    //===========


    //==========

    const cross = document.createElement('div');
    cross.classList.add('cross')
    const crossLine = document.createElement('span');
    crossLine.classList.add('cross-line');
    cross.appendChild(crossLine);

    itemContent.appendChild(itemNameBlock);
    itemContent.appendChild(color)
    itemContent.appendChild(counterBlock);
    itemContent.appendChild(price);
    itemContent.appendChild(cross);

    return itemContent;
  }
}
