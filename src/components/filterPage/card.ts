import "./card.css";
import { TElementConfig, Tags } from "../types";
import flowers from "../data/data";

interface ICard {
    getCard: (item: number) => HTMLElement,
    drawItems: (parent: HTMLElement, configs: TElementConfig[]) => void,
    createElement: (config: TElementConfig) => HTMLElement,
    getDOMElements: (flowerNumber: number) => TElementConfig[]
}



export default class Card implements ICard{
    getCard(item: number): HTMLElement {
            const elem = this.getDOMElements(item);

            const card = document.createElement('div');
            card.classList.add('card');
            this.drawItems(card, elem);
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

    getDOMElements(flowerNumber: number): TElementConfig[]{
        const thumbnailPath = flowers[flowerNumber]["thumbnail"];
        const flowerName = flowers[flowerNumber]["title"];
        const flowerPrice = flowers[flowerNumber]["price"];

        const cardDOMElements: TElementConfig[] =
            [
                {
                    tag: Tags.IMG,
                    classes: ['thumbnail'],
                    src: thumbnailPath
                },
                {
                    tag: Tags.DIV,
                    classes: ['card_content'],
                    children: [
                        {
                            tag: Tags.P,
                            classes: ['card_title'],
                            label: flowerName
                        },
                        {
                            tag: Tags.DIV,
                            classes: ['card_text'],
                            children: [
                                {
                                    tag: Tags.P,
                                    classes: ['price_card'],
                                    label: `$${flowerPrice}`
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
            return cardDOMElements;
    }

}