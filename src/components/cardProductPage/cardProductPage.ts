import "./cardProduct.css";
import { TElementConfig, Tags } from "../types";
import ColoredTags from "./coloredTags";
import Button from "../filterPage/button";
import Counter from "./counter";
import { IPage } from "../IPage";
import flowers from "../data/data";

interface ICardProduct extends IPage {
    cardProduct: HTMLDivElement,
    addItems: () => void,
    drawItems: (parent: HTMLElement, configs: TElementConfig[]) => void,
    createElement: (config: TElementConfig) => HTMLElement,
    getDOMCardPage: (id: number) => TElementConfig[],
}

export default class CardProduct implements ICardProduct {
    cardProduct: HTMLDivElement;
    constructor() {
        const cardProduct = document.createElement('div');
        cardProduct.id = 'cardProductPage';
        cardProduct.classList.add('card_product');
        cardProduct.classList.add('wrapper');
        this.drawItems(cardProduct, this.getDOMCardPage(0));
        this.cardProduct = cardProduct;
    }

    getPage(): HTMLElement {
        return this.cardProduct;
    }

    addItems() {
        const coloredTag = new ColoredTags().getColoredTag('Анемон');
        const tagContainer = this.cardProduct.querySelector('.card_product_tags');
        if (!tagContainer) {
            throw new Error ('Container not found');
        } else {
            tagContainer?.appendChild(coloredTag);
        }

        const buttonsContainer = this.cardProduct.querySelector('.card_product_buttons');
        const cardProductButton = new Button('добавить в корзину', 'card_product_button');
        const counter = new Counter().getCounter();

        if (!buttonsContainer) {
            throw new Error ('Container not found');
        } else {
            cardProductButton.getButton(buttonsContainer);
            buttonsContainer.appendChild(counter);
        }
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

    getDOMCardPage(flowerID: number): TElementConfig[]{
        return [
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
                                        src: flowers[flowerID]['images'][0]
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
                                src: flowers[flowerID]['thumbnail']
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
                                label: flowers[flowerID]['title'],
                            },
                            {
                                tag: Tags.DIV,
                                classes: ['card_product_tags'],
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_description'],
                                label:  flowers[flowerID]["description"]
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_sort'],
                                label: `В наличии: ${flowers[flowerID]["stock"]} шт.`
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_color'],
                                label: `Цвет: ${flowers[flowerID]["color"].join(', ')}`
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_price'],
                                label: `$${flowers[flowerID]["price"]}`
                            },
                            {
                                tag: Tags.DIV,
                                classes: ['card_product_buttons'],
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
