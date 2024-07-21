import React from 'react';
import { IconName, IconSize, IconColor } from '@constants/icon';
import {
  BoardContainer,
  ContentWrapper,
  TextWrapper,
  } from './BoardBoxStyles';
import Icon from '@/components/Library/icon/Icon';
import {IconWrapper, Title, Description } from '../BaseBoxStyles';
import Text from '../../text/Text';
import { FontWeight, TextSize } from '@constants/text';

interface BoardProps {
  title: string;
  body: string;
  clicked: boolean;
  onClick: (type: string) => void;
  iconName: IconName;
  iconSize?: IconSize;
  iconColor?: IconColor;
  disabled?: boolean;
}

const BoardBox: React.FC<BoardProps> = ({
  title,
  body,
  clicked,
  onClick,
  iconName,
  iconSize = IconSize.MEDIUM,
  iconColor = IconColor.ICONCOLOR,
  disabled = false
}) => {
  return (
    <BoardContainer clicked={clicked} disabled={disabled} onClick={() => onClick(title)}>
      <ContentWrapper>
        <IconWrapper>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </IconWrapper>
        <TextWrapper>
          <Text size = {TextSize.TEXT2} weight={FontWeight.BOLD} >{title}</Text>
          <Text size = {TextSize.TEXT2} weight={FontWeight.NORMAL} >{body}</Text>
        </TextWrapper>
      </ContentWrapper>
    </BoardContainer>
  );
};

export default BoardBox;