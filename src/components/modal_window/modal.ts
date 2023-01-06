import { TElementConfig, Tags } from '../types';
import './modal.css';

export default class Modal {
    getModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal_window');
        this.drawItems(modal, this.getDOMElements());
        return modal;
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
        if (config.id) {
            (node as HTMLElement).id = config.id;
        }
        if (config.type) {
            (node as HTMLInputElement).type = config.type;
        }
        if (config.placeholder) {
            (node as HTMLInputElement).placeholder = config.placeholder;
        }
        if (config.pattern) {
            (node as HTMLInputElement).pattern = config.pattern;
        }
        if (config.attribute) {
            (node as HTMLInputElement).setAttribute(config.attribute[0], config.attribute[1]);
        }
        return node;
    }

    getDOMElements(): TElementConfig[]{

        const modalDOMElements: TElementConfig[] =
            [
                {
                    tag: Tags.DIV,
                    classes: ['modal'],
                    id: 'modal',
                    children: [
                        {
                            tag: Tags.P,
                            classes: ['modal_title'],
                            label: 'Персональные данные',
                            children: [
                                {
                                    tag: Tags.DIV,
                                    classes: ['modal_personal'],
                                    label: 'Персональная информация',
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_name'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Имя и фамилия',
                                    pattern: '\D{3,} ^\S+\D{3,}'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_phone'],
                                    type: 'tel',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Номер телефона',
                                    pattern: '\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_delivery'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Адрес доставки',
                                    pattern: '\S+\s+\S+\s+\S+'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_email'],
                                    type: 'email',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Email'
                                },
                                {
                                    tag: Tags.DIV,
                                    classes: ['modal_data_card'],
                                    label: 'Данные карты'
                                },
                                {
                                    tag: Tags.DIV,
                                    classes: ['modal_paid_logo'],
                                    children: [
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_paypal'],
                                            src: '../../img/PayPal.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_mastercard'],
                                            src: '../../img/Mastercard.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_visa'],
                                            src: '../../img/Visa.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_apple'],
                                            src: '../../img/ApplePay.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_bitcoin'],
                                            src: '../../img/Bitcoin.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_google'],
                                            src: '../../img/GooglePay.svg'
                                        }
                                    ]
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_name'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Name on card',
                                    pattern: '\D{3,} ^\S+\D{3,}'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_number'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Card number',
                                    pattern: '\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_expire'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'MM / YY',
                                    pattern: '\S+\s+\S+\s+\S+'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_CVC'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'CVC'
                                },
                            ]
                        }
                    ]
                },

            ]
            return modalDOMElements;
    }
}