import React from "react";
import styled from "styled-components";
import { ContentComponent } from "./components/subSidbar/ContentComponent";
import { useSidebarContext } from "@/context/SidebarContext ";
import { StyleComponent } from "./components/subSidbar/StyleComponent";
import { ModelLibrary } from "./components/model/ModelLibrary";
import { ModelProduct } from "./components/model/ModelProduct";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  gap: 32px;
`;


export const ContentArea: React.FC = ({
}) => {
  const {  activeSidebarSubMenu } = useSidebarContext();

  const renderComponent = () => {
 

    switch (activeSidebarSubMenu) {
      case "Design":
        return <StyleComponent />;
      case "Edit":
        return <ContentComponent />;
      case "Library":
        return <ModelLibrary />;
      case "Products":
        return <ModelProduct />;
      case "Local":
        return <ContentComponent />;
      default:
        return <div>No component available for this selection.</div>;
    }
  };

  return <ContentContainer>{renderComponent()}</ContentContainer>;
};
