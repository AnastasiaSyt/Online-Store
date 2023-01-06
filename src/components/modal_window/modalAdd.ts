import ModalDraw from "./modalDraw";
import Button from "../filterPage/button";
import './modal.css';

export default class Modal {
    getModal() {
        this.modalBackground();
        // this.bindEvents();
        this.openModalWindow();
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
        const buttonConfirm = new Button('подтвердить', 'confirm_button').getButton(buttons);
        const buttonCancel = new Button('отменить', 'cancel_button').getButton(buttons);
        return buttons;
    }

    closeIcon() {
        const closeIcon = document.createElement('span');
        closeIcon.classList.add('modal_close-button');
        return closeIcon;
    }

    // bindEvents() {
    //     this.closeIcon.addEventListener('click', this.closeModalWindow);
    //     this.modalBackground.addEventListener('click', this.closeModalWindow);
    // }

    openModalWindow() {
        console.log(this.modalBackground);
        document.body.append(this.modalBackground());
    }

    // closeModalWindow(e) {
    //     let classes = e.target.classList;
    //     if(classes.contains('modalBackground') || classes.contains('modal_close-button')) {
    //         document.querySelector('.modalBackground').remove();
    //     }
    // }
}