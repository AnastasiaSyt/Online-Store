import './search.css';

interface ISearch {
    getForm: () => HTMLElement
}

export default class Search implements ISearch {
    getForm(): HTMLElement {
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search_container');

        const form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.classList.add('search_form');
        searchContainer.appendChild(form);

        const searchField = document.createElement('input');
        searchField.classList.add('search_field');
        searchField.placeholder = "Искать здесь...";
        searchField.type = "search";
        form.appendChild(searchField);

        const button = document.createElement('button');
        const buttonImg = document.createElement('img');
        button.classList.add('search_button');
        buttonImg.classList.add('search_button_img');
        buttonImg.src = '../../img/Search.svg';
        button.type = "submit";
        button.appendChild(buttonImg)
        form.appendChild(button);

        const copyButton = document.createElement('div');
        copyButton.classList.add('copy_button');
        searchContainer.appendChild(copyButton);

        copyButton.addEventListener('click', e => {
            e.preventDefault();
            searchField.select();
            document.execCommand("copy");
        })

        const copyIcon = document.createElement('img');
        copyIcon.src = '../../img/icon_copy.svg';
        copyIcon.classList.add('copy_icon');
        copyButton.appendChild(copyIcon);

        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons_container');
        searchContainer.appendChild(iconsContainer);

        const iconCards = document.createElement('div');
        iconCards.classList.add('icon_cards');
        iconsContainer.appendChild(iconCards);

        const cards = document.createElement('img');
        cards.src = '../../img/icon_card_red.svg';
        cards.classList.add('cards');
        iconCards.appendChild(cards);

        const iconList = document.createElement('div');
        iconList.classList.add('icon_list');
        iconsContainer.appendChild(iconList);

        const list = document.createElement('img');
        list.src = '../../img/icon_list_gray.svg';
        list.classList.add('list');
        iconList.appendChild(list);


        return searchContainer;
    }
}

