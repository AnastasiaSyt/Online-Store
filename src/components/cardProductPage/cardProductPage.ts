import "./cardProduct.css";
import { TElementConfig, Tags } from "../types";

export default class CardProduct {
    getCardProduct(): HTMLElement {
        const cardProduct = document.createElement('div');
        cardProduct.classList.add('card_product');
        this.drawItems(cardProduct, cardProductDOMElements);
        return cardProduct;
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

const cardProductDOMElements: TElementConfig[] =
[
    {
        tag: Tags.P,
        classes: ['breadcrumbs'],
        label: 'Магазин > Букеты > Название букета'
    },
    {
        tag: Tags.DIV,
        classes: ['card_product_content'],
        children: [
            {
                tag: Tags.DIV,
                classes: ['card_product_images'],
                children: [
                    {
                        tag: Tags.DIV,
                        classes: ['card_product_small_img'],
                        children: [
                            {
                                tag: Tags.IMG,
                                classes: ['small_img'],
                                src: '../../img/flowers_15_1.jpg'
                            },
                            {
                                tag: Tags.IMG,
                                classes: ['small_img'],
                                src: '../../img/flowers_15_2.jpg'
                            }
                        ]
                    },
                    {
                        tag: Tags.IMG,
                        classes: ['card_product_big_img'],
                        src: '../../img/flowers_15_1'
                    }
                ]
            },
            {
                tag: Tags.DIV,
                classes: ['card_product_text'],
                children: [
                    {
                        tag: Tags.P,
                        classes: ['card_product_title'],
                        label: 'сладкие ноты'
                    },
                    {
                        tag: Tags.DIV,
                        classes: ['card_product_tags'],
                        //children: [getTags()]
                    },
                    {
                        tag: Tags.P,
                        classes: ['card_product_description'],
                        label: 'Дайте человеку понять, что вы думаете о нем с помощью этой нежной, полностью белой композиции. Это утешительный жест, который говорит о многом, не говоря ни слова.'
                    },
                    {
                        tag: Tags.P,
                        classes: ['card_product_sort'],
                        label: 'В наличии: 3 шт'
                    },
                    {
                        tag: Tags.P,
                        classes: ['card_product_color'],
                        label: 'Цвет: белый'
                    },
                    {
                        tag: Tags.P,
                        classes: ['card_product_price'],
                        label: '$105.00'
                    },
                    {
                        tag: Tags.DIV,
                        classes: ['card_product_buttons'],
                        //children: []
                    }
                ]
            }
        ]
    }
]