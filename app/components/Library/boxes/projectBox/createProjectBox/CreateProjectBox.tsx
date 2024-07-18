// CreateProjectBox.tsx
import React from 'react';
import Text from '@components/Library/text/Text';
import Icon from '@components/Library/icon/Icon';
import { CreateProjectBoxContainer, CreateProjectText } from './CreateProjectBoxStyles';
import { IconColor, IconName, IconSize } from '@constants/icon';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';

interface CreateProjectBoxProps {
  onClick: () => void;
  text: string;
  clicked?: boolean;
  disabled?: boolean;
}

const CreateProjectBox: React.FC<CreateProjectBoxProps> = ({ onClick , text , disabled = false , clicked = false}) => {
  return (
    <CreateProjectBoxContainer clicked={clicked} onClick={onClick} disabled={disabled}>
      
      <Icon name={IconName.PLUSCIRCLE}/>
      <CreateProjectText>
        <Text size={TextSize.TEXT1}>{text}</Text>
      </CreateProjectText>
    </CreateProjectBoxContainer>
  );
};

export default CreateProjectBox;