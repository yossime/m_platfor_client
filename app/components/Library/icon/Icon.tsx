import React, { forwardRef, ForwardedRef } from 'react';
import { IconColor } from '@constants/colors';
import { IconComponents, IconName, IconSize } from '@constants/icon';

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  onClick?: () => void;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(({
  name, 
  size = IconSize.MEDIUM, 
  color = IconColor.ICONCOLOR,
  className,
  onClick
}, ref) => {
  const IconComponent = IconComponents[name];
  
  return (
    <span ref={ref as ForwardedRef<HTMLSpanElement>}>
      <IconComponent
        size={size}
        color={color}
        className={className}
        onClick={onClick}
      />
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;