import React from 'react';
import styled from 'styled-components';
import { HeaderType, SubMenuType } from './types';

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
  activeHeader: HeaderType;
  activeSubMenu: SubMenuType;
  headers: Record<HeaderType, SubMenuType[]>;
  onHeaderChange: (header: HeaderType) => void;
  onSubMenuChange: (subMenu: SubMenuType) => void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ 
  activeHeader, 
  activeSubMenu, 
  headers, 
  onHeaderChange, 
  onSubMenuChange 
}) => {
  return (
    <MenuContainer>
      {headers[activeHeader].map(subMenu => (
        <MenuItem
          key={subMenu}
          $active={activeSubMenu === subMenu}
          onClick={() => onSubMenuChange(subMenu)}
        >
          {subMenu}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};