import React from 'react';
import styled from 'styled-components';
import Text from '../text/Text';
import { InputSize, InputMode, InputSizeConfig, getInputColors } from '@constants/input';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';

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
  max-width: 900px; 
`;

const StyledInput = styled.input<{ size: InputSize; mode: InputMode; fullWidth: boolean }>`
  ${props => {
    const { height, padding, fontSize } = InputSizeConfig[props.size];
    const { background, text, border } = getInputColors(props.mode);
    return `
      height: ${height};
      padding: ${padding};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
      border-radius: 4px;
      width: ${props.fullWidth ? '100%' : 'auto'};
      font-size: ${TextSize[fontSize]};
      font-family: ${FontFamily.Figtree};
      margin: 8px 0; 
    `;
  }}
`;

const LabelText = styled(Text)`
  margin-bottom: 8px;
`;

const HelperText = styled(Text)`
  margin-top: 8px; 
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
        size={size}
        mode={mode}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={mode === InputMode.DISABLED}
        fullWidth={fullWidth}
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


{/* <Input
  size={InputSize.MEDIUM}
  mode={InputMode.NORMAL}
  value={value}
  onChange={(newValue) => setValue(newValue)}
  label="Email Address"
  placeholder="example@example.com"
  helperText="Please enter a valid email address"
/> */}