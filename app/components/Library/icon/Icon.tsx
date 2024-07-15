import React from 'react';
import styled from 'styled-components';
import { IconSize, IconColor, IconName } from '@constants/icon';

type IconNameType = keyof typeof IconName;
type IconSizeType = keyof typeof IconSize;
type IconColorType = keyof typeof IconColor;

interface IconProps {
    name: IconNameType;
    size: IconSizeType;
    color: IconColorType;
}

const StyledIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const Icon: React.FC<IconProps> = ({ name, size, color }) => {
    const IconComponent = IconName[name];
    return (
        <StyledIcon>
            <IconComponent size={IconSize[size]} color={IconColor[color]} />
        </StyledIcon>
    );
};

export default Icon;