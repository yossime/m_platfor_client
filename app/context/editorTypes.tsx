import { FontFamily } from "@constants/text";

export interface Params {
    architecture: string;
    font?: FontFamily;
    sky?: Skybox;
    materialParams: MaterialParams;
    maxSlot: number;
    boards: Board[];
}

export interface ThreeDModel {
    type: string | null;
    materialParams?: MaterialParams ;
}

export interface Board extends ThreeDModel {
    content?: Board[];
    style?: ThreeDModelStyle;
}

export interface HeaderBoard extends Board {
    title?: Text;
    subTitle?: Text;
    buttonTitle?: Text;
    image?: ArrayBuffer;
}

export interface ImageBoard extends Board {
    title?: Text;
    subTitle?: Text;
    buttonTitle?: Text;
    image?: ArrayBuffer;
}

export interface ProductBoard extends Board {
    title?: Text;
    displays: Display[];
    displayType?: DisplayType;
    maxDisplay?:number;
}

export interface Display extends ThreeDModel {
    title?: Text;
    products: Product[];
}

export interface Product extends ThreeDModel {
    title?: Text;
    description?: Text;
    SKU?: Text;
    price?: string;
    buttons?: {
        addToCart?: string;
        quickView?: string;
        buyNow?: string;
    };
}

export interface Text {
    text: string;
    font?: FontFamily;
    color?: string;
    scale?: [number, number, number];
}

export interface ThreeDModelStyle {
    textStyle?: TextStyle;
    buttonStyle?: ButtonStyle;
    imageStyle?: ImageStyle;
}

export interface TextStyle {
    font?: FontFamily;
    color?: string;
    scale?: BaseSize;
}

export enum BaseSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}

export enum ButtonStyle {
    DARK = "dark",
    DEFAULT = "default",
}

export enum DisplayType{
    STANDS = 'stands',
    DUO = 'duo',
}

export enum Skybox {
    DEFAULT = '#f2f2f8',
    DARK = '#323338',
}

export enum ImageStyle {
    FIT = 'fit',
    CROP = 'crop',
}

export interface MaterialParams {
    color?: string | number;
    map?: string;
    alphaMap?: string;
    opacity?: number;
}

export interface BoardContent {
    media?: Media;
    products?: Product[];
}

export interface Media {
    images?: string[];
    videos?: string[];
}