import "./filter.css";

import Slider from './slider';
import Button from "./button";

interface IFilter {
    getFilter: () => HTMLElement,
    getAccordion: (node: HTMLElement) => void,
    getBodyItems: (arr: string[], target: Element, name: string) => void
}

export default class Filter implements IFilter {
    getFilter() {
        const filter = document.createElement('div');
        filter.classList.add('filter');

        this.getAccordion(filter);

        const type = filter.querySelector('.num-1');
        const typeItems = ['Все', 'Цветы', 'Букеты', 'Композиция', 'Свадебные букеты', 'Подарки с цветами'];
        const typeName = type?.className;

        if (type && !!typeName) {
            this.getBodyItems(typeItems, type, typeName);
        }

        const occasion = filter.querySelector('.num-2');
        const typeOccasion = ['свадьба', 'юбилей', '8 марта', 'день рождения', '14 февраля', 'свидание'];
        const occasionName = occasion?.className;

        if (occasion && !!occasionName) {
            this.getBodyItems(typeOccasion, occasion, occasionName);
        }

        const color = filter.querySelector('.num-3');

        const colorItems = ['darkred', 'white', 'black', 'blue', 'yellow', 'orange', 'lime', 'pink'];

        colorItems.forEach((item) => {
            const ellipse = document.createElement('div');
            ellipse.classList.add('color_circle');
            ellipse.style.background = item;

            color?.appendChild(ellipse);
        })

        const flower = filter.querySelector('.num-4');
        const flowerItems = ['роза', 'гербера', 'тюльпан', 'гвоздика', 'лилия', 'хризантема', 'пион'];
        const flowerName = flower?.className;

        if (flower && !!flowerName) {
            this.getBodyItems(flowerItems, flower, flowerName);
        }

        const price = filter.querySelector('.num-5');
        if (price) {
            const sliderPrice = new Slider().getSlider(price);
        }

        const height = filter.querySelector('.num-6');
        if (height) {
            const sliderHeight = new Slider().getSlider(height);
        }

        const filterButton = new Button('cбросить фильтры', 'filter_button').getButton(filter);

        return filter;
    }
    getAccordion(node: HTMLElement) {
        const accordionsItems = ['тип', 'повод', 'цвет', 'основной цветок', 'стоимость', 'высота'];

        accordionsItems.forEach((item, index) => {
            const filterItem = document.createElement('div');
            filterItem.classList.add('filter_item');
            filterItem.classList.add('filter_item_show');
            node.appendChild(filterItem);

            const filterHeader = document.createElement('div');
            filterHeader.classList.add('filter_header');
            
            filterHeader.textContent = item;
            filterItem.appendChild(filterHeader);

            const filterBody = document.createElement('div');
            filterBody.classList.add('filter_body');
            filterBody.classList.add(`num-${index + 1}`);
            filterItem.appendChild(filterBody);
        })
    }

    getBodyItems(arr: string[], target: Element, name: string) {
        arr.forEach((item, index) => {
            const typeGift = document.createElement('div');

            const checkboxGift = document.createElement('input');
            checkboxGift.type = 'checkbox';
            checkboxGift.classList.add('custom-checkbox');
            checkboxGift.id = `link${index}-${name}`;
            typeGift.appendChild(checkboxGift);

            const labelGift = document.createElement('label');
            labelGift.setAttribute('for', `link${index}-${name}`);
            labelGift.classList.add('label_filter');
            labelGift.textContent = item;
            typeGift.appendChild(labelGift);

            target.appendChild(typeGift);
        })
    }
}