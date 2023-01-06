import { TElementConfig, Tags } from '../types';
import './modal.css';

export default class ModalDraw {
    getModal() {
        const modal = document.createElement('form');
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
        if (config.title) {
            (node as HTMLInputElement).title = config.title;
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
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_name', 'modal_input'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Имя и фамилия',
                                    pattern: '[A-Za-zА-Яа-яЁё]{3,}\\s+[A-Za-zА-Яа-яЁё]{3,}',
                                    title: 'Введите не менее двух слов, длина каждого не менее 3 символов'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_phone', 'modal_input'],
                                    type: '',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Номер телефона в формате +000000000000',
                                    pattern: '[\\+][0-9\\s]{9,}',
                                    title: 'Введите номер телефона, он должен начинаться с +, содержать только цифры и быть не короче 9 цифр'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_delivery', 'modal_input'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Адрес доставки',
                                    pattern: '[A-Za-zА-Яа-яЁё0-9]{5,}\\s+[A-Za-zА-Яа-яЁё0-9]{5,}\\s+[A-Za-zА-Яа-яЁё0-9]{5,}',
                                    title: 'Введите не менее трех слов, длина каждого не менее 5 символов'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_email', 'modal_input'],
                                    type: 'email',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Email',
                                    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
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
                                            classes: ['modal_paypal', 'paid_logo'],
                                            src: '../../img/PayPal.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_mastercard', 'paid_logo'],
                                            src: '../../img/Mastercard.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_visa', 'paid_logo'],
                                            src: '../../img/Visa.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_apple', 'paid_logo'],
                                            src: '../../img/ApplePay.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_bitcoin', 'paid_logo'],
                                            src: '../../img/Bitcoin.svg'
                                        },
                                        {
                                            tag: Tags.IMG,
                                            classes: ['modal_google', 'paid_logo'],
                                            src: '../../img/GooglePay.svg'
                                        }
                                    ]
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_name', 'modal_input'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Name on card',
                                    pattern: '[A-Za-zА-Яа-яЁё]{3,}\\s+[A-Za-zА-Яа-яЁё]{3,}',
                                    title: 'Введите имя и фамилию держателя карты'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_number', 'modal_input'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'Card number',
                                    pattern: '[0-9]{16}',
                                    title: 'Введите номер карты, 16 символов'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_card_expire', 'modal_input'],
                                    type: 'text',
                                    attribute: ['required', 'required'],
                                    placeholder: 'MM / YY',
                                    pattern: '\S+\s+\S+\s+\S+'
                                },
                                {
                                    tag: Tags.INPUT,
                                    classes: ['modal_input_CVC', 'modal_input'],
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