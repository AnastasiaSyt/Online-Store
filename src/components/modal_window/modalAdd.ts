import ModalDraw from "./modalDraw";
import './modal.css';
import { PageIDs } from "../types";

interface IModal {
    modalForm: HTMLFormElement,
    modal: HTMLDivElement,
    modalBackground: () => HTMLDivElement,
    getButton: () => HTMLDivElement,
    closeIcon: () => HTMLSpanElement,
    bindEvents: () => void,
    openModalWindow: (background: Node) => void,
    closeModalWindow: (event: Event) => void,
    message: () => HTMLDivElement
}

export default class Modal implements IModal {
    modalForm!: HTMLFormElement;
    modal: HTMLDivElement;

    constructor() {
        this.modal = this.modalBackground();
        this.openModalWindow(this.modal);
        this.bindEvents();
    }

    modalBackground(): HTMLDivElement {
        const background = document.createElement('div');
        background.classList.add('modalBackground');
        const modal = new ModalDraw().getModal();
        background.appendChild(modal);
        modal.appendChild(this.closeIcon());
        modal.appendChild(this.getButton());
        this.modalForm = modal;
        this.modalForm.action = 'javascript:void(0);';
        return background;
    }

    getButton(): HTMLDivElement {
        const buttons = document.createElement('div');
        buttons.classList.add('modal_buttons');

        const buttonConfirm = document.createElement('input');
        buttonConfirm.type = 'submit';
        buttonConfirm.classList.add('button');
        buttonConfirm.classList.add('confirm_button');
        buttonConfirm.value = 'подтвердить';
        buttons.appendChild(buttonConfirm);

        buttonConfirm.addEventListener('click', () => {
            if (this.modalForm.checkValidity()) {
                console.log('valid is true');
                const message = this.message();
                document.body.append(message);
                setTimeout(() => {
                    message.remove();
                    this.modal.remove();

                    window.history.pushState({}, "", `${PageIDs.FilterPage}`);
                    const event = new Event('popstate');
                    window.dispatchEvent(event);
                }, 3000);
            } else {
                console.log('valid is false');
            }
        })

        const buttonCancel = document.createElement('input');
        buttonCancel.type = 'reset';
        buttonCancel.classList.add('button');
        buttonCancel.classList.add('cancel_button');
        buttonCancel.value = 'отменить';
        buttons.appendChild(buttonCancel);

        return buttons;
    }

    closeIcon(): HTMLSpanElement {
        const closeIcon = document.createElement('span');
        closeIcon.id = 'close_icon';
        closeIcon.classList.add('modal_close-button');
        return closeIcon;
    }

    bindEvents() {
        const closeIcon = document.getElementById('close_icon');
        closeIcon?.addEventListener('click', this.closeModalWindow.bind(this));
        const cancel = document.querySelector('.cancel_button');
        cancel?.addEventListener('click', (this.closeModalWindow.bind(this)));
        // const background = document.querySelector('.modalBackground');
        // background?.addEventListener('click', this.closeModalWindow.bind(this));
    }

    openModalWindow(background: Node) {
        document.body.append(background);
    }

    closeModalWindow(event: Event) {
        const classes = (event.target as HTMLElement).classList;
        if (classes.contains('modalBackground') || 
        classes.contains('modal_close-button') || 
        classes.contains('cancel_button') ||
        classes.contains('modal_window')) {
            this.modal.remove();
        }
    }

    message(): HTMLDivElement {
        const message = document.createElement('div');
        message.classList.add('message_modal');
        message.textContent = 'Ваш заказ оформлен!';

        return message;
    }
}