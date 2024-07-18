import colors from './colors.json';

export enum ButtonType {
  PRIMARY = 'primary',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum ButtonSize {
  XS = 'xs',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum ButtonMode {
  NORMAL = 'normal',
  SELECTED = 'selected',
  HOVER = 'hover',
  DISABLED = 'disabled',
}

export const ButtonSizeConfig = {
  [ButtonSize.XS]: { height: '26px', padding: '6px 8px', fontSize: 'TEXT2' },
  [ButtonSize.SMALL]: { height: '32px', padding: '6px 8px', fontSize: 'TEXT2' },
  [ButtonSize.MEDIUM]: { height: '40px', padding: '6px 16px', fontSize: 'TEXT1' },
  [ButtonSize.LARGE]: { height: '48px', padding: '6px 24px', fontSize: 'TEXT1' },
};

const semantic_colors = colors.semantic_colors;
const text_colors = colors.text_colors;
const icon_colors = colors.icon_colors;

export const getButtonColors = (type: ButtonType, variant: ButtonVariant, mode: ButtonMode) => {
  const colors = {
    background: 'transparent',
    text: text_colors.primary_text,
    border: 'transparent',
  };

  // Create a mapping for ButtonType to text_colors keys
  const textColorMapping: Record<ButtonType, keyof typeof text_colors> = {
    [ButtonType.PRIMARY]: 'primary_text',
    [ButtonType.NEGATIVE]: 'negative',
    [ButtonType.POSITIVE]: 'positive',
  };


  if (variant === ButtonVariant.PRIMARY) {
    colors.background = semantic_colors[type];
    colors.text = text_colors.text_on_primary;

    if (mode === ButtonMode.HOVER) {
      colors.background = semantic_colors[`${type}_hover`];
    } else if (mode === ButtonMode.SELECTED) {
      colors.background = semantic_colors[`${type}_selected`];
    } else if (mode === ButtonMode.DISABLED) {
      colors.background = semantic_colors.disabled_background;
      colors.text = text_colors.disabled_text;
    }
  } else if (variant === ButtonVariant.SECONDARY) {
    colors.border = semantic_colors[type];
    colors.text = text_colors[textColorMapping[type]];

    if (mode === ButtonMode.HOVER || mode === ButtonMode.SELECTED) {
      colors.background = semantic_colors[`${type}_selected`];
    } else if (mode === ButtonMode.DISABLED) {
      colors.border = semantic_colors.disabled_background;
      colors.text = text_colors.disabled_text;
    }
  } else if (variant === ButtonVariant.TERTIARY) {
    colors.text = text_colors[textColorMapping[type]];

    if (mode === ButtonMode.HOVER || mode === ButtonMode.SELECTED) {
      colors.background = semantic_colors[`${type}_selected`];
    } else if (mode === ButtonMode.DISABLED) {
      colors.text = text_colors.disabled_text;
    }
  }

  return colors;
};