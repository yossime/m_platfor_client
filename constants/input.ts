// input.ts

import colors from './colors.json';

export enum InputSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum InputMode {
  NORMAL = 'normal',
  ACTIVE = 'active',
  DISABLED = 'disabled',
  POSITIVE = 'positive',
  ERROR = 'error',
  DEFAULT = "DEFAULT",
}

export const InputSizeConfig = {
  [InputSize.SMALL]: { height: '32px', padding: '6px 8px', fontSize: 'TEXT2' as const },
  [InputSize.MEDIUM]: { height: '40px', padding: '8px 12px', fontSize: 'TEXT1' as const },
  [InputSize.LARGE]: { height: '48px', padding: '12px 16px', fontSize: 'TEXT1' as const },
};

const semantic_colors = colors.semantic_colors;
const text_colors = colors.text_colors;

export type TextColorKey = keyof typeof text_colors;

export const getInputColors = (mode: InputMode) => {
  const colors = {
    background: 'transparent',
    text: text_colors.primary_text,
    border: semantic_colors.ui_border,
  };

  switch (mode) {
    case InputMode.ACTIVE:
      colors.border = semantic_colors.primary;
      break;
    case InputMode.DISABLED:
      colors.background = semantic_colors.disabled_background;
      colors.text = text_colors.disabled_text;
      colors.border = semantic_colors.disabled_background;
      break;
    case InputMode.POSITIVE:
      colors.border = semantic_colors.positive;
      break;
    case InputMode.ERROR:
      colors.border = semantic_colors.negative;
      break;
  }

  return colors;
};