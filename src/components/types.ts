export type TElementConfig = {
    tag: Tags,
    classes: string[],
    src?: string,
    label?: string,
    children?: TElementConfig[],
    id?: string
}

export type SelectedFilter = {
    type : {[type:string]: string},
    occasion: {[occasion:string]: string},
    color?: string,
    flower: {},
    price: {min: number, max: number},
    size: {min: number, max: number}
}

export enum Tags {
    IMG = 'img',
    DIV = 'div',
    P = 'p',
}

export const enum PageIDs {
    FilterPage = 'filterPage',
    ErrorPage = 'errorPage',
    CardProductPage = 'cardProductPage',
    CartPage = 'basketPage'
  }