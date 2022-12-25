import './coloredTags.css';

interface IColoredTag {
    getColoredTag: (data: string) => HTMLElement
}

export default class ColoredTags implements IColoredTag{
    getColoredTag(data: string): HTMLElement {
        const tag = document.createElement('div');
        tag.classList.add('colored_tag');
        tag.textContent = data;
        return tag
    }
}