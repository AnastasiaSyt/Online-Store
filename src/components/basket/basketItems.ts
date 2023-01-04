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

    head1.textContent = 'Наименование';
    head2.textContent = 'Цвет';
    head3.textContent = 'Количество';
    head4.textContent = 'Цена';

    basketItemsHead.appendChild(head1);
    basketItemsHead.appendChild(head2);
    basketItemsHead.appendChild(head3);
    basketItemsHead.appendChild(head4);

    itemsContent.appendChild(basketItemsHead);



    let basketItems: HTMLElement[] = [];

    for(let i=0;i<5;i++){
      basketItems.push(new BItem().getItem('Сладкие ноты', i+1, 120));
    }

    for(let i=0;i<5;i++){
      itemsContent.appendChild(basketItems[i]);
    }

    itemsContent.querySelectorAll('.cross').forEach(cross => {
      cross.addEventListener('click', e =>{
        e.preventDefault();
        basketItems = basketItems.filter(e =>{
          if(e!=cross.parentNode) return true;
        } )

        cross.parentNode?.parentNode?.removeChild(cross.parentNode);

        console.log(basketItems)

        let sum = 0;
        for(let i=0;i<basketItems.length;i++){
          if(basketItems[i].querySelector('.price')!.textContent!.split('$')[1]!=undefined && (basketItems[i].querySelector('.checked') as HTMLInputElement)?.checked)
          sum += +basketItems[i].querySelector('.price')!.textContent!.split('$')[1];
        }

        document.querySelector('.goods-price')!.textContent = '$' + sum;
        document.querySelector('.total-price')!.textContent = '$' + (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] + +document!.querySelector('.tax-price')!.textContent!.split('$')[1] + +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
      })
    });

    itemsContent.querySelectorAll('.checked').forEach(element => {
      (element as HTMLInputElement).onchange = function(){
        let sum = 0;
        for(let i=0;i<basketItems.length;i++){
          if(basketItems[i].querySelector('.price')!.textContent!.split('$')[1]!=undefined && (basketItems[i].querySelector('.checked') as HTMLInputElement)?.checked)
          sum += +basketItems[i].querySelector('.price')!.textContent!.split('$')[1];
        }

        document.querySelector('.goods-price')!.textContent = '$' + sum;
        document.querySelector('.total-price')!.textContent = '$' + (+document!.querySelector('.goods-price')!.textContent!.split('$')[1] + +document!.querySelector('.tax-price')!.textContent!.split('$')[1] + +document!.querySelector('.delivery-price')!.textContent!.split('$')[1]);
      }
    });

    return itemsContent;
  }
}

//TODO: connect with cross div