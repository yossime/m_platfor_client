export enum FontFamily {
    Poppins = 'Poppins, sans-serif',
    Figtree = 'Figtree, sans-serif',
}



export interface IParams {
    architecture: string;
    font?: FontFamily;
    sky?: Skybox;
    materialParams: MaterialParams;
    maxSlot: number;
    boards: IBoard[];
}

export interface IThreeDModel {
    type: string | null;
    materialParams?: MaterialParams | null;
}

export interface IBoard extends IThreeDModel {
    style?: IThreeDModelStyle;
    name: string | null;
}

export interface IHeaderBoard extends IBoard {
    title?: IText;
    subTitle?: IText;
    buttonTitle?: IText;
    button?: IButton;
    image?: ArrayBuffer;
}

export interface IImageBoard extends IBoard {
    title?: IText;
    subTitle?: IText;
    buttonTitle?: IText;
    button?: IButton;
    image?: ArrayBuffer;
}

export interface IProductBoard extends IBoard {
    title?: IText;
    displays: IDisplay[];
    displayType?: DisplayType;
    maxDisplay?:number;
}

export interface IDisplay extends IThreeDModel {
    title?: IText;
    products?: IProduct[];
}

export interface IProduct extends IThreeDModel {
    title?: IText;
    description?: IText;
    SKU?: IText;
    price: IText;
    buttons: {
        addToCart?: string;
        quickView?: string;
        buyNow?: string;
    };
}

export interface IText {
    text: string;
    font?: FontFamily;
    color?: string;
    scale?: [number, number, number];
}


export interface IButton {
    text: IText;
    material: MaterialParams;
}

export interface IThreeDModelStyle {
    textStyle?: ITextStyle;
    buttonStyle?: ButtonStyle;
    imageStyle?: ImageStyle;
}

export interface ITextStyle {
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
    products?: IProduct[];
}

export interface Media {
    images?: string[];
    videos?: string[];
}

export enum DisplayType{
    STANDS = 'stands',
    DUO = 'duo',
}