export enum FontFamily {
    Poppins = 'Poppins, sans-serif',
    Figtree = 'Figtree, sans-serif',
}



export interface Params {
    architecture: string;
    font?: FontFamily;
    sky?: Skybox;
    materialParams: MaterialParams;
    maxSlot: number;
    boards: IBoard[];
}

export interface ThreeDModel {
    type: string | null;
    materialParams?: MaterialParams | null;
}

export interface IBoard extends ThreeDModel {
    style?: ThreeDModelStyle;
}

export interface HeaderBoard extends IBoard {
    title?: IText;
    subTitle?: IText;
    button?: IButton;
    image?: string;
}

export interface ImageBoard extends IBoard {
    title?: IText;
    subTitle?: IText;
    buttonTitle?: IText;
    image?: string;
}

export interface ProductBoard extends IBoard {
    title?: IText;
    // product?: IProduct[];
    display: Display[];
}

export interface Display extends ThreeDModel {
    title?: IText;
    product?: IProduct[];
}

export interface IProduct extends ThreeDModel {
    title?: IText;
    description?: IText;
    SKU?: IText;
    price: string;
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



























// export interface Params {
//     architecture: string;
//     font?: FontFamily;
//     sky?: Skyboxs;
//     materialParams: MaterialParams;
//     maxSlot: number;
//     boards: Board[];
// }

// export interface ThreeDModel {

// }

// export interface Board extends ThreeDModel {
//     type: string | null;
//     materialParams?: MaterialParams;
//     content?: BoardContent;
// }

// export interface HeaderBoard extends Board {
//     title?: IText;
//     subTitle?: IText;
//     buttonTitle?: IText;
//     image?: string;
//     style?: ThreeDModelStyle;
// }

// export interface ImageBoard extends Board {
//     title: IText;
//     subTitle?: IText;
//     buttonTitle?: IText;
//     image?: string;
//     style?: ThreeDModelStyle;
// }

// export interface IText {
//     text: string;
//     font?: FontFamily;
//     color?: string;
//     scale?: [number, number, number];
// }

// export interface ThreeDModelStyle {
//     textStyle?: TextStyle;
//     buttonStyle?: ButtonStyle;
//     imageStyle?: ImageStyle;
// }

// export interface TextStyle {
//     font?: FontFamily;
//     color?: string;
//     scale?: BaseSizes;
// }

// export enum BaseSizes {
//     SMALL = "small",
//     MEDIUM = "medium",
//     LARGE = "large"
// }

// export enum ButtonStyle {
//     Darkbutton = ' ',
//     Defaultbutton = "default",
// }

// export enum Skyboxs {
//     Defaultsky = '#f2f2f8',
//     Dark = '#323338',
// }

// export enum ImageStyle {
//     fit = '',
//     Crop = '',
// }


// export interface Materials {
//     [key: string]: MaterialParams;
// }

// export interface BoardContent {
//     media?: Media;
//     products?: Product[];
    
// }

// export interface Product {
// }

// export interface Podium extends Product {
//     type: string | null;
//     materialParams: MaterialParams | null;
//     title: string;
//     buttonsText: { addToCart?: string; quick_view?: string; buyNow?: string }
//     price: string;
//     Button_Add_to_Cart?: string;
// }

// export interface MaterialParams {
//     color?: string | number;
//     map?: string;
//     alphaMap?: string;
//     opacity?: number;
// }

// export interface Media {
//     img?: string[];
//     video?: string[];
// }



















// export interface Params {
//     architecture: string;
//     materialParams: MaterialParams;
//     maxBands: number
//     boards: Board[];
// }

// export interface Board {
//     type: string | null;
//     materialParams: MaterialParams | null;
//     content?: BoardContent;
// }

// export interface BoardContent {
//     media?: Media;
//     headar?: TextParams;
//     products?: Product[];
// }

// export interface Product {
// }

// export interface Podium extends Product {
//     type: string | null;
//     materialParams: MaterialParams | null;
//     title: string;
//     buttonsText: { addToCart?: string; quick_view?: string; buyNow?: string }
//     price: string;
//     Button_Add_to_Cart?: string;
// }

// export interface MaterialParams {
//     color?: string | number;
//     map?: string;
//     alphaMap?: string;
//     opacity?: number;
// }

// export interface Media {
//     img?: string[];
//     video?: string[];
// }


// export interface TextParams {
//     text: string;
//     font?: string;
//     fontSize?: number;
//     align?: string;
//     color?: string | number;
// }