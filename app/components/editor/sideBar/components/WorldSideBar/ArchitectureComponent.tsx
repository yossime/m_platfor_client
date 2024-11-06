"use client"

import React, { useEffect, useState } from "react";
import { useEditor } from "@/context/useEditorContext";
import {
  ButtonMode,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from "@constants/button";
import { FontWeight, TextSize } from "@constants/text";
import { IconName, IconSize } from "@constants/icon";
import Icon from "@/components/Library/icon/Icon";
import Button from "@/components/Library/button/Button";
import Text from "@/components/Library/text/Text";
import { IconColor } from "@constants/colors";
import {
  SubButton,
  SubContainer,
  SubWrapper,
  Container,
} from "../general/CommonStyles";
import { useSidebarContext } from "@/context/SidebarContext ";


export const ArchitectureComponent: React.FC= ({
}) => {
  const { setActiveSidebarHeader } = useSidebarContext();
  const { sceneModel } = useEditor();
  const [panels, setPanels] = useState<any[]>([]);

  useEffect(() => {
    if (sceneModel?.root?.architecture) {
      const scenePanels = sceneModel.root.architecture.children;
      setPanels(scenePanels);
    }
  }, [sceneModel]);

  const handleSelect = (panel: any) => {
    setActiveSidebarHeader(panel.name);
  };

  return (
    <Container>
      {panels.length > 0 && (
        <SubWrapper>
          <Text $weight={FontWeight.SEMI_BOLD} size={TextSize.TEXT2}>
            My Boards
          </Text>
          <SubContainer>
            {panels.map((panel, index) => (
              <SubButton key={index}>
                <Text size={TextSize.TEXT2}>
                  Board {index + 1}: {panel.name}
                </Text>
                <Icon
                  name={IconName.TRASH}
                  color={IconColor.PRIMARY}
                  size={IconSize.SMALL}
                  onClick={() => {}}
                />
                <Icon
                  onClick={() => handleSelect(panel)}
                  name={IconName.EDIT}
                  color={IconColor.PRIMARY}
                  size={IconSize.SMALL}
                />
              </SubButton>
            ))}
          </SubContainer>
        </SubWrapper>
      )}

      <Button
        type={ButtonType.PRIMARY}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.LARGE}
        icon={IconName.PLUS}
        onClick={()=>setActiveSidebarHeader("Choose Board Widget")}
        mode={ButtonMode.NORMAL}
        fullWidth={true}
      />
    </Container>
  );
};

export default ArchitectureComponent;
