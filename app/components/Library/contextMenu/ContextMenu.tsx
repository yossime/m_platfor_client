import React from "react";
import styled from "styled-components";

type ContextMenuItem = {
  label: string;
  action: () => void;
};

interface ContextMenuProps {
  items: ContextMenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, position, onClose }) => {
  return (
    <MenuWrapper
      style={{ top: position.y, left: position.x }}
      onMouseLeave={onClose}
    >
      {items.map((item, index) => (
        <MenuItem key={index} onClick={() => {
          item.action();
          onClose();
        }}>
          {item.label}
        </MenuItem>
      ))}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ContextMenu;
