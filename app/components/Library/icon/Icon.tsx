
import { IconColor } from '@constants/colors';
import {  IconComponents, IconName, IconSize } from '@constants/icon';
import React from 'react';

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  onClick?: () => void;
}

 const Icon: React.FC<IconProps> = ({ 
  name, 
  size = IconSize.MEDIUM, 
  color = IconColor.ICONCOLOR,
  className,
  onClick
}) => {
  const IconComponent = IconComponents[name];
  
  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;

{/* <div>
<Icon name={IconName.HOME} size={IconSize.LARGE} color={IconColor.PRIMARY} />
<span>Home Icon</span>
</div> */}