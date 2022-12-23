import "./card.css";

interface ICard {
    getCard: () => HTMLElement
}

export default class Card implements ICard{
    getCard(): HTMLElement {
        const card = document.createElement('div');
        card.classList.add('card');

        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        thumbnail.src = '../../img/flower.jpg';
        card.appendChild(thumbnail);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');
        card.appendChild(cardContent);
        
        const cardTitle = document.createElement('p');
        cardTitle.classList.add('card_title');
        cardTitle.textContent = 'Название букета';
        cardContent.appendChild(cardTitle);

        const cardText = document.createElement('div');
        cardText.classList.add('card_text');
        cardContent.appendChild(cardText);

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = '$120.00';
        cardText.appendChild(price);

        const cardIcon = document.createElement('img');
        cardIcon.classList.add('card_icon');
        cardIcon.src = '../../img/arrow-right.svg';
        cardText.appendChild(cardIcon);

        const cartTag = document.createElement('div');
        cartTag.classList.add('cart_tag');
        cardContent.appendChild(cartTag);

        const cartIcon = document.createElement('img');
        cartIcon.src = '../../img/add_cart.svg';
        cartTag.appendChild(cartIcon);

        const textTag= document.createElement('p');
        textTag.classList.add('text_tag');
        textTag.textContent = 'добавить';
        cartTag.appendChild(textTag);

        return card;
    }

}