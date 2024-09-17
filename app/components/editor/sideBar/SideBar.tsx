
import React, { useEffect, useState } from 'react';
import { HeaderMenu } from './HeaderMenu';
import { ContentArea } from './ContentArea';
import {
  HeaderContainer,
  HeaderTitle,
  HeaderIcon,
  SideBarContainer,
  SubHeaderContainer,
  ScrollableContent
} from './SideBarStyles';
import { SubMenuType, HeaderType } from './types';
import { useEditor } from '@/context/useEditorContext';
import Text from '@/components/Library/text/Text';
import { TextSize } from '@constants/text';
import Icon from '@/components/Library/icon/Icon';
import { IconName } from '@constants/icon';
import { BoardType, ISceneObject } from '../types';
import { Board } from '../viewport/models/boards/Board';


const Sidebar: React.FC = () => {
  const { sceneModel } = useEditor();
  const [activeSidebarHeader, setActiveSidebarHeader] = useState<HeaderType>('Architecture');
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Edit');
  const [isOpen, setIsOpen] = useState(true);


  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
  
    if (selectedObject && selectedObject instanceof  Board  ) {
      setActiveSidebarHeader(`Edit ${selectedObject.type || 'Board'}` as HeaderType);
    } else {
      setActiveSidebarHeader('Architecture');
    }
  }, [sceneModel]);
  

  useEffect(() => {
    setActiveSidebarSubMenu('Edit');
  }, [activeSidebarHeader]);

  const handleBackOrAdd = () => {

    if (activeSidebarHeader === 'Architecture') {
      setActiveSidebarHeader('Choose Board Widget');
      sceneModel?.root?.displayEmptySlots();
    } else if (activeSidebarHeader === 'Choose Board Widget') {
      setActiveSidebarHeader('Architecture');
    } else {
      setActiveSidebarHeader('Choose Board Widget');
      sceneModel?.setSelectedObject(null);
    }
  };


  return (

    <SideBarContainer className="sidebar">
      {isOpen && (
        <>
          <HeaderContainer $isChooseBoardWidget={activeSidebarHeader === 'Choose Board Widget'}>
            <HeaderIcon>
              {activeSidebarHeader !== 'Architecture' && (
                <Icon name={IconName.CARETLEFT} onClick={handleBackOrAdd} />
              )}
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