
import React, { ReactNode } from 'react';
import {
  QuestionnaireWrapper,
  HorizontalLine,
  VerticalLine
} from './QuestionnaireStyles';

interface QuestionnaireProps {
  children: ReactNode;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ children }) => {
  return (
    <QuestionnaireWrapper>
      <HorizontalLine />
      <VerticalLine />
      {children}
    </QuestionnaireWrapper>
  );
};

export default Questionnaire;