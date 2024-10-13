import React, { useEffect, useState } from "react";
import { HeaderType, WidgetData, widgets } from "../types";
import { useEditor } from "@/context/useEditorContext";
import { WidgetContainer, WidgetButton } from "./ChooseBoardWidgetStyles";
import Icon from "@/components/Library/icon/Icon";
import Text from "@/components/Library/text/Text";
import { IconColor, TextColor } from "@constants/colors";
import { FontWeight, TextSize } from "@constants/text";
import { IconSize } from "@constants/icon";
import Tooltip from "@/components/Library/general/Tooltip";
import { createBoardByType } from "../../utils/CraeteBoard";
import { useSidebarContext } from "@/context/SidebarContext ";
import { useSelectedObject } from "../../context/Selected.context";


export const ChooseBoardWidgetComponent: React.FC = () => {
  const { sceneModel } = useEditor();
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<number>(0);
  const {setShowFormatBoard: setFormatBoard , setActiveSidebarHeader} = useSidebarContext()
  const { setSelectedObject} = useSelectedObject();

  useEffect(() => {
    if (sceneModel?.root) {
      const emptySlotCount = sceneModel.root.getEmptySlots().length;
      setAvailableSlots(emptySlotCount);
    }
  }, [sceneModel]);

  const handleWidgetClick = async (widget: WidgetData) => {
    if (availableSlots === 0) return;

    setSelectedWidget(widget.name);

    const newBoard = createBoardByType(widget.type, { name: widget.name });

    if (sceneModel?.root && newBoard) {
      // sceneModel.root.addChild(newBoard);
      sceneModel.root.addBoard(newBoard);
      setSelectedObject(newBoard);
      setFormatBoard(true)
      setActiveSidebarHeader(widget.name as HeaderType);
    }
  };

  return (
    <WidgetContainer>
      {widgets.map((widget) => (
        <Tooltip delay={800} key={widget.name} content={widget.body}>
          <WidgetButton
            key={widget.name}
            onClick={() => handleWidgetClick(widget)}
            disabled={availableSlots === 0}
            $clicked={selectedWidget === widget.name}
          >
            <Icon
              name={widget.icon}
              size={IconSize.MEDIUM}
              color={
                availableSlots === 0 ? IconColor.DISABLED : IconColor.ICONCOLOR
              }
            />
            <Text
              $cursorStyle="pointer"
              size={TextSize.TEXT2}
              $weight={FontWeight.NORMAL}
              color={
                availableSlots === 0
                  ? TextColor.DISABLED_TEXT
                  : TextColor.PRIMARY_TEXT
              }
            >
              {widget.name}
            </Text>
          </WidgetButton>
        </Tooltip>
      ))}
    </WidgetContainer>
  );
};
