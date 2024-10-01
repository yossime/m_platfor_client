
"use client"
import { IconName } from '@constants/icon';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  icon: IconName;
}

const menuItems: MenuItem[] = [
  { name: 'Products', icon: IconName.BROWSER },
  { name: 'Accept payments', icon: IconName.PIGGYBUNK  },
  { name: 'Connect a domain', icon: IconName.CUBE  },
];

interface MenuContextType {
  menuItems: MenuItem[];
  currentSelection: string;
  setCurrentSelection: (name: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider:  React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSelection, setCurrentSelection] = useState<string>(() => {
    return localStorage.getItem('currentSelection') || menuItems[0].name;
  });

  useEffect(() => {
    localStorage.setItem('currentSelection', currentSelection);
  }, [currentSelection]);

  return (
    <MenuContext.Provider value={{ menuItems, currentSelection, setCurrentSelection }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};
