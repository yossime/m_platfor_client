import React from 'react';
import styled from 'styled-components';
import { TextSize, FontWeight, TextFont, TextColor } from '@constants/text'

interface TextProps {
    size: keyof typeof TextSize;
    weight: keyof typeof FontWeight;
    color: keyof typeof TextColor;
    children: React.ReactNode;
}

const StyledText = styled.span<TextProps>`
    font-size: ${props => TextSize[props.size]};
    font-weight: ${props => FontWeight[props.weight]};
    font-family: ${props => TextFont[props.size]};
    color: ${props => TextColor[props.color]};
`;

const Text: React.FC<TextProps> = ({ size, weight, color, children }) => {
    return <StyledText size={size} weight={weight} color={color}>{children}</StyledText>;
};

export default Text;
