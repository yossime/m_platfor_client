import React, { useRef, useState, useEffect } from "react";
import { useEditor } from "@/context/useEditorContext";
import Button from "@/components/Library/button/Button";
import { ButtonSize, ButtonType, ButtonVariant } from "@constants/button";
import { IconName, IconSize } from "@constants/icon";
import Text from "@/components/Library/text/Text";
import { SubButton, SubContainer, SubWrapper } from "../../CommonStyles";
import { FontWeight, TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconColor } from "@constants/colors";
import PopupEditDisplay from "./PopupEditDisplay";
import { ISceneObject, ProductType } from "@/components/editor/interface/types";
import { Product } from "@/components/editor/interface/models/Product";

// import { Product } from "@/components/editor/interface/Product";

export const DisplayList: React.FC = () => {
  const [activeDisplay, setActiveDisplay] = useState<{
    index: number;
    display: ISceneObject;
  } | null>(null);
  const { sceneModel } = useEditor();
  const ref = useRef<HTMLDivElement>(null);
  const [displays, setDisplays] = useState<ISceneObject[]>([]);
  const [availableSlots, setAvailableSlots] = useState<number>(5);

  const selectedObject = sceneModel?.getSelectedObject();

  useEffect(() => {
    if (selectedObject) {
      setDisplays(selectedObject.getChildren() || []);
      // setAvailableSlots(selectedObject.getEmptySlots().length);
    }
  }, [selectedObject]);

  useEffect(() => {
    // selectedObject?.displayEmptySlots();
    console.log("getEmptySlots: " + selectedObject?.getChildren()?.length);
  }, []);

  const handleEditDisplay = (index: number, display: ISceneObject) => {
    setActiveDisplay({ index, display });
  };

  const handleClosePopup = () => {
    setActiveDisplay(null);
  };

  const handleSaveDisplay = (updatedDisplay: ISceneObject) => {
    if (activeDisplay === null || !selectedObject) return;

    const updatedDisplays = [...displays];
    updatedDisplays[activeDisplay.index] = updatedDisplay;
    setDisplays(updatedDisplays);

    // Update the scene object
    // selectedObject.removeChild(displays[activeDisplay.index]);
    selectedObject.addChild(updatedDisplay);

    handleClosePopup();
  };

  const handleAddDisplay = () => {
    if (!selectedObject || availableSlots === 0) return;
    const newDisplay = new Product(ProductType.Poudiom);
    if (newDisplay)
      selectedObject.addChild(newDisplay);

    setDisplays([...displays, newDisplay]);
    setAvailableSlots(availableSlots - 1);
  };

  return (
    <div ref={ref}>
      <Text size={TextSize.TEXT2} weight={FontWeight.NORMAL}>
        Displays: {displays.length} of {displays.length + availableSlots}
      </Text>
      <SubWrapper>
        <SubContainer>
          {displays.map((display, index) => (
            <SubButton
              key={index}
              onClick={() => handleEditDisplay(index, display)}
            >
              <Text size={TextSize.TEXT2}> Display {index + 1}</Text>
              <Icon
                name={IconName.EDIT}
                color={IconColor.PRIMARY}
                size={IconSize.SMALL}
              />
            </SubButton>
          ))}
          {availableSlots > 0 && (
            <Button
              type={ButtonType.PRIMARY}
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.LARGE}
              icon={IconName.PLUS}
              iconPosition="left"
              onClick={handleAddDisplay}
              fullWidth={true}
            />
          )}
        </SubContainer>
      </SubWrapper>
      {activeDisplay && (
        <PopupEditDisplay
          display={activeDisplay.display}
          onClose={handleClosePopup}
          onSave={handleSaveDisplay}
          parentRef={ref}
        />
      )}
    </div>
  );
};
