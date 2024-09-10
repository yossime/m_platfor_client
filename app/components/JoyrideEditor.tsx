import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JoyrideComponent, { TourStep } from "./JoyrideComponent";

const EditorLayout = styled.div`
  position: relative;
`;

const JoyrideOverlay = styled.div`
  overflow: hidden;
  top: 0;
left: 0;
width: 100%;
height: 100%;
pointer-events: none; /* Ensures the Joyride component doesn't affect the layout */
z-index: 1000;
`;

0;

const JoyrideEditor: React.FC = () => {
  const [isJoyrideEnabled, setIsJoyrideEnabled] = useState(true);

  const tourSteps: TourStep[] = [
    {
      target: ".navbarButton",
      content:
        "This is the navigation bar where you can access different sections of the editor.",
      title: "Navbar",
      placement: "bottom",
    },
    {
      target: ".viewport",
      content:
        "This is the main viewport where you can see and interact with your 3D scene.",
      title: "Viewport",
      placement: "center",
    },
    {
      target: ".viewport",
      content:
        "This is the main viewport where you can see and interact with your 3D scene.",
      title: "Viewport",
      placement: "center",
    },
    {
      target: ".sidebar",
      content: "This is the sidebar where you can edit your project settings.",
      title: "Sidebar",
      placement: "right",
    },
    {
      target: ".viewport",
      content:
        "This is the main viewport where you can see and interact with your 3D scene.",
      title: "Viewport",
      placement: "center",
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenEditorTour") === "true";
    setIsJoyrideEnabled(!hasSeenTour);
  }, []);

  return (
    <EditorLayout>
      {isJoyrideEnabled && (
        <JoyrideOverlay>
          <JoyrideComponent steps={tourSteps} isEnabled={true} />
        </JoyrideOverlay>
      )}
    </EditorLayout>
  );
};

export default JoyrideEditor;
