import React, { forwardRef, ForwardedRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { IconColor } from '@constants/colors';
import { IconComponents, IconName, IconSize } from '@constants/icon';

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  onClick?: () => void;
  shouldRotate?: boolean; 
}
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IconWrapper = styled.span<{ $shouldRotate?: boolean; onClick?: () => void }>`
  ${({ onClick }) => onClick && css`
    cursor: pointer;
  `}
  
  ${({ $shouldRotate }) => $shouldRotate && css`
  animation: ${rotateAnimation} 2s linear infinite;
  `}
`;

const Icon = forwardRef<SVGSVGElement, IconProps>(({
  name, 
  size = IconSize.MEDIUM, 
  color = IconColor.ICONCOLOR,
  className,
  onClick,
  shouldRotate = false
}, ref) => {
  const IconComponent = IconComponents[name];
  
  return (
    <IconWrapper 
      ref={ref as ForwardedRef<HTMLSpanElement>}
      className={className}
      onClick={onClick}
      $shouldRotate={shouldRotate}
    >
      <IconComponent
        size={size}
        color={color}
        className={className}
      />
    </IconWrapper>
  );
});

Icon.displayName = 'Icon';

export default Icon;
