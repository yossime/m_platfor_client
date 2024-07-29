import React from 'react';
import styled from 'styled-components';
import { headers, HeaderType, SubMenuType, SubMenuData } from './types';
import Icon from '@/components/Library/icon/Icon';
import { BackgroundColor, IconColor, SemanticColors } from '@constants/colors';
import Text from '@/components/Library/text/Text';
import { TextSize } from '@constants/text';
import { IconSize } from '@constants/icon';



const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 52px;
  background-color: ${BackgroundColor.PRIMARY_BACKGROUND};
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

  &:hover:not(:disabled) {
    background-color: ${BackgroundColor.PRIMARY_BACKGROUND_HOVER};
  }

  &:active:not(:disabled),
  ${props => props.$active && `
    background-color: ${SemanticColors.PRIMARY_SELECTED};
  `}

  &:disabled {
    background-color: ${BackgroundColor.DISABLED_BACKGROUND};
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.div`
  /* margin-bottom: 2px; */
`;



interface HeaderMenuProps {
  activeSidebarHeader: HeaderType;
  activeSidebarSubMenu: SubMenuType;
  setActiveSidebarSubMenu: (subMenu: SubMenuType) => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ 
  activeSidebarHeader, 
  activeSidebarSubMenu, 
  setActiveSidebarSubMenu 
}) => {
  return (
    <MenuContainer>
      {headers[activeSidebarHeader].map((subMenuData: SubMenuData) => (
        <MenuItem
          key={subMenuData.name}
          $active={activeSidebarSubMenu === subMenuData.name}
          onClick={() => setActiveSidebarSubMenu(subMenuData.name)}
        >
          <IconWrapper>
            <Icon name={subMenuData.icon} size={IconSize.SMALL} color={IconColor.PRIMARY} />
          </IconWrapper>
          <Text size={TextSize.TEXT1}>{subMenuData.name}</Text>
        </MenuItem>
      ))}
    </MenuContainer>
  );
};