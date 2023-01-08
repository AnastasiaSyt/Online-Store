import "./cardProduct.css";
import { TElementConfig, Tags } from "../types";
import ColoredTags from "./coloredTags";
import Button from "../filterPage/button";
import Counter from "./counter";
import { IPage } from "../IPage";
import flowers from "../data/data";

interface ICardProduct extends IPage {
    cardProduct: HTMLDivElement,
    addItems: (flowerNumber: number) => void,
    drawItems: (parent: HTMLElement, configs: TElementConfig[]) => void,
    createElement: (config: TElementConfig) => HTMLElement,
    getCardProductDOMElements: (flowerNumber: number) => TElementConfig[]
}

export default class CardProduct implements ICardProduct {
    cardProduct: HTMLDivElement;
    constructor(item: number) {
        const cardProduct = document.createElement('div');
        cardProduct.id = 'cardProductPage';
        cardProduct.classList.add('card_product');
        cardProduct.classList.add('wrapper');

        if (Number.isSafeInteger(item)) {
            const elem = this.getCardProductDOMElements(item);
            this.drawItems(cardProduct, elem);
        }
        this.cardProduct = cardProduct;
        this.addItems(item);
    }

    getPage(): HTMLElement {
        return this.cardProduct;
    }

    addItems(flowerNumber: number) {
        const tags = flowers[flowerNumber]["flower"];
        console.log(tags);
        tags.forEach(item => {
            const coloredTag = new ColoredTags().getColoredTag(item);
            const tagContainer = this.cardProduct.getElementsByClassName('card_product_tags');
            const container = tagContainer[0];
            if (!container) {
                throw new Error ('Container not found');
            } else {
                container.appendChild(coloredTag);
            }
        })

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
    getCardProductDOMElements(flowerNumber: number): TElementConfig[]{

        const flowerName = flowers[flowerNumber]["title"];
        const flowerPrice = flowers[flowerNumber]["price"];
        const category = flowers[flowerNumber]["category"];
        const photo = flowers[flowerNumber]["images"];
        const description = flowers[flowerNumber]["description"];
        const stock = flowers[flowerNumber]["stock"];
        const color = flowers[flowerNumber]["color"];
        const colorEng = ['darkred', 'white', 'black', 'blue', 'yellow', 'orange', 'lime', 'pink', 'indigo'];
        const colorRu = ['Красный', 'Белый', 'Черный', 'Синий', 'Желтый', 'Оранжевый', 'Зеленый', 'Розовый', 'Фиолетовый']

        const CardProductDOMElements: TElementConfig[] =
        [
            {
                tag: Tags.P,
                classes: ['breadcrumbs'],
                label: `Магазин > ${category} > ${flowerName}`
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
                                children: this.getImgs(flowerNumber),
                            },
                            {
                                tag: Tags.IMG,
                                classes: ['card_product_big_img'],
                                src: photo[0]
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
                                label: flowerName
                            },
                            {
                                tag: Tags.DIV,
                                classes: ['card_product_tags'],
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_description'],
                                label:  description
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_sort'],
                                label: `В наличии: ${stock} шт`
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_color'],
                                label: `Цвет: ${colorRu[colorEng.indexOf(color[0])]}`
                            },
                            {
                                tag: Tags.P,
                                classes: ['card_product_price'],
                                label: `$${flowerPrice}`
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
            return CardProductDOMElements;
    }

    getImgs(id: number): TElementConfig[]{
        const temp: TElementConfig[] = [];
        for (let i = 0; i < flowers[id]['images'].length; i++){
            temp[i] = {
                tag: Tags.IMG,
                classes: ['small_img'],
                src: flowers[id]['images'][i],
            }
        }
        return temp;
    }
}