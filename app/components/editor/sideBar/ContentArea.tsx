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
  activeHeader: HeaderType;
  activeSubMenu: SubMenuType;
  onHeaderChange: (header: HeaderType) => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ activeHeader, activeSubMenu, onHeaderChange }) => {
  const renderComponent = () => {
    if (activeHeader === 'Choose Board Widget') {
      return <ChooseBoardWidgetComponent onHeaderChange={onHeaderChange} />;
    }

    switch (activeSubMenu) {
      case 'Global':
        return <GlobalComponent header={activeHeader} onHeaderChange={onHeaderChange}  />;
      case 'Architecture':
        return <ArchitectureComponent header={activeHeader} />;
      case 'Content':
        return <ContentComponent header={activeHeader} />;
      case 'Style':
        return <StyleComponent header={activeHeader} />;
      case 'Advanced':
        return <AdvancedComponent header={activeHeader} />;
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