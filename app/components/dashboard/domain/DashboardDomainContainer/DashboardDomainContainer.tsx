
"use client"
import React, { ReactNode } from 'react';
import { ContainerWrapper } from './DashboardDomainContainerStyles';
import { QuestionnaireStatus, useQuestionnaireIndex } from '@context/useQuestionnaire';

// const componentMap: { [key in QuestionnaireStatus]: ReactNode } = {
//   [QuestionnaireStatus.QuestionnaireTemplates]: <Design />,
//   [QuestionnaireStatus.QuestionnaireBoards]: <Boards />,
//   [QuestionnaireStatus.QuestionnaireBusinessName]: <BusinessName />,
//   [QuestionnaireStatus.WebsiteType]: <WebsiteType />,
// };

const DashboardDomainContainer: React.FC = () => {
  const { currentIndex } = useQuestionnaireIndex();

  return (
    <>
      <ContainerWrapper>
        {/* {currentIndex && componentMap[currentIndex]} */}
      </ContainerWrapper></>

  );
}

export default DashboardDomainContainer;