import './filterPage.css';
import './slider.css';

import Search from './searchForm';
import Filter from './filter';
import Card from './card';
import { IPage } from '../IPage';
import { PageIDs } from '../types';
import Filtration from './filtration';

export default class FilterPage implements IPage {
    filtration: Filtration;
    allCards: HTMLElement;
    tagContainer!: HTMLDivElement;
    filter!: Filter;

    constructor() {
        this.filtration = new Filtration(this.drawFlowers.bind(this));
        const allCards = document.createElement('div');
        allCards.classList.add('all_cards');
        this.allCards = allCards;
    }

    getPage() {
        const filterContent = document.createElement('div');
        filterContent.id = 'filterPage';
        filterContent.classList.add('filter_content');
        filterContent.classList.add('wrapper');

        const filter = new Filter(this.filtration, this.drawFlowers.bind(this), filterContent);
        filterContent.appendChild(filter.getFilter());
        this.filter = filter;

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
        this.tagContainer = tagsContainer;
        this.tagContainer = tagsContainer;

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

        mainContent.appendChild(this.allCards);

        this.drawFlowers();

        return filterContent;
    }

    removeFlowers() {
        while (this.allCards.childNodes.length > 0 ) {
            this.allCards.removeChild(this.allCards.childNodes[0]);
        }
    }

    drawFlowers() {
        this.removeFlowers();
        
        const filteredFlowers = this.filtration.filter();
        const tags = this.filtration.generateTags();
        while (this.tagContainer.lastElementChild) {
            this.tagContainer.removeChild(this.tagContainer.lastElementChild);
        }
        tags.forEach((tag) => this.tagContainer.append(tag));
        
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
            this.allCards.appendChild(cardLink);
        })
        
        this.filter.redrawCheckboxes(this.filtration.selectedFilter);
        this.filter.redrawSliders(this.filtration.selectedFilter);
        this.filter.redrawColors(this.filtration.selectedFilter.color);
    }
}