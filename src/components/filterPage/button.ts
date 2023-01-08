import "./button.css";

interface IButton {
    node: HTMLElement,
    getButton: (target: Node) => HTMLButtonElement
}

export default class Button implements IButton {
    node: HTMLButtonElement;
    constructor(buttonText: string, className?: string, id?: string) {
        this.node = document.createElement('button');
        this.node.classList.add('button');
        if (className) {
            this.node.classList.add(className);
        }
        if (id) {
            this.node.id = id;
        }
        this.node.textContent = buttonText;
    }
    getButton(target: Node): HTMLButtonElement {
        target.appendChild(this.node);
        return this.node;
    }
}