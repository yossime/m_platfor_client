
import React from 'react';
import {
  QuestionnaireWrapper,
} from './QuestionnaireStyles';
import QuestionnaireContainer from './questionnaireContainer/QuestionnaireContainer';
import ButtonsContainer from './buttonsContainer/ButtonsContainer';



const Questionnaire: React.FC = () => {
  return (
    <QuestionnaireWrapper>
      <QuestionnaireContainer />
      <ButtonsContainer />
    </QuestionnaireWrapper>
  );
};

export default Questionnaire;