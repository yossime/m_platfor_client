import React from 'react';
import styled from 'styled-components';
import { HeaderType, SubMenuType } from './types';

// Import all the components
import { GlobalComponent } from './components/GlobalComponent';
import { ArchitectureComponent } from './components/ArchitectureComponent';
import { ContentComponent } from './components/ContentComponent';
import { StyleComponent } from './components/StyleComponent';
import { AdvancedComponent } from './components/AdvancedComponent';
import { ChooseBoardWidgetComponent } from './components/ChooseBoardWidgetComponent';

const ContentContainer = styled.div`
  margin-top: 16px;
`;

interface ContentAreaProps {
  activeSidebarHeader: HeaderType;
  activeSidebarSubMenu: SubMenuType;
  setActiveSidebarHeader: (header: any) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ activeSidebarHeader, activeSidebarSubMenu, setActiveSidebarHeader }) => {
  const renderComponent = () => {
    if (activeSidebarHeader === 'Choose Board Widget') {
      return <ChooseBoardWidgetComponent setActiveSidebarHeader={setActiveSidebarHeader} />;
    }

    switch (activeSidebarSubMenu) {
      case 'Global':
        return <GlobalComponent setActiveSidebarHeader={setActiveSidebarHeader}  />;
      case 'Architecture':
        return <ArchitectureComponent/>;
      case 'Content':
        return <ContentComponent activeSidebarHeader={activeSidebarHeader} />;
      case 'Style':
        return <StyleComponent activeSidebarHeader={activeSidebarHeader} />;
      case 'Advanced':
        return <AdvancedComponent activeSidebarHeader={activeSidebarHeader} />;
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