import "./card.css";
import { TElementConfig, Tags } from "../types";
import flowers from "../data/data";

interface ICard {
    getCard: (item: number) => HTMLElement
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
            if(className === 'cart_tag'){
                node.addEventListener('click', e=>{
                    if(localStorage.getItem('basketFlowers')){
                    let tempFlowers = JSON.parse(localStorage.getItem('basketFlowers') ?? '');
                    if(tempFlowers){
                        tempFlowers.push(
                            flowers.filter(e => {
                                return e.title === node.parentNode?.querySelector('.card_title')?.textContent;
                            })[0]['id']
                        );
                        const tempSet = new Set(tempFlowers);
                        tempFlowers = Array.from(tempSet);
                        document.querySelector('.count')!.textContent = tempFlowers.length;
                        localStorage.setItem('basketFlowers', JSON.stringify(tempFlowers))
                    }
                }
                else{
                    const basketFlowers = [];
                    basketFlowers.push(Number(window.location.href.split('_')[1]));
                    localStorage.setItem('basketFlowers', JSON.stringify(basketFlowers))
                    document.querySelector('.count')!.textContent = '1';
                }
            }
            )}
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