
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { headers, HeaderType, SubMenuType, SubMenuData, widgets } from './types';
import Icon from '@/components/Library/icon/Icon';
import { BackgroundColor, BorderColor, IconColor, SemanticColors, TextColor } from '@constants/colors';
import Text from '@/components/Library/text/Text';
import { TextSize } from '@constants/text';
import { IconSize } from '@constants/icon';
import Tooltip from '@/components/Library/general/Tooltip';
import { useSidebarContext } from '@/context/SidebarContext ';

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 52px;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  height: 60px;
`;

const MenuItem = styled.button<{ $active: boolean }>`
  flex: 1;
  height: 100%;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
  border: none;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 4px 0;
  position: relative;

  transform: translateY(0);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${BorderColor.UI_BORDER};
    transition: all 0.3s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 3px 3px rgba(0, 0, 0, 0.15);  }

  ${props => props.$active && `
    &::after {
      height: 2px;
      background-color: ${SemanticColors.PRIMARY};
    }
  `}

  &:disabled {
    background-color: ${BackgroundColor.DISABLED_BACKGROUND};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div`
  /* margin-bottom: 2px; */
`;



export const HeaderMenu: React.FC = () => {
  const {setActiveSidebarHeader,activeSidebarHeader,setActiveSidebarSubMenu,activeSidebarSubMenu} = useSidebarContext()

  useEffect(() => {
    const validHeaders: HeaderType[] = widgets.map(widget => widget.name).concat(['World', 'Choose Board Widget']);
  
    if (!validHeaders.includes(activeSidebarHeader)) {
      setActiveSidebarHeader("World");
    }
  }, []);
  

  return (
    <MenuContainer>
      {headers[activeSidebarHeader].map((subMenuData: SubMenuData) => {
        const isActive = activeSidebarSubMenu === subMenuData.name;
        return (
          <Tooltip   key={subMenuData.name}
         content={subMenuData.body}>
          <MenuItem
            key={subMenuData.name}
            $active={isActive}
            onClick={() => setActiveSidebarSubMenu(subMenuData.name)}
          >
            <IconWrapper>
              <Icon 
                name={subMenuData.icon} 
                size={IconSize.SMALL} 
                color={ IconColor.PRIMARY } 
              />
            </IconWrapper>
            <Text 
              size={TextSize.TEXT1}
              color={TextColor.PRIMARY_TEXT}
            >
              {subMenuData.name}
            </Text>
          </MenuItem>
          </Tooltip>
        );
      })}
    </MenuContainer>
  );
};