import './counter.css';

export default class Counter {
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

        return counter;
    }
}