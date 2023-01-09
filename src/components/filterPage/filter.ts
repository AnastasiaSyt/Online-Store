/* eslint-disable @typescript-eslint/ban-types */
import "./filter.css";

import Slider from './slider';
import Button from "./button";
import Filtration from "./filtration";
import { SelectedFilter } from "../types";

interface IFilter {
    filtration: Filtration;
    callback: Function;
    priceSlider: Slider;
    sizeSlider: Slider;
    getFilter: () => HTMLElement,
    resetFilters: () => void,
    getAccordion: (node: HTMLElement) => void,
    getBodyItems: (arr: string[], target: Element, name: string, callback: Function, type: string) => void
}

export default class Filter implements IFilter {
    filtration: Filtration;
    callback: Function;
    parent: HTMLElement;
    priceSlider!: Slider;
    sizeSlider!: Slider;

    constructor(filtration: Filtration, callback: Function, parent: HTMLElement) {
        this.filtration = filtration;
        this.callback = callback;
        this.parent = parent;
    }

    getFilter() {
        const filter = document.createElement('div');
        filter.classList.add('filter');

        this.getAccordion(filter);

        const type = filter.querySelector('.num-1');
        const typeItems = ['Все', 'цветы', 'букеты', 'композиция', 'свадебные букеты', 'подарки с цветами'];
        const typeName = type?.className;

        if (type && !!typeName) {
            this.getBodyItems(typeItems, type, typeName, this.filtration.changeType.bind(this.filtration), 'type');
        }

        const occasion = filter.querySelector('.num-2');
        const typeOccasion = ['свадьба', 'юбилей', '8 марта', 'день рождения', '14 февраля', 'свидание'];
        const occasionName = occasion?.className;

        if (occasion && !!occasionName) {
            this.getBodyItems(typeOccasion, occasion, occasionName, this.filtration.changeOccasion.bind(this.filtration), 'occasion');
        }

        const color = filter.querySelector('.num-3');

        const colorItems = ['darkred', 'white', 'black', 'blue', 'yellow', 'orange', 'lime', 'pink', 'indigo'];
        colorItems.forEach((item) => {
            const ellipse = document.createElement('div');
            ellipse.classList.add('color_circle');
            ellipse.classList.add(item);
            ellipse.style.background = item;
            ellipse.addEventListener('click', e => {
                e.preventDefault();
                ellipsesClassRemove();
                ellipse.classList.add('active');
                this.filtration.changeColor(item);
                this.callback();
            });
            color?.appendChild(ellipse);
        })

        function ellipsesClassRemove(){
            document.querySelectorAll('.color_circle').forEach(e => { e.classList.remove('active') })
        }


        const flower = filter.querySelector('.num-4');
        const flowerItems = ['роза', 'гербера', 'тюльпан', 'гвоздика', 'лилия', 'хризантема', 'пион'];
        const flowerName = flower?.className;
        console.log(`flowerName${flowerName}`);

        if (flower && !!flowerName) {
            this.getBodyItems(flowerItems, flower, flowerName, this.filtration.changeFlower.bind(this.filtration), 'flower');
        }

        const price = filter.querySelector('.num-5');
        if (price) {
            this.priceSlider = new Slider((min: number, max: number) => {
                this.filtration.changePrice(min, max);
                this.callback();
            }, '0', '160');
            this.priceSlider.getSlider(price);
        }

        const height = filter.querySelector('.num-6');
        if (height) {
            this.sizeSlider = new Slider((min: number, max: number) => {
                this.filtration.changeSize(min, max);
                this.callback();
            }, '20', '80');
            this.sizeSlider.getSlider(height);
        }

        const filterButton = new Button('cбросить фильтры', 'filter_button', 'reset').getButton(filter);
        filterButton.addEventListener('click', this.resetFilters.bind(this));

        return filter;
    }

    redrawSliders(selectedFilters: SelectedFilter) {
        const {price, size} = selectedFilters;
        this.sizeSlider.resetSlider(size.min.toString(), size.max.toString());
        this.priceSlider.resetSlider(price.min.toString(), price.max.toString());
    }

    resetFilters(): void {
        this.filtration.removeFilters();
        this.callback();

        this.uncheckCheckbox();
        this.uncheckColors();

        this.priceSlider.resetSlider('0', '160');
        this.sizeSlider.resetSlider('20', '80');
    }

    uncheckCheckbox() {
        const checkboxes = this.parent.getElementsByClassName('custom-checkbox');
        for (let i = 0; i < checkboxes.length; i += 1) {
            const item = checkboxes[i] as HTMLInputElement;
            item.checked = false;
        }
    }

    uncheckColors() {
        const colors = this.parent.getElementsByClassName('color_circle');
        for (let i = 0; i < colors.length; i += 1) {
            colors[i].classList.remove('active');
        }
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

    getBodyItems(arr: string[], target: Element, name: string, callback: Function, type: string) {
        arr.forEach((item, index) => {
            const typeGift = document.createElement('div');

            const checkboxGift = document.createElement('input');
            checkboxGift.type = 'checkbox';
            checkboxGift.classList.add('custom-checkbox');
            checkboxGift.id = `link${index}-${name}`;
            checkboxGift.setAttribute('itemType', type);
            checkboxGift.setAttribute('item', item);
            checkboxGift.addEventListener('click', () => {
                callback(item);
                this.callback();
            })
            typeGift.appendChild(checkboxGift);

            const labelGift = document.createElement('label');
            labelGift.setAttribute('for', `link${index}-${name}`);
            labelGift.classList.add('label_filter');
            labelGift.textContent = item;
            typeGift.appendChild(labelGift);

            target.appendChild(typeGift);
        })
    }

    selectCheckboxes(type: string, items: string[]): void {
        items.forEach(item => {
            const checkbox = document.querySelector(`[itemType="${type}"][item="${item}"]`);
            if (checkbox){
                (checkbox as HTMLInputElement).checked = true;
                console.log((checkbox as HTMLInputElement).checked);
            }
        });
    }
    
    redrawCheckboxes(selectedFilter: SelectedFilter): void {
        this.uncheckCheckbox();
        const typesCheckboxes = Object.keys(selectedFilter.type);
        const occasionCheckboxes = Object.keys(selectedFilter.occasion);
        const flowerCheckboxes = Object.keys(selectedFilter.flower);
        this.selectCheckboxes('type', typesCheckboxes);
        this.selectCheckboxes('occasion', occasionCheckboxes);
        this.selectCheckboxes('flower', flowerCheckboxes);
    }

    redrawColors(color?: string) {
        this.uncheckColors();
        if (color) {
            const currentColor = document.querySelector(`.${color}`);
            console.log(currentColor);
            currentColor?.classList.add('active');
        }
    }

    
}