import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { HeaderMenu } from './HeaderMenu';
import { ContentArea } from './ContentArea';
import { BackButton, HeaderContainer, HeaderTitle, SidebarContainer } from './SideBarStyles';
import { headers, HeaderType, SubMenuType, widgets } from './types';
import { useEditor } from '@/context/useEditorContext';

interface SidebarProps {
  currentObject?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    currentObject
}) => {
    const [activeSidebarHeader, setActiveSidebarHeader] = useState<HeaderType>('Edit Global');
    const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Global');
    const { setActiveBoardIndex}= useEditor()

    useEffect(() => {
      if (activeSidebarHeader === 'Edit Global') {
        setActiveSidebarSubMenu('Global');
      } else {
        setActiveSidebarSubMenu('Content');
      }
    }, [activeSidebarHeader]);

    const handleBackOrAdd = () => {
      if (activeSidebarHeader === 'Edit Global') {
        setActiveSidebarHeader('Choose Board Widget');
      } else if (widgets.some(widget => widget.editName === activeSidebarHeader)) {
        setActiveSidebarHeader('Choose Board Widget');
        setActiveBoardIndex(-1)
      } else if (activeSidebarHeader === 'Choose Board Widget') {
        setActiveSidebarHeader('Edit Global');
      }
    };
  
    const handleSidebarHeaderChange = (header: HeaderType) => {
      setActiveSidebarHeader(header);
    };
  
    const handleSidebarSubMenuChange = (subMenu: SubMenuType) => {
      setActiveSidebarSubMenu(subMenu);
    };

  return (
    <SidebarContainer>
      <HeaderContainer>
        <HeaderTitle>{activeSidebarHeader}</HeaderTitle>
        <BackButton onClick={handleBackOrAdd}>
          {activeSidebarHeader === 'Edit Global' ? (
            <Plus size={20} />
          ) : (
            <ArrowLeft size={20} />
          )}
        </BackButton>
      </HeaderContainer>
      
      <HeaderMenu 
        activeHeader={activeSidebarHeader}
        activeSubMenu={activeSidebarSubMenu}
        headers={headers}
        onHeaderChange={handleSidebarHeaderChange}
        onSubMenuChange={handleSidebarSubMenuChange}
      />

      <ContentArea 
        activeHeader={activeSidebarHeader}
        activeSubMenu={activeSidebarSubMenu}
        onHeaderChange={handleSidebarHeaderChange}
      />
    </SidebarContainer>
  );
};

export default Sidebar;