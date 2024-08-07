// // SideBar.tsx
// import React, { useEffect, useState } from 'react';
// import { HeaderMenu } from './HeaderMenu';
// import { ContentArea } from './ContentArea';
// import {
//   HeaderContainer,
//   HeaderTitle,
//   HeaderIcon,
//   SideBarContainer,
//   SubHeaderContainer,
//   ScrollableContent
// } from './SideBarStyles';
// import { SubMenuType } from './types';
// import { useEditor } from '@/context/useEditorContext';
// import Text from '@/components/Library/text/Text';
// import { TextSize } from '@constants/text';
// import Icon from '@/components/Library/icon/Icon';
// import { IconName } from '@constants/icon';

// const Sidebar: React.FC = () => {
//   const [activeSidebarHeader, setActiveSidebarHeader] = useState<any>('Edit Global');
//   const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Architecture');
//   const {sceneModel, setActiveBoardIndex } = useEditor()
//   const [isOpen, setIsOpen] = useState(true);


//   useEffect(() => {
//     if (activeSidebarHeader === 'Edit Global') {
//       setActiveSidebarSubMenu('Architecture');
//     } else {
//       setActiveSidebarSubMenu('Content');
//     }
//   }, [activeSidebarHeader]);


//   useEffect(() => {
//     if (sceneModel.getSelectedObject() === typeof IBoard ) {
//       activeSidebarHeader(`Edit ${sceneModel.getSelectedObject().name}`  )
//     }
//   }, [sceneModel.getSelectedObject()]);

//   const handleBackOrAdd = () => {
//     if (activeSidebarHeader === 'Edit Global') {
//       {
//       setActiveSidebarHeader('Choose Board Widget');
//       sceneModel?.root?.displayEmptySlots();
//     }
//     } else if (activeSidebarHeader === 'Choose Board Widget') {
//       setActiveSidebarHeader('Edit Global');
//     } else {
//       setActiveSidebarHeader('Choose Board Widget');
//       setActiveBoardIndex(-1)
//     }
//   };

//   return (
//     <SideBarContainer style={{ width: isOpen ? '340px' : '20px' }}>
//       {isOpen && (
//         <>
//           <HeaderContainer $isChooseBoardWidget={activeSidebarHeader === 'Choose Board Widget'}>
//             <HeaderIcon>
//               {activeSidebarHeader !== 'Edit Global' ? (
//                 <Icon name={IconName.CARETLEFT} onClick={handleBackOrAdd} />
//               ) : null}
//             </HeaderIcon>
//             <HeaderTitle>
//               <Text size={TextSize.TEXT2}>{activeSidebarHeader}</Text>
//             </HeaderTitle>
//           </HeaderContainer>
//           <ScrollableContent>
//             <SubHeaderContainer>
//               <HeaderMenu
//                 activeSidebarHeader={activeSidebarHeader}
//                 activeSidebarSubMenu={activeSidebarSubMenu}
//                 setActiveSidebarSubMenu={setActiveSidebarSubMenu}
//               />
//             </SubHeaderContainer>
//             <ContentArea
//               activeSidebarHeader={activeSidebarHeader}
//               activeSidebarSubMenu={activeSidebarSubMenu}
//               setActiveSidebarHeader={setActiveSidebarHeader}
//               handleBackOrAdd={handleBackOrAdd}
//             />
//           </ScrollableContent>
//         </>
//       )}
//     </SideBarContainer>
//   );
// };

// export default Sidebar;




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
import { ISceneObject } from '@/components/editor/interface/models'; // Update this import path if needed

const Sidebar: React.FC = () => {
  const { sceneModel } = useEditor();
  const [activeSidebarHeader, setActiveSidebarHeader] = useState<HeaderType>('Edit Global');
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] = useState<SubMenuType>('Architecture');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
    if (selectedObject && isBoardObject(selectedObject)) {
      setActiveSidebarHeader(`Edit ${selectedObject.name || 'Board'}` as HeaderType);
    } else {
      setActiveSidebarHeader('Edit Global');
    }
  }, [sceneModel]);

  useEffect(() => {
    if (activeSidebarHeader === 'Edit Global') {
      setActiveSidebarSubMenu('Architecture');
    } else if (activeSidebarHeader !== 'Choose Board Widget') {
      setActiveSidebarSubMenu('Content');
    }
  }, [activeSidebarHeader]);

  const handleBackOrAdd = () => {
    console.log('Selected' , sceneModel?.getSelectedObject() )

    if (activeSidebarHeader === 'Edit Global') {
      setActiveSidebarHeader('Choose Board Widget');
      sceneModel?.root?.displayEmptySlots();
    } else if (activeSidebarHeader === 'Choose Board Widget') {
      setActiveSidebarHeader('Edit Global');
    } else {
      setActiveSidebarHeader('Choose Board Widget');
      sceneModel?.setSelectedObject(null);
    }
  };

  // Type guard function to check if an object is a board
  function isBoardObject(obj: ISceneObject): obj is ISceneObject & { name: string } {
    return 'type' in obj && typeof obj.type === 'string' && obj.type.includes('Board') && 'name' in obj;
  }

  return (
    <SideBarContainer style={{ width: isOpen ? '340px' : '20px' }}>
      {isOpen && (
        <>
          <HeaderContainer $isChooseBoardWidget={activeSidebarHeader === 'Choose Board Widget'}>
            <HeaderIcon>
              {activeSidebarHeader !== 'Edit Global' && (
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