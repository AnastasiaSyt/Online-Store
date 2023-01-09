import './basketItem.css'
import './check'
import flowers from '../data/data';


interface IItem {
  getItem: (id: number /*defaultName: string, defaultAccessNumber: number, defaultPrice: number*/) => HTMLElement;
}

export default class BItem implements IItem {

  getItem(id: number /*defaultName: string, defaultAccessNumber: number, defaultPrice: number*/) {
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
    itemImg.src = flowers[id]['thumbnail'];
    itemImg.classList.add('basket-item_img');
    itemNameBlock.appendChild(itemImg);

    //=======
    const itemName = document.createElement('div');
    itemName.classList.add('item-name');

    const h2Name = document.createElement('h2');
    h2Name.textContent = flowers[id]['title'];
    itemName.appendChild(h2Name);

    const accessNumber = document.createElement('p');
    accessNumber.textContent = `Доступно: ${flowers[id]['stock']}`;
    itemName.appendChild(accessNumber);

    //=======
    itemNameBlock.appendChild(itemName);
    //==========

    const color = document.createElement('div');
    color.classList.add('item-color');

    const colorP = document.createElement('p');
    colorP.classList.add('color_text');
    const colorEng = ['darkred', 'white', 'black', 'blue', 'yellow', 'orange', 'lime', 'pink', 'indigo'];
    const colorRu = ['Красный', 'Белый', 'Черный', 'Синий', 'Желтый', 'Оранжевый', 'Зеленый', 'Розовый', 'Фиолетовый']

    colorP.textContent = colorRu[colorEng.indexOf(flowers[id]['color'][0])];
    color.appendChild(colorP);

    const colorCircle = document.createElement('div');
    colorCircle.classList.add('color-chooser', 'base', colorEng[colorEng.indexOf(flowers[id]['color'][0])]);
    color.appendChild(colorCircle)

    const colorA = document.createElement('a');
    colorA.classList.add('color-chooser_text');
    colorA.textContent = 'Изменить';
    color.appendChild(colorA);


    const colors = document.createElement('div');
    colors.classList.add('colors_block');

    for(let i = 0;i<flowers[id].color.length; i++){
      const tempColor = document.createElement('div');
      tempColor.classList.add('color-chooser', 'color', flowers[id].color[i]);
      colors.appendChild(tempColor)

      tempColor.addEventListener('click', e=>{
        e.preventDefault();
        colors.classList.toggle('active');
        colorCircle.classList.remove(colorCircle.classList[2])
        colorCircle.classList.add(tempColor.classList[2])
        colorP.textContent = colorRu[colorEng.indexOf(tempColor.classList[2])];
      })
    }

    colorA.addEventListener('click', e =>{
      e.preventDefault();
      colors.classList.toggle('active')
    })

    color.appendChild(colors)
    //==========

    const counterBlock = document.createElement('div');
    counterBlock.classList.add('counter_block');

    const counterDecrease = document.createElement('button');
    counterDecrease.classList.add('counter_button');
    counterDecrease.classList.add('decrease');
    counterDecrease.textContent ='–';

    const counterIncrease = document.createElement('button');
    counterIncrease.classList.add('counter_button');
    counterIncrease.classList.add('increase');
    counterIncrease.textContent ='+';

    const counterNumber = document.createElement('input');
    counterNumber.type = 'number';
    counterNumber.classList.add('input_counter');
    counterNumber.value = '1';
    counterNumber.setAttribute('min', '0');

    // const counterNumber = document.createElement('div');
    // counterNumber.classList.add('counter_number');
    // counterNumber.textContent = '1';

    counterBlock.appendChild(counterDecrease);
    counterBlock.appendChild(counterNumber);
    counterBlock.appendChild(counterIncrease);

    counterIncrease.addEventListener('click', encreaseCounter)
    counterDecrease.addEventListener('click', decreaseCounter)

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `$${flowers[id]['price']}`;

    counterNumber.onchange = function(){
      priceRegulation();
    }

    function encreaseCounter(){
      if(counterNumber.value!=null && +counterNumber.value+1 <= flowers[id]['stock']){
        counterNumber.value = (+counterNumber.value+1).toString();
        if(checkBox.checked){
          document.querySelector('.goods-price')!.textContent = '$' + (
          +document.querySelector('.goods-price')!.textContent!.split('$')[1]
          + flowers[id]['price']);
          document.querySelector('.total-price')!.textContent = '$' +
                                                                (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] +
                                                                +document!.querySelector('.tax-price')!.textContent!.split('$')[1] +
                                                                +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
        }
      }
      priceRegulation();
    }

    function decreaseCounter(){
      if(counterNumber.value!=null && +counterNumber.value>1){
        counterNumber.value = (+counterNumber.value-1).toString();
        if(checkBox.checked){
          document.querySelector('.goods-price')!.textContent = '$' + (
          +document.querySelector('.goods-price')!.textContent!.split('$')[1]
          - flowers[id]['price']);
          if(+counterNumber.value < flowers[id]['stock']) document.querySelector('.total-price')!.textContent = '$' + (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] + +document!.querySelector('.tax-price')!.textContent!.split('$')[1] + +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
        }
      }
      priceRegulation();
    }

    function priceRegulation(){
      if (flowers[id]['price'] && counterNumber.value){
        price.textContent ='$' + (flowers[id]['price'] * +counterNumber.value).toString();
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
