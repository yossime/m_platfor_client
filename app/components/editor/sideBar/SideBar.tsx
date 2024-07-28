import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './HeaderMenu';
import { ContentArea } from './ContentArea';
import { HeaderContainer, SidebarContainer, HeaderTitle, HeaderIcon } from './SideBarStyles';
import { SubMenuType, widgets } from './types';
import { useEditor } from '@/context/useEditorContext';
import Text from '@/components/Library/text/Text';
import { TextSize } from '@constants/text';
import Icon from '@/components/Library/icon/Icon';
import { IconName } from '@constants/icon';

const Sidebar: React.FC = () => {
  const [activeSidebarHeader, setActiveSidebarHeader] = useState<any>('Edit Global');
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Global');
  const { setActiveBoardIndex, dataParameters } = useEditor()

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
    } else if (activeSidebarHeader === 'Choose Board Widget') {
      setActiveSidebarHeader('Edit Global');
    } else {
      setActiveSidebarHeader('Choose Board Widget');
      setActiveBoardIndex(-1)
    } 
  };

  return (
    <SidebarContainer>
      <HeaderContainer isChooseBoardWidget={activeSidebarHeader === 'Choose Board Widget'}>
        <HeaderIcon>
          {activeSidebarHeader === 'Edit Global' ? (
            <Icon name={IconName.PLUS} onClick={handleBackOrAdd} />
          ) : (
            <Icon name={IconName.CARETLEFT} onClick={handleBackOrAdd} />
          )}
        </HeaderIcon>
        <HeaderTitle>
          <Text size={TextSize.TEXT2}>{activeSidebarHeader}</Text>
        </HeaderTitle>
      </HeaderContainer>

      <HeaderMenu
        activeSidebarHeader={activeSidebarHeader}
        activeSidebarSubMenu={activeSidebarSubMenu}
        setActiveSidebarSubMenu={setActiveSidebarSubMenu}
      />

      <ContentArea
        activeSidebarHeader={activeSidebarHeader}
        activeSidebarSubMenu={activeSidebarSubMenu}
        setActiveSidebarHeader={setActiveSidebarHeader}
      />
    </SidebarContainer>
  );
};

export default Sidebar;