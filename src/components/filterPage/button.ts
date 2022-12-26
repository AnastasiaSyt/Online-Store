import "./button.css";

interface IButton {
    node: HTMLElement,
    getButton: (target: Node) => void
}

export default class Button implements IButton {
    node: HTMLElement;
    constructor(buttonText: string, className?: string) {
        this.node = document.createElement('button');
        this.node.classList.add('button');
        if (className) {
            this.node.classList.add(className);
        }
        this.node.textContent = buttonText;
    }
    getButton(target: Node) {
        target.appendChild(this.node);
    }
}