// SideBar.tsx
import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './HeaderMenu';
import { ContentArea } from './ContentArea';
import {
  HeaderContainer,
  HeaderTitle,
  HeaderIcon,
  SideBarContainer,
  ToggleButton,
  SubHeaderContainer,
  ScrollableContent
} from './SideBarStyles';
import { SubMenuType } from './types';
import { useEditor } from '@/context/useEditorContext';
import Text from '@/components/Library/text/Text';
import { TextSize } from '@constants/text';
import Icon from '@/components/Library/icon/Icon';
import { IconName } from '@constants/icon';

const Sidebar: React.FC = () => {
  const [activeSidebarHeader, setActiveSidebarHeader] = useState<any>('Edit Global');
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Architecture');
  const { setActiveBoardIndex } = useEditor()
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (activeSidebarHeader === 'Edit Global') {
      setActiveSidebarSubMenu('Architecture');
    } else {
      setActiveSidebarSubMenu('Content');
    }
  }, [activeSidebarHeader]);

  const handleBackOrAdd = () => {
    if (activeSidebarHeader === 'Edit Global') {
      setActiveSidebarHeader('Choose Board Widget');
    } else if (activeSidebarHeader === 'Choose Board Widget') {
      setActiveSidebarHeader('Edit Global');
    } else {
      setActiveSidebarHeader('Choose Board Widget');
      setActiveBoardIndex(-1)
    }
  };

  return (
    <SideBarContainer style={{ width: isOpen ? '340px' : '20px' }}>
      {/* <ToggleButton onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </ToggleButton> */}
      {isOpen && (
        <>
          <HeaderContainer isChooseBoardWidget={activeSidebarHeader === 'Choose Board Widget'}>
            <HeaderIcon>
              {activeSidebarHeader !== 'Edit Global' ? (
                <Icon name={IconName.CARETLEFT} onClick={handleBackOrAdd} />
              ) : null}
            </HeaderIcon>
            <HeaderTitle>
              <Text size={TextSize.TEXT2}>{activeSidebarHeader}</Text>
            </HeaderTitle>
          </HeaderContainer>
          <ScrollableContent>
            <SubHeaderContainer>
              <HeaderMenu
                activeSidebarHeader={activeSidebarHeader}
                activeSidebarSubMenu={activeSidebarSubMenu}
                setActiveSidebarSubMenu={setActiveSidebarSubMenu}
              />
            </SubHeaderContainer>
            <ContentArea
              activeSidebarHeader={activeSidebarHeader}
              activeSidebarSubMenu={activeSidebarSubMenu}
              setActiveSidebarHeader={setActiveSidebarHeader}
              handleBackOrAdd={handleBackOrAdd}
            />
          </ScrollableContent>
        </>
      )}
    </SideBarContainer>
  );
};

export default Sidebar;