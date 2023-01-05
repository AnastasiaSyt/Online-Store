import './filterPage.css';
import './slider.css';

import Search from './searchForm';
import Filter from './filter';
import Tag from './tags';
import Card from './card';
import { IPage } from '../IPage';
import { PageIDs } from '../types';
import flowers from '../data/data';
import { IFlower } from '../data/IFlowers';


export default class FilterPage implements IPage {
    getPage() {
        const filterContent = document.createElement('div');
        filterContent.id = 'filterPage';
        filterContent.classList.add('filter_content');
        filterContent.classList.add('wrapper');

        const filter = new Filter().getFilter();
        filterContent.appendChild(filter);

        const mainContent = document.createElement('div');
        mainContent.classList.add('main_content');
        filterContent.appendChild(mainContent);

        const search = new Search().getForm();
        mainContent.appendChild(search);

        const sortContainer = document.createElement('div');
        sortContainer.classList.add('sort_container');
        mainContent.appendChild(sortContainer);

        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags_container');
        sortContainer.appendChild(tagsContainer);

        const tag = new Tag().getTag('Букеты(34)');
        const tagOne = new Tag().getTag('Белый(6)');
        const tagTwo = new Tag().getTag('$10-$1000');
        tagsContainer.appendChild(tag);
        tagsContainer.appendChild(tagOne);
        tagsContainer.appendChild(tagTwo);

        const selectContainer = document.createElement('div');
        selectContainer.classList.add('select_container');
        sortContainer.appendChild(selectContainer);

        const labelSelect = document.createElement('label');
        labelSelect.classList.add('label_select');
        labelSelect.setAttribute('for', 'select');
        labelSelect.textContent = 'сортировать:';
        selectContainer.appendChild(labelSelect);

        const select = document.createElement('select');
        select.classList.add('select');
        select.id = 'select';
        selectContainer.appendChild(select);

        const optionOne = document.createElement('option');
        optionOne.textContent = 'популярные';
        const optionTwo = document.createElement('option');
        optionTwo.textContent = 'дорогие';
        const optionThree = document.createElement('option');
        optionThree.textContent = 'дешевые';

        select.appendChild(optionOne);
        select.appendChild(optionTwo);
        select.appendChild(optionThree);

        const allCards = document.createElement('div');
        allCards.classList.add('all_cards');
        mainContent.appendChild(allCards);

        const filteredFlowers = this.filter();
        this.drawFlowers(allCards, filteredFlowers)

        return filterContent;
    }

    removeFlowers(parent: HTMLElement){
        while(parent.childNodes.length > 0 ) {parent.removeChild(parent.childNodes[0])}

    }

    drawFlowers(parent: HTMLElement, filteredFlowers: IFlower[]){
        filteredFlowers.forEach(item => {
            const cardLink = document.createElement('a');
            cardLink.addEventListener('click', () => {
                window.history.pushState({}, "", `${PageIDs.CardProductPage}_${item.id}`);
                const event = new Event('popstate');
                window.dispatchEvent(event);
            });
            cardLink.classList.add('link_card');

            const card = new Card().getCard(item.id);
            cardLink.appendChild(card);
            parent.appendChild(cardLink);
        })
    }

    filter(): IFlower[] {
        let filteredFlowers: IFlower[] = flowers ?? [];
        filteredFlowers = this.typeFilter(filteredFlowers, 'букет') ?? [];
        return filteredFlowers;
    }

    typeFilter(currentFlowers: IFlower[], type: string){
        if(type.indexOf('Все')>=0) return currentFlowers;
        return currentFlowers.filter(el=> el.category === type)
    }
}