import './coloredTags.css';

interface IColoredTag {
    getColoredTag: (data: string) => HTMLElement
}

export default class ColoredTags implements IColoredTag{
    getColoredTag(data: string): HTMLElement {
        const tag = document.createElement('div');
        tag.classList.add('colored_tag');

        const tagText = document.createElement('p');
        tagText.classList.add('tag_text');
        tagText.textContent = data;
        tag.appendChild(tagText);

        return tag
    }
}