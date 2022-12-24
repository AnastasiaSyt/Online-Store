import './tags.css';

interface ITag {
    getTag: (data: string) => HTMLElement
}

export default class Tags implements ITag{
    getTag(data: string): HTMLElement {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.textContent = data;

        const closeIcon = document.createElement('img');
        closeIcon.src = '../../img/close.svg';
        closeIcon.classList.add('close_icon');
        tag.appendChild(closeIcon);

        return tag
    }
}