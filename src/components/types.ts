export type TElementConfig = {
    tag: Tags,
    classes: string[],
    src?: string,
    label?: string,
    children?: TElementConfig[],
    id?: string,
    type?: string,
    attribute?: [string, string],
    placeholder?: string,
    pattern?: string,
    title?: string
}

export enum Tags {
    IMG = 'img',
    DIV = 'div',
    P = 'p',
    INPUT = 'input',
    LABEL = 'label',
    FORM = 'form'
}

export const enum PageIDs {
    FilterPage = 'filterPage',
    ErrorPage = 'errorPage',
    CardProductPage = 'cardProductPage',
    CartPage = 'basketPage'
  }