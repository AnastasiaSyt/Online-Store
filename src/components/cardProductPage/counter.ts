import './counter.css';

interface ICounter {
    getCounter: () => HTMLElement
}

export default class Counter implements ICounter {
    getCounter(): HTMLElement {
        const counter = document.createElement('div');
        counter.classList.add('counter');

        const buttonDecrement = document.createElement('button');
        buttonDecrement.classList.add('button_counter');
        buttonDecrement.textContent = '-';
        counter.appendChild(buttonDecrement);

        const inputCounter = document.createElement('input');
        inputCounter.type = 'number';
        inputCounter.classList.add('input_counter');
        inputCounter.value = '1';
        inputCounter.setAttribute('min', '0');
        counter.appendChild(inputCounter);

        const buttonIncrement = document.createElement('button');
        buttonIncrement.classList.add('button_counter');
        buttonIncrement.textContent = '+';
        counter.appendChild(buttonIncrement);

        buttonDecrement.addEventListener('click', e=>{
            e.preventDefault();
            inputCounter.value = +inputCounter.value - 1 >= 0 ? (+inputCounter.value - 1).toString() : '0';
            if(+inputCounter.value === 0) inputCounter.parentNode?.parentNode?.querySelector('.button')?.setAttribute('disabled', '');
        })

        buttonIncrement.addEventListener('click', e=>{
            e.preventDefault();
            const amount = Number(inputCounter.parentNode?.parentNode?.parentNode?.querySelector('.card_product_sort')?.textContent?.split(' ')[2]);
            if(+inputCounter.value + 1 <= amount)
            inputCounter.value = (+inputCounter.value + 1).toString();
        })

        return counter;
    }
}