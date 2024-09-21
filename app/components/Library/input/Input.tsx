import React, { ChangeEvent, forwardRef } from 'react';
import Text from '../text/Text';
import { InputSize, InputMode } from '@constants/input';
import { FontFamily, FontWeight, TextSize } from '@constants/text';
import { InputWrapper, StyledInput, LabelText, HelperText } from './InputStyles';
import { TextColor } from '@constants/colors';

type InputPropsCustom = {
  inputSize: InputSize;
  mode: InputMode;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & InputPropsCustom;

const Input = forwardRef<HTMLInputElement, InputProps>(({
  inputSize,
  mode,
  label,
  placeholder,
  helperText,
  value,
  onChange,
  fullWidth = true,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {label && (
        <LabelText
          $family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={mode === InputMode.DISABLED ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
        >
          {label}
        </LabelText>
      )}
      <StyledInput
        ref={ref}
        $size={inputSize}
        $mode={mode}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={mode === InputMode.DISABLED}
        $fullWidth={fullWidth}
        {...props}
      />
      {helperText && mode === InputMode.ERROR && (
        <HelperText
          $family={FontFamily.Poppins}
          size={TextSize.TEXT2}
          $weight={FontWeight.NORMAL}
          color={mode === InputMode.ERROR ? TextColor.NEGATIVE : TextColor.SECONDARY_TEXT}
        >
          {helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
});

export default Input;
