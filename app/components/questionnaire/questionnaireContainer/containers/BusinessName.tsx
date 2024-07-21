import React, { useState } from 'react';
import Text from '@components/Library/text/Text';
import Input from '@components/Library/input/Input';
import { useQuestionnaireIndex } from '@/context/useQuestionnaire';
import { Container, IndexContainer, InputWrapper, TextContainer } from './CommonStyles';
import { InputSize, InputMode } from '@constants/input';
import { useProject } from '@/context/useProjectContext';
import QuestionnaireIndexContainer from '../../questionnaireIndexContainer/QuestionnaireIndexContainer';
import { FontFamily, FontWeight, TextColor, TextSize } from '@constants/text';


const BusinessName: React.FC = () => {
  const { contextData, setContextData } = useQuestionnaireIndex();
  const { projects } = useProject();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (value: string) => {
    const nameExists = projects.some(project => project?.projectName?.toLowerCase() === value.toLowerCase());

    if (nameExists) {
      setErrorMessage('This business name already exists. Please choose a different name.');
    } else {
      setErrorMessage(null);
    }

    setContextData({
      ...contextData,
      Name: {
        ...contextData.Name,
        value: value,
        valid: value !== '' && !nameExists
      }
    });
  };

  return (
    <Container>
      <IndexContainer>
        <QuestionnaireIndexContainer />
      </IndexContainer>
      <TextContainer>
        <Text size={TextSize.D1} family={FontFamily.Poppins} weight={FontWeight.SEMI_BOLD}
          color={TextColor.PRIMARY_TEXT}>
         Enter Your Business Name</Text>
        <Text size={TextSize.H3} family={FontFamily.Poppins} weight={FontWeight.NORMAL}
          color={TextColor.PRIMARY_TEXT}>
         Input your current brand name, or come up with a new one</Text>
      </TextContainer>
      <InputWrapper>
        <Input
          size={InputSize.MEDIUM}
          mode={errorMessage ? InputMode.ERROR : InputMode.NORMAL}
          placeholder="Business name"
          value={contextData.Name.value || ''}
          onChange={handleChange}
          helperText={errorMessage || undefined}
          fullWidth
        />
      </InputWrapper>
    </Container>
  );
};

export default BusinessName;