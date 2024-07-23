import styled from 'styled-components';
import Text from '../text/Text';
import { InputSize, InputMode, InputSizeConfig, getInputColors } from '@constants/input';
import { FontFamily, TextSize } from '@constants/text';

export const InputWrapper = styled.div<{ $fullWidth: boolean }>`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

export const StyledInput = styled.input<{ $size: InputSize; $mode: InputMode; $fullWidth: boolean }>`
  ${props => {
    const { height, padding, fontSize } = InputSizeConfig[props.$size];
    const { background, text, border } = getInputColors(props.$mode);
    return `
      height: ${height};
      padding: ${padding};
      background-color: ${background};
      color: ${text};
      border: 1px solid ${border};
      border-radius: 4px;
      width: ${props.$fullWidth ? '100%' : 'auto'};
      font-size: ${TextSize[fontSize]};
      font-family: ${FontFamily.Figtree};
      margin: 8px 0; 
      transition: all 0.3s ease;

      &:hover {
        border-color: #323338;
      }

      &:focus {
        border-color: #0073EA;
        outline: none;
      }
    `;
  }}
`;

export const LabelText = styled(Text)`
  margin-bottom: 8px;
`;

export const HelperText = styled(Text)`
  margin-top: 8px; 
`;