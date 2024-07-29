import React, { useEffect, useState } from 'react';
import { HeaderType, WidgetData, widgets } from '../types';
import { useEditor } from '@/context/useEditorContext';
import { WidgetContainer, WidgetButton } from './ChooseBoardWidgetStyles';
import Icon from '@/components/Library/icon/Icon';
import Text from '@/components/Library/text/Text';
import { IconColor, TextColor } from '@constants/colors';
import { FontWeight, TextSize } from '@constants/text';
import {  IconSize } from '@constants/icon';
import { createBoardByType } from '../../utils/CraeteBoard';




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
            name={widget.icon} 
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