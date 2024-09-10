
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
import { ISceneObject } from '../viewport/types';
import { EventManager } from '../viewport/utils/EventManager';
// import { ISceneObject } from '@/components/editor/interface/models';


const Sidebar: React.FC = () => {
  const { sceneModel } = useEditor();
  const [activeSidebarHeader, setActiveSidebarHeader] = useState<HeaderType>('Architecture');
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Edit');
  const [isOpen, setIsOpen] = useState(true);
  // const [selectedObject, setSelectedObject] = useState<ISceneObject | null>(null); //yossi

  useEffect(() => {
    const handleSelectionChange = () => {
      const selected = sceneModel?.getSelectedObject() ?? null; // yossi
      // setSelectedObject(selected);
    };

    // sceneModel?.on('selectionChange', handleSelectionChange); //yossi

    return () => {
      // sceneModel?.off('selectionChange', handleSelectionChange); //yossi
    };

  }, [sceneModel]);

  useEffect(() => {
    const manager = EventManager.getInstance();
    const selectedObject = sceneModel?.getSelectedObject();

    if (selectedObject && isBoardObject(selectedObject)) {
      setActiveSidebarHeader(`Edit ${selectedObject.name || 'Board'}` as HeaderType);
    } else {
      setActiveSidebarHeader('Architecture');
    }
  }, [sceneModel?.getSelectedObject()]); //yossi

  useEffect(() => {
    // if (activeSidebarHeader === 'Architecture') {
    //   setActiveSidebarSubMenu('Edit');
    // } else if (activeSidebarHeader !== 'Choose Board Widget') {
    // }
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

  function isBoardObject(obj: ISceneObject): obj is ISceneObject & { name: string } {
    return 'type' in obj && typeof obj.type === 'string' && obj.type.includes('Board') && 'name' in obj;
  }

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