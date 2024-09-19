import React from 'react';
import styled from 'styled-components';
import { HeaderType, SubMenuType } from './types';

import { GlobalComponent } from './components/GlobalComponent';
import { ArchitectureComponent } from './components/ArchitectureComponent';
import { ContentComponent } from './components/ContentComponent';
import { StyleComponent } from './components/StyleComponent';
import { ChooseBoardWidgetComponent } from './components/ChooseBoardWidgetComponent';

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
  activeSidebarHeader: HeaderType;
  activeSidebarSubMenu: SubMenuType;
  setActiveSidebarHeader: (header: any) => void;
  handleBackOrAdd: () => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ activeSidebarHeader, activeSidebarSubMenu, setActiveSidebarHeader,handleBackOrAdd }) => {
  const renderComponent = () => {
    if (activeSidebarHeader === 'Choose Board Widget') {
      return <ChooseBoardWidgetComponent  setActiveSidebarHeader={setActiveSidebarHeader} />;
    }

    switch (activeSidebarSubMenu) {
      case 'Design':
        if (activeSidebarHeader === 'World') {
          return <GlobalComponent />;
        }
        else  return <StyleComponent activeSidebarHeader={activeSidebarHeader} />;
      case 'Edit':
        if (activeSidebarHeader === 'World') {
          return <ArchitectureComponent handleBackOrAdd={handleBackOrAdd} setActiveSidebarHeader={setActiveSidebarHeader}/>;
        }
        else  return <ContentComponent activeSidebarHeader={activeSidebarHeader} />;
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