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
import { useCamera } from "@/context/CameraContext";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const {
    cameraRotation,
    cameraDirection,
    cameraPosition,
    setCameraPosition,
    setCameraDirection,
    setCameraRotation,
  } = useCamera();
  const { projectName } = useProject();
  const { sceneModel } = useEditor();
  const router = useRouter();
  const [activeSidebarHeader, setActiveSidebarHeader] =
  useState<HeaderType>("World");
  const [activeSidebarSubMenu, setActiveSidebarSubMenu] =
  useState<SubMenuType>("Edit");
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
    console.log(selectedObject);
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
    const selectedObject = sceneModel?.getSelectedObject();

    if (selectedObject) {
      const pos: Vector3 | null = selectedObject?.getPosition();
      const rot: Euler | null = selectedObject?.getRotation();

      if (pos && rot) {
        const offsetDistance = 10;

        // const cameraNewPosition = new Vector3(
        //   pos.x + offsetDistance * Math.sin(rot.y),
        //   pos.y + 10,
        //   pos.z + offsetDistance * Math.cos(rot.y)
        // );

        const cameraNewPosition = new Vector3(
          pos.x + pos.x,
          pos.y + pos.y,
          pos.z + pos.z
        );

        setCameraPosition(cameraNewPosition);

        // const direction = new Vector3();
        // direction.subVectors(pos, cameraNewPosition).normalize();
        const cameraNewRotation = new Vector3(
          pos.x + rot.x,
          pos.y + rot.y,
          pos.z + rot.z
        );
        setCameraDirection(cameraNewRotation);
      }
    }
  };

  const handleAdd = () => {
    setActiveSidebarHeader("Choose Board Widget");
  };
  const handleBack = () => {
    setActiveSidebarHeader("World");
  };

  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
    // console.log("selected" ,"pos:" ,selectedObject?.getPosition() ,"rot:",selectedObject?.getRotation());
    // console.log("camera" ,"pos:" ,cameraPosition ,"rot:",cameraPosition, "dir:" ,cameraDirection);
  }, [activeSidebarHeader, activeSidebarSubMenu]);

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
              {/* <Icon
                name={IconName.ALIGNTOP}
                onClick={() => setIsOpen(!isOpen)}
              /> */}
              <Icon
                name={IconName.SPEEDOMETER}
                onClick={() => {router.push("/dashboard");}}
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
