import React from 'react';
import styled from 'styled-components';
import { GlobalComponent } from './components/rootSideBar/GlobalComponent';
import { ContentComponent } from './components/subSidbar/ContentComponent';
import { useSidebarContext } from '@/context/SidebarContext ';
import { ChooseBoardWidgetComponent } from './components/chooseBoard/ChooseBoardWidgetComponent';
import { StyleComponent } from './components/subSidbar/StyleComponent';
import ArchitectureComponent from './components/rootSideBar/ArchitectureComponent';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  gap:32px;
`;

interface ContentAreaProps {
  handleBackOrAdd: () => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ handleBackOrAdd }) => {
  const {activeSidebarHeader,activeSidebarSubMenu} = useSidebarContext()

  const renderComponent = () => {
    if (activeSidebarHeader === 'Choose Board Widget') {
      return <ChooseBoardWidgetComponent />;
    }

    switch (activeSidebarSubMenu) {
      case 'Design':
        if (activeSidebarHeader === 'World') {
          return <GlobalComponent />;
        }
        else  return <StyleComponent/>;
      case 'Edit':
        if (activeSidebarHeader === 'World') {
          return <ArchitectureComponent handleBackOrAdd={handleBackOrAdd} />;
        }
        else  return <ContentComponent  />;
      default:
        return <div>No component available for this selection.</div>;
    }
  };

  return (
    <ContentContainer>
      {renderComponent()}
    </ContentContainer>
  );
};