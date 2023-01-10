import { TagItem } from '../types';
import './tags.css';

interface ITag {
    onRemove?: (data: string) => void,
    getTag: (data: TagItem) => HTMLDivElement,
    closeTag: (icon: HTMLImageElement, tag: HTMLDivElement) => void
}

export default class Tags implements ITag {
    onRemove?: (data: string) => void; 
    constructor(onRemove?: (data: string) => void) {
        this.onRemove = onRemove;
    }

    getTag(data: TagItem): HTMLDivElement {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.textContent = data.item;
        tag.setAttribute('tagKey', data.key);

        const closeIcon = document.createElement('img');
        closeIcon.src = '../../img/close.svg';
        closeIcon.classList.add('close_icon');
        tag.appendChild(closeIcon);

        this.closeTag(closeIcon, tag);

        return tag;
    }

    closeTag(icon: HTMLImageElement, tag: HTMLDivElement) {
        icon.addEventListener('click', () => {
            this.onRemove?.(tag.getAttribute('tagKey') ?? '');
        })
    }
}