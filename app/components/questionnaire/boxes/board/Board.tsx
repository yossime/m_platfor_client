import React from 'react';
import { IconName, IconSize, IconColor } from '@constants/icon';
import {
  BoardContainer,
  ContentWrapper,
  IconWrapper,
  TextWrapper,
  Title,
  Description
} from './BoardStyles';
import Icon from '@/components/Library/icon/Icon';

type IconNameType = keyof typeof IconName;
type IconSizeType = keyof typeof IconSize;
type IconColorType = keyof typeof IconColor;

interface BoardProps {
  title: string;
  body: string;
  clicked: boolean;
  onClick: (type: string) => void;
  iconName: IconNameType;
  iconSize: IconSizeType;
  iconColor: IconColorType;
}

const Board: React.FC<BoardProps> = ({
  title,
  body,
  clicked,
  onClick,
  iconName,
  iconSize,
  iconColor
}) => {
  return (
    <BoardContainer clicked={clicked} onClick={() => onClick(title)}>
      <ContentWrapper>
        <IconWrapper>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </IconWrapper>
        <TextWrapper>
          <Title>{title}</Title>
          <Description>{body}</Description>
        </TextWrapper>
      </ContentWrapper>
    </BoardContainer>
  );
};

export default Board;