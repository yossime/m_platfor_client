// textConstants.ts

import { overlay } from "three/examples/jsm/nodes/Nodes.js";
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

