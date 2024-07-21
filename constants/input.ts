import { BackgroundColor, BorderColor, SemanticColors } from './colors';
import { TextColor } from './text';

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

interface colors  {
  background: BackgroundColor | SemanticColors,
  text: TextColor | SemanticColors,
  border: BorderColor | SemanticColors,
};

export const getInputColors = (mode: InputMode): colors => {
  const colors: colors = {
    background: BackgroundColor.PRIMARY_BACKGROUND,
    text: TextColor.PRIMARY_TEXT,
    border: BorderColor.UI_BORDER,
  };

  switch (mode) {
    case InputMode.ACTIVE:
      colors.border = SemanticColors.PRIMARY;
      colors.text = TextColor.PRIMARY_TEXT;
      break;
    case InputMode.DISABLED:
      colors.background = BackgroundColor.DISABLED_BACKGROUND;
      colors.text = TextColor.DISABLED_TEXT;
      colors.border = SemanticColors.TRANSPARENT;
      break;
    case InputMode.POSITIVE:
      colors.border = SemanticColors.POSITIVE;
      break;
    case InputMode.ERROR:
      colors.border = SemanticColors.NEGATIVE;
      break;
  }

  return colors;
};