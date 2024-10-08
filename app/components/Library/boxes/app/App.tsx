
import React from 'react';
import {
  AppContainer,
  FrameParent,
  RectangleWrapper,
  ColorCube,
  ContentWrapper,
  AppTitle,
  Description
} from './AppStyles';

interface BoxProps {
  title: string;
  body: string;
  clicked: boolean;
  backgroundColor: string;
  onClick: (type: string) => void;
}

const Box: React.FC<BoxProps> = ({ title, body, clicked, backgroundColor, onClick }) => {
  return (
    <AppContainer clicked={clicked} backgroundColor={backgroundColor} onClick={() => onClick(title)}>
      <FrameParent>
        <RectangleWrapper>
          <ColorCube backgroundColor={backgroundColor} />
        </RectangleWrapper>
        <ContentWrapper>
          <AppTitle>{title}</AppTitle>
          <Description>{body}</Description>
        </ContentWrapper>
      </FrameParent>
    </AppContainer>
  );
};

export default Box;