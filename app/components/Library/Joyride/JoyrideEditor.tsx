import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import JoyrideComponent, { TourStep } from "./JoyrideComponent";

const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* z-index: 1000; */
`;


const JoyrideEditor: React.FC = () => {
  const [isJoyrideEnabled, setIsJoyrideEnabled] = useState(true);
  const [isTourReady, setIsTourReady] = useState(false);

  const tourSteps: TourStep[] = [ 
    {
      target: ".viewport",
      content: "We’ll walk you through the basics in just a few steps",
      title: "Hi !Welcome to the Mocart Editor!",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: ".viewport",
      content: "This environment was designed for you to start with based on your business profile.you can later modify everything using the side bar",
      title: "Let's dive in!",
      placement: "center",
      disableBeacon: true,
    },
    {
      target: ".sidebar",
      content: "you can edit them by clicking on them, or click on the “+” to add a new one.",
      title: "Here’s a list of the boards we added",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".navbarButton",
      content: "When ready you can click here to preview your web space in play mode. when done creating click Publish to make your 3D experience live online! ",
      title: "Wrap it all up!",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: ".viewport",
      content: "Left drag - orbit around Right drag - pan (move in a straight line) Scroll - Zoom",
      title: "Use the mouse to navigate",
      placement: "center",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenEditorTour") === "true";
    setIsJoyrideEnabled(!hasSeenTour);
    // resetTour();
  }, []);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setIsTourReady(true);
    }, 500); 

    return () => clearTimeout(timeout); 
  }, []);

  const clearTourMemory = () => {
    localStorage.removeItem('hasSeenEditorTour');
  };

  const resetTour = () => {
    clearTourMemory();
    setIsJoyrideEnabled(true);
  };

  useLayoutEffect(() => {
    const navbarExists = document.querySelector(".navbar");
    const sidebarExists = document.querySelector(".sidebar");
  
    if (!navbarExists || !sidebarExists) {
      console.log("Navbar or Sidebar element not found!");
    }
  }, []);
  

  return (
    <Layout>
      {isJoyrideEnabled && isTourReady && (
          <JoyrideComponent isEnabled={isJoyrideEnabled} steps={tourSteps} />
      )}
    </Layout>
  );
};

export default JoyrideEditor;
