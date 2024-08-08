// import React, { useRef, useState } from 'react';
// import { IProductBoard, IDisplay, IProduct } from '@/components/editor/interface/paramsType';
// import { useEditor } from '@/context/useEditorContext';
// import Button from '@/components/Library/button/Button';
// import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
// import { IconName, IconSize } from '@constants/icon';
// import Text from '@/components/Library/text/Text';
// import { SubButton, SubContainer, SubWrapper } from '../../CommonStyles';
// import { FontWeight, TextSize } from '@constants/text';
// import Icon from '@/components/Library/icon/Icon';
// import { IconColor } from '@constants/colors';
// import PopupEditDisplay from './PopupEditDisplay';


// export const DisplayList: React.FC = () => {
//     const [activeDisplay, setActiveDisplay] = useState<{ index: number; display: IDisplay } | null>(null);
//     const { setDataParameters, dataParameters } = useEditor();
//     const { activeBoardIndex } = useEditor();
//     const currentBoard = dataParameters?.boards[activeBoardIndex] as IProductBoard;
//     const ref = useRef<HTMLDivElement>(null);
//     const handleEditDisplay = (index: number, display: IDisplay) => {
//         setActiveDisplay({ index, display });
//       };
    
//       const handleClosePopup = () => {
//         setActiveDisplay(null);
//       };
    
//       const handleSaveDisplay = (updatedDisplay: IDisplay) => {
//         if (activeDisplay === null) return;
    
//         // setDataParameters((prevParams) => {
//         //   if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
    
//         //   return {
//         //     ...prevParams,
//         //     boards: prevParams.boards.map((board, i) =>
//         //       i === activeBoardIndex ? {
//         //         ...board,
//         //         displays: (board as IProductBoard).displays.map((d, j) =>
//         //           j === activeDisplay.index ? updatedDisplay : d
//         //         )
//         //       } : board
//         //     )
//         //   };
//         // });
    
//         handleClosePopup();
//       };
    

//     const handleAddDisplay = () => {
//         setDataParameters((prevParams) => {
//             if (!prevParams || activeBoardIndex < 0 || !prevParams.boards[activeBoardIndex]) return prevParams;
//             const board = prevParams.boards[activeBoardIndex] as IProductBoard;
//             if (!board.displays || board.displays.length >= (board.maxDisplay || 0)) return prevParams;

//             const product: IProduct = {
//                 type: board.displayType as string,
//                 title: { text: 'Product Title' },
//                 description: { text: 'Product Description' },
//                 SKU: { text: 'Product SKU' },
//                 // price:{text: '100'},

//             };
//             const newDisplay: IDisplay = {
//                 title: { text: `Display ${board.displays.length + 1}` },
//                 type: board.displayType as string,
//                 products: [product]
//             };

//             const updatedBoards = prevParams.boards.map((b, index) =>
//                 index === activeBoardIndex ? {
//                     ...b,
//                     displays: [...(b as IProductBoard).displays, newDisplay]
//                 } : b
//             );

//             const updatedParams = {
//                 ...prevParams,
//                 boards: updatedBoards
//             };

//             handleEditDisplay(board.displays.length, newDisplay);

//             return updatedParams;
//         });
//     };

//     return (
//         <div ref={ref}>
//             <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
//                 Displays: {currentBoard.displays?.length || 0} of {currentBoard.maxDisplay || 0}
//             </Text>
//             <SubWrapper>
//                 <SubContainer>
//                     {currentBoard.displays?.map((display, index) => (
//                         <SubButton
//                             key={index}
//                             onClick={() => handleEditDisplay(index, display)}
//                         >
//                             <Text size={TextSize.TEXT2}> Display {index + 1}</Text>
//                             <Icon name={IconName.EDIT} color={IconColor.PRIMARY} size={IconSize.SMALL} />
//                         </SubButton>
//                     ))}
//                     {(currentBoard.displays?.length || 0) < (currentBoard.maxDisplay || 0) && (
//                         <Button
//                             type={ButtonType.PRIMARY}
//                             variant={ButtonVariant.SECONDARY}
//                             size={ButtonSize.LARGE}
//                             icon={IconName.PLUS}
//                             iconPosition='left'
//                             onClick={handleAddDisplay}
//                             fullWidth={true}
//                         />
//                     )}
//                 </SubContainer>
//             </SubWrapper>
//             {activeDisplay && (
//                 <PopupEditDisplay
//                     display={activeDisplay.display}
//                     onClose={handleClosePopup}
//                     onSave={handleSaveDisplay}
//                     parentRef={ref}
//                 />
//             )}
//         </div>
//     );
// };







// import React, { useRef, useState } from 'react';
// import { IDisplay } from '@/components/editor/interface/paramsType';
// import { useEditor } from '@/context/useEditorContext';
// import Button from '@/components/Library/button/Button';
// import { ButtonSize, ButtonType, ButtonVariant } from '@constants/button';
// import { IconName, IconSize } from '@constants/icon';
// import Text from '@/components/Library/text/Text';
// import { SubButton, SubContainer, SubWrapper } from '../../CommonStyles';
// import { FontWeight, TextSize } from '@constants/text';
// import Icon from '@/components/Library/icon/Icon';
// import { IconColor } from '@constants/colors';
// import PopupEditDisplay from './PopupEditDisplay';

// export const DisplayList: React.FC = () => {
//     const [activeDisplay, setActiveDisplay] = useState<{ index: number; display: IDisplay } | null>(null);
//     const { sceneModel } = useEditor();
//     const ref = useRef<HTMLDivElement>(null);

//     const selectedObject = sceneModel?.getSelectedObject();

//     const getContentData = () => {
//     };

//     const updateContentData = () => {

//     };

//     const handleEditDisplay = (index: number, display: IDisplay) => {
//         setActiveDisplay({ index, display });
//     };
    
//     const handleClosePopup = () => {
//         setActiveDisplay(null);
//     };
    
//     const handleSaveDisplay = (updatedDisplay: IDisplay) => {
//         if (activeDisplay === null || !selectedObject) return;

//         const displays = getDisplays();
//         displays[activeDisplay.index] = updatedDisplay;
        
//         handleClosePopup();
//     };

//     const handleAddDisplay = () => {
//         const displays = getDisplays();
 
//         }


//     };


//     return (
//         <div ref={ref}>
//             <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
//                 Displays: {displays.length} of {maxDisplay}
//             </Text>
//             <SubWrapper>
//                 <SubContainer>
//                     {displays.map((display, index) => (
//                         <SubButton
//                             key={index}
//                             onClick={() => handleEditDisplay(index, display)}
//                         >
//                             <Text size={TextSize.TEXT2}> Display {index + 1}</Text>
//                             <Icon name={IconName.EDIT} color={IconColor.PRIMARY} size={IconSize.SMALL} />
//                         </SubButton>
//                     ))}
//                     {displays.length < maxDisplay && (
//                         <Button
//                             type={ButtonType.PRIMARY}
//                             variant={ButtonVariant.SECONDARY}
//                             size={ButtonSize.LARGE}
//                             icon={IconName.PLUS}
//                             iconPosition='left'
//                             onClick={handleAddDisplay}
//                             fullWidth={true}
//                         />
//                     )}
//                 </SubContainer>
//             </SubWrapper>
//             {activeDisplay && (
//                 <PopupEditDisplay
//                     display={activeDisplay.display}
//                     onClose={handleClosePopup}
//                     onSave={handleSaveDisplay}
//                     parentRef={ref}
//                 />
//             )}
//         </div>
//     );
// };