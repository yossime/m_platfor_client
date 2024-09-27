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
import { useProject } from "@/context/useProjectContext";
import { useCamera } from "@/context/CameraContext";
import { useRouter } from "next/navigation";
import { Divider, Divider2 } from "./components/CommonStyles";

const Sidebar: React.FC = () => {
  const {
    cameraDirection,
    cameraPosition,
    setCameraPosition,
    setCameraDirection,
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
    if (selectedObject && selectedObject instanceof Board) {
      setActiveSidebarHeader(
        (selectedObject.type as HeaderType) || "World"
      );
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
      const pos: Vector3 | null = selectedObject.getPosition();  // מיקום האובייקט
      const rot: Euler | null = selectedObject.getRotation();   // כיוון האובייקט (סיבוב)
  
      if (pos && rot) {
        // הזזת המצלמה מאחורי האובייקט בכיוון הפוך לכיוון האובייקט
        const distanceFromObject = 10; // המרחק שבו תרצה שהמצלמה תהיה מאחורי האובייקט
        const cameraPos = new Vector3(
          pos.x - distanceFromObject * Math.sin(rot.y), // הזזה על ציר ה-X
          pos.y + distanceFromObject * Math.sin(rot.x), // הגבהה לפי ציר Y
          pos.z - distanceFromObject * Math.cos(rot.y)  // הזזה על ציר ה-Z
        );
  
        // עדכון מיקום המצלמה
        setCameraPosition(cameraPos);
  
        // הגדרת ה-target (מיקום האובייקט) של OrbitControls למיקוד באובייקט
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

  useEffect(() => {
    const selectedObject = sceneModel?.getSelectedObject();
    if (selectedObject) {
      console.log("Selected Object:", {
        position: selectedObject.getPosition(),
        rotation: selectedObject.getRotation(),
      });
    }
    console.log("Camera:", { position: cameraPosition, direction: cameraDirection });
  }, [activeSidebarHeader, activeSidebarSubMenu, cameraPosition, cameraDirection]);

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
