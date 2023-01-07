import { IFlower } from '../data/IFlowers';
import flowers from '../data/data';
import { SelectedFilter } from '../types';

export default class Filtration {
    selectedFilter!: SelectedFilter; 
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

    filter(): IFlower[] {
        let filteredFlowers: IFlower[] = flowers ?? [];
        const {type, occasion, color, flower, price, size} = this.selectedFilter;
        filteredFlowers = type?.['Все'] || Object.keys(type).length === 0 ? filteredFlowers: this.typeFilter(filteredFlowers, type) ?? []; 
        filteredFlowers = Object.keys(occasion).length === 0 ? filteredFlowers: this.occasionFilter(filteredFlowers, occasion) ?? [];
        filteredFlowers = this.colorFilter(filteredFlowers, this.selectedFilter.color ?? '') ?? [];
        filteredFlowers = Object.keys(flower).length === 0 ? filteredFlowers: this.flowerFilter(filteredFlowers, flower) ?? [];
        // filteredFlowers = this.priceFilter(filteredFlowers, minPrice, maxPrice) ?? [];
        // filteredFlowers = this.priceFilter(filteredFlowers, minSize, maxSize) ?? [];
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

    // flowerFilter(currentFlowers: IFlower[], flower: string[]){
    //     if (flower.length<=0) return currentFlowers;
    //     return currentFlowers.filter(el=> {
    //         return el.flower.filter(e => flower.indexOf(e) > -1).length>0
    //     })
    // }

    // priceFilter(currentFlowers: IFlower[], min?: number, max?: number){
    //     return currentFlowers.filter(el=> el.price >= (min || 0) && el.price <= (max || 1000));
    // }

    // sizeFilter(currentFlowers: IFlower[], min?: number, max?: number){
    //     return currentFlowers.filter(el=> el.size >= (min || 0) && el.size <= (max || 150));
    // }

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
}