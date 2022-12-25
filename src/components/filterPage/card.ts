import "./card.css";
import { TElementConfig, Tags } from "../types";

interface ICard {
    getCard: () => HTMLElement
}

export default class Card implements ICard{
    getCard(): HTMLElement {
        const card = document.createElement('div');
        card.classList.add('card');
        this.drawItems(card, cardDOMElements);
        return card;
    }
    
    drawItems(parent: HTMLElement, configs: TElementConfig[]) {
        configs.forEach((config) => {
            const node = this.createElement(config);
            if (config.children) {
                this.drawItems(node, config.children);
            }
            parent.appendChild(node);
        })
    }

    createElement(config: TElementConfig): HTMLElement {
        const node = document.createElement(config.tag);
        config.classes.forEach((className) => {
            node.classList.add(className);
        });
        if (config.label) {
            node.textContent = config.label;
        }
        if (config.src) {
            (node as HTMLImageElement).src = config.src;
        }
        return node;
    }

}

const cardDOMElements: TElementConfig[] =
[
    {
        tag: Tags.IMG,
        classes: ['thumbnail'],
        src: '../../img/flower.jpg'
    },
    {
        tag: Tags.DIV,
        classes: ['card_content'],
        children: [
            {
                tag: Tags.P,
                classes: ['card_title'],
                label: 'Название букета'
            },
            {
                tag: Tags.DIV,
                classes: ['card_text'],
                children: [
                    {
                        tag: Tags.P,
                        classes: ['price'],
                        label: '$120.00'
                    },
                    {
                        tag: Tags.IMG,
                        classes: ['card_icon'],
                        src: '../../img/arrow-right.svg'
                    }
                ]
            },
            {
                tag: Tags.DIV,
                classes: ['cart_tag'],
                children: [
                    {
                        tag: Tags.IMG,
                        classes: [],
                        src: '../../img/add_cart.svg'
                    },
                    {
                        tag: Tags.P,
                        classes: ['text_tag'],
                        label: 'добавить'
                    }
                ]
            }
        ]
    }
]