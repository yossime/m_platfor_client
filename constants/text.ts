
import { TextColor } from "./colors";

export enum TextSize {
    D1 = '57px',
    D2 = '45px',
    D3 = '36px',
    H1 = '32px',
    H2 = '24px',
    H3 = '18px',
    TEXT1 = '16px',
    TEXT2 = '14px',
}

export enum TextLine {
    D1 = '64px',
    D2 = '52px',
    D3 = '44px',
    H1 = '40px',
    H2 = '30px',
    H3 = '24px',
    TEXT1 = '22px',
    TEXT2 = '20px',
}

export enum FontFamily {
    Poppins = 'Poppins, sans-serif',
    Figtree = 'Figtree, sans-serif',
}

export enum FontWeight {
    BOLD = 700,
    SEMI_BOLD = 600,
    NORMAL = 500,
    LIGHT = 400,
}



export interface TextStyleProps {
    size?: TextSize;
    $family?: FontFamily;
    $weight?: FontWeight;
    color?: TextColor;
    $cursorStyle?: 'default' | 'pointer' | 'text';
}

