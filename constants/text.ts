// textConstants.ts

import { overlay } from "three/examples/jsm/nodes/Nodes.js";

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

export enum TextColor {
    POSITIVE = '#147B6F',
    NEGATIVE = '#FF474A',
    PRIMARY_TEXT = '#323338',
    SECONDARY_TEXT = '#676879',
    TEXT_ON_INVERTED = '#FFFFFF',
    TEXT_ON_PRIMARY = '#FFFFFF',
    DISABLED_TEXT = '#676879',
    PLACEHOLDER = '#676879',
    LINK = '#1877F2',
    BLACK = '#000000',
}

export interface TextStyleProps {
    size: TextSize;
    family?: FontFamily;
    weight?: FontWeight;
    color?: TextColor;
    cursorStyle?: 'default' | 'pointer' | 'text';
}

export const createTextStyle = ({
    size,
    family,
    weight,
    color,
    cursorStyle
}: TextStyleProps) => ({
    fontSize: size,
    fontFamily: family,
    fontWeight: weight,
    color: color,
    cursor: cursorStyle
});