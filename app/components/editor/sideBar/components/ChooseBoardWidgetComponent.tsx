// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { HeaderType, widgets } from '../types';
// import { useEditor } from '@/context/useEditorContext';
// import {createBoardByType} from '@/components/editor/utils/CraeteBoard';


// const WidgetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const WidgetButton = styled.button`
//   padding: 12px 24px;
//   font-size: 16px;
//   background-color: #3b82f6;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// interface ChooseBoardWidgetComponentProps {
//   setActiveSidebarHeader: (header: HeaderType) => void;
// }

// export const ChooseBoardWidgetComponent: React.FC<ChooseBoardWidgetComponentProps> = ({
//   setActiveSidebarHeader
// }) => {
//   const { setActiveBoardIndex } = useEditor();
//   const { setDataParameters, dataParameters } = useEditor();
//   const [boardIndex, setBoardIndex] = useState<number | ''>('');
//   const [availableIndexes, setAvailableIndexes] = useState<number[]>([]);

//   useEffect(() => {
//     console.log('dataParameters', dataParameters?.boards)
//     if (dataParameters?.boards) {
//       const indexes = dataParameters.boards
//         .map((board, index) => board.type === null ? index : -1)
//         .filter(index => index !== -1);

//       setAvailableIndexes(indexes);
//       if (indexes.length > 0 && (boardIndex === '' || !indexes.includes(boardIndex as number))) {
//         setBoardIndex(indexes[0]);
//       }
//     }
//   }, [dataParameters, boardIndex]);

  
//   const handle = (widget: typeof widgets[number]) => {
//     if (boardIndex === '') return;
    
//     setActiveBoardIndex(boardIndex);
//     setActiveSidebarHeader( `Edit ${widget.name}` as HeaderType);
    
//     setDataParameters((prevParams) => {
//       if (!prevParams) return prevParams;
      
//       const updatedBoards = [...prevParams.boards];
//       updatedBoards[boardIndex] = createBoardByType(widget.type, widget.name);
      
//       return {
//         ...prevParams,
//         boards: updatedBoards
//       };
//     });
//   };



// return (
//   <div>
    
//     <WidgetContainer>
//       {widgets.map((widget) => (
//         <WidgetButton
//           key={widget.name}
//           onClick={() => handle(widget)}
//           disabled={boardIndex === ''}
//         >
//           {widget.name}
//         </WidgetButton>
//       ))}
//     </WidgetContainer>
//   </div >
// );
// };














// // const handleIndexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //   const newIndex = parseInt(event.target.value, 10);
// //   setBoardIndex(isNaN(newIndex) ? '' : newIndex);
// // };

// {/* <div>
//       <label htmlFor="boardIndex">Select Empty Board: </label>
//       <select
//         id="boardIndex"
//         value={boardIndex}
//         onChange={handleIndexChange}
//       >
//         <option value="">Select a board</option>
//         {availableIndexes.map(index => (
//           <option key={index} value={index}>
//             Board {index + 1}
//           </option>
//         ))}
//       </select>
//     </div> */}


import React, { useEffect, useState } from 'react';
import { HeaderType } from '../types';
import { useEditor } from '@/context/useEditorContext';
import { WidgetContainer, WidgetButton } from './ChooseBoardWidgetStyles';
import Icon from '@/components/Library/icon/Icon';
import Text from '@/components/Library/text/Text';
import { IconColor, TextColor } from '@constants/colors';
import { FontWeight, TextSize } from '@constants/text';
import { IconName, IconSize } from '@constants/icon';
import { createBoardByType } from '../../utils/CraeteBoard';

interface WidgetData {
  name: string;
  iconName: IconName;
  type: string;
}

const widgets: WidgetData[] = [
  { name: "Header", iconName: IconName.ALIGNTOP, type: "header" },
  { name: "Form", iconName: IconName.TABLE, type: "form" },
  { name: "Image", iconName: IconName.IMAGE, type: "image" },
  { name: "Testimonials", iconName: IconName.QUOTES, type: "testimonials" },
  { name: "Video", iconName: IconName.VIDEO, type: "video" },
  { name: "Article", iconName: IconName.ARTICLE, type: "article" },
  { name: "eComm", iconName: IconName.STOREFRONT, type: "ecomm" },
  { name: "Services", iconName: IconName.SQUARESFOUR, type: "services" },
  { name: "Slider", iconName: IconName.SLIDESHOW, type: "slider" },
  { name: "Socials", iconName: IconName.SMILEY, type: "socials" },
];

interface ChooseBoardWidgetComponentProps {
  setActiveSidebarHeader: (header: HeaderType) => void;
}

export const ChooseBoardWidgetComponent: React.FC<ChooseBoardWidgetComponentProps> = ({
  setActiveSidebarHeader
}) => {
  const { setActiveBoardIndex, setDataParameters, dataParameters } = useEditor();
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [availableIndex, setAvailableIndex] = useState<number | null>(null);

  useEffect(() => {
    if (dataParameters?.boards) {
      const index = dataParameters.boards.findIndex(board => board.type === null);
      setAvailableIndex(index !== -1 ? index : null);
    }
  }, [dataParameters]);

  const handleWidgetClick = (widget: WidgetData) => {
    if (availableIndex === null) return;

    setSelectedWidget(widget.name);
    setActiveBoardIndex(availableIndex);
    setActiveSidebarHeader(`Edit ${widget.name}` as HeaderType);

    setDataParameters(prevParams => {
      if (!prevParams) return prevParams;
      const updatedBoards = [...prevParams.boards];
      updatedBoards[availableIndex] = createBoardByType(widget.type, widget.name);
      return { ...prevParams, boards: updatedBoards };
    });
  };

  return (
    <WidgetContainer>
      {widgets.map((widget) => (
        <WidgetButton
          key={widget.name}
          onClick={() => handleWidgetClick(widget)}
          disabled={availableIndex === null}
          $clicked={selectedWidget === widget.name}
        >
          <Icon 
            name={widget.iconName} 
            size={IconSize.MEDIUM} 
            color={availableIndex === null ? IconColor.DISABLED : IconColor.ICONCOLOR} 
          />
          <Text 
            size={TextSize.TEXT2} 
            weight={FontWeight.NORMAL} 
            color={availableIndex === null ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
          >
            {widget.name}
          </Text>
        </WidgetButton>
      ))}
    </WidgetContainer>
  );
};