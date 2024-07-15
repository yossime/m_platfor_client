import React from 'react';
import { TypeContainer, TypeContent, IconWrapper, IconBackground, TypeTitle } from './TypeStyles';

interface TypeProps {
  title: string;
  clicked: boolean;
  onClick: (type: string) => void;
}

const Type: React.FC<TypeProps> = ({ title, clicked, onClick }) => {
  return (
    <TypeContainer clicked={clicked} onClick={() => onClick(title)}>
      <TypeContent>
        <IconWrapper>
          <IconBackground />
        </IconWrapper>
        <TypeTitle>{title}</TypeTitle>
      </TypeContent>
    </TypeContainer>
  );
};

export default Type;