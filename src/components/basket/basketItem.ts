import './basketItem.css'


interface IItem {
  getItem: () => HTMLElement;
}

export default class BItem implements IItem {

  getItem() {
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
    h2Name.innerHTML = 'Сладкие ноты';
    itemName.appendChild(h2Name);

    const accessNumber = document.createElement('p');
    accessNumber.innerHTML = 'Доступно: 3шт';
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
    price.innerHTML = '$105'

    function encreaseCounter(){
      if(counterNumber.textContent!=null){
        counterNumber.textContent = (+counterNumber.textContent+1).toString();
      }
      else{
        counterNumber.textContent = '1';
      }
      priceRegulation(105);
    }

    function decreaseCounter(){
      if(counterNumber.textContent!=null && +counterNumber.textContent>1){
        counterNumber.textContent = (+counterNumber.textContent-1).toString();
      }
      else{
        counterNumber.textContent = '1';
      }
      priceRegulation(105);
    }

    function priceRegulation(basePrice:number){
      if (basePrice && counterNumber.textContent){
        price.textContent ='$' + (basePrice * +counterNumber.textContent).toString();
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

  removeItem(){
    return null;
  }
}
