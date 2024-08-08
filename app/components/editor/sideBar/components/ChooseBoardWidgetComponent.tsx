import React, { useEffect, useState } from 'react';
import { HeaderType, WidgetData, widgets } from '../types';
import { useEditor } from '@/context/useEditorContext';
import { WidgetContainer, WidgetButton } from './ChooseBoardWidgetStyles';
import Icon from '@/components/Library/icon/Icon';
import Text from '@/components/Library/text/Text';
import { IconColor, TextColor } from '@constants/colors';
import { FontWeight, TextSize } from '@constants/text';
import { IconSize } from '@constants/icon';
import { createBoardByType } from '../../utils/CraeteBoard';
import { Board } from '../../interface/Board';
import { BoardType } from '../../interface/models';

interface ChooseBoardWidgetComponentProps {
  setActiveSidebarHeader: (header: HeaderType) => void;
}

export const ChooseBoardWidgetComponent: React.FC<ChooseBoardWidgetComponentProps> = ({
  setActiveSidebarHeader
}) => {
  const { sceneModel, setActiveBoardIndex, setDataParameters } = useEditor();
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<number>(0);

  useEffect(() => {
    if (sceneModel?.root) {
      const emptySlotCount = sceneModel.root.getEmptySlots().length;
      setAvailableSlots(emptySlotCount);
    }
  }, [sceneModel]);

  const handleWidgetClick = async (widget: WidgetData) => {
    if (availableSlots === 0) return;

    setSelectedWidget(widget.name);
    // const newBoard = createBoardByType(widget.type, widget.name);

    const newBoard = new Board(widget.type, {name: widget.name});
    
    if (sceneModel?.root && newBoard) {
      await sceneModel.root.addChild(newBoard);
      
      // setActiveBoardIndex(sceneModel.root.children.length - 1);

      sceneModel.setSelectedObject(newBoard);

      setActiveSidebarHeader(`Edit ${widget.name}` as HeaderType);

      // Update dataParameters if needed
      // setDataParameters(prevParams => {
      //   if (!prevParams) return prevParams;
      //   return {
      //     ...prevParams,
      //     boards: [...prevParams.boards, newBoard]
      //   };
      // });

      // Update available slots
      setAvailableSlots(prev => prev - 1);
    }
  };

  return (
    <WidgetContainer>
      {widgets.map((widget) => (
        <WidgetButton
          key={widget.name}
          onClick={() => handleWidgetClick(widget)}
          disabled={availableSlots === 0}
          $clicked={selectedWidget === widget.name}
        >
          <Icon 
            name={widget.icon} 
            size={IconSize.MEDIUM} 
            color={availableSlots === 0 ? IconColor.DISABLED : IconColor.ICONCOLOR} 
          />
          <Text 
            size={TextSize.TEXT2} 
            weight={FontWeight.NORMAL} 
            color={availableSlots === 0 ? TextColor.DISABLED_TEXT : TextColor.PRIMARY_TEXT}
          >
            {widget.name}
          </Text>
        </WidgetButton>
      ))}
    </WidgetContainer>
  );
};