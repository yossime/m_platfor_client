import React, { useEffect, useState } from "react";
import { HeaderMenu } from "./HeaderMenu";
import { ContentArea } from "./ContentArea";
import {
  HeaderContainer,
  HeaderTitle,
  HeaderIcon,
  SideBarContainer,
  SubHeaderContainer,
  ScrollableContent,
  ProjectTitle,
  ProjectIcon,
  ProjectContainer,
  SideBarContainerMini,
} from "./SideBarStyles";
import { SubMenuType, HeaderType } from "./types";
import { useEditor } from "@/context/useEditorContext";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import { BoardType, ISceneObject } from "../types";
import { Board } from "../viewport/models/boards/Board";
import { Divider, Divider2 } from "./components/CommonStyles";
import { useProject } from "@/context/useProjectContext";

const Sidebar: React.FC = () => {
  const { projectName } = useProject();
  const { sceneModel } = useEditor();
  const [activeSidebarHeader, setActiveSidebarHeader] =
    useState<HeaderType>("World");
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] =
    useState<SubMenuType>("Edit");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();

    if (selectedObject && selectedObject instanceof Board) {
      setActiveSidebarHeader(
        `Edit ${selectedObject.type || "Board"}` as HeaderType
      );
    } else {
      setActiveSidebarHeader("World");
    }
  }, [sceneModel]);

  useEffect(() => {
    setActiveSidebarSubMenu("Edit");
  }, [activeSidebarHeader]);

  const handleBackOrAdd = () => {
    if (activeSidebarHeader === "World") {
      setActiveSidebarHeader("Choose Board Widget");
      sceneModel?.root?.displayEmptySlots();
    } else if (activeSidebarHeader === "Choose Board Widget") {
      setActiveSidebarHeader("World");
    } else {
      setActiveSidebarHeader("Choose Board Widget");
      sceneModel?.setSelectedObject(null);
    }
  };


  const handleFocus = () => {
    if (activeSidebarHeader === "World") {
      setActiveSidebarHeader("Choose Board Widget");
      sceneModel?.root?.displayEmptySlots();
    } else if (activeSidebarHeader === "Choose Board Widget") {
      setActiveSidebarHeader("World");
    } else {
      setActiveSidebarHeader("Choose Board Widget");
      sceneModel?.setSelectedObject(null);
    }
  };

  const handleAdd = () => {
    setActiveSidebarHeader("Choose Board Widget");
  };



  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();

    console.log("selected" , selectedObject);
  }, [activeSidebarHeader,activeSidebarSubMenu]);

  return (
    <>
      {isOpen ? (
        <SideBarContainer className="sidebar">
          <ProjectContainer>
            <ProjectIcon>
              <Icon name={IconName.PLUS} onClick={handleAdd} />
            </ProjectIcon>
            <ProjectTitle>
              <Text size={TextSize.TEXT2}>{projectName}</Text>
            </ProjectTitle>
            <ProjectIcon>
              <Icon
                name={IconName.ALIGNTOP}
                onClick={() => setIsOpen(!isOpen)}
              />
            </ProjectIcon>
          </ProjectContainer>

          <Divider2 />

          <HeaderContainer>
            <HeaderIcon>
              {activeSidebarHeader !== "World" && (
                <Icon name={IconName.CARETLEFT} onClick={handleBackOrAdd} />
              )}
            </HeaderIcon>
            <HeaderTitle>
              <Text size={TextSize.TEXT2}>{activeSidebarHeader}</Text>
            </HeaderTitle>
            <HeaderIcon>
              {activeSidebarHeader !== "World" && (
                <Icon name={IconName.FOLDER} onClick={handleFocus} />
              )}
            </HeaderIcon>
          </HeaderContainer>

          <Divider />

          <ScrollableContent>
            {activeSidebarHeader !== "Choose Board Widget" && (
              <SubHeaderContainer>
                <HeaderMenu
                  activeSidebarHeader={activeSidebarHeader}
                  activeSidebarSubMenu={activeSidebarSubMenu}
                  setActiveSidebarSubMenu={setActiveSidebarSubMenu}
                />
              </SubHeaderContainer>
            )}
            <ContentArea
              activeSidebarHeader={activeSidebarHeader}
              activeSidebarSubMenu={activeSidebarSubMenu}
              setActiveSidebarHeader={setActiveSidebarHeader}
              handleBackOrAdd={handleBackOrAdd}
            />
          </ScrollableContent>
        </SideBarContainer>
      ) : (
        <SideBarContainerMini>
          <Icon name={IconName.DATABASE} onClick={() => setIsOpen(true)}></Icon>
        </SideBarContainerMini>
      )}
    </>
  );
};

export default Sidebar;
