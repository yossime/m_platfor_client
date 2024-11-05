import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "@/context/useEditorContext";
import Icon from "@/components/Library/icon/Icon";
import Text from "@/components/Library/text/Text";
import { IconColor, TextColor } from "@constants/colors";
import { FontWeight, TextSize } from "@constants/text";
import { IconName, IconSize } from "@constants/icon";
import Tooltip from "@/components/Library/general/Tooltip";
import { useSidebarContext } from "@/context/SidebarContext ";
import { createBoardByType } from "@/components/editor/utils/CraeteBoard";
import { HeaderType, WidgetData, widgets } from "../../types";
import {
  DraggedWidgetContainer,
  WidgetButton,
  WidgetContainer,
} from "./ChooseBoardWidgetStyles";
import { useSelectedObject } from "@/components/editor/context/Selected.context";

export const ChooseBoardWidgetComponent: React.FC = () => {
  const { sceneModel } = useEditor();
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<number>(0);
  const { setShowFormatBoard, setActiveSidebarHeader } = useSidebarContext();
  const { selectedObject, setSelectedObject } = useSelectedObject();
  const [draggedWidget, setDraggedWidget] = useState<WidgetData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const draggingWidgetRef = useRef<WidgetData | null>(null);

  const handleMouseDown = (widget: WidgetData, event: React.MouseEvent) => {
    sceneModel?.root?.architecture?.displayEmptySlots();

    setSelectedWidget(widget.name);
    const newBoard =  createBoardByType(widget.type, { name: widget.name });
    if (sceneModel?.root && newBoard && sceneModel.root.architecture) {
      sceneModel.root.architecture.addBoard(newBoard);
      setSelectedObject(newBoard);
      // sceneModel.setSelectedObject(newBoard);
      setShowFormatBoard(true);
    }

    draggingWidgetRef.current = widget;
    setInitialPosition({ x: event.pageX, y: event.pageY });
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const deltaX = Math.abs(event.pageX - initialPosition.x);
    const deltaY = Math.abs(event.pageY - initialPosition.y);
    if ((deltaX > 5 || deltaY > 5) && draggingWidgetRef.current) {
      setDraggedWidget(draggingWidgetRef.current);
    }
    setMousePosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseUp = () => {
    setDraggedWidget(null);
    setSelectedWidget(null);
    sceneModel?.root?.architecture?.displayEmptySlots(false);
    if(sceneModel?.root?.architecture?.finishDraging()  && draggingWidgetRef.current)
      {
        setActiveSidebarHeader(draggingWidgetRef.current.name as HeaderType);
      }
      draggingWidgetRef.current = null;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (sceneModel?.root?.architecture) {
      const emptySlotCount =
        sceneModel.root.architecture.getEmptySlots().length;
      setAvailableSlots(emptySlotCount);
    }
  }, [sceneModel]);


  return (
    <WidgetContainer>
      {widgets.map((widget) => (
        <Tooltip delay={800} key={widget.name} content={widget.body}>
          <WidgetButton
            key={widget.name}
            onMouseDown={(e) => handleMouseDown(widget, e)}
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
      <Tooltip delay={800} key={"Model"} content={"?????????"}>
        <WidgetButton
            onClick={()=>{}}
            disabled={availableSlots === 0}
            $clicked={selectedWidget === "Model"}
          >
            <Icon
              name={IconName.ALIGNTOP}
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
              {"Model"}
            </Text>
          </WidgetButton>
        </Tooltip>
      {draggedWidget && (
        <DraggedWidgetContainer
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            pointerEvents: "none",
          }}
        >
          <WidgetButton
            key={draggedWidget.name}
            disabled={availableSlots === 0}
            $clicked={selectedWidget === draggedWidget.name}
          >
            <Icon
              name={draggedWidget.icon}
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
              {draggedWidget.name}
            </Text>
          </WidgetButton>
        </DraggedWidgetContainer>
      )}
    </WidgetContainer>
  );
};
