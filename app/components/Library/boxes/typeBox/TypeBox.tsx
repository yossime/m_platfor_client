import React from 'react';
import { TypeContainer, TypeContent } from './TypeBoxStyles';
import { TextSize , TextColor, FontFamily, FontWeight } from '@constants/text';
import  Text from '@components/Library/text/Text';

interface TypeProps {
  title: string;
  clicked: boolean;
  disabled?: boolean;
  onClick: (type: string) => void;
}

const TypeBox: React.FC<TypeProps> = ({ title, clicked, onClick, disabled = false}) => {
  return (
    <TypeContainer clicked={clicked} disabled={disabled} onClick={() => onClick(title)}>
      <TypeContent>
      <Text size = {TextSize.TEXT2} weight={FontWeight.BOLD} >{title}</Text>
      </TypeContent>
    </TypeContainer>
  );
};

export default TypeBox;