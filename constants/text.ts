import colors from './colors.json';

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

export enum TextFont {
    D1 = FontFamily.Poppins,
    D2 = FontFamily.Poppins,
    D3 = FontFamily.Poppins,
    H1 = FontFamily.Poppins,
    H2 = FontFamily.Poppins,
    H3 = FontFamily.Poppins,
    TEXT1 = FontFamily.Figtree,
    TEXT2 = FontFamily.Figtree,
}

export enum FontWeight {
    BLOB = 700,
    SEMIBLOB = 600,
    NORMAL = 500,
    LIGHT = 400,
}

export const TextColor = colors.text_colors;
