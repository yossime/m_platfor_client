

import React from 'react';
import {
  TemplateContainer,
  TemplateBackground,
  TemplateTitle,
  TemplateTitleWrapper
} from './TemplateStyles';

interface TemplateProps {
  title: string;
  clicked: boolean;
  onClick: (type: string) => void;
  backgroundImage: string;
}

const Template: React.FC<TemplateProps> = ({ title, clicked, onClick, backgroundImage }) => {
  return (
    <TemplateContainer>
      <TemplateBackground
        backgroundImage={backgroundImage}
        clicked={clicked}
        onClick={() => onClick(title)}
      />
      <TemplateTitleWrapper>
        <TemplateTitle clicked={clicked}>{title}</TemplateTitle>
      </TemplateTitleWrapper>
    </TemplateContainer>
  );
};

export default Template;