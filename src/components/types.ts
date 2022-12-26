export type TElementConfig = {
    tag: Tags,
    classes: string[],
    src?: string,
    label?: string,
    children?: TElementConfig[],
    id?: string
}

export enum Tags {
    IMG = 'img',
    DIV = 'div',
    P = 'p',
}