import React, { forwardRef, ForwardedRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { BackgroundColor, IconColor } from "@constants/colors";
import { IconComponents, IconName, IconSize } from "@constants/icon";

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

const IconWrapper = styled.span<{
  $shouldRotate?: boolean;
  onClick?: () => void;
}>`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  ${({ onClick }) =>
    onClick &&
    css`
      padding: 5px;
      cursor: pointer;
      &:hover {
        background-color:${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
      }
    `}

  ${({ $shouldRotate }) =>
    $shouldRotate &&
    css`
      animation: ${rotateAnimation} 2s linear infinite;
    `}
`;

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = IconSize.MEDIUM,
      color = IconColor.ICONCOLOR,
      className,
      onClick,
      shouldRotate = false,
    },
    ref
  ) => {
    const IconComponent = IconComponents[name];

    return (
      <IconWrapper
        ref={ref as ForwardedRef<HTMLSpanElement>}
        className={className}
        onClick={onClick}
        $shouldRotate={shouldRotate}
      >
        <IconComponent
          strokeWidth={2}
          size={size}
          color={color}
          className={className}
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />
      </IconWrapper>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
