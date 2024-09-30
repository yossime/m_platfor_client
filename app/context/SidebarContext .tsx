import { HeaderType, SubMenuType } from "@/components/editor/sideBar/types";
import React, { createContext, useContext, useState, ReactNode } from "react";


interface SidebarContextProps {
  activeSidebarHeader: HeaderType;
  setActiveSidebarHeader: (header: HeaderType) => void;
  activeSidebarSubMenu: SubMenuType;
  setActiveSidebarSubMenu: (subMenu: SubMenuType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  showformatBoard: boolean;
  setShowFormatBoard: (formatBoard: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeSidebarHeader, setActiveSidebarHeader] =
    useState<HeaderType>("World");
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] =
    useState<SubMenuType>("Edit");
  const [isOpen, setIsOpen] = useState(true);
  const [showformatBoard, setShowFormatBoard] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        activeSidebarHeader,
        setActiveSidebarHeader,
        activeSidebarSubMenu,
        setActiveSidebarSubMenu,
        isOpen,
        setIsOpen,
        showformatBoard: showformatBoard,
        setShowFormatBoard: setShowFormatBoard,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
