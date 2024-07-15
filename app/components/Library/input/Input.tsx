import React from 'react';
import styled from 'styled-components';
import Text from '../text/Text';
import colors from '@constants/colors.json';
import { InputSize, InputMode, InputSizeConfig, getInputColors, TextColorKey } from '@constants/input';
import { TextSize, FontWeight, TextColor } from '@constants/text';

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

const InputWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const StyledInput = styled.input<{ size: InputSize; mode: InputMode; fullWidth: boolean }>`
  ${props => {
    const { height, padding, fontSize } = InputSizeConfig[props.size];
    const { background, text, border } = getInputColors(props.mode);
    return `
      height: ${height}px;
      padding: ${padding};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
      border-radius: 4px;
      width: ${props.fullWidth ? '100%' : 'auto'};
      font-size: ${colors.text_colors[fontSize as TextColorKey]};
    `;
  }}
`;

const Input: React.FC<InputProps> = ({
  size,
  mode,
  label,
  placeholder,
  helperText,
  value,
  onChange,
  fullWidth = true,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && (
        <Text
          size={'TEXT1'}
          weight={'NORMAL'}
          color={mode === InputMode.DISABLED ? 'disabled_text' : 'primary_text'}
        >
          {label}
        </Text>
      )}
      <StyledInput
        size={size}
        mode={mode}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={mode === InputMode.DISABLED}
        fullWidth={fullWidth}
      />
      {helperText && (
        <Text
          size={'TEXT1'}
          weight={'NORMAL'}
          color={mode === InputMode.ERROR ? 'negative' : 'secondary_text'}
        >
          {helperText}
        </Text>
      )}
    </InputWrapper>
  );
};

export default Input;