import React from 'react';
import Text from '../text/Text';
import { InputSize, InputMode } from '@constants/input';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';
import { InputWrapper, StyledInput, LabelText, HelperText } from './InputStyles';

export interface InputProps {
  size: InputSize;
  mode: InputMode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  size,
  mode,
  label,
  placeholder,
  helperText,
  value,
  onChange,
  fullWidth = true,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {label && (
        <LabelText
          family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          weight={FontWeight.NORMAL}
          color={mode === InputMode.DISABLED ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
        >
          {label}
        </LabelText>
      )}
      <StyledInput
        $size={size}
        $mode={mode}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={mode === InputMode.DISABLED}
        $fullWidth={fullWidth}
        {...props}
      />
      {helperText && (
        <HelperText
          family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          weight={FontWeight.NORMAL}
          color={mode === InputMode.ERROR ? TextColor.NEGATIVE : TextColor.SECONDARY_TEXT}
        >
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;