
"use client"
import React, { ReactNode } from 'react';
import { ContainerWrapper } from './QuestionnaireContainerStyles';
import WebsiteType from './containers/WebsiteType';
import BusinessName from './containers/BusinessName';
import Design from './containers/Templats';
import Boards from './containers/Boards';
import { QuestionnaireStatus, useQuestionnaireIndex } from '@context/useQuestionnaire';

const componentMap: { [key in QuestionnaireStatus]: ReactNode } = {
  [QuestionnaireStatus.QuestionnaireTemplates]: <Design />,
  [QuestionnaireStatus.QuestionnaireBoards]: <Boards />,
  [QuestionnaireStatus.QuestionnaireBusinessName]: <BusinessName />,
  [QuestionnaireStatus.WebsiteType]: <WebsiteType />,
};

const QuestionnaireContainer: React.FC = () => {
  const { currentIndex } = useQuestionnaireIndex();

  return (
    <>
      <ContainerWrapper>
        {currentIndex && componentMap[currentIndex]}
      </ContainerWrapper></>

  );
}

export default QuestionnaireContainer;