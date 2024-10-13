import React, { useEffect, useState } from "react";
import { Euler, Vector3 } from "three";
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
  ProjectsList,
  ProjectObj,
} from "./SideBarStyles";
import { SubMenuType, HeaderType } from "./types";
import { useEditor } from "@/context/useEditorContext";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import { Board } from "../viewport/models/boards/Board";
import { Project, useProject } from "@/context/useProjectContext";
import { useRouter } from "next/navigation";
import { Divider, Divider2 } from "./components/general/CommonStyles";
import Collapsible from "@/components/Library/general/Collapsible";
import { useSidebarContext } from "@/context/SidebarContext ";
import { useSelectedObject } from "../context/Selected.context";

const Sidebar: React.FC = () => {
  const { currentProject, projects, setCurrentProject } = useProject();
  const { sceneModel } = useEditor();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const {
    setActiveSidebarHeader,
    activeSidebarHeader,
    setActiveSidebarSubMenu,
    showformatBoard,
    setShowFormatBoard,
  } = useSidebarContext();

  const { selectedObject, setSelectedObject } = useSelectedObject();

  useEffect(() => {
    if (selectedObject && selectedObject instanceof Board) {
      setActiveSidebarHeader((selectedObject.type as HeaderType) || "World");
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
      setSelectedObject(null);
    }
  };

  const handleFocus = () => {};

  const handleAdd = () => {
    setActiveSidebarHeader("Choose Board Widget");
    sceneModel?.root?.displayEmptySlots();
  };

  const handleBack = () => {
    setActiveSidebarHeader("World");
  };

  function handleProjectClick(project: Project): void {
    setCurrentProject(project);
  }

  return (
    <>
      {isOpen ? (
        <SideBarContainer className="sidebar">
          <ProjectContainer>
            <ProjectIcon>
              {activeSidebarHeader !== "World" && (
                <Icon name={IconName.GLOBESIMPAL} onClick={handleBack} />
              )}
              <Icon name={IconName.PLUS} onClick={handleAdd} />
            </ProjectIcon>
            <ProjectTitle>
              <Collapsible title={currentProject?.projectName || ""}>
                <ProjectsList>
                  {projects.map((project) => (
                    <ProjectObj
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.projectName}
                    </ProjectObj>
                  ))}
                </ProjectsList>
              </Collapsible>
            </ProjectTitle>
            <ProjectIcon>
              <Icon
                name={IconName.SPEEDOMETER}
                onClick={() => router.push("/dashboard")}
              />
            </ProjectIcon>
          </ProjectContainer>

          <Divider2 />

          <HeaderContainer>
            <HeaderIcon>
              {activeSidebarHeader !== "World" && (
                <Icon
                  name={IconName.SQUARESFOUR}
                  onClick={() => setShowFormatBoard(!showformatBoard)}
                />
              )}
            </HeaderIcon>
            <HeaderTitle>
              <Text size={TextSize.TEXT2}>{activeSidebarHeader}</Text>
            </HeaderTitle>
            <HeaderIcon>
              {activeSidebarHeader !== "World" &&
                activeSidebarHeader !== "Choose Board Widget" && (
                  <Icon name={IconName.ARROWSIN} onClick={handleFocus} />
                )}
            </HeaderIcon>
          </HeaderContainer>

          <Divider />

          <ScrollableContent>
            {activeSidebarHeader !== "Choose Board Widget" && (
              <SubHeaderContainer>
                <HeaderMenu />
              </SubHeaderContainer>
            )}
            <ContentArea handleBackOrAdd={handleBackOrAdd} />
          </ScrollableContent>
        </SideBarContainer>
      ) : (
        <SideBarContainerMini>
          <Icon name={IconName.DATABASE} onClick={() => setIsOpen(true)} />
        </SideBarContainerMini>
      )}
    </>
  );
};

export default Sidebar;
