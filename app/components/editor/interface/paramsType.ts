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
    materialParams?: MaterialParams;
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
    materialParams?: MaterialParams;
}

export interface IProduct extends IThreeDModel {
    title?: IText;
    description?: IText;
    SKU?: IText;
    buttons?: {
        price?: IButton;
        addToCart?: IButton;
        quickView?: IButton;
        buyNow?: IButton;
    };
    src?: string;
}

export interface IText {
    text: string;
    font?: FontFamily;
    color?: string;
    scale?: [number, number, number];
}


export interface IButton extends IThreeDModel {
    text: IText;
    material: MaterialParams;
}

export interface IThreeDModelStyle {
    textStyle?: ITextStyle;
    buttonStyle?: ButtonStyle;
    imageStyle?: ImageStyle;
}

export interface MaterialParams {
    color?: string | number;
    map?: string;
    alphaMap?: string;
    opacity?: number;
    video?: string;
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
    BRIGHT = "default",
    BLUE = 'Blue'
}


export enum TextStyle {
    DARK = "dark",
    BRIGHT = "default",
    BLUE = 'Blue'
}


export enum Skybox {
    DEFAULT = '#f2f2f8',
    DARK = '#323338',
}

export enum ImageStyle {
    FILL = 'fill',
    CROP = 'crop',
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