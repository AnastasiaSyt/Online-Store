import { IFlower } from '../data/IFlowers';
import flowers from '../data/data';
import { SelectedFilter } from '../types';

export default class Filtration {
    selectedFilter!: SelectedFilter; 
    constructor() {
        this.removeFilters();
    }

    changeType(type: string) {
        console.log(`тайп ${type}`);
        if (this.selectedFilter.type[type]) {
            delete this.selectedFilter.type[type];
        } else {
            this.selectedFilter.type[type] = type;
        }
        console.log(`чендж тайп ${this.selectedFilter.type[type]}`);
    }

    // change(type: string) {
    //     console.log(`тайп ${type}`);
    //     if (this.selectedFilter.type[type]) {
    //         delete this.selectedFilter.type[type];
    //     } else {
    //         this.selectedFilter.type[type] = type;
    //     }
    //     console.log(`чендж тайп ${this.selectedFilter.type[type]}`);
    // }

    changeColor(color: string) {
        this.selectedFilter.color = color;;
    }

    filter(): IFlower[] {
        let filteredFlowers: IFlower[] = flowers ?? [];
        
        //filteredFlowers = this.typeFilter(filteredFlowers, this.selectedFilter.type['type']) ?? [];
        // filteredFlowers = this.occasionFilter(filteredFlowers, occasion ?? []) ?? [];
        filteredFlowers = this.colorFilter(filteredFlowers, this.selectedFilter.color ?? '') ?? [];
        // filteredFlowers = this.flowerFilter(filteredFlowers, flower ?? []) ?? [];
        // filteredFlowers = this.priceFilter(filteredFlowers, minPrice, maxPrice) ?? [];
        // filteredFlowers = this.priceFilter(filteredFlowers, minSize, maxSize) ?? [];
        return filteredFlowers;
    }

    typeFilter(currentFlowers: IFlower[], type: string) {
        if(type.indexOf('все') >= 0) return currentFlowers;
        return currentFlowers.filter(el => el.category === type);
    }

    // occasionFilter(currentFlowers: IFlower[], occasion: string[]){
    //     if (occasion.length<=0) return currentFlowers;
    //     return currentFlowers.filter(el=> {
    //         return el.occasions.filter(e => occasion.indexOf(e) > -1).length>0
    //     })
    // }

    colorFilter(currentFlowers: IFlower[], color: string) {
        if (color === '') return currentFlowers;
        return currentFlowers.filter(flower => {
            return flower.color.filter(e => color === e).length > 0;
        })
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