import ModalDraw from "./modalDraw";
import Button from "../filterPage/button";
import './modal.css';

export default class Modal {

    getModal() {
        this.modalBackground();
        this.openModalWindow();
        this.bindEvents();
    }

    modalBackground(): Node {
        const background = document.createElement('div');
        background.classList.add('modalBackground');
        const modal = new ModalDraw().getModal();
        background.appendChild(modal);
        modal.appendChild(this.closeIcon());
        modal.appendChild(this.getButton());
        return background;
    }

    getButton() {
        const buttons = document.createElement('div');
        buttons.classList.add('modal_buttons');

        const buttonConfirm = document.createElement('input');
        buttonConfirm.type = 'submit';
        buttonConfirm.classList.add('button');
        buttonConfirm.classList.add('confirm_button');
        buttonConfirm.value = 'подтвердить';
        buttons.appendChild(buttonConfirm);

        const buttonCancel = document.createElement('input');
        buttonCancel.type = 'reset';
        buttonCancel.classList.add('button');
        buttonCancel.classList.add('cancel_button');
        buttonCancel.value = 'отменить';
        buttons.appendChild(buttonCancel);

        return buttons;
    }

    closeIcon() {
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
        const background = document.querySelector('.modalBackground');
        background?.addEventListener('click', this.closeModalWindow.bind(this));
    }

    openModalWindow() {
        document.body.append(this.modalBackground());
    }

    closeModalWindow(event: Event) {
        let classes = (event.target as HTMLElement).classList;
        const modalWindow = document.querySelector('.modalBackground');
        if (modalWindow) {
            if (classes.contains('modalBackground') || 
            classes.contains('modal_close-button') || 
            classes.contains('cancel_button') ||
            classes.contains('modal_window')) {
                modalWindow.remove();
            }
        }
    }
}