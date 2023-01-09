import { IFlower } from '../data/IFlowers';
import flowers from '../data/data';
import { SelectedFilter, TagItem } from '../types';
import Tags from './tags';

interface IFiltration {
    onRemoveFilter: () => void,
    selectedFilter: SelectedFilter,
    count: number,
    changeType: (type: string) => void,
    changeOccasion: (occasion: string) => void,
    changeFlower: (flower: string) => void,

}

export default class Filtration implements IFiltration {
    onRemoveFilter: () => void;
    selectedFilter!: SelectedFilter;
    count = 0;
    constructor(onRemoveFilter: () => void) {
        this.onRemoveFilter = onRemoveFilter;
        this.removeFilters();
    }

    changeType(type: string) {
        if (this.selectedFilter.type[type]) {
            delete this.selectedFilter.type[type];
        } else {
            this.selectedFilter.type[type] = type;
        }
    }

    changeOccasion(occasion: string) {
        if (this.selectedFilter.occasion[occasion]) {
            delete this.selectedFilter.occasion[occasion];
        } else {
            this.selectedFilter.occasion[occasion] = occasion;
        }
    }

    changeFlower(flower: string) {
        if (this.selectedFilter.flower[flower]) {
            delete this.selectedFilter.flower[flower];
        } else {
            this.selectedFilter.flower[flower] = flower;
        }
    }

    changeColor(color: string) {
        this.selectedFilter.color = color;
    }

    changePrice(min: number, max: number) {
        this.selectedFilter.price.min = min;
        this.selectedFilter.price.max = max;
    }

    changeSize(min: number, max: number) {
        this.selectedFilter.size.min = min;
        this.selectedFilter.size.max = max;
    }

    filter(): IFlower[] {
        let filteredFlowers: IFlower[] = flowers ?? [];
        const { type, occasion, color, flower, price, size } = this.selectedFilter;
        filteredFlowers = type?.['Все'] || Object.keys(type).length === 0 ? filteredFlowers : this.typeFilter(filteredFlowers, type) ?? [];
        filteredFlowers = Object.keys(occasion).length === 0 ? filteredFlowers : this.occasionFilter(filteredFlowers, occasion) ?? [];
        filteredFlowers = this.colorFilter(filteredFlowers, color ?? '') ?? [];
        filteredFlowers = Object.keys(flower).length === 0 ? filteredFlowers : this.flowerFilter(filteredFlowers, flower) ?? [];
        filteredFlowers = this.priceFilter(filteredFlowers, price.min, price.max) ?? [];
        filteredFlowers = this.sizeFilter(filteredFlowers, size.min, size.max) ?? [];
        this.count = filteredFlowers.length;
        this.count = filteredFlowers.length;
        return filteredFlowers;
    }

    typeFilter(currentFlowers: IFlower[], type: { [type: string]: string }) {
        return currentFlowers.filter(el => type[el.category]);
    }

    occasionFilter(currentFlowers: IFlower[], type: { [type: string]: string }) {
        return currentFlowers.filter(el => {
            return el.occasions.find(occasion => type[occasion]);
        });
    }

    colorFilter(currentFlowers: IFlower[], color: string) {
        if (color === '') return currentFlowers;
        return currentFlowers.filter(flower => {
            return flower.color.filter(e => color === e).length > 0;
        })
    }

    flowerFilter(currentFlowers: IFlower[], type: { [type: string]: string }) {
        return currentFlowers.filter(el => {
            return el.flower.find(flower => type[flower]);
        });
    }

    priceFilter(currentFlowers: IFlower[], min?: number, max?: number) {
        return currentFlowers.filter(el => el.price >= (min || 0) && el.price <= (max || 160));
    }

    sizeFilter(currentFlowers: IFlower[], min?: number, max?: number) {
        return currentFlowers.filter(el => el.size >= (min || 20) && el.size <= (max || 80));
    }

    removeFilters() {
        this.selectedFilter = {
            type: {},
            occasion: {},
            color: '',
            flower: {},
            price: { min: 0, max: 160 },
            size: { min: 20, max: 80 }
        }
    }

    addCount(container: HTMLDivElement) {
        console.log(`count - ${this.count}`)
        const currentCount = document.createElement('p');
        if (this.count !== 0) {
            currentCount.textContent = `Найдено: ${this.count} товаров`;
        } else {
            currentCount.textContent = `К сожалению ничего не найдено`;
        }
        container?.appendChild(currentCount);
    }

    onRemove(item: string) {
        const keys = item.split('.');
        if (keys[0] === 'size') {
            this.selectedFilter.size = { min: 20, max: 80 };
        } else if (keys[0] === 'price') {
            this.selectedFilter.price = { min: 0, max: 160 };
        } else if (keys.length === 2) {
            switch (keys[0]) {
                case 'type': {
                    delete this.selectedFilter.type[keys[1]];
                    break;
                }
                case 'flower': {
                    delete this.selectedFilter.flower[keys[1]];
                    break;
                }
                case 'occasion': {
                    delete this.selectedFilter.occasion[keys[1]];
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            switch (keys[0]) {
                case 'color': {
                    delete this.selectedFilter.color;
                    break;
                }
                default: {
                    break;
                }
            }
        }

        this.onRemoveFilter();
    }

    generateTags(): HTMLDivElement[] {
        const tag = new Tags(this.onRemove.bind(this));
        return this.getSelectedFilterForTags().map((info) => tag.getTag(info));
    }

    getSelectedFilterForTags(): TagItem[] {

        const tagsFilter: TagItem[] = [];

        function getTagsArray(type: string, tags: { [key: string]: string }): TagItem[] {
            return Object.entries(tags)
                .map(([key, item]) => ({
                    key: `${type}.${key}`,
                    item: item
                }));
        }

        tagsFilter.push(...getTagsArray('type', this.selectedFilter.type));
        tagsFilter.push(...getTagsArray('occasion', this.selectedFilter.occasion));
        tagsFilter.push(...getTagsArray('flower', this.selectedFilter.flower));
        if (this.selectedFilter.color) {
            tagsFilter.push({ key: 'color', item: this.selectedFilter.color });
        }
        tagsFilter.push({ key: 'price', item: `$${this.selectedFilter.price.min} - $${this.selectedFilter.price.max}` });
        tagsFilter.push({ key: 'size', item: `${this.selectedFilter.size.min}см - ${this.selectedFilter.size.max}см` });

        return tagsFilter;
    }
}