import { BackgroundColor, BorderColor, IconColor, SemanticColors, TextColor } from './colors';

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
  DISABLED = 'disabled',
}

export const ButtonSizeConfig = {
  [ButtonSize.XS]: { height: '26px', padding: '6px 8px', fontSize: 'TEXT2' },
  [ButtonSize.SMALL]: { height: '32px', padding: '6px 8px', fontSize: 'TEXT2' },
  [ButtonSize.MEDIUM]: { height: '40px', padding: '6px 16px', fontSize: 'TEXT1' },
  [ButtonSize.LARGE]: { height: '48px', padding: '6px 24px', fontSize: 'TEXT1' },
};


interface colors  {
  background: BackgroundColor | SemanticColors,
  text: TextColor | SemanticColors,
  border: BorderColor | SemanticColors,
};

export const getButtonColors = (type: ButtonType, variant: ButtonVariant, mode: ButtonMode): colors => {
  const colors: colors = {
    background: SemanticColors.PRIMARY,
    text: TextColor.TEXT_ON_PRIMARY,
    border: SemanticColors.TRANSPARENT,
  };

  switch (type) {
    case ButtonType.PRIMARY:
      if (variant === ButtonVariant.PRIMARY) {
        colors.text = TextColor.TEXT_ON_PRIMARY;
        if (mode === ButtonMode.SELECTED) {
          colors.background = SemanticColors.PRIMARY_HOVER;
        } else if (mode === ButtonMode.DISABLED) {
          colors.background = BackgroundColor.DISABLED_BACKGROUND;
          colors.text = TextColor.DISABLED_TEXT;
        }
      } else if (variant === ButtonVariant.SECONDARY) {
        colors.text = TextColor.PRIMARY_TEXT;
        colors.border = BorderColor.UI_BORDER;
        colors.background = SemanticColors.TRANSPARENT;
        if (mode === ButtonMode.SELECTED) {
          colors.border = SemanticColors.PRIMARY;
          colors.background = SemanticColors.PRIMARY_SELECTED;
        } else if (mode === ButtonMode.DISABLED) {
          colors.background = BackgroundColor.DISABLED_BACKGROUND;
          colors.text = TextColor.DISABLED_TEXT;
          colors.border = BorderColor.UI_BORDER;
        }
      } else if (variant === ButtonVariant.TERTIARY) {
        colors.text = TextColor.PRIMARY_TEXT;
        colors.border = SemanticColors.TRANSPARENT;
        colors.background = SemanticColors.TRANSPARENT;
        if (mode === ButtonMode.SELECTED) {
          colors.border = SemanticColors.PRIMARY;
          colors.background = SemanticColors.PRIMARY_SELECTED;
        } else if (mode === ButtonMode.DISABLED) {
          colors.background = BackgroundColor.DISABLED_BACKGROUND;
          colors.text = TextColor.DISABLED_TEXT;
          colors.border = SemanticColors.DISABLED_BACKGROUND;
        }
      }
      break;

    case ButtonType.POSITIVE:
      colors.background = SemanticColors.POSITIVE;
      colors.text = TextColor.TEXT_ON_PRIMARY;
      if (mode === ButtonMode.SELECTED) {
        colors.background = SemanticColors.POSITIVE_HOVER;
      } else if (mode === ButtonMode.DISABLED) {
        colors.background = SemanticColors.POSITIVE_DISABLED;
        colors.text = TextColor.DISABLED_TEXT;
      }
      break;

    case ButtonType.NEGATIVE:
      colors.background = SemanticColors.NEGATIVE;
      colors.text = TextColor.TEXT_ON_PRIMARY;
      if (mode === ButtonMode.SELECTED) {
        colors.background = SemanticColors.NEGATIVE_HOVER;
      } else if (mode === ButtonMode.DISABLED) {
        colors.background = SemanticColors.NEGATIVE_DISABLED;
        colors.text = TextColor.DISABLED_TEXT;
      }
      break;
  }

  return colors;
};

export const getButtonColorsHover = (type: ButtonType, variant: ButtonVariant, mode: ButtonMode): BackgroundColor | SemanticColors => {
  switch (type) {
    case ButtonType.PRIMARY:
      if (variant === ButtonVariant.PRIMARY) {
       return SemanticColors.PRIMARY_HOVER;
      } else if (variant === ButtonVariant.SECONDARY) {
        return BackgroundColor.PRIMARY_BACKGROUND_HOVER;
      } else if (variant === ButtonVariant.TERTIARY) {
        return BackgroundColor.PRIMARY_BACKGROUND_HOVER;
      }

      break;

    case ButtonType.POSITIVE:
      return SemanticColors.POSITIVE_HOVER;
      break;

    case ButtonType.NEGATIVE:
      return SemanticColors.NEGATIVE_HOVER;
      break;
  }



  return BackgroundColor.PRIMARY_BACKGROUND;
};