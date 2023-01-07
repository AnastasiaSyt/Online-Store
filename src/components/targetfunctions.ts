import { IFlower } from "./data/IFlowers";
import flowers from "./data/data";

export default function filterFlowers(type?: string, occasion?: string[], color?: string, flower?: string[],minPrice?: number, maxPrice?: number, minSize?: number, maxSize?: number): IFlower[] {
  let filteredFlowers: IFlower[] = flowers ?? [];
  filteredFlowers = typeFilter(filteredFlowers, type ?? 'все');
  filteredFlowers = occasionFilter(filteredFlowers, occasion ?? []) ?? [];
  filteredFlowers = colorFilter(filteredFlowers, color ?? '') ?? [];
  filteredFlowers = flowerFilter(filteredFlowers, flower ?? []) ?? [];
  filteredFlowers = priceFilter(filteredFlowers, minPrice, maxPrice) ?? [];
  filteredFlowers = sizeFilter(filteredFlowers, minSize, maxSize) ?? [];
  return filteredFlowers;
}

function typeFilter(currentFlowers: IFlower[], type: string){
  if(type.indexOf('все') >= 0) return currentFlowers;
  return currentFlowers.filter(el=> el.category === type)
}

function occasionFilter(currentFlowers: IFlower[], occasion: string[]){
  if (occasion.length<=0) return currentFlowers;
  return currentFlowers.filter(el=> {
      return el.occasions.filter(e => occasion.indexOf(e) > -1).length>0
  })
}

function colorFilter(currentFlowers: IFlower[], color: string){
  if (color === '') return currentFlowers;
  return currentFlowers.filter(flower => {
      return flower.color.filter(e => color === e).length>0
  })
}

function flowerFilter(currentFlowers: IFlower[], flower: string[]){
  if (flower.length<=0) return currentFlowers;
  return currentFlowers.filter(el=> {
      return el.flower.filter(e => flower.indexOf(e) > -1).length>0
  })
}

function priceFilter(currentFlowers: IFlower[], min?: number, max?: number){
  return currentFlowers.filter(el=> el.price >= (min || 0) && el.price <= (max || 1000));
}

function sizeFilter(currentFlowers: IFlower[], min?: number, max?: number){
  return currentFlowers.filter(el=> el.size >= (min || 0) && el.size <= (max || 150));
}
function removeFilters(){
  return flowers;
}