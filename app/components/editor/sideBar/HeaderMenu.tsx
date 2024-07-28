import React from 'react';
import styled from 'styled-components';
import { headers, HeaderType, SubMenuType } from './types';

const MenuContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const MenuItem = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 8px;
  background-color: ${props => props.$active ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.$active ? 'white' : 'black'};
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
      {headers[activeSidebarHeader]?.map(subMenu => (
        <MenuItem
          key={subMenu}
          $active={activeSidebarSubMenu === subMenu}
          onClick={() => setActiveSidebarSubMenu(subMenu)}
        >
          {subMenu}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};