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
} from "./SideBarStyles";
import { SubMenuType, HeaderType } from "./types";
import { useEditor } from "@/context/useEditorContext";
import Text from "@/components/Library/text/Text";
import { TextSize } from "@constants/text";
import Icon from "@/components/Library/icon/Icon";
import { IconName } from "@constants/icon";
import { BoardType, ISceneObject } from "../types";
import { Board } from "../viewport/models/boards/Board";
import { useProject } from "@/context/useProjectContext";
import { useCamera } from "@/context/CameraContext";
import { useRouter } from "next/navigation";
import { Divider, Divider2 } from "./components/CommonStyles";
import Collapsible from "@/components/Library/general/Collapsible";
import SelectInput from "@/components/Library/input/SelectInput";
import { InputMode, InputSize } from "@constants/input";

const Sidebar: React.FC = () => {
  const {
    cameraDirection,
    cameraPosition,
    setCameraPosition,
    setCameraDirection,
  } = useCamera();
  
  const { projectName, projects } = useProject();
  const { sceneModel } = useEditor();
  const router = useRouter();
  const [activeSidebarHeader, setActiveSidebarHeader] =
    useState<HeaderType>("World");
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] =
    useState<SubMenuType>("Edit");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
    if (selectedObject && selectedObject instanceof Board) {
      setActiveSidebarHeader((selectedObject.type as HeaderType) || "World");
    } else {
      setActiveSidebarHeader("World");
    }
  }, [sceneModel, sceneModel?.getSelectedObject]);

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
    const selectedObject = sceneModel?.getSelectedObject();
    if (selectedObject) {
      const pos: Vector3 | null = selectedObject.getPosition();
      const rot: Euler | null = selectedObject.getRotation();

      if (pos && rot) {
        const distanceFromObject = 10;
        const cameraPos = new Vector3(
          pos.x - distanceFromObject * Math.sin(rot.y),
          pos.y + distanceFromObject * Math.sin(rot.x),
          pos.z - distanceFromObject * Math.cos(rot.y)
        );

        setCameraPosition(cameraPos);

        setCameraDirection(pos);
      }
    }
  };

  const handleAdd = () => {
    setActiveSidebarHeader("Choose Board Widget");
  };

  const handleBack = () => {
    setActiveSidebarHeader("World");
  };

  function handleProjectClick(project: any): void {}

  return (
    <>
      {isOpen ? (
        <SideBarContainer className="sidebar">
          <ProjectContainer>
            <ProjectIcon>
              <Icon name={IconName.PLUS} onClick={handleAdd} />
            </ProjectIcon>
            <ProjectTitle>
              <Collapsible title={projectName || ""}>
                <ProjectsList>
                  {projects.map((project) => (
                    <ProjectTitle
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.projectName}
                    </ProjectTitle>
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
                <Icon name={IconName.CARETLEFT} onClick={handleBack} />
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
                <HeaderMenu
                  setActiveSidebarHeader={setActiveSidebarHeader}
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
          <Icon name={IconName.DATABASE} onClick={() => setIsOpen(true)} />
        </SideBarContainerMini>
      )}
    </>
  );
};

export default Sidebar;
