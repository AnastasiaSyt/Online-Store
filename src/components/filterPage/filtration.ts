import { IFlower } from '../data/IFlowers';
import flowers from '../data/data';
import { SelectedFilter } from '../types';
import Tags from './tags';

export default class Filtration {
    selectedFilter!: SelectedFilter;
    count = 0;
    constructor() {
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
        const {type, occasion, color, flower, price, size} = this.selectedFilter;
        filteredFlowers = type?.['Все'] || Object.keys(type).length === 0 ? filteredFlowers: this.typeFilter(filteredFlowers, type) ?? []; 
        filteredFlowers = Object.keys(occasion).length === 0 ? filteredFlowers: this.occasionFilter(filteredFlowers, occasion) ?? [];
        filteredFlowers = this.colorFilter(filteredFlowers, color ?? '') ?? [];
        filteredFlowers = Object.keys(flower).length === 0 ? filteredFlowers: this.flowerFilter(filteredFlowers, flower) ?? [];
        filteredFlowers = this.priceFilter(filteredFlowers, price.min, price.max) ?? [];
        filteredFlowers = this.sizeFilter(filteredFlowers, size.min, size.max) ?? [];
        this.count = filteredFlowers.length;
        return filteredFlowers;
    }

    typeFilter(currentFlowers: IFlower[], type: {[type:string]: string}) {
        return currentFlowers.filter(el => type[el.category]);
    }

    occasionFilter(currentFlowers: IFlower[], type: {[type:string]: string}) {
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

    flowerFilter(currentFlowers: IFlower[], type: {[type:string]: string}) {
        return currentFlowers.filter(el => {
            return el.flower.find(flower => type[flower]);
        });
    }

    priceFilter(currentFlowers: IFlower[], min?: number, max?: number){
        return currentFlowers.filter(el=> el.price >= (min || 0) && el.price <= (max || 1000));
    }

    sizeFilter(currentFlowers: IFlower[], min?: number, max?: number){
        return currentFlowers.filter(el=> el.size >= (min || 0) && el.size <= (max || 150));
    }

    removeFilters() {
        this.selectedFilter = {
            type: {},
            occasion: {},
            color: '',
            flower: {},
            price: {min:0, max: 100},
            size: {min: 0, max: 100}
        }
    }

    generateTags(): HTMLDivElement[] {
        const tag = new Tags();
        return this.getSelectedFilterForTags().map((info) => tag.getTag(info));
    }

    getSelectedFilterForTags(): string[] {
        const result: string[] = [];

        result.push(
            ...Object.values(this.selectedFilter.type)
                .map((x) => `${x} (${this.count})`)
        );

        result.push(
            ...Object.values(this.selectedFilter.occasion)
                .map((x) => `${x} (${this.count})`)
        );

        if (this.selectedFilter.color) {
            result.push(
                ...this.selectedFilter.color
            );
        }

        result.push(
            ...Object.values(this.selectedFilter.flower)
                .map((x) => `${x} (${this.count})`)
        );

        const price = this.selectedFilter.price;
        result.push(
           `$${price.min} - $${price.max} (${this.count})`
        ) 

        const size = this.selectedFilter.size;
        result.push(
           `${size.min}см - ${size.max}см (${this.count})`
        )
        
        return result;
    }
}