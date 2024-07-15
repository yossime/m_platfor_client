import React from 'react';
import { IndexContainerWrapper } from './QuestionnaireIndexContainerStyles';
import QuestionnaireIndex from './questionnaireIndex/QuestionnaireIndex';

const QuestionnaireIndexContainer: React.FC = () => {
  return (
    <IndexContainerWrapper>
      <QuestionnaireIndex />
    </IndexContainerWrapper>
  );
};

export default QuestionnaireIndexContainer;